# 参照画像の検索・選定 — AnimeLiveAction

## 方針（確定）
- **複数ソースを併用して補完**する
- **検索結果の採用は人が判断**（konukiが一旦選定）
- **OFFICIAL / MAL / AniList / Fandom 各1枚 + SEARCH1-3（最大3枚）を候補収集**
  - 採用は人が判断（必要なら SEARCH1-3 から1枚に絞る）

## 検索ソース（併用）
1) **公式ソース（必須で1枚選定）**
   - 公式サイトのキービジュアル / 立ち絵
   - 公式PV・トレーラーの静止フレーム
2) **公式寄りDB（必須で各1枚選定）**
   - MyAnimeList / AniList / Fandom Wiki
3) **画像検索（候補を最大3枚収集 → 必要なら1枚に絞る）**
   - Google Images / Bing Images
   - 代替: 4kwallpapers 等（高解像度壁紙サイト）

## 検索クエリの型（テンプレ）
- **ベース画像用**
  - `"<作品名> <キャラ名> 公式 立ち絵"`
  - `"<作品名> <キャラ名> key visual"`
  - `"<character name> full body official"`
- **シーン参照用**
  - `"<作品名> <シーン名> screenshot"`
  - `"<作品名> 第x話 <シーン名>"`
  - PVから該当カットを切り出し

## 選定基準（最低条件）
- 顔がはっきり見える
- 髪型・衣装が分かる
- 解像度が十分（目安 1024px 以上）
- 透かし/文字がない

## 運用フロー（セミ自動）
1) **候補収集**（OFFICIAL/MAL/AniList/Fandom/SEARCH1-3）
   - 基本は Wooper（サブエージェント）で自動収集
2) **konukiが採用判断**（必要ならSEARCH1-3から1枚に絞る）
3) `REF_BASE` / `REF_SCENE` として保存（file-naming.md 準拠）
4) **生成は別コマンド**（明示的に「生成OK」が出た時だけ）
   - Nanobanana Pro（Pi01/Pi02/Pi03）
5) 生成画像を保存（命名規則で管理）

---
更新日: 2026-01-31
