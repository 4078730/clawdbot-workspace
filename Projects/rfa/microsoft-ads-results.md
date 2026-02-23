# Microsoft ADS Day 1/2 — 結果サマリー

> **日程:** 2026年2月19日（Day 1）・20日（Day 2）  
> **場所:** 品川  
> **参加者:** Panasonic（黄瀬、小栗、奥村、桑田、島本、大坪 他） / Microsoft（Mike Lanzetta、Sean Ma、Muruganandam、Oshani、片岡、Patrick、Paige 他）

---

## 1. セッション構成

| Day | テーマ | 内容 |
|-----|--------|------|
| **Day 1** | 「何をするか」 | プロジェクト概要、技術的課題、問題定義、成功基準、非機能要件、データレビュー |
| **Day 2** | 「どう実行するか」 | 技術詳細、スケジュール、チーム責任分担、ロボットデモ（品川オフィス） |

---

## 2. 合意事項

### 2.1 成功基準（DoD）— 必須ゴール

| # | ゴール |
|---|--------|
| 1 | Azure上にアーキテクチャ・プラットフォームを構築 |
| 2 | データ＆学習パイプラインのデプロイ・設定（Min viable data pipeline — LeRobot） |
| 3 | PanasonicデータによるGPUベースの学習デモ |
| 4 | ハイブリッド推論バリデーション（Azure remote policy inference） |
| 5 | エッジへのコンテナデプロイ + Azure remote inference operational |

### 2.2 ストレッチゴール

- 評価用シミュレーション環境の構築
- 安全制御評価手法の統合
- Human-in-the-Loopバリデーション・モデルモニタリング

### 2.3 スコープ外

- 新LLM/GenAI推論システム
- 本番SLOs / HA / ディザスタリカバリ
- 工場IT本番ネットワーク統合
- 大規模メタデータガバナンス
- 一部の高度なモニタリング機能

### 2.4 技術的優先事項とフェーズ分け

| 優先度 | 領域 | フェーズ |
|--------|------|---------|
| **P1** | DataOps（データパイプライン自動化） | **α版** |
| **P2** | パイプライン自動化（MLOps） | **α版** |
| **P3** | シミュレーション統合 | β版 |
| **P4** | Responsible AI | β版 |

### 2.5 役割分担

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

## 4. スケジュール

- **Sprint 0 開始:** 3月23日予定
- **構成:** 4スプリント
- スケジュールはリーダーシップのフィードバックで調整の可能性あり

---

## 5. 技術的議論のポイント

### 5.1 データパイプライン

- **現状:** データ収集→変換→学習→デプロイがすべて手動
- **データ形式:** Rosbag → **LeRobot（HF）** に正式移行
- **メダリオンアーキテクチャ採用:**
  - **Bronze** — 生データ（ノイズあり）
  - **Silver** — タイムスタンプ同期・メタデータ付き前処理済み
  - **Gold** — 学習用最終データ
- **課題:** カメラ・ロボットデータのタイム同期（ADS当日に初めて認識された重大課題）

### 5.2 サンプルデータ

- 204エピソード提供済み、タスクごとに成功率に差
- 成功判断は人間の観察ベース
- オペレーターばらつき・静的ラボ環境の限界を認識
- ロバスト性向上のためトレースポイントの多様性が必要

### 5.3 シミュレーション

- **評価用:** NVIDIA Isaac Lab等で事前評価（β版で必要）
- **合成データ生成:** 現段階では不要、将来フェーズ
- **忠実度:** 高忠実度は不要。モデルの改善/劣化を判定できる程度で十分
- **課題:** シェーバー等一部製品の3Dモデルが存在しない
- **NVIDIA協業:** データ拡張パイプラインで進行中。実データ準備でき次第連携

### 5.4 データプラットフォーム

- Microsoft Fabric / Snowflake等を検討中
- リージョン・サブスクリプション制限の解消が必要

### 5.5 Well-Architected方針

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
| 4 | **データ変換時のタイム同期** | カメラ・ロボットデータの時刻ずれ。信頼できる解決策なし |

---

## 7. Responsible AI Workshop（片岡さん資料）

### 7.1 Microsoft RAI 6原則

| 原則 | 内容 |
|------|------|
| Fairness | バイアス防止、定期評価、全個人への公平性 |
| Reliability & Safety | 広範なテスト・検証・継続的監視 |
| Privacy & Security | データ保護、必要最小限の収集、強力なセキュリティ |
| Inclusiveness | すべてのユーザーへのAI利用の利益・アクセス保証 |
| Transparency | AI決定を理解できる仕組み |
| Accountability | AI影響に関する明確なロール・責任定義 |

### 7.2 システム分類

**Existing（現状）:**
- オンプレGPU学習（スケーラビリティ限界）
- 手動実験追跡
- サイロ化されたデータストレージ

**Planned（計画）:**
- Azure ML GPU学習
- MLOps & 実験プラットフォーム（LeRobot/HF自動化）
- 自動データインジェスト（DataOps）
- シミュレーション＆評価ループ

### 7.3 利用分類

| 分類 | 内容 |
|------|------|
| **Intended（意図）** | クラウドGPUでVLA学習、シミュレーション評価、Fine-Tuning、データ標準化、物体変更時の迅速再学習 |
| **Misuse（誤用）** | 非互換ロボットへの誤モデルデプロイ、シミュレーションのみでの判断、パイプラインへの敵対的データ注入、不正アクセス |
| **Unsupported（非推奨）** | 未テストHWへのデプロイ、シミュレーション単独評価、再学習なしの環境横展開、HILなしの完全自律運用 |
| **Restricted（制限）** | 作業者の行動・感情モニタリング、雇用判断への利用、顔認識・個人識別 |
| **Sensitive（注意）** | 実環境でのロボット制御（誤動作リスク）、意図しない作業者データ収集（APPI準拠）、Sim-to-Realギャップ |

**重要な境界:** システムはオフライン学習＆シミュレーション評価専用。リアルタイム自律運用とPII処理は明示的にスコープ外。

### 7.4 ステークホルダー

6カテゴリ（エンドユーザー、評価対象者、監督チーム、システムオーナー、開発者、悪意ある利用者）を特定。R&Dエンジニアとプラットフォームエンジニアが6役割中4つに横断。

### 7.5 主要ベネフィット & リスク

**ベネフィット:** VLAデータ・ドメイン知見、TTM短縮、運用簡素化、スケーラブル基盤、SIerエコシステム拡大

**リスク:** プラットフォームロックイン、データプライバシー・GDPR、コスト超過、オペレータースキル劣化、SIer差別化喪失

### 7.6 緩和戦略の共通パターン

> **小さく始め、ルールベースから段階的に拡大し、透明性で信頼を構築する**

---

## 8. 最終TODO一覧

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
| 現場側の調整 | 一力さん → 彩都担当者へ |
| リーディングタスクの仕様設計確定 | 奥村さんと |
| Envisioning調整 | フィットジャーニーとのアライン |
| SD田村さん活動との連携 | NVIDIA Isaac Transfer, Dream |
| シミュレーション評価指標の定義 | — |
| データ拡張パイプライン（NVIDIA協業） | 実データ準備でき次第 |
| シミュレーションアセットのライセンス確認 | — |

### 🔵 奥村・黄瀬・小栗

| TODO | 備考 |
|------|------|
| スクラムマスター研修受講 | 少なくともアジャイル開発習得 |

### 🔵 風見さん

| TODO | 備考 |
|------|------|
| 現場側の調整（黄瀬から） | 一力さん → 彩都担当者へ |
| Envisioning調整 | フィットジャーニーとのアライン |
| SD田村さん活動との連携 | NVIDIA Isaac Transfer, Dream |

### 🔵 小栗

| TODO | 備考 |
|------|------|
| "Development Toolchain & Environment Readiness" への回答共有 | MS向け |
| Confluence・Jira・GitHubのセットアップ | — |
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

### 🔵 上野（MS）

| TODO | 備考 |
|------|------|
| プロダクトディスクリプション | — |
| 契約 | — |

### 📋 サマリーのフォローアップタスク（チーム全体）

| タスク |
|--------|
| データパイプラインの自動化・スケーラビリティ（手動スクリプト → Azure Batch移行計画） |
| VLAモデル向けデータフォーマット定義・文書化 |
| データ同期とバリデーションステップの実装 |
| データ変換パイプラインの改善（UR5e対応、RoboSync互換性） |
| 非機能要件の優先順位付け（α/β/リリース各フェーズ） |
| Azureサブスクリプションの確定・共有 |
| サンプルデータセットの追加提供（未処理・多様なデータ含む） |
| オペレーターメタデータの充実 |
| データプラットフォームの決定 |
| 学習・評価コードの共有 |
| プロジェクト管理ツールの選定 |
| シミュレーション環境のギャップ分析（3Dモデル有無） |

---

## 9. アーキテクチャ概要（確定）

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

---

## 10. Day 1/2 タイムテーブル

### Day 1（2/19）

| 時間 | トピック | 発表者 | 備考 |
|------|---------|--------|------|
| 10:00-10:20 | Welcome & Introductions | Hideo Yoshimi, Muruganandam, All | セッション目標、自己紹介 |
| 10:20-10:40 | **Project Overview** | Panasonic | プロジェクト概要・ビジネス課題 |
| 10:40-12:15 | **Current State, Challenges** | Panasonic | アーキテクチャ・ワークフロー・KPI含む技術的課題 |
| 12:15-13:15 | Lunch Break | — | — |
| 13:15-14:00 | Problem Statement / DoD / Out of scope | Muruganandam, All | 問題定義、成功基準、スコープ外 |
| 14:00-14:30 | Dependency Discussions | Sean Ma (Prep: Ayaka Hara) | 学習データ、シミュレーション環境、既存アセット、モデルデプロイ |
| 14:30-15:30 | **Non-functional Requirements & Prioritization** | Sean Ma (Prep: Ayaka Hara), Panasonic | コスト、性能、可用性、スケーラビリティ、可観測性、セキュリティ |
| 15:30-16:00 | Data Review | Jun Kataoka (Prep: Kosuke Fujimoto) | ボリューム、フォーマット、クレンジング、合成データ生成 |
| 16:00-16:15 | Short Break | — | — |
| 16:15-16:45 | Development Tool Chain & Environment | Mike Lanzetta, Sean Ma | 開発ツールチェーン・環境要件 |
| 16:45-17:15 | Simulation & Robotics Integration | Paige Liu, Oshani De Silva | シミュレーションツール、ロボティクスPF |
| 17:15-17:30 | Day 1 Wrap Up | Muruganandam | — |
| 18:00-20:00 | Dinner Party | — | — |

### Day 2（2/20）

| 時間 | トピック | 発表者 | 備考 |
|------|---------|--------|------|
| 10:00-10:10 | Recap of Day 1 & Objectives for Day 2 | Hideo Yoshimi, Muruganandam | Day 1振り返り、Day 2フォーカス設定 |
| 10:10-11:00 | Technical Spike Review & Outcomes | Jun Kataoka, Sean Ma, Mike Lanzetta | 進捗レビュー、議論結果 |
| 11:00-12:00 | **Proposed Architecture** | Sean Ma | アーキテクチャ提案 |
| 12:00-13:00 | Lunch Break | — | — |
| 13:00-13:30 | Engagement Schedule & CWAA/PD Status | Hideo Yoshimi, Muruganandam | 全体スケジュール |
| 13:30-13:45 | **Team, Roles & Responsibilities** | Microsoft, Panasonic | チーム・役割・責任確認 |
| 13:45-14:45 | Scrum Overview & Sprint Plan | Ayaka Hara, Jun Kataoka, Sean Ma, Mike Lanzetta | スクラム研修、リスク・緩和策特定（開始日TBD） |
| 14:45-15:00 | Break | — | — |
| 15:00-15:30 | Responsible AI | Jun Kataoka | RAI Workshop結果発表 |
| 15:30-16:15 | **Robot Demo** | Panasonic | ロボット実機デモ |
| 16:15-16:30 | Break | — | — |
| 16:30-16:45 | Communication Tools & Working Agreement | Ayaka Hara | コミュニケーションツール・作業合意 |
| 16:45-17:00 | **Production Roadmap & Gaps to Production** | Panasonic | 本番化ロードマップ、MSの支援ポイント |
| 17:00-17:15 | Open Questions, Retrospective & Feedback | All | 未解決トピック、改善点 |
| 17:15-17:30 | Closing Remarks & Next Steps | Hideo Yoshimi, Muruganandam, Shohji Ohtsubo | まとめ、フォローアップ確認 |

---

## 11. プラットフォーム要件定義（vla-platform-requirements.md）

> ADS Day 2で整理された要件仕様。`vla-platform-requirements.md` のスクリーンショットから転記。

### FR-1 Data Collection & Ingestion

| ID | 要件 | 分類 |
|----|------|------|
| FR-1.1 | Panasonicロボットデータ（Teleoperation, Rule-based, Human Action等）をEdge→Azure Bronzeゾーンに自動インジェスト。**自動インジェストは現フェーズではスコープ外だが、異なるデータソースに対応するwell-definedなフォルダ/タグ構造のサポートが必要** | Mandatory（構造部分） |
| FR-1.2 | Isaac Simからの合成データのBronzeゾーンへのインジェスト | **Out of scope** |
| FR-1.3 | Vision-Language-onlyデータ（Human Video / On-site Documents / Web Data）のインジェストと差別化管理。VLAデータとは別管理 | See FR-1.1 |
| FR-1.4 | 全BronzeデータにWhat/How/Whereメタデータ記録（データ型、収集方法、ソース場所/エンボディメント） | See FR-1.1 |
| FR-1.5 | Azure上でのE2Eデータパイプライン（トリガー、コンピュート、ストレージ、ロギング）＋障害箇所特定 | **Mandatory** |
| FR-1.6 | RoboSyncクローズドループ: RoboSync Logs → Data Conversion → Training → Evaluation → Redeployment（手動or半自動） | **Out of scope** |

### FR-2 Bronze → Silver Data Processing

| ID | 要件 | 分類 |
|----|------|------|
| FR-2.1 | Bronze生データ→構造化Silverデータ変換（Vision/Action/Language/Metadata明示分離） | **Mandatory** |
| FR-2.2 | マルチソースデータ前処理＋時刻同期（同期品質メトリクス: フレームギャップ、ドリフト） | **Mandatory** |
| FR-2.3 | Silverレイヤーのスキーマバリデーション。スキーマ・同期要件を満たさないデータはinvalid扱い、Gold進入をブロック | **Mandatory** |
| FR-2.4 | Bronzeデータのタイプ宣言・分類（Teleoperation / Cross-Embodiment / Human Action / Rule-based / Simulation / VL-only）→正しい処理パスへルーティング | **Mandatory** |

### FR-3 Silver → Gold Data Curation

| ID | 要件 | 分類 |
|----|------|------|
| FR-3.1 | SilverデータのGold適格性ルールベース判定（スキーマ、同期品質、メタデータ完全性） | **Mandatory** |
| FR-3.2 | Goldデータセットの目的宣言（IL Training / RL Seeding / Evaluation） | **Mandatory** |
| FR-3.3 | GoldデータのRLDS / LeRobot学習互換形式への変換 | **Mandatory** |
| FR-3.4 | Vision-Language-onlyデータはVLA Goldに入れてはならない。Bronze/Silverに留め、Agent/言語Fine-Tuning専用 | **Mandatory** |
| FR-3.5 | Goldデータセットのバージョニング（マニフェスト生成＋フリーズ機能） | **Mandatory** |

### FR-4 Model Training

| ID | 要件 | 分類 |
|----|------|------|
| FR-4.1 | Azure ML上でGold-tierデータセットを使ったGPUベースImitation Learning (IL) 学習 | **Mandatory** |
| FR-4.2 | 少なくとも1つの顧客指定VLAモデルのE2E学習完遂 | **Mandatory** |
| FR-4.3 | パラメータ化された再現可能な学習パイプライン（同一データバージョン+設定で同一結果） | **Mandatory** |
| FR-4.4 | ILモデルをシードとしたReinforcement Learning (RL) 学習（Isaac Sim経由、Azure ML上） | **Mandatory** |

### FR-5 Model Management & Distribution

| ID | 要件 | 分類 |
|----|------|------|
| FR-5.1 | モデルバージョン管理（モデル↔データバージョン紐付け＋学習設定トレーサビリティ） | **Mandatory** |
| FR-5.2 | サイト別モデルパブリッシュ（サイト/生産ライン/ロボットタイプ別分離、監査可能なパブリッシュ記録） | **Mandatory** |
| FR-5.3 | VLA Model Registryへのモデル登録 | **Mandatory** |
| FR-5.4 | モデルコンテナイメージのビルド＆Azure Container Registry (ACR) へのプッシュ | **Mandatory** |
| FR-5.5 | A/Bテスト＋ロールバック機構（最低限、プロセスレベルのマルチバージョン共存・切替） | **Stretch** |

### FR-6 Evaluation & Simulation

| ID | 要件 | 分類 |
|----|------|------|
| FR-6.1 | スケルトンレベル評価パイプライン（Sanity Check）— 評価結果/レポート出力 | **Mandatory** |
| FR-6.2 | 安全制御評価手法（アクション境界チェック、故障モード記録） | **Mandatory** |
| FR-6.3 | Human-in-the-Loop (HIL) インターフェースプレースホルダー（アノテーション、確認、リプレイノード） | **Stretch** |
| FR-6.4 | シミュレーション環境での少なくとも1評価シナリオ実行（比較可能なメトリクス出力） | **Stretch** |
| FR-6.5 | シミュレーションからのバリデーションテレメトリ・動画収集→データパイプラインへのフィードバック | **Mandatory** |

### FR-7 Deployment

> ※スクリーンショットでは見出しのみ確認。詳細はDay 2録画アクセス後に補完予定。

---

### NFR-1 Scalability

| ID | 要件 |
|----|------|
| NFR-1.1 | **GPU Training Horizontal Scaling** — 並列学習ジョブ＋キューベーススケジューリング。GPUコンピュート追加にアーキ変更不要 |
| NFR-1.2 | **Data Volume Scaling (Bronze/Silver/Gold)** — 階層型ストレージで増分データ成長対応。各レイヤー独立スケール。新データ到着時の全再計算回避、増分処理＋append-onlyパターン推奨 |
| NFR-1.3 | **Multi-site Expansion** — namespace・パス規則・アクセスポリシーでサイト/生産ライン/ロボットタイプ別分離。新サイト追加は再現可能なオンボーディングプロセスで |

### NFR-2 Performance

| ID | 要件 |
|----|------|
| NFR-2.1 | **Training & Evaluation Cycle Performance** — E2Eサイクルタイム（インジェスト→変換→学習→評価）に注目。評価は並列化（データ分割、並行Sanity Check）対応。指標: 学習総時間（データ準備含む）、評価スループット（episodes/hour） |
| NFR-2.2 | **Inference Performance** — コンテナ化デプロイ後のEdge PCでの推論レイテンシ・スループットの最低基準定義。指標: p95推論レイテンシ、FPS or actions/second。Flywheelイテレーションごとに段階改善 |

### NFR-3〜5

> ※スクリーンショットでは部分的に確認（NFR-4 Observability → NFR-4.1 Logging 見出しあり）。詳細はDay 2録画アクセス後に補完予定。

### NFR-6 Data Governance

| ID | 要件 |
|----|------|
| NFR-6.1 | **Data Schema Management** — データ構造・メタデータ辞書の定義＋バージョン管理。スキーマ変更の追跡・後方互換管理。Bronze/Silver/Gold各レイヤーにスキーマ期待値定義 |
| NFR-6.2 | **Data Quality Gates** — Gold進入前の品質バリデーション: 時刻同期精度、モダリティ完全性、異常エピソード検出。品質ゲート結果はデータセットメタデータに記録 |
| NFR-6.3 | **Dataset Lifecycle Management** — バージョニング、フリーズ（学習公開後のイミュータビリティ）、リタイアメント。公開データセットはマニフェスト＋検証レポート生成必須 |
| NFR-6.4 | **Data Catalog** — Bronze/Silver/Gold全データセットを登録する集中検索可能カタログ。エントリ: データセット名、ティア、データ型（Teleoperation/Human Action/Rule-based/Simulation/VL-only）、スキーマバージョン、オーナー、作成日、サイズ、目的タグ。ストレージ直接検査なしでの発見可能性 |
| NFR-6.5 | **Data Lineage** — 生インジェスト→全変換→最終学習アーティファクトまでのE2Eデータリネージ追跡。記録: ソース（Edge/Isaac Sim/RoboSync）、Bronze ID、適用変換、Silver ID、Gold ID、消費した学習ラン。任意のモデルバージョンから元の生データ・変換・品質ゲート判定まで遡及可能（再現性・トレーサビリティのギャップ直接対応） |

### NFR-8 Operability & Maintainability

| ID | 要件 |
|----|------|
| NFR-8.1 | **CI/CD Coverage** — データパイプライン、学習環境イメージ、モデルパブリッシュ、Edgeデプロイスクリプトすべて自動CI/CDで配信。手動デプロイ（現在のペインポイント）の最小化 |
| NFR-8.2 | **Rollback Mechanisms** — モデルバージョンレベル＋コンテナデプロイレベルでのロールバック。手順の文書化・リハーサル必須 |
| NFR-8.3 | **Modular Design & Documentation** — モジュール境界の明確化。ドキュメントセット: アーキテクチャ文書、運用Runbook、データ規約ガイド、トラブルシューティングPlaybook |

---

## 12. バックログ（初期）

### Sprint 0前の準備タスク

- Bronze zone データタイプ宣言・分類仕様
- Silverデータスキーマ仕様＋バリデーションスパイク
- データ規約プロセス仕様＋パイプラインドキュメント
- シミュレーションスコープ・評価シナリオ明確化
- データガバナンス戦略仕様（カタログ、スキーマ管理、オーナーシップ）

### Sprint実装タスク

- Azureサブスクリプション・リソースプロビジョニング、アクセス制御セットアップ
- Cloud Defender スキャン（1st round）＋セキュリティプラン
- DevOps戦略定義（CI/CD: Data pipeline, Training pipeline, Evaluation pipeline）
- データパイプライン実装
- π0 Fine-tuning モデル学習パイプライン
- MLOpsパイプライン（オフライン評価含む）の実装＋π0モデルでのテスト
- Edgeデプロイ実装
- シミュレーションPF基盤セットアップ（Isaac Sim環境、Azure ML統合）
- CI/CDパイプラインスパイク実装
- データカタログ、バージョニング、オーナーシップ実装

---

*作成: 2026年2月24日 — ADS Day 1/2サマリー・RAI資料・最終TODO・vla-platform-requirements.mdスクリーンショットをもとに整理*  
*※ Day 2録画アクセス後にFR-7 Deployment詳細、NFR-3〜5、NFR-7、DoD詳細セクション、Appendix A（FR/NFR→Epic Traceability）を補完予定*
