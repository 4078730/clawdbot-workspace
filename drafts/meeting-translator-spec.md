# Meeting Translator — 仕様・設計書

## 1. プロダクト概要

### 1.1 目的
英語でのTeamsミーティング中に、相手の英語発言をリアルタイムで文字起こし＋日本語翻訳し、
同時に自分が言いたいことを日本語で入力すると英語に変換してくれるWebアプリ。

### 1.2 ターゲットユーザー
- 英語ミーティングに参加する日本語話者
- Windows環境

### 1.3 コア機能
| ID | 機能 | 説明 |
|----|------|------|
| F1 | リアルタイム英語文字起こし | 相手の英語音声をリアルタイムでテキスト化 |
| F2 | リアルタイム日本語翻訳 | 文字起こしされた英語を即座に日本語に翻訳 |
| F3 | 日→英テキスト翻訳 | 日本語テキスト入力 → 英語翻訳 → コピー可能 |
| F4 | 会話ログ | セッション中の全発言を英語・日本語で記録 |
| F5 | ログエクスポート | 会話ログをCSV/テキストで出力 |

---

## 2. 技術アーキテクチャ

### 2.1 全体構成図

```
┌─────────────────────────────────────────────────────┐
│  Teams Meeting (相手の英語音声)                        │
└──────────┬──────────────────────────────────────────┘
           │ システム音声
           ▼
┌──────────────────────────┐
│  ブラウザ音声キャプチャ     │  getDisplayMedia API
│  (PCM 16bit / 16kHz)     │  ※画面共有ダイアログで
│                          │    「システム音声」を選択
└──────────┬───────────────┘
           │ AudioWorklet → Base64 PCM chunks
           ▼
┌──────────────────────────┐
│  Next.js Backend          │
│  (API Route / WebSocket)  │
└──────────┬───────────────┘
           │ WebSocket
           ▼
┌──────────────────────────────────────────────┐
│  Gemini Live API (gemini-3-flash)             │
│                                              │
│  System Instruction:                         │
│  「音声を英語で文字起こしし、                    │
│    日本語翻訳も併せて返してください」             │
│                                              │
│  → 英語テキスト + 日本語翻訳を同時返却          │
└──────────┬───────────────────────────────────┘
           │ JSON response (streaming)
           ▼
┌──────────────────────────┐
│  フロントエンド表示         │
│  ・英語文字起こし（左列）   │
│  ・日本語翻訳（右列）       │
│  ・会話ログ蓄積            │
└──────────────────────────┘

┌──────────────────────────────────────────────┐
│  日→英翻訳入力欄                               │
│  日本語テキスト → Gemini 3 Flash API            │
│  → 英語翻訳テキスト → コピーボタン              │
└──────────────────────────────────────────────┘
```

### 2.2 技術スタック

| レイヤー | 技術 | バージョン | 理由 |
|---------|------|-----------|------|
| フロントエンド | Next.js + React | 15.x | 高速開発、SSR不要だがAPI Routeが便利 |
| スタイリング | Tailwind CSS | 4.x | ユーティリティファースト、高速UI構築 |
| 音声キャプチャ | Web Audio API + getDisplayMedia | ブラウザ標準 | 追加ソフト不要 |
| 音声処理 | AudioWorklet | ブラウザ標準 | メインスレッドをブロックしない |
| STT + 翻訳 | Gemini Live API | gemini-3-flash | WER 3.1%、STT+翻訳を1 APIで完結、コスパ最強 |
| 日→英翻訳 | Gemini API (REST) | gemini-3-flash | 同一モデルでAPI統一 |
| WebSocket | ws (Node.js) | 8.x | Gemini Live APIとの接続 |
| 状態管理 | React useState/useRef | — | シンプルに保つ |
| APIキー管理 | .env.local | — | ローカル実行前提 |

### 2.3 使用モデル

| 用途 | モデル | 根拠 |
|------|--------|------|
| **STT（音声認識）** | `gemini-3-flash` (Live API) | WER 3.1%、$1.92/1000分、リアルタイムストリーミング対応 |
| **英→日翻訳** | `gemini-3-flash` (Live API) | STTと同一コールで翻訳も指示 → レイテンシ削減 |
| **日→英翻訳** | `gemini-3-flash` (REST API) | テキスト→テキスト。同一モデルで統一 |

### 2.4 コスト見積もり

| 項目 | 単価 | 1時間の会議 | 月20時間 |
|------|------|-----------|---------|
| 音声入力 (STT) | $1.00 / 1M tokens | ~$0.10 | ~$2.00 |
| テキスト出力 (文字起こし+翻訳) | $3.00 / 1M tokens | ~$0.05 | ~$1.00 |
| 日→英翻訳 (テキスト入力) | $0.50 / 1M tokens | ~$0.01 | ~$0.20 |
| **合計** | | **~$0.16 ≈ ¥24** | **~$3.20 ≈ ¥480** |

---

## 3. 画面設計

### 3.1 メイン画面レイアウト

```
┌────────────────────────────────────────────────────┐
│  🎙️ Meeting Translator                    ⚙️ 設定  │
├────────────────────────────────────────────────────┤
│ [🔴 録音開始]  [⏹ 停止]  [📥 ログ出力]              │
├──────────────────────┬─────────────────────────────┤
│                      │                             │
│  📝 English          │  🇯🇵 日本語                  │
│  (文字起こし)         │  (翻訳)                     │
│ ─────────────────────┼───────────────────────────  │
│                      │                             │
│  "We should discuss  │  「まず予算の配分について      │
│   the budget         │    話し合うべきです」          │
│   allocation first." │                             │
│                      │                             │
│  "I think we need    │  「来週までにもう少し           │
│   more time to       │    データが必要だと            │
│   gather data        │    思います」                 │
│   by next week."     │                             │
│                      │                             │
│  ⬇ (自動スクロール)    │  ⬇ (自動スクロール)           │
│                      │                             │
├──────────────────────┴─────────────────────────────┤
│                                                    │
│  💬 日本語 → 英語 翻訳                               │
│  ┌──────────────────────────────────────────────┐  │
│  │ (ここに日本語を入力... Enter or Ctrl+Enterで翻訳) │  │
│  └──────────────────────────────────────────────┘  │
│                                                    │
│  翻訳結果:                                          │
│  "I will prepare the materials by tomorrow."        │
│                                        [📋 Copy]   │
│                                                    │
│  履歴:                                              │
│  ├ 了解しました → "Understood."           [📋]      │
│  └ 資料を送ります → "I will send the doc." [📋]      │
│                                                    │
└────────────────────────────────────────────────────┘
```

### 3.2 設定画面

| 設定項目 | デフォルト値 | 説明 |
|---------|------------|------|
| Gemini API Key | (空) | Google AI Studio で取得 |
| 翻訳元言語 | 英語 | STT対象言語 |
| 翻訳先言語 | 日本語 | 翻訳表示言語 |
| フォントサイズ | 16px | 文字起こし・翻訳の文字サイズ |
| 自動スクロール | ON | 新しい発言で自動的に下にスクロール |

---

## 4. 詳細設計

### 4.1 音声キャプチャフロー

```
1. ユーザーが「録音開始」をクリック
2. navigator.mediaDevices.getDisplayMedia({ audio: true, video: true }) を呼び出し
   - ユーザーに画面共有ダイアログが表示される
   - 「画面全体」or「ウィンドウ」を選択し「システムの音声を共有」にチェック
   - ※ video track は使用しない（即座に stop()）
3. audio track を取得
4. AudioContext + AudioWorkletNode で PCM 16bit / 16kHz にリサンプリング
5. AudioWorklet から定期的に（250ms間隔）PCM チャンクを Base64 エンコードして送信
```

### 4.2 Gemini Live API 接続

```
接続先: wss://generativelanguage.googleapis.com/ws/google.ai.generativelanguage.v1beta.GenerativeService.BidiGenerateContent

セッション設定 (setup message):
{
  "setup": {
    "model": "models/gemini-3-flash",
    "generation_config": {
      "response_modalities": ["TEXT"],
      "temperature": 0.1
    },
    "system_instruction": {
      "parts": [{
        "text": "You are a real-time meeting transcription and translation assistant.\n\nYour task:\n1. Transcribe the English audio input accurately.\n2. Translate the transcription into natural Japanese.\n\nOutput format (strict JSON):\n{\"en\": \"<English transcription>\", \"ja\": \"<Japanese translation>\"}\n\nRules:\n- Output ONLY the JSON object, nothing else.\n- If the audio is unclear or silent, output: {\"en\": \"\", \"ja\": \"\"}\n- Preserve the speaker's intent and nuance in translation.\n- Use natural, conversational Japanese (not overly formal).\n- Process each utterance as it comes, don't wait for complete sentences."
      }]
    },
    "input_audio_transcription": {}
  }
}

音声送信 (realtime_input message):
{
  "realtime_input": {
    "media_chunks": [{
      "data": "<base64_encoded_pcm_audio>",
      "mime_type": "audio/pcm;rate=16000"
    }]
  }
}
```

### 4.3 レスポンス処理

```typescript
// Gemini Live API からのレスポンスを処理
interface TranscriptionResult {
  en: string;  // 英語文字起こし
  ja: string;  // 日本語翻訳
  timestamp: number;
}

// サーバーイベントの種類
// 1. setupComplete - セッション確立完了
// 2. serverContent - テキスト応答（文字起こし+翻訳）
// 3. inputTranscription - 入力音声の文字起こし（input_audio_transcription有効時）

// serverContent.modelTurn.parts[].text をパースして
// { en, ja } を抽出 → フロントに送信
```

### 4.4 日→英翻訳（REST API）

```typescript
// POST /api/translate
// Request:  { text: "資料を準備します", direction: "ja-to-en" }
// Response: { translated: "I will prepare the materials." }

// Gemini 3 Flash REST API を使用
// model: gemini-3-flash
// prompt: "Translate the following Japanese text to natural, 
//          professional English for use in a business meeting.
//          Output ONLY the English translation, nothing else.
//          Japanese: {input}"
```

### 4.5 会話ログ管理

```typescript
interface LogEntry {
  id: string;
  timestamp: Date;
  type: 'transcription' | 'user-translation';
  en: string;
  ja: string;
}

// ログは React state で保持（セッション中のみ）
// エクスポート時に CSV 形式で出力:
// timestamp, type, english, japanese
```

---

## 5. ファイル構成

```
meeting-translator/
├── package.json
├── .env.local.example          # GEMINI_API_KEY=your_key_here
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
│
├── src/
│   ├── app/
│   │   ├── layout.tsx          # ルートレイアウト
│   │   ├── page.tsx            # メイン画面
│   │   └── globals.css         # Tailwind imports
│   │
│   ├── components/
│   │   ├── TranscriptionPanel.tsx   # 英語文字起こし表示パネル
│   │   ├── TranslationPanel.tsx     # 日本語翻訳表示パネル
│   │   ├── InputTranslator.tsx      # 日→英テキスト入力・翻訳
│   │   ├── ControlBar.tsx           # 録音開始/停止/設定ボタン
│   │   ├── SettingsModal.tsx        # 設定モーダル
│   │   └── LogExporter.tsx          # ログ出力ボタン
│   │
│   ├── hooks/
│   │   ├── useAudioCapture.ts       # 音声キャプチャ (getDisplayMedia)
│   │   ├── useGeminiLive.ts         # Gemini Live API WebSocket管理
│   │   └── useTranslation.ts        # 日→英 REST API呼び出し
│   │
│   ├── lib/
│   │   ├── gemini-live.ts           # Gemini Live API接続・メッセージ処理
│   │   ├── audio-processor.ts       # AudioWorklet プロセッサ
│   │   └── export.ts                # CSV/テキスト出力ユーティリティ
│   │
│   ├── api/
│   │   └── translate/
│   │       └── route.ts             # POST /api/translate (日→英)
│   │
│   └── types/
│       └── index.ts                 # 型定義
│
├── public/
│   └── audio-worklet-processor.js   # AudioWorklet用ワーカー
│
└── README.md
```

---

## 6. データフロー図

### 6.1 リアルタイム文字起こし+翻訳

```
[Teams音声] 
  → getDisplayMedia (audio track)
  → AudioWorkletNode (PCM 16bit/16kHz, 250msチャンク)
  → WebSocket → Next.js API Route (proxy)
  → WebSocket → Gemini Live API
  → {"en": "...", "ja": "..."} 
  → WebSocket → フロントエンド
  → TranscriptionPanel (英語) + TranslationPanel (日本語)
  → LogEntry追加
```

### 6.2 日→英翻訳

```
[ユーザー入力] 
  → InputTranslator (React)
  → POST /api/translate
  → Gemini 3 Flash REST API
  → 英語テキスト
  → 画面表示 + コピーボタン
  → LogEntry追加
```

---

## 7. API設計

### 7.1 WebSocket: /api/gemini-live

| メッセージ方向 | 種類 | ペイロード |
|--------------|------|----------|
| Client → Server | `start` | `{ apiKey: string }` |
| Client → Server | `audio` | `{ data: string (base64 PCM) }` |
| Client → Server | `stop` | `{}` |
| Server → Client | `connected` | `{ sessionId: string }` |
| Server → Client | `transcription` | `{ en: string, ja: string, timestamp: number }` |
| Server → Client | `error` | `{ message: string }` |

### 7.2 REST: POST /api/translate

**Request:**
```json
{
  "text": "来週までに資料を準備します",
  "apiKey": "GEMINI_API_KEY"
}
```

**Response:**
```json
{
  "translated": "I will prepare the materials by next week.",
  "model": "gemini-3-flash"
}
```

---

## 8. 非機能要件

| 項目 | 要件 |
|------|------|
| **レイテンシ** | 音声入力から翻訳表示まで 2秒以内 |
| **対応ブラウザ** | Chrome / Edge (getDisplayMedia対応) |
| **対応OS** | Windows 10/11 |
| **同時接続** | シングルユーザー（ローカル実行） |
| **セキュリティ** | APIキーはサーバーサイドのみ。音声データは外部保存しない |
| **可用性** | Gemini API の可用性に依存 |

---

## 9. 開発フェーズ

| Phase | 内容 | 見積もり |
|-------|------|---------|
| **Phase 1** | プロジェクト作成 + UI骨格 + Tailwind設定 | 1h |
| **Phase 2** | 音声キャプチャ (getDisplayMedia + AudioWorklet) | 2h |
| **Phase 3** | Gemini Live API接続 + 文字起こし+翻訳パイプライン | 3h |
| **Phase 4** | 日→英テキスト翻訳機能 | 1h |
| **Phase 5** | 会話ログ + CSV出力 | 1h |
| **Phase 6** | UI仕上げ + テスト + バグ修正 | 2h |
| **合計** | | **約10時間** |

---

## 10. 将来の拡張案

| 機能 | 説明 | 優先度 |
|------|------|--------|
| STTモデル切り替え | Gemini / ElevenLabs Scribe v2 / gpt-4o-transcribe を選択可能 | 中 |
| オーバーレイモード | 半透明ウィンドウでTeams画面に重ねて表示 | 高 |
| 話者分離 | 複数話者を識別してラベル付け | 中 |
| 議事録自動生成 | 会議終了後にAIで要約を生成 | 中 |
| Virtual Audio Cable対応 | getDisplayMedia不要で音声取得 | 低 |
| Electronデスクトップ版 | ブラウザ不要、常駐アプリ化 | 低 |
| 用語辞書 | 業界用語・社内用語の登録で翻訳精度向上 | 高 |

---

## 11. セットアップ手順（ユーザー向け）

```bash
# 1. リポジトリをクローン
git clone <repo-url>
cd meeting-translator

# 2. 依存パッケージインストール
npm install

# 3. APIキー設定
cp .env.local.example .env.local
# .env.local を編集して GEMINI_API_KEY を設定
# Google AI Studio (https://aistudio.google.com/apikey) で取得

# 4. 開発サーバー起動
npm run dev

# 5. ブラウザで http://localhost:3000 を開く

# 6. 「録音開始」→ 画面共有ダイアログで「システム音声を共有」にチェック → Teams の音声が翻訳される
```

---

## 12. 参考リソース

| リソース | URL |
|---------|-----|
| Gemini Live API ドキュメント | https://ai.google.dev/gemini-api/docs/live |
| Gemini Live API 機能ガイド | https://ai.google.dev/gemini-api/docs/live-guide |
| Google AI Studio (APIキー取得) | https://aistudio.google.com/apikey |
| LiveCaptions-Translator (参考OSS) | https://github.com/SakiRinn/LiveCaptions-Translator |
| WhisperLive (参考OSS) | https://github.com/collabora/WhisperLive |
| Artificial Analysis STTランキング | https://artificialanalysis.ai/speech-to-text |
| getDisplayMedia API | https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getDisplayMedia |
| AudioWorklet | https://developer.mozilla.org/en-US/docs/Web/API/AudioWorklet |
