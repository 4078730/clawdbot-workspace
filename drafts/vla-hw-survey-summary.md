# VLA論文ロボットハードウェア調査 — 統合サマリー

> 調査日: 2026-02-12  
> 調査対象: 主要VLA/Policy/Dataset論文 30件（2022–2025）+ ICLR 2026  
> 目的: FY25残予算（¥700万）でのラボ機材調達の意思決定支援

---

## 1. ロボットアーム使用ランキング（確定版）

| 順位 | ロボット | 論文数 | 代表的な論文 | 価格帯 |
|------|----------|--------|-------------|--------|
| **1** | Franka Emika Panda / FR3 | **16+** | DROID(13機関統一), Diffusion Policy, Octo, OpenVLA, Pi0, DexVLA, Gemini Robotics, CogACT | ¥500万以上 |
| **2** | Trossen ViperX 300 (ALOHA系) | **12+** | ALOHA, ALOHA 2, Mobile ALOHA, Pi0/Pi0.5, Gemini Robotics, ALOHA Unleashed | ¥510-570万(Mobile AI) |
| **3** | WidowX 250（旧型・Dynamixel） | **9+** | BridgeData V2, OpenVLA, Octo, RT-X/OXE, ALOHA(leader) | ~$500-800(レガシー) |
| **4** | UR5 / UR5e | **8+** | Diffusion Policy, Pi0, DexVLA, RoboMIND, ET-VLA | ¥300-400万 |
| **5** | AgileX COBOT Magic V2.0 | **4** | RoboMIND, UniVLA, ET-VLA, X-VLA(Soft-Fold) | **~¥150万** |
| **6** | Google Robot (Everyday Robots) | **4** | RT-1, RT-2, RT-X/OXE, OpenVLA | 入手不可 |
| **7** | AgileX PiPER | **3** | UniVLA(実機メイン), AFI, X-VLA | **~¥30-50万** |
| **8** | ARX アーム | **2+** | Pi0(Bimanual/Mobile) | 要問合せ |
| **9** | UFACTORY xArm | **2+** | RT-X/OXE, SpatialVLA, UniCoD(ICLR2026) | ¥100-200万 |
| **10** | Kinova Gen3 | **1** | GR-2(ByteDance) | ¥300万以上 |
| **11** | AIRBOT Play | **1** | X-VLA | 要問合せ |
| **12** | SO-100 / SO-101 | **1** | SmolVLA | ~$300 |
| **—** | **WidowX AI / TrossenArm（新型）** | **0** | — | $4,546-4,996 |
| **—** | **AgileX NERO** | **0** | — | 要問合せ |

---

## 2. AgileX製品のVLAエコシステム浸透度

### 製品別の採用状況

| 製品 | 種別 | 論文数 | 採用論文 | 初出年 |
|------|------|--------|---------|--------|
| **COBOT Magic V2.0** | 双腕 | 4 | RoboMIND, UniVLA, ET-VLA, X-VLA | 2024 |
| **PiPER** | 単腕7DoF | 3 | UniVLA, AFI, X-VLA | 2025 |
| **Tracer AGV** | 移動ベース | 1 | Mobile ALOHA | 2024 |
| NERO | 単腕7DoF | 0 | — | — |

### AgileXが関わる論文の全体像（重複除く5論文）

| 論文 | AgileX製品 | 役割 |
|------|-----------|------|
| **RoboMIND** (2024) | COBOT Magic V2.0 | 4種エンボディメントの1つ。8,030軌道収集 |
| **UniVLA** (2025) | PiPER (実機メイン) + COBOT Magic | PiPERでreal-world評価、Orbbecカメラ |
| **ET-VLA** (2025) | AgileX (型番不明) | Bimanual AgileXとして3種ロボットの1つ |
| **X-VLA** (2025) | AgileX (Soft-Fold) | Bi-manual AgileXで布折り1,200軌道 |
| **AFI** (2025) | PiPER | 実機メインプラットフォーム。RealSense D435×2 |
| **Mobile ALOHA** (2024) | Tracer AGV | 移動ベース（アームはTrossen ViperX） |
| **RoboTwin** (ECCV 2024) | COBOT Magic (V1相当) | デジタルツインベンチマーク |
| **Pi0** (2024) | "Bimanual AgileX" | **9種構成の1つとして直接サポート** |

### 重要ポイント
- **Pi0がBimanual AgileXを直接サポート** — pre-trainedチェックポイントが存在
- OpenDriveLab / AgiBot系研究グループが中心的に採用
- 2024→2025で急速に採用拡大中（2024: 2論文 → 2025: 3+論文）

---

## 3. WidowX 250 vs WidowX AI の最終確認

| 項目 | WidowX 250（旧型） | WidowX AI / TrossenArm（新型） |
|------|-------------------|-------------------------------|
| モーター | DYNAMIXEL X-Series (Robotis製) | 自社QDDサーボ + iNerve® |
| 発売時期 | 2018年頃〜 | 2025年〜 |
| 価格 | ~$500-800 | $4,546-$4,996 |
| VLA論文数 | **9+件** | **0件** |
| 主要データセット | BridgeData V2 (60k軌道) | なし |
| Pi0対応 | ALOHA leader として間接的 | OpenPI統合発表済み（未実装） |

**結論: 全30論文で「WidowX」は100%旧型WidowX 250。WidowX AIのVLA論文実績はゼロ。**

---

## 4. Pi0/Pi0.5 の9種ロボット構成

| 構成名 | アーム | ベース | アクション次元 |
|--------|-------|-------|--------------|
| UR5e（単腕）| UR5e × 1 | なし | 7D |
| Bimanual UR5e | UR5e × 2 | なし | 14D |
| Franka | Franka Panda × 1 | なし | 8D |
| **Bimanual Trossen** | ViperX 300 × 2 | なし | 14D |
| Bimanual ARX | ARX × 2 | なし | 14D |
| **Bimanual AgileX** | AgileX × 2 | なし | 14D |
| Mobile Trossen | ViperX 300 × 2 | ノンホロノミック | 16D |
| Mobile ARX | ARX × 2 | ノンホロノミック | 16D |
| Mobile Fibocom | ARX × 2 | ホロノミック | 17D |

→ Pi0は「ARXとAgileXは類似のキネマティクス特性を持つ」として同カテゴリ扱い

---

## 5. カメラ/センサー使用統計

| カメラ | 使用論文数 | 主な使用先 | 推奨度 |
|--------|-----------|-----------|--------|
| **Intel RealSense D435/i** | 5+ | AFI, ET-VLA, RoboTwin, RoboMIND | ★★★★★ |
| Intel RealSense D415 | 3+ | Diffusion Policy, CogACT | ★★★ |
| Intel RealSense D457 | 2+ | ET-VLA, DROID | ★★★ |
| Intel RealSense D405 | 1+ | ALOHA 2 (改良版で採用) | ★★★ |
| ZED 2/Mini | 2+ | AgiBot World, DROID | ★★★ |
| Orbbec Gemini 335 | 1+ | UniVLA, RoboMIND(Tien Kung) | ★★ |
| Logitech C922x | 1+ | Mobile ALOHA (初代) | ★ |

**推奨: RealSense D435i を2-3台調達**（最も汎用性が高く、VLA論文で最多使用）

---

## 6. 年代別トレンド

```
2022  ▸ Google Robot + WidowX 250 の黎明期
        RT-1登場。BridgeData開始。

2023  ▸ Franka + ALOHA が台頭。OXEで22種統合。
        ALOHA/ACT, Diffusion Policy, BridgeData V2, RT-X

2024  ▸ Franka最多。Pi0で9種同時対応。AgileX初参入。
        DROID(Franka×13機関), ALOHA 2, RoboMIND(COBOT Magic)
        ⭐ Pi0がBimanual AgileXを直接サポート

2025  ▸ 多様化 + ヒューマノイド + 低コスト勢
        AgileX PiPER拡大(3論文), SO-100/101, Fourier GR-1
        WidowX AI = まだ0件 / AgileX NERO = まだ0件

2026  ▸ （推定）WidowX AI + PiPERの論文増加見込み
        OpenPI統合、LeRobotエコシステム
```

---

## 7. VLAエコシステム互換性マトリクス

| ロボット | Pi0/Pi0.5 | OpenVLA | OXE/BridgeV2 | 中国系VLA | DROID | 総合 |
|----------|-----------|---------|-------------|-----------|-------|------|
| Franka Panda | ✅ | ✅ | ✅ | ⚠️ | ✅ | ★★★★★ |
| ViperX (ALOHA) | ✅中核 | ❌ | ⚠️ | ❌ | ❌ | ★★★★ |
| UR5/UR5e | ✅ | ❌ | ✅ | ⚠️ | ❌ | ★★★★ |
| **COBOT Magic** | **✅直接** | ❌ | ❌ | **✅中核** | ❌ | **★★★★** |
| WidowX 250(旧) | ⚠️ | ✅ | ✅ | ⚠️ | ❌ | ★★★☆ |
| **PiPER** | ⚠️ | ❌ | ❌ | **✅成長中** | ❌ | **★★★** |
| WidowX AI(新) | ⚠️予定 | ❌ | ❌ | ❌ | ❌ | ★ |

---

## 8. 予算別構成案

### 前提
- FY25残予算: ¥700万（税抜）
- 期限: 2026-03-31
- 目的: VLA研究のための実験環境構築

### 構成A: AgileX COBOT Magic + PiPER（推奨）

| 品目 | 数量 | 推定費用 |
|------|------|---------|
| AgileX COBOT Magic V2.0 | 1台 | ¥150万 |
| AgileX PiPER | 1台 | ¥30-50万 |
| Intel RealSense D435i | 3台 | ¥15万 |
| 計算機（GPU付きワークステーション） | 1台 | ¥100-200万 |
| 周辺機器・予備パーツ | — | ¥50万 |
| **合計** | | **¥345-465万** |

**メリット:**
- Pi0 Bimanual AgileX チェックポイントが直接利用可能
- 中国系VLAエコシステム（RoboMIND, UniVLA, X-VLA）と完全互換
- 双腕(COBOT)と単腕(PiPER)の両方をカバー
- 予算に¥250-350万の余裕 → 追加機材・UR5e購入も視野

**リスク:**
- SDK品質の懸念（ジャーキネス、macOS非対応）
- サポートは中国語中心
- 西洋系VLAエコシステム（DROID, BridgeV2）との直接互換なし

### 構成B: AgileX COBOT Magic + UR5e

| 品目 | 数量 | 推定費用 |
|------|------|---------|
| AgileX COBOT Magic V2.0 | 1台 | ¥150万 |
| UR5e + Robotiq 2F-85 | 1台 | ¥350万 |
| Intel RealSense D435i | 3台 | ¥15万 |
| 計算機 | 1台 | ¥150万 |
| 周辺機器 | — | ¥35万 |
| **合計** | | **¥700万** |

**メリット:**
- 東西両方のVLAエコシステムを最大カバレッジ
- UR5eはPi0でも直接サポート + DROID互換
- COBOT Magicで中国系VLAもカバー

**リスク:**
- 予算ギリギリ（予備費なし）
- UR5eの納期要確認

### 構成C: Trossen Mobile AI

| 品目 | 数量 | 推定費用 |
|------|------|---------|
| Trossen Mobile AI (Stationary) | 1台 | ¥510-570万 |
| 計算機 | 1台 | ¥100万 |
| 周辺機器 | — | ¥30万 |
| **合計** | | **¥640-700万** |

**メリット:**
- サポート品質は業界最高（US拠点、24h対応、生涯サポート）
- OpenPI（Pi0/Pi0.5）との公式統合
- ALOHA系の後継としてのポジション

**リスク:**
- VLA論文での採用実績がゼロ（2026年2月時点）
- 予算的に1台しか買えない
- 新製品のため不具合リスク

---

## 9. 最終推奨

### 第一推奨: 構成A（COBOT Magic + PiPER）

**理由:**
1. **コスパ最強** — ¥200-250万で双腕+単腕が揃う
2. **Pi0直接対応** — Bimanual AgileXのpre-trainedチェックポイントあり
3. **論文実績** — COBOT Magic 4論文、PiPER 3論文（急成長中）
4. **予算余裕** — 残¥250-350万でカメラ・計算機・追加アームも可能
5. **X-VLAの2チェックポイント** — RoboTwin2(双腕) + SoftFold(布折り)が即使用可

### 次の一手
1. **TechShare（AgileX日本代理店）に見積もり依頼** — COBOT Magic V2.0 + PiPER
2. 納期確認（FY25内 = 3月末まで）
3. 必要に応じてUNIPOS（Trossen代理店）にもTrossen Mobile AIの見積もり取得
4. SDK品質の事前検証（GitHub issuesの確認、デモ機の貸出有無）

---

## 付録: 調査ソース一覧

| ファイル | 内容 |
|---------|------|
| `drafts/vla-hw-survey-complete.md` | 30論文完全版（ロボット・カメラ・DoF詳細） |
| `drafts/vla-hw-survey-part2.md` | Policy/Dataset/ALOHA系14論文の詳細（原文引用付き） |
| `drafts/vla-robot-arm-survey-2026-02.md` | 論文×ロボット対応表 + 年別トレンド + ICLR2026 |
| `drafts/VLA-robot-arm-research-2026-02.md` | アーム比較レポート（Tier分類・スペック比較） |
| `drafts/robot-arm-reviews-2026-02.md` | ユーザーレビュー・評判調査 |
| `Projects/rfa/fy25-budget-remaining-plan.md` | 予算計画（価格修正済み） |

### ICLR 2026参考
- [ICLRに投稿されているVLA論文まとめ（川村, 東京科学大学 横田研）](https://zenn.dev/masakichi210/articles/623c147e335792)

---

*Last updated: 2026-02-12*
