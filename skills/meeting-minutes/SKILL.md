---
name: meeting-minutes
description: Create full meeting transcripts and detailed meeting minutes/summaries from provided audio, transcripts, or notes (議事録/文字起こし). Use for requests like "議事録を作って", "文字起こし", "meeting minutes", or "summarize this meeting", especially in #議事録サポート, and include project-context reach plus action items.
---

# Meeting Minutes

## Overview
Produce (1) a complete transcript and (2) a detailed structured summary from meeting audio/transcripts, after performing project-context reach.

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
