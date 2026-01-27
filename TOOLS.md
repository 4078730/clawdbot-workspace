# TOOLS.md - Local Notes

## Obsidian Vault

**Path:** `~/research/obsidian-vault` (symlink → `/mnt/g/マイドライブ/Obsidian/Obsidian`)

**注意:** WSL起動後、Gドライブ未マウントなら `sudo mount -t drvfs G: /mnt/g`
→ 自動化済み（.bashrc + sudoers）

**構造:**
- `Tasks/active.md` → タスク管理
- `Notes/{work,youtube,personal}.md` → メモ
- `Docs/` → 資料
- `Context/` → 自動更新OK
- `Projects/` → プロジェクト別ドキュメント
- `Agent/` → Clawdbotワークスペース（このフォルダ）

**触らない:** TaskNotes/, .obsidian/, Archive/

**タスク形式:** `- [ ] 内容 \`due:YYYY-MM-DD\``

---

## Environment

- **OS:** WSL2 on Windows
- **Drives:** C: → /mnt/c, G: (Google Drive) → /mnt/g (自動マウント)
- **Clawdbot workspace:** `~/research/obsidian-vault/Agent/`

---

## konukiとのルール

### 😊 リアクションの使い方
返信するほどでもないけど無視は失礼なとき、リアクションで応答：

- 「ああ」「なるほど」「了解」→ 👍 か 👀
- 面白い・笑った → 😂
- 承認・完了 → ✅
- 考え中・興味深い → 🤔
- 感謝 → ❤️ か 🙌

1メッセージに1リアクションまで。

### 📝 プラットフォーム別フォーマット
- **Discord/WhatsApp:** markdownテーブル使わない。箇条書きで。
- **Discordリンク:** 複数リンクは `<>` で囲んでembed抑制
- **WhatsApp:** ヘッダーなし — **太字**やCAPSで強調

### 💓 ハートビートの使い方

**連絡するとき:**
- 重要なメールが来た
- カレンダーイベントが近い（2時間以内）
- 面白いものを見つけた
- 8時間以上何も言ってない

**黙るとき (HEARTBEAT_OK):**
- 深夜（23:00-08:00）緊急以外
- 人間が明らかに忙しい
- 前回チェックから新しいことがない
- 30分以内にチェックした

### Heartbeat vs Cron
- **Heartbeat:** 複数チェックをバッチ、最近のコンテキスト必要、タイミングずれてもOK
- **Cron:** 正確なタイミング、分離必要、単発リマインダー

### Git Pull通知
- Github PullからメンションされたらすぐにPull → 完了報告

---

## YouTube制作

**チャンネル:** AnimeLiveAction
**フロー:** Nanobanana Pro（画像生成）→ KLING AI（動画化）→ 編集

---

## スキル

- `nano-banana-pro` — 画像生成API（設定済み）
