# ファイル命名・保管ルール（案） — AnimeLiveAction

> **目的:** 迷わず探せる・並べ替えできる・作品内で横断運用できる
> ルールは「**わかりやすさ優先**」。必要なら調整する。

## 1) フォルダ構成（推奨・シリーズ分けなし）
```
assets/
  └─ <作品名>/
      ├─ ref_base   (ベース人物参照)
      ├─ ref_scene  (シーン参照)
      ├─ img        (生成画像)
      ├─ vid        (生成動画クリップ)
      └─ final      (完成動画)
```
※ 作品名フォルダは日本語でOK（例: `ワンピース`）

## 2) 命名テンプレ（推奨）
- 区切りは **_（アンダースコア）**
- 日付は **YYYYMMDD**

### 参照画像
- `REF_BASE_<キャラ>_<SRC>_v01.jpg` 例: `REF_BASE_ルフィ_MAL_v01.jpg`
  - SRC候補: `OFFICIAL` / `SEARCH1` / `SEARCH2` / `SEARCH3` / `MAL` / `AniList` / `Fandom`
- `REF_BASE_<キャラ>_MULTI5_v01.png`（5枚コラージュ）
- `REF_BASE_<キャラ>_<SRC>_V916_v01.png`（縦型9:16テンプレ化した参照）
- `REF_SCENE_<シーン名>_v01.jpg`

### 生成画像
- `IMG_<キャラ>_<内容>_<PiID>_<モデル>_<YYYYMMDD>_v01.png`

### 生成動画（クリップ）
- `VID_<キャラ>_<内容>_<PvID>_<モデル>_<YYYYMMDD>_clip01.mp4`

### 完成動画
- `FINAL_<キャラ>_<内容>_<YYYYMMDD>_v01.mp4`

> **内容** = シーン名 / フォーマット名（舞台裏・ツアー等） / 目的メモ を自由記入。

## 3) 例
- `REF_BASE_ルフィ_v01.jpg`
- `REF_SCENE_アーロンパーク_v01.jpg`
- `IMG_ゾロ_戦闘_Pi02_VidoQ3_20260131_v01.png`
- `VID_ルフィ_ツアー_Pv02_Kling25Turbo_20260131_clip01.mp4`
- `FINAL_ルフィ_舞台裏_20260131_v01.mp4`

## 4) モデル名の書き方（例）
- Nanobanana Pro → `NanobananaPro`
- Kling 2.5 Turbo → `Kling25Turbo`
- Seedance Pro 1.5 → `Seedance15`
- VidoQ3 → `VidoQ3`

---
**状態:** 案（確認待ち）
更新日: 2026-01-31
