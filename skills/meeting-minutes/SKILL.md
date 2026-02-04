---
name: meeting-minutes
description: Create full meeting transcripts and detailed meeting minutes/summaries from provided audio, transcripts, or notes (議事録/文字起こし). Use for requests like "議事録を作って", "文字起こし", "meeting minutes", or "summarize this meeting", especially in #議事録サポート, and include project-context reach plus action items.
---

# Meeting Minutes

## Overview
Produce (1) a complete transcript and (2) a detailed structured summary from meeting audio/transcripts, after performing project-context reach.

## 重要原則：不確実な情報を埋めない

**背景情報や詳細を勝手に推測・補完しない。**

- 不明確な点は「要確認」「未記載」として明示する
- 不足情報があれば、ユーザーにヒアリングして確認する
- 確認事項リストを作成し、誰に何を確認すべきかを整理する
- ユーザーから追加情報を得たら、ドキュメントに反映する

この原則により、議事録の信頼性と正確性を担保する。

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
