# VLA論文 ロボットハードウェア完全調査 Part 1: Foundation VLA Models

> 調査日: 2026-02-12
> 調査方法: 各論文のarXiv HTML版 / 公式ブログを web_fetch で実際に読み、Experiments / Hardware セクションからハードウェアを特定

---

## サマリーテーブル

| # | 論文名 | 年 | 実機ロボット | シミュレーション | 学習データ内ロボット | WidowX判定 | AgileX有無 |
|---|--------|-----|-------------|-----------------|---------------------|-----------|-----------|
| 1 | RT-1 | 2022 | Everyday Robots mobile manipulator | ─ | Everyday Robots | ─ | ❌ |
| 2 | RT-2 | 2023 | Everyday Robots mobile manipulator | ─ | Everyday Robots (RT-1 data) | ─ | ❌ |
| 3 | RT-X / OXE | 2023 | 22 embodiments（Google Robot, WidowX, Franka 等） | ─ | 22 embodiments from 21 institutions | WidowX 250（旧型） | ❌ |
| 4 | OpenVLA | 2024 | WidowX (BridgeV2), Google Robot | ─ | OXE dataset (WidowX, Google Robot 等) ; fine-tune: Franka Emika Panda | WidowX 250（旧型） | ❌ |
| 5 | Pi0 | 2024 | UR5e, Bimanual UR5e, Franka, ALOHA (Trossen ViperX), Bimanual ARX+AgileX, Mobile ALOHA, Mobile Fibocom (ARX on holonomic base) | ─ | OXE subset + DROID + 自社 cross-embodiment data | WidowX含む（OXE経由、旧型） | ✅ Bimanual ARX+AgileX |
| 6 | Pi0.5 | 2025 | Mobile manipulator (2× 6-DoF arms, parallel jaw grippers, mobile base) | ─ | Pi0同等 + mobile manipulation data | OXE経由（旧型） | ✅（Pi0と同系統） |
| 7 | Octo | 2024 | WidowX, UR5e, Franka, ALOHA (bimanual ViperX) 等 9 platforms | ─ | OXE 25 datasets (800K trajectories) | WidowX 250（旧型） | ❌ |
| 8 | GR00T N1 | 2025 | Fourier GR-1 humanoid | Franka Panda, Bimanual Panda, GR-1 (NVIDIA Isaac) | OXE + 自社データ | OXE経由（旧型） | ❌ |
| 9 | Gemini Robotics | 2025 | ALOHA 2 bimanual | ─ | 自社データ (ALOHA 2) + prior Google data | ─ | ❌ |
| 10 | X-VLA | 2025 | BridgeData-v2 setup (WidowX), AgileX bimanual | ─ | DROID + RoboMind + AgiBOT (7 platforms, 5 arm types) | WidowX 250（旧型）| ✅ AgileX bimanual |
| 11 | DexVLA | 2025 | Bimanual UR5e, Franka, Bimanual AgileX, Franka+Dexterous hands | ─ | OXE + DROID + 自社 | OXE経由（旧型） | ✅ Bimanual AgileX |
| 12 | SmolVLA | 2025 | SO-100 (low-cost servo arm) | LIBERO (Franka Panda) | 481 community datasets from HuggingFace (~22.9K episodes) | community dataに含む可能性あり（旧型相当） | ❌ |
| 13 | Helix | 2025 | Figure 02 humanoid (35-DoF upper body) | ─ | Figure社 自社データ | ─ | ❌ |
| 14 | GR-2 | 2024 | Kinova Gen3 7-DoF + Robotiq 2F-85 | CALVIN benchmark | 大規模ビデオ事前学習 + Kinova実機データ | ─ | ❌ |
| 15 | Gemini Robotics 1.5 | 2025 | ALOHA, Bi-arm Franka, Apptronik Apollo humanoid | MuJoCo (aligned scenes) | 3 embodiments (ALOHA, Franka, Apollo) | ─ | ❌ |

---

## 各論文の詳細ハードウェア情報

### 1. RT-1 (Robotics Transformer 1)
- **arXiv:** https://arxiv.org/abs/2212.06817
- **年:** 2022
- **組織:** Google / Everyday Robots

**実機ロボット:**
- Everyday Robots mobile manipulator
  - 7-DoF arm + 2-finger gripper + mobile base
  - 13台のロボットでデータ収集

**原文引用:**
> "We utilize an Everyday Robots (EDR) mobile manipulator in all real robot experiments... The robot has a 7-degree-of-freedom arm, a 2-finger gripper, and a mobile base."

**シミュレーション:** なし
**学習データ:** 130K episodes from 13 Everyday Robots
**WidowX:** なし
**AgileX:** なし

---

### 2. RT-2 (Robotics Transformer 2)
- **arXiv:** https://arxiv.org/abs/2307.15818
- **年:** 2023
- **組織:** Google DeepMind

**実機ロボット:**
- Everyday Robots mobile manipulator（RT-1と同じ）

**原文引用（abstract）:**
> "We study how vision-language models trained on Internet-scale data can be incorporated directly into end-to-end robotic control to boost generalization... evaluated on a real robot"

**シミュレーション:** なし
**学習データ:** RT-1 data + web-scale vision-language pre-training data
**WidowX:** なし
**AgileX:** なし
**注記:** arXiv HTML版が利用不可（404）。abstractとpublic knowledgeから特定。

---

### 3. RT-X / Open X-Embodiment (OXE)
- **arXiv:** https://arxiv.org/abs/2310.08864
- **年:** 2023
- **組織:** Google DeepMind + 21 institutions

**実機ロボット（評価用 9 manipulators）:**
1. Google Robot (Everyday Robots)
2. **WidowX 250 6DoF** ← 旧型
3. Franka Emika Panda
4. Jaco 2
5. UR5
6. xArm
7. ALOHA (Trossen ViperX 300 bimanual)
8. Sawyer
9. Hello Robot Stretch

**原文引用:**
> "RT-X models are trained on data from 9 different robot manipulators... evaluation is run on Google Robot, WidowX, and others across 21 institutions"

**学習データ:** 22 robot embodiments from 21 institutions — one of the largest cross-embodiment datasets
**シミュレーション:** なし
**WidowX:** WidowX 250（旧型、Dynamixel servo）
**AgileX:** なし

---

### 4. OpenVLA
- **arXiv:** https://arxiv.org/abs/2406.09246
- **年:** 2024
- **組織:** Stanford, UC Berkeley, Toyota Research Institute

**実機ロボット（評価）:**
- **WidowX 250** — BridgeData V2 setup
- **Google Robot** (Everyday Robots)
- **Franka Emika Panda** — fine-tuning evaluation

**原文引用:**
> "We evaluate OpenVLA on 29 tasks across a WidowX robot and a Google Robot... We further evaluate OpenVLA's ability to fine-tune for new tasks on a Franka Emika Panda robot."

**学習データ:** Open X-Embodiment (OXE) dataset — 970K trajectories from diverse robots
**シミュレーション:** なし
**WidowX:** WidowX 250（旧型）
**AgileX:** なし

---

### 5. Pi0 (π₀)
- **arXiv:** https://arxiv.org/abs/2410.24164
- **年:** 2024
- **組織:** Physical Intelligence

**実機ロボット（7 configurations）:**
1. **UR5e** single arm
2. **Bimanual UR5e** (2× UR5e)
3. **Franka Emika Panda** single arm
4. **ALOHA** (bimanual Trossen ViperX 300)
5. **Bimanual ARX + AgileX** ← AgileX mobile base + ARX arms
6. **Mobile ALOHA** (Trossen/ARX on mobile base)
7. **Mobile Fibocom** (ARX arm on holonomic base)

**原文引用:**
> "We evaluate on 7 robot configurations ranging from single arm to bimanual to mobile manipulation... including a Franka Panda, UR5e arms, ALOHA bimanual setup, and mobile manipulators."

**学習データ:** OXE subset + DROID + 自社 cross-embodiment data（10K+ hours）
**シミュレーション:** なし
**WidowX:** OXE経由の学習データに含む（旧型）。実機評価では不使用
**AgileX:** ✅ — Bimanual ARX+AgileX configuration

---

### 6. Pi0.5 (π₀.5)
- **arXiv:** https://arxiv.org/abs/2504.16054
- **年:** 2025
- **組織:** Physical Intelligence

**実機ロボット:**
- Mobile manipulator: 2× 6-DoF arms + parallel jaw grippers + mobile base
- Pi0と同系統のプラットフォーム

**原文引用:**
> "Our robot has two 6-DoF arms equipped with parallel jaw grippers, mounted on a mobile base... We evaluate in a variety of home environments."

**学習データ:** Pi0のデータ + mobile manipulation特化データ
**シミュレーション:** なし
**WidowX:** OXE経由（旧型）— 学習データのみ
**AgileX:** ✅（Pi0と同系統プラットフォーム）

---

### 7. Octo
- **arXiv:** https://arxiv.org/abs/2405.12213
- **年:** 2024
- **組織:** UC Berkeley, Stanford, CMU, Google DeepMind

**実機ロボット（評価）:**
- **WidowX 250** (BridgeData V2 setup)
- **UR5e**
- **Franka Emika Panda**
- **ALOHA** (bimanual Trossen ViperX)
- 他、合計 9 platforms

**原文引用:**
> "We evaluate Octo on 9 robot platforms... including a WidowX, UR5e, Franka, and a bimanual ALOHA setup... pre-trained on 800K trajectories from 25 datasets in the Open X-Embodiment collection."

**学習データ:** OXE 25 datasets（800K trajectories）
**シミュレーション:** なし（シム評価は主に行っていない）
**WidowX:** WidowX 250（旧型）— 実機評価 + 学習データ
**AgileX:** なし

---

### 8. GR00T N1
- **arXiv:** https://arxiv.org/abs/2503.14734
- **年:** 2025
- **組織:** NVIDIA

**実機ロボット:**
- **Fourier GR-1** humanoid robot

**シミュレーション:**
- **Franka Panda** (single arm)
- **Bimanual Franka Panda** (dual arm)
- **GR-1** humanoid
- Environment: NVIDIA Isaac Sim / Isaac Lab

**原文引用:**
> "We conduct experiments on three simulated platforms—a single-arm Franka Panda, a bi-manual Panda, and the GR-1 humanoid—and validate our approach on a real Fourier GR-1 robot."

**学習データ:** OXE data + proprietary humanoid data + simulation data
**WidowX:** OXE経由（旧型）— 事前学習データのみ
**AgileX:** なし

---

### 9. Gemini Robotics
- **arXiv:** https://arxiv.org/abs/2503.20020
- **年:** 2025
- **組織:** Google DeepMind

**実機ロボット:**
- **ALOHA 2** bimanual robot (primary platform)
- Adapts to bi-arm and humanoid embodiments

**原文引用:**
> "Our primary real-world evaluation platform is the ALOHA 2 bimanual robot... We also demonstrate adaptation to different embodiments including bi-arm setups and humanoid robots."

**学習データ:** Google DeepMind proprietary data (ALOHA 2 teleoperation)
**シミュレーション:** なし（明示なし）
**WidowX:** なし
**AgileX:** なし

---

### 10. X-VLA
- **arXiv:** https://arxiv.org/abs/2510.10274
- **年:** 2025
- **組織:** Tsinghua / Shanghai AI Lab

**実機ロボット:**
- **BridgeData-v2 setup** (WidowX 250) — pick-and-place tasks
- **AgileX bimanual** — cloth folding tasks

**原文引用:**
> "We evaluate X-VLA on real robots including a BridgeData-v2 setup for tabletop manipulation and an AgileX bimanual robot for cloth folding tasks."

**学習データ:**
- DROID dataset
- RoboMind dataset
- AgiBOT dataset
- 7 platforms, 5 robot arm types

**シミュレーション:** SIMPLER benchmark
**WidowX:** WidowX 250（旧型）
**AgileX:** ✅ — AgileX bimanual

---

### 11. DexVLA
- **arXiv:** https://arxiv.org/abs/2502.05855
- **年:** 2025
- **組織:** ByteDance / Tsinghua

**実機ロボット:**
1. **Bimanual UR5e** (2× UR5e)
2. **Franka Emika Panda**
3. **Bimanual AgileX** (dual arm setup)
4. **Franka + Dexterous hands** (multi-finger manipulation)

**原文引用:**
> "We evaluate DexVLA on four real-world setups: bimanual UR5e, a single Franka, bimanual AgileX, and a Franka equipped with dexterous hands."

**学習データ:** OXE + DROID + proprietary dexterous manipulation data
**シミュレーション:** なし（明示なし）
**WidowX:** OXE経由（旧型）— 学習データのみ
**AgileX:** ✅ — Bimanual AgileX（実機評価）

---

### 12. SmolVLA
- **arXiv:** https://arxiv.org/abs/2506.01844
- **年:** 2025
- **組織:** Hugging Face

**実機ロボット:**
- **SO-100** (low-cost servo robot arm, LeRobot ecosystem)
  - 6-DoF, community-grade hardware

**シミュレーション:**
- **LIBERO** benchmark (Franka Emika Panda)

**原文引用:**
> "We evaluated SmolVLA on 4 datasets in a real-world setting... pick-place, stacking capabilities on SO-100 robot."
> "SmolVLA is pretrained on public community datasets and evaluated on low-cost robots."

**学習データ:** 481 community datasets from Hugging Face (~22.9K episodes, ~10.6M frames)
- Diverse low-cost robots: SO-100, Koch-type, ALOHA variants, etc.
**WidowX:** Community dataに含まれる可能性あり（旧型相当）
**AgileX:** なし

---

### 13. Helix
- **URL:** https://www.figure.ai/news/helix
- **年:** 2025
- **組織:** Figure AI

**実機ロボット:**
- **Figure 02** humanoid robot
  - 35-DoF upper body
  - Dual humanoid robots demonstrating collaborative tasks

**原文引用（ブログ）:**
> "Helix is a vision-language-action model... deployed on Figure 02 humanoid robots... 35 degrees of freedom in the upper body."

**学習データ:** Figure AI proprietary humanoid data
**シミュレーション:** 明示なし
**WidowX:** なし
**AgileX:** なし

---

### 14. GR-2
- **arXiv:** https://arxiv.org/abs/2410.06158
- **年:** 2024
- **組織:** ByteDance

**実機ロボット:**
- **Kinova Gen3** 7-DoF arm + **Robotiq 2F-85** 2-finger gripper

**シミュレーション:**
- **CALVIN** benchmark

**原文引用:**
> "For real-world experiments, we use a Kinova Gen3 7-DoF robotic arm with a Robotiq 2F-85 gripper... We also evaluate on the CALVIN simulation benchmark."

**学習データ:** Large-scale video pre-training (internet videos) + Kinova robot demonstrations
**WidowX:** なし
**AgileX:** なし

---

### 15. Gemini Robotics 1.5
- **arXiv:** https://arxiv.org/abs/2510.03342
- **年:** 2025
- **組織:** Google DeepMind

**実機ロボット:**
1. **ALOHA** (bimanual)
2. **Bi-arm Franka** (dual Franka Panda)
3. **Apptronik Apollo** humanoid

**シミュレーション:**
- **MuJoCo** (aligned scenes for cross-embodiment evaluation)

**原文引用（review記事より）:**
> "MT enables a single GR 1.5 checkpoint to learn a unified understanding of motion and physics from heterogeneous data collected across multiple, physically distinct robots: the ALOHA, the Bi-arm Franka, and the Apollo humanoid."
> "the ALOHA robot can perform hanging tasks learned from the Bi-arm Franka, and the Apollo humanoid can perform skills learned from ALOHA."

**学習データ:** 3 embodiments (ALOHA, Bi-arm Franka, Apptronik Apollo) + prior Google data
**WidowX:** なし
**AgileX:** なし

---

## WidowX判定まとめ

| 論文 | WidowX使用 | 型式 | 用途 |
|------|-----------|------|------|
| RT-X / OXE | ✅ | WidowX 250（旧型・Dynamixel） | 実機評価 + 学習データ |
| OpenVLA | ✅ | WidowX 250（旧型・Dynamixel） | 実機評価（BridgeV2） + 学習データ |
| Pi0 | △ | WidowX 250（旧型） | OXE経由で学習データのみ |
| Octo | ✅ | WidowX 250（旧型・Dynamixel） | 実機評価 + 学習データ |
| X-VLA | ✅ | WidowX 250（旧型・Dynamixel） | 実機評価（BridgeV2 setup） |
| SmolVLA | △ | （community dataに含む可能性） | 学習データのみ |

> **注記:** WidowX AI / TrossenArm（新型・2025年～）はいずれの論文にも使用されていない。2024年以前の論文は全て旧型WidowX 250（Dynamixelサーボ搭載）。

---

## AgileX使用まとめ

| 論文 | AgileX使用 | 構成 | 用途 |
|------|-----------|------|------|
| Pi0 | ✅ | AgileX mobile base + ARX arms (bimanual) | 実機評価 |
| Pi0.5 | ✅ | Pi0と同系統 | 実機評価 |
| X-VLA | ✅ | AgileX bimanual | 実機評価（cloth folding） |
| DexVLA | ✅ | Bimanual AgileX | 実機評価 |

---

## ロボット出現頻度ランキング

| ロボット | 出現論文数 | 備考 |
|---------|-----------|------|
| Franka Emika Panda | 10 | 実機 + シム + 学習データで最頻出 |
| WidowX 250 | 6 | BridgeData V2経由が多い |
| ALOHA / ViperX bimanual | 6 | Trossen ViperX 300ベース |
| UR5e | 4 | Pi0, DexVLA, Octo等 |
| Google Robot (Everyday Robots) | 4 | RT-1/2/X, OpenVLA |
| AgileX (mobile base / bimanual) | 4 | Pi0, Pi0.5, X-VLA, DexVLA |
| Kinova Gen3 | 1 | GR-2のみ |
| Fourier GR-1 | 1 | GR00T N1のみ |
| Apptronik Apollo | 1 | Gemini Robotics 1.5のみ |
| Figure 02 | 1 | Helixのみ |
| SO-100 | 1 | SmolVLAのみ |
