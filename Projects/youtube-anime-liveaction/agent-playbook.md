# Agent Playbook — AnimeLiveAction（運用ルール）

> Wooper（このエージェント）を「参照集め」「生成」などの作業に使うための**呼び出し方と境界条件**。
> **重要:** デフォルトでは *参照集めまで*。生成（Nanobanana / V916変換 / 2K生成）は明示指示がある時だけ。

## 1) まず結論：呼び出しコマンド（短文）

### ✅ 参照集めだけ（推奨）
- `Wooper、<作品>の<キャラ>の参照集め`
- 例: `Wooper、NARUTOのサスケの参照集め`

### ✅ 参照集め（ソース指定）
- `Wooper、<作品>の<キャラ>の参照集め。公式/MAL/AniList/Fandom/SEARCH1-3`

### ✅ 生成まで（※明示が必要）
- `Wooper、<作品>の<キャラ>、参照集め→V916→Pi01(2K)までやってOK`

## 2) デフォルトの役割分担（重要）

### サブエージェントの役割（ここまで）
- 参照画像を **ダウンロードして保存**
- **URL / 解像度 / 保存パス** を報告
- *採用判断はしない*（候補を揃えるだけ）

### メインエージェントの役割（明示OKがある時だけ実行）
- V916テンプレ化（1080×1920）
- MULTI5コラージュ生成
- Nanobanana ProでのPi01/2K生成

## 3) 参照画像のセット（標準）

- OFFICIAL（1枚）
- MAL（1枚）
- AniList（1枚）
- Fandom/Narutopedia（1枚）
- SEARCH1〜3（最大3枚）

保存先（実体）:
- `C:\Users\user\Videos\AnimeLiveAction\assets\<作品>\ref_base\`

パス表記（チャット/ログでの省略ルール）:
- 原則 **`<作品>/...` 形式**で書く（`C:\Users\user\Videos\AnimeLiveAction\assets\` は省略）
  - 例: `NARUTO/ref_base/REF_BASE_サスケ_MAL_v01.jpg`

命名（例）:
- `REF_BASE_<キャラ>_OFFICIAL_v01.*`
- `REF_BASE_<キャラ>_SEARCH1_v01.*`
- `REF_BASE_<キャラ>_SEARCH2_v01.*`
- `REF_BASE_<キャラ>_SEARCH3_v01.*`
- `REF_BASE_<キャラ>_MAL_v01.*`
- `REF_BASE_<キャラ>_AniList_v01.*`
- `REF_BASE_<キャラ>_Fandom_v01.*`

## 4) 実装上の注意（Wooper側のルール）

### Brave Searchの制約
- `search_lang` は `ja` ではなく **`jp`**
- レート制限（429）が起きやすいので、**web_fetch/直リンク抽出**を優先

### 推奨フォールバック（検索が詰まる時）
- **Narutopedia/Fandom**: 記事本文から `static.wikia.nocookie.net/.../revision/latest?...&format=original` を拾う
- **AniList**: GraphQL（`https://graphql.anilist.co`）で `Character(search: ...) { image { large } }` を取得
- **MAL**: 検索ページ → キャラページHTMLから `cdn.myanimelist.net/images/characters/...` を抽出
- **4kwallpapers**: 作品ページHTMLから `/images/wallpapers/...-<WxH>-<id>.(png|jpg)` を列挙して **最大解像度**を選ぶ

---
更新日: 2026-01-31
