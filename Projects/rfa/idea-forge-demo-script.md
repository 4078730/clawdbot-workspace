# RFA Demo Presentation Script (JP/EN)

> **対象**: Blue Yonder ドイツメンバー向けデモ
> **形式**: プレゼンター用スクリプト（各ページ1〜3分想定）
> **作成日**: 2026-02-24

---

## P1: タイトル — Robotics Foundation Agent

### 🇯🇵 日本語スクリプト

みなさん、本日はお時間をいただきありがとうございます。パナソニック コネクトのR&D部門から、「Robotics Foundation Agent」——私たちが「RFA」と呼んでいるプロジェクトについてご紹介します。

RFAのビジョンは、Embodied AIを活用してロボットの自律的なタスク実行を実現することです。従来のロボットは「教えられたことしかできない」存在でしたが、私たちはそれを「自分で考えて動ける」存在に変えようとしています。

今日はその全体像と、現在の進捗をお見せします。

### 🇩🇪🇬🇧 English Script

Thank you all for joining today. I'm from the R&D Division at Panasonic Connect, and I'd like to introduce our project called the "Robotics Foundation Agent" — or RFA for short.

The vision behind RFA is to enable autonomous task execution through Embodied AI. Traditional industrial robots can only do what they've been explicitly programmed to do. We're working to change that — to create robots that can perceive, reason, and act on their own.

Today, I'll walk you through the full picture and show you where we are right now.

**Key Message**: RFAはEmbodied AIによるロボット自律化の統合プロジェクトである。

---

## P2: マイルストーン — Robot Field Implementation Service

### 🇯🇵 日本語スクリプト

まず直近のマイルストーンです。2025年6月30日に「Robot Field Implementation Service」の新製品発表会を予定しています。

大きく2つのサービスがあります。1つ目は「System Integration Service」で、6月30日からサービスを開始します。これはロボット導入のSI——つまりシステムインテグレーションを支援するサービスです。

2つ目が今日の主題に関わる「Robot Control Platform」で、こちらは10月にサービス開始を予定しています。私たちはこれを「Robo Sync」と呼んでいます。この2つを軸に、ロボティクス事業を本格展開していきます。

### 🇩🇪🇬🇧 English Script

Let me start with our near-term milestones. On June 30, 2025, we'll be holding a new product announcement for our "Robot Field Implementation Service."

There are two key offerings. First, the System Integration Service, launching on June 30th — this supports customers in deploying and integrating robotic systems at their sites.

Second — and this is central to today's discussion — is our Robot Control Platform, launching in October. We call it "Robo Sync." These two services together form the foundation of our robotics business going forward.

**Key Message**: 2025年下半期にRobo Syncを含むロボティクスサービスを本格ローンチする。

---

## P3: Robot Control Platform（Robo Sync）とは

### 🇯🇵 日本語スクリプト

では、Robo Syncとは何か。3つの特徴をご紹介します。

1つ目は「マルチロボット・マルチメーカー対応」です。製造現場では異なるメーカーのロボットが混在しているのが普通です。Robo Syncは複数メーカーのロボットを統一的なインターフェースで制御できます。

2つ目は「ビジュアルプログラミング」。ブロックを組み合わせるだけでロボットの動作シーケンスを作成できます。専門的なロボットプログラミングの知識がなくても使えるのがポイントです。

3つ目は「標準構成テンプレート」。よくあるユースケースをテンプレート化しており、ゼロから設計する必要がありません。

つまり、Robo Syncは「誰でも簡単に、複数メーカーのロボットを動かせるプラットフォーム」です。

### 🇩🇪🇬🇧 English Script

So, what exactly is Robo Sync? Let me highlight three key features.

First: Multi-Robot, Multi-Manufacturer Support. In real-world production environments, you typically have robots from different vendors on the same floor. Robo Sync provides a unified control interface across manufacturers.

Second: Visual Programming. You can build robot task sequences by combining blocks — no deep expertise in robot programming languages required. This dramatically lowers the barrier to entry.

Third: Standard Configuration Templates. We've pre-built templates for common use cases, so you don't have to design everything from scratch.

In short, Robo Sync is a platform that lets anyone orchestrate multi-vendor robots with ease.

**Key Message**: Robo Syncはマルチメーカー対応・ノーコードのロボット制御プラットフォーム。

---

## P4: 社内導入事例（6サイト）

### 🇯🇵 日本語スクリプト

Robo Syncは社内でもすでに導入実績があります。現在、6つのサイトで稼働中です。

具体例をいくつかご紹介しますと——神戸工場のLet's noteの生産ラインでは、ラベル貼り付け工程にロボットを導入しています。また、タッチパネルの精密検査工程、さらには消費者製品の部品梱包工程にも展開しています。

いずれも、Robo Syncによる統合制御で運用されています。社内で実際に使い込むことで、フィールドでの課題を吸い上げ、プロダクトを改善するサイクルを回しています。これは後ほどお話しするデータ戦略にも直結します。

### 🇩🇪🇬🇧 English Script

Robo Sync is already deployed internally across six sites within Panasonic.

Let me give you a few examples. At our Kobe factory, it's used in the label application process on the Let's Note laptop production line. We also have it running in touch panel precision inspection, and in parts packaging for consumer products.

All of these are managed through Robo Sync's unified control layer. By using it internally first, we can identify real-world challenges, iterate on the product, and — importantly — collect field data. That data aspect will become very relevant later in this presentation.

**Key Message**: 社内6サイトで実稼働中。自社導入で製品を磨き、フィールドデータを蓄積している。

---

## P5: 新チャレンジ領域 — SCM全体への拡大

### 🇯🇵 日本語スクリプト

次に、私たちが新たに取り組んでいる領域です。

これまではStorage（保管）やPicking（ピッキング）が中心でしたが、今後はSCM（サプライチェーンマネジメント）全体に適用範囲を拡大していきます。

具体的には、Inbound（入荷・入庫）からStorage（保管）、そしてOutbound（出荷）まで——Receiving、Picking、Packaging、Shippingという一連のフローをカバーします。

これは単に「ロボットを置く場所を増やす」という話ではなく、倉庫・物流のオペレーション全体をロボティクスで変革するという挑戦です。

### 🇩🇪🇬🇧 English Script

Now, let me talk about where we're heading next.

Until now, our primary focus has been on storage and picking operations. Going forward, we're expanding our scope to cover the entire supply chain management flow.

That means end-to-end coverage: from Inbound — receiving and storing goods — through to Outbound — picking, packaging, and shipping.

This isn't just about putting more robots in more places. It's about transforming the entire warehouse and logistics operation through robotics. And as you'll see, this expansion is exactly where Embodied AI becomes essential.

**Key Message**: ピッキング単体からSCM全体（入荷→保管→出荷）へ適用領域を拡大。

---

## P6: SCMサイトでの自動化課題（Embodied AI）

### 🇯🇵 日本語スクリプト

なぜEmbodied AIが必要なのか——ここが核心です。

SCMサイトの現場には4つの大きな課題があります。1つ目は「多様な形状・素材」。扱う物体は毎回違います。2つ目は「日々変わる商品構成」。昨日と今日で扱う商品が違うのが当たり前です。3つ目は「人の暗黙知への依存」。ベテラン作業者の感覚に頼っている部分が多い。4つ目は「プログラミングやティーチングが必要」。新しい商品が来るたびに、専門家がロボットに動きを教えなければなりません。

従来のルールベースのロボットでは、この変動の大きい環境に対応しきれないんです。

ここで解になるのがEmbodied AI——Language（言語理解）、Vision（視覚認識）、Action（行動生成）を統合したAIです。見て、理解して、動く。これがこの先のキーワードになります。

### 🇩🇪🇬🇧 English Script

So why do we need Embodied AI? This is really the core of the problem.

At SCM sites, we face four major automation challenges. First: diverse shapes and materials — the objects being handled vary enormously. Second: daily-changing product composition — what you're handling today is different from yesterday. Third: dependency on human tacit knowledge — experienced workers rely on intuition that's hard to codify. Fourth: the constant need for programming and teaching — every new product requires expert intervention to retrain the robot.

Traditional rule-based robotics simply cannot keep up with this level of variability.

The answer is Embodied AI — integrating Language understanding, Vision perception, and Action generation into a unified system. See, understand, act. That's the paradigm shift we're pursuing.

**Key Message**: SCM現場の多様性・変動性に対応するにはEmbodied AI（Language＋Vision＋Action）が不可欠。

---

## P7: Embodied AIがもたらすロボティクスの変革

### 🇯🇵 日本語スクリプト

Embodied AIの潮流を少し俯瞰します。

2022年にChatGPTが登場し、2023年にGPT-4Vでマルチモーダル化が進み、2024年にはVLA——Vision-Language-Actionモデルが登場しました。NVIDIAのGR00TやPhysical IntelligenceのPi-zeroが代表例です。

ここで私たちが注目しているのは——AIモデルそのものは急速にコモディティ化していく、という点です。つまり、差別化の源泉はモデルではなく「フィールドデータ」に移ってきている。

実際の現場でロボットを動かし、リアルなデータを大量に集められる企業が、次の競争で勝つ。私たちがRobo Syncを先行展開しているのは、まさにこの文脈です。

### 🇩🇪🇬🇧 English Script

Let me give you a quick overview of the Embodied AI landscape.

In 2022, ChatGPT brought large language models into the mainstream. In 2023, GPT-4V introduced multimodal capabilities. And in 2024, we saw the emergence of VLA models — Vision-Language-Action. Notable examples include NVIDIA's GR00T and Physical Intelligence's π0.

Here's the key insight we're focused on: AI models are rapidly becoming commoditized. The real differentiator is shifting to field data.

The companies that can deploy robots in real environments and collect massive amounts of real-world data — they're the ones who will win in this next wave. And that's precisely why we've been investing in Robo Sync as an early deployment platform.

**Key Message**: AIモデルはコモディティ化。差別化の源泉は「フィールドデータ」に移行している。

---

## P8: VLA Model（Vision-Language-Action）

### 🇯🇵 日本語スクリプト

VLAモデルについてもう少し詳しくお話しします。

VLAは、大量のテキストデータ、画像・動画データ、そしてロボットの行動データを組み合わせて学習します。言語でタスクを理解し、視覚で状況を把握し、具体的なロボットの動作を生成する——これが一つのモデルで行われます。

ただし、課題もあります。1つ目は「ドメイン固有データの不足」。汎用的なデータは世の中にたくさんありますが、特定の産業・特定の作業に特化したデータは圧倒的に足りません。2つ目は「ロボット行動データの不足」。テキストや画像と比べて、ロボットの実動作データは桁違いに少ない。

この2つの課題をどう解決するか——それが次のスライドのテーマです。

### 🇩🇪🇬🇧 English Script

Let me go a bit deeper into VLA models.

A VLA model is trained on a combination of large-scale text data, image and video data, and robot action data. It understands tasks through language, perceives the environment through vision, and generates concrete robot actions — all within a single unified model.

However, there are two significant challenges. First: the scarcity of domain-specific data. While there's plenty of generic data available, data tailored to specific industrial tasks is extremely limited. Second: the shortage of robot action data. Compared to text and images, real robot telemetry data is orders of magnitude scarcer.

How do we address these two gaps? That's what I'll cover next.

**Key Message**: VLAは言語＋視覚＋行動を統合学習するが、ドメイン特化データとロボット行動データの不足が課題。

---

## P9: Data-Driven AI Strategy

### 🇯🇵 日本語スクリプト

ここが私たちの戦略の中核です。

私たちは、Robo Syncそのものをデータ収集基盤として活用します。現場で稼働しているRobo Sync接続ロボットから、継続的にフィールドデータを収集し、それをVLA学習に使う。

Before——つまり従来は、事前に登録されたオブジェクトしか認識・操作できませんでした。After——Embodied AIを搭載した後は、ロボットが自ら状況を理解し、未知のオブジェクトにも対応し、自律的に作業を遂行できるようになります。

しかも、現場で動けば動くほどデータが貯まり、モデルがさらに賢くなる。好循環を作れるんです。

### 🇩🇪🇬🇧 English Script

This is the core of our strategy.

We're leveraging Robo Sync itself as a data collection infrastructure. Robots connected through Robo Sync continuously generate field data during their normal operations, and we feed that data back into VLA training.

The before-and-after is striking. Before: robots could only detect and handle pre-registered objects. After: with Embodied AI, they can understand the situation, handle novel objects, and perform tasks autonomously.

And here's the flywheel effect — the more the robots operate in the field, the more data we collect, and the smarter the models become. It's a self-reinforcing cycle.

**Key Message**: Robo Syncをデータ基盤化し、「稼働→データ収集→AI学習→さらに賢く」の好循環を構築する。

---

## P10: Our Data Strategy

### 🇯🇵 日本語スクリプト

データ戦略をもう少し具体的にお見せします。3つのデータソースを組み合わせています。

1つ目は「Human Teleoperation」——人間がロボットを遠隔操作してデータを収集します。コストは最も高いですが、データ品質は最高です。これは主にモデルのFine-Tuneに使います。

2つ目は「Robo Sync Field Data」——先ほどお話しした、現場で継続的に集まるデータです。これはデータのAugmentation（増強）に使います。量の面でこれが一番のボリュームゾーンになります。

3つ目は「Simulation / Human Videos」——シミュレーション環境で生成したデータや、人間の作業動画をロボット動作に変換して使います。

高品質だが高コストなデータと、継続的に大量に集まるデータと、合成データ。この三層構造で、データ不足の課題を突破します。

### 🇩🇪🇬🇧 English Script

Let me break down our data strategy more concretely. We combine three data sources.

First: Human Teleoperation. Human operators remotely control robots to generate training data. It's the most expensive approach, but produces the highest quality data. We use this primarily for fine-tuning our models.

Second: Robo Sync Field Data. This is the continuous stream of data from robots operating in the field, as I just described. This is used for data augmentation and represents our largest data volume.

Third: Simulation and Human Videos. We generate data in simulation environments and convert human work videos into robot action data.

High-quality but costly data, plus continuously collected field data, plus synthetic data — this three-tier approach is how we overcome the data scarcity challenge.

**Key Message**: テレオペ（高品質）× フィールドデータ（大量）× シミュレーション（合成）の三層でデータ課題を突破。

---

## P11: テレオペによるVLA学習

### 🇯🇵 日本語スクリプト

テレオペレーションの具体例をお見せします。

ここでは、人間のオペレーターが双腕ロボットを遠隔操作しています。オペレーターが実際にタスクをやってみせることで、ロボットが「こうやって動けばいい」という教示データを収集します。

具体的なタスクは「Dual-arm Box Packing」——2本の腕を使って物を箱に詰める作業です。テレオペで集めたデータをVLAモデルに学習させると、最終的にロボットが自律的に同じ作業をこなせるようになります。

テレオペデータは量は限られますが、非常にリッチな情報を含んでいて——力の入れ具合、アプローチの角度、リカバリー動作など——これがモデルの質を大きく左右します。

### 🇩🇪🇬🇧 English Script

Let me show you a concrete example of teleoperation.

Here, a human operator is remotely controlling a dual-arm robot. By physically demonstrating the task, the operator generates teaching data — showing the robot "this is how you should move."

The specific task is dual-arm box packing — using both arms to place items into a box. When we train a VLA model on this teleoperation data, the robot eventually learns to perform the same task autonomously.

While teleoperation data is limited in volume, it's extremely rich in information — force profiles, approach angles, recovery behaviors — and this richness is what drives model quality.

**Key Message**: テレオペで高品質な教示データを収集し、VLAに学習させることで自律動作を実現する。

---

## P12: DEMONSTRATION — CXC技術展示

### 🇯🇵 日本語スクリプト

ここからデモをお見せします。これはCXC——浜離宮の技術展示で実演したものです。

Level 1は「Target Robot Control」——VLAによるロボット制御の基本デモです。Level 2は動画でご覧いただきます。

タスクは「さまざまな形状の物体を箱に入れる」というものです。注目していただきたいのは2つのポイントです。

1つ目は「Adaptation to Various States」——置かれ方や向きが変わっても適応的に対応できること。2つ目は「Autonomous Failure Recovery」——掴み損ねたり落としたりしても、自分でリカバリーして作業を継続できること。

従来のロボットなら失敗した時点でラインが止まります。でも、VLAベースのロボットは「あ、失敗したな」と認識して、自分でやり直す。これが大きな違いです。

### 🇩🇪🇬🇧 English Script

Now let me show you a demonstration. This was presented at CXC — our technology exhibition at Hamarikyu.

Level 1 demonstrates Target Robot Control — the basic VLA-driven control. Level 2 is shown as video.

The task is straightforward: put various-shaped objects into a box. But please pay attention to two key capabilities.

First: Adaptation to Various States. The robot handles objects regardless of their orientation or placement. Second: Autonomous Failure Recovery. If the robot drops something or fails to grasp it, it recognizes the failure and retries on its own.

With conventional robots, a failure means the line stops and a human has to intervene. With VLA-based control, the robot recognizes "that didn't work" and autonomously recovers. That's a fundamental difference.

**Key Message**: VLAロボットは多様な状態に適応し、失敗時も自律的にリカバリーできる。

---

## P13: Shaver Packing VLA Demo — iRex出展

### 🇯🇵 日本語スクリプト

こちらはiRex（国際ロボット展）で出展したデモです。シェーバーの梱包作業をVLAで自律制御しています。

映像はx2の速度再生ですが、実際にはロボットが自分で判断しながら、シェーバーという比較的複雑な形状の製品を箱に詰めています。

このデモは、先ほどのCXCデモからさらに一歩進んで、より実際の製品に近いものを扱っています。形が複雑で、向きによって梱包の仕方を変える必要がある——まさにEmbodied AIが力を発揮する領域です。

### 🇩🇪🇬🇧 English Script

This is a demo we presented at iRex — the International Robot Exhibition. It shows a VLA-controlled robot autonomously packing electric shavers.

The video is played at 2x speed, but in reality the robot is making its own decisions throughout — handling shavers, which have a fairly complex geometry, and packing them into boxes.

This builds on the earlier CXC demo, but with a more realistic product. Shavers have irregular shapes and require different handling depending on orientation — exactly the kind of task where Embodied AI shines.

**Key Message**: 実製品（シェーバー）の梱包をVLAで自律実行。より現実的なタスクでの実証。

---

## P14: Next-Generation Robot Control with VLA（Before/After比較）

### 🇯🇵 日本語スクリプト

ここで、従来型とVLAベースのロボット制御を明確に比較します。

Before——ルールベースの制御。決められた座標への移動しかできません。環境が少し変わるとすぐ対応できなくなる。失敗したら停止して人の介入が必要。

After——VLAベースの制御。カメラで状況を見て、適応的に動作を生成します。複雑な形状の物体も柔軟に操作できる。そして、失敗を自分で認識して自律的にリカバリーする。

さらに重要なのが、Robo SyncとVLAを統合することで——現場でのデータ収集、VLAモデルの学習、そして推論・制御——この3つが循環するエコシステムを構築できるという点です。使えば使うほど賢くなる仕組みを、プラットフォームレベルで実現します。

### 🇩🇪🇬🇧 English Script

Let me draw a clear comparison between conventional and VLA-based robot control.

Before — rule-based control: the robot moves to predetermined coordinates. It struggles with even minor environmental changes. When it fails, it stops and waits for human intervention.

After — VLA-based control: the robot perceives the situation through its cameras and generates adaptive actions. It handles complex geometries flexibly. And it recognizes failures and recovers autonomously.

But here's what's truly powerful: by integrating Robo Sync with VLA, we create a closed-loop ecosystem — field data collection feeds into VLA training, which improves inference and control, which generates better data. The more you use it, the smarter it gets — and this is built at the platform level.

**Key Message**: Robo Sync × VLAの統合で「データ収集→学習→推論」の循環エコシステムを実現する。

---

## P15: RFA アーキテクチャ（Target State）

### 🇯🇵 日本語スクリプト

最後に、RFAの全体アーキテクチャをお見せします。4つのHubから構成されています。

まず最上位に「Task Planning Hub」。ここにはLLM Agentがいて、自然言語でのタスク理解、作業計画の策定、推論、そしてエラー時のリカバリー判断を担当します。人間が「この箱にこれを詰めて」と言うだけで、具体的な作業手順に分解してくれます。

次に「Symbol Hub」。言語の世界と物理の世界をつなぐ記号接地の層です。VLM（Vision-Language Model）を使って、ロボットの目で見た状況を言語的な意味に変換します。

3つ目が「Sensorimotor Hub」——ここがVLAです。視覚情報から直接、ロボットの行動を生成します。

そして土台になるのが「Robo Sync + Data Platform」。物理ロボットの実行基盤であり、安全制御を担い、かつデータ収集基盤でもある。

この4層が連携することで——言語で指示を受け、状況を理解し、自律的に動作し、安全に実行する——RFAの目指す自律ロボティクスが実現します。

以上がRFAの全体像です。ご質問があればぜひお願いします。

### 🇩🇪🇬🇧 English Script

Finally, let me show you the overall RFA architecture. It consists of four interconnected hubs.

At the top is the Task Planning Hub, powered by an LLM Agent. It handles natural language task understanding, work planning, reasoning, and recovery decisions. You can simply say "pack these items into that box," and it decomposes the instruction into concrete steps.

Next is the Symbol Hub — the grounding layer that bridges language and the physical world. Using a VLM — a Vision-Language Model — it converts what the robot sees into semantic understanding.

Third is the Sensorimotor Hub — this is where VLA lives. It generates robot actions directly from visual input.

And the foundation is Robo Sync plus the Data Platform. It's the physical execution layer, handling safety control and serving as the data collection infrastructure.

These four layers work together to deliver the full RFA vision: receive instructions in natural language, understand the situation, act autonomously, and execute safely.

That's the complete picture of RFA. I'd be happy to take any questions.

**Key Message**: RFAは4層（LLM Agent → Symbol Grounding → VLA → Robo Sync）で構成される自律ロボティクスアーキテクチャ。

---

> **総プレゼン時間目安**: 15〜25分（質疑応答除く）
