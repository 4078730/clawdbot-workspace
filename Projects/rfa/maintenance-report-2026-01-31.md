# RFA ドキュメントメンテ（2026-01-31）

## 今回やったこと

- READMEのリンク整備（Obsidian風 `[[...]]` を廃止して、Markdownリンクに統一）
- 用語集 `glossary.md` を追加（用語の揺れを減らすため）
- master-contextの先頭に「このファイルの位置づけ・関連リンク」を追加

### (A) master-context.md のMarkdown整形（差分大）
- 章番号ベースの見出し（例: `8.2 ...` / `8.2.1 ...`）を **Markdown見出しに変換**
- 主要なASCII図をコードブロック化
- 一部の表（データソース3層）をMarkdown表に整形
- 差分が大きいので、念のため **整形前のバックアップ**を `Archive/rfa/` に保存

## 目視で見つけた改善候補（要：方針決め）

1) **master-context.md の整形は一部対応したが、まだ残りがある**
- 章見出しはMarkdown化したが、表（体制/役割/各種一覧）の多くはまだプレーンテキスト
- 「表をどこまでMarkdown表にするか」「表の粒度」を決めると、さらに読みやすくできる

2) **"技術アーキテクチャ" が章立てとして二重に見える（4章と6章）**
- 現状でも内容は読めるが、初見の人が迷う可能性

3) **締切/時刻の揺れ**
- TODO.md と Projects/rfa/TODO-fy26-business-plan.md の締切表記が揺れやすい
- どっちを正にするかルール決めが必要

## 次に提案する作業（順番）

- (B) FY26事業計画系の"提出物"と"作業メモ"を分離してリンクで結ぶ（Confluence用 vs 手元用）
- (C) 用語の正（例：DataOps / データフライホイール / データライフサイクル）を決めて置換する
- (D) master-context 内の表を追加でMarkdown化（必要なものだけ）
- (E) 「技術アーキテクチャ」の章立て（4章/6章の重複っぽさ）をどう扱うか決めて整理

---

## ナイトリー追記（2026-01-31 23:00）

- **用語の揺れ（Symbol Hub / Symbol Integration）**
  - `glossary.md` に *Symbol Integration* を追加し、表記ゆれの意図を明記
  - `README.md` の図を *Symbol Hub / Symbol Integration* に更新
  - `fy26-business-plan.md` の定義箇所に、Symbol Hub表記との関係を注記
- **用語の揺れ（データホイール）**
  - `fy26-business-plan.md` の「データホイール」を「データフライホイール」注記で吸収
- **締切/時刻の揺れ**
  - `Projects/rfa/TODO-fy26-business-plan.md` の提出時刻を `TODO.md` 準拠（13:00）に更新（要確認注記つき）
