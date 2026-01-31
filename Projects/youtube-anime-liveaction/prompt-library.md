# Prompt Library — AnimeLiveAction

> ここは**プロンプト資産の集約**。
> 成功している実プロンプトをベースに管理する。

## 参照画像の準備（必須）
- **実際のアニメキャラの全身**または**表情が分かる**画像
- **生成したい衣装や見た目**の参照画像

## 共通スタイル方針
- 原作キャラに**できるだけ近い**造形
- **リアルな実写感**を重視
- 破綻しやすい部位（手/歯/指/目）を重点チェック
- **日本人キャラ**の場合は「日本人」を入れると良い結果になりやすい

## プロンプト命名ルール（暫定）
- 形式: `[Style]-[Camera]-[Mood]-[Variant]`
- 例: `Cinematic-IMAX-iPhone-Relaxed-v1`
- 決定版のルールがあれば置き換える

## プロンプト一覧（プリセット）
### 1) Cinematic-IMAX-iPhone-Relaxed-v1（暫定名）
```
｢顔の角度・体の姿勢を完全一致で実写化。目・眉・口・輪郭などの微細な表情要素まで忠実に再現。
髪型・長さ・質感・流れは参照画像に厳密に準拠。

make this a cinematic photorealistic live action and remove the text, make everything photorealistic even the background, actor of [作品名]
Make everything ultra-detailed IMAX cinematic photorealistic live action, pristine cinematic quality
iPhone 17 Pro candid angle, A background that blends naturally, realistic fabric textures
Negative: worst quality, low quality, lowres, blurry, jpeg artifacts, bad anatomy, bad hands, bad fingers, extra fingers, deformed face, asymmetrical eyes, flat lighting, dull colors, logo, watermark, text
Composition is casual and slightly tilted, framing this intimate moment with genuine spontaneity typical of authentic iPhone photography, evoking a relaxed, private atmosphere.

日本人

｢[キャラクター名]｣
```

## キャラ別テンプレ
（未作成）

---
更新日: 2026-01-31
