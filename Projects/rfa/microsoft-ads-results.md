# Microsoft ADS Day 1/2 — 結果サマリー

> **日程:** 2026年2月19日（Day 1）・20日（Day 2）  
> **場所:** 品川  
> **参加者:** Panasonic（黄瀬、小栗、奥村、桑田、島本、大坪 他） / Microsoft（Mike Lanzetta、Sean Ma、Muruganandam、Oshani、片岡、Patrick、Paige 他）  
> **ソース:** Day 1/2議事録サマリー、RAI Workshop資料（片岡）、vla-platform-requirements.md（スクリーンショット）、MS Day 2スライド、konuki最終TODO

---

# Part 1: 合意事項とスケジュール

## 1. 成功基準（DoD）

### 必須ゴール

| # | ゴール |
|---|--------|
| 1 | Azure上にアーキテクチャ・プラットフォームを構築 |
| 2 | データ＆学習パイプラインのデプロイ・設定（Min viable data pipeline — LeRobot） |
| 3 | PanasonicデータによるGPUベースの学習デモ |
| 4 | ハイブリッド推論バリデーション（Azure remote policy inference） |
| 5 | エッジへのコンテナデプロイ + Azure remote inference operational |

### ストレッチゴール

- 評価用シミュレーション環境の構築
- 安全制御評価手法の統合
- Human-in-the-Loopバリデーション・モデルモニタリング

### スコープ外

- 新LLM/GenAI推論システム
- 本番SLOs / HA / ディザスタリカバリ
- 工場IT本番ネットワーク統合
- 大規模メタデータガバナンス

---

## 2. 優先事項・役割分担

### 技術的優先事項とフェーズ分け

| 優先度 | 領域 | フェーズ |
|--------|------|---------|
| **P1** | DataOps（データパイプライン自動化） | **α版** |
| **P2** | パイプライン自動化（MLOps） | **α版** |
| **P3** | シミュレーション統合 | β版 |
| **P4** | Responsible AI | β版 |

### 役割分担

| 担当 | 責任領域 |
|------|---------|
| **Microsoft** | パイプライン開発・自動化、Azure基盤構築 |
| **Panasonic** | モデル改善・研究、ドメインデータ提供 |

---

## 3. チーム体制

| 役割 | メンバー |
|------|---------|
| PM | 島本 |
| Tech Lead（PCI） | 桑田 / 黄瀬 |
| Tech Lead（MS） | Mike Lanzetta / Sean Ma |
| DataOps（MS） | Muruganandam / Oshani |
| Simulation（MS） | Patrick / Paige |

**MS側の役割定義:**
- **データサイエンティスト** — データ準備、ファインチューニング、パイプライン評価
- **ソフトウェアエンジニア** — DevOps、コンテナ化、サービスプロビジョニング、CI/CD（Azure実務経験必須）

---

## 4. エンゲージメントスケジュール

### 全体フェーズ

```
2026: [Explore] → [ADS] → [Game Plan] → [Initial MVE / MVP ─────────────]
       1-2月      2月       3月          4月-8月
```

### 詳細スケジュール

| 期間 | 内容 |
|------|------|
| **3/2-3/14** | Game Plan Doc & Tech Spike |
| **3/4-3/6** | Value Stream Mapping（Ayaka Hara、3時間） |
| **3/12-3/13** | Customer Houston Visit |
| **3/16-3/17** | Customer Redmond Visit |
| **3/23-4/4** | MVP development（Sprint 0） |
| **4/6-4/18** | MVP development（Sprint 1） |
| **4/20-5/2** | MVP development（Sprint 2） |

### 予定セッション（Game Plan期間中）

| セッション | 担当（MS） |
|-----------|-----------|
| Simulation workstream discussions | Paige & Oshani |
| Scrum learning session | Ayaka Hara |
| Engineering fundamentals, HVE | Sean Ma |
| Azure ML and Foundry session schedule | Mike Lanzetta |

---

# Part 2: 技術詳細

## 5. アーキテクチャ

```
┌─────────────────────────────────────────────────────┐
│  Task Planning Hub（LLM Agent）                      │
│  タスク計画・分解・スキル選択・Re-Planning            │
├─────────────────────────────────────────────────────┤
│  Symbol Hub                                          │
│  言語↔物理の変換、VLM状態認識                         │
├─────────────────────────────────────────────────────┤
│  Sensorimotor Hub（VLA）                             │
│  π0ベース、~200episodes/skill                        │
├─────────────────────────────────────────────────────┤
│  Robo Sync + Data Platform                           │
│  安全実行・データ収集・継続学習                        │
│  Azure ML / LeRobot / Medallion Architecture          │
└─────────────────────────────────────────────────────┘
```

### Well-Architected方針

| 柱 | 注力ポイント |
|----|-------------|
| Reliability | データ変換のタイム同期 |
| Performance | ハイブリッド推論 |
| OpEx | DataOps / MLOps |
| Security | Identity / Secret / Audit |

---

## 6. 現状の課題（問題定義）

| # | 課題 | 詳細 |
|---|------|------|
| 1 | **手動プロセスとスケーラビリティ** | データ取込・変換・学習・評価がすべて手動。イテレーション遅延 |
| 2 | **MLライフサイクルの断片化** | メタデータ管理・実験追跡の標準化欠如。再現性・トレーサビリティ不足 |
| 3 | **セキュリティ・監査可能性のギャップ** | データアクセス・ID管理・シークレット管理・監査ログが未整備 |
| 4 | **データ変換時のタイム同期** | カメラ・ロボットデータの時刻ずれ。信頼できる解決策なし（ADS当日に初認識） |

---

## 7. 技術的議論のポイント

### データパイプライン

- **現状:** データ収集→変換→学習→デプロイがすべて手動
- **データ形式:** Rosbag → **LeRobot（HF）** に正式移行
- **メダリオンアーキテクチャ:**
  - **Bronze** — 生データ（ノイズあり）
  - **Silver** — タイムスタンプ同期・メタデータ付き前処理済み
  - **Gold** — 学習用最終データ

### サンプルデータ

- 204エピソード提供済み、タスクごとに成功率に差
- 成功判断は人間の観察ベース
- オペレーターばらつき・静的ラボ環境の限界を認識

### シミュレーション

- **評価用:** NVIDIA Isaac Lab等で事前評価（β版で必要）
- **合成データ生成:** 現段階では不要、将来フェーズ
- **忠実度:** 高忠実度は不要。モデルの改善/劣化を判定できる程度で十分
- **NVIDIA協業:** データ拡張パイプラインで進行中

### データプラットフォーム

- Microsoft Fabric / Snowflake等を検討中
- リージョン・サブスクリプション制限の解消が必要

---

## 8. プラットフォーム要件定義（vla-platform-requirements.md）

### 機能要件（FR）

#### FR-1 Data Collection & Ingestion

| ID | 要件 | 分類 |
|----|------|------|
| FR-1.1 | Panasonicロボットデータ（Teleoperation, Rule-based, Human Action等）をEdge→Azure Bronzeゾーンに取込。**自動インジェストは現フェーズではスコープ外だが、well-definedなフォルダ/タグ構造が必要** | Mandatory（構造部分） |
| FR-1.2 | Isaac Simからの合成データのBronzeゾーンへのインジェスト | **Out of scope** |
| FR-1.3 | VL-onlyデータ（Human Video / On-site Documents / Web Data）のインジェスト・差別化管理 | See FR-1.1 |
| FR-1.4 | 全BronzeデータにWhat/How/Whereメタデータ記録 | See FR-1.1 |
| FR-1.5 | Azure上でのE2Eデータパイプライン（トリガー、コンピュート、ストレージ、ロギング）＋障害箇所特定 | **Mandatory** |
| FR-1.6 | RoboSyncクローズドループ（Logs→変換→学習→評価→再デプロイ） | **Out of scope** |

#### FR-2 Bronze → Silver Data Processing

| ID | 要件 | 分類 |
|----|------|------|
| FR-2.1 | Bronze→Silver変換（Vision/Action/Language/Metadata明示分離） | **Mandatory** |
| FR-2.2 | マルチソース前処理＋時刻同期（フレームギャップ、ドリフトの品質メトリクス） | **Mandatory** |
| FR-2.3 | Silverスキーマバリデーション。不合格データはGold進入をブロック | **Mandatory** |
| FR-2.4 | Bronzeデータのタイプ分類→正しい処理パスへルーティング | **Mandatory** |

#### FR-3 Silver → Gold Data Curation

| ID | 要件 | 分類 |
|----|------|------|
| FR-3.1 | Gold適格性ルールベース判定（スキーマ、同期品質、メタデータ完全性） | **Mandatory** |
| FR-3.2 | Goldデータセットの目的宣言（IL Training / RL Seeding / Evaluation） | **Mandatory** |
| FR-3.3 | GoldデータのRLDS / LeRobot互換形式への変換 | **Mandatory** |
| FR-3.4 | VL-onlyデータはVLA Goldに入れない。Agent/言語Fine-Tuning専用 | **Mandatory** |
| FR-3.5 | Goldデータセットのバージョニング（マニフェスト＋フリーズ） | **Mandatory** |

#### FR-4 Model Training

| ID | 要件 | 分類 |
|----|------|------|
| FR-4.1 | Azure ML上でGold-tierデータによるGPUベースIL学習 | **Mandatory** |
| FR-4.2 | 少なくとも1つの顧客指定VLAモデルのE2E学習完遂 | **Mandatory** |
| FR-4.3 | パラメータ化された再現可能な学習パイプライン | **Mandatory** |
| FR-4.4 | ILモデルをシードとしたRL学習（Isaac Sim経由、Azure ML上） | **Mandatory** |

#### FR-5 Model Management & Distribution

| ID | 要件 | 分類 |
|----|------|------|
| FR-5.1 | モデルバージョン管理（データバージョン紐付け＋学習設定トレーサビリティ） | **Mandatory** |
| FR-5.2 | サイト別モデルパブリッシュ（監査可能なパブリッシュ記録） | **Mandatory** |
| FR-5.3 | VLA Model Registryへのモデル登録 | **Mandatory** |
| FR-5.4 | コンテナイメージのビルド＆ACRへのプッシュ | **Mandatory** |
| FR-5.5 | A/Bテスト＋ロールバック機構 | **Stretch** |

#### FR-6 Evaluation & Simulation

| ID | 要件 | 分類 |
|----|------|------|
| FR-6.1 | スケルトン評価パイプライン（Sanity Check） | **Mandatory** |
| FR-6.2 | 安全制御評価手法（アクション境界チェック、故障モード記録） | **Mandatory** |
| FR-6.3 | HILインターフェースプレースホルダー | **Stretch** |
| FR-6.4 | シミュレーション環境での評価シナリオ実行 | **Stretch** |
| FR-6.5 | シミュレーションからのバリデーションテレメトリ→データパイプラインへのフィードバック | **Mandatory** |

#### FR-7 Deployment

> ※スクリーンショットでは見出しのみ確認。Day 2録画アクセス後に補完予定。

### 非機能要件（NFR）

#### NFR-1 Scalability

| ID | 要件 |
|----|------|
| NFR-1.1 | **GPU Training Horizontal Scaling** — 並列学習ジョブ＋キューベーススケジューリング。アーキ変更なしでGPU追加可能 |
| NFR-1.2 | **Data Volume Scaling** — 階層型ストレージ、各レイヤー独立スケール、増分処理＋append-only推奨 |
| NFR-1.3 | **Multi-site Expansion** — namespace・パス規則でサイト/ライン/ロボット別分離。再現可能なオンボーディング |

#### NFR-2 Performance

| ID | 要件 |
|----|------|
| NFR-2.1 | **Training & Evaluation Cycle** — E2Eサイクルタイム重視。指標: 学習総時間、評価スループット（episodes/hour） |
| NFR-2.2 | **Inference Performance** — Edge PCでの推論基準。指標: p95レイテンシ、FPS/actions/second |

#### NFR-3〜5

> ※部分的に確認（NFR-4.1 Logging見出しあり）。Day 2録画アクセス後に補完予定。

#### NFR-6 Data Governance

| ID | 要件 |
|----|------|
| NFR-6.1 | **Data Schema Management** — スキーマ定義・バージョン管理・後方互換。B/S/G各レイヤーにスキーマ期待値 |
| NFR-6.2 | **Data Quality Gates** — Gold進入前バリデーション（時刻同期精度、モダリティ完全性、異常エピソード検出） |
| NFR-6.3 | **Dataset Lifecycle** — バージョニング、フリーズ（イミュータビリティ）、リタイアメント |
| NFR-6.4 | **Data Catalog** — 集中検索可能カタログ（名前、ティア、データ型、スキーマVer、オーナー、サイズ、目的タグ） |
| NFR-6.5 | **Data Lineage** — 生データ→全変換→学習アーティファクトまでのE2E追跡。任意モデルから生データまで遡及可能 |

#### NFR-8 Operability & Maintainability

| ID | 要件 |
|----|------|
| NFR-8.1 | **CI/CD Coverage** — パイプライン・学習環境・モデルパブリッシュ・Edgeデプロイすべて自動CI/CD |
| NFR-8.2 | **Rollback** — モデルバージョン＋コンテナレベル。手順の文書化・リハーサル必須 |
| NFR-8.3 | **Modular Design & Documentation** — アーキテクチャ文書、運用Runbook、データ規約ガイド、トラブルシューティングPlaybook |

---

# Part 3: アクション・リスク・バックログ

## 9. TODO一覧（担当者別）

### 🔴 全員

| TODO | 備考 |
|------|------|
| ヒューストンフライト・ホテル取得 | — |

### 🔵 黄瀬

| TODO | 備考 |
|------|------|
| UR5e環境の立ち上げ | — |
| システムアーキテクチャの整理 | 全員と |
| メンバーの追加アサイン | Zhuさん、黒川さん |
| 現場側の調整 | 一力さん → 彩都担当者へ（風見さん経由） |
| リーディングタスクの仕様設計確定 | 奥村さんと |
| Envisioning調整 | フィットジャーニーとのアライン（風見さん） |
| SD田村さん活動との連携 | NVIDIA Isaac Transfer, Dream（風見さん） |
| シミュレーション評価指標の定義 | — |
| データ拡張パイプライン（NVIDIA協業） | 実データ準備でき次第 |
| シミュレーションアセットのライセンス確認 | — |

### 🔵 奥村・黄瀬・小栗

| TODO | 備考 |
|------|------|
| スクラムマスター研修受講 | 少なくともアジャイル開発習得 |

### 🔵 小栗

| TODO | 備考 |
|------|------|
| "Development Toolchain & Environment Readiness" への回答共有 | MS向け |
| Confluence・Jira・GitHubのセットアップ | MSチームのオンボード含む |
| UR5e環境の立ち上げ | メンバーと |
| UR5e RAWデータ＆データ変換スクリプトのMS向け共有 | — |
| 旧ROSBAG RAWデータ＆データ変換スクリプトのMS向け共有 | — |
| 学習スクリプトのMS向け共有 | — |

### 🔵 奥村

| TODO | 備考 |
|------|------|
| UR5e Teleoperation実装・共有 | — |
| データ収集・ロールアウト実装 | — |
| UR5e ↔ Isaac Sim Teleoperation I/F開発 | シミュレーション内データ生成に必要 |
| Bronzeデータフォーマットの定義・文書化 | 桑田と |
| Robo Sync組み込み | 桑田と |

### 🔵 桑田

| TODO | 備考 |
|------|------|
| UR5eグリッパーUSDモデルの取得 | 若杉さんとの連携 |
| Bronzeデータフォーマットの定義・文書化 | 奥村と |
| Robo Sync組み込み | 奥村と |
| Robo Sync IK共有 | — |

### 🔵 大坪

| TODO | 備考 |
|------|------|
| AI倫理・プロダクトQMS 内部チェックポイントと参照 | — |
| データプラットフォーム選定の相談・決定 | Microsoft Fabric or Snowflake（安達・海藤・黒田さん） |
| Azureサブスクリプション準備・MSチームへの権限付与 | — |
| スクラム体制・マスターを決める | — |

### 🔵 島本

| TODO | 備考 |
|------|------|
| AI倫理・プロダクトQMS 内部チェックポイントと参照 | — |
| プロダクト化に関わる懸念点関連 | — |

### 🟣 Microsoft側

| 担当 | TODO |
|------|------|
| 上野 | プロダクトディスクリプション、契約（CWAA） |
| MS全般 | 承認済みエンゲージメントスケジュールの共有 |
| MS全般 | スパイクスプリント優先バックログの共有 |

---

## 10. リスク・オープンクエスチョン

| # | リスク | 状態 |
|---|--------|------|
| 1 | ~~LeRobotデータが学習に利用不可~~ → UR5eテレオペ生データで代替可能か？ | 解決方向あり |
| 2 | Robo Syncプラットフォームからのデータ形式が未確定 | 未解決 |
| 3 | Snowflakeのデータガバナンスツールが不明 | 未解決 |
| 4 | UR5eグリッパーUSDモデルが存在しない | 未解決 |
| 5 | UR5e ↔ Isaac Simテレオペインターフェースの開発が必要 | 未解決 |
| 6 | セキュリティ要件が未定義 | 未解決 |
| 7 | プロダクションロードマップが未策定 | 未解決 |

---

## 11. バックログ

### Sprint 0前の準備タスク（Game Plan期間: 3/2-3/21）

- Bronze zone データタイプ宣言・分類仕様
- Silverデータスキーマ仕様＋バリデーションスパイク
- データ規約プロセス仕様＋パイプラインドキュメント
- シミュレーションスコープ・評価シナリオ明確化
- データガバナンス戦略仕様（カタログ、スキーマ管理、オーナーシップ）

### Sprint実装タスク（3/23〜）

- Azureサブスクリプション・リソースプロビジョニング、アクセス制御セットアップ
- Cloud Defender スキャン（1st round）＋セキュリティプラン
- DevOps戦略定義（CI/CD: Data / Training / Evaluation pipeline）
- データパイプライン実装
- π0 Fine-tuning モデル学習パイプライン
- MLOpsパイプライン（オフライン評価含む）＋π0モデルでのテスト
- Edgeデプロイ実装
- シミュレーションPF基盤セットアップ（Isaac Sim、Azure ML統合）
- CI/CDパイプラインスパイク実装
- データカタログ、バージョニング、オーナーシップ実装

---

# Appendix

## A. Day 1/2 タイムテーブル

### Day 1（2/19）— 「何をするか」

| 時間 | トピック | 発表者 |
|------|---------|--------|
| 10:00-10:20 | Welcome & Introductions | Hideo Yoshimi, Muruganandam |
| 10:20-10:40 | Project Overview | Panasonic |
| 10:40-12:15 | Current State, Challenges | Panasonic |
| 13:15-14:00 | Problem Statement / DoD / Out of scope | Muruganandam, All |
| 14:00-14:30 | Dependency Discussions | Sean Ma |
| 14:30-15:30 | Non-functional Requirements & Prioritization | Sean Ma, Panasonic |
| 15:30-16:00 | Data Review | Jun Kataoka |
| 16:15-16:45 | Development Tool Chain & Environment | Mike Lanzetta, Sean Ma |
| 16:45-17:15 | Simulation & Robotics Integration | Paige Liu, Oshani De Silva |
| 17:15-17:30 | Day 1 Wrap Up | Muruganandam |

### Day 2（2/20）— 「どう実行するか」

| 時間 | トピック | 発表者 |
|------|---------|--------|
| 10:00-10:10 | Recap & Objectives for Day 2 | Hideo Yoshimi, Muruganandam |
| 10:10-11:00 | Technical Spike Review & Outcomes | Jun Kataoka, Sean Ma, Mike Lanzetta |
| 11:00-12:00 | Proposed Architecture | Sean Ma |
| 13:00-13:30 | Engagement Schedule & CWAA/PD Status | Hideo Yoshimi, Muruganandam |
| 13:30-13:45 | Team, Roles & Responsibilities | Microsoft, Panasonic |
| 13:45-14:45 | Scrum Overview & Sprint Plan | Ayaka Hara, Jun Kataoka, Sean Ma, Mike |
| 15:00-15:30 | Responsible AI | Jun Kataoka |
| 15:30-16:15 | Robot Demo | Panasonic |
| 16:30-16:45 | Communication Tools & Working Agreement | Ayaka Hara |
| 16:45-17:00 | Production Roadmap & Gaps to Production | Panasonic |
| 17:00-17:15 | Open Questions, Retrospective & Feedback | All |
| 17:15-17:30 | Closing Remarks & Next Steps | Hideo Yoshimi, Muruganandam, 大坪 |

---

## B. Responsible AI Workshop（片岡さん資料）

### Microsoft RAI 6原則

Fairness / Reliability & Safety / Privacy & Security / Inclusiveness / Transparency / Accountability

### 利用分類

| 分類 | 内容 |
|------|------|
| **Intended** | クラウドGPUでVLA学習、シミュレーション評価、Fine-Tuning、データ標準化 |
| **Misuse** | 非互換ロボットへの誤モデルデプロイ、シミュレーションのみでの判断、敵対的データ注入 |
| **Unsupported** | 未テストHWデプロイ、シミュレーション単独評価、HILなし完全自律運用 |
| **Restricted** | 作業者行動モニタリング、雇用判断、顔認識 |
| **Sensitive** | 実環境ロボット制御（誤動作リスク）、意図しない作業者データ収集（APPI） |

**重要な境界:** システムはオフライン学習＆シミュレーション評価専用。リアルタイム自律運用とPII処理はスコープ外。

### ステークホルダー

6カテゴリ特定（エンドユーザー、評価対象者、監督チーム、システムオーナー、開発者、悪意ある利用者）。R&D/PFエンジニアが4役割に横断。

### 主要リスクと緩和

**リスク:** PFロックイン、データプライバシー・GDPR、コスト超過、オペレータースキル劣化、SIer差別化喪失

**緩和パターン:** 小さく始め、ルールベースから段階的に拡大し、透明性で信頼を構築する

---

## C. Development Toolchain & Environment Readiness

> MSからPanasonicへの確認事項。**小栗さんが回答共有担当。**

### P0（最優先）

| # | 項目 | Panasonicへの確認事項 | 備考 |
|---|------|---------------------|------|
| 1 | Dev environment standard | 許可ツール、制限事項（plugins, WSL, Docker） | VSCode, C++, Python |
| 2 | Source control & repo hosting | Azure DevOps vs GitHub、リポ可視性、アクセス承認者 | GitHub Enterprise |
| 3 | Work tracking & backlog | ボードシステム（ADO Boards）、オーナー、優先順位付け方法 | — |
| 4 | Container build & registry | ACR、ネットワークアクセス、セキュリティスキャン | — |
| 5 | Azure subscriptions & GPU quota | クォータ申請者、リードタイム、リージョン制約 | — |
| 6 | Azure ML workspace + experiment tracking | AML/MLflowエンドポイント、ワークスペースオーナーシップ | — |
| 7 | Secrets & identities | Key Vault標準、IDプロバイダー、シークレット管理権限者 | — |
| 8 | Data access & movement | Blob構造/権限、データレジデンシー/保持要件 | — |

### P1-2（次優先）

| # | 項目 | Panasonicへの確認事項 |
|---|------|---------------------|
| 9 | Dependency security & OSS policy | 承認済みパッケージソース、スキャンツール、例外プロセス |
| 10 | CI/CD & release gates | CIシステム、必要ゲート、レビュアー |
| 11 | Simulation toolchain | ライセンス/アクセス、GPU要件、simアセット格納場所 |
| 12 | AI/HVE tools access | 許可AIツール、データ取扱い制約 |
| 13 | Responsible AI / safety governance | ガバナンスオーナー、必要文書、承認タイムライン |

---

*作成: 2026年2月24日*  
*※ Day 2録画アクセス後にFR-7 Deployment詳細、NFR-3〜5/NFR-7、DoD詳細、Appendix A（FR/NFR→Epic Traceability）を補完予定*
