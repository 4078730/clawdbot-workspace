# RFA: Robotics Foundation Agent — Demo Presenter Script
## Idea Forge Presentation for Blue Yonder (Germany)

> **対象**: Blue Yondarドイツメンバー（外部）
> **形式**: プレゼンター用スクリプト（各ページ1〜2分）
> **前提**: 聴衆はEmbodied AI・VLAの基礎知識あり

---

## P1: タイトル — Robotics Foundation Agent

### 🇯🇵 日本語スクリプト

皆さん、本日はお時間いただきありがとうございます。パナソニック コネクトR&D部門の発表を始めさせていただきます。

本日のテーマは「Robotics Foundation Agent」、略してRFAです。サブタイトルにある通り、Embodied AIによる自律的なタスク実行の実現を目指す、私たちの取り組みについてお話しします。

ロボットが単にプログラムされた動作を繰り返すのではなく、現場の状況を理解し、自ら判断して作業を行う。そんな世界を実現するためのプラットフォームとAI戦略について、今日はご紹介します。

### 🇩🇪🇬🇧 English Script

Thank you all for joining us today. I'm delighted to present our work from Panasonic Connect's R&D Division.

Our topic today is the "Robotics Foundation Agent" — or RFA. As the subtitle says, we're working toward autonomous task execution powered by Embodied AI.

The vision is straightforward: instead of robots that merely repeat pre-programmed motions, we want robots that understand the situation on the factory floor, make decisions, and execute tasks autonomously. Today, I'll walk you through our platform, our AI strategy, and live demonstrations that show where we are on this journey.

**Key Message**: RFAはEmbodied AIで産業ロボティクスを「プログラム実行」から「自律作業」へ変革するプロジェクトです。

---

## P2: マイルストーン — Robot Field Implementation Service

### 🇯🇵 日本語スクリプト

まず、直近のマイルストーンからお伝えします。

2025年6月30日に「Robot Field Implementation Service」の新製品発表会を行いました。これは大きく2つのサービスで構成されています。

1つ目が「System Integration Service」。こちらは6月30日からサービスを開始しています。ロボット導入のためのシステムインテグレーションを、私たちがワンストップで提供するサービスです。

2つ目が「Robot Control Platform」、これは後ほど詳しくご説明しますが、10月にサービス開始を予定しています。

つまり、私たちは研究開発だけでなく、実際の製品・サービスとして市場に投入するフェーズに入っているということです。

### 🇩🇪🇬🇧 English Script

Let me start with our recent milestones.

On June 30, 2025, we held the launch event for our "Robot Field Implementation Service." This comprises two major offerings.

First, the System Integration Service, which went live on June 30. This is a one-stop service where we handle the full system integration for robot deployment at customer sites.

Second, our Robot Control Platform — which I'll explain in detail shortly — is scheduled for launch in October.

The key takeaway here is that we've moved beyond R&D. These are real products and services going to market.

**Key Message**: RFAは研究段階を超え、2025年に商用サービスとして市場投入されています。

---

## P3: Robot Control Platform（Robo Sync）

### 🇯🇵 日本語スクリプト

それでは、Robot Control Platform、私たちが「Robo Sync」と呼んでいるプラットフォームについてご説明します。

Robo Syncには3つの大きな特徴があります。

1つ目が「Multi-Robot Manufacturer Support」。これは非常に重要なポイントです。現場では複数メーカーのロボットが混在していることがほとんどですが、Robo Syncはメーカーを問わず統合的に制御できます。ファナック、安川、UR……どのメーカーのロボットでも、1つのプラットフォームから動かせるわけです。

2つ目が「Visual Programming」。従来のロボットプログラミングは専門知識が必要でしたが、Robo Syncではブロックを組み合わせるように直感的に動作を作成できます。

3つ目が「Standard Configuration Templates」。よくある工程パターンをテンプレート化しているので、ゼロから設計する必要がなく、導入期間を大幅に短縮できます。

### 🇩🇪🇬🇧 English Script

Now, let me introduce our Robot Control Platform, which we call "Robo Sync."

Robo Sync has three key features.

Feature one: Multi-Robot Manufacturer Support. In real factory environments, you typically find robots from multiple vendors — FANUC, Yaskawa, Universal Robots, and so on. Robo Sync provides a unified control layer across all of them. One platform, many robots.

Feature two: Visual Programming. Instead of writing low-level robot code, operators can build task sequences by combining visual blocks. This dramatically lowers the barrier to entry for robot programming.

Feature three: Standard Configuration Templates. We've pre-built templates for common process patterns, so deployment doesn't start from scratch. This significantly reduces time-to-production.

**Key Message**: Robo Syncはメーカー非依存の統合ロボット制御プラットフォームであり、ビジュアルプログラミングとテンプレートで導入を加速します。

---

## P4: 社内導入事例（6サイト）

### 🇯🇵 日本語スクリプト

Robo Syncは既に社内6サイトで実際に導入・運用されています。いくつか具体例をご紹介します。

まず、神戸工場のLet's note製造ラインでの「ラベル貼付工程」。ノートPCに各種ラベルを正確に貼り付ける作業を自動化しています。

次に「タッチパネル精密検査工程」。タッチパネルの品質検査をロボットで自動化し、検査精度と速度を両立しています。

そして「部品梱包工程」。消費者製品の部品を箱詰めする工程ですが、これは後ほどお話しするVLA技術との接点にもなってきます。

重要なのは、これらが実験室ではなく実際の製造現場で稼働しているという点です。実フィールドでの運用実績が、私たちの技術の信頼性を裏付けています。

### 🇩🇪🇬🇧 English Script

Robo Sync is not just a concept — it's already deployed across six internal sites within Panasonic. Let me highlight a few examples.

First, the Label Application Process at our Kobe factory, on the Let's note laptop production line. Robots precisely apply various labels to notebook PCs.

Second, Touch Panel Precision Inspection. Automated quality inspection of touch panels, achieving both high accuracy and throughput.

Third, Parts Packaging Process for consumer products. Robots pack components into boxes — and this use case becomes particularly relevant when we later discuss VLA technology.

The critical point is: these are not lab demos. They're running in actual production environments. This real-world operational track record validates the maturity of our platform.

**Key Message**: Robo Syncは社内6サイトで実稼働中。実フィールドでの運用実績が技術の成熟度を証明しています。

---

## P5: 新チャレンジ領域 — SCM全体への拡大

### 🇯🇵 日本語スクリプト

ここから、私たちの新しいチャレンジについてお話しします。

これまでのロボット自動化は、主にStorage（保管）やPicking（ピッキング）といった限定的な工程が中心でした。しかし、私たちはこの領域をサプライチェーン全体に拡大しようとしています。

具体的には、Inbound（入荷・受入）からStorage（保管）、そしてOutbound（出荷）まで。Receiving、Picking、Packaging、Shippingという一連のフロー全体をロボットでカバーする。

これはBlue Yonderさんにとっても馴染み深い領域だと思います。サプライチェーンマネジメントの中で、物理的なオペレーションをいかに自動化するか。まさにここが私たちのターゲットです。

### 🇩🇪🇬🇧 English Script

Now, let me talk about where we're heading next.

Historically, robot automation in logistics has focused on specific, isolated processes — storage and picking being the most common. We're now expanding our scope to cover the entire supply chain operation.

This means end-to-end automation: from Inbound — receiving goods — through Storage, and all the way to Outbound — picking, packaging, and shipping.

I imagine this resonates well with the Blue Yonder team, given your deep expertise in supply chain management. The question is: how do we automate the physical operations within SCM? That's exactly our target.

**Key Message**: 限定工程の自動化から、入荷→保管→出荷のSCM全体をカバーする自動化へ領域拡大しています。

---

## P6: SCMサイトでの自動化課題とEmbodied AI

### 🇯🇵 日本語スクリプト

ただし、SCMサイト全体の自動化は、従来のロボティクスでは非常に難しい。なぜか。4つの課題があります。

1つ目、「Diverse Shapes and Materials」。物流現場では形状も素材も全く異なる多種多様な商品を扱います。

2つ目、「Daily Changing Product Composition」。毎日取り扱う商品の構成が変わります。昨日と今日で全く違う商品が流れてくる。

3つ目、「Dependency on Human Tacit Knowledge」。熟練作業者の暗黙知に依存している。「この形の商品はこう持つ」「この素材は力加減に注意」といった知識です。

4つ目、「Programming and Teaching Required」。新しい商品が来るたびにロボットのプログラミングやティーチングが必要になる。

これらの課題に対する答えが、Embodied AIです。Language（言語理解）、Vision（視覚認識）、Action（動作生成）を統合することで、ロボットが自律的に状況を判断し作業できるようになります。

### 🇩🇪🇬🇧 English Script

However, automating the entire SCM site is extremely challenging with conventional robotics. Let me explain why, through four key challenges.

First, Diverse Shapes and Materials. In logistics, you handle an enormous variety of products — different sizes, shapes, weights, and materials.

Second, Daily Changing Product Composition. The mix of products changes every single day. What flows through the line today is completely different from yesterday.

Third, Dependency on Human Tacit Knowledge. Much of the skill lives in experienced workers' heads — how to grip this shape, how much force for that material. This knowledge is implicit and hard to codify.

Fourth, Programming and Teaching Required. Every time a new product appears, someone needs to reprogram or re-teach the robot. This doesn't scale.

Our answer to these challenges is Embodied AI — integrating Language understanding, Vision perception, and Action generation so that robots can autonomously assess situations and perform tasks.

**Key Message**: SCM現場の多様性・変動性・暗黙知依存という課題を、Embodied AI（Language + Vision + Action）で解決します。

---

## P7: Embodied AIがもたらすロボティクスの変革

### 🇯🇵 日本語スクリプト

ここで、Embodied AIの大きな潮流を整理させてください。

2022年にChatGPTが登場し、言語AIが一気に進化しました。2023年にはGPT-4Vが出て、視覚と言語の統合が実現。そして2024年、VLA — Vision-Language-Action Modelが登場し、いよいよAIがロボットの「体」を持つ時代に入りました。

NVIDIAのGR00T、Physical IntelligenceのΠ0（パイゼロ）など、世界中のトッププレイヤーがこの領域に参入しています。

ここで重要なメッセージがあります。AIモデル自体はコモディティ化が進んでいます。誰でもオープンソースのVLAモデルを使える時代が来る。では、差別化の源泉は何か？それは「Field Data」です。実際の現場で収集した実データ。これこそが競争優位の鍵になります。

この認識が、私たちの戦略の根幹にあります。

### 🇩🇪🇬🇧 English Script

Let me put Embodied AI in the broader context of the AI evolution timeline.

In 2022, ChatGPT marked the breakthrough in language AI. In 2023, GPT-4V brought the fusion of vision and language. And in 2024, we entered the era of VLA — Vision-Language-Action Models — where AI finally gets a physical body.

Major players are converging on this space: NVIDIA with GR00T, Physical Intelligence with π0, and many others.

But here's the critical insight: AI models themselves are commoditizing. Open-source VLA models are becoming accessible to everyone. So where does competitive differentiation come from? The answer is Field Data — real-world data collected from actual operational environments. That is the true source of advantage.

This conviction is the foundation of our entire strategy, as you'll see in the next slides.

**Key Message**: AIモデルはコモディティ化する。差別化の源泉は「現場のField Data」にシフトしています。

---

## P8: VLA Model（Vision-Language-Action）

### 🇯🇵 日本語スクリプト

VLAモデルについてもう少し詳しくご説明します。

VLAは、大量のテキストデータ、画像・動画データ、そしてロボットの動作データという3種類のデータから学習します。テキストで「何をすべきか」を理解し、画像・動画で「何が見えているか」を認識し、動作データで「どう動くべきか」を学ぶ。この3つの統合が、VLAの核心です。

ただし、大きな課題が2つあります。

1つ目が「Domain-Specific Dataの不足」。汎用的なデータは大量にありますが、特定の産業ドメイン — たとえば物流現場や製造ラインに特化したデータは圧倒的に不足しています。

2つ目が「Robot Action Dataの不足」。テキストや画像のデータは膨大にありますが、実際のロボット動作データは桁違いに少ない。これがVLA発展のボトルネックになっています。

つまり、この2つのデータギャップを埋められる者が、Embodied AIの勝者になるということです。

### 🇩🇪🇬🇧 English Script

Let me dive a bit deeper into how VLA models work.

A VLA model learns from three types of data: large-scale text data to understand "what to do," image and video data to perceive "what is happening," and robot action data to learn "how to move." The integration of all three is what makes VLA powerful.

However, there are two critical bottlenecks.

First, the shortage of Domain-Specific Data. While general-purpose data is abundant, data specific to industrial domains — logistics floors, manufacturing lines — is extremely scarce.

Second, the shortage of Robot Action Data. Compared to the vast ocean of text and images available on the internet, actual robot manipulation data is orders of magnitude smaller. This is the key bottleneck for advancing VLA.

The implication is clear: whoever can close these data gaps will lead the Embodied AI race.

**Key Message**: VLAの発展ボトルネックは「ドメイン特化データ」と「ロボット動作データ」の不足。このギャップを埋めることが鍵です。

---

## P9: Data-Driven AI Strategy

### 🇯🇵 日本語スクリプト

ここで、私たちの戦略が明確につながります。

先ほどご紹介したRobo Sync。あれは単なるロボット制御プラットフォームではありません。私たちはRobo Syncを「学習データ収集基盤」として位置づけています。

Robo Syncが現場に入れば入るほど、実際の作業データが継続的に蓄積されていく。そのデータを使ってEmbodied AIを進化させ、進化したAIをまた現場に還元する。このサイクルが回り続けることが、私たちの戦略の核心です。

具体的な変化をお見せします。Before — 従来は、事前に登録済みのオブジェクトしか検出できませんでした。未知の物体が来たら対応できない。After — Embodied AIを適用すると、状況全体を理解し、未知の物体でも自律的に作業できるようになります。

### 🇩🇪🇬🇧 English Script

Now, this is where our strategy comes together.

Remember Robo Sync? It's not just a robot control platform. We've strategically positioned it as our learning data collection infrastructure.

The more sites Robo Sync is deployed to, the more real-world operational data we continuously accumulate. We use that data to improve our Embodied AI models, and deploy the improved AI back to the field. This creates a virtuous cycle — a data flywheel — that is the core of our strategy.

Let me illustrate the transformation. Before: the system could only detect pre-registered objects. If an unknown item appeared, the robot couldn't handle it. After: with Embodied AI, the robot understands the overall situation and can work autonomously — even with objects it has never seen before.

**Key Message**: Robo Syncは制御プラットフォームであると同時にデータ収集基盤。現場データの蓄積→AI進化→現場還元のサイクルが競争力の源泉です。

---

## P10: Our Data Strategy — 3層アプローチ

### 🇯🇵 日本語スクリプト

データ戦略をもう少し具体的にお話しします。私たちは3つの層でデータを収集・活用しています。

第1層が「Human Teleoperation」。人間のオペレーターがロボットを遠隔操作して、高品質な教示データを収集します。コストは高いですが、データ品質は最高。これを使ってVLAモデルをFine-Tuneします。

第2層が「Robo Sync Field Data」。既に導入されているRobo Syncの現場から、日々の運用データを継続的に収集します。これでデータ量をAugment — 増強します。

第3層が「Simulation / Human Videos」。シミュレーション環境や、人間の作業動画からロボット動作データに変換します。

この3層構造により、高品質なデータから大量データまでをカバーし、VLAモデルを効率的に育てていく。これが私たちのデータ戦略です。

### 🇩🇪🇬🇧 English Script

Let me break down our data strategy more concretely. We operate on three layers.

Layer one: Human Teleoperation. Human operators remotely control robots to collect high-quality demonstration data. It's expensive, but the data quality is the highest. We use this to fine-tune our VLA models.

Layer two: Robo Sync Field Data. From all the Robo Sync deployments already in the field, we continuously collect operational data. This augments our dataset with ongoing, real-world variety.

Layer three: Simulation and Human Videos. We convert data from simulation environments and human task videos into robot action data.

This three-layer approach gives us the full spectrum — from high-quality, expensive data for fine-tuning, through continuous field data for augmentation, to scalable synthetic data for breadth. That's how we systematically grow our VLA models.

**Key Message**: テレオペ（高品質）× Robo Syncフィールドデータ（継続収集）× シミュレーション（スケール）の3層でデータ戦略を構築しています。

---

## P11: テレオペレーションによるVLA学習

### 🇯🇵 日本語スクリプト

データ戦略の第1層、テレオペレーションについて、もう少し詳しくお見せします。

ここでは、人間のオペレーターが双腕ロボットを遠隔操作しています。オペレーターが操作するマスターアームの動きが、そのまま作業用ロボットに反映される仕組みです。

具体的なタスクとして「Dual-arm Box Packing」を行っています。両腕を使って、さまざまな物体を箱に詰める作業です。

このテレオペデータを大量に収集し、VLAモデルに学習させることで、最終的にはテレオペなしで — つまり完全自律で同じ作業ができるようになります。

人間が「お手本」を見せて、ロボットがそこから学ぶ。非常にシンプルですが、強力なアプローチです。

### 🇩🇪🇬🇧 English Script

Let me show you our first data layer in action — human teleoperation.

Here, a human operator is remotely controlling a dual-arm robot. The operator manipulates master arms, and their movements are mirrored in real time by the task robot.

The specific task is Dual-arm Box Packing — using both arms to pack various objects into a box.

We collect large volumes of this teleoperation data and use it to train our VLA model. The goal: once the model has learned enough from human demonstrations, the robot can perform the same task fully autonomously — no teleoperation needed.

The concept is beautifully simple: humans show the robot how it's done, and the robot learns from those demonstrations. Simple, but remarkably effective.

**Key Message**: 人間のテレオペ操作を教師データとしてVLAに学習させ、最終的に完全自律動作を実現します。

---

## P12: DEMONSTRATION — CXC技術展示

### 🇯🇵 日本語スクリプト

それでは、デモンストレーションをご覧いただきます。これは浜離宮のCXC（Customer Experience Center）で行った技術展示の内容です。

2つのレベルがあります。

Level 1は「Target Robot Control」。これは実際にライブでお見せできるデモです。

Level 2は動画でのデモンストレーションになります。

タスクは「Put Various Shaped Objects into a Box」— さまざまな形状の物体を箱に入れる作業です。

ここで注目していただきたいポイントが2つあります。

1つ目、「Adaptation to Various States」。物体の位置や向きが毎回変わっても、ロボットが適応的に対応します。事前にプログラムした動きではなく、その場の状況を見て判断しています。

2つ目、「Autonomous Failure Recovery」。もし掴み損ねたり、置く位置がずれたりしても、ロボットが自分で失敗を認識し、リカバリー動作を行います。人間の介入なしに、です。

では、デモをご覧ください。

### 🇩🇪🇬🇧 English Script

Now, let me show you our demonstrations. These were presented at our CXC — Customer Experience Center — in Hamarikyu, Tokyo.

We have two levels.

Level 1 is Target Robot Control — this can be shown as a live demo.

Level 2 is available as a video demonstration.

The task is: "Put Various Shaped Objects into a Box."

I'd like you to pay attention to two key capabilities.

First, Adaptation to Various States. The objects are placed in different positions and orientations each time, and the robot adapts accordingly. It's not following a fixed trajectory — it's making decisions based on what it sees.

Second, Autonomous Failure Recovery. If the robot misses a grasp or places something incorrectly, it recognizes the failure on its own and attempts recovery — without any human intervention.

Let's watch the demonstration.

**Key Message**: VLAによるロボットは、物体の状態変化への適応と失敗の自律リカバリーを実現しています。

---

## P13: Shaver Packing VLA Demo — iRex出展

### 🇯🇵 日本語スクリプト

こちらは、国際ロボット展 iRex で出展したデモです。

タスクは「Shaver Packing」— シェーバーの箱詰め作業を、VLAモデルによる完全自律制御で行っています。「x2」と表記しているのは、2回連続で自律実行している様子です。

シェーバーは複雑な形状をしていますが、ロボットは視覚情報から適切な把持方法を判断し、正確に箱に収めています。

このデモは業界関係者から非常に高い評価をいただきました。従来のピック&プレースとは次元の異なる、状況適応型の作業を実現しているからです。

### 🇩🇪🇬🇧 English Script

This is the demonstration we showcased at iRex — the International Robot Exhibition.

The task is Shaver Packing — packing electric shavers into boxes, entirely controlled by our VLA model. The "x2" indicates two consecutive autonomous executions.

Shavers have a complex, irregular shape, but the robot determines the appropriate grasp strategy from visual input and accurately places them into the packaging.

This demo received very positive feedback from industry professionals. It demonstrates a fundamentally different capability from traditional pick-and-place — this is situation-adaptive manipulation.

**Key Message**: 複雑形状のシェーバー箱詰めをVLAで完全自律化。iRexで業界から高評価を獲得しました。

---

## P14: Next-Generation Robot Control with VLA — Before/After

### 🇯🇵 日本語スクリプト

ここで、VLAがもたらす変化をBefore/Afterで整理させてください。

Before — ルールベースの制御。ロボットは事前に決められた座標に移動するだけです。環境が少しでも変わると動けなくなる。失敗したら停止して、人間の介入を待つしかない。

After — VLAによる制御。ロボットは状況を見て適応的に動作します。複雑な形状の物体でも柔軟に操作できる。そして何より、失敗を自分で認識し、自律的にリカバリーできる。

これらを実現する全体像が、Robo SyncとVLAの統合です。Robo Syncが現場でデータを収集し、そのデータでVLAモデルを学習させ、学習済みモデルで推論・制御を行う。このサイクルが回り続けることで、ロボットは使えば使うほど賢くなっていきます。

### 🇩🇪🇬🇧 English Script

Let me crystallize the transformation that VLA brings, with a clear Before and After comparison.

Before — with rule-based control: The robot can only move to predefined coordinates. Any change in the environment causes failure. When something goes wrong, the robot stops and waits for human intervention.

After — with VLA: The robot observes the situation and adapts its behavior. It can manipulate objects with complex shapes flexibly. And most importantly, it recognizes failures and recovers autonomously.

The enabling architecture is the integration of Robo Sync and VLA. Robo Sync collects data in the field, that data trains the VLA model, and the trained model handles inference and control. This cycle runs continuously — meaning the robot gets smarter the more it operates.

**Key Message**: ルールベース（固定動作・停止）からVLA（状況適応・自律リカバリー）へ。Robo Sync × VLAの統合サイクルでロボットは進化し続けます。

---

## P15: RFA アーキテクチャ（Target State）

### 🇯🇵 日本語スクリプト

最後に、RFAの目指すアーキテクチャ全体像をお見せします。4つの層で構成されています。

第1層、「Task Planning Hub」。ここにはLLM Agentが位置します。自然言語でタスクの指示を理解し、計画を立て、推論を行い、問題が起きた場合のリカバリー戦略も決定します。

第2層、「Symbol Hub」。言語世界と物理世界をつなぐ「記号接地」の層です。VLM（Vision Language Model）を使って現場の状態を認識し、抽象的なタスク指示を具体的な物理操作に翻訳します。

第3層、「Sensorimotor Hub」。ここがVLAの領域です。カメラからの視覚情報をもとに、リアルタイムでロボットの動作を生成します。

第4層、「Robo Sync + Data Platform」。物理的なロボットの実行基盤であり、安全制御を担い、同時にデータ収集プラットフォームとして機能します。

この4層構造により、「言語で指示→状況理解→動作生成→実行・データ収集」という、完全なループが実現します。これがRFA — Robotics Foundation Agentの全体像です。

本日はご清聴ありがとうございました。質問をお受けいたします。

### 🇩🇪🇬🇧 English Script

Finally, let me show you the target architecture of RFA as a whole. It consists of four layers.

Layer one: the Task Planning Hub, powered by an LLM Agent. It understands task instructions in natural language, formulates plans, performs reasoning, and determines recovery strategies when problems arise.

Layer two: the Symbol Hub. This is the grounding layer that bridges the linguistic world and the physical world. Using a VLM — Vision Language Model — it perceives the state of the environment and translates abstract task instructions into concrete physical operations.

Layer three: the Sensorimotor Hub. This is where VLA operates. It takes visual input from cameras and generates robot actions in real time.

Layer four: Robo Sync plus the Data Platform. This is the physical execution layer — handling safety control, robot actuation, and simultaneously serving as the data collection infrastructure.

These four layers together create a complete loop: language instruction → situation understanding → action generation → execution and data collection. This is RFA — the Robotics Foundation Agent.

Thank you for your attention. I'm happy to take any questions.

**Key Message**: RFAは「Task Planning（LLM）→ Symbol Grounding（VLM）→ Sensorimotor（VLA）→ Robo Sync（実行・データ収集）」の4層アーキテクチャで自律ロボットを実現します。

---

> *Script prepared for Idea Forge demo presentation to Blue Yonder Germany team.*
> *Last updated: 2026-02-24*
