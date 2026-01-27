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

### Git運用
- ファイル編集 → commit → push をセットで
- コミットメッセージに `[clawd]` プレフィックスをつける
- Github Pullからメンションされたら → `[clawd]`なら無視、それ以外はPull → 完了報告（変更内容も記載）

---

## YouTube制作

**チャンネル:** AnimeLiveAction
**フロー:** Nanobanana Pro（画像生成）→ KLING AI（動画化）→ 編集

---

## スキル

- `nano-banana-pro` — 画像生成API（設定済み）
