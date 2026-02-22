# TOOLS.md - 環境・ツール

## 環境

- **OS:** WSL2 on Windows
- **Drives:** C: → /mnt/c, G: (Google Drive) → /mnt/g (自動マウント)
- **OpenClaw Gateway:** systemdで自動起動済み（手動restart不要）

---

## OpenClaw設定

| パス | 内容 |
|------|------|
| `~/.openclaw/openclaw.json` | メイン設定 |
| `~/.openclaw/agents/main/agent/` | エージェント設定 |
| `~/.openclaw/agents/main/agent/auth-profiles.json` | 認証情報 |

**注意:** memory_searchにはauth-profiles.jsonにOpenAI APIキーが必要（~/.bashrcの環境変数だけでは不十分）

---

## Google Calendar (gog CLI)

**アカウント:** near0248@gmail.com
**カレンダー:** `pck7b9a6mp82g5hj4cpg1ff254@group.calendar.google.com` (Work-Sync — これだけ見ればOK)

```bash
GOG_KEYRING_PASSWORD="gog" gog calendar events "pck7b9a6mp82g5hj4cpg1ff254@group.calendar.google.com" --from YYYY-MM-DD --to YYYY-MM-DD
```

---

## Git運用

- ファイル編集 → commit → push をセット
- コミットメッセージに `[clawd]` プレフィックス
- GitHub Pull通知: `[clawd]`なら無視、それ以外はpull → 完了報告（変更内容含む）

---

## YouTube制作

**チャンネル:** AnimeLiveAction
**フロー:** Nanobanana Pro（画像生成）→ KLING AI（動画化）→ 編集

---

## スキル

- `nano-banana-pro` — 画像生成API（設定済み）
