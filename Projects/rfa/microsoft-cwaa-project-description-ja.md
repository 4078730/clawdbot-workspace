# クラウドワークロード加速契約（CWAA）プロジェクト概要書（日本語訳）

> **原文:** CWAA23 Project Description — Panasonic Robotics Platform on Azure  
> **翻訳日:** 2026-03-04  
> **注意:** 本文書は参考訳です。契約上の効力は英語原文が優先します。

---

## クラウドワークロード加速契約（CWAA）プロジェクト概要書

**ID：** CWAA23

本プロジェクト概要書は、下記に示すマイクロソフト クラウドワークロード加速契約（以下「本契約」）に基づく補足文書であり、本契約の条項はここに参照により組み込まれます。大文字で表記されているが本書で定義されていない用語は、本契約における定義に従います。署名者は、本契約、本プロジェクト概要書、および該当する別紙・付属書の条項に拘束されることに同意するものとします。

本プロジェクト概要書は、プロジェクトの技術的詳細および概算スケジュールを記述します。両者は、本プロジェクト概要書が、本書の範囲外の課金対象リソースその他のリソースコミットメントまたは成果物（あるいは本契約の条項に優越する関連義務）を対象としないこと、および本プロジェクト概要書に想定される業務に対して報酬は発生しないことに合意します。

---

## プロジェクト名

**Panasonic Robotics Platform on Azure**

---

## 契約情報

〔CWAA の契約番号・タイトル・発効日を記入〕

---

## プロジェクト期間

- **開始：**〔開始日を記入〕
- **終了：**〔終了日を記入〕またはプロジェクト完了のいずれか遅い日

---

## Azure DevOps ID（Microsoft 社内 ID）

**94707**

---

## 技術的目標

### ワークストリーム 1：エンドツーエンドの Vision-Language-Action（VLA）機械学習ワークフロー開発

Azure 上でロボティクスプラットフォームを構築し、データ取り込みからエッジデプロイまでのエンドツーエンド VLA 機械学習ワークフローを実現します。

本ソリューションは以下を提供します：
- Azure 上の DataOps・MLOps・Validation Ops パイプライン
- Rosbag → LeRobot データ変換と明確な階層・命名規則による構造化データ整理
- 効率的なカタログ化・検索のためのメタデータ戦略
- データ・モデル管理、評価、実験追跡、再現性のための MLflow および Azure ML との統合

#### 必須目標（Mandatory Goals）

- エンドツーエンドの Azure ML アーキテクチャが稼働していること
- データパイプラインが取り込みから LeRobot 互換のゴールデントレーニングデータまでをサポートし、タスク別・オペレーター別品質管理のための適切なメタデータが付与されていること
- Azure ベースの GPU 計算サーバー上でモデルをトレーニングできる AzureML トレーニングループが構築され、より効率的な実験・反復を可能にする十分な制御が実装されていること
- モデルが Azure Container Registry に登録され、エッジへのモデルデプロイが可能な状態であること

#### 拡張目標（Stretch Goals）

- ML パイプラインに自動評価メカニズムが確立され、顧客定義の評価への道筋が開かれていること
- パイプライン内で Human-in-the-Loop フィードバックがサポートされ、人間中心の品質ゲートの仕組みが確立されていること
- エッジデプロイされたモデルがクラウドから監視可能であり、ロボティクスプラットフォームのシングルペインオブグラスが実現されていること

---

### ワークストリーム 2：Isaac Sim・Isaac Lab 等を活用した合成データ生成と VLA モデル評価

Azure 接続インフラ上に NVIDIA Isaac Sim シミュレーション環境を構築し、エッジデプロイ前のモデル安定性とポリシー性能評価に特化した合成データ生成と VLA モデル評価を実現します。

シミュレーションシーンは USD ファイルの入手可能性に応じて以下の2つのアセットパスのいずれかを採用します：
- 本番環境の UR5e ロボットおよび選定グリッパーの複製
- 入手可能なオープン USD アセットを使用した代替ロボット・グリッパー構成

どちらの場合も、パイプライン、評価手法、Azure ML との統合は同一です。主要な成果物は、使用する物理ハードウェアにかかわらずその有用性を実証する、検証済みのシミュレーション→トレーニングワークフローです。

本ワークストリームはグリッパー選定の確定・USD アセットの入手可能性・テレオペレーションデータまたはシミュレーション環境での逆運動学（IK）等によるデータ生成へのアクセスに依存します。詳細はフォローアップセッションで解決します。

#### 拡張目標（Stretch Goals）

- Isaac Sim シミュレーション環境が稼働し、Azure ML プラットフォームに接続されていること
- 適切な Azure GPU インフラ上に NVIDIA Isaac Sim（Isaac Lab 含む）がインストール・検証済みであること
- 顧客提供の USD アセットまたは入手可能なオープン USD を使用して、ロボットアームとグリッパーが Isaac Lab にインポート・設定されていること
- ポリシー評価とデータ生成に十分な代表的マニピュレーションシーンが構築されていること
- シミュレーションベースのモデル評価パイプラインが稼働し、Azure ML プラットフォームと統合されていること
- 評価実行が Azure ML レジストリのモデルバージョンにリンクされ、トレーニング反復間の再現性と比較が可能であること
- 合成データ生成パスウェイが確立され、Azure DataOps パイプラインにフィードされていること
- シミュレーションで少なくとも1つのデータ生成アプローチが検証され、トレーニングパイプラインと互換性のある形式でエピソードが生成されること
- 生成されたエピソードに実世界データと区別するためのプロバナンスメタデータが付与され、ダウンストリームの品質管理をサポートすること

---

> プロジェクト中、技術リソースにセンシティブとみなされる AI システムの使用が含まれる場合、Microsoft は Microsoft の責任ある AI 原則に基づいて社内レビューを実施し、必要な推奨事項を顧客に提示します。Microsoft の責任ある AI 原則の詳細は https://aka.ms/RAI を参照してください。

---

## Microsoft 既存成果物（Microsoft Pre-Existing Work）

プロジェクトに必要となりうる Microsoft の既存成果物（以下を含むがこれに限らない）：

- **Azure Robotics Accelerator** — ロボティクスクラウド基盤構築のためのリファレンスアーキテクチャおよびベストプラクティス

- **Microsoft Azure サービス：**
  - Azure Machine Learning（モデルトレーニングおよび評価パイプライン）
  - Azure Virtual Machines（シミュレーションおよび開発環境）
  - Azure Storage / OneLake（データ管理・共有）
  - Azure Data Factory / Microsoft Fabric Data Factory（データパイプライン）
  - Azure Databricks（データ処理・分析）
  - Azure OpenAI Service（自然言語処理・生成 AI）
  - Azure IoT Hub / Edge（ロボットとクラウドの接続）
  - Azure Kubernetes Service（AKS）（コンテナオーケストレーション）
  - GitHub Copilot（コーディング IDE ツール）

---

## ⚠️ 顧客既存成果物（Customer Pre-Existing Work）【修正案】

プロジェクトに必要となりうる顧客の既存成果物（以下を含むがこれに限らない）：

**VLA研究コンセプトおよび知的財産**
本エンゲージメント以前に Panasonic が開発した VLA モデルに関するアイデア、コンセプト、アーキテクチャの枠組み、および予備的研究知見。IndexVLA および Symbol Hub に関連するものを含み、理論的アプローチ、モデル設計コンセプト、および先行研究活動を通じて蓄積された実験的知見を包含する。

**RoboSync プラットフォーム**
本エンゲージメント以前に開発された、ロボットスキル管理・オーケストレーションのための既存 RoboSync プラットフォームのアーキテクチャ、機能仕様、およびデプロイフレームワーク。

**ロボティクスハードウェア仕様および統合ノウハウ**
本エンゲージメント以前に開発・蓄積された、UR5e を含むマニピュレーターのロボットハードウェア仕様、ソフトウェアインターフェース設計、およびシステム統合知識。

**テレオペレーションシステム設計およびデータ収集方法論**
本エンゲージメント以前に開発された、テレオペレーションによるロボットデータ収集のためのコンセプト・設計・方法論。GELLO ベースのリーダーフォロワーハードウェア構成の設計およびデータ収集プロトコルを含む。

**既存の運用データセット**
本エンゲージメント以前に収集されたロボット操作データセット。RosBag2、LeRobot、RLDS 形式のデータ、および関連するメタデータ、品質管理基準、評価結果を含む。

**ドメイン専門知識およびタスク知識**
操作タスク設計（ビンピッキング、キッティング、配置等）の仕様・評価基準、および彩都パーツセンター等の顧客施設での現場試験を通じて本エンゲージメント以前に蓄積された実証ノウハウ。

**既存の実験アセット**
本エンゲージメント以前に実施されたロボティクス試験からのサンプルコード、スクリプト、パイプライン設定、ファインチューニング済みモデル、モデルウェイト、評価レポート、ベンチマーク結果。

---

## オープンソース・サードパーティコード

プロジェクトに必要となりうる OSS およびサードパーティソフトウェア・コード（以下を含むがこれに限らない）：

LeRobot / ROS / ROS2 / RLDS / Python OSS ライブラリ（NumPy、OpenCV、SciPy、Scikit-Learn）/ PyTorch / MLflow / Azure SDK / Hugging Face（Transformers、Datasets）/ Aloha Sim / GitHub / Docker Containers / NVIDIA Isaac Sim / Isaac Lab

---

## データ

プロジェクト中に Microsoft と共有が見込まれる顧客データ（以下を含むがこれに限らない）：

- **運用データセット** — 画像、動画、センサー読み取り値、テレメトリログ等の各種入力モダリティから収集された RosBag2 データ（モデルトレーニングおよび評価に使用）

> ⚠️ **【要追記】** LeRobot 形式・RLDS 形式のデータも対象に含める必要があります。

---

## 連絡先

| | Microsoft | 顧客（Panasonic Connect） |
|---|---|---|
| 名称 | Microsoft Corporation | Panasonic Connect |
| 住所 | One Microsoft Way, Redmond, WA 98052 USA | 〒812-8531 福岡市博多区美野島4-1-62 |
| 担当者 | Kenji Suzuki | 〔要記入〕 |
| 電話 | +81 (3) 4535 5249 | 〔要記入〕 |
| メール | kenji.suzuki@microsoft.com | 〔要記入〕 |
| 発効日 | 〔要記入〕 | — |

---

---

## 修正案（英語原文）：Customer Pre-Existing Work

> この英語版をMuruさんへの返答・修正依頼として使用する

Customer Pre-Existing Work that may be required for the Project, including but not limited to:

**VLA Research Concepts and Intellectual Property**
Ideas, concepts, architectural frameworks, and preliminary research findings related to Panasonic's vision-language-action model development prior to this engagement, including those associated with IndexVLA and Symbol Hub, encompassing theoretical approaches, model design concepts, and experimental insights accumulated through prior research activities.

**RoboSync Platform**
The existing RoboSync platform architecture, functional specifications, and deployment framework for robot skill management and orchestration, developed prior to this engagement.

**Robotics Hardware Specifications and Integration Know-How**
Robot hardware specifications, software interface designs, and system integration knowledge for manipulators including the UR5e, developed and accumulated prior to this engagement.

**Teleoperation System Design and Data Collection Methodology**
Concepts, designs, and methodologies for teleoperation-based robot data collection developed prior to this engagement, including GELLO-based leader-follower hardware configurations and data collection protocols.

**Existing Operational Datasets**
Robot manipulation datasets collected prior to this engagement, including data in RosBag2, LeRobot, and RLDS formats, along with associated metadata, quality control criteria, and evaluation results.

**Domain Expertise and Task Knowledge**
Prior domain expertise in manipulation task design and evaluation criteria (e.g., bin picking, kitting, placement), and field validation knowledge accumulated through on-site trials at customer facilities including the Saito Parts Center, prior to this engagement.

**Existing Experiment Assets**
Prior experimental sample code, scripts, pipeline configurations, fine-tuned models, model weights, evaluation reports, and benchmark results from robotics trials conducted prior to this engagement.

---

*翻訳・修正案作成：黄瀬 / 2026-03-04*  
*レビュー要請：法務・知財部門（署名前に必須）*
