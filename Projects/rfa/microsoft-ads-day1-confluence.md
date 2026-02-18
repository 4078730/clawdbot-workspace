# Robotics Foundation Agent — Microsoft ADS Day 1

> **日時:** 2026年2月 / **発表者:** 黄瀬 輝 / **所属:** Panasonic Connect · Cognitive AI

---

## Session 1: Project Overview（20分）

---

### S1-1. ビジョンと解決する課題（7分）

#### Robo Sync — ロボット制御プラットフォーム

📷 `01-robosync-launch.png`
> Robot Field Implementation Service 新製品記者発表（2025.6.30）。システム連携サービス6月提供開始、ロボット制御PF 10月提供開始。WMS（BlueYonder）連携、rapyuta.io協業。

📷 `02-robosync-features.png`
> Robo Syncの3つの特長。①マルチロボットメーカー対応 ②ビジュアルプログラミング（ブロック組合せ） ③標準構成テンプレート。

📷 `03-internal-cases.png`
> 社内先行導入：パナソニックグループ6拠点で稼働中。神戸工場Let's noteラベル貼付、タッチパネル精密検査、パーツ梱包工程。

#### SCM現場のロボット自動化の課題

📷 `05-scm-challenges.png`
> 左：SCM現場の課題（連続的な非定型作業、多様な形状・素材、日次変動する製品構成、人の暗黙知への依存）。右：Embodied AI（Language/Vision/Action）で解決。

**RFA（Robotics Foundation Agent）** は、このギャップを埋める知能システム。人間の言語指示を理解し、物流・製造現場の複雑な物理タスクをロボットが自律実行する。

| # | 課題 | 説明 |
|---|------|------|
| 1 | **抽象的言語指示の自律的解釈** | 「すきまなく詰めて」→暗黙的意図を推論→具体的作業手順に自動分解 |
| 2 | **専門知識不要な作業指示** | 自然言語のみでロボット作業を実行。SIer依存を解消 |
| 3 | **未知・複雑形状物体の汎用操作** | 事前登録なしの適応的把持。ルールベース制御の限界突破 |
| 4 | **動的環境での自律的問題解決** | 把持失敗・落下時の自律リカバリーと計画修正 |

<details><summary>📝 台本（7分）</summary>

まず、RFAの土台となるRobo Sync — ロボット制御プラットフォームについてご説明します。2025年6月にRobot Field Implementation Serviceとして記者発表し、ロボット制御PFは10月にサービスを開始しました。マルチロボットメーカー対応、ビジュアルプログラミング、標準テンプレートの3つの特長を持ち、現在パナソニックグループ6拠点で稼働中です。

このRobo Syncが解こうとしているSCM現場のロボット自動化には、4つの根本的な課題があります。

1つ目は**抽象的言語指示の自律的解釈**です。「すきまなく詰めて」のような曖昧な指示から、暗黙的意図を推論し、具体的作業手順に自動分解します。

2つ目は**専門知識不要な作業指示**です。従来の1つ1つの動作教示から、現場作業者の自然言語指示のみでロボット作業を実行し、SIer依存を解消します。

3つ目は**未知・複雑形状物体の汎用操作**です。事前登録なしでも視覚認識から適応的把持・操作を実現します。

4つ目は**動的環境での自律的問題解決**です。把持失敗・物体落下等の予期せぬ状況で自律的にリカバリーし作業を継続します。

**RFA — Robotics Foundation Agent** は、これらの課題を解決する知能システムです。SCM領域の労働力不足が深刻な物流・倉庫現場で、入出庫・梱包等の属人作業を自動化し、Robo Syncをベースにこの技術をスケールしていきます。

</details>

---

### S1-2. 技術アーキテクチャ概要（7分）

#### Embodied AIのグローバルトレンド

📷 `06-embodied-ai-trend.png`
> ChatGPT(2022) → GPT-4V(2023) → VLA(2024) × ルールベースロボット制御 = 生成AIによる物理世界での知能獲得。GR00T(NVIDIA)、π0(Physical Intelligence)。AIモデルのコモディティ化に伴い、差別化の源泉は「現場データ」にシフト。

📷 `07-vla-model.png`
> Vision-Language-Action統合モデル。テキスト・画像/映像・ロボット動作シーンを大量に事前学習。課題：ドメイン特化データ不足、ロボット動作データ不足。

#### RFAの4レイヤー構造

| レイヤー | 役割 | 要素技術 |
|---------|------|---------|
| **Task Planning Hub**（LLM Agent） | 抽象指示→作業手順に自動分解 / スキル組み合わせ | DRIP（EMNLP 2025）、MTP / ViReSkill（Submitted） |
| **Symbol Hub** | 言語→画像上の操作点（どこを掴む/置く）に変換 | KeypointVLA（RSJ 2025）、IndexVLA（Submitted）、Gemini-ER |
| **Sensorimotor Hub**（VLA） | 視覚+言語+物理動作の統合制御 | π0 Fine-Tuning、~200 episodes/skill |
| **RoboSync + Data** | 安全な実行・データ収集・継続学習 | **VLA Skill Block（FY26最優先）**、MCP Agent |

#### 技術的差別化

- **言語指示の直接実行** — 複雑な事前プログラミング不要
- **未知環境への適応** — 学習パターン外でも自律判断
- **失敗からの自動学習** — 継続的性能向上

<details><summary>📝 台本（7分）</summary>

RFAの技術的背景をお話しします。Embodied AI — 物理世界で自律的に動作するAI — はグローバルで急速に進展しています。ChatGPT（2022）→ GPT-4V（2023）→ VLA（2024）と進化し、従来のルールベースロボット制御と掛け合わせることで、生成AIによる物理世界での知能獲得が始まっています。NVIDIAのGR00T、Physical Intelligenceのπ0が代表例です。

重要なのは、AIモデルのコモディティ化に伴い、差別化の源泉が「現場データ」にシフトしている点です。VLAモデル自体はオープンソースで誰でも使えますが、ドメイン特化データとロボット動作データが決定的に不足しています。

RFAのアーキテクチャは4レイヤーです。

**Task Planning Hub** — LLM Agentが「段取り」を担います。抽象指示を作業手順に自動分解し、スキルの組み合わせで実行します。

**Symbol Hub** — 言語世界と物理世界の橋渡しです。「重い箱」「壊れ物」といった記号を画像上の座標・Keypointに変換し、逆にVLAの観測結果をLLMが理解できる状態記述に変換します。

**Sensorimotor Hub** — VLAが身体操作を担います。π0をベースに、約200エピソードで1スキルを学習可能です。

**RoboSync + Data** — 安全な実行環境とデータ収集・継続学習の基盤。FY26はVLAをRoboSyncのスキルブロックとして統合することが最優先です。

技術的差別化は3つ。言語指示の直接実行、未知環境への適応、失敗からの自動学習です。

</details>

---

### S1-3. FY25実績とFY26方向性（6分）

#### FY25 主要成果

- ロボット制御PF経由のデータ収集→VLA学習→実動作の**完全サイクルを初めて実現**
- iREX2025で**Gemini-ER × π0による4スキル連続梱包デモ**を実現
- KeypointVLA/IndexVLA/DRIP/MTP/ViReSkillの要素技術確立 → 国際会議投稿
- MCPベースのLLM Agent × VLA × RoboSync統合アーキテクチャ整理
- Microsoft Responsible AI Workshop完了

#### RoboSyncの進化方向

📷 `08-evolving-autonomy.png`
> Before：登録済み物体の検出（Vision + Robosync）→ After：現場変化を理解し状況に応じて柔軟に自律作業（Language + Vision + Action + Robosync）。対象物体もBoxes/Bottles → 未登録品 → 複雑形状/リカバリーへ拡大。

#### FY26 目標：Robo Sync AI Suite

| マイルストーン | スコープ |
|--------------|---------|
| **α版（9月）** | VLAピックスキルがRoboSync上で動作。ビン内パーツのピック→作業台配置 |
| **β版（3月）** | 出庫サイクル全体をAgentic制御で動作 |

**4つの柱：** ①RoboSync×VLA統合 ②DataOps ③Agent Operation ④Field PoC

<details><summary>📝 台本（6分）</summary>

FY25の主要成果です。

ロボット制御PF経由のデータ収集→VLA学習→実動作の**完全サイクルを初めて実現**しました。π0を学習し、未学習物体への汎化性を実証しています。特に注目すべきは、リトライ動作を教えていないのにVLAが自律的に獲得したことです。

iREX2025では**Gemini-ER × π0による4スキル連続実行の梱包デモ**を実現しました。VLMで各ステップの成功/失敗を判定し、次ポリシーへの遷移またはリトライを実装しています。

要素技術としてKeypointVLA、IndexVLA、DRIP、MTP、ViReSkillを確立し、国際会議に投稿しています。MCPベースのLLM Agent × VLA × RoboSync統合アーキテクチャも整理しました。

FY26は**研究フェーズから現場実証フェーズへの転換年**です。**Robo Sync AI Suite** — RoboSyncにVLAを統合した商用プラットフォーム — の実現に向けて、α版（9月）・β版（3月）のリリースを目指します。

4つの柱でリソースを集中します。①RoboSync×VLA統合、②DataOps（継続学習パイプライン）、③Agent Operation（失敗検知・再計画・スキル切替）、④Field PoC（彩都パーツセンター実証）。

Microsoftとの協業は、特に②のDataOps基盤、シミュレーション、Responsible AIの領域で大きなシナジーがあると考えています。

</details>

---

## Session 2: Current State & Challenges（95分）

---

### S2-1. アーキテクチャ詳細と統合構造（25分）

#### Task Planning Hub

- **タスク理解・分解：** 自然言語指示→サブタスク列に構造化
- **Skill Alignment：** VLAスキル or RoboSync既存ブロックを選択
- **Re-Planning：** 論理ミス→LLM再計画 / 制御ミス→VLAパラメータ修正

#### Symbol Hub

- **記号接地：** 「重い箱」「壊れ物」→座標・Keypoint・マスクに変換
- **VLM状態認識：** Gemini-ERで成功/失敗判定
- **IndexVLA：** Point/Trajectory/Vector表現の使い分け（パースの記号論ベース）

#### Sensorimotor Hub

- **VLA Policy：** π0ベース、約200エピソードで1スキル学習可能
- **KeypointVLA：** 高精度タスク向けKeypoint中間表現
- **HIL Interface：** 人間教示→継続学習データに利用

#### RoboSync統合 — 2つのルート

📷 `02-robosync-features.png`（再掲 — ビジュアルプログラミングのイメージ）

| ルート | 説明 | 優先度 |
|-------|------|-------|
| **① Agent経由** | MCP経由でRoboSyncに接続。完全自律化ルート | 中長期 |
| **② VLAスキルブロック** | GUI配置・組み合わせ。既存ブロックと同列に扱える | **FY26最優先** |

MCPを共通プロトコルとして、RoboSync / WMS / MES / Gemini-ERと疎結合に接続。

<details><summary>📝 台本（25分）</summary>

RFAの4レイヤーをそれぞれ詳しく説明します。

**Task Planning Hub**はLLM Agentが「段取り」を担います。「この3種類の商品を壊れ物に気をつけて梱包して」という指示を受け取り、箱選定→ピッキング→箱詰め→緩衝材→封緘というサブタスク列に分解します。Skill Alignmentで各ステップでVLAスキルを使うかRoboSyncの既存ブロックを使うかを選択します。失敗時にはRe-Planningを実行し、論理的な計画ミスはLLMが再計画、局所的な制御ミスはVLAにパラメータ修正を指示します。

**Symbol Hub**は言語世界と物理世界の間を接続する中間層です。LLMが扱う記号表現（「重い箱」「壊れ物」）を、VLAが扱える座標・Keypoint・マスクに変換します。逆に、VLAの観測結果を「緩衝材がまだ不足している」のようなLLMが理解できる状態記述に変換します。VLM（Gemini-ER）で成功/失敗の判定や次に実行すべきスキルの決定を行います。IndexVLAは池内先生（京大名誉教授）のパースの記号論をベースに、タスクの物理特性に応じたPoint/Trajectory/Vector表現の使い分けを体系化しています。

**Sensorimotor Hub**が実際の物理動作を生成します。VLA Policyはπ0をベースに、カメラ画像＋ロボット状態＋タスク指示から連続的なロボット動作を生成します。学習コストは約200エピソード、スキルあたり約1日です。KeypointVLAは高精度タスク向けのKeypoint中間表現を用います。HIL Interfaceで自律リカバリー困難時は人間教示を受入れ、そのデータを継続学習に利用します。

**RoboSync統合**には2つのルートがあります。ルート①はLLM AgentがMCP経由でRoboSyncに接続する完全自律化ルート。FY25でClaude Desktop＋MCPによるPoCを実証済みです。ルート②はVLAをRoboSyncのスキルブロックとして提供し、GUIで配置・組み合わせるもので、**FY26の最優先統合ルート**です。MCPを共通プロトコルとして、RoboSync、WMS/MES、将来的にGemini-ERなどと疎結合に接続します。

</details>

---

### S2-2. 保有技術の詳細と成果（20分）

#### ① ロボット制御PF統合パイプライン

- ロボット制御PF経由のデータ収集→π0学習→実動作サイクルを実現
- 未学習物体への汎化性を実証
- **リトライ動作を教えていないのに自律的に獲得**

📷 ※konuki選定の動画素材を埋め込み

#### ② VLA-Robot環境（Idea Forge）

- 双腕Aloha Stationary AI + SO-101の実験環境
- ACT / π0 / smolVLA等の比較評価
- CXC展示・iREXでの継続的デモ開発

#### ③ KeypointVLA → IndexVLA

- KeypointVLA：画像上の(x,y)座標で操作点指定。既存VLAの構造変更不要
- IndexVLA：3種の指示モードを体系化
  - **Point型** — ピック＆プレース
  - **Trajectory型** — なぞり・拭き取り
  - **Vector型** — 押し込み・コネクタ挿入

#### ④ MTP / ViReSkill

- **MTP：** 成功経験参照→新環境でのプランニング。Sim→Real転移
- **ViReSkill：** 失敗映像分析→自律計画修正。Lifelong Learning
- ※国際会議Submitted

#### ⑤ DRIP（Planning）

- Backward Reasoning — ゴール逆算でサブゴール分解
- Minecraft 3D仮想環境で複雑構造タスクの達成を実証
- EMNLP 2025投稿済

#### ⑥ iREX2025統合デモ

- Gemini-ER × π0による多段タスクVLAデモ（シェーバー梱包）
- VLM判定→次ポリシー遷移 or リトライ/人間介入の分岐
- 現場PoCの**標準パターン**

📷 ※konuki選定の動画素材を埋め込み

<details><summary>📝 台本（20分）</summary>

FY25で確立した個別の技術成果を紹介します。

**① ロボット制御PF統合パイプライン** — ロボット制御PF経由でのデータ収集→π0学習→実動作のサイクルを初めて実現しました。未学習物体への汎化性を実証しています。特に注目すべきは、**リトライ動作を教えていないのにVLAが自律的に獲得**したことです。

**② VLA-Robot環境（Idea Forge）** — 双腕Aloha Stationary AIとSO-101を活用した実験環境を構築。ACT、π0、smolVLA等の複数VLAモデル比較評価を実施しています。CXC展示やiREXでの継続的デモ開発を進めています。

**③ KeypointVLA → IndexVLA** — KeypointVLAは画像上に「掴む点」「置く点」を(x,y)座標で指定します。既存VLAモデルの構造を一切変更せず、データ前処理だけで適用可能です。IndexVLAはこれを発展させ、Point型（ピック&プレース）、Trajectory型（なぞり・拭き取り）、Vector型（押し込み・コネクタ挿入）の3種の指示モードを体系化しました。池内先生のパースの記号論がベースです。

**④ MTP / ViReSkill** — MTPは過去の成功経験を参照し新環境でのタスクプランニングに活用するメモリ転移手法。シミュレータの知識を現実環境に転移してRe-Planning。ViReSkillは失敗動作の映像分析から自律的に計画修正し、次回以降の成功率を向上させるLifelong Learningです。

**⑤ DRIP** — 人間のBackward Reasoningを応用。ゴールから逆算してサブゴールに分解。テキスト環境からMinecraftの3D仮想環境に拡張し、複雑な空間推論タスクでの有効性を検証しています。EMNLP 2025に投稿済みです。

**⑥ iREX2025統合デモ** — Gemini-ER × π0による多段タスクVLAデモ。シェーバー梱包タスクを題材に、各ステップの完了/失敗をVLMで判定し、次ポリシーへの遷移またはリトライ/人間介入への分岐を実装。このデモ構成が今後の現場PoCで活用可能な「標準パターン」のたたき台です。

</details>

---

### S2-3. データ戦略と継続学習サイクル（15分）

#### Deploy-Time Scaling — 使いながら賢くなる構造

📷 `09-data-strategy.png`
> 3層データソース。Human Teleoperation（最高価値/Fine-Tune）→ Synthetic Data（スケーラブル/Augment）→ Human Videos（大量/Convert）→ Robot Foundation Model → Robo Syncにデプロイ → 継続的改善。

| データソース | 特性 | 用途 |
|-------------|------|------|
| **Human Teleoperation** | 最高価値・高コスト | 初期スキル獲得、高精度Fine-Tuning |
| **Synthetic Data** | スケール可能・Sim2Realギャップ | バリエーション拡張、ロバスト化 |
| **Human Videos** | 大量・ロボットコマンド含まず | 事前学習、意味表現の土台 |

#### データライフサイクル

```
Model Deploy → Logging → Data Export（RLDS形式） → Train/Fine-tune → Re-Deploy
```

- 現場導入と同時にデータ蓄積が始まる（追加コストほぼゼロ）
- 現場の失敗・リカバリーデータは固有の学習資産

#### 計算環境

- **GPU：** A100
- **スケール参考値：** 50,000エピソード規模の学習で約50時間

#### BigTechとの差別化

| | Training-Time Scaling（BigTech） | Deploy-Time Scaling（RFA） |
|---|---|---|
| 方式 | 大規模テレオペ施設 | 現場導入と同時にデータ蓄積 |
| 初期投資 | 数百億円 | 低い |
| データ特性 | 理想環境 | 現場固有（失敗・リカバリー含む） |

#### 課題（→ Microsoft協業ポイント）

- FT→再デプロイが手動 → **Azure ML Pipelines**
- モデルバージョン管理未整備 → **MLOps基盤**
- 合成データ生成の体系化 → **Microsoft Simulation**

<details><summary>📝 台本（15分）</summary>

RFAのデータ戦略の核心は「**使いながら賢くなる**」継続学習サイクルです。

**データソースは3層構造**です。上位がHuman Teleoperation（最高価値・高コスト、初期スキル獲得用）、中位がSynthetic Data（スケール可能だがSim2Realギャップ）、下位がHuman Videos（大量にあるがロボットコマンドを含まない、事前学習の土台）。

**データライフサイクル**はRoboSync経由です。Model Deploy → Logging → Data Export（RLDS形式で） → Train/Fine-tune → Re-Deploy。このサイクルで、現場実行→失敗検知→人間教示→データ蓄積→学習→Policy更新→再デプロイのループを回します。

計算環境としてはA100を使い、50,000エピソード規模の学習で約50時間のオーダーです。

これが**Deploy-Time Scaling**の核心です。BigTechのTraining-Time Scaling — 大規模テレオペ施設での力技データ収集、初期投資数百億円 — に対して、我々は現場導入と同時にデータ蓄積が始まる構造を取ります。顧客への省人化価値の提供とデータ収集が同時に起き、データ収集の追加コストはほぼゼロ。現場の失敗データ・リカバリーデータは、テレオペ施設では得られない固有の学習資産になります。

**現在の課題**として、Fine-Tuning→再デプロイのサイクルがまだ手動、モデルバージョン管理が未整備、合成データ生成の体系化が必要です。ここがMicrosoftとの協業ポイントで、Azure ML Pipelines、MLOps基盤、Microsoft Simulation環境との統合を期待しています。

</details>

---

### S2-4. Robo Sync AI Suiteに向けた技術チャレンジ（20分）

#### 技術的チャレンジ

| # | チャレンジ | 内容 |
|---|----------|------|
| T1 | **座標制御 ↔ 関節制御のブリッジ** | RoboSyncタスク空間 vs VLA関節空間。シームレスな切替機構 |
| T2 | **VLAの安全制御** | 速度・力リミット、異常検知、緊急停止。安全PLCとの整合 |
| T3 | **汎用操作精度のスケール** | 12万品番の多様な形状・包装。エンドエフェクタ戦略 |
| T4 | **Agentic マルチスキル制御** | 複数スキル動的切替。自律的失敗検知・リカバリー |

#### PF的チャレンジ（→ Microsoft Synergy）

| # | チャレンジ | 内容 | 期待する連携 |
|---|----------|------|-------------|
| P1 | **DataOps自動化** | ログ→RLDS変換→FT→評価→再デプロイ | Azure ML Pipelines |
| P2 | **モデル管理・配信** | サイト別バージョン管理、A/Bテスト | Azure ML / MLOps |
| P3 | **シミュレーション** | Sim2Realギャップ低減、合成データ拡張 | Microsoft Simulation |
| P4 | **Responsible AI** | 不確実性下の安全性、OSSライセンス | RAI Framework |

<details><summary>📝 台本（20分）</summary>

ここからが今日の議論の核心です。RoboSyncにVLAを統合して商用プラットフォーム — **Robo Sync AI Suite** — にしていくにあたっての技術的・プラットフォーム的なチャレンジを整理します。

**技術的チャレンジ**として4つ。

**T1: 座標制御↔関節制御のブリッジ。** RoboSyncはタスク空間座標ベースのオープンループ制御、VLAは関節空間でのクローズドループ制御です。この2つをシームレスに切り替える仕組みが必要です。

**T2: VLAの安全制御。** VLAが生成する動作にGuardrailを設ける必要があります。速度・力のリミット、異常検知、緊急停止。RoboSyncの既存安全PLCとの整合が課題です。

**T3: 汎用操作精度のスケール。** 12万品番の多様な形状・包装に対する成功率の向上。エンドエフェクタ戦略（吸着/グリッパ/指）の選択とリトライ戦略の洗練が必要です。

**T4: Agentic マルチスキル制御。** 複数VLAスキルの動的切替（ピック→個装→梱包→配置）、失敗検知→原因分析→自律リカバリー。β版の核心チャレンジです。

**PF的チャレンジ**として4つ。ここがMicrosoftとの協業ポイントです。

**P1: DataOpsパイプライン自動化。** RoboSyncログ→RLDS/LeRobot形式への自動変換、Fine-Tuning→評価→再デプロイの自動化。現在手動です。Azure ML Pipelinesとの統合を期待しています。

**P2: モデル管理・配信基盤。** サイト別・タスク別のモデルバージョン管理、A/Bテスト、ロールバック機能。Azure ML/MLOps基盤の活用を考えています。

**P3: シミュレーション連携。** Sim2Realのギャップ低減、合成データによるバリエーション拡張。Microsoft Simulation環境の活用を期待しています。

**P4: Responsible AI。** VLA推論の不確実性下での安全性保証、OSSモデルのライセンス管理。RAIフレームワークの適用支援を期待しています。

</details>

---

### S2-5. FY26実証ターゲットとマイルストーン（15分）

#### ターゲット①：彩都パーツセンター出庫作業（物流）

📷 `04-warehouse-flow.png`
> 倉庫オペレーション全体像。Inbound→Receiving→Storage→Picking→Sorting/Dispatch→Packaging→Shipping。自動化対象領域をStorage/PickingからInbound/Outboundへ拡大。

**作業フロー：**

```
納品書スキャン → ビン到着（オートストア） → ピック → 個装 → 台車配置
```

- 1オーダー1-3分、12万品番
- ビン内は段ボール＋プチプチ＋多種多様なパーツが混在
- 「箱物だけ」のシンプルケースはほぼ存在しない → **VLAが初手から不可欠**

#### ターゲット②：神戸工場 Let's Note組立（製造）

📷 `03-internal-cases.png`（再掲 — 神戸工場ラベル貼付工程）

- Let's Note組立ラインの一部工程（ラベル貼付、キッティング等）
- RoboSync既存導入済み → VLAスキル追加による高度化が狙い
- 製造ラインでのVLA適用事例として位置付け

#### リリース計画（彩都メイン）

| | α版（9月） | β版（3月） |
|---|---|---|
| **スコープ** | ピック→作業台配置（単腕） | 出庫サイクル全体 |
| **制御** | VLA単体 | Agentic VLA / 双腕 |
| **DataOps** | ログ収集パイプライン稼働 | FT→再デプロイサイクル確認 |

#### Microsoft協業で加速したい領域

1. **DataOps基盤** — Azure ML Pipelinesによるパイプライン自動化
2. **シミュレーション** — バリエーション拡張、Sim2Real検証
3. **Responsible AI** — 商用化に向けた安全性保証フレームワーク

<details><summary>📝 台本（15分）</summary>

FY26の実証ターゲットです。

メインは**彩都パーツセンターの出庫作業**（物流）です。作業フローは、納品書スキャン→オートストアからビンが来る→ビンの中からパーツを取り出す→個装して台車に配置。1オーダー1-3分。12万品番を扱っています。

動画分析の結果、ビンの中は段ボール＋プチプチ＋多種多様なパーツが混在していて、「箱物だけ」のシンプルケースはほぼ存在しません。形状、包装、姿勢すべてが毎回違う。**VLAが最初のステップから不可欠**です。

もう一つ、**神戸工場のLet's Note組立ライン**（製造）もターゲットです。RoboSyncは既に導入済みで、ここにVLAスキルを追加することで高度化を狙います。製造ラインでのVLA適用事例としての位置付けです。

リリース計画です。**α版（9月）**では「ピック→作業台配置」に絞ります。**β版（3月）**では出庫サイクル全体をAgentic制御で動作させます。

Microsoftとの協業で特に加速したいのは、DataOps基盤とシミュレーション連携です。現場から上がってくるデータの自動処理→学習→再デプロイのサイクルを、Azure MLベースで自動化したいと考えています。

</details>

---

## 画像配置マップ

| ファイル名 | 配置先 | 内容 |
|-----------|--------|------|
| `01-robosync-launch.png` | S1-1 冒頭 | 新製品記者発表、RoboSync/SIサービス概要 |
| `02-robosync-features.png` | S1-1 / S2-1（再掲） | Robo Sync 3特長（マルチロボ/VP/テンプレ） |
| `03-internal-cases.png` | S1-1 / S2-5（再掲） | 社内6拠点導入事例 |
| `04-warehouse-flow.png` | S2-5 | 倉庫オペレーション全体像 |
| `05-scm-challenges.png` | S1-1 | SCM現場の課題 × Embodied AI |
| `06-embodied-ai-trend.png` | S1-2 | ChatGPT→VLA進化、差別化は現場データ |
| `07-vla-model.png` | S1-2 | VLA概念図、データ不足課題 |
| `08-evolving-autonomy.png` | S1-3 | RoboSyncの進化方向（Evolving Autonomy） |
| `09-data-strategy.png` | S2-3 | データ3層ピラミッド→RFM→Robo Sync |
| `10-data-strategy-alt.png` | （予備） | 09の別バージョン（スライド番号違い） |

---

## Confluenceへのペースト手順

1. 新規ページ作成
2. Markdownをそのままペースト（Confluenceが自動変換）
3. 各 `📷` の箇所に画像をドラッグ&ドロップ
4. 各 `<details>` の箇所で `/expand` マクロを挿入し、台本テキストを移動
5. 動画プレースホルダー（📷 ※konuki選定）の箇所に動画を埋め込み
