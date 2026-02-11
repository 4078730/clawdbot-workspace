# 🌙 ナイトリーメンテナンスレポート (2026-02-11)

---

## 📄 ドキュメント整合性チェック

基準: `Projects/rfa/master-context.md` (Last updated: 2026-02-09)

### ✅ 問題なし: 5件

| ドキュメント | チェック内容 | 結果 |
|-------------|------------|------|
| `fy26-business-plan.md` | ビジョン文言、3層Hub構造、チーム体制(7名+4名)、Deploy-Time Scaling戦略 | 一貫 |
| `fy26-roadmap.md` | α版(9月/70%)/β版(3月/90%)定義、Q1-Q4マイルストーン、4柱構成 | 一貫 |
| `fy26-task-selection-strategy.md` | 3層Hub名称(Task Planning/Symbol/Sensorimotor)、現場リスト(彩都/神戸)、判断軸 | 一貫 |
| `ikeuchi-discussion-summary.md` | GMR/ICF/PTG/STG定義、VLA Policy=1GMR方針、IndexVLA位置づけ | 一貫 |
| `data-flywheel-diagram-plan.md` | フライホイール構造、Deploy-Time Scaling概念 | 一貫 |

### ⚠️ 要確認: 4件（修正済み）

| # | 問題 | ドキュメント | 詳細 | 対応 |
|---|------|------------|------|------|
| 1 | **用語不一致: GMR** | `memory/MEMORY.md` | 「General Manipulation Robots」と記載。正しくは「Grasp-Manipulation-Release」（`ikeuchi-discussion-summary.md` / `glossary.md` 準拠） | ✅ 修正済み |
| 2 | **用語不一致: PTG/ICF/STG** | `glossary.md` + `memory/MEMORY.md` | PTG=「Perceptual Transition Graph」→正しくは「Physical Task Group」、ICF=「Intrinsic Contact Formation」→正しくは「Interaction / Contact Form」、STG=「State Transition Graph」→正しくは「Semantic Task Group」 | ✅ 修正済み |
| 3 | **所在地誤り** | `memory/MEMORY.md` | 彩都パーツセンターの所在地が「愛知県春日井市」と記載。正しくは「大阪府茨木市」（`meeting-notes/2026-02-03-saito-warehouse-visit-report.md` 準拠） | ✅ 修正済み |
| 4 | **所属誤り** | `memory/MEMORY.md` | 池内先生の所属が「大阪大学」と記載。正しくは「Microsoft / 東大名誉教授」（`ikeuchi-discussion-summary.md` 準拠） | ✅ 修正済み |

### ℹ️ 既知の表記ゆれ（対応不要）

| 用語 | 使用箇所 | 備考 |
|------|---------|------|
| Symbol Hub / Symbol Integration | master-context=両方使用、business-plan=Symbol Integration | `glossary.md`に注記あり（同じ機能領域を指す） |

---

## 🔄 コンテキスト更新

### 更新状況

| ドキュメント | 最終更新 | 評価 |
|-------------|---------|------|
| `master-context.md` | 2026-02-09 | ✅ 最新（2/9の彩都・池内先生情報反映済み） |
| `fy26-task-selection-strategy.md` | 2026-02-09 | ✅ 最新（DRAFT、来週チーム議論予定） |
| `fy26-roadmap.md` | 2026-02-02 | ✅ 安定（Q1-Q4定義は変更なし） |
| `fy26-business-plan.md` | 2026-01-20 | ⚠️ やや古い（3週間前）だが内容は依然有効 |
| `data-flywheel-diagram-plan.md` | 2026-01-27 | ⚠️ 未完了アクションあり（NotebookLM図生成、小栗さん/海藤さんMTG後のフォロー不明） |
| `glossary.md` | 2026-02-04→2026-02-11 | ✅ 今回更新（PTG/ICF/STG定義修正） |

### 最近の議論・決定事項の反映状況

| 日付 | 議論・決定 | 反映先 | 状態 |
|------|-----------|--------|------|
| 2/10 | パナソニックらしさ差別化ポイント（現場CPS×VLA） | `memory/2026-02-10.md` | ✅ 記録済み |
| 2/10 | 大坪さん打ち合わせ（アドバイザリーボード、プロジェクトディスカッション） | `memory/2026-02-10.md` | ✅ 記録済み |
| 2/9 | FY26タスク選定戦略（2軸設計、メインライン+サイドライン） | `fy26-task-selection-strategy.md` + `MEMORY.md` | ✅ 反映済み |
| 2/9 | 経産省AIロボティクス戦略検討会議ブリーフィング | `drafts/` | ✅ 作成済み |

---

## 🧠 Memory整理

### 修正内容（今回実施）

1. **`memory/MEMORY.md`**: 用語定義4件修正（GMR, PTG, ICF, 彩都所在地, 池内先生所属）
2. **`memory/MEMORY.md`**: 誤字修正（「大坪さり」→「大坪さん」）
3. **`memory/MEMORY.md`**: 最終更新日を2026-02-11に更新

### 昇格候補（提案）

特に新規の昇格候補なし。2/10のナイトリーメンテナンスで既にMEMORY.md新規作成済みであり、直近の情報は適切にカバーされている。

### 構造上の課題（提案）

⚠️ **`MEMORY.md`（ルート）と `memory/MEMORY.md` の二重管理問題**
- `AGENTS.md` は `MEMORY.md`（ルート）を参照
- ルート版は古い簡易版、`memory/MEMORY.md` は詳細版
- **提案**: ルートの `MEMORY.md` を `memory/MEMORY.md` に統合するか、ルート版を参照リダイレクトにする

---

## ✅ TODO整理

### 期限切れ・注意タスク

| タスク | 期限 | 状態 | コメント |
|--------|------|------|---------|
| **アドバイザリーボード資料 フォローアップ** | 2/12（木）| ⏰ 明日期限 | 大坪さんが作業中、要フォロー |
| **キミチカ説明書** | 2/15（土）| 🔄 進行中 | Illustrator作業が複数残っている |

### 古い/滞留タスク

| タスク | 状態 | コメント |
|--------|------|---------|
| **データ戦略（データピラミッド）ブラッシュアップ** | 未着手？ | 1/27のフライホイール図も含め進捗不明 |
| **Microsoft会議録作成** | 未着手？ | 「直近（優先対応）」に分類されているが最近のログに言及なし |
| **Gemini Robotics セットアップ** | ブロック中 | ドメイン取得が未完、依存タスクが多い |
| **Substack記事翻訳** | ブロック中 | 認証壁でブロック（長期） |
| **島本さんフィードバック対応** | 6件未完了 | 1/30に起票、2週間経過 — プロジェクトディスカッション(2/17)までに対応必要 |

### 完了済みだが未アーカイブ

完了アーカイブは適切に管理されている（2026-02セクションで整理済み）。特に対応不要。

---

## 💡 提案

1. **MEMORY.md統合**: ルート `MEMORY.md` と `memory/MEMORY.md` の二重管理を解消すべき。ルート版を `memory/MEMORY.md` へのシンボリックリンクにするか、ルート版を詳細版で置き換えることを推奨。

2. **data-flywheel-diagram-plan.md のフォロー**: 1/27作成のアクションアイテム（NotebookLM図生成、小栗さん・海藤さんMTGフォロー）の進捗を確認すべき。完了していれば完了マーク、未完了なら来週の優先度判断が必要。

3. **島本さんフィードバック対応**: 2/17-20のプロジェクトディスカッション前に対応が必要な6件（費用詳細化、追加メンバー、Seeds、マイルストーン、QMS、島本さんすり合わせ）の優先度を再確認すべき。

4. **glossary.md 3層Hub対応表**: 前回のナイトリーメンテナンスで推奨されていた「3層Hub対応表追加」がまだ未着手。NOW.mdに「進行中」として記載あり。

---

*修正ファイル: `memory/MEMORY.md`, `Projects/rfa/glossary.md`*
*レポート生成: 2026-02-11 23:52 JST*
