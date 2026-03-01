# Meeting Translator — 実装計画書

**設計書:** `meeting-translator-spec.md` を参照
**リファレンス実装:** https://github.com/jsalsman/gemini-live （Gemini Live API接続の参考）

---

## 実装ステップ一覧

| Step | タスク | 依存 | 成果物 | 完了条件 |
|:----:|--------|:----:|--------|---------|
| 0 | 環境構築 | — | プロジェクト雛形 | `npm run dev` で起動できる |
| 1 | UIシェル | 0 | 画面の骨格 | 2カラム + 入力欄が表示される |
| 2 | 音声キャプチャ | 0 | AudioWorklet | システム音声がPCMチャンクで取れる |
| 3 | Gemini Live API接続 | 0 | WebSocket通信 | 接続→音声送信→テキスト受信できる |
| 4 | STT+翻訳パイプライン | 2,3 | 統合 | 音声→英語+日本語が画面に出る |
| 5 | 日→英テキスト翻訳 | 0 | REST API | 日本語入力→英語が表示される |
| 6 | 会話ログ+エクスポート | 4,5 | CSV出力 | ログがCSVで保存できる |
| 7 | UI仕上げ+テスト | 全て | 完成版 | 実際のTeams会議で使える |

---

## Step 0: 環境構築

### やること
```bash
npx create-next-app@latest meeting-translator \
  --typescript --tailwind --eslint --app --src-dir \
  --no-import-alias

cd meeting-translator
npm install @google/genai  # Google GenAI JS SDK
```

### ファイル作成
- `.env.local.example` → `GEMINI_API_KEY=your_key_here`
- `.env.local` → 実際のAPIキーを設定

### 完了条件
- `npm run dev` → `http://localhost:3000` でNext.jsのデフォルトページが表示される

---

## Step 1: UIシェル

### やること
`src/app/page.tsx` にメイン画面のレイアウトを作る。

### 作るコンポーネント
```
src/components/
├── ControlBar.tsx        # 録音開始/停止/ログ出力ボタン
├── TranscriptionPanel.tsx # 左列：英語文字起こし表示
├── TranslationPanel.tsx   # 右列：日本語翻訳表示
└── InputTranslator.tsx    # 下部：日→英テキスト入力
```

### レイアウト仕様
```
- ヘッダー: タイトル + 設定ボタン
- コントロールバー: [🔴 録音開始] [⏹ 停止] [📥 ログ出力]
- メインエリア（上部70%）: 左右2カラム
  - 左: 英語文字起こし（スクロール可能リスト）
  - 右: 日本語翻訳（スクロール可能リスト、左と1:1対応）
- 入力エリア（下部30%）:
  - テキストエリア（日本語入力）
  - 翻訳結果表示 + コピーボタン
  - 翻訳履歴（直近5件）
```

### モックデータ
最初はハードコードされたダミーデータで表示確認。

### 完了条件
- 2カラムレイアウトが表示される
- ダミーの英語・日本語テキストが並んで見える
- 入力欄にテキストが打てる
- レスポンシブではなくデスクトップ幅固定でOK

---

## Step 2: 音声キャプチャ

### やること
ブラウザの `getDisplayMedia` でシステム音声をキャプチャし、
AudioWorklet で PCM 16bit/16kHz にリサンプリングする。

### 作るファイル
```
src/hooks/useAudioCapture.ts    # React Hook
public/audio-worklet-processor.js # AudioWorklet Processor
```

### useAudioCapture.ts の API
```typescript
interface UseAudioCapture {
  isCapturing: boolean;
  startCapture: () => Promise<void>;
  stopCapture: () => void;
  onAudioChunk: (callback: (chunk: ArrayBuffer) => void) => void;
}
```

### AudioWorklet Processor の仕様
```javascript
// public/audio-worklet-processor.js
// - 入力: ブラウザのサンプルレート（通常48kHz）
// - 出力: PCM 16bit Int16Array, 16kHz
// - バッファサイズ: 4000サンプル (250ms @ 16kHz)
// - バッファが溜まったら port.postMessage() で送信
```

### 処理フロー
```
1. getDisplayMedia({ audio: true, video: true })
2. video track → track.stop() （不要）
3. audio track → new AudioContext({ sampleRate: 16000 })
4. createMediaStreamSource → AudioWorkletNode
5. AudioWorklet内: Float32 → Int16 変換 → 250msごとにpostMessage
6. メインスレッド: Int16Array → Base64エンコード → コールバック呼び出し
```

### テスト方法
- コンソールにチャンクサイズとデータを出力
- YouTubeを再生して音声がキャプチャできているか確認

### 完了条件
- 「録音開始」でシステム音声選択ダイアログが出る
- 250ms間隔でPCMチャンク（Base64）がコンソールに出力される
- 「停止」で音声キャプチャが止まる

---

## Step 3: Gemini Live API 接続

### やること
Gemini Live API に WebSocket で接続し、セッションを確立する。

### 参考実装
```
https://github.com/jsalsman/gemini-live
→ gemini-live.html 内の WebSocket接続部分を参考にする

https://github.com/google-gemini/gemini-live-api-examples
→ 公式サンプル
```

### 作るファイル
```
src/lib/gemini-live.ts     # Gemini Live API 接続クラス
src/hooks/useGeminiLive.ts # React Hook
```

### gemini-live.ts の API
```typescript
class GeminiLiveClient {
  constructor(apiKey: string);
  
  // 接続
  connect(): Promise<void>;
  
  // 音声チャンク送信
  sendAudio(base64PcmData: string): void;
  
  // 切断
  disconnect(): void;
  
  // イベントハンドラ
  onTranscription: (result: { en: string; ja: string }) => void;
  onError: (error: Error) => void;
  onConnected: () => void;
  onDisconnected: () => void;
}
```

### 接続シーケンス
```
1. WebSocket接続
   URL: wss://generativelanguage.googleapis.com/ws/google.ai.generativelanguage.v1beta.GenerativeService.BidiGenerateContent?key={API_KEY}

2. setup メッセージ送信
   {
     "setup": {
       "model": "models/gemini-3-flash",
       "generation_config": {
         "response_modalities": ["TEXT"],
         "temperature": 0.1
       },
       "system_instruction": {
         "parts": [{ "text": "..." }]  // 設計書 §4.2 参照
       },
       "input_audio_transcription": {}
     }
   }

3. setupComplete レスポンス待ち

4. 音声チャンク送信開始
   {
     "realtime_input": {
       "media_chunks": [{
         "data": "<base64>",
         "mime_type": "audio/pcm;rate=16000"
       }]
     }
   }

5. serverContent レスポンスを受信→パース
   → modelTurn.parts[].text から JSON抽出
   → { en, ja } をコールバックで返す
```

### 代替案（js-genai SDK を使う場合）
```typescript
// @google/genai SDK の Live API クライアントを使う方法もある
import { GoogleGenAI } from '@google/genai';
const ai = new GoogleGenAI({ apiKey });
const session = await ai.live.connect({
  model: 'gemini-3-flash',
  config: { ... }
});
// → SDKが WebSocket管理を抽象化してくれる
// リファレンス: jsalsman/gemini-live が使っている
```

**推奨: js-genai SDK を使う方向で実装する（生WebSocketより安定）**

### テスト方法
- マイク入力（getUserMedia）で簡易テスト
- 英語を話して文字起こし+翻訳がコンソールに出るか確認

### 完了条件
- Gemini Live API にWebSocket接続できる
- 音声を送信してテキストレスポンスを受信できる
- JSON形式で { en, ja } が取れる

---

## Step 4: STT+翻訳パイプライン統合

### やること
Step 2（音声キャプチャ）と Step 3（Gemini接続）を繋ぎ、
画面にリアルタイムで英語+日本語を表示する。

### 統合フロー
```
page.tsx
  ├── useAudioCapture() → onAudioChunk → sendAudio()
  ├── useGeminiLive()   → onTranscription → setEntries()
  ├── <TranscriptionPanel entries={entries} />  (英語)
  └── <TranslationPanel entries={entries} />    (日本語)
```

### 型定義
```typescript
// src/types/index.ts
interface TranscriptionEntry {
  id: string;
  timestamp: Date;
  en: string;
  ja: string;
  type: 'transcription';
}
```

### UI挙動
- 新しいエントリが追加されるたびにリストの末尾に追加
- 自動スクロール（最新が見える）
- 左右のスクロールは同期（同じエントリが同じ高さに並ぶ）

### テスト方法
- YouTubeで英語動画を再生 → システム音声キャプチャ → 翻訳表示を確認
- Teams会議のテスト（可能であれば）

### 完了条件
- 英語の音声がリアルタイムで文字起こしされ画面に表示される
- 同時に日本語翻訳も表示される
- 2秒以内の遅延で表示される

---

## Step 5: 日→英テキスト翻訳

### やること
下部の入力欄から日本語を入力し、Gemini REST API で英語に翻訳する。

### 作るファイル
```
src/app/api/translate/route.ts  # Next.js API Route
src/hooks/useTranslation.ts     # React Hook
```

### API Route (route.ts)
```typescript
// POST /api/translate
// Body: { text: string }
// Response: { translated: string }

// 内部で Google GenAI SDK を使う
import { GoogleGenerativeAI } from '@google/generative-ai';

const model = genAI.getGenerativeModel({ model: 'gemini-3-flash' });
const prompt = `Translate the following Japanese text to natural, 
professional English for use in a business meeting.
Output ONLY the English translation, nothing else.

Japanese: ${text}`;

const result = await model.generateContent(prompt);
return { translated: result.response.text() };
```

### useTranslation Hook
```typescript
interface UseTranslation {
  translate: (text: string) => Promise<string>;
  isTranslating: boolean;
  history: Array<{ ja: string; en: string }>;
}
```

### UI挙動
- テキストエリアに日本語を入力
- Enter（または翻訳ボタン）で送信
- ローディング表示 → 英語翻訳結果を表示
- コピーボタンでクリップボードにコピー
- 翻訳履歴を下に蓄積（直近5件表示、全件はログに保存）

### 完了条件
- 日本語入力 → 英語翻訳が表示される
- コピーボタンが動作する
- 翻訳履歴が表示される

---

## Step 6: 会話ログ + エクスポート

### やること
セッション中の全エントリ（文字起こし+翻訳、日→英翻訳）をログに保存し、
CSVでエクスポートできるようにする。

### 作るファイル
```
src/lib/export.ts           # CSV出力ユーティリティ
src/components/LogExporter.tsx  # エクスポートボタン
```

### CSV形式
```csv
timestamp,type,english,japanese
2026-03-01T10:00:05Z,transcription,"We need to finalize the budget.","予算を確定させる必要があります。"
2026-03-01T10:00:30Z,transcription,"Can you send me the report?","レポートを送ってもらえますか？"
2026-03-01T10:01:00Z,user-translation,"I will prepare it by tomorrow.","明日までに準備します"
```

### UI挙動
- 「📥 ログ出力」ボタンクリック → CSVファイルダウンロード
- ファイル名: `meeting-log-YYYY-MM-DD-HHmm.csv`

### 完了条件
- CSVファイルがダウンロードできる
- 内容が正しい（タイムスタンプ、英語、日本語が揃っている）

---

## Step 7: UI仕上げ + テスト

### やること

#### UI改善
- [ ] 接続状態インジケーター（🟢接続中 / 🔴未接続 / 🟡接続中...）
- [ ] エラー表示（API接続失敗、音声キャプチャ失敗など）
- [ ] 設定モーダル（APIキー入力、フォントサイズ変更）
- [ ] ダークモード対応
- [ ] 左右パネルの同期スクロール
- [ ] コピー成功時のトースト通知

#### テスト項目
- [ ] Chrome で動作確認
- [ ] Edge で動作確認
- [ ] 30分間の連続使用テスト（WebSocket切断なし）
- [ ] 音声がない区間のハンドリング（空レスポンス）
- [ ] 複数話者の文字起こし精度
- [ ] 日→英翻訳のレスポンス速度（1秒以内）
- [ ] CSVエクスポートの文字化け確認（UTF-8 BOM付き）
- [ ] APIキー未設定時のエラーハンドリング

#### エッジケース
- [ ] 画面共有を途中でキャンセルした場合
- [ ] Gemini API のレート制限に達した場合
- [ ] ネットワーク切断→復帰時の再接続
- [ ] 長時間セッション（1時間以上）でのメモリリーク

### 完了条件
- 実際のTeams会議で使えるレベルの品質
- 主要なエラーケースが適切にハンドリングされている

---

## 開発の進め方

### 推奨順序
```
Step 0 → Step 1 → Step 2 と Step 3 を並行 → Step 4 → Step 5 → Step 6 → Step 7
```

### 各Stepの注意点

| Step | 注意点 |
|:----:|--------|
| 0 | `@google/genai` のバージョンに注意。Live API対応版が必要 |
| 1 | Tailwind CSSのユーティリティで素早く。完璧を求めず骨格だけ |
| 2 | `getDisplayMedia` は HTTPS or localhost でのみ動作。AudioWorkletも同様 |
| 3 | **jsalsman/gemini-live のコードを参考にする**。特にWebSocket接続とメッセージ形式 |
| 4 | JSON パースが失敗するケースがある（Geminiが余計なテキストを返す）→ 正規表現でフォールバック |
| 5 | REST APIは簡単。ここは早く終わらせる |
| 6 | CSVのダブルクォートエスケープに注意 |
| 7 | Teams実環境テストが最重要。録音テスト用にYouTube英語動画でも代用可 |

---

## リファレンス実装リンク

| プロジェクト | URL | 参考箇所 |
|-------------|-----|---------|
| **gemini-live** (最重要) | https://github.com/jsalsman/gemini-live | Gemini Live API + js-genai SDK の接続実装 |
| gemini-live-api-examples (公式) | https://github.com/google-gemini/gemini-live-api-examples | API仕様の正しい使い方 |
| gemini_realtime_speech_to_text | https://github.com/folubebe/gemini_realtime_speech_to_text | 音声チャンク→Geminiの基本パターン |
| gemini-2-live-api-demo | https://github.com/ViaAnthroposBenevolentia/gemini-2-live-api-demo | 画面共有+音声のVanilla JS実装 |
| LiveCaptions-Translator | https://github.com/SakiRinn/LiveCaptions-Translator | オーバーレイUI、翻訳エンジン切り替え |
| Google Cloud公式チュートリアル | https://docs.cloud.google.com/vertex-ai/generative-ai/docs/live-api/get-started-websocket | WebSocket接続の公式ガイド |
| Google AI Developers Live Guide | https://ai.google.dev/gemini-api/docs/live-guide | input_audio_transcription 設定方法 |
