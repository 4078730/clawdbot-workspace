# Seedance 2.0 プロンプトガイド

> 実践的なプロンプト集。随時追加予定。
> ByteDance公式ガイド（未取得）: https://bytedance.larkoffice.com/wiki/LJXzwehluiFdzKkb1recZdfonZg

---

## 基本ルール

**語数は30〜100語。** 短すぎると曖昧、長すぎると焦点がぼやける。

**メインの被写体から書き始める。** AIが最初に読んだ要素に集中する。

**マルチモーダル入力時は `@AssetName` で参照。**
例: `@Image1` `@Video1` `@Audio1`

**イテレーションは1変数ずつ。** 照明だけ変える、動きだけ変える、スタイルだけ変える。一度に複数変えると何が効いたかわからなくなる。

**ネガティブプロンプトは控えめに。** 不要なものを除外する指示は有効だが、複雑にしすぎない。

---

## プロンプト構造テンプレート

```
[被写体] + [動作/状態] + [環境/背景] + [カメラワーク] + [雰囲気/スタイル]
```

例:
```
A samurai warrior (被写体) draws his katana in one fluid motion (動作),
standing in a rain-soaked alley lit by neon signs (環境),
slow-motion close-up tracking the blade (カメラワーク),
cinematic, dark, high contrast (スタイル)
```

---

## カテゴリ別プロンプト集

### 1. バイラル動画・SNSコンテンツ

Instagram Reels、TikTok、YouTube Shorts向け。テンポ、カット、テキストオーバーレイがポイント。

```
Create a fast-paced video of a cat knocking over objects with
exaggerated reactions, meme-style captions, and quick zooms
for comedic effect.
```

```
Show a morning routine of a college student with upbeat
background music, jump cuts between scenes, and text overlays
highlighting key moments.
```

```
Film a short recipe tutorial with close-up shots of ingredients,
step-by-step instructions, and vibrant visual transitions.
```

---

### 2. キャラクター・IP一貫性

複数シーンでキャラの見た目を維持したい場合。アニメシリーズやブランドキャラに有用。

```
Animate a superhero performing a signature move across different
city rooftops while keeping costume, hairstyle, and facial
features consistent.
```

```
Show a brand mascot interacting with multiple environments,
such as a park, office, and home, without changing its color
palette or expressions.
```

```
Bring a comic book hero into a new storyline, fighting villains
while maintaining outfit, posture, and animation style.
```

---

### 3. スタイル・VFXトランスファー

参照動画のスタイルを再現。ミュージックビデオ、広告、ショートフィルム向け。

```
Transform a daytime city street into a neon-illuminated cyberpunk
environment with rain reflections, animated signs, and moving
vehicles.
```

```
Apply a dramatic cinematic style to a football highlight clip
with slow-motion kicks, dynamic camera angles, and vivid color
grading.
```

```
Convert a forest animation into a magical fantasy scene with
glowing plants, floating lights, and mystical fog effects.
```

---

### 4. ブランドマーケティング・キャンペーン

プロモーション動画、製品紹介、広告素材。

```
Show a product unboxing with close-up shots, animated text
highlighting features, and smooth panning to focus on brand logos.
```

```
Create a lifestyle ad showing people using the product in
different daily scenarios, keeping brand colors and logo visible.
```

```
Film a promotional offer with animated countdowns, text overlays
showing discounts, and bright brand-themed visuals.
```

---

### 5. 映画・ゲーム・プリビズ

撮影前のシーン視覚化、ストーリーボード、アクションシーケンス。

```
Storyboard a chase scene in a busy city with multiple camera
angles, dynamic character movements, and realistic environmental
interactions.
```

```
Visualize a fantasy battle between heroes and monsters in a
forest with magic effects, detailed terrain, and animated
camera sweeps.
```

```
Create a cinematic intro for a short film with a character
entering a dimly lit room, dramatic camera pans, and
suspenseful music.
```

---

### 6. インタラクティブ・クリエイティブ

AR/VR体験、教育コンテンツ、視聴者参加型。

```
Animate a virtual classroom where students interact with 3D
objects while the AI teacher reacts in real-time to their actions.
```

```
Design an AR shopping experience where users click on products,
view details, and see animated previews with realistic shadows.
```

```
Create an interactive storytelling video where viewers make
choices, and characters respond differently depending on the
path selected.
```

---

## マルチモーダル入力プロンプト例

参照素材を使って精度を上げるパターン。

### 画像 + テキスト
```
Using @Image1 as the main character reference, create a smooth
video of the character walking through a neon-lit futuristic
street. Maintain facial features and outfit from the reference.
Cinematic lighting, slow camera dolly forward.
```

### 画像 + 音声
```
Create a smooth video using @Image1 as the main reference.
Add natural head, eye, and ear movements, and sync the cat's
expressions with @Audio1. Keep the scene cute, stable, and
visually consistent with soft motion and lighting.
```

### 動画参照 + テキスト
```
Referencing the camera movement and scene transitions in @Video1,
recreate the sequence with the character from @Image1. Match the
pacing, shot composition, and dynamic energy of the original clip.
```

### フレーム指定（Single-frame モード）
```
A smooth, natural video transition between the first and last
frame showing young girl kids. The girls gently move, blink,
and smile with soft, realistic facial expressions. Subtle head
and hand movements add life, with natural body motion and
calm energy.
```

---

## アニメ実写化向けプロンプト（konuki用）

YouTube AnimeLiveActionチャンネル向けのカスタムパターン。

### バトルシーン
```
A live-action battle scene inspired by anime. Two warriors face
off in a destroyed urban environment. Dynamic camera movements
with speed lines effect. One character charges forward with
glowing energy around their fist. Cinematic, high contrast,
dramatic lighting, debris particles in the air.
```

### キャラクター登場
```
A dramatic character reveal in live-action anime style.
A lone figure stands on a rooftop at sunset, coat billowing
in the wind. Camera slowly orbits around them. The character
turns to face the camera with intense expression.
Cinematic color grading, lens flare, shallow depth of field.
```

### 必殺技シーン
```
A powerful special attack sequence in live-action. The character
gathers energy with both hands, glowing blue particles swirling
around them. Camera pulls back to wide shot as they release
a massive energy blast forward. Shockwave ripples through the
environment. Epic, dramatic, VFX-heavy, slow-motion impact.
```

---

## Tips リマインダー

- プロンプトは **英語推奨**（多言語対応だが英語が最も安定）
- **動きの記述を具体的に**（"moves" ではなく "slowly walks forward while looking left"）
- **カメラワークを明示**（dolly, pan, orbit, tracking shot, close-up, wide shot）
- **雰囲気は形容詞を2-3個**（cinematic, dark, high contrast / soft, warm, dreamy）
- **物理的な描写を入れる**（wind blowing hair, rain drops, dust particles）

---

*Source: Dreamina公式プロンプトガイド + konuki用カスタム*
*ByteDance Larkガイド取得次第、追加予定*
