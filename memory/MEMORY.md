# MEMORY.md - 長期記憶（昇格済み情報）

最後更新: 2026-03-02 (Night Maintenance)

---

## 🏢 プロジェクト基本情報

### RFA（Robotics Foundation Agent）概要

**ビジョン:** 人間の言語指示を理解し、物流・製造現場における属人的かつ複雑で柔軟な推論が求められるタスクをロボットが自律的に実行できる知能システムを実現する。

**FY26 位置づけ:** Phase 2（Robo Sync 現場 PoC とマルチドメイン展開）— 研究フェーズから現場PoC／事業検証フェーズへの転換

**中核技術スタック:**
1. Task Planning Hub（LLM Agent による計画・判断）
2. Symbol Hub（言語↔物理の接地、状態管理）
3. Sensorimotor Hub（VLA による動作生成）
4. Robo Sync（ロボット制御PF + データ基盤）

**差別化戦略:** Deploy-Time Scaling
- Robo Syncが既に事業化 → VLA追加で現場価値提供 + 並行してデータ蓄積
- BigTech の Training-Time Scaling（膨大なテレオペ施設投資）と対比
- 現場固有の失敗データ（OOD）が参入障壁になる

---

## 📍 ターゲット現場

### 1. 彩都パーツセンター（大阪府茨木市）

**基本情報:**
- 取扱品番: 12万品番
- 月間出荷: 3万点
- 施設規模: オートストア（2万ビン、AGV14台）
- 付加価値作業比率: 30%（業界トップ）

**RFA ターゲット:** 出庫作業（ピッキング）  
**キーパーソン:**
- 中田さん（プロジェクトマネージャ）
- 一力さん（現場チーム）

**実装の特徴:**
- プロパティ登録による専用ポート制作 → **段階的導入が可能** （難易度を段階的に上げられる）
- オートストア既導入 → インタフェース仕様確立済み
- 2026-02-03 彩都倉庫見学、2026-02-06 中田さんヒアリング完了

**関連ドキュメント:**
- `meeting-notes/2026-02-03-saito-warehouse-visit-report.md`
- `meeting-notes/2026-02-06-nakata-saito-hearing.md`
- `Projects/rfa/saito-poc-plan.md` — 実証計画（α/β/GA定義、動画分析反映、2026-02-16 DRAFT）

### 2. 神戸工場（パナソニック コネクト MSBD 部門）

**基本情報:**
- 対象: Let's Note 組立工程
- 作業内容: コネクタ挿入、ビス締結、ケーブル配索など

**RFA ターゲット:** 組立タスク（高精度位置決め系）  
**実装戦略:** 軌道制御系タスク（②-a コネクタ挿入、②-b ケーブル挿入）の横展開

---

## 📊 FY26 実証戦略（2軸設計）

### 短期軸（Q1-Q2）: RoboSync上へのVLAデプロイ実績

**目的:** VLAスキルをRoboSync GUI上で配置・実行可能な「スキルブロック」として正式化

**対象:** 彩都ピッキング①-a（箱物のみ）
- 難易度: 低
- VLA必須性: △〜○（RoboSync上で動作する実績を優先）
- エージェント自律性: 低（単一スキル実行）
- **出来事:** α版リリース（2026年9月末、成功率70%）

**テクニカルランドマーク:**
- VLA スキルブロック仕様 v1 合意
- Data Contract 定義完了
- PoC 対象タスク特定完了（神戸 or 彩都）

### 中長期軸（Q3-Q4 / FY27）: VLA事業価値証明

**目的:** VLA だけでなければ解決できない属人的タスクの実証

**対象:** 彩都ピッキング①-b～①-d
- ①-b: 多品種対応（形状・サイズ違い）
- ①-c: 上積み回避・ピック失敗リカバリー
- ①-d: フルエージェンティック（複数スキル切替、コンテナ操作）

**最終的な出来事:** β版リリース（2026年3月末、成功率90%、継続学習稼働）

**判断基準:**
| 軸 | 優先度 | 説明 |
|----|--------|------|
| RoboSync 事業接続 | 1（最優先） | VLA スキルをRoboSync上のプロダクトとしてデプロイ可能か |
| VLA 事業価値 | 2 | VLAで初めて解決できるペインが事業上で証明できるか |
| Agent 自律性 | 3（参考） | 複数スキル切替・再計画などの高度な自律判断が必要か（中長期価値） |

**重要:** 短期軸と中長期軸は**同一ターゲットの難易度グラデーション**として設計
→ 短期の投資が中長期成果に直接累積

---

## 🧠 理論的基盤

### 池内先生（Microsoft / 東大名誉教授）の ICF/PTG/STG フレームワーク

**用語:**
- **GMR（Grasp-Manipulation-Release）:** 把持→操作→解放の3フェーズで操作を分解するフレームワーク
- **PTG（Physical Task Group）:** 物理制約に基づくタスク分類（Detach/Picking, LinearClose等）
- **ICF（Interaction / Contact Form）:** 物体と環境の接触状態の分類
- **STG（Symbolic Task Graph）:** 記号的タスク図

**RFA への適用:**
- 彩都ピッキング: **PTG11（Detach/Picking）** — 形状・位置の多様性に対応
- 記号的表現（「重い」「fragile」）と物理的操作（把持位置・力）の接地に活用
- Task Planning Hub が生成するタスク分解に理論的根拠を与える

**関連資料:**
- `Projects/rfa/ikeuchi-discussion-summary.md` — 池内先生ディスカッション議事録（2026-02-03）

---

## 📈 データフライホイール・差別化構造

### Core Concept: Deploy-Time Scaling

**段階的自律化の3フェーズ:**

| フェーズ | 時期 | 主力 | リカバリー役 | 最終手段 | **データソース** |
|---------|------|------|-----------|---------|---------|
| Phase 1 | FY26-27 | Robo Sync（ルールベース） | VLA（失敗カバー） | 人介在 | ✅ 成功データ + 失敗回避データ + 人間リカバリーデータ |
| Phase 2 | FY27-28 | VLA（高度化） | — | Robo Sync（フォールバック） | ✅ Phase 1 の失敗・リカバリーデータで Fine-tuning |
| Phase 3 | FY28〜 | VLA（高自律） | — | 人介在（OOD のみ） | ✅ OOD 領域が縮小 → データが競争優位に |

**価値転換（重要）:**
- 従来: 失敗 = コスト
- RFA: 失敗 = OOD 発見 + 高価値学習データ
- → 人介在 = 「自動化失敗」ではなく「データ投資」

**フライホイール効果:**
```
現場投入（Robo Sync） → 失敗・データ蓄積 → Fine-tuning → VLA 高度化 → 人介在削減 → 次現場へスケール
```

### BigTech との競争構図

| 側面 | BigTech (Training-Time) | RFA (Deploy-Time) |
|------|-------------------------|------------------|
| **初期投資** | 数百億円（テレオペ施設） | 中程度（既存資産活用） |
| **収集コスト** | 継続的高額（人件費） | ほぼゼロ（運用副産物） |
| **データ品質** | 成功データ中心 | 成功+失敗+OOD（現実的） |
| **価値提供** | モデル完成後（遅い） | 不完全でも即座に |
| **参入障壁** | データ規模 | **現場固有 OOD データ** ← これが取れない |

---

## 🤖 要素技術マップ

### VLA（Vision-Language-Action）周辺

| 技術 | 役割 | 出典・関連 |
|------|------|---------|
| **π0** | ベースモデル（Physical Intelligence 社） | iREX 2025 デモで 4 スキル連続実行実績 |
| **KeypointVLA** | 高精度位置決め用 VLA（Keypoint 中間表現） | 神戸工場のコネクタ挿入などに適用 |
| **IndexVLA** | 池内先生の Index 概念導入（記号接地） | 言語と物理の接地強化、RA-L 投稿予定 |
| **OpenVLA / RT-1 / Octo** | OSS ベースモデル群 | 参考技術、研究用 |

### Agent・計画系

| 技術 | 役割 | 関連 |
|------|------|------|
| **DRIP** | 前提条件→サブタスク→ゴール分解フレームワーク | Task Planning Hub の骨子 |
| **MTP** | 複数ステップタスク計画フレームワーク | CXC デモ（長尺タスク対応） |

### データ・MLOps系

| 技術 | 役割 | 関連 |
|------|------|------|
| **RLDS 形式** | ロボット学習データセット標準化 | 現場ログ→学習の変換基盤 |
| **メダリオン架構** | データ品質層（Bronze/Silver/Gold） | 小栗さんの図（Bronze:生ログ→Silver:クレンジング→Gold:指標） |
| **CEC クラウド基盤** | 学習・推論用クラウド | Microsoft との MLOps 協業 |

---

## 🗓️ 重要な日程・イベント

### 完了済み（2026年 1月～2月中旬）

| 日付 | イベント | 成果 |
|------|---------|------|
| 2026-02-03 | 彩都倉庫見学 | 現場理解、中田さんとの関係構築 |
| 2026-02-03 | 池内先生ディスカッション | ICF/PTG/STG の RFA 適用方針確立 |
| 2026-02-06 | 中田さんヒアリング | オートストア・プロパティ登録の技術的可能性確認 |
| 2026-02-09 | FY26 タスク選定戦略ドキュメント完成 | 2 軸戦略・タスク候補の整理完了 |
| 2026-02-10 | 大坪さん打ち合わせ | アドバイザリーボード資料の方向性確認 |
| 2026-02-12 | アドバイザリーボード資料送付 | 大坪さん経由で送付完了 |
| 2026-02-12 | 拡大Wisdom RFA TF | データ戦略・現場ビデオ活用方針確認 |
| 2026-02-13 | 風見さんMTG | ユースケース選定+データ戦略確認完了 |
| 2026-02-16 | RFAデモ アップデート（第8回） | 完了 |
| 2026-02-16 | Microsoft RAI Workshop | Robotics Responsible AI Workshop 完了 |
| 2026-02-16 | 彩都実証計画 DRAFT作成 | saito-poc-plan.md（α/β/GA定義、動画分析反映） |
| 2026-02-17 | FY26事業計画 内部レビュー | 実施完了（結果未記録・konuki確認要） |
| 2026-02-17-20 | FY26 プロジェクトディスカッション（カテゴリB） | 期間終了・完了（結果記録待ち → konuki確認要） |
| 2026-02-19-20 | **Microsoft ADS Day 1/2** | 下記「MS協業確定事項」参照 |

### 完了（2月下旬〜3月初旬）

| 日付 | イベント | 成果 |
|------|---------|------|
| 2026-02-25 | MS Robotics Weekly Sync | ZhuさんKurokawaのMS協業追加アサイン確定 |
| 2026-02-26 | FY26体制MTG（島本・大坪・奥村・黄瀬） | α→β呼称変更・機能単位定義・時間軸体制・MS統合一本化 決定 |
| 2026-02-28 | メンバーABD評価（今年度） | ラフ案完了 ✅ |
| 2026-03-02 | GSOLデモ本番（汐留浜離宮6F PLT） | 完了 ✅ |
| 2026-03-02 | Unitree G1 配置先確定 | **Idea Forge** 確定 ✅ |
| 2026-03-02 | MS Engagement 体制回答 | 確定仮案を回答済み（上記「MS Engagement 体制」参照） |

### 今後（3月〜）

| 日付 | イベント | 予定内容 |
|------|---------|---------|
| 2026-03-03 | 彩都MTG | ユースケース図・リーディングタスク仕様設計たたき台 ⚠️ |
| 2026-03-04 | 事業計画 中間〆切 | β版定義書・具体感が伝わる図・体制図 ⚠️ |
| 2026-03-07 | FY26事業計画 最終〆切 | β版定義書・図・体制図 完成版 |
| 2026-03-10 | 申請書 最終提出 | ヒューマノイド削除・人員バイネーム・経費精査 |
| 2026-03-12〜18 | **北米出張（Houston / Seattle）** | MS Integration Hub + HQ 訪問。フライト予約済み⚠️パスポート更新要 |
| 2026-09（FY26 Q2末） | **β版リリース（旧α版）** | 成功率 70%、RoboSync×VLA 統合動作確認（2/26 呼称変更） |
| 2027-03（FY26 Q4末） | **GA版（旧β版）** | 成功率 90%、継続学習稼働、社内 PoC 完了 |

---

## 🤝 Microsoft協業 確定事項（ADS Day 1/2: 2026-02-19-20）

### 技術的決定
| 項目 | 決定内容 |
|------|---------|
| **データフォーマット** | `LeRobot` (Hugging Face) — Rosbagから変更 |
| **推論アーキテクチャ** | **Azure-hosted remote policy inference** を必須採用（現場GPU制約のため） |
| **デプロイ** | Container deployment to edge + Azure remote inference operational |
| **パイプライン** | Min viable data pipeline (LeRobot) → GPU training demo → Hybrid inference |

### DoD / スコープ
- **Mandatory**: Azure arch deployed, Min viable data pipeline, GPU training demo, Hybrid inference validation
- **Out of Scope**: New LLM/GenAI reasoning, Production SLOs/HA, Plant IT production network, Operator-level metadata governance
- **Well-Architected mapping**: Reliability(data sync)、Performance(hybrid inference)、OpEx(DataOps/MLOps automation)、Security(Identity/Secret/Audit)

### チーム体制（確定）
| 役割 | 担当 |
|------|------|
| **PM (PanConnect)** | 島本 |
| **Tech Lead (PanConnect)** | 桑田 / 木之瀬 |
| **Tech Lead (Microsoft)** | Mike Lanzetta / Sean Ma |
| **DataOps (Microsoft)** | Muruganandam / Oshani |
| **Simulation (Microsoft)** | Patrick / Paige |

### MS Engagement 体制（確定仮案 2026-03-02）
| 役割 | 担当 |
|------|------|
| **Product Owner（大坪代理）** | 黄瀬 |
| **Scrum Master** | 奥村 |
| **Developer（SW Engineer）** | 黄瀬（30%）、Zhu（100%）、黒川（100%） |
| **Developer（Data Scientist）** | 奥村（100%）、小栗（100%） |

**Muruのリクエスト:** 出来る限り100%アサイン  
**追加スコープ提案（100%コミット根拠）:** 現場ロボット実証環境構築 / リーディングタスクVLAモデル訓練・検証

### 後続タスク（要対応）— 詳細は TODO.md 参照
- [ ] **全員** フライト・ホテル取得（3/12 Houston入り → 3/18帰国）⚠️ 残18日
- [ ] （小栗）Confluence・Jira・GitHub セットアップ + MSへ共有
- [ ] （大坪）Azure サブスクリプション・MSチームへの権限付与
- [ ] （黄瀬 等）UR5e 環境立ち上げ、データ収集
- [ ] （奥村・桑田）Bronze データフォーマット定義

### 北米出張（2026-03-12〜18）概要
- **3/12**: Houston 入り
- **3/13**: MS Houston Integration Hub 訪問（19426 Oil Center Blvd, TX 77073）
- **3/14-15**: Seattle へ移動
- **3/16**: MS HQ 訪問（One Microsoft Way, Redmond, WA 98052）
- **3/17**: 池内先生との Meeting（希望者のみ）
- **3/18**: 帰国
- **例外**: 大坪さん・上野さんは 3/11 日本発（SV経由）→ 3/12 Houston入り
- **精算注意**: 「R&Dプロジェクト費（ZP000）にて補填」、管理No連絡要

---

## 🔗 関連ドキュメント（マスターコンテキスト）

| ドキュメント | 用途 | 最終更新 |
|-------------|------|---------|
| `Projects/rfa/master-context.md` | RFA の技術アーキテクチャ、ビジョン | 2026-03-02 |
| `Projects/rfa/fy26-business-plan.md` | FY26 事業計画、投資規模、戦略 | 2026-01-20 |
| `Projects/rfa/fy26-roadmap.md` | Q1-Q4 マイルストーン、リリース定義 | 2026-02-02 |
| `Projects/rfa/fy26-task-selection-strategy.md` | タスク候補評価、2軸戦略 | 2026-02-09 |
| `Projects/rfa/saito-poc-plan.md` | 彩都パーツセンター出庫作業 実証計画（α/β/GA定義） | 2026-02-16 |
| `Projects/rfa/ikeuchi-discussion-summary.md` | 池内先生ディスカッション詳細記録 | 2026-02-03 |
| `meeting-notes/2026-02-06-nakata-saito-hearing.md` | 中田さんヒアリング記録 | 2026-02-06 |
| `Projects/rfa/glossary.md` | 用語集（**3層 Hub 対応表の追加推奨**） | — |
| `Projects/rfa/data-flywheel-diagram-plan.md` | フライホイール図構成案（NotebookLM 化準備中） | 2026-01-27 |

---

## 📋 キー用語集

| 用語 | 定義 | 備考 |
|------|------|------|
| **RFA** | Robotics Foundation Agent | LLM+VLA+Symbol+RoboSync の統合スタック |
| **VLA** | Vision-Language-Action | ロボット基盤モデル、π0 ベース |
| **Symbol Hub** | 言語↔物理の接地層 | 記号接地、IndexVLA により実装 |
| **Task Planning Hub** | LLM Agent+計画 | DRIP/MTP フレームワーク、再計画機能 |
| **Sensorimotor Hub** | VLA+HIL（人間教示） | 動作生成、非定型物対応 |
| **Robo Sync** | ロボット制御 PF | 安全制御、MCP 統合準備中 |
| **Deploy-Time Scaling** | 現場投入で同時にデータ収集 | RFA の差別化戦略 |
| **OOD** | Out of Distribution | 学習範囲外のコーナーケース、VLA 改善の源泉 |
| **GMR / PTG / ICF / STG** | 池内先生フレームワーク | タスク理論的基礎 |
| **α版** | 社内実証向けリリース（9月末） | 成功率 70%、Robo Sync スキルブロック動作 |
| **β版** | 運用安定化（3月末） | 成功率 90%、継続学習稼働 |

---

**このファイルの使い方:**
- セッションリセット後の素早い文脈復帰用
- 長期実行プロジェクト（RFA）の共通知識ベース
- 新規メンバーのオンボーディング資料

**更新ルール:**
- 四半期ごと or 重要な計画変更時に更新
- 日次ノート → MEMORY への昇格判断は月 1 回程度
