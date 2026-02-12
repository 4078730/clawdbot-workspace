# VLA論文 ハードウェア完全サーベイ（30論文）

> 調査日: 2026-02-12  
> 調査方法: 各論文のExperimentsセクションからロボットハードウェア・カメラ・センサーを正確に抽出  
> 対象: 主要VLA/Policy論文 30件

---

## 1. 論文別ハードウェア詳細

### 1.1 Foundation VLA Models

| # | 論文 | 年 | ロボット（実機） | カメラ/センサー | DoF/アクション空間 |
|---|------|------|----------------|----------------|-------------------|
| 1 | **π0 (Pi0)** | 2024 | UR5e（単腕）, Bimanual UR5e, Franka Panda, Bimanual Trossen ViperX (ALOHA), Bimanual ARX, Bimanual AgileX, Mobile Trossen (ViperX+モバイルベース), Mobile ARX, Mobile Fibocom (ARX arms+ホロノミックベース) | 手首カメラ+ベースカメラ（構成依存） | 7D（単腕）〜16D（モバイル双腕） |
| 2 | **π0.5 (Pi0.5)** | 2025 | π0と同系列のモバイルマニピュレータ（Trossen ViperX/ARXベース） | π0と同様 | π0と同様 |
| 3 | **OpenVLA** | 2024 | WidowX 250 (BridgeData V2), Google Robot (RT-2データ), Franka Panda (fine-tune) | BridgeData V2標準カメラ | 7D |
| 4 | **Octo** | 2024 | WidowX 250, UR5, Franka Panda（OXEデータで学習、3種で実機評価） | 各プラットフォーム標準 | 7D |
| 5 | **X-VLA** | 2025 | AIRBOT Play（実機）; WidowX 250（Simpler-WidowX sim）, Franka（sim）; Bi-manual AgileX (Soft-Fold dataset, 1,200軌道) | 実機構成は論文参照 | 各プラットフォーム依存 |
| 6 | **UniVLA** | 2025 | AgileX PiPER 7DoF（実機メイン）, AgileX COBOT Magic V2.0（言及） | Orbbec カメラ（サードビュー） | 7D |
| 7 | **DexVLA** | 2025 | Bimanual UR5e, Franka Panda + Dexterous Hand (Allegro等), Bimanual AgileX | 各プラットフォーム標準 | 12D（Franka+Dex hand）, 14D（双腕） |
| 8 | **SmolVLA** | 2025 | SO-100, SO-101（実機4データセット）, Franka Panda（評価で言及） | 標準カメラ | 6D |
| 9 | **GR00T N1** | 2025 | Fourier GR-1（ヒューマノイド, 双腕操作）, 1X Neo（ヒューマノイド）; シミュレーションで単腕・双腕・ヒューマノイド | 各プラットフォーム標準 | ヒューマノイド全身 |
| 10 | **Gemini Robotics** | 2025 | ALOHA 2 (Trossen ViperX), Bi-arm Franka FR3, Apptronik Apollo（ヒューマノイド） | 各プラットフォーム標準 | 各プラットフォーム依存 |
| 11 | **Helix** (Figure AI) | 2025 | Figure 02（自社ヒューマノイド, 35DoF上半身） | 自社センサー | 35D（上半身） |
| 12 | **GR-2** (ByteDance) | 2024 | Kinova Gen3 7DoF + Robotiq 2F-85 グリッパー | 静止ヘッドカメラ + 手首カメラ | 7D（カルテシアン空間） |

### 1.2 Policy / Dataset 系

| # | 論文 | 年 | ロボット（実機） | カメラ/センサー | DoF/アクション空間 |
|---|------|------|----------------|----------------|-------------------|
| 13 | **RT-1** | 2022 | Google Robot (Everyday Robots) | 本体搭載カメラ | 7D |
| 14 | **RT-2** | 2023 | Google Robot (Everyday Robots) | 本体搭載カメラ | 7D |
| 15 | **RT-X / Open X-Embodiment** | 2023 | 22種以上（Google Robot, WidowX 250, Franka, UR5/UR5e, xArm, Jaco, Kuka IIWA, PR2, Sawyer等） | データセット依存 | 各種 |
| 16 | **ALOHA** / **ACT** | 2023 | Trossen ViperX 300 6DoF × 2（follower）+ WidowX 250（leader） | 手首カメラ×2 + ベースカメラ | 14D（双腕） |
| 17 | **ALOHA 2** | 2024 | Trossen ViperX 300 6DoF × 2（follower）+ WidowX 250（leader）— 改良版 | 手首カメラ×2 + ベースカメラ | 14D（双腕） |
| 18 | **Mobile ALOHA** | 2024 | Trossen ViperX 300 × 2 + モバイルベース | 手首カメラ×2 + トップカメラ | 16D（14D双腕+2Dベース） |
| 19 | **ALOHA Unleashed** | 2024 | ALOHA 2 (Trossen ViperX 300 × 2) | 手首カメラ + オーバーヘッド | 12D（各6DoF腕×2）+ 2Dグリッパー |
| 20 | **Diffusion Policy** | 2023 | UR5（PushT等）, Franka Panda（6DoF pouring等） | Intel RealSense D415 × 2（UR5）| 2D（PushT）〜6D |
| 21 | **RoboMIND** | 2024 | Franka Emika Panda, AgileX dual-arm (COBOT Magic V2.0), UR5e, Tien Kung（ヒューマノイド） | 各プラットフォーム標準 | 各種 |
| 22 | **DROID** | 2024 | Franka Panda（13機関で統一、564シーン） | 3カメラビュー + 深度情報 | 7D |
| 23 | **BridgeData V2** | 2023 | WidowX 250 6DoF（24環境、60,096軌道） | 固定カメラ | 7D |
| 24 | **AgiBot World** | 2025 | AgiBot G1（自社ホイール型, 100台以上） | ZED カメラ | 自社仕様 |

### 1.3 追加の注目論文

| # | 論文 | 年 | ロボット（実機） | カメラ/センサー | DoF/アクション空間 |
|---|------|------|----------------|----------------|-------------------|
| 25 | **ET-VLA** | 2025 | Bimanual UR5 × 2 + Robotiq グリッパー; Bimanual Franka; Bimanual AgileX（RoboTwin sim） | Intel RealSense D457（オーバーヘッド）, RealSense 435i（手首×2） | 各プラットフォーム依存 |
| 26 | **AFI** | 2025 | AgileX PiPER | Intel RealSense D435 × 2 | 7D |
| 27 | **GR-Dexter** | 2025 | ByteDexter V2 hand + カスタムアーム | 自社センサー | 高DoF |
| 28 | **Gemini Robotics 1.5** | 2025 | ALOHA, Bi-arm Franka, Apollo (Apptronik) | 各プラットフォーム標準 | 各種 |
| 29 | **CogACT** | 2024 | Franka Emika Panda 7DoF | Intel RealSense D415 × 4 | 7D |
| 30 | **SpatialVLA** | 2025 | UFACTORY xArm（Rope, Granular deformable tasks）; シミュレーション中心 | 各プラットフォーム標準 | 各種 |

---

## 2. ロボット別使用統計（確定版）

### 2.1 ロボットアーム（非ヒューマノイド）

| 順位 | ロボット | 論文数 | 使用論文 |
|------|----------|--------|---------|
| **1** | **Franka Emika Panda / FR3** | **16+** | DROID, Diffusion Policy, Octo, OpenVLA, Pi0, DexVLA, X-VLA(sim), Gemini Robotics, Gemini 1.5, RoboMIND, ET-VLA, SmolVLA, CogACT, RT-X/OXE等 |
| **2** | **Trossen ViperX 300 (ALOHA系)** | **12+** | ALOHA, ALOHA 2, Mobile ALOHA, ACT, Pi0, Pi0.5, DexVLA, Gemini Robotics, Gemini 1.5, ALOHA Unleashed, UniVLA(学習データ)等 |
| **3** | **WidowX 250 (旧型/Dynamixel)** | **9+** | BridgeData V2, OpenVLA, Octo, RT-X/OXE, X-VLA(Simpler-WidowX), ALOHA/ALOHA 2(leader arm), OmniAction(ICLR2026)等 |
| **4** | **UR5 / UR5e** | **8+** | Diffusion Policy, Octo, Pi0, DexVLA, RoboMIND, ET-VLA, RT-X/OXE, UniVLA(学習データ)等 |
| **5** | **AgileX COBOT Magic V2.0** | **4** | RoboMIND, UniVLA, ET-VLA, X-VLA(Soft-Fold dataset) |
| **6** | **Google Robot (Everyday Robots)** | **4** | RT-1, RT-2, RT-X/OXE, OpenVLA |
| **7** | **AgileX PiPER** | **3** | UniVLA(実機メイン), AFI, X-VLA(言及) |
| **8** | **ARX アーム** | **2+** | Pi0(Bimanual ARX, Mobile ARX), Mobile Fibocom(ARXアーム搭載) |
| **9** | **UFACTORY xArm** | **2+** | RT-X/OXE(UTokyo xArm), SpatialVLA, UniCoD(ICLR2026) |
| **10** | **Kinova Gen3** | **1** | GR-2 |
| **11** | **AIRBOT Play** | **1** | X-VLA(実機) |
| **12** | **SO-100 / SO-101** | **1** | SmolVLA |
| **—** | **WidowX AI / TrossenArm (新型)** | **0** | **該当なし** |
| **—** | **AgileX NERO** | **0** | **該当なし** |

### 2.2 ヒューマノイド / 全身プラットフォーム

| ロボット | 論文数 | 使用論文 |
|----------|--------|---------|
| Fourier GR-1 | 2 | GR00T N1, GR00T N1.5 |
| Apptronik Apollo | 2 | Gemini Robotics, Gemini 1.5 |
| AgiBot G1 | 1 | AgiBot World |
| 1X Neo | 1 | GR00T N1 |
| X-Humanoid Tien Kung | 1 | RoboMIND |
| Figure 02 | 1 | Helix |

---

## 3. カメラ/センサー使用統計

| カメラ/センサー | 使用論文数 | 主な使用先 |
|----------------|-----------|-----------|
| **Intel RealSense D435/D435i** | **5+** | AFI(×2), ET-VLA(手首), Pi0系, 多数 |
| **Intel RealSense D415** | **3+** | Diffusion Policy(×4), CogACT(×4), RoboVLM |
| **Intel RealSense D457** | **2+** | ET-VLA(オーバーヘッド), DROID |
| **Intel RealSense D405** | **1+** | Trossen AI系（FollowerにD405搭載）|
| **ZED 2/Mini** | **2+** | AgiBot World, 他 |
| **Logitech C920系** | **2+** | BridgeData V2, ALOHA系 |
| **Orbbec** | **1** | UniVLA(PiPER実験) |
| **Robotiq グリッパー** | **4+** | UR5e系(ET-VLA, Pi0, GR-2), DROID |
| **Robotiq 2F-85** | **2+** | GR-2, ET-VLA |

---

## 4. 購入候補アームの詳細分析

### 4.1 AgileX COBOT Magic V2.0

**VLA論文での地位:**
- 4論文で使用（RoboMIND, UniVLA, ET-VLA, X-VLA）
- 中国系VLA研究エコシステムの**事実上の標準双腕プラットフォーム**
- RoboMIND: 8,030軌道収集（4種エンボディメントの1つ）
- X-VLA: Soft-Fold cloth-folding dataset（1,200軌道）
- ET-VLA: RoboTwinシミュレーションベンチマーク（AgileXモデル使用）

**使用パターン:**
- 主に**双腕テレオペ**でのデータ収集用
- Mobile ALOHA互換構成として研究利用
- OpenDriveLab（AgiBot系研究グループ）が中心的に使用

### 4.2 AgileX PiPER

**VLA論文での地位:**
- 3論文で使用（UniVLA実機メイン, AFI, X-VLA言及）
- UniVLA: **主要実機プラットフォーム**としてOrbbecカメラ+7DoFで評価
- AFI: Intel RealSense D435 × 2 で4タスク評価
- 低コスト研究用アームとして急速に採用拡大中

**使用パターン:**
- 単腕7DoF操作
- 教育・低コスト研究向け
- OpenDriveLab公式テストプラットフォーム

### 4.3 Trossen ViperX 300 (ALOHA系)

**VLA論文での地位:**
- **12+論文**で使用、VLA分野で最も重要な双腕プラットフォーム
- ALOHA/ALOHA 2/Mobile ALOHA: Google DeepMind + Stanfordの中核
- Pi0/Pi0.5: Physical Intelligenceの中核プラットフォーム
- Gemini Robotics: Google DeepMindの次世代ロボティクス
- ALOHA Unleashed: 26,000+デモンストレーション

**注意: WidowX AI/TrossenArm（新型）との区別:**
- 上記12+論文は**全て旧型ViperX 300（Dynamixelサーボ）**
- WidowX AI/TrossenArm（2025年, iNerve QDD）は**VLA論文で0件**
- ただしTrossenがOpenPI（Pi0/Pi0.5）公式統合を発表済み → 今後の採用見込みあり

### 4.4 Franka Emika Panda / FR3

**VLA論文での地位:**
- **16+論文**で最多使用
- DROID: 13機関統一ハードウェア（564シーン, 76k軌道）
- VLA分野の事実上の**ゴールドスタンダード**
- ただし高価格帯（¥500万以上）のため予算的に候補外

---

## 5. Pi0/Pi0.5 のロボット構成詳細

Pi0は**9種類のロボット構成**を同時にサポートした点で特筆すべき：

| 構成 | アーム | ベース | カメラ数 | アクション次元 |
|------|-------|-------|---------|--------------|
| UR5e（単腕）| UR5e | なし | 2 | 7D |
| Bimanual UR5e | UR5e × 2 | なし | 3 | 14D |
| Franka | Franka Panda | なし | 2 | 8D |
| Bimanual Trossen | ViperX 300 × 2 | なし | 3 | 14D |
| Bimanual ARX | ARX × 2 | なし | 3 | 14D |
| Bimanual AgileX | AgileX × 2 | なし | 3 | 14D |
| Mobile Trossen | ViperX 300 × 2 | ノンホロノミック | 3+ | 16D |
| Mobile ARX | ARX × 2 | ノンホロノミック | 3+ | 16D |
| Mobile Fibocom | ARX × 2 | ホロノミック | 3+ | 17D |

**重要:** Pi0は**AgileXアームを直接サポート**しており、Bimanual AgileX構成でのpre-trainedチェックポイントが存在する。

---

## 6. 購入判断に直結する分析

### VLAエコシステム互換性スコア

| ロボット | Pi0/Pi0.5 | OpenVLA | OXE/BridgeV2 | 中国系VLA | 合計スコア |
|----------|-----------|---------|-------------|-----------|-----------|
| Franka Panda | ✅ 直接対応 | ✅ fine-tune済 | ✅ DROID等 | ⚠️ 一部 | ★★★★★ |
| ViperX (ALOHA) | ✅ 中核 | ❌ | ⚠️ OXEに一部 | ❌ | ★★★★ |
| UR5/UR5e | ✅ 直接対応 | ❌ | ✅ OXEに含む | ⚠️ 一部 | ★★★★ |
| AgileX COBOT Magic | ✅ Bimanual AgileX | ❌ | ❌ | ✅ 中核 | ★★★☆ |
| WidowX 250 (旧) | ⚠️ ALOHA leader | ✅ メイン | ✅ BridgeV2 | ⚠️ 一部 | ★★★☆ |
| AgileX PiPER | ⚠️ 未確認 | ❌ | ❌ | ✅ 成長中 | ★★☆ |
| SO-100/SO-101 | ❌ | ❌ | ❌ | ❌ | ★ |
| WidowX AI (新) | ⚠️ OpenPI統合予定 | ❌ | ❌ | ❌ | ★ |

### 予算内（¥700万以内）での推奨構成

| 構成案 | 内訳 | 推定費用 | VLAスコア |
|--------|------|---------|-----------|
| **A: AgileX COBOT Magic + PiPER** | COBOT ¥150万 + PiPER ¥30-50万 + カメラ等 | **¥200-250万** | ★★★★ |
| **B: Trossen Mobile AI** | Mobile AI 1台 | **¥510-570万** | ★★★☆ |
| **C: AgileX COBOT + UR5e** | COBOT ¥150万 + UR5e ¥300-400万 | **¥450-550万** | ★★★★★ |
| **D: AgileX Full Set** | COBOT ¥150万 + PiPER ¥40万 + NERO ¥100万? | **¥300-400万** | ★★★☆ |

---

## 7. バージョン管理上の重要注意

### WidowX 250 vs WidowX AI の区別（再確認）

| 項目 | WidowX 250（旧） | WidowX AI / TrossenArm（新） |
|------|------------------|---------------------------|
| メーカー | Trossen/Interbotix | Trossen Robotics |
| モーター | DYNAMIXEL X-Series (Robotis) | 自社QDDサーボ |
| コントローラー | U2D2/Dynamixel SDK | iNerve® |
| VLA論文 | **9+件** | **0件** |
| 価格 | ~$500-800 (レガシー) | $4,546-$4,996 |
| 入手性 | 在庫限り | 現行品 |

### AgileXモーター（再確認）
- AgileX PiPER/NERO/COBOT Magic: **全自研**（自社開発）一体型関節モーター
- **CubeMars/Damiao等のサードパーティモーターではない**
- 遊星歯車減速機内蔵の統合関節設計

---

## 8. 年別トレンドサマリー

```
2022: Google Robot + WidowX 250 の2強時代
      └→ RT-1, BridgeData開始

2023: Franka + ALOHA が台頭、OXEで22種統合
      └→ ALOHA/ACT, Diffusion Policy, RT-X/OXE, BridgeData V2

2024: Franka最頻出、Pi0で9種同時対応、中国系参入
      └→ DROID(Franka×13機関), Pi0, ALOHA 2, RoboMIND(AgileX初採用)

2025: 多様化 + ヒューマノイド + 低コスト勢
      └→ AgileX PiPER拡大, SO-100/101, Fourier GR-1, Figure 02
      └→ WidowX AI = まだ0件 / AgileX NERO = まだ0件

2026（推定）: WidowX AI + PiPER の論文が増える見込み
      └→ OpenPI統合、LeRobotエコシステム、AgileX SDK改善
```

---

## 9. 調査方法・制約

1. **対象論文**: arXiv公開のVLA/Policy/Dataset論文30件
2. **抽出方法**: 各論文のExperimentsセクション（HTML版）からロボットハードウェア名・カメラ型番を直接抽出
3. **カウント基準**: 実機使用を確認できたもの。シミュレーションのみは(sim)表記
4. **ALOHA系**: follower(ViperX 300) + leader(WidowX 250)は別機種だが同一プラットフォームとしてカウント
5. **ICLR 2026データ**: 川村（東京科学大学 横田研）のZenn記事から約80本の論文情報を参照
6. **OXE/RT-X**: 60+データセットを含むが、各VLAが使用したサブセットは論文により異なる
7. **Simpler-WidowX**: シミュレーションベンチマークであり実機WidowX 250を模倣

---

*Last updated: 2026-02-12*
*Source: 30 VLA papers from arXiv (2022-2025) + ICLR 2026 data from Zenn article*
