# TOOLS.md - Local Notes

## Environment

- **OS:** WSL2 on Windows
- **Drives:** C: → /mnt/c, G: (Google Drive) → /mnt/g (自動マウント)

---

## Google Calendar (gog CLI)

**アカウント:** near0248@gmail.com
**コマンド例:**
```bash
GOG_KEYRING_PASSWORD="gog" gog calendar events primary --from YYYY-MM-DD --to YYYY-MM-DD
GOG_KEYRING_PASSWORD="gog" gog calendar list
```

**注意:** 実行時は必ず `GOG_KEYRING_PASSWORD="gog"` を付ける

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
