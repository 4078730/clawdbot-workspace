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
| **Task Planning Hub**（LLM Agent） | 抽象指示→作業手順に自動分解 / スキル組み合わせ | DRIP（EMNLP 2025）、MTP / ViReSkill（ICRA 2026） |
| **Symbol Hub** | 言語→画像上の操作点（どこを掴む/置く）に変換 | KeypointVLA（RSJ 2025）、IndexVLA（ICRA 2026）、Gemini-ER |
| **Sensorimotor Hub**（VLA） | 視覚+言語+物理動作の統合制御 | π0 Fine-Tuning、~200 episodes/skill |
| **RoboSync + Data** | 安全な実行・データ収集・継続学習 | **VLA Skill Block（FY26最優先）**、MCP Agent |

#### 技術的差別化

- **言語指示の直接実行** — 複雑な事前プログラミング不要
- **未知環境への適応** — 学習パターン外でも自律判断
- **失敗からの自動学習** — 継続的性能向上

---

### S1-3. FY25実績とFY26方向性（6分）

#### FY25 主要成果

- ロボット制御PF経由のデータ収集→VLA学習→実動作の**完全サイクルを初めて実現**
- iREX2025で**Gemini-ER × π0による4スキル連続梱包デモ**を実現
- KeypointVLA/IndexVLA/DRIP/MTP/ViReSkillの要素技術確立 → EMNLP/RSJ/ICRA投稿
- MCPベースのLLM Agent × VLA × RoboSync統合アーキテクチャ整理
- Microsoft Responsible AI Workshop完了

#### RoboSyncの進化方向

📷 `08-evolving-autonomy.png`
> Before：登録済み物体の検出（Vision + Robosync）→ After：現場変化を理解し状況に応じて柔軟に自律作業（Language + Vision + Action + Robosync）。対象物体もBoxes/Bottles → 未登録品 → 複雑形状/リカバリーへ拡大。

#### FY26 目標：Robo Sync AI Suite

| マイルストーン | スコープ | 成功率目標 |
|--------------|---------|-----------|
| **α版（9月）** | VLAピックスキルがRoboSync上で動作。ビン内パーツのピック→作業台配置 | 90%（リトライ込95%） |
| **β版（3月）** | 出庫サイクル全体をAgentic制御で動作 | TBD |

**4つの柱：** ①RoboSync×VLA統合 ②DataOps ③Agent Operation ④Field PoC

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

- **VLA Policy：** π0ベース、200エピソード/90分で1スキル学習
- **KeypointVLA：** 高精度タスク向けKeypoint中間表現（成功率+40%）
- **HIL Interface：** 人間教示→継続学習データに利用

#### RoboSync統合 — 2つのルート

📷 `02-robosync-features.png`（再掲 — ビジュアルプログラミングのイメージ）

| ルート | 説明 | 優先度 |
|-------|------|-------|
| **① Agent経由** | MCP経由でRoboSyncに接続。完全自律化ルート | 中長期 |
| **② VLAスキルブロック** | GUI配置・組み合わせ。既存ブロックと同列に扱える | **FY26最優先** |

MCPを共通プロトコルとして、RoboSync / WMS / MES / Gemini-ERと疎結合に接続。

---

### S2-2. 保有技術の詳細と成果（20分）

#### ① ロボット制御PF統合パイプライン（FUK拠点）

- π0学習→実動作サイクルを実現。計3500エピソードの混合データセットで10種類の物体
- 未学習物体への汎化性を実証（スキンクリーム学習→コーンフレーク把持成功）
- **リトライ動作を教えていないのに自律的に獲得**

📷 ※動画素材があれば差替え（FUK拠点の実機映像）

#### ② VLA-Robot環境（Idea Forge）

- 双腕Aloha Stationary AI + SO-101の実験環境
- ACT / π0 / smolVLA等の比較評価
- CXC展示・iREXでの継続的デモ開発

#### ③ KeypointVLA → IndexVLA

- KeypointVLA：画像上の(x,y)座標で操作点指定。既存VLAの構造変更不要
- ACTモデルで**最大40%の成功率向上**（電池梱包 30%→70%）
- IndexVLA：**Point型**（ピック&プレース）/ **Trajectory型**（なぞり）/ **Vector型**（押し込み）

#### ④ MTP / ViReSkill

- **MTP：** 成功経験参照→新環境でのプランニング。Sim→Real転移
- **ViReSkill：** 失敗映像分析→自律計画修正。Lifelong Learning

#### ⑤ DRIP（Planning）

- Backward Reasoning — ゴール逆算でサブゴール分解
- Minecraft 3D仮想環境で複雑構造タスクの達成を実証。EMNLP 2025投稿済

#### ⑥ iREX2025統合デモ

- Gemini-ER × π0による多段タスクVLAデモ（シェーバー梱包）
- VLM判定→次ポリシー遷移 or リトライ/人間介入の分岐
- 現場PoCの**標準パターン**

📷 ※動画素材があれば差替え（iREXデモ映像）

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

---

### S2-5. FY26実証ターゲットとマイルストーン（15分）

#### ターゲット：彩都パーツセンター出庫作業

📷 `04-warehouse-flow.png`
> 倉庫オペレーション全体像。Inbound→Receiving→Storage→Picking→Sorting/Dispatch→Packaging→Shipping。自動化対象領域をStorage/PickingからInbound/Outboundへ拡大。

**作業フロー：**

```
納品書スキャン → ビン到着（オートストア） → ピック → 個装 → 台車配置
```

- 1オーダー1-3分、12万品番
- ビン内は段ボール＋プチプチ＋多種多様なパーツが混在
- 「箱物だけ」のシンプルケースはほぼ存在しない → **VLAが初手から不可欠**

#### リリース計画

| | α版（9月） | β版（3月） |
|---|---|---|
| **スコープ** | ピック→作業台配置（単腕） | 出庫サイクル全体 |
| **制御** | VLA単体 | Agentic VLA / 双腕 |
| **成功率** | 90%（リトライ込95%） | TBD |
| **DataOps** | ログ収集パイプライン稼働 | FT→再デプロイサイクル確認 |

#### Microsoft協業で加速したい領域

1. **DataOps基盤** — Azure ML Pipelinesによるパイプライン自動化
2. **シミュレーション** — バリエーション拡張、Sim2Real検証
3. **Responsible AI** — 商用化に向けた安全性保証フレームワーク

---

## 画像配置マップ

| ファイル名 | 配置先 | 内容 |
|-----------|--------|------|
| `01-robosync-launch.png` | S1-1 冒頭 | 新製品記者発表、RoboSync/SIサービス概要 |
| `02-robosync-features.png` | S1-1 / S2-1（再掲） | Robo Sync 3特長（マルチロボ/VP/テンプレ） |
| `03-internal-cases.png` | S1-1 | 社内6拠点導入事例 |
| `04-warehouse-flow.png` | S2-5 | 倉庫オペレーション全体像 |
| `05-scm-challenges.png` | S1-1 | SCM現場の課題 × Embodied AI |
| `06-embodied-ai-trend.png` | S1-2 | ChatGPT→VLA進化、差別化は現場データ |
| `07-vla-model.png` | S1-2 | VLA概念図、データ不足課題 |
| `08-evolving-autonomy.png` | S1-3 | RoboSyncの進化方向（Evolving Autonomy） |
| `09-data-strategy.png` | S2-3 | データ3層ピラミッド→RFM→Robo Sync |
| `10-data-strategy-alt.png` | （予備） | 09の別バージョン（スライド番号違い） |
