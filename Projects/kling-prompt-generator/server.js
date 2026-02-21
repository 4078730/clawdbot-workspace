require("dotenv").config();
const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { exec } = require("child_process");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();
const PORT = process.env.PORT || 3000;

// ---------------------------------------------------------------------------
// Multer setup – store uploads with original extension
// ---------------------------------------------------------------------------
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    const dir = path.join(__dirname, "uploads");
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: (_req, file, cb) => {
    const unique = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, unique + path.extname(file.originalname));
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 * 1024 }, // 2 GB
  fileFilter: (_req, file, cb) => {
    const allowed = [".mp4", ".webm", ".mov"];
    const ext = path.extname(file.originalname).toLowerCase();
    if (allowed.includes(ext)) {
      cb(null, true);
    } else {
      cb(new Error("Unsupported file type. Allowed: mp4, webm, mov"));
    }
  },
});

// ---------------------------------------------------------------------------
// Middleware
// ---------------------------------------------------------------------------
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Ensure generated/ directory exists and serve it
const generatedDir = path.join(__dirname, "generated");
if (!fs.existsSync(generatedDir)) fs.mkdirSync(generatedDir, { recursive: true });
app.use("/generated", express.static(generatedDir));

// ---------------------------------------------------------------------------
// Gemini helpers
// ---------------------------------------------------------------------------
const MIME_MAP = {
  ".mp4": "video/mp4",
  ".webm": "video/webm",
  ".mov": "video/quicktime",
};

const SYSTEM_PROMPT = `あなたはAI動画生成ツール「Kling AI」用のプロンプトライターです。
提供された動画を分析し、動画生成AIが再現できるよう、動作を詳細に日本語で記述してください。
以下の観点をカバーすること：
1) キャラクターの動作・ポーズの変化
2) カメラワーク（パン、ズーム、回転など）
3) エフェクト（光、爆発、スピードライン、パーティクルなど）
4) 表情・感情の変化
5) 背景・環境の変化

Kling AIが直接使用できる、1つのまとまったプロンプト文として出力してください（番号付きリスト不要）。`;

const MULTISHOT_PROMPT = `あなたはKling AI 3.0のマルチショット機能（1動画最大6ショット）用のプロンプトライターです。
提供された動画を分析し、個々のショット/カットに分解してください。

各ショットについて、日本語で以下を記述：
1) キャラクターの外見、動作、ポーズの変化
2) カメラワーク（パン、ズーム、回転、トラッキングショットなど）
3) エフェクト（光、爆発、パーティクル、スピードラインなど）
4) 表情・感情の変化
5) 背景・環境

出力フォーマット（厳守）：
[Shot 1]
<ショット1のプロンプト>

[Shot 2]
<ショット2のプロンプト>

...以下同様。

ルール：
- 最大6ショット（細かいカットは必要に応じて統合）
- 各ショットのプロンプトはKling AIがそのまま使える独立した文章にする
- 映画用語を使用（トラッキングショット、ローアングル、スローモーションなど）
- 動作動詞と時間的な流れを強調する
- キャラクターの外見（髪色、服装など）は毎ショット具体的に記述する`;

const OPTIMIZE_PROMPT = `あなたはKling AI（動画生成AI）専門のプロンプトエンジニアです。
以下のドラフトプロンプトを、Kling AI向けに最適化して書き直してください。
ルール：
- 日本語で出力
- 簡潔だが非常に描写的に
- 動作動詞、カメラの方向、時間的な流れを強調
- Klingに適した表現を使用（例：「カメラがゆっくりズームイン」「キャラクターが振り向いてカメラを見る」）
- 冗長性を排除
- 最適化されたプロンプトのみを出力（余計な説明不要）

ドラフトプロンプト：
`;

/**
 * Upload a file to the Gemini File API via GoogleAIFileManager and wait
 * until processing is complete.
 */
async function uploadToGemini(filePath, mimeType) {
  // We use the REST-based file upload because the SDK's FileManager is the
  // most reliable path for large video files.
  const { GoogleAIFileManager } = require("@google/generative-ai/server");
  const fileManager = new GoogleAIFileManager(process.env.GEMINI_API_KEY);

  const uploadResult = await fileManager.uploadFile(filePath, {
    mimeType,
    displayName: path.basename(filePath),
  });

  // Poll until the file is ACTIVE (video processing can take a while)
  let file = uploadResult.file;
  while (file.state === "PROCESSING") {
    await new Promise((r) => setTimeout(r, 3000));
    file = await fileManager.getFile(file.name);
  }

  if (file.state === "FAILED") {
    throw new Error("Gemini file processing failed");
  }

  return file;
}

// ---------------------------------------------------------------------------
// Routes
// ---------------------------------------------------------------------------

// Upload video only (for frame extraction of local files), with optional trim
app.post("/api/upload-only", upload.single("video"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No video file provided" });
  }

  const start = req.query.start || req.body?.start;
  const end = req.query.end || req.body?.end;
  let finalPath = req.file.path;
  let finalFilename = path.basename(req.file.path);

  console.log(`📤 Upload params - start: "${start || ""}", end: "${end || ""}"`);

  // Trim if start/end specified
  if (start || end) {
    const trimmedPath = req.file.path.replace(/(\.\w+)$/, `-trimmed$1`);
    let ffmpegCmd = `/usr/bin/ffmpeg -y -i "${req.file.path}"`;
    if (start) ffmpegCmd += ` -ss ${start}`;
    if (end) ffmpegCmd += ` -to ${end}`;
    ffmpegCmd += ` -c copy "${trimmedPath}"`;

    console.log(`✂️ Trimming uploaded file: ${start || "0:00"} → ${end || "end"}`);
    try {
      await new Promise((resolve, reject) => {
        exec(ffmpegCmd, { timeout: 120000 }, (err, stdout, stderr) => {
          if (err) reject(new Error("Trimming failed: " + (stderr || err.message)));
          else resolve();
        });
      });
      // Remove original, use trimmed
      try { fs.unlinkSync(req.file.path); } catch (_) {}
      finalPath = trimmedPath;
      finalFilename = path.basename(trimmedPath);
    } catch (err) {
      console.error("Trim error:", err.message);
      // Fall through with untrimmed file
    }
  }

  console.log(`📤 File uploaded: ${finalFilename} (${(req.file.size / 1024 / 1024).toFixed(1)} MB)`);
  res.json({ filename: finalFilename, videoPath: `/uploads/${finalFilename}` });
});

// Upload video & analyse with Gemini
app.post("/api/analyze", upload.single("video"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No video file provided" });
  }
  if (!process.env.GEMINI_API_KEY) {
    return res.status(500).json({ error: "GEMINI_API_KEY is not configured" });
  }

  const ext = path.extname(req.file.originalname).toLowerCase();
  const mimeType = MIME_MAP[ext] || "video/mp4";
  let filePath = req.file.path;
  let trimmedPath = null;

  try {
    // Trim if start/end specified
    const start = req.query.start || undefined;
    const end = req.query.end || undefined;

    if (start || end) {
      const unique = Date.now() + "-" + Math.round(Math.random() * 1e9);
      trimmedPath = path.join(path.dirname(filePath), `trimmed-${unique}.mp4`);
      let ffmpegCmd = `ffmpeg -y -i "${filePath}"`;
      if (start) ffmpegCmd += ` -ss ${start}`;
      if (end) ffmpegCmd += ` -to ${end}`;
      ffmpegCmd += ` -c copy "${trimmedPath}"`;

      console.log(`✂️ Trimming uploaded file: ${start || "0:00"} → ${end || "end"}`);
      await new Promise((resolve, reject) => {
        exec(ffmpegCmd, { timeout: 120000 }, (err, _stdout, stderr) => {
          if (err) {
            console.error("ffmpeg trim error:", stderr || err.message);
            reject(new Error("Trimming failed: " + (stderr || err.message)));
          } else {
            resolve();
          }
        });
      });
      filePath = trimmedPath;
    }

    // 1. Upload to Gemini File API
    const geminiFile = await uploadToGemini(filePath, mimeType);

    // 2. Generate content
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-pro" });

    const mode = req.body?.mode || req.query?.mode || "single";
    const systemPrompt = mode === "multishot" ? MULTISHOT_PROMPT : SYSTEM_PROMPT;

    const result = await model.generateContent([
      { text: systemPrompt },
      {
        fileData: {
          mimeType: geminiFile.mimeType,
          fileUri: geminiFile.uri,
        },
      },
    ]);

    const text = result.response.text();
    const usage = result.response.usageMetadata || {};
    const inputTokens = usage.promptTokenCount || 0;
    const outputTokens = usage.candidatesTokenCount || 0;
    const totalTokens = usage.totalTokenCount || 0;

    // Gemini 2.5 Pro pricing (per 1M tokens)
    // Input: $1.25 (≤200k) / $2.50 (>200k)
    // Output: $10.00 (≤200k) / $15.00 (>200k)
    const inputRate = inputTokens <= 200000 ? 1.25 : 2.50;
    const outputRate = outputTokens <= 200000 ? 10.00 : 15.00;
    const costUsd = (inputTokens / 1_000_000) * inputRate + (outputTokens / 1_000_000) * outputRate;
    const costJpy = costUsd * 150; // approx USD/JPY

    const costInfo = {
      inputTokens,
      outputTokens,
      totalTokens,
      costUsd: costUsd.toFixed(4),
      costJpy: costJpy.toFixed(2),
    };

    console.log(`\n📝 Generated Prompt (${mode}):\n${text}`);
    console.log(`💰 Cost: $${costInfo.costUsd} (≈¥${costInfo.costJpy}) | Tokens: ${inputTokens} in / ${outputTokens} out / ${totalTokens} total\n`);

    // Return video URL so the frontend can preview it (use trimmed if exists)
    const videoUrl = `/uploads/${path.basename(filePath)}`;
    res.json({ prompt: text, videoUrl, cost: costInfo });
  } catch (err) {
    console.error("Analyze error:", err);
    res.status(500).json({ error: err.message || "Analysis failed" });
  }
});

// Optimize an existing prompt for Kling AI
app.post("/api/optimize", async (req, res) => {
  const { prompt } = req.body;
  if (!prompt) {
    return res.status(400).json({ error: "No prompt provided" });
  }
  if (!process.env.GEMINI_API_KEY) {
    return res.status(500).json({ error: "GEMINI_API_KEY is not configured" });
  }

  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-pro" });

    const result = await model.generateContent([
      { text: OPTIMIZE_PROMPT + prompt },
    ]);

    const optimized = result.response.text();
    res.json({ prompt: optimized });
  } catch (err) {
    console.error("Optimize error:", err);
    res.status(500).json({ error: err.message || "Optimization failed" });
  }
});

// ---------------------------------------------------------------------------
// Analyze from server-side file (for YouTube-downloaded videos)
// ---------------------------------------------------------------------------
app.post("/api/analyze-local", async (req, res) => {
  const { filename, mode, start, end } = req.body;
  if (!filename) {
    return res.status(400).json({ error: "No filename provided" });
  }
  if (!process.env.GEMINI_API_KEY) {
    return res.status(500).json({ error: "GEMINI_API_KEY is not configured" });
  }

  let filePath = path.join(__dirname, "uploads", filename);
  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: "File not found on server" });
  }

  const ext = path.extname(filename).toLowerCase();
  const mimeType = MIME_MAP[ext] || "video/mp4";

  try {
    // Trim if start/end specified
    if (start || end) {
      const unique = Date.now() + "-" + Math.round(Math.random() * 1e9);
      const trimmedPath = path.join(__dirname, "uploads", `trimmed-${unique}.mp4`);
      let ffmpegCmd = `ffmpeg -y -i "${filePath}"`;
      if (start) ffmpegCmd += ` -ss ${start}`;
      if (end) ffmpegCmd += ` -to ${end}`;
      ffmpegCmd += ` -c copy "${trimmedPath}"`;

      console.log(`✂️ Trimming local file: ${start || "0:00"} → ${end || "end"}`);
      await new Promise((resolve, reject) => {
        exec(ffmpegCmd, { timeout: 120000 }, (err, _stdout, stderr) => {
          if (err) {
            console.error("ffmpeg trim error:", stderr || err.message);
            reject(new Error("Trimming failed: " + (stderr || err.message)));
          } else {
            resolve();
          }
        });
      });
      filePath = trimmedPath;
    }

    const geminiFile = await uploadToGemini(filePath, mimeType);
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-pro" });

    const analysisMode = mode || "single";
    const systemPrompt = analysisMode === "multishot" ? MULTISHOT_PROMPT : SYSTEM_PROMPT;

    const result = await model.generateContent([
      { text: systemPrompt },
      {
        fileData: {
          mimeType: geminiFile.mimeType,
          fileUri: geminiFile.uri,
        },
      },
    ]);

    const text = result.response.text();
    const usage = result.response.usageMetadata || {};
    const inputTokens = usage.promptTokenCount || 0;
    const outputTokens = usage.candidatesTokenCount || 0;
    const totalTokens = usage.totalTokenCount || 0;

    const inputRate = inputTokens <= 200000 ? 1.25 : 2.50;
    const outputRate = outputTokens <= 200000 ? 10.00 : 15.00;
    const costUsd = (inputTokens / 1_000_000) * inputRate + (outputTokens / 1_000_000) * outputRate;
    const costJpy = costUsd * 150;

    const costInfo = {
      inputTokens,
      outputTokens,
      totalTokens,
      costUsd: costUsd.toFixed(4),
      costJpy: costJpy.toFixed(2),
    };

    console.log(`\n📝 Generated Prompt (${analysisMode}, local):\n${text}`);
    console.log(`💰 Cost: $${costInfo.costUsd} (≈¥${costInfo.costJpy}) | Tokens: ${inputTokens} in / ${outputTokens} out / ${totalTokens} total\n`);

    const videoUrl = `/uploads/${path.basename(filePath)}`;
    res.json({ prompt: text, videoUrl, cost: costInfo });
  } catch (err) {
    console.error("Analyze-local error:", err);
    res.status(500).json({ error: err.message || "Analysis failed" });
  }
});

// ---------------------------------------------------------------------------
// YouTube download
// ---------------------------------------------------------------------------
app.post("/api/youtube", async (req, res) => {
  const { url, start, end, quality } = req.body;
  if (!url) {
    return res.status(400).json({ error: "No URL provided" });
  }

  const uploadsDir = path.join(__dirname, "uploads");
  if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });

  const unique = Date.now() + "-" + Math.round(Math.random() * 1e9);
  const rawFile = path.join(uploadsDir, `yt-${unique}.mp4`);

  // yt-dlp download command with quality selection
  const ytdlpPath = "/home/user/.local/bin/yt-dlp";
  const q = quality || "720";
  const formatStr = q === "best"
    ? "bestvideo+bestaudio/best"
    : `bestvideo[height<=${q}]+bestaudio/best[height<=${q}]`;
  const dlCmd = `${ytdlpPath} --ffmpeg-location /usr/bin/ffmpeg -f "${formatStr}" --merge-output-format mp4 -o "${rawFile}" "${url}"`;

  console.log(`📥 Downloading YouTube: ${url}`);
  try {
    await new Promise((resolve, reject) => {
      exec(dlCmd, { timeout: 300000 }, (err, stdout, stderr) => {
        if (err) {
          console.error("yt-dlp error:", stderr || err.message);
          reject(new Error(stderr || err.message));
        } else {
          resolve(stdout);
        }
      });
    });

    let finalFile = rawFile;
    let finalFilename = path.basename(rawFile);

    // Trim if start/end specified
    if (start || end) {
      const trimmedFile = path.join(uploadsDir, `yt-trimmed-${unique}.mp4`);
      let ffmpegCmd = `ffmpeg -y -i "${rawFile}"`;
      if (start) ffmpegCmd += ` -ss ${start}`;
      if (end) ffmpegCmd += ` -to ${end}`;
      ffmpegCmd += ` -c copy "${trimmedFile}"`;

      console.log(`✂️ Trimming: ${start || "0:00"} → ${end || "end"}`);
      await new Promise((resolve, reject) => {
        exec(ffmpegCmd, { timeout: 120000 }, (err, stdout, stderr) => {
          if (err) {
            console.error("ffmpeg error:", stderr || err.message);
            reject(new Error("Trimming failed: " + (stderr || err.message)));
          } else {
            resolve(stdout);
          }
        });
      });

      // Remove raw file, use trimmed
      try { fs.unlinkSync(rawFile); } catch (_) {}
      finalFile = trimmedFile;
      finalFilename = path.basename(trimmedFile);
    }

    console.log(`✅ YouTube download complete: ${finalFilename}`);
    res.json({
      videoPath: `/uploads/${finalFilename}`,
      filename: finalFilename,
    });
  } catch (err) {
    // Clean up on error
    try { fs.unlinkSync(rawFile); } catch (_) {}
    console.error("YouTube download error:", err);
    res.status(500).json({ error: err.message || "Download failed" });
  }
});

// ---------------------------------------------------------------------------
// Prompt to Image Prompt conversion (Gemini)
// ---------------------------------------------------------------------------
app.post("/api/prompt-to-image-prompt", async (req, res) => {
  const { prompt } = req.body;
  if (!prompt) {
    return res.status(400).json({ error: "No prompt provided" });
  }
  if (!process.env.GEMINI_API_KEY) {
    return res.status(500).json({ error: "GEMINI_API_KEY is not configured" });
  }

  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const conversionPrompt = `以下はAI動画生成用のプロンプトです。この動画プロンプトから、最も印象的な1フレームを切り出した静止画像の描写に変換してください。

ルール：
- 英語で出力
- 実写映画風、高品質、8K
- 動作動詞ではなく状態・構図として描写する
- ライティング、カメラアングル、被写界深度も含める
- 画像生成AI（Flux）に直接使えるプロンプトのみを出力（説明不要）

動画プロンプト：
${prompt}`;

    const result = await model.generateContent([{ text: conversionPrompt }]);
    const imagePrompt = result.response.text();

    res.json({ imagePrompt });
  } catch (err) {
    console.error("Prompt conversion error:", err);
    res.status(500).json({ error: err.message || "Conversion failed" });
  }
});

// ---------------------------------------------------------------------------
// Generate image via Nano Banana Pro
// ---------------------------------------------------------------------------
app.post("/api/generate-image", async (req, res) => {
  const { prompt, shotIndex } = req.body;
  if (!prompt) {
    return res.status(400).json({ error: "No prompt provided" });
  }

  const genDir = path.join(__dirname, "generated");
  if (!fs.existsSync(genDir)) fs.mkdirSync(genDir, { recursive: true });

  const unique = Date.now() + "-" + Math.round(Math.random() * 1e9);
  const filename = `shot${shotIndex !== undefined ? shotIndex : "x"}-${unique}.png`;
  const outputPath = path.join(genDir, filename);

  const scriptPath = "/home/user/.nvm/versions/node/v24.13.0/lib/node_modules/clawdbot/skills/nano-banana-pro/scripts/generate_image.py";

  // Escape single quotes in prompt for shell safety
  const escapedPrompt = prompt.replace(/'/g, "'\\''");
  const cmd = `uv run "${scriptPath}" --prompt '${escapedPrompt}' --filename "${outputPath}" --resolution 1K`;

  console.log(`🖼️ Generating image for shot ${shotIndex}...`);
  try {
    await new Promise((resolve, reject) => {
      exec(cmd, { timeout: 180000, env: { ...process.env } }, (err, stdout, stderr) => {
        if (err) {
          console.error("Image generation error:", stderr || err.message);
          reject(new Error(stderr || err.message));
        } else {
          console.log("generate_image.py stdout:", stdout);
          resolve(stdout);
        }
      });
    });

    // Verify the file was created
    if (!fs.existsSync(outputPath)) {
      throw new Error("Image file was not created");
    }

    console.log(`✅ Image generated: ${filename}`);
    res.json({
      imageUrl: `/generated/${filename}`,
      filename,
    });
  } catch (err) {
    console.error("Image generation error:", err);
    res.status(500).json({ error: err.message || "Image generation failed" });
  }
});

// ---------------------------------------------------------------------------
// Extract frames from a video
// ---------------------------------------------------------------------------
app.post("/api/extract-frames", async (req, res) => {
  const { filename, interval: reqInterval } = req.body;
  if (!filename) {
    return res.status(400).json({ error: "No filename provided" });
  }

  const videoPath = path.join(__dirname, "uploads", filename);
  if (!fs.existsSync(videoPath)) {
    return res.status(404).json({ error: "Video file not found" });
  }

  const framesDir = path.join(__dirname, "frames");
  if (!fs.existsSync(framesDir)) fs.mkdirSync(framesDir, { recursive: true });

  const baseName = path.parse(filename).name;
  const isAllFrames = reqInterval === "all";
  const intervalSec = isAllFrames ? null : (parseFloat(reqInterval) || 1);

  try {
    // Get video duration and fps
    const probeInfo = await new Promise((resolve, reject) => {
      exec(
        `/usr/bin/ffprobe -v error -select_streams v:0 -show_entries stream=r_frame_rate,duration -show_entries format=duration -of json "${videoPath}"`,
        (err, stdout) => {
          if (err) reject(err);
          else resolve(JSON.parse(stdout));
        }
      );
    });

    const duration = parseFloat(probeInfo.format?.duration || probeInfo.streams?.[0]?.duration || 0);
    const fpsRaw = probeInfo.streams?.[0]?.r_frame_rate || "30/1";
    const fpsParts = fpsRaw.split("/");
    const nativeFps = fpsParts.length === 2 ? parseInt(fpsParts[0]) / parseInt(fpsParts[1]) : parseFloat(fpsRaw);

    // Clean old frames for this video
    const oldFiles = fs.readdirSync(framesDir).filter(f => f.startsWith(`${baseName}-frame`));
    oldFiles.forEach(f => fs.unlinkSync(path.join(framesDir, f)));

    const outputPattern = path.join(framesDir, `${baseName}-frame%06d.jpg`);

    if (isAllFrames) {
      // Extract every frame (native fps)
      await new Promise((resolve, reject) => {
        exec(
          `/usr/bin/ffmpeg -y -i "${videoPath}" -q:v 2 "${outputPattern}"`,
          { timeout: 300000 },
          (err, stdout, stderr) => {
            if (err) reject(new Error(stderr || err.message));
            else resolve();
          }
        );
      });
    } else {
      // Extract frames at given interval
      const fps = 1 / intervalSec;
      await new Promise((resolve, reject) => {
        exec(
          `/usr/bin/ffmpeg -y -i "${videoPath}" -vf "fps=${fps}" -q:v 2 "${outputPattern}"`,
          { timeout: 300000 },
          (err, stdout, stderr) => {
            if (err) reject(new Error(stderr || err.message));
            else resolve();
          }
        );
      });
    }

    // Collect generated frame files
    const frames = [];
    const allFiles = fs.readdirSync(framesDir)
      .filter(f => f.startsWith(`${baseName}-frame`) && f.endsWith(".jpg"))
      .sort();

    const effectiveInterval = isAllFrames ? (1 / nativeFps) : intervalSec;

    allFiles.forEach((file, i) => {
      const timestamp = (i * effectiveInterval).toFixed(3);
      frames.push({
        index: i,
        timestamp: parseFloat(timestamp),
        url: `/frames/${file}`,
        filename: file,
      });
    });

    console.log(`🎞️ Extracted ${frames.length} frames from ${filename} (interval: ${intervalSec}s)`);
    res.json({ frames, duration });
  } catch (err) {
    console.error("Frame extraction error:", err);
    res.status(500).json({ error: err.message || "Frame extraction failed" });
  }
});

app.use("/frames", express.static(path.join(__dirname, "frames")));

// ---------------------------------------------------------------------------
// Generate image via Nano Banana Pro (with optional reference image)
// ---------------------------------------------------------------------------
app.post("/api/generate-image-with-ref", async (req, res) => {
  const { prompt, shotIndex, referenceImage } = req.body;
  if (!prompt) {
    return res.status(400).json({ error: "No prompt provided" });
  }

  const genDir = path.join(__dirname, "generated");
  if (!fs.existsSync(genDir)) fs.mkdirSync(genDir, { recursive: true });

  const unique = Date.now() + "-" + Math.round(Math.random() * 1e9);
  const filename = `shot${shotIndex !== undefined ? shotIndex : "x"}-${unique}.png`;
  const outputPath = path.join(genDir, filename);

  const scriptPath = "/home/user/.nvm/versions/node/v24.13.0/lib/node_modules/clawdbot/skills/nano-banana-pro/scripts/generate_image.py";

  const escapedPrompt = prompt.replace(/'/g, "'\\''");
  let cmd = `uv run "${scriptPath}" --prompt '${escapedPrompt}' --filename "${outputPath}" --resolution 1K`;

  // If reference image provided, use --input-image for edit mode
  if (referenceImage) {
    const refPath = path.join(__dirname, referenceImage.replace(/^\//, ""));
    if (fs.existsSync(refPath)) {
      cmd = `uv run "${scriptPath}" --prompt '${escapedPrompt}' --filename "${outputPath}" --input-image "${refPath}" --resolution 1K`;
      console.log(`🖼️ Generating image with reference for shot ${shotIndex}...`);
    }
  } else {
    console.log(`🖼️ Generating image for shot ${shotIndex}...`);
  }

  try {
    await new Promise((resolve, reject) => {
      exec(cmd, { timeout: 180000, env: { ...process.env } }, (err, stdout, stderr) => {
        if (err) {
          console.error("Image generation error:", stderr || err.message);
          reject(new Error(stderr || err.message));
        } else {
          console.log("generate_image.py stdout:", stdout);
          resolve(stdout);
        }
      });
    });

    if (!fs.existsSync(outputPath)) {
      throw new Error("Image file was not created");
    }

    console.log(`✅ Image generated: ${filename}`);
    res.json({ imageUrl: `/generated/${filename}`, filename });
  } catch (err) {
    console.error("Image generation error:", err);
    res.status(500).json({ error: err.message || "Image generation failed" });
  }
});

// ---------------------------------------------------------------------------
// Start
// ---------------------------------------------------------------------------
app.listen(PORT, () => {
  console.log(`✨ Kling Prompt Generator running at http://localhost:${PORT}`);
});
