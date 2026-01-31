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

## プロンプト命名ルール（確定）
- **Pi** = 画像用プロンプト
- **Pv** = 動画用プロンプト
- 形式: `Pi01_人物再現_v1` / `Pv02_ツアー_v1` のように管理

## 画像プロンプト（Pi）
### Pi01_人物再現_v1
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

### Pi02_シーン再現_v1
> **用途:** 「〇〇の撮影現場の舞台裏」シリーズ（人気シーンの実写再現）
> **参照:** 1枚目=ベースキャラ実写 / 2枚目=シーン画像
```
｢顔の角度・体の姿勢を完全一致で実写化。目・眉・口・輪郭などの微細な表情要素まで忠実に再現。
髪型・長さ・質感・流れは参照画像に厳密に準拠。

make this a cinematic photorealistic live action and remove the text, make everything photorealistic even the background, actor of [作品名]
Make everything ultra-detailed IMAX cinematic photorealistic live action, pristine cinematic quality
iPhone 17 Pro candid angle, A background that blends naturally, realistic fabric textures
Negative: worst quality, low quality, lowres, blurry, jpeg artifacts, bad anatomy, bad hands, bad fingers, extra fingers, deformed face, asymmetrical eyes, flat lighting, dull colors, logo, watermark, text
Composition is casual and slightly tilted, framing this intimate moment with genuine spontaneity typical of authentic iPhone photography, evoking a relaxed, private atmosphere.

2枚目のシーン画像を, 1枚目の人物で再現

日本人

｢[キャラクター名]の戦闘シーン｣
```

### Pi03_ツアー_v1
> **用途:** 「〇〇が案内するxx 撮影現場ツアー」シリーズ
```
｢Make this a cinematic photorealistic live action and remove the text, make everything photorealistic even the background, actor ,
Make everything ultra-detailed IMAX cinematic photorealistic live action, pristine cinematic quality.
iPhone 17 Pro candid angle, A background that blends naturally, realistic fabric textures
Negative: worst quality, low quality, lowres, blurry, jpeg artifacts, bad anatomy, bad hands, bad fingers, extra fingers, deformed face, asymmetrical eyes, flat lighting, dull colors, logo, watermark, text
Composition is casual and slightly tilted, framing this intimate moment with genuine spontaneity typical of authentic iPhone photography, evoking a relaxed, private atmosphere.
この作品のこのシーンと人物像を詳しく調べてから
Negative: worst quality, low quality, lowres, blurry, jpeg artifacts, bad anatomy, bad hands, bad fingers, extra fingers, deformed face, asymmetrical eyes, flat lighting, dull colors, logo, watermark, text

実写化の撮影現場の休憩中のオフショット
背景には自然に俳優たちと共に有名なシーンの撮影セットが映っている。
人物の顔がはっきり見えるバストショット

iPhoneを持って自撮りしている呪術廻戦(作品名)の五条悟(人物)
東堂葵(一緒に取る人物)と一緒に
昼間の屋外(その一緒にいる人物が作品で登場するシーンの印象的な背景、象徴する背景)｣
```

## 動画プロンプト（Pv）
### Pv01_未定_v1
- 後日受領予定（konukiより）

### Pv02_ツアー_v1
> **用途:** 「〇〇が案内するxx 撮影現場ツアー」シリーズ
> **モデル:** Kling 2.5 Turbo / 5秒
```
｢白髪の男性(その撮影キャラの特徴)が､俳優に丁寧に感謝を伝え､自撮りしながらセットの別のエリアへ移動して､別の俳優とポーズを取る｡｣
```

## キャラ別テンプレ
（未作成）

---
更新日: 2026-01-31
