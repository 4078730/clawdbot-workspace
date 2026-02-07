# TOOLS.md - Local Notes

## Environment

- **OS:** WSL2 on Windows
- **Drives:** C: → /mnt/c, G: (Google Drive) → /mnt/g (自動マウント)

---

## OpenClaw設定

**メイン設定:** `~/.openclaw/openclaw.json`
**エージェント設定:** `~/.openclaw/agents/main/agent/`
**認証情報:** `~/.openclaw/agents/main/agent/auth-profiles.json`

memory_searchを使うにはOpenAI APIキーがauth-profiles.jsonに登録されている必要がある。
~/.bashrcの環境変数だけでは不十分。

---

## Google Calendar (gog CLI)

**アカウント:** near0248@gmail.com

**カレンダー:**
- `primary` — 個人カレンダー
- `pck7b9a6mp82g5hj4cpg1ff254@group.calendar.google.com` — **Work-Sync**（仕事とプライベートの同期）

**コマンド例:**
```bash
# Work-Syncの予定確認
GOG_KEYRING_PASSWORD="gog" gog calendar events "pck7b9a6mp82g5hj4cpg1ff254@group.calendar.google.com" --from YYYY-MM-DD --to YYYY-MM-DD

# カレンダー一覧
GOG_KEYRING_PASSWORD="gog" gog calendar calendars
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
