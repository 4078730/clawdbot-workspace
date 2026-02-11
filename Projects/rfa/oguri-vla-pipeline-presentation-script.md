# VLA Data Pipeline Presentation Script

*For Oguri-san's presentation at Microsoft meeting (Feb 12, 2026)*

---

## Opening（導入）

> **English:**
> I'd like to explain our VLA data pipeline architecture and data structure. This pipeline is designed to support the entire machine learning lifecycle—from data collection at the field to model training and deployment back to the robots.

> **日本語（参考）:**
> VLAデータパイプラインのアーキテクチャとデータ構成についてご説明します。このパイプラインは、現場でのデータ収集からモデル学習、ロボットへの再デプロイまで、MLライフサイクル全体をサポートするよう設計されています。

---

## 1. Overview of the Data Pipeline（パイプライン概要）

> **English:**
> Our data pipeline consists of three main stages:
> 
> **First**, data collection at the field. Robots running with Robo Sync—our robotics control platform—generate operational data including camera images, sensor readings, and action trajectories.
> 
> **Second**, data processing in the cloud. We convert the raw data—typically in Rosbag format—into LeRobot-compatible format for training. This includes data cleaning, normalization, and organization.
> 
> **Third**, model training and deployment. We train VLA models using the processed data and deploy the improved models back to the robots.

> **日本語（参考）:**
> データパイプラインは3つの主要ステージで構成されています：
> 
> **第1に**、現場でのデータ収集。ロボット制御プラットフォームRobo Sync上で動作するロボットが、カメラ画像、センサー読み取り、動作軌跡などの運用データを生成します。
> 
> **第2に**、クラウドでのデータ処理。Rosbag形式の生データを、学習用にLeRobot互換形式に変換します。データクレンジング、正規化、整理を含みます。
> 
> **第3に**、モデル学習とデプロイ。処理済みデータでVLAモデルを学習し、改善されたモデルをロボットに再デプロイします。

---

## 2. Data Collection（データ収集）

> **English:**
> At the field level, we collect three types of data:
> 
> **Success data**: Normal operation logs when the robot successfully completes tasks. This forms the baseline for training.
> 
> **Failure data**: Cases where the robot fails or encounters out-of-distribution situations. This is actually our most valuable data because it tells us where the model needs improvement.
> 
> **Recovery data**: Human interventions or VLA-assisted recovery actions. This teaches the model how to handle edge cases.
> 
> The key point is that data collection happens as a byproduct of normal operations—we don't need dedicated data collection facilities.

> **日本語（参考）:**
> 現場レベルでは、3種類のデータを収集します：
> 
> **成功データ**：ロボットがタスクを正常に完了した際の運用ログ。学習のベースラインとなります。
> 
> **失敗データ**：ロボットが失敗した、または分布外の状況に遭遇したケース。モデルのどこを改善すべきかを示すため、実は最も価値のあるデータです。
> 
> **リカバリーデータ**：人間の介入やVLA支援によるリカバリー動作。エッジケースへの対処方法をモデルに教えます。
> 
> 重要な点は、データ収集が通常運用の副産物として行われること—専用のデータ収集施設は不要です。

---

## 3. Data Structure（データ構成）

> **English:**
> We follow the Medallion Architecture for data organization:
> 
> **Bronze Layer**: Raw data directly from the field. This includes Rosbag files containing camera images, joint states, gripper positions, and timestamps. We store everything without filtering at this stage.
> 
> **Silver Layer**: Cleaned and standardized data. We convert Rosbag to LeRobot format, align timestamps, normalize coordinate systems, and filter out corrupted data. This layer is ready for training.
> 
> **Gold Layer**: Aggregated metrics and model artifacts. Training results, evaluation metrics, success rates, and deployed model versions are tracked here.

> **日本語（参考）:**
> データ整理にはメダリオンアーキテクチャを採用しています：
> 
> **Bronze層**：現場からの生データ。カメラ画像、関節状態、グリッパー位置、タイムスタンプを含むRosbagファイル。この段階ではフィルタリングせずすべて保存します。
> 
> **Silver層**：クレンジング・標準化済みデータ。RosbagからLeRobot形式への変換、タイムスタンプ整合、座標系正規化、破損データのフィルタリング。この層が学習に使用されます。
> 
> **Gold層**：集計メトリクスとモデル成果物。学習結果、評価指標、成功率、デプロイ済みモデルバージョンを追跡します。

---

## 4. Data Format: Rosbag to LeRobot（データ形式変換）

> **English:**
> Let me explain the data conversion process:
> 
> **Rosbag** is the standard format in ROS ecosystem. It contains timestamped messages from various robot topics—camera images, joint states, TF transforms, and so on.
> 
> **LeRobot format** is optimized for VLA training. It organizes data into episodes, where each episode represents one task execution. The format includes:
> - Observation: camera images (multiple views if available)
> - State: robot joint positions, gripper state
> - Action: commanded joint velocities or positions
> - Language instruction: the task description in natural language
> 
> Our pipeline automatically extracts relevant topics from Rosbag, aligns them by timestamp, and packages them into LeRobot episodes.

> **日本語（参考）:**
> データ変換プロセスについて説明します：
> 
> **Rosbag**はROSエコシステムの標準形式です。カメラ画像、関節状態、TF変換など、様々なロボットトピックからのタイムスタンプ付きメッセージを含みます。
> 
> **LeRobot形式**はVLA学習に最適化されています。データをエピソードに整理し、各エピソードは1つのタスク実行を表します。形式には以下が含まれます：
> - Observation：カメラ画像（複数視点がある場合は複数）
> - State：ロボット関節位置、グリッパー状態
> - Action：指令された関節速度または位置
> - Language instruction：自然言語でのタスク記述
> 
> パイプラインがRosbagから関連トピックを自動抽出し、タイムスタンプで整合させ、LeRobotエピソードにパッケージ化します。

---

## 5. Data Hierarchy and Naming Convention（データ階層と命名規則）

> **English:**
> We use a hierarchical structure for data organization:
> 
> ```
> /{environment}/{robot_type}/{task_type}/{date}/{episode_id}/
> ```
> 
> For example:
> ```
> /saito_warehouse/ur5/bin_picking/2026-02-10/episode_001/
> ```
> 
> Each episode folder contains:
> - `observation/`: camera images by timestamp
> - `state.parquet`: robot state time series
> - `action.parquet`: action command time series
> - `metadata.json`: episode metadata (task description, success/failure, duration)
> 
> This structure allows efficient filtering—for example, we can easily query all failed bin picking episodes from a specific robot type.

> **日本語（参考）:**
> データ整理には階層構造を使用します：
> 
> ```
> /{環境}/{ロボット種別}/{タスク種別}/{日付}/{エピソードID}/
> ```
> 
> 例：
> ```
> /saito_warehouse/ur5/bin_picking/2026-02-10/episode_001/
> ```
> 
> 各エピソードフォルダには以下が含まれます：
> - `observation/`：タイムスタンプ別カメラ画像
> - `state.parquet`：ロボット状態時系列
> - `action.parquet`：アクションコマンド時系列
> - `metadata.json`：エピソードメタデータ（タスク記述、成功/失敗、所要時間）
> 
> この構造により効率的なフィルタリングが可能—例えば、特定ロボット種別の失敗ビンピッキングエピソードを簡単に検索できます。

---

## 6. Integration with Azure（Azure連携）

> **English:**
> For the Azure integration, we envision the following:
> 
> **Data Ingestion**: Field data is uploaded to Azure Storage via secure connection. We plan to use Azure Data Factory for orchestrating the upload pipeline.
> 
> **Data Processing**: Rosbag-to-LeRobot conversion runs on Azure Databricks or Azure ML compute. This is where the Medallion Architecture is implemented.
> 
> **Model Training**: Azure Machine Learning handles the training pipeline. We use MLflow for experiment tracking and model versioning.
> 
> **Model Deployment**: Trained models are packaged and deployed back to edge devices via Azure IoT Hub.
> 
> This is the area where we'd like to collaborate with Microsoft to establish the best practices and reference architecture.

> **日本語（参考）:**
> Azure連携については以下を想定しています：
> 
> **データ取り込み**：現場データはセキュア接続でAzure Storageにアップロード。アップロードパイプラインのオーケストレーションにAzure Data Factoryを使用予定。
> 
> **データ処理**：Rosbag→LeRobot変換はAzure DatabricksまたはAzure MLコンピュートで実行。ここでメダリオンアーキテクチャを実装。
> 
> **モデル学習**：Azure Machine Learningが学習パイプラインを担当。MLflowで実験追跡とモデルバージョン管理。
> 
> **モデルデプロイ**：学習済みモデルをパッケージ化し、Azure IoT Hub経由でエッジデバイスに再デプロイ。
> 
> この領域でMicrosoftと協業し、ベストプラクティスとリファレンスアーキテクチャを確立したいと考えています。

---

## 7. Expected Data Volume（想定データ量）

> **English:**
> As a rough estimate for the initial phase:
> 
> | Item | Estimate |
> |------|----------|
> | Robots | 1-2 units initially, scaling to 10+ |
> | Episodes per day | ~100 per robot |
> | Data per episode | ~50-100 MB (images + states) |
> | Daily data volume | ~5-10 GB per robot |
> | Monthly storage | ~150-300 GB per robot |
> 
> These numbers will increase as we scale to more sites and robots. We expect the data volume to grow significantly once we move to production.

> **日本語（参考）:**
> 初期フェーズの概算として：
> 
> | 項目 | 見積もり |
> |------|----------|
> | ロボット数 | 初期1-2台、10台以上にスケール |
> | 1日あたりエピソード数 | ロボット1台あたり約100 |
> | エピソードあたりデータ量 | 約50-100 MB（画像+状態） |
> | 1日あたりデータ量 | ロボット1台あたり約5-10 GB |
> | 月間ストレージ | ロボット1台あたり約150-300 GB |
> 
> サイトとロボット数が増えるにつれてこれらの数字は増加します。本番移行後はデータ量が大幅に増加する見込みです。

---

## Closing（まとめ）

> **English:**
> To summarize, our VLA data pipeline is designed to:
> 1. Collect diverse data from field operations—including failures
> 2. Organize data using Medallion Architecture for efficient processing
> 3. Convert Rosbag to LeRobot format for VLA training
> 4. Integrate with Azure services for scalable ML operations
> 
> We're looking forward to working with Microsoft to refine this architecture and establish the best practices for robotics ML pipelines on Azure.
> 
> Any questions?

> **日本語（参考）:**
> まとめると、VLAデータパイプラインは以下を目的に設計されています：
> 1. 現場運用から多様なデータを収集—失敗を含む
> 2. 効率的な処理のためメダリオンアーキテクチャでデータを整理
> 3. VLA学習用にRosbagをLeRobot形式に変換
> 4. スケーラブルなML運用のためAzureサービスと連携
> 
> Microsoftと協力してこのアーキテクチャを洗練し、Azure上のロボティクスMLパイプラインのベストプラクティスを確立できることを楽しみにしています。
> 
> ご質問はありますか？

---

## Anticipated Questions（想定される質問）

### Q: What is LeRobot?
> LeRobot is an open-source framework from Hugging Face for training robot policies. It provides a standardized format for robotics datasets and pre-built training pipelines for various VLA architectures.

### Q: How do you handle data privacy/security?
> Operational data stays within our secured infrastructure. For Azure integration, we'll use private endpoints and encryption at rest and in transit. We can discuss specific security requirements during ADS.

### Q: What's the training compute requirement?
> For VLA models like ACT or Diffusion Policy, we typically need GPU instances with at least 40GB VRAM. Training time depends on dataset size—typically a few hours to a day for fine-tuning.

### Q: How do you label the data?
> Most labels are automatically generated from operation logs—success/failure status, task type, robot state. Language instructions can be templated or manually annotated for specific tasks.

---

*Created: 2026-02-12*
