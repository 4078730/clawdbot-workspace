# Clawdbot-Workspace

## 基本思想

- **キャプチャはClawdbot経由** — スマホからもDiscordで話しかければOK
- **整理はClawdbotがやる** — 手間ゼロ
- **Obsidianは閲覧用** — 人間が見たいときに見る

## フォルダ構造

```
Vault/
├── Inbox/           # キャプチャ用（Daily Note）
│   └── YYYY-MM-DD.md
├── Projects/        # アクティブなプロジェクト
│   └── {project}/
│       ├── README.md
│       ├── notes.md
│       └── assets/
├── Context/         # LLM用コンテキスト（自動更新）
│   ├── me.md
│   └── projects.md
├── Tasks/           # タスク管理
│   ├── active.md
│   └── archive/
├── Docs/            # 完成した資料
├── Notes/           # テーマ別メモ（必要なら）
├── Templates/       # テンプレート
└── Archive/         # 終わったもの
```

## Clawdbotとの対話

### クイックキャプチャ
| 言い方 | 動作 |
|-------|-----|
| 「メモ: xxx」 | Inbox/今日.md に追記 |
| 「タスク: xxx」 | Tasks/active.md に追加 |
| 「xxx終わった」 | 完了マーク + archive |
| 「今週のタスク」 | タスク一覧表示 |

### プロジェクト操作
| 言い方 | 動作 |
|-------|-----|
| 「〇〇プロジェクト作って」 | Projects/に新規作成 |
| 「〇〇の進捗」 | 該当プロジェクトの状況表示 |
| 「〇〇終わり」 | Archive/に移動 |

### 基本的には自然に話せばOK
キーワードなしでも文脈から判断する。

## アクセス方法

| 環境 | 方法 |
|-----|-----|
| PC (WSL) | `~/research/obsidian-vault/` |
| PC (Windows) | `G:\マイドライブ\Obsidian\Obsidian` |
| スマホ | **Discord経由でClawdbotに話しかける** |
| Obsidianアプリ | 閲覧・編集用（Google Drive同期） |

## ルール

### Clawdbotがやっていいこと
- Inbox/, Projects/, Tasks/, Context/, Docs/ の読み書き
- 会話からContext/の自動更新

### 触らない
- `.obsidian/` — Obsidian設定
- `Archive/` — 編集しない（参照のみ）
- `Templates/` — 基本変更しない

---

*このVaultはClawdbotと一緒に運用します*
