# VLA論文におけるロボットアーム使用統計サーベイ

> 調査日: 2026-02-12  
> 調査対象: 主要VLA（Vision-Language-Action）論文・プロジェクト 25+件

---

## 1. 論文×ロボット対応表

### Foundation Models / VLA

| # | 論文/プロジェクト | 年 | 使用ロボット（実機） | リンク |
|---|---|---|---|---|
| 1 | **RT-1** (Google) | 2022 | Google Robot (Everyday Robots) | [arXiv:2212.06817](https://arxiv.org/abs/2212.06817) |
| 2 | **RT-2** (Google DeepMind) | 2023 | Google Robot (Everyday Robots) | [arXiv:2307.15818](https://arxiv.org/abs/2307.15818) |
| 3 | **RT-X / Open X-Embodiment** (Google DeepMind + 21機関) | 2023 | 22種以上（Google Robot, WidowX 250, Franka Panda, UR5/UR5e, xArm, Jaco, Kuka IIWA, PR2, Sawyer 等） | [arXiv:2310.08864](https://arxiv.org/abs/2310.08864) |
| 4 | **OpenVLA** (Stanford) | 2024 | WidowX 250, Google Robot, Franka Panda（fine-tune） | [arXiv:2406.09246](https://arxiv.org/abs/2406.09246) |
| 5 | **π0 (Pi0)** (Physical Intelligence) | 2024 | UR5e（単腕）, Bimanual UR5e, Franka Panda, Bimanual Trossen ViperX (ALOHA), Bimanual ARX, Mobile Trossen（ARX/ViperX + モバイルベース）, Mobile Fibocom | [arXiv:2410.24164](https://arxiv.org/abs/2410.24164) |
| 6 | **π0.5 (Pi0.5)** (Physical Intelligence) | 2025 | π0と同系列のモバイルマニピュレータ（Trossen ViperX/ARX ベース） | [arXiv:2504.16054](https://arxiv.org/abs/2504.16054) |
| 7 | **Octo** (UC Berkeley) | 2024 | WidowX 250, UR5, Franka Panda（OXEデータで学習、3種で評価） | [arXiv:2405.12213](https://arxiv.org/abs/2405.12213) |
| 8 | **GR00T N1** (NVIDIA) | 2025 | Fourier GR-1（ヒューマノイド）, 1X Neo（ヒューマノイド）; シミュレーションで単腕・双腕・ヒューマノイド | [arXiv:2503.14734](https://arxiv.org/abs/2503.14734) |
| 9 | **Gemini Robotics** (Google DeepMind) | 2025 | ALOHA 2（Trossen ViperX）, Bi-arm Franka FR3, Apptronik Apollo（ヒューマノイド） | [arXiv:2503.20020](https://arxiv.org/abs/2503.20020) |
| 10 | **X-VLA** (Tsinghua/Shanghai AI Lab) | 2025 | WidowX 250（シミュレーション）, Franka Panda（シミュレーション）, AIRBOT Play（実機）; 計6シミュ + 3実ロボ | [arXiv:2510.10274](https://arxiv.org/abs/2510.10274) |
| 11 | **DexVLA** | 2025 | Bimanual UR5e, Franka Panda + Dexterous Hand（Allegro等）, Bimanual Trossen ViperX (ALOHA) | [arXiv:2502.05855](https://arxiv.org/abs/2502.05855) |
| 12 | **UniVLA** (HKU/OpenDriveLab) | 2025 | AgileX COBOT Magic V2.0, AgileX PiPER | [arXiv:2505.06111](https://arxiv.org/abs/2505.06111) |
| 13 | **SmolVLA** (HuggingFace/LeRobot) | 2025 | SO-100, SO-101 | [arXiv:2506.01844](https://arxiv.org/abs/2506.01844) |
| 14 | **Helix** (Figure AI) | 2025 | Figure 02（自社開発ヒューマノイド、35DoF上半身） | [figure.ai/news/helix](https://www.figure.ai/news/helix) |

### Policy / Dataset / Hardware 系

| # | 論文/プロジェクト | 年 | 使用ロボット（実機） | リンク |
|---|---|---|---|---|
| 15 | **ALOHA** (Stanford) | 2023 | Trossen ViperX 300 6DoF × 2（follower）+ WidowX（leader） | [arXiv:2304.13705](https://arxiv.org/abs/2304.13705) |
| 16 | **ALOHA 2** (Google DeepMind/Stanford) | 2024 | Trossen ViperX 300 6DoF × 2（follower）+ WidowX（leader）— 改良版 | [arXiv:2405.02292](https://arxiv.org/abs/2405.02292) |
| 17 | **Mobile ALOHA** (Stanford) | 2024 | Trossen ViperX 300 × 2 + モバイルベース | [arXiv:2401.02117](https://arxiv.org/abs/2401.02117) |
| 18 | **ACT** (Action Chunking with Transformers) | 2023 | Trossen ViperX 300 × 2 (ALOHA setup) | [arXiv:2304.13705](https://arxiv.org/abs/2304.13705)（ALOHAと同一論文） |
| 19 | **Diffusion Policy** (Columbia/MIT) | 2023 | UR5, Franka Panda | [arXiv:2303.04137](https://arxiv.org/abs/2303.04137) |
| 20 | **RoboMIND** (X-Humanoid) | 2024 | Franka Emika Panda, AgileX COBOT Magic V2.0, UR5e, Tien Kung（ヒューマノイド） | [arXiv:2412.13877](https://arxiv.org/abs/2412.13877) |
| 21 | **AgiBot World** (AgiBot/OpenDriveLab) | 2025 | AgiBot G1（自社開発ホイール型ヒューマノイド、100台以上で収集） | [arXiv:2503.06669](https://arxiv.org/abs/2503.06669) |
| 22 | **DROID** dataset | 2024 | Franka Panda（13機関で統一ハードウェア） | [arXiv:2403.12945](https://arxiv.org/abs/2403.12945) |
| 23 | **BridgeData V2** (UC Berkeley) | 2023 | WidowX 250 6DoF | [arXiv:2308.12952](https://arxiv.org/abs/2308.12952) |
| 24 | **Open X-Embodiment** | 2023 | 22種以上のロボット（上記RT-Xと同一プロジェクト） | [arXiv:2310.08864](https://arxiv.org/abs/2310.08864) |

### 追加の注目VLA論文

| # | 論文/プロジェクト | 年 | 使用ロボット（実機） | リンク |
|---|---|---|---|---|
| 25 | **GR-2** (ByteDance) | 2024 | Kinova Gen3 7DoF + Robotiq 2F-85 グリッパー（実機）, GR-1系（sim） | [arXiv:2410.06158](https://arxiv.org/abs/2410.06158) |
| 26 | **ALOHA Unleashed** (Google DeepMind) | 2024 | ALOHA 2 (Trossen ViperX) | [arXiv:2410.13126](https://arxiv.org/abs/2410.13126) |
| 27 | **Gemini Robotics 1.5** (Google DeepMind) | 2025 | ALOHA, Bi-arm Franka, Apollo (Apptronik) | [arXiv:2510.03342](https://arxiv.org/abs/2510.03342) |
| 28 | **GR-Dexter** (ByteDance) | 2025 | ByteDexter V2 手 + カスタムアーム | [arXiv:2512.24210](https://arxiv.org/abs/2512.24210) |
| 29 | **ET-VLA** (Embodiment Transfer) | 2025 | Bimanual UR5e, Bimanual Franka, Bimanual AgileX | [arXiv:2511.01224](https://arxiv.org/abs/2511.01224) |

---

## 2. ロボット別の使用論文数ランキング

| 順位 | ロボットプラットフォーム | 使用論文/プロジェクト数 | 主な論文 |
|------|------------------------|------------------------|---------|
| **1** | **Franka Emika Panda / FR3** | **14+** | DROID, Diffusion Policy, Octo, OpenVLA, Pi0, DexVLA, Gemini Robotics, X-VLA, RoboMIND, ET-VLA, RT-X/OXE等 |
| **2** | **Trossen ViperX 300 (ALOHA系)** | **10+** | ALOHA, ALOHA 2, Mobile ALOHA, ACT, Pi0, DexVLA, Gemini Robotics, ALOHA Unleashed, Gemini Robotics 1.5等 |
| **3** | **WidowX 250** | **8+** | BridgeData V2, OpenVLA, Octo, RT-X/OXE, X-VLA (sim), ALOHA (leader arm)等 |
| **4** | **UR5 / UR5e** | **7+** | Diffusion Policy, Octo, Pi0, DexVLA, RoboMIND, ET-VLA, RT-X/OXE等 |
| **5** | **Google Robot (Everyday Robots)** | **4** | RT-1, RT-2, RT-X/OXE, OpenVLA |
| **6** | **AgileX COBOT Magic** | **4** | UniVLA, RoboMIND, ET-VLA, X-VLA(Soft-Fold) |
| **7** | **ヒューマノイド各種** | — | （以下個別） |
| 7a | Fourier GR-1 | 2 | GR00T N1, GR00T N1.5 |
| 7b | Figure 02 | 1 | Helix |
| 7c | Apptronik Apollo | 2 | Gemini Robotics, Gemini Robotics 1.5 |
| 7d | 1X Neo | 1 | GR00T N1 |
| 7e | Tien Kung | 1 | RoboMIND |
| 7f | AgiBot G1 | 1 | AgiBot World |
| **8** | **AgileX PiPER** | **3** | UniVLA（実機メイン）, AFI, X-VLA（言及） |
| **9** | **AIRBOT Play** | **1** | X-VLA |
| **10** | **SO-100 / SO-101** | **1** | SmolVLA |
| **11** | **ARX アーム** | **1+** | Pi0（Bimanual ARX, Mobile ARX） |
| **12** | **UFACTORY xArm** | **1+** | RT-X/OXE内（UTokyo xArm等） |

---

## 3. 年別トレンド

### 2022–2023: 初期VLA時代
- **主力**: Google Robot (Everyday Robots), WidowX 250, Franka Panda, UR5
- RT-1/RT-2はGoogle Robot専用。BridgeData V2によりWidowX 250が低コスト研究の標準に
- ALOHAの登場でTrossen ViperX 300が双腕テレオペの標準に
- Diffusion Policyの成功でFranka/UR5の利用が加速

### 2024: スケーリング元年
- **Frankaが最頻出**: DROID（13機関統一Franka）、OpenVLA、Octo全てでFranka使用
- **ALOHA系の拡大**: Pi0が7種のプラットフォームを同時使用、うち中核はALOHA（ViperX）
- **OXEデータセット**により22種のロボットがクロスエンボディメント学習に参加
- Google Robotは2023年Everyday Robots解散後、新規採用なし

### 2025: 多様化＋ヒューマノイド台頭
- **ヒューマノイドの急増**: GR00T N1→Fourier GR-1/1X Neo、Gemini Robotics→Apollo、Helix→Figure 02、AgiBot World→AgiBot G1
- **中国系プラットフォームの台頭**: AgileX COBOT Magic（RoboMIND, UniVLA）、AgileX PiPER（UniVLA）、AIRBOT Play（X-VLA）
- **低コスト勢の参入**: SO-100/SO-101 + SmolVLA、LeRobot エコシステム
- **Frankaは依然最多**だが、DROIDデータへの依存度が高く、新規採用では多様化が進行
- **Trossen ViperX (ALOHA)** はGemini Robotics/ALOHA Unleashedで引き続き中核

### 2026（推定トレンド）
- ヒューマノイド + VLAの統合がさらに加速（GR00T N1.5、Helix 02等）
- 低コストアーム（SO-101、PiPER等）+ コミュニティデータの拡大
- WidowX AI（新世代Trossen）の採用開始の可能性

---

## 4. WidowX 250 vs WidowX AI の明確な区別

### WidowX 250（旧世代）
- **メーカー**: Trossen Robotics / Interbotix
- **モーター**: DYNAMIXEL X-Series スマートサーボ（Robotis製）
- **DoF**: 5DoF / 6DoF
- **ペイロード**: 250g
- **特徴**: 低コスト（〜$3,000–4,000）、BridgeData V2で広く普及
- **使用論文**: BridgeData V2, OpenVLA, Octo, RT-X/OXE, X-VLA (Simpler-WidowX), ALOHA/ALOHA 2 (leader arm)

### WidowX AI / TrossenArm（新世代・2025年〜）
- **メーカー**: Trossen Robotics
- **モーター**: 自社開発 QDD（Quasi-Direct Drive）サーボ
- **コントローラー**: iNerve® コントローラー
- **特徴**: 高トルク、高精度、バックドライバビリティ向上、Intel RealSense D405 搭載（Follower版）
- **ソフトウェア**: OpenPI（Pi0/Pi0.5）公式統合、LeRobot/ROS2/MuJoCo/NVIDIA Isaac 対応
- **使用論文**: **2026年2月時点で主要VLA論文での直接的な採用報告は確認されていない**
  - ただしTrossenが公式にOpenPI（Physical Intelligence）との統合を発表済み
  - 今後Pi0/Pi0.5エコシステムで採用が広がる見込み

### 結論
**現時点（2026年2月）のVLA論文で使われているWidowXは全て旧世代のWidowX 250（Dynamixelサーボ）**。WidowX AI/TrossenArmはハードウェアとしては出荷が開始されているが、査読付きVLA論文での採用報告はまだない。

---

## 5. AgileX系の採用状況まとめ

### AgileX COBOT Magic V2.0
- **タイプ**: 双腕ロボット（各腕6DoF + グリッパー）
- **採用論文**:
  - **RoboMIND** (2024): 8,030軌道を収集、4種エンボディメントの1つ
  - **UniVLA** (2025): 論文中のreal-worldプラットフォームとして使用
  - **ET-VLA** (2025): Bimanual AgileXとして評価対象

### AgileX PiPER
- **タイプ**: 単腕6DoFコボット、低コスト（教育・研究向け）
- **採用論文**:
  - **UniVLA** (2025): Case Study（ROS Discourse公開）として検証
  - OpenDriveLab公式のreal-deviceテストプラットフォーム

### AgileX NERO
- **タイプ**: 7DoF研究用ロボットアーム（580mmリーチ、4.8kg超軽量）
- **採用論文**: **2026年2月時点で主要VLA論文での採用は未確認**
  - 2025年後半リリースのため今後の採用拡大が期待される

### AgileX系まとめ
| モデル | 使用論文数 | 採用開始年 | 主な用途 |
|--------|-----------|-----------|---------|
| COBOT Magic V2.0 | 3 | 2024 | 双腕VLA学習・データ収集 |
| PiPER | 3 | 2025 | 低コスト単腕VLA検証 |
| NERO | 0 | — | 未採用（新製品） |

AgileX系は特にOpenDriveLab（AgiBot World, UniVLA）を中心とした中国系研究エコシステムで急速に採用が拡大している。Mobile ALOHA互換のCOBOT Magic V2.0が最も実績があり、2024-2025年の中国系VLA論文での標準的な双腕プラットフォームとなりつつある。

---

## 6. プラットフォーム別サマリー図

```
使用論文数（概算）

Franka Panda/FR3    ████████████████ 14+
Trossen ViperX      ██████████████   10+
(ALOHA系)
WidowX 250          ████████████     8+
UR5/UR5e            ██████████       7+
Google Robot (EDR)  ████████         4
AgileX COBOT Magic  ████████         4
Fourier GR-1        ████             2
Apptronik Apollo    ████             2
AgileX PiPER        ██████           3
SO-100/SO-101       ██               1
AIRBOT Play         ██               1
Figure 02           ██               1
1X Neo              ██               1
AgiBot G1           ██               1
```

---

## 7. 注記・制約

1. **カウント方法**: 実機での使用を確認できたものを中心にカウント。シミュレーションのみの利用は（sim）と注記
2. **OXEデータ**: Open X-Embodimentには60以上のデータセットが含まれるが、各VLAがどのサブセットを実際に使用したかは論文により異なる
3. **WidowX/ViperXの区別**: ALOHA系ではfollowerがViperX 300、leaderがWidowX。別機種だが同一プラットフォームとしてカウント
4. **ヒューマノイド**: 腕単体ではなく全身プラットフォームとして扱い、従来のロボットアームとは分けて整理
5. **年の基準**: arXiv初投稿年を基準
6. **OpenArm 01**: 2025年にEnacticからオープンソース公開されたが、主要VLA論文での採用は未確認

---

## 8. ICLR 2026 VLA論文における使用ロボット（追加調査）

> 出典: [ICLRに投稿されているVLA論文まとめ（川村, 東京科学大学 横田研）](https://zenn.dev/masakichi210/articles/623c147e335792)
> 約80本のICLR 2026投稿論文から、実機評価で使われたロボットを抽出。

| 論文 | 使用ロボット（実機） | 備考 |
|------|---------------------|------|
| **UniVLA** | AgileX COBOT Magic V2.0, AgileX PiPER, ALOHA | World Model+Policy統合。AgileX系で実機評価 |
| **OmniAction / RoboOmni** | **WidowX 250S**（旧型） | 音声+視覚のマルチモーダル。旧WidowX使用 |
| **UniCoD** | Franka, UFACTORY xArm | 理解→予測→行動の統合 |
| **VLA-IN-THE-LOOP** | Xiaomi Robot, ALOHA | World Modelによる介入 |
| **RobotArena∞** | BridgeSim, DROIDSim, RH20TSim（シミュレーション） | 実機なし |
| **DSVLABench** | CALVIN（シミュレーション） | 実機なし |
| **AutoBio** | シミュレーション（π0, π0.5, RDT評価） | 生物実験ラボ環境 |
| **WorldGym** | Bridge robot / Google Robot（シミュレーション） | World Modelベース評価 |
| **MV-RoboBench** | AgiWorld, BridgeV2データ使用 | マルチビューVQA |
| **RoboInter-VLA** | DROID/OXE由来（Franka等） | 中間表現アノテーション |
| **UniHand** | 実機（Pick-Place-Toy等）※ロボット不明 | 人手動画→ロボット転移 |

### ICLR 2026追加データによるランキング更新

| ロボット | 追加論文数 | 累計 |
|----------|-----------|------|
| Franka Panda/FR3 | +2（UniCoD, RoboInter） | **16+** |
| ALOHA系（ViperX） | +2（UniVLA, VLA-IN-THE-LOOP） | **12+** |
| WidowX 250（旧） | +1（OmniAction） | **9+** |
| AgileX COBOT Magic | +1（UniVLA） | **4** |
| AgileX PiPER | +1（UniVLA） | **3** |
| UFACTORY xArm | +1（UniCoD） | **2+** |
| WidowX AI（新） | 0 | **0** |

---

*Last updated: 2026-02-12*
