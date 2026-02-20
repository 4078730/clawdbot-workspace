# RFA 用語集（Glossary）

*Last updated: 2026-02-20*

この用語集は、RFA関連ドキュメント（master-context / FY26事業計画 / CXCデモ等）で使う言葉を「同じ意味で同じ名前で」使うためのメモ。

---

## プロジェクト/システム

- **RFA (Robotics Foundation Agent)**
  - LLM Agent + VLA + Symbol Hub + Robo Sync + DataOps を統合して、現場タスクを「言語指示で」「失敗しながら改善して」実行するスタック。

- **Robo Sync**
  - ロボット制御PF（ハード抽象化・安全制御・シナリオ実行）。RFAは「頭脳」として上に乗る。

- **CXC**
  - デモ展示/検証の場。RFAの統合デモ（常設）や価値訴求に使う。

---

## 技術レイヤ / Hub

- **Task Planning Hub**
  - 役割：タスク理解・計画生成・スキル構成・再計画（Re-Plan）。

- **Symbol Hub**
  - 役割：言語世界と物理世界の接地、状態管理、成功/失敗判定。

- **Symbol Integration**
  - 役割：LLM Agent（計画/記号）と VLA / Robo Sync（連続値/制御）をつなぐ「橋渡し」レイヤー。
  - 表記ゆれ：`fy26-business-plan.md` では *Symbol Integration*、`master-context.md` / `README.md` では *Symbol Hub* を主に使用（同じ機能領域を指す意図）。

- **Sensorimotor Hub**
  - 役割：視覚・言語・状態量から具体的な行動（アクション）を生成して実行。

---

## モデル/手法

- **LLM Agent**
  - 高レベルの計画/判断/対話を担う。

- **VLA (Vision-Language-Action)**
  - 視覚＋言語＋ロボット状態から、連続制御（行動）を生成するモデル。

- **VLM (Vision-Language Model)**
  - 画像＋言語で状態認識・判定を行うモデル。例：箱が閉じているか、対象物が所定位置にあるか。

- **IndexVLA / KeypointVLA**
  - 記号接地・高精度操作のための中間表現/手法。

- **Re-Plan（再計画）**
  - 失敗や状況変化に応じて、手順・スキル・パラメータを切り替える。

- **GMR（Grasp-Manipulation-Release）**
  - 池内先生の操作タスク分類フレームワーク。把持→操作→解放の3段階でタスクを構造化する。

- **ICF（Interaction / Contact Form）**
  - 物体と環境の接触状態を定義する概念。NC(非接触)、PC(面接触)、TR(点接触)等の分類。「接触状態の遷移」がスキル発生単位として扱われる。

- **PTG（Physical Task Group）**
  - 純粋な物理制約に従うタスク分類。PTG11(Detach/Picking)、PTG33(LinearClose)等。工業組立で有効。

- **STG（Semantic Task Group）**
  - 人間の意図・常識に基づく仮想的制約を含んだタスク分類。CarefullyDetach, PlanarTranslate, Rotate等。梱包・家庭作業・柔軟物操作で支配的。

---

## データ/運用

- **DataOps**
  - ロボット実行ログを「学習・評価・再デプロイ」に繋げるためのデータ設計/変換/品質管理/運用。

- **データライフサイクル / データフライホイール**
  - 「実行 → 収集 → 学習/FT → 配備 → 再実行」を回して、使うほど賢くなる構造。

- **Deploy-Time Scaling**
  - RFA/パナソニックのデータ戦略の中核概念。BigTechのTraining-Time Scaling（大規模テレオペ施設で事前に大量データ収集）に対し、現場運用しながらデータを蓄積・改善するアプローチ。失敗データ（OOD）が競争優位の源泉。

- **OOD (Out of Distribution)**
  - 既存の想定/学習範囲外の状況。現場では失敗として現れやすく、学習価値が高い。

- **RLDS (Robot Learning Data Standard)**
  - 学習データ形式の候補（Robo Syncログ→RLDS変換など）。

- **LeRobot**
  - Hugging Face提供のロボット学習データフォーマット/フレームワーク。FY26 Microsoft協業ではRosbagからLeRobot形式への移行が確定（2026-02-20 ADS Day 1資料）。

---

## QMS / リリース段階

- **CA (Controlled Availability) = α版**
  - 社内実証に投入した段階。対象を限定した状態で動作確認。`saito-poc-plan.md` で導入。
  - ※ `fy26-roadmap.md` のα版成功率（70%）はシステム全体レベル、`saito-poc-plan.md` のα版成功率（90%/95%）はスコープを絞ったタスク単位の指標。

- **GA (General Availability)**
  - 正式製品版。QMS整備・監査対応完了。汎用顧客向けに提供可能な状態。FY27〜を想定。

---

## ハードウェア

- **D405 (Intel RealSense D405)**
  - チーム共通のカメラ。短距離・高精度のDepthカメラ。VLAの入力画像取得に使用。

- **TRLC-DK1-X**
  - The Robot Learning Company のロボットアームキット。ARXファミリー互換。Apache 2.0ライセンス。
