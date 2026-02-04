---
name: meeting-minutes
description: Create full meeting transcripts and detailed meeting minutes/summaries from provided audio, transcripts, or notes (議事録/文字起こし). Use for requests like "議事録を作って", "文字起こし", "meeting minutes", or "summarize this meeting", especially in #議事録サポート, and include project-context reach plus action items.
---

# Meeting Minutes

## Overview
Produce (1) a complete transcript and (2) a detailed structured summary from meeting audio/transcripts, after performing project-context reach.

## 重要原則：情報の補完ルール

### ✅ 許可される補完
- **既存コンテキストを使った補完**：master-context.md等の正式ドキュメントを参照し、文字起こしの技術用語・略語・文脈を補完する
- **文字起こし誤認識の修正**：音声認識で崩れた単語を、コンテキストから正しい用語に修正する（例：「ブイエリア」→「VLA」）
- **話者の推定**：文脈から話者を推定し、明示する（確信度が低い場合は「参加者:」とする）

### ❌ 禁止される補完
- **議論されていない内容の追加**：会議で話されていない背景情報を勝手に追加する
- **推測による詳細の創作**：「おそらく〜だと思われる」という曖昧な記述で不明点を埋める
- **一般的知識での穴埋め**：コンテキストに記載のない情報を一般知識で補う

### 不明点の処理
- 不明確な点は「要確認」「未記載」として明示する
- 不足情報があれば、ユーザーにヒアリングして確認する
- 確認事項リストを作成し、誰に何を確認すべきかを整理する
- ユーザーから追加情報を得たら、ドキュメントに反映する

## Workflow
1) Gather inputs
2) Context reach (mandatory)
3) Produce transcript
4) Produce detailed summary
5) Deliver in required format

### 1) Gather inputs
- Accept: audio files, raw transcript text, meeting notes, slides, docs.
- If multiple files, order by timestamp/filename and merge.
- If only audio is provided:
  - Check whether a local transcription tool is available (e.g., whisper/faster-whisper).
  - If unavailable, ask the user for a transcript or permission to use an external method.
- Detect language (JP/EN) and keep output language consistent with input unless requested.

### 2) Context reach (mandatory)
- Identify project from: meeting title, channel name, file names, participants, keywords.
- Search workspace for relevant docs:
  - Projects/**/master-context.md
  - meeting-notes/** (previous minutes)
  - TODO.md, MEMORY.md, memory/YYYY-MM-DD.md (recent decisions)
- Read the most relevant documents and keep key terms for the summary.
- If context remains unclear: ask for project name or a link to relevant docs before summarizing.

### 3) Full transcript (全文文字起こし)
- Preserve chronological order; do not invent content.
- Keep speaker labels; if missing, use "Speaker 1/2..." and keep consistent.
- If timestamps exist, keep them. If missing, do not fabricate.
- Mark unclear audio as [inaudible] / [不明] instead of guessing.
- Normalize formatting (one utterance per line).

### 4) Detailed summary (詳細サマリー)
Include:
- 会議概要（目的/参加者/時間・日付 if known）
- 議題別サマリー（トピックごとに箇条書き）
- 決定事項 (Decisions)
- アクションアイテム (owner, due, status)
- 課題/リスク/未決事項
- 次回までの宿題/フォローアップ
- 5行要約（短く、結論中心）
Use references from context reach to clarify terms; do not add facts not in sources.

### 5) Output format
Provide exactly two main sections, in this order:

## 全文文字起こし
...

## 詳細サマリー
...

- Embed the 5-line summary and action items inside the 詳細サマリー section.
- If something is missing (participants, date), state "未記載" instead of guessing.
- Include "未確認事項（要フォローアップ）" section listing items that need verification.

### 6) 不明点の処理フロー

1. **素材を受け取ったら**：まず内容を確認し、不明確な点をリストアップ
2. **確認事項を提示**：ユーザーに質問形式で確認（「Q1: 〇〇は何ですか？」）
3. **回答を待つ or 「要確認」で進める**：ユーザー判断に委ねる
4. **追加情報を反映**：回答があれば議事録を更新
5. **確認先を記録**：「誰に」「何を」確認すべきかを議事録内に明記

**禁止事項:**
- 文脈から推測して詳細を補完する
- 一般的な知識で不明点を埋める
- 「おそらく〜だと思われる」という曖昧な記述で済ませる
