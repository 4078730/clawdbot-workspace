# Production Log — AnimeLiveAction

> 日次の作業ログ。重要事項はここに記録。

## テンプレ
```
### YYYY-MM-DD
- 実施内容:
- 出力/成果物:
- 使用モデル/設定:
- 問題点/気づき:
- 次アクション:
```

### 2026-01-31
- 実施内容: ワンピース/ルフィの参照画像を公式サイトから選定・DL（ベース候補）
- 出力/成果物:
  - C:\Users\user\Videos\AnimeLiveAction\assets\ワンピース\ref_base\REF_BASE_ルフィ_v01.webp
  - C:\Users\user\Videos\AnimeLiveAction\assets\ワンピース\ref_base\REF_BASE_ルフィ_v02.jpg
  - C:\Users\user\Videos\AnimeLiveAction\assets\ワンピース\ref_base\REF_BASE_ルフィ_v03.jpg
- 使用モデル/設定: 参照画像取得（ONE PIECE.com）
- 問題点/気づき: v01はWebP（拡張子 .webp）
- 次アクション: 参照画像を選定 → Nanobanana Pro（Pi01）でベース生成

### 2026-01-31
- 実施内容: MyAnimeList / AniList / Fandom Wiki から各1枚ベストを選定・DL
- 出力/成果物:
  - C:\Users\user\Videos\AnimeLiveAction\assets\ワンピース\ref_base\REF_BASE_ルフィ_MAL_v01.jpg
  - C:\Users\user\Videos\AnimeLiveAction\assets\ワンピース\ref_base\REF_BASE_ルフィ_AniList_v01.png
  - C:\Users\user\Videos\AnimeLiveAction\assets\ワンピース\ref_base\REF_BASE_ルフィ_Fandom_v01.webp
- 使用モデル/設定: 参照画像取得（MAL/AniList/Fandom）
- 問題点/気づき: MAL/AniListは小さめ（約225x350, 230x345）。Fandomは高解像度。
- 次アクション: 参照画像を選定 → Nanobanana Pro（Pi01）でベース生成

### 2026-01-31
- 実施内容: Fandom参照画像を使って Pi01 でベース画像生成（Nanobanana Pro）
- 出力/成果物:
  - C:\Users\user\Videos\AnimeLiveAction\assets\ワンピース\img\2026-01-31-21-05-14_IMG_ルフィ_Pi01_NanobananaPro.png
- 使用モデル/設定: Nanobanana Pro / 入力=REF_BASE_ルフィ_Fandom_v01.webp / 解像度=1K
- 問題点/気づき: なし
- 次アクション: 生成結果の確認 → 次キャラ or Pi02

### 2026-01-31
- 実施内容: 公式/検索/MAL/AniList/Fandom から各1枚ベストを揃え、Pi01を2Kで5パターン生成
- 出力/成果物（参照画像5枚）:
  - C:\Users\user\Videos\AnimeLiveAction\assets\ワンピース\ref_base\REF_BASE_ルフィ_OFFICIAL_v01.webp（ONE PIECE.com / 1200x998）
  - C:\Users\user\Videos\AnimeLiveAction\assets\ワンピース\ref_base\REF_BASE_ルフィ_SEARCH_v01.jpg（画像検索由来: AnimeCornerのog:image / 1895x1080）
  - C:\Users\user\Videos\AnimeLiveAction\assets\ワンピース\ref_base\REF_BASE_ルフィ_MAL_v01.jpg（MyAnimeList / 225x350）
  - C:\Users\user\Videos\AnimeLiveAction\assets\ワンピース\ref_base\REF_BASE_ルフィ_AniList_v01.png（AniList / 230x345）
  - C:\Users\user\Videos\AnimeLiveAction\assets\ワンピース\ref_base\REF_BASE_ルフィ_Fandom_v01.webp（Fandom / 686x1435）
- 出力/成果物（生成画像2K・5パターン）:
  - C:\Users\user\Videos\AnimeLiveAction\assets\ワンピース\img\2026-01-31-21-16-41_IMG_ルフィ_OFFICIAL_Pi01_NanobananaPro_2K.png
  - C:\Users\user\Videos\AnimeLiveAction\assets\ワンピース\img\2026-01-31-21-17-08_IMG_ルフィ_SEARCH_Pi01_NanobananaPro_2K.png
  - C:\Users\user\Videos\AnimeLiveAction\assets\ワンピース\img\2026-01-31-21-17-42_IMG_ルフィ_MAL_Pi01_NanobananaPro_2K.png
  - C:\Users\user\Videos\AnimeLiveAction\assets\ワンピース\img\2026-01-31-21-18-08_IMG_ルフィ_AniList_Pi01_NanobananaPro_2K.png
  - C:\Users\user\Videos\AnimeLiveAction\assets\ワンピース\img\2026-01-31-21-18-40_IMG_ルフィ_Fandom_Pi01_NanobananaPro_2K.png
- 使用モデル/設定: Nanobanana Pro / 解像度=2K / Pi01
- 問題点/気づき: プロンプト内の「日本人」はルフィには不要の可能性（品質悪化するなら削除候補）
- 次アクション: 5パターン比較→採用→必要ならPi01プロンプト調整（日本人行のON/OFF等）

### 2026-01-31
- 実施内容: 5枚参照（MULTI5）画像を作成し、その参照でPi01を2K生成
- 出力/成果物:
  - C:\Users\user\Videos\AnimeLiveAction\assets\ワンピース\ref_base\REF_BASE_ルフィ_MULTI5_v01.png（5枚コラージュ）
  - C:\Users\user\Videos\AnimeLiveAction\assets\ワンピース\img\2026-01-31-21-20-22_IMG_ルフィ_MULTI5_Pi01_NanobananaPro_2K.png
- 使用モデル/設定: Nanobanana Pro / 解像度=2K / 入力=REF_BASE_ルフィ_MULTI5_v01.png
- 問題点/気づき: 参照画像の縦横比が混在（コラージュ）
- 次アクション: MULTI5版の品質比較→採用判断

### 2026-01-31
- 実施内容: NARUTO（ナルト/サクラ/サスケ）の参照画像をサブエージェントで並列収集。運用ルールをドキュメント化。
- 出力/成果物:
  - 参照画像（NARUTO）: `C:\Users\user\Videos\AnimeLiveAction\assets\NARUTO\ref_base\REF_BASE_<キャラ>_<SRC>_v01.*`
    - SRC: OFFICIAL / MAL / AniList / Fandom / SEARCH1-3
  - サクラ: V916テンプレ（1080x1920） & MULTI5 & Pi01 2K（生成済み、保持）
    - `...\\assets\\NARUTO\\ref_base\\REF_BASE_サクラ_<SRC>_V916_v01.png`
    - `...\\assets\\NARUTO\\ref_base\\REF_BASE_サクラ_MULTI5_v01.png`
    - `...\\assets\\NARUTO\\img\\2026-01-31-22-31-23_IMG_サクラ_OFFICIAL_Pi01_NanobananaPro_2K_V916.png` ほか
  - 運用ルール: `Projects/youtube-anime-liveaction/agent-playbook.md`
- 使用モデル/設定:
  - 参照収集: サブエージェント（参照画像の保存まで）
  - 生成（今回のみ）: Nanobanana Pro / Pi01 / 2K
- 問題点/気づき:
  - Brave Search: `search_lang` は `jp`（`ja` だとエラー）。429レート制限が起きるため、web_fetch/直リンク抽出を優先。
  - 4kwallpapers は `/images/wallpapers/...-<WxH>-<id>.*` から最大解像度を選べる。
- 次アクション:
  - 参照採用判断→生成は明示OK後に実行（運用ルールに従う）

---
更新日: 2026-01-31
