# Microsoft協業プロジェクト 整理サマリー

*2026年2月12日時点*

---

## 1. プロジェクト概要

| 項目 | 内容 |
|------|------|
| **プロジェクト名** | Panasonic Robotics Platform on Azure |
| **契約形態** | CWAA（Cloud Workload Acceleration Agreement） |
| **Azure DevOps ID** | 94707 |
| **Microsoft主担当** | 上野貴文、Muruganandam Devarajan |
| **パナソニック主担当** | 大坪紹二 |

### 技術目標（Technical Goals）

パナソニックのLeRobot学習プロセスをオンプレからAzureに移行し、**VLA（Vision-Language-Action）のエンドツーエンドMLワークフロー**を構築する。

**構築するもの:**
- **Data Ops**: Rosbag→LeRobotデータ変換、データ階層・命名規則の整備
- **ML Ops**: Azure MLとMLflowによるモデル管理、実験追跡、再現性確保
- **Validation Ops**: モデル評価パイプライン

### 使用予定のAzureサービス

| カテゴリ | サービス |
|---------|---------|
| ML基盤 | Azure Machine Learning |
| 開発環境 | Azure Virtual Machines |
| データ管理 | Azure Storage / OneLake |
| データパイプライン | Azure Data Factory / Microsoft Fabric |
| データ処理 | Azure Databricks |
| 生成AI | Azure OpenAI Service |
| エッジ連携 | Azure IoT Hub / Edge |
| コンテナ | Azure Kubernetes Service (AKS) |
| 開発ツール | GitHub Copilot |

### 使用予定のOSS

LeRobot, ROS/ROS2, RLDS, PyTorch, MLflow, Hugging Face, NVIDIA Isaac Sim/Lab など

---

## 2. 現在のフェーズと主要マイルストーン

```
[完了] Design Thinking Workshop → 結果報告（2/12 13:00）
  ↓
[予定] Responsible AI Workshop（2/16 13:00-14:00）
  ↓
[予定] Architecture Design Session (ADS)
  ↓
[予定] MVE開発 Sprint 0 開始（3/2）
```

---

## 3. Teamsでの議論トピック（時系列）

### 3.1 Architecture Design Session (ADS)

**内容:** プロジェクトの技術アーキテクチャを設計するセッション

**依頼事項:**
- 大坪さん → Microsoft: ADS参加者の詳細（氏名、役割、専門領域、メール）を依頼

**ステータス:** 準備中

---

### 3.2 Design Thinking Workshop

**内容:** プロジェクトのビジョン・要件を整理するワークショップ

**経緯:**
| 日付 | 内容 |
|------|------|
| 1/30 | 当初予定 → パナソニック都合でキャンセル |
| 候補日 | 2/4(水) 10:00, 2/5(木) 14:00 or 16:00 |
| 最終決定 | **2/12(木) 13:00-14:00** |

**補足:** 一部参加できないメンバーがいるため録画依頼あり

---

### 3.3 VLA Data Pipeline

**内容:** VLAのデータパイプライン設計

**共有資料:** `20260204_PCO_VLA_data_pipeline.pptx`（小栗さん作成）

**対応:** 小栗さんをTeamsチャンネルに追加済み

---

### 3.4 Technical & Consumption Estimation Questionnaire（技術・利用量見積もり質問票）

**内容:** Azure利用量を見積もるための質問票

**依頼元:** 上野さん（Microsoft）

**目的:** 
- コンピュート、シミュレーション、ストレージ、ネットワーク、MLOpsの要件見積もり
- ソリューションアーキテクチャ、コストモデル（ACR）、デプロイ計画の完成
- **ADS前にMicrosoftリーダーシップの承認を得るため**

**期限:** 2/9 正午

**やり取り:**

| 発言者 | 内容 |
|--------|------|
| Devarajan (MS) | 「まだ回答できる段階ではない。プロジェクト定義を先に確認すべきでは？」「トライアルと商用、どちらのフェーズの見積もり？」 |
| 上野 (MS) | 「**商用（本番）フェーズ**の見積もりが欲しい。概算でOK。」 |

**ステータス:** 回答待ち（パナソニック側の対応が必要）

---

### 3.5 Panasonic Development Team Structure（開発チーム体制）

**内容:** 3/2開始予定のSprint 0に向けた開発チームの編成

**Microsoft側からの要求:**

| 役割 | 人数 | 条件 |
|------|------|------|
| Software Engineers | 2名 | 開発フェーズで80%以上稼働 |
| Data Scientists | 2名 | 同上 |
| Robotics Engineers | 1名 | 同上 |
| Project Manager (兼PO) | 1名 | 同上 |

**やり取り:**

| 発言者 | 内容 |
|--------|------|
| 上野 (MS) | 「チーム編成の確認をお願いしたい」 |
| Devarajan (MS) | 「大坪さんと相談予定。リソース計算の根拠を共有してほしい」 |
| 上野 (MS) | 「現時点の見積もりはAzure基盤構築の議論に基づく。ADSでスコープが明確になれば詳細が見える。この人数でリーダーシップ承認を取る予定なので確認してほしい」 |

**ステータス:** パナソニック側で検討中

---

### 3.6 Project Description Document（プロジェクト記述書）

**内容:** プロジェクトの技術詳細とタイムラインを記述した契約付属文書

**経緯:**
- 大坪さんがドラフト版を共有
- 上野さんから「CWAA文書と同時にレビュー中と想定。**両方署名が必要**。レビュー優先してほしい」

**ステータス:** レビュー中

---

### 3.7 Responsible AI Workshop

**内容:** AI倫理に関するワークショップ（ADS前に必須）

**トピック:** 公平性、バイアス、AI透明性

**日程:** **2/16(月) 13:00-14:00**（1.5時間 → 1時間に短縮？）

**参加者:** プロジェクトメンバー（エンジニア含む）

---

## 4. パナソニック側のTODO（優先度順）

| # | TODO | 期限 | 備考 |
|---|------|------|------|
| 1 | **Technical & Consumption Estimation Questionnaire回答** | 2/9（期限超過） | 商用フェーズの概算でOK |
| 2 | **CWAA・Project Description文書のレビュー・署名** | ASAP | 両方署名しないとプロジェクト進行不可 |
| 3 | **開発チーム体制の確定** | Sprint 0開始前 | 6名体制（SW2, DS2, Robo1, PM1） |
| 4 | **ADS参加者リストの提出** | ADS前 | 氏名、役割、専門領域、メール |
| 5 | **Responsible AI Workshop参加** | 2/16 13:00 | プロジェクトメンバー全員 |

---

## 5. 登場人物

### Microsoft側

| 名前 | 役割（推定） |
|------|-------------|
| **上野貴文 (UENO TAKA)** | プロジェクトリード、主要な依頼・調整を担当 |
| **Muruganandam Devarajan** | チーム設立者、技術調整 |
| **Kenji Suzuki** | 契約窓口（CWAA文書の連絡先） |
| Hideo Yoshimi | （CC） |
| Sean Ma | （CC） |
| Mike Lanzetta | （CC） |
| Jun Kataoka | （CC） |
| Paige Liu | （CC） |
| Oshani De Silva | （CC） |

### パナソニック側

| 名前 | 役割（推定） |
|------|-------------|
| **大坪紹二 (Ohtsubo Shohji)** | プロジェクト責任者、Microsoft側とのメイン窓口 |
| **小栗滉貴 (OGURI KOKI)** | VLA Data Pipeline担当 |

---

## 6. 契約関連（CWAA）

### Cloud Workload Acceleration Agreement とは

Microsoftがパートナー企業のAzure移行を支援するプログラム。**費用は発生しない**（無償支援）が、以下の条件がある：

- 請求可能リソースや成果物の約束はない
- Project Description（技術詳細・タイムライン）への合意が必要
- 両社の署名が必要

### パナソニックが提供するもの（Customer Pre-Existing Work）

- **ロボット仕様・ノウハウ**: ハードウェア・ソフトウェアインターフェース
- **ドメイン専門知識**: モデル学習・デプロイ・評価の知見
- **既存実験資産**: サンプルコード、スクリプト、ファインチューニング済みモデル、データセット、評価結果

### パナソニックが共有するデータ

- **Rosbagデータ**: 画像、動画、センサー読み取り、テレメトリログ

---

## 7. 全体の流れと現状の課題

### 現在地

```
プロジェクト準備フェーズ
├─ ワークショップ: Design Thinking ✓ → Responsible AI（2/16）
├─ 契約文書: CWAA + PD → レビュー・署名待ち
├─ 技術見積もり: Questionnaire → 回答待ち
└─ チーム編成: 6名体制 → 確認待ち
```

### 課題

1. **見積もり回答の遅延**: 期限（2/9）を超過。商用フェーズの概算を早急に回答する必要あり
2. **契約文書の署名**: CWAA・PDの両方が署名されないとADSに進めない
3. **開発チームの確保**: 80%稼働で6名確保できるかの確認が必要
4. **スコープの曖昧さ**: Devarajanが指摘した「プロジェクト定義が先では」という懸念

---

*作成: 2026年2月12日*
