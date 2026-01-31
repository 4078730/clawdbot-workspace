# セミ自動ブラウザワークフロー（検索→ベース生成）

> **目的:** 指定キャラの参照画像を検索→選定→保存し、Nanobanana Proでベース画像まで生成する。
> **方式:** 参照画像の選定は人（konuki）が行い、以降は半自動で実施。

## 前提
- **Chrome（Browser Relay）接続**で実行
- 参照画像の検索ソースは **公式 / DB / 画像検索** を併用（reference-search.md 参照）
- 命名は `file-naming.md` に準拠

## 入力（最低限）
- 作品名
- キャラ名
- 使用プロンプト（Pi01 / Pi02 / Pi03）
- **参照画像：MAL / AniList / Fandom の各1枚**

## 出力
- `REF_BASE`（参照画像）
- 必要なら `REF_SCENE`
- `IMG`（Nanobanana Pro生成のベース画像）

---

## 手順
### 1) フォルダ準備
- `assets/<作品名>/ref_base` など（file-naming.md 参照）
- 保存先を事前に決めておく

### 2) 参照画像を検索
- 公式サイト / **MAL / AniList / Fandom** / Google/Bing を併用
- クエリ例は `reference-search.md` を使用

### 3) 画像を選定（人が判断）
- 顔/髪/衣装が明瞭で、文字や透かしのないもの

### 4) 参照画像を保存・命名
- `REF_BASE_<キャラ>_<SRC>_v01.jpg` 例: `REF_BASE_ルフィ_MAL_v01.jpg`
- シーン参照が必要な場合: `REF_SCENE_<シーン名>_v01.jpg`

### 5) Nanobanana Proで生成
- 参照画像をアップロード
- Pi01 / Pi02 / Pi03 を貼り付け
- 必要に応じて **「日本人」** を挿入

### 6) 生成画像を保存・命名
- `IMG_<キャラ>_<内容>_<PiID>_<モデル>_<YYYYMMDD>_v01.png`

### 7) 記録
- `production-log.md` に残す

---

## ブラウザ実行時の注意
- 検索ページでは **konukiが選定**
- 以降は手順に沿って自動保存

---
更新日: 2026-01-31
