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

---
更新日: 2026-01-31
