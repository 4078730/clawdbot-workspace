// =========================================================================
// Kling Prompt Generator – Frontend
// =========================================================================

const $ = (sel) => document.querySelector(sel);
console.log("🎬 Kling Prompt Generator JS loaded at", new Date().toISOString());

// DOM refs
const dropZone = $("#dropZone");
const fileInput = $("#fileInput");
const previewContainer = $("#previewContainer");
const videoPreview = $("#videoPreview");
const fileNameEl = $("#fileName");
const clearBtn = $("#clearBtn");
const analyzeBtn = $("#analyzeBtn");
const progress = $("#progress");
const progressText = $("#progressText");
const promptArea = $("#promptArea");
const optimizeBtn = $("#optimizeBtn");
const copyBtn = $("#copyBtn");
const optimizeProgress = $("#optimizeProgress");
const historyList = $("#historyList");
const toast = $("#toast");
const costInfoEl = $("#costInfo");
const singleOutput = $("#singleOutput");
const multishotOutput = $("#multishotOutput");
const shotCards = $("#shotCards");
const copyAllBtn = $("#copyAllBtn");

// YouTube DOM refs
const ytUrl = $("#ytUrl");
const ytDownloadBtn = $("#ytDownloadBtn");
const ytProgress = $("#ytProgress");
const ytProgressText = $("#ytProgressText");

// YouTube trim timestamp refs
const ytTrimStart = $("#ytTrimStart");
const ytTrimEnd = $("#ytTrimEnd");

// Upload trim timestamp refs (inside previewContainer, resolved lazily)
const trimStart = $("#trimStart");
const trimEnd = $("#trimEnd");

let selectedFile = null;
let serverFilename = null; // for YouTube-downloaded files
let currentMode = "multishot";
const history = [];

// ---- Input Source Tabs ----
document.querySelectorAll(".input-tab").forEach((tab) => {
  tab.addEventListener("click", () => {
    document.querySelectorAll(".input-tab").forEach((t) => t.classList.remove("active"));
    document.querySelectorAll(".tab-content").forEach((c) => c.classList.remove("active"));
    tab.classList.add("active");
    const target = tab.dataset.tab;
    if (target === "upload") {
      $("#tabUpload").classList.add("active");
    } else {
      $("#tabYoutube").classList.add("active");
    }
  });
});

// ---- Mode Toggle ----
document.querySelectorAll('input[name="mode"]').forEach((radio) => {
  radio.addEventListener("change", (e) => {
    currentMode = e.target.value;
  });
});

// ---- Helpers ----
function showToast(msg, duration = 2500) {
  toast.textContent = msg;
  toast.classList.remove("hidden");
  toast.classList.add("show");
  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.classList.add("hidden"), 300);
  }, duration);
}

function formatSize(bytes) {
  if (bytes < 1024) return bytes + " B";
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
  return (bytes / (1024 * 1024)).toFixed(1) + " MB";
}

function formatTime() {
  return new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

// ---- File Selection ----
function handleFile(file) {
  const allowed = ["video/mp4", "video/webm", "video/quicktime"];
  if (!allowed.includes(file.type)) {
    showToast("⚠️ Unsupported format. Use MP4, WebM, or MOV.");
    return;
  }
  if (file.size > 2 * 1024 * 1024 * 1024) {
    showToast("⚠️ File too large (max 2 GB).");
    return;
  }

  selectedFile = file;
  serverFilename = null; // clear any YouTube file
  const url = URL.createObjectURL(file);
  videoPreview.src = url;
  fileNameEl.textContent = `${file.name} (${formatSize(file.size)})`;
  dropZone.classList.add("hidden");
  previewContainer.classList.remove("hidden");
  const uploadTrimRow = $("#uploadTrimRow");
  if (uploadTrimRow) uploadTrimRow.style.display = "";
  analyzeBtn.disabled = false;
  showFramesSection();
}

function showServerVideo(videoPath, label) {
  videoPreview.src = videoPath;
  fileNameEl.textContent = label;
  previewContainer.classList.remove("hidden");
  analyzeBtn.disabled = false;
  showFramesSection();
}

console.log("dropZone:", dropZone, "fileInput:", fileInput);
dropZone.addEventListener("click", () => { console.log("dropZone clicked"); fileInput.click(); });
fileInput.addEventListener("change", (e) => {
  console.log("fileInput changed:", e.target.files);
  if (e.target.files[0]) handleFile(e.target.files[0]);
});

// Drag & Drop
dropZone.addEventListener("dragover", (e) => {
  e.preventDefault();
  dropZone.classList.add("dragover");
});
dropZone.addEventListener("dragleave", () => {
  dropZone.classList.remove("dragover");
});
dropZone.addEventListener("drop", (e) => {
  e.preventDefault();
  console.log("drop event:", e.dataTransfer.files);
  dropZone.classList.remove("dragover");
  if (e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]);
});

// Clear
clearBtn.addEventListener("click", () => {
  selectedFile = null;
  serverFilename = null;
  videoPreview.src = "";
  fileInput.value = "";
  trimStart.value = "";
  trimEnd.value = "";
  previewContainer.classList.add("hidden");
  dropZone.classList.remove("hidden");
  analyzeBtn.disabled = true;
});

// ---- YouTube Download ----
ytDownloadBtn.addEventListener("click", async () => {
  const url = ytUrl.value.trim();
  if (!url) {
    showToast("⚠️ Please enter a YouTube URL.");
    return;
  }

  ytDownloadBtn.disabled = true;
  ytProgress.classList.remove("hidden");
  ytProgressText.textContent = "Downloading from YouTube…";

  try {
    const res = await fetch("/api/youtube", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        url,
        start: ytTrimStart.value.trim() || undefined,
        end: ytTrimEnd.value.trim() || undefined,
        quality: $("#ytQuality").value || "720",
      }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Download failed");

    // Store server filename for analyze-local
    selectedFile = null;
    serverFilename = data.filename;

    showServerVideo(data.videoPath, `YouTube: ${data.filename}`);
    showToast("✅ YouTube download complete!");
  } catch (err) {
    showToast("❌ " + err.message, 4000);
  } finally {
    ytProgress.classList.add("hidden");
    ytDownloadBtn.disabled = false;
  }
});

// ---- Analyze ----
analyzeBtn.addEventListener("click", async () => {
  // Determine source: local file upload or server-side YouTube file
  const isServerFile = !selectedFile && serverFilename;

  if (!selectedFile && !serverFilename) return;

  analyzeBtn.disabled = true;
  progress.classList.remove("hidden");
  progressText.textContent = "Uploading & analyzing… This may take a minute.";

  try {
    let data;

    const startVal = trimStart ? trimStart.value.trim() : "";
    const endVal = trimEnd ? trimEnd.value.trim() : "";

    if (isServerFile) {
      // Use analyze-local endpoint (no upload needed)
      progressText.textContent = "Analyzing server-side video…";
      const res = await fetch("/api/analyze-local", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          filename: serverFilename,
          mode: currentMode,
          start: startVal || undefined,
          end: endVal || undefined,
        }),
      });
      data = await res.json();
      if (!res.ok) throw new Error(data.error || "Server error");
    } else {
      // Original file upload flow — pass trim params as query
      const formData = new FormData();
      formData.append("video", selectedFile);
      const params = new URLSearchParams({ mode: currentMode });
      if (startVal) params.set("start", startVal);
      if (endVal) params.set("end", endVal);
      const res = await fetch(`/api/analyze?${params}`, { method: "POST", body: formData });
      data = await res.json();
      if (!res.ok) throw new Error(data.error || "Server error");
    }

    if (currentMode === "multishot") {
      displayMultishot(data.prompt);
      copyBtn.classList.add("hidden");
      copyAllBtn.classList.remove("hidden");
      copyAllBtn.disabled = false;

    } else {
      singleOutput.classList.remove("hidden");
      multishotOutput.classList.add("hidden");
      promptArea.value = data.prompt;
      copyBtn.classList.remove("hidden");
      copyBtn.disabled = false;
      copyAllBtn.classList.add("hidden");
    }
    optimizeBtn.disabled = false;

    // Show cost
    if (data.cost) {
      costInfoEl.innerHTML = `
        <span class="cost-item">💰 <span class="cost-value">$${data.cost.costUsd}</span> (≈¥${data.cost.costJpy})</span>
        <span class="cost-item">📥 Input: <span class="cost-value">${data.cost.inputTokens.toLocaleString()}</span></span>
        <span class="cost-item">📤 Output: <span class="cost-value">${data.cost.outputTokens.toLocaleString()}</span></span>
        <span class="cost-item">📊 Total: <span class="cost-value">${data.cost.totalTokens.toLocaleString()}</span></span>
      `;
      costInfoEl.classList.remove("hidden");
    }

    // Add to history
    addHistory(data.prompt);
    showToast("✅ Analysis complete!");
  } catch (err) {
    showToast("❌ " + err.message, 4000);
  } finally {
    progress.classList.add("hidden");
    analyzeBtn.disabled = false;
  }
});

// ---- Optimize ----
optimizeBtn.addEventListener("click", async () => {
  const text = promptArea.value.trim();
  if (!text) return;

  optimizeBtn.disabled = true;
  optimizeProgress.classList.remove("hidden");

  try {
    const res = await fetch("/api/optimize", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: text }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Server error");

    promptArea.value = data.prompt;
    addHistory(data.prompt);
    showToast("⚡ Optimized for Kling AI!");
  } catch (err) {
    showToast("❌ " + err.message, 4000);
  } finally {
    optimizeProgress.classList.add("hidden");
    optimizeBtn.disabled = false;
  }
});

// ---- Copy ----
copyBtn.addEventListener("click", () => {
  const text = promptArea.value.trim();
  if (!text) return;
  navigator.clipboard.writeText(text).then(() => {
    showToast("📋 Copied to clipboard!");
  });
});

// ---- History ----
function addHistory(prompt) {
  history.unshift({ time: formatTime(), prompt });

  // Re-render
  historyList.innerHTML = "";
  history.forEach((item, idx) => {
    const card = document.createElement("div");
    card.className = "history-card";
    card.innerHTML = `
      <span class="history-time">${item.time}</span>
      <div class="history-prompt">${escapeHtml(item.prompt)}</div>
    `;
    card.addEventListener("click", () => {
      promptArea.value = item.prompt;
      optimizeBtn.disabled = false;
      copyBtn.disabled = false;
      showToast("Loaded from history");
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
    historyList.appendChild(card);
  });
}

function escapeHtml(str) {
  const d = document.createElement("div");
  d.textContent = str;
  return d.innerHTML;
}

// ---- Multi-shot Display ----
function parseShots(text) {
  const shots = [];
  const regex = /\[Shot\s*(\d+)\]\s*\n?([\s\S]*?)(?=\[Shot\s*\d+\]|$)/gi;
  let match;
  while ((match = regex.exec(text)) !== null) {
    shots.push({
      label: `Shot ${match[1]}`,
      text: match[2].trim(),
    });
  }
  // Fallback: if no [Shot N] markers, split by double newline
  if (shots.length === 0) {
    const parts = text.split(/\n\n+/).filter((p) => p.trim());
    parts.forEach((p, i) => {
      shots.push({ label: `Shot ${i + 1}`, text: p.trim() });
    });
  }
  return shots;
}

function displayMultishot(text) {
  singleOutput.classList.add("hidden");
  multishotOutput.classList.remove("hidden");
  shotCards.innerHTML = "";

  const shots = parseShots(text);
  shots.forEach((shot, idx) => {
    const card = document.createElement("div");
    card.className = "shot-card";
    card.innerHTML = `
      <div class="shot-header">
        <span class="shot-label">${shot.label}</span>
        <button class="shot-copy-btn">📋 Copy</button>
      </div>
      <textarea class="shot-text" spellcheck="false">${escapeHtml(shot.text)}</textarea>
    `;

    // Copy button
    const copyBtnEl = card.querySelector(".shot-copy-btn");
    const textArea = card.querySelector(".shot-text");
    copyBtnEl.addEventListener("click", () => {
      navigator.clipboard.writeText(textArea.value).then(() => {
        showToast(`📋 ${shot.label} copied!`);
      });
    });

    shotCards.appendChild(card);
  });
}

// ---- Frames Gallery ----
const framesSection = $("#framesSection");
const framesGallery = $("#framesGallery");
const extractFramesBtn = $("#extractFramesBtn");
const downloadAllFramesBtn = $("#downloadAllFramesBtn");
const frameInterval = $("#frameInterval");
const framesProgress = $("#framesProgress");
const framesProgressText = $("#framesProgressText");

let currentFrames = [];

function getVideoFilename() {
  return serverFilename || (videoPreview.src ? videoPreview.src.split("/").pop() : null);
}

// Show frames section when video is loaded
function showFramesSection() {
  framesSection.classList.remove("hidden");
}

extractFramesBtn.addEventListener("click", async () => {
  let filename = serverFilename;

  // If file was uploaded locally but not yet on server, upload it first
  if (!filename && selectedFile) {
    extractFramesBtn.disabled = true;
    framesProgress.classList.remove("hidden");
    framesProgressText.textContent = "Uploading video to server…";
    try {
      const formData = new FormData();
      formData.append("video", selectedFile);
      const startVal = trimStart ? trimStart.value.trim() : "";
      const endVal = trimEnd ? trimEnd.value.trim() : "";
      const params = new URLSearchParams();
      if (startVal) params.set("start", startVal);
      if (endVal) params.set("end", endVal);
      const uploadUrl = "/api/upload-only" + (params.toString() ? "?" + params : "");
      const uploadRes = await fetch(uploadUrl, { method: "POST", body: formData });
      const uploadData = await uploadRes.json();
      if (!uploadRes.ok) throw new Error(uploadData.error || "Upload failed");
      serverFilename = uploadData.filename;
      filename = uploadData.filename;
      // Update video preview to server URL
      videoPreview.src = uploadData.videoPath;
      showToast("✅ Video uploaded to server");
    } catch (err) {
      showToast("❌ " + err.message, 4000);
      framesProgress.classList.add("hidden");
      extractFramesBtn.disabled = false;
      return;
    }
  }

  if (!filename) {
    showToast("⚠️ No video loaded. Please upload or download a video first.");
    return;
  }

  extractFramesBtn.disabled = true;
  framesProgress.classList.remove("hidden");
  framesProgressText.textContent = "Extracting frames…";
  framesGallery.innerHTML = "";
  currentFrames = [];

  try {
    const res = await fetch("/api/extract-frames", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ filename, interval: frameInterval.value }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Extraction failed");

    currentFrames = data.frames;
    renderFramesGallery(data.frames);
    downloadAllFramesBtn.classList.remove("hidden");
    showToast(`✅ ${data.frames.length} frames extracted!`);
  } catch (err) {
    showToast("❌ " + err.message, 4000);
  } finally {
    framesProgress.classList.add("hidden");
    extractFramesBtn.disabled = false;
  }
});

function renderFramesGallery(frames) {
  framesGallery.innerHTML = "";
  frames.forEach((frame) => {
    const card = document.createElement("div");
    card.className = "frame-card";
    const timeSec = frame.timestamp;
    const timeStr = `${Math.floor(timeSec / 60)}:${String(Math.floor(timeSec % 60)).padStart(2, "0")}.${String(Math.round((timeSec % 1) * 10))}`;

    card.innerHTML = `
      <img src="${frame.url}" alt="Frame at ${timeStr}" loading="lazy" />
      <div class="frame-card-info">
        <span>${timeStr}</span>
        <div class="frame-card-actions">
          <button class="frame-dl-btn frame-copy-btn" title="Copy image">📋</button>
          <a href="${frame.url}" download="${frame.filename}" class="frame-dl-btn" title="Download">⬇️</a>
        </div>
      </div>
    `;

    // Copy image to clipboard
    const copyBtn = card.querySelector(".frame-copy-btn");
    copyBtn.addEventListener("click", async (e) => {
      e.stopPropagation();
      try {
        const response = await fetch(frame.url);
        const blob = await response.blob();
        await navigator.clipboard.write([
          new ClipboardItem({ [blob.type]: blob }),
        ]);
        showToast(`📋 Frame copied! (${timeStr})`);
      } catch (err) {
        // Fallback: open in new tab
        window.open(frame.url, "_blank");
        showToast("Opened in new tab (clipboard not available)");
      }
    });

    // Click card to open lightbox
    card.querySelector("img").addEventListener("click", (e) => {
      e.stopPropagation();
      openLightbox(frame.url, timeStr);
    });

    framesGallery.appendChild(card);
  });
}

// ---- Lightbox ----
function openLightbox(src, label) {
  const existing = document.querySelector(".lightbox");
  if (existing) existing.remove();

  const lb = document.createElement("div");
  lb.className = "lightbox";
  lb.innerHTML = `
    <img src="${src}" alt="${label}" />
    <div class="lightbox-info">${label || ""}</div>
  `;
  lb.addEventListener("click", () => lb.remove());
  document.addEventListener("keydown", function handler(e) {
    if (e.key === "Escape") {
      lb.remove();
      document.removeEventListener("keydown", handler);
    }
  });
  document.body.appendChild(lb);
}

// Download all frames as a zip (simple: open each in new tab)
downloadAllFramesBtn.addEventListener("click", () => {
  if (currentFrames.length === 0) return;
  currentFrames.forEach((frame) => {
    const a = document.createElement("a");
    a.href = frame.url;
    a.download = frame.filename;
    a.click();
  });
  showToast(`⬇️ Downloading ${currentFrames.length} frames…`);
});

// ---- Copy All Shots ----
copyAllBtn.addEventListener("click", () => {
  const textAreas = multishotOutput.querySelectorAll(".shot-text");
  const labels = multishotOutput.querySelectorAll(".shot-label");
  let all = "";
  textAreas.forEach((ta, i) => {
    all += `[${labels[i]?.textContent || "Shot " + (i + 1)}]\n${ta.value}\n\n`;
  });
  navigator.clipboard.writeText(all.trim()).then(() => {
    showToast("📋 All shots copied!");
  });
});
