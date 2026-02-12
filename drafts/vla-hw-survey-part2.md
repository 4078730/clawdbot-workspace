# VLA論文ロボットハードウェア完全調査 Part 2: Policy / Dataset / ALOHA系 + 追加論文

作成日: 2026-02-12
調査者: Clawd (サブエージェント)

---

## 1. ALOHA / ACT (arXiv:2304.13705, 2023)

**論文名:** Learning Fine-Grained Bimanual Manipulation with Low-Cost Hardware (RSS 2023)

### 実機で使用したロボット
- **Follower（作業アーム）:** Trossen ViperX 300 6DOF × 2台
- **Leader（操作アーム）:** Trossen WidowX 250 6DOF × 2台
- グリッパー: パラレルジョー（カスタム設計）

### シミュレーションで使用したロボット
- ViperX 300 のMuJoCoモデル（Transfer Cube, Insertion タスク）

### データセットに含まれるロボット
- ALOHA（ViperX 300 follower + WidowX 250 leader）のテレオペデータのみ

### WidowX 250 vs WidowX AI 判定
- **旧型 WidowX 250（Dynamixelサーボ）** である。
- 根拠: 論文は2023年4月発表。WidowX AI / TrossenArmは2025年発売であり、時系列的に旧型WidowX 250確定。ALOHA 2論文に "WidowX 250 robot arm 6dof" への明示的リンクあり（URL: trossenrobotics.com/widowx-250-robot-arm-6dof.aspx）。

### AgileX系
- 含まれない

### ViperX / WidowX の区別
- ALOHA 2論文から引用: *"consists of a bimanual parallel-jaw gripper workcell with two ViperX 6-DoF arms (Trossen Robotics) (the "follower"), along with 2 smaller WidowX arms (Trossen Robotics) (the "leader"). The WidowX contains the same kinematic structure as the ViperX, in a smaller form factor."*

---

## 2. ALOHA 2 (arXiv:2405.02292, 2024)

**論文名:** ALOHA 2: An Enhanced Low-Cost Hardware for Bimanual Teleoperation

### 実機で使用したロボット
- **Follower:** Trossen ViperX 300 6DOF × 2台
- **Leader:** Trossen WidowX 250 6DOF × 2台（改良グリッパー付き）
- カメラ: Intel RealSense D405 × 4（wrist × 2, overhead × 1, worms-eye × 1）

### シミュレーションで使用したロボット
- MuJoCo Menagerieモデル（ViperX 300ベース、システム同定済み）

### データセットに含まれるロボット
- ALOHA 2 ハードウェアのみ

### WidowX 250 vs WidowX AI 判定
- **旧型 WidowX 250** である。
- 引用: *"ViperX 300 robot arm 6dof"* (URL: trossenrobotics.com/viperx-300-robot-arm-6dof.aspx) および *"WidowX 250 robot arm 6dof"* (URL: trossenrobotics.com/widowx-250-robot-arm-6dof.aspx) — "Accessed: 2024-01-24"

### AgileX系
- 含まれない

### 改良点（ALOHA 1からの差分）
- グリッパー: 低摩擦リニアレール設計（leader/follower両方）
- leaderグリッパーモーター: XL430-W250-T → XC430-W150-T に変更（低摩擦化）
- 重力補償: ゴムバンド → 吊り下げ式パッシブ重力補償
- カメラ: Logitechウェブカメラ → Intel RealSense D405

---

## 3. Mobile ALOHA (arXiv:2401.02117, 2024)

**論文名:** Learning Bimanual Mobile Manipulation with Low-Cost Whole-Body Teleoperation

### 実機で使用したロボット
- **移動ベース:** AgileX Tracer AGV（差動駆動、最大1.6m/s、最大ペイロード100kg）
- **Follower:** Trossen ViperX 300 6DOF × 2台
- **Leader:** Trossen WidowX（ALOHAと同型、テレオペ時のみ使用）
- カメラ: Logitech C922x × 3（wrist × 2, forward × 1）
- コンピュータ: Nvidia 3070 Ti GPU搭載ノートPC

### シミュレーションで使用したロボット
- なし（実機のみ）

### データセットに含まれるロボット
- Mobile ALOHAデータ（ViperX 300 × 2 + Tracer AGV）
- Co-training用: 静的ALOHAデータセット（825エピソード、Zhao et al. 2023 + Shi et al.）

### WidowX 250 vs WidowX AI 判定
- **旧型 WidowX 250** である（2024年1月発表、テレオペ用leader）

### AgileX系
- **含まれる — AgileX Tracer AGV**（移動ベースとして使用）
- 引用: *"We choose AgileX Tracer AGV ("Tracer") as the mobile base following considerations 1 and 2. Tracer is a low-profile, differential drive mobile base designed for warehouse logistics."*
- 注意: これはALOHAのアーム系（Trossen）とは別の移動プラットフォーム。PiPER / NERO / COBOT Magicではない。

### 特記事項
- 引用: *"The teleoperation setup can be removed and only two ViperX 300 are used during autonomous execution."*
- 全体コスト: $32k

---

## 4. ACT (arXiv:2304.13705 — ALOHA と同一論文)

→ **「1. ALOHA / ACT」のエントリを参照**。ALOHAとACTは同一論文で提案されている。

---

## 5. Diffusion Policy (arXiv:2303.04137, 2023)

**論文名:** Diffusion Policy: Visuomotor Policy Learning via Action Diffusion (RSS 2023 / IJRR 2024 extended)

### 実機で使用したロボット
- **UR5e:** Push-T タスク（2DOF位置制御、end-effector xy座標）
- **Franka Emika Panda:** Sauce Pouring, Sauce Spreading タスク（6DOF）
- **Franka Emika Panda (× 2):** Extended版（Sec. 7）で追加されたbimanualタスク — Egg Beater, Mat Unrolling, Shirt Folding

### シミュレーションで使用したロボット
- **RoboMimic ベンチマーク:** Franka Panda（Lift, Can, Square, Transport, ToolHang）— RobySuiteシミュレーション
- **Push-T:** 2DOF、シミュレーション版も存在
- **Block Push:** 2DOF、Shafiullah et al. 2022 ベンチマーク
- **Kitchen:** Franka-based（Gupta et al. 2019）

### データセットに含まれるロボット
- UR5e（Push-T実機デモ136エピソード）
- Franka Panda（Sauce関連タスク、各90エピソード）
- Franka Panda × 2（bimanualタスク、各~250エピソード）

### WidowX 250 vs WidowX AI 判定
- **WidowXは使用されていない**

### AgileX系
- 含まれない

---

## 6. DROID Dataset (arXiv:2403.12945, 2024)

**論文名:** DROID: A Large-Scale In-The-Wild Robot Manipulation Dataset

### 実機で使用したロボット
- **Franka Emika Panda 7DOF** × 18台（13機関に分散配置）
- グリッパー: Robotiq 2F-85
- カメラ: Zed 2 ステレオカメラ × 2（外部）、Zed Mini × 1（手首）
- テレオペ: Meta Quest 2 ヘッドセット + コントローラー

### シミュレーションで使用したロボット
- なし

### データセットに含まれるロボット
- **Franka Emika Panda のみ**（76kトラジェクトリ、564シーン、86タスク）
- 引用: *"We chose the Franka Emika Panda 7 DoF robot arm as the base of our setup since it is widely adopted in the robot research community, reliable, relatively affordable and was available at most participating institutions."*
- 引用: *"The robot arm is equipped with a Robotiq 2F-85 gripper and is mounted on a height-adjustable standing desk with wheels"*

### WidowX 250 vs WidowX AI 判定
- **WidowXは使用されていない**

### AgileX系
- 含まれない

---

## 7. BridgeData V2 (arXiv:2308.12952, 2023)

**論文名:** BridgeData V2: A Dataset for Robot Learning at Scale

### 実機で使用したロボット
- **WidowX 250 6DOF** （低コストロボットアーム）
- 7D action space: 6D Cartesian EE + discrete gripper
- カメラ: RGBD（固定over-the-shoulder）+ RGB × 2（位置ランダム化） + RGBwrist × 1

### シミュレーションで使用したロボット
- なし（全て実機データ）

### データセットに含まれるロボット
- **WidowX 250 6DOF のみ**
- 60,096トラジェクトリ（50,365デモ + 9,731スクリプトポリシー）、24環境、13スキル

### WidowX 250 vs WidowX AI 判定
- **旧型 WidowX 250（Dynamixelサーボ）** である。
- 根拠: 2023年発表。セットアップコスト約$4,000と記載。引用: *"The robot setup costs approximately $4,000 in total and consists of parts that are all publicly available"*。WidowX AIは2025年発売であり、時系列的に不可能。

### AgileX系
- 含まれない

---

## 8. RoboMIND (arXiv:2412.13877, 2024)

**論文名:** RoboMIND: Benchmark on Multi-embodiment Intelligence Normative Data for Robot Manipulation

### 実機で使用したロボット（4種のエンボディメント）
1. **Franka Emika Panda** — 単腕、Intel RealSense D435i × 3、Robotiq グリッパー（19,222トラジェクトリ）
2. **UR-5e** — 単腕、外部トップカメラ（6,911トラジェクトリ）
3. **AgileX Cobot Magic V2.0** — デュアルアーム、ビルトインカメラ（8,030トラジェクトリ）
4. **X-Humanoid Tien Kung** — ヒューマノイド、デュアルアーム + Inspire-Robots RH56BFX デクストラスハンド × 2、Orbbec Gemini 335カメラ（9,686トラジェクトリ）

### シミュレーションで使用したロボット
- Nvidia Isaac Sim でのデジタルツイン環境（11,783トラジェクトリ、実機タスクと同じ）

### データセットに含まれるロボット
- 上記4種のエンボディメント（合計55kトラジェクトリ）

### WidowX 250 vs WidowX AI 判定
- **WidowXは使用されていない**

### AgileX系
- **含まれる — AgileX Cobot Magic V2.0**
- 引用: *"AgileX Cobot Magic V2.0"* (参考文献[69]に明示)
- **V2.0と明記**されている
- 8,030トラジェクトリ、デュアルアームタスク
- 引用: *"For AgileX robots, we utilized the built-in dual-arm teleoperation system."*

---

## 9. AgiBot World (arXiv:2503.06669, 2025)

**論文名:** AgiBot World: A Large-scale Manipulation Platform for Scalable and Intelligent Embodied Systems

### 実機で使用したロボット
- **AgiBot G1** ヒューマノイドロボット × 100台以上
  - デュアル7DOFアーム
  - 移動シャシー + 調整可能なウエスト
  - モジュール式エンドエフェクター: 標準グリッパー or 6DOFデクストラスハンド
  - 触覚センサー付きグリッパー（visuo-tactile sensors）
  - カメラ: 8台（RGB-Dカメラ + 魚眼カメラ × 複数）
  - 制御周波数: 30Hz

### シミュレーションで使用したロボット
- 開発中（論文公開時点ではシミュレーション環境は未完成と記載）

### データセットに含まれるロボット
- **AgiBot G1 のみ**（1,001,552トラジェクトリ、217タスク、87スキル、106シーン）
- テレオペ: VRヘッドセット制御 + モーションキャプチャスーツ

### WidowX 250 vs WidowX AI 判定
- **WidowXは使用されていない**

### AgileX系
- **含まれない** — AgiBot G1はAgiBot Inc.（Shanghai AI Lab関連）の独自ヒューマノイド。AgileX Roboticsの製品ではない。

---

## 10. UniVLA (arXiv:2505.06111, 2025)

**論文名:** UniVLA: Learning to Act Anywhere with Task-centric Latent Actions

### 実機で使用したロボット
- 論文Section IV-A2（Real-world experiments）で4タスクの実機評価あり
  - "Store the screwdriver", "Clean the cutting board", "Fold towel twice", "Stack tower of hanoi"
- 具体的なロボットハードウェアの型番は論文本文中に明記されていないが、関連するOpenDriveLab/AgiBot系のセットアップが使用されていると推測される

### シミュレーションで使用したロボット
- **LIBERO ベンチマーク**: Franka Panda（4つのタスクスイート）
- **CALVIN ベンチマーク**
- **SimplerEnv ベンチマーク**
- **VLN-CE (Room2Room)**: ナビゲーションタスク

### データセットに含まれるロボット（プレトレーニング用）
- **Open X-Embodiment (OXE) のサブセット** — 多種ロボット含む
- **BridgeData V2** — WidowX 250
- **GNM dataset** — ナビゲーション用
- **Ego4D** — 人間の手の動画（action-free）

### WidowX 250 vs WidowX AI 判定
- BridgeData V2経由で **旧型 WidowX 250** のデータを使用

### AgileX系
- 実機評価でのロボット型番は論文中に明示されていない

---

## 11. ALOHA Unleashed (arXiv:2410.13126, 2024)

**論文名:** ALOHA Unleashed: A Simple Recipe for Robot Dexterity

### 実機で使用したロボット
- **ALOHA 2 プラットフォーム** × 10台（2つの建物に分散）
  - Follower: Trossen ViperX 300 6DOF × 2台
  - Leader: Trossen WidowX 250 6DOF × 2台（テレオペ用）
  - カメラ: RGB × 4（480×640）
  - 14DOF action space（6DOF × 2アーム + 1グリッパー × 2）
- 引用: *"We demonstrate results on ALOHA 2, which consists of a bimanual parallel-jaw gripper workcell with two 6-DoF arms."*
- 引用: *"The policy outputs 12 absolute joint positions, 6 for each 6-dof ViperX arm, and a continuous value for gripper position for each of the two grippers."*

### シミュレーションで使用したロボット
- ALOHA 2 MuJoCo Menagerieモデル（3タスク: SingleInsertion, DoubleInsertion, MugOnPlate）

### データセットに含まれるロボット
- ALOHA 2（26k+ エピソード、5実機タスク + 2k+ シミュレーション）
- 35人のオペレーターによる大規模収集

### WidowX 250 vs WidowX AI 判定
- **旧型 WidowX 250**（leader用）。2024年10月発表、ALOHA 2構成。

### AgileX系
- 含まれない

---

## 12. ET-VLA (arXiv:2511.01224, 2024)

**論文名:** Embodiment Transfer Learning for Vision-Language-Action Models

### 実機で使用したロボット（3種のバイマニュアルロボット）
1. **UR5e × 2台**（bimanual UR5e）— Robotiqグリッパー付き、RealSense D457カメラ × 1 + wristカメラ × 2
2. **Franka Emika Panda × 2台**（bimanual Franka）
3. **AgileX** × 2台（bimanual AgileX）

### シミュレーションで使用したロボット
- **RLBench2**（Grotz et al., 2024）
- **RoboTwin**（Mu et al., 2024）— AgileX COBOT Magic系

### データセットに含まれるロボット
- OXE（プレトレーニング、単腕データのみ）
- BridgeData V2（WidowX 250、SCP用）
- 自己収集データ: bimanual UR5e（458トラジェクトリ + 追加980トラジェクトリ）

### WidowX 250 vs WidowX AI 判定
- SCP (Synthetic Continued Pretraining)にBridgeData V2を使用 → **旧型 WidowX 250**

### AgileX系
- **含まれる** — bimanual AgileXとして実機評価に使用
- 引用: *"three bimanual robots, including bimanual UR5e, bimanual Franka, and bimanual AgileX"*
- 具体的な型番（COBOT Magic V1/V2、PiPER等）は論文中に明記されていない

---

## 13. Affordance Field Intervention (arXiv:2512.07472, 2024)

**論文名:** Affordance Field Intervention: Enabling VLAs to Escape Memory Traps in Robotic Manipulation

### 実機で使用したロボット
- **AgileX PiPER** マニピュレーター
- VLAバックボーン: π₀ および π₀.₅
- 引用: *"On real-world manipulation tasks using an AgileX Piper manipulator, our method achieves consistent improvements across four diverse tasks"*

### シミュレーションで使用したロボット
- **LIBERO-Pro** ベンチマーク（Spatial / Object perturbation）

### データセットに含まれるロボット
- π₀ / π₀.₅ のプレトレーニングデータ（マルチエンボディメント）

### WidowX 250 vs WidowX AI 判定
- **WidowXは使用されていない**

### AgileX系
- **含まれる — AgileX PiPER**
- PiPERはAgileXの単腕マニピュレーター（COBOT Magicとは別製品）

---

## 14. RoboTwin (ECCV 2024)

**論文名:** RoboTwin: Dual-Arm Robot Benchmark with Generative Digital Twins

### 実機で使用したロボット
- **AgileX COBOT Magic** プラットフォーム
  - 4台のAgileX Arms（2 follower + 2 leader）
  - Intel RealSense D-435 RGBDカメラ × 4

### シミュレーションで使用したロボット
- COBOT Magic のデジタルツイン（Isaac Sim等）
- 生成的デジタルツイン手法によるデータ拡張

### データセットに含まれるロボット
- AgileX COBOT Magic（実機テレオペ + シミュレーション生成）

### WidowX 250 vs WidowX AI 判定
- **WidowXは使用されていない**

### AgileX系
- **含まれる — AgileX COBOT Magic**
- プロジェクトサイトから引用: *"COBOT Magic platform from AgileX Robotics (https://global.agilex.ai/products/cobot-magic) For the acquisition of real-world data, we employed the open-source COBOT Magic platform from AgileX Robotics, which is equipped with four AgileX Arms and four Intel Realsense D-435 RGBD cameras"*
- バージョン（V1/V2）: COBOT Magicの公式ページでは "Its hardware is based on 4 robotic arms, equipped with 2 wrist cameras and 1 top camera, and a mobile base from AgileX Robotics Tracer" と説明。RoboTwinの説明には4カメラとあり、初代COBOT Magic（V1相当）の構成と一致する可能性が高い。ただし論文中にV1/V2の明示的な記述はない。

---

## 15. SpatialVLA / CogAct / RoboVLM（追加調査）

ICLR 2026時点での追加VLA論文について、Web検索のレートリミットにより詳細調査が制限されたが、以下の情報を補足する：

### SpatialVLA
- 3D空間推論を取り入れたVLAモデル
- 実機評価ではWidowX 250（BridgeData系）やFranka Pandaが使用される傾向

### CogAct
- 認知的アクション推論ベースのVLA
- 詳細なハードウェア情報は追加調査が必要

### RoboVLM
- ロバストなVLM-to-Actionパイプライン
- 詳細なハードウェア情報は追加調査が必要

---

## 総合まとめ表

| 論文 | 実機ロボット | WidowX種別 | AgileX有無 | Trossen ViperX/WidowX区別 |
|------|-------------|-----------|-----------|--------------------------|
| ALOHA/ACT (2023) | ViperX 300 × 2 (follower) + WidowX 250 × 2 (leader) | 旧型 WidowX 250 | なし | follower=ViperX, leader=WidowX |
| ALOHA 2 (2024) | ViperX 300 × 2 + WidowX 250 × 2 | 旧型 WidowX 250 | なし | follower=ViperX, leader=WidowX |
| Mobile ALOHA (2024) | ViperX 300 × 2 + AgileX Tracer AGV | 旧型 WidowX 250 (leader) | **Tracer AGV** (移動ベース) | follower=ViperX, leader=WidowX |
| Diffusion Policy (2023) | UR5e, Franka Panda (× 1 or 2) | 不使用 | なし | N/A |
| DROID (2024) | Franka Panda × 18 | 不使用 | なし | N/A |
| BridgeData V2 (2023) | WidowX 250 6DOF | 旧型 WidowX 250 | なし | WidowXのみ (ALOHA構成ではない) |
| RoboMIND (2024) | Franka Panda, UR-5e, AgileX Cobot Magic V2.0, Tien Kung | 不使用 | **Cobot Magic V2.0** | N/A |
| AgiBot World (2025) | AgiBot G1 ヒューマノイド × 100+ | 不使用 | なし (AgiBot社製品) | N/A |
| UniVLA (2025) | 不明（論文に型番明記なし） | BridgeV2経由で旧型 WidowX 250 | 不明 | N/A |
| ALOHA Unleashed (2024) | ALOHA 2 (ViperX 300 × 2) × 10台 | 旧型 WidowX 250 (leader) | なし | follower=ViperX, leader=WidowX |
| ET-VLA (2024) | bimanual UR5e, bimanual Franka, bimanual AgileX | BridgeV2経由で旧型 | **AgileX** (型番不明) | N/A |
| Affordance Field (2024) | AgileX PiPER | 不使用 | **PiPER** | N/A |
| RoboTwin (ECCV 2024) | AgileX COBOT Magic | 不使用 | **COBOT Magic** (V1相当) | N/A |

---

## 重要な知見

### WidowX 250 vs WidowX AI
- **調査対象の全論文において、WidowX AIは使用されていない**。WidowX AI / TrossenArmは2025年発売であり、2024年以前の論文では時系列的に使用不可能。2025年発表のUniVLA, AgiBot Worldでも直接のWidowX AI使用は確認されなかった。

### AgileX製品の分布
- **AgileX Tracer AGV**: Mobile ALOHA の移動ベース
- **AgileX COBOT Magic V2.0**: RoboMIND のデュアルアームプラットフォーム
- **AgileX COBOT Magic (V1相当)**: RoboTwin のデュアルアームベンチマーク
- **AgileX PiPER**: Affordance Field Intervention の単腕マニピュレーター
- **AgileX (型番不明)**: ET-VLA のbimanualセットアップ

### ALOHA系のアーム構成
- 全てのALOHA系論文（ALOHA, ALOHA 2, Mobile ALOHA, ALOHA Unleashed）で一貫して:
  - **Follower（作業アーム）= Trossen ViperX 300 6DOF**
  - **Leader（テレオペアーム）= Trossen WidowX 250 6DOF**
  - 自律実行時はViperX 300のみ使用（leaderは取り外し可能）
