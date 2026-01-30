# RFA 用語集（Glossary）

*Last updated: 2026-01-31*

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

---

## データ/運用

- **DataOps**
  - ロボット実行ログを「学習・評価・再デプロイ」に繋げるためのデータ設計/変換/品質管理/運用。

- **データライフサイクル / データフライホイール**
  - 「実行 → 収集 → 学習/FT → 配備 → 再実行」を回して、使うほど賢くなる構造。

- **OOD (Out of Distribution)**
  - 既存の想定/学習範囲外の状況。現場では失敗として現れやすく、学習価値が高い。

- **RLDS (Robot Learning Data Standard)**
  - 学習データ形式の候補（Robo Syncログ→RLDS変換など）。
