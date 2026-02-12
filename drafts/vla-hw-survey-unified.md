# VLA論文ロボットハードウェア調査 — 統合版

> 調査日: 2026-02-12  
> 対象: 主要VLA/Policy/Dataset論文 30件（2022–2025）+ ICLR 2026（~80本参照）  
> 方法: 各論文のExperimentsセクション（arXiv HTML版）からロボットハードウェア・カメラ・センサーを直接抽出  
> 目的: FY25残予算（¥700万）でのラボ機材調達の意思決定支援

---

## 第1部: 統計サマリー

### ロボットアーム使用ランキング（確定版）

```
順位  ロボット                        論文数   価格帯
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 1   Franka Emika Panda/FR3          16+    ¥500万以上
 2   Trossen ViperX 300 (ALOHA系)    12+    ¥510-570万(Mobile AI)
 3   WidowX 250（旧型・Dynamixel）      9+    ~$500-800(レガシー)
 4   UR5/UR5e                         8+    ¥300-400万
 5   AgileX COBOT Magic V2.0          4     ~¥150万
 6   Google Robot (Everyday Robots)   4     入手不可
 7   AgileX PiPER                     3     ~¥30-50万
 8   ARX アーム                        2+    要問合せ
 9   UFACTORY xArm                    2+    ¥100-200万
10   Kinova Gen3                      1     ¥300万以上
11   AIRBOT Play                      1     要問合せ
12   SO-100/SO-101                    1     ~$300
—    WidowX AI / TrossenArm（新型）     0     $4,546-4,996
—    AgileX NERO                      0     要問合せ
```

```
使用論文数（ビジュアル）

Franka Panda/FR3     ████████████████ 16+
Trossen ViperX       ████████████     12+
WidowX 250（旧）      █████████        9+
UR5/UR5e             ████████         8+
AgileX COBOT Magic   ████             4
Google Robot (EDR)   ████             4
AgileX PiPER         ███              3
ARX                  ██               2+
xArm                 ██               2+
WidowX AI（新）       ▏                0
AgileX NERO          ▏                0
```

### ヒューマノイド / 全身プラットフォーム

| ロボット | 論文数 | 使用論文 |
|----------|--------|---------|
| Fourier GR-1 | 2 | GR00T N1, GR00T N1.5 |
| Apptronik Apollo | 2 | Gemini Robotics, Gemini 1.5 |
| AgiBot G1 | 1 | AgiBot World |
| 1X Neo | 1 | GR00T N1 |
| X-Humanoid Tien Kung | 1 | RoboMIND |
| Figure 02 | 1 | Helix |

### カメラ/センサー使用統計

| カメラ | 使用論文数 | 主な使用先 | 推奨 |
|--------|-----------|-----------|------|
| **Intel RealSense D435/i** | **5+** | AFI, ET-VLA, RoboTwin, RoboMIND | ★★★★★ |
| Intel RealSense D415 | 3+ | Diffusion Policy, CogACT | ★★★ |
| Intel RealSense D457 | 2+ | ET-VLA, DROID | ★★★ |
| Intel RealSense D405 | 1+ | ALOHA 2（改良版） | ★★★ |
| ZED 2/Mini | 2+ | AgiBot World, DROID | ★★★ |
| Orbbec Gemini 335 | 1+ | UniVLA, RoboMIND(Tien Kung) | ★★ |
| Logitech C922x | 1+ | Mobile ALOHA（初代） | ★ |

→ **RealSense D435i を2-3台調達推奨**（最多使用・汎用性高）

### グリッパー

| グリッパー | 使用論文数 | 組合せ |
|-----------|-----------|--------|
| **Robotiq 2F-85** | 4+ | UR5e, Franka, GR-2, DROID |
| パラレルジョー（カスタム） | 多数 | ALOHA系, AgileX系 |
| Allegro/Dexterous Hand | 2+ | DexVLA, GR-Dexter |
| Inspire-Robots RH56BFX | 1 | RoboMIND(Tien Kung) |

---

## 第2部: 論文別ハードウェア詳細（30論文）

### Foundation VLA Models

| # | 論文 | 年 | ロボット（実機） | カメラ/センサー | DoF |
|---|------|------|----------------|----------------|-----|
| 1 | **π0 (Pi0)** | 2024 | UR5e, Bimanual UR5e, Franka, Bimanual ViperX (ALOHA), Bimanual ARX, **Bimanual AgileX**, Mobile Trossen, Mobile ARX, Mobile Fibocom | 手首+ベース（構成依存） | 7-17D |
| 2 | **π0.5 (Pi0.5)** | 2025 | π0同系列（Trossen ViperX/ARXベース） | π0同様 | π0同様 |
| 3 | **OpenVLA** | 2024 | WidowX 250, Google Robot, Franka(ft) | BridgeV2標準 | 7D |
| 4 | **Octo** | 2024 | WidowX 250, UR5, Franka（3種実機評価） | 各標準 | 7D |
| 5 | **X-VLA** | 2025 | AIRBOT Play(実機), WidowX 250(sim), Franka(sim), **AgileX(Soft-Fold 1,200軌道)** | 論文参照 | 各種 |
| 6 | **UniVLA** | 2025 | **AgileX PiPER 7DoF**(実機メイン), COBOT Magic(言及) | Orbbec | 7D |
| 7 | **DexVLA** | 2025 | Bimanual UR5e, Franka+Allegro, **Bimanual AgileX** | 各標準 | 12-14D |
| 8 | **SmolVLA** | 2025 | SO-100, SO-101, Franka(言及) | 標準 | 6D |
| 9 | **GR00T N1** | 2025 | Fourier GR-1, 1X Neo | 各標準 | 全身 |
| 10 | **Gemini Robotics** | 2025 | ALOHA 2(ViperX), Bi-arm Franka FR3, Apollo | 各標準 | 各種 |
| 11 | **Helix** | 2025 | Figure 02(35DoF上半身) | 自社 | 35D |
| 12 | **GR-2** | 2024 | **Kinova Gen3** + Robotiq 2F-85 | Head+Wrist cam | 7D |

### Policy / Dataset / ALOHA系

| # | 論文 | 年 | ロボット（実機） | カメラ/センサー | DoF |
|---|------|------|----------------|----------------|-----|
| 13 | **RT-1** | 2022 | Google Robot | 本体搭載 | 7D |
| 14 | **RT-2** | 2023 | Google Robot | 本体搭載 | 7D |
| 15 | **RT-X / OXE** | 2023 | 22種以上（Google, WidowX, Franka, UR5, xArm, Jaco, Kuka, PR2, Sawyer等） | 各種 | 各種 |
| 16 | **ALOHA / ACT** | 2023 | ViperX 300×2(follower) + WidowX 250×2(leader) | Wrist×2+Base | 14D |
| 17 | **ALOHA 2** | 2024 | ViperX 300×2 + WidowX 250×2（改良版） | **RealSense D405×4** | 14D |
| 18 | **Mobile ALOHA** | 2024 | ViperX 300×2 + **AgileX Tracer AGV** | Logitech C922x×3 | 16D |
| 19 | **ALOHA Unleashed** | 2024 | ALOHA 2×**10台**(26k+デモ) | RGB×4 | 14D |
| 20 | **Diffusion Policy** | 2023 | UR5(PushT), Franka(Pouring等) | RealSense D415 | 2-6D |
| 21 | **RoboMIND** | 2024 | Franka, **COBOT Magic V2.0**, UR5e, Tien Kung | 各標準 | 各種 |
| 22 | **DROID** | 2024 | Franka×18台(13機関,76k軌道) | ZED 2×2+Mini×1 | 7D |
| 23 | **BridgeData V2** | 2023 | WidowX 250(24環境,60k軌道) | 固定+Wrist | 7D |
| 24 | **AgiBot World** | 2025 | AgiBot G1×100台+ | ZED | 自社 |

### 追加の注目論文

| # | 論文 | 年 | ロボット（実機） | カメラ/センサー | DoF |
|---|------|------|----------------|----------------|-----|
| 25 | **ET-VLA** | 2025 | Bimanual UR5+Robotiq, Bimanual Franka, **Bimanual AgileX** | D457+D435i | 各種 |
| 26 | **AFI** | 2025 | **AgileX PiPER** | **RealSense D435×2** | 7D |
| 27 | **GR-Dexter** | 2025 | ByteDexter V2+カスタムアーム | 自社 | 高DoF |
| 28 | **Gemini 1.5** | 2025 | ALOHA, Bi-arm Franka, Apollo | 各標準 | 各種 |
| 29 | **CogACT** | 2024 | Franka 7DoF | RealSense D415×4 | 7D |
| 30 | **SpatialVLA** | 2025 | xArm(deformable tasks) | 各標準 | 各種 |
| (+) | **RoboTwin** | 2024 | **AgileX COBOT Magic** | RealSense D435×4 | 双腕 |

---

## 第3部: 論文からの原文引用（主要論文）

### ALOHA系のアーム構成
> *"consists of a bimanual parallel-jaw gripper workcell with two ViperX 6-DoF arms (Trossen Robotics) (the "follower"), along with 2 smaller WidowX arms (Trossen Robotics) (the "leader"). The WidowX contains the same kinematic structure as the ViperX, in a smaller form factor."*  
> — ALOHA 2 (2024)

> *"The policy outputs 12 absolute joint positions, 6 for each 6-dof ViperX arm, and a continuous value for gripper position for each of the two grippers."*  
> — ALOHA Unleashed (2024)

### Mobile ALOHAのAgileXベース
> *"We choose AgileX Tracer AGV ("Tracer") as the mobile base following considerations 1 and 2. Tracer is a low-profile, differential drive mobile base designed for warehouse logistics."*  
> — Mobile ALOHA (2024)

> *"The teleoperation setup can be removed and only two ViperX 300 are used during autonomous execution."*  
> — Mobile ALOHA (2024)

### Pi0のマルチエンボディメント
> *"Bimanual ARX & bimanual AgileX. This setup uses two 6-DoF arms, and supports either ARX or AgileX arms, with three cameras (two wrist and one base) and a 14-dimensional configuration and action space."*  
> — Pi0 (2024)

### DROID統一ハードウェア
> *"We chose the Franka Emika Panda 7 DoF robot arm as the base of our setup since it is widely adopted in the robot research community, reliable, relatively affordable and was available at most participating institutions."*  
> — DROID (2024)

> *"The robot arm is equipped with a Robotiq 2F-85 gripper and is mounted on a height-adjustable standing desk with wheels"*  
> — DROID (2024)

### BridgeData V2のWidowX確認
> *"The robot setup costs approximately $4,000 in total and consists of parts that are all publicly available"*  
> — BridgeData V2 (2023) → 旧型WidowX 250確定

### RoboMINDのAgileX V2.0確認
> *"AgileX Cobot Magic V2.0"* (参考文献[69]に明示)  
> *"For AgileX robots, we utilized the built-in dual-arm teleoperation system."*  
> — RoboMIND (2024)

### AFIのAgileX PiPER
> *"On real-world manipulation tasks using an AgileX Piper manipulator, our method achieves consistent improvements across four diverse tasks"*  
> — AFI (2025)

### RoboTwinのAgileX
> *"COBOT Magic platform from AgileX Robotics ... equipped with four AgileX Arms and four Intel Realsense D-435 RGBD cameras"*  
> — RoboTwin (ECCV 2024)

---

## 第4部: 重要な区別事項

### WidowX 250（旧）vs WidowX AI（新）

| 項目 | WidowX 250（旧型） | WidowX AI / TrossenArm（新型） |
|------|-------------------|-------------------------------|
| モーター | DYNAMIXEL X-Series (Robotis製) | 自社QDDサーボ + iNerve® |
| 発売時期 | 2018年頃〜 | 2025年〜 |
| 価格 | ~$500-800 | $4,546-$4,996 |
| VLA論文数 | **9+件** | **0件** |
| 主要データセット | BridgeData V2 (60k軌道) | なし |
| Pi0対応 | ALOHA leader として間接的 | OpenPI統合発表済み（未実装） |

**結論: 全30論文で「WidowX」は100%旧型WidowX 250。WidowX AIのVLA論文実績はゼロ。**

### AgileXモーター
- PiPER/NERO/COBOT Magic: **全自研**（自社開発）一体型関節モーター
- **CubeMars/Damiao等のサードパーティモーターではない**
- 遊星歯車減速機内蔵の統合関節設計

### ALOHA系の構成ルール
- **Follower（作業アーム）**: Trossen ViperX 300 6DoF（自律実行で使用）
- **Leader（テレオペアーム）**: Trossen WidowX 250 6DoF（テレオペ時のみ）
- 全ALOHA系論文（ALOHA, ALOHA 2, Mobile ALOHA, ALOHA Unleashed）で一貫

---

## 第5部: AgileX製品のVLAエコシステム浸透度

### 製品別採用状況

| 製品 | 種別 | 論文数 | 採用論文 | 初出年 |
|------|------|--------|---------|--------|
| **COBOT Magic V2.0** | 双腕 | 4 | RoboMIND, UniVLA, ET-VLA, X-VLA(Soft-Fold) | 2024 |
| **PiPER** | 単腕7DoF | 3 | UniVLA(実機メイン), AFI, X-VLA(言及) | 2025 |
| **Tracer AGV** | 移動ベース | 1 | Mobile ALOHA | 2024 |
| NERO | 単腕7DoF | 0 | — | — |

### AgileXが関わる論文の全体像（重複除く6件）

| 論文 | AgileX製品 | 役割 |
|------|-----------|------|
| **Pi0** (2024) | "Bimanual AgileX" | **9種構成の1つとして直接サポート（pre-trainedあり）** |
| **RoboMIND** (2024) | COBOT Magic V2.0 | 4種エンボディメントの1つ。8,030軌道 |
| **UniVLA** (2025) | PiPER(実機), COBOT Magic | PiPERで実機評価 |
| **ET-VLA** (2025) | AgileX(型番不明) | 3種Bimanualの1つ |
| **X-VLA** (2025) | AgileX(Soft-Fold) | 布折り1,200軌道 |
| **AFI** (2025) | PiPER | 実機メインプラットフォーム |
| **RoboTwin** (ECCV 2024) | COBOT Magic | デジタルツインベンチマーク |
| **Mobile ALOHA** (2024) | Tracer AGV | 移動ベース |

→ **Pi0がBimanual AgileXを直接サポート（pre-trainedチェックポイントあり）**

---

## 第6部: Pi0/Pi0.5 の9種ロボット構成

| 構成名 | アーム | ベース | カメラ数 | アクション次元 |
|--------|-------|-------|---------|--------------|
| UR5e（単腕）| UR5e × 1 | なし | 2 | 7D |
| Bimanual UR5e | UR5e × 2 | なし | 3 | 14D |
| Franka | Franka Panda × 1 | なし | 2 | 8D |
| Bimanual Trossen | ViperX 300 × 2 | なし | 3 | 14D |
| Bimanual ARX | ARX × 2 | なし | 3 | 14D |
| **Bimanual AgileX** | **AgileX × 2** | なし | 3 | 14D |
| Mobile Trossen | ViperX 300 × 2 | ノンホロノミック | 3+ | 16D |
| Mobile ARX | ARX × 2 | ノンホロノミック | 3+ | 16D |
| Mobile Fibocom | ARX × 2 | ホロノミック | 3+ | 17D |

> Pi0は「ARXとAgileXは類似のキネマティクス特性を持つ」として同カテゴリ扱い

---

## 第7部: VLAエコシステム互換性マトリクス

| ロボット | Pi0/Pi0.5 | OpenVLA | OXE/BridgeV2 | 中国系VLA | DROID | 総合 |
|----------|-----------|---------|-------------|-----------|-------|------|
| Franka Panda | ✅ 直接 | ✅ ft済 | ✅ | ⚠️ | ✅ | ★★★★★ |
| ViperX(ALOHA) | ✅ 中核 | ❌ | ⚠️ | ❌ | ❌ | ★★★★ |
| UR5/UR5e | ✅ 直接 | ❌ | ✅ | ⚠️ | ❌ | ★★★★ |
| **COBOT Magic** | **✅ 直接** | ❌ | ❌ | **✅ 中核** | ❌ | **★★★★** |
| WidowX 250(旧) | ⚠️ | ✅ | ✅ | ⚠️ | ❌ | ★★★☆ |
| **PiPER** | ⚠️ | ❌ | ❌ | **✅ 成長中** | ❌ | **★★★** |
| WidowX AI(新) | ⚠️予定 | ❌ | ❌ | ❌ | ❌ | ★ |
| AgileX NERO | ❌ | ❌ | ❌ | ❌ | ❌ | ★ |

---

## 第8部: ICLR 2026 VLA論文（追加データ）

> 出典: [ICLRに投稿されているVLA論文まとめ（川村, 東京科学大学 横田研）](https://zenn.dev/masakichi210/articles/623c147e335792)

| 論文 | 使用ロボット（実機） | 備考 |
|------|---------------------|------|
| **UniVLA** | AgileX COBOT Magic, PiPER, ALOHA | AgileX系で実機評価 |
| **OmniAction** | WidowX 250S（旧型） | 音声+視覚マルチモーダル |
| **UniCoD** | Franka, UFACTORY xArm | 理解→予測→行動 |
| **VLA-IN-THE-LOOP** | Xiaomi Robot, ALOHA | World Model介入 |
| **RobotArena∞** | simのみ | — |
| **DSVLABench** | simのみ（CALVIN） | — |
| **AutoBio** | simのみ | — |
| **WorldGym** | simのみ | — |

ICLR 2026による累計更新:

| ロボット | 追加 | 累計 |
|----------|------|------|
| Franka | +2 | **16+** |
| ALOHA(ViperX) | +2 | **12+** |
| WidowX 250(旧) | +1 | **9+** |
| COBOT Magic | +1 | **4** |
| PiPER | +1 | **3** |
| xArm | +1 | **2+** |
| WidowX AI(新) | 0 | **0** |

---

## 第9部: 年代別トレンド

```
2022  ▸ Google Robot + WidowX 250 の黎明期
        RT-1, BridgeData開始

2023  ▸ Franka + ALOHA 台頭。OXEで22種統合
        ALOHA/ACT, Diffusion Policy, BridgeData V2, RT-X

2024  ▸ Franka最多。Pi0で9種同時対応。AgileX初参入
        DROID(Franka×13機関), Pi0, ALOHA 2, RoboMIND(COBOT Magic)
        ⭐ Pi0がBimanual AgileXを直接サポート

2025  ▸ 多様化 + ヒューマノイド + 低コスト勢
        AgileX PiPER拡大(3論文), SO-100/101, Fourier GR-1
        WidowX AI = 0件 / AgileX NERO = 0件

2026（推定）
        WidowX AI + PiPER の論文増加見込み
        OpenPI統合、LeRobotエコシステム
```

---

## 第10部: 予算別構成案

### 前提
- FY25残予算: **¥700万**（税抜）
- 期限: **2026-03-31**
- 目的: VLA研究のための実験環境構築

### 構成A: AgileX COBOT Magic + PiPER（⭐推奨）

| 品目 | 数量 | 推定費用 |
|------|------|---------|
| AgileX COBOT Magic V2.0 | 1台 | ¥150万 |
| AgileX PiPER | 1台 | ¥30-50万 |
| Intel RealSense D435i | 3台 | ¥15万 |
| GPU ワークステーション | 1台 | ¥100-200万 |
| 周辺機器・予備パーツ | — | ¥50万 |
| **合計** | | **¥345-465万** |

**メリット:** Pi0直接対応 / 中国系VLAと完全互換 / 双腕+単腕 / 予算に¥250-350万余裕  
**リスク:** SDK品質(ジャーキネス) / サポート中国語中心 / DROID/BridgeV2非互換

### 構成B: AgileX COBOT Magic + UR5e

| 品目 | 数量 | 推定費用 |
|------|------|---------|
| AgileX COBOT Magic V2.0 | 1台 | ¥150万 |
| UR5e + Robotiq 2F-85 | 1台 | ¥350万 |
| Intel RealSense D435i | 3台 | ¥15万 |
| 計算機 | 1台 | ¥150万 |
| 周辺機器 | — | ¥35万 |
| **合計** | | **¥700万** |

**メリット:** 東西両エコシステム最大カバレッジ / UR5eはPi0+OXE対応  
**リスク:** 予算ギリギリ / UR5e納期要確認

### 構成C: Trossen Mobile AI

| 品目 | 数量 | 推定費用 |
|------|------|---------|
| Trossen Mobile AI (Stationary) | 1台 | ¥510-570万 |
| 計算機 | 1台 | ¥100万 |
| 周辺機器 | — | ¥30万 |
| **合計** | | **¥640-700万** |

**メリット:** サポート業界最高(US, 24h, 生涯) / OpenPI公式統合  
**リスク:** VLA論文実績ゼロ / 1台しか買えない / 新製品リスク

### 次の一手
1. **TechShare（AgileX日本代理店）に見積もり依頼** — COBOT Magic V2.0 + PiPER
2. 納期確認（FY25内 = 3月末まで）
3. 必要に応じてUNIPOS（Trossen代理店）にもMobile AIの見積もり取得
4. SDK品質の事前検証（GitHub issues確認、デモ機貸出有無）

---

## 付録: 調査の制約

1. **カウント基準**: 実機使用を確認できたものを中心。シミュレーションのみは(sim)表記
2. **OXEデータ**: 60+データセットを含むが各VLAの使用サブセットは論文依存
3. **ALOHA系**: follower(ViperX)+leader(WidowX)は同一プラットフォームとしてカウント
4. **年の基準**: arXiv初投稿年
5. **ICLR 2026**: 川村（東京科学大学 横田研）Zenn記事の約80本から実機評価ありのものを抽出

---

*Last updated: 2026-02-12*
