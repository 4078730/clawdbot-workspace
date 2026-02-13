# TRLC-DK1 リサーチメモ

> **作成日:** 2026-02-13  
> **作成者:** clawd（konukiの指示に基づく）  
> **ステータス:** ドラフト  
> **ソース:** TRLC Discord、公式ドキュメント、Jannik Grothusenの発言

---

## 目次

1. [製品概要](#1-製品概要)
2. [ハードウェア詳細](#2-ハードウェア詳細)
3. [ソフトウェアエコシステム](#3-ソフトウェアエコシステム)
4. [バージョン履歴](#4-バージョン履歴)
5. [ライセンス](#5-ライセンス)
6. [自作可能性](#6-自作可能性)
7. [重要な技術的知見](#7-重要な技術的知見)
8. [コミュニティ](#8-コミュニティ)
9. [他製品との比較](#9-他製品との比較)
10. [購入判断に向けた整理](#10-購入判断に向けた整理)

---

## 1. 製品概要

### 会社情報

**The Robot Learning Company** (TRLC) — ドイツのUG法人（haftungsbeschränkt = ミニGmbH）

| 項目 | 詳細 |
|------|------|
| 開発者 | Jannik Grothusen |
| 公式サイト | <https://www.robot-learning.co/> |
| GitHub | <https://github.com/robot-learning-co> |
| Discord | <https://discord.gg/PTZ3CN5WkJ> |
| 製造拠点 | ドイツ（Made in Germany） |

### 製品ラインナップ

| モデル | 価格 | 内容 |
|--------|------|------|
| **TRLC-DK1** | $3,999（~¥62万） | シングルアーム（リーダー＋フォロワー＋カメラ2台） |
| **TRLC-DK1-X** | $6,999（~¥108万） | バイマニュアル（リーダー×2＋フォロワー×2＋カメラ3台） |

- **リードタイム:** 4〜6週間

### 基本スペック

| 項目 | 値 |
|------|-----|
| リーチ | 700mm |
| ペイロード | 1kg（公称） |
| DoF | 6 |
| 重量 | ~3.36kg（AL5052使用時）〜4kg未満 |
| 接続 | USB-C（USB-to-CAN） |
| OS対応 | Linux, macOS, Windows |

---

## 2. ハードウェア詳細

### 2.1 フォロワーアーム（アクチュエータ構成）

| 関節 | モーター | 数量 | 電圧 | 調達先 |
|------|---------|------|------|--------|
| ベース（Joint 1） | DM-J4340P-2EC（クロスローラーベアリング内蔵） | 1 | 24V | Foxtech / AliExpress |
| 肩・肘（Joint 2-3） | DM-J4340-2EC | 2 | 24V | Foxtech / AliExpress |
| 手首・回転（Joint 4-7） | DM-J4310-2EC V1.1 | 4 | 24V | Foxtech / AliExpress |

**重要事項:**
- すべて **Damiao製QDDモーター**（中国製）
- 48Vモーターも使用可能（電源変更のみ、トルクは同じ9Nm）
- v0.2でJoint 1をDM-J4340→DM-J4340P（クロスローラーベアリング内蔵）に変更

### 2.2 ペイロード制約と改善方法

- **ボトルネック:** 肩関節（DM-J4340）の定格トルク **9Nm**
- 24Vと48Vでトルクは同じ（9Nm）→ 電圧変更ではペイロード向上しない
- ペイロードを上げるにはモーターを **DM-J8009等** に換装する必要がある
- **Jannikの見解:** I2RTが主張する2kgペイロードはDM-J4340で非現実的（フル伸展時にオーバーヒート）

### 2.3 シートメタル（板金）パーツ

| 項目 | 詳細 |
|------|------|
| 素材 | **アルミニウム5052** |
| 製造オプション1 | MiSUMi MEVIY（自動見積もり） |
| 製造オプション2 | **JLCCNC**（好評、安い）← 推奨 |
| ベースマウント | 4080アルミプロファイル用 |

**バージョン別の対応状況:**
- v0.1のCADはMiSUMiの自動見積もりに対応
- v0.2以降はMiSUMiで一部警告が出る → **JLCCNCの方が適合**
- 一部ユーザーがlink0-1をCNC加工の6061アルミで再設計中（強度向上、コスト増）

### 2.4 3Dプリント部品

| 項目 | 詳細 |
|------|------|
| フィラメント | PLA-CF（リンクカバー等）、PAHT-CF（高負荷部品）— Bambu Lab製 |
| v0.3 | PA-CF使用。CF（カーボンファイバー）は機能的（強度向上） |
| プリンター | Bambu Lab P2S |
| インサート | M3ヒートインサート（**Ruthex推奨**、外径4.6mm） |
| インサート施工 | はんだごて180°Cで7-10秒/個 |

### 2.5 リーダーアーム（パッシブ）

- **サーボ:** Robotis XL330-M077-T / M288-T × 7（位置検出用）
- **設計:** GELLOスタイル（ARX R5 / Trossen WidowX AIの60%スケール）
- **製造:** 3Dプリント製

**供給問題と代替案:**
- Dynamixelの供給問題あり（XL330-M077-T **品薄・高価**）
- 代替候補:
  - Feetech HLS3606M
  - Feetech HL-3915（ギア比1:320、スムーズさに懸念）
- **ロードマップ:** アクティブリーダー（STS3215モーター使用、HIL-SERL対応）

### 2.6 カメラ

| 項目 | 詳細 |
|------|------|
| メインカメラ | Innomaker U20CAM-1080P × 2（標準構成） |
| レンズ | 改造済み185° FOV魚眼レンズ（M12x0.5） |
| デプスカメラ | RealSense D405アダプター公開済み（v0.2以降） |

### 2.7 電源

| 項目 | 詳細 |
|------|------|
| メイン電源 | LRS-150-24（150W 24V） → 8.4Aで動作可能 |
| 降圧コンバーター | 24V→5V Step-Down Converter |
| 緊急停止 | E-stopボタン付き（キット購入時に含まれる） |

**電力考察:**
- 3× DM-J4340の公称電流合計 **7.5A** → 150Wで十分動作
- E-stopボタンは10A AC定格 → DC使用時のピーク電流に対するマージン懸念の声あり

### 2.8 配線

| バージョン | 方式 |
|-----------|------|
| v0.1 | デイジーチェーン方式 |
| v0.2以降 | **非デイジーチェーン**（OpenArmのwiring設計を参考） |

- CAN-FDには **現時点で非対応**

---

## 3. ソフトウェアエコシステム

### 3.1 LeRobotネイティブ対応

- LeRobotのプラグイン規約に準拠 → **自動検出**
- テレオペ、記録、バイマニュアルすべて **LeRobot CLI** で動作
- bimanualブランチ: <https://github.com/robot-learning-co/trlc-dk1/tree/bimanual>

**キャリブレーション:**
- `examples/calibration_leader.ipynb`（リーダー静止位置で1回実行）
- `follower_set_zero.py` / `follower_read_position.py` スクリプト公開

### 3.2 URDF

- **コミュニティ作成:** `andreaskoepf/trlc-dk1-follower-urdf`
- v0.2のSTEPファイルからのURDF抽出も可能（`fusion2urdf`使用）
- RoboTwinシーン作成の動きもあり

### 3.3 Gravity Compensation（重力補償）

- **Lakesenberg_QiLiu氏** が実装済み
- ALOHA Lightningスタイルの直接教示（kinesthetic teaching）に必要
- 共有予定あり

---

## 4. バージョン履歴

| Version | 主な変更 |
|---------|---------|
| **v0.1.0** | 初版。Joint 1にDM-J4340使用。MiSUMi MEVIY対応 |
| **v0.2.0** | Joint 1をDM-J4340P（クロスローラーベアリング）に変更。配線を非デイジーチェーン化。RealSense D405アダプター追加。リンク微調整 |
| **v0.3.0** | PA-CF使用。シートメタルSTEPファイル公開。フォロワーSTEPファイル公開（`trlc-dk1/hardware/`） |

---

## 5. ライセンス

### Apache License 2.0

| 権利 | 可否 |
|------|------|
| 修正 | ✅ |
| 配布 | ✅ |
| サブライセンス | ✅ |
| **商用利用** | **✅ 可能** |
| 著作権表示の付記 | ⚠️ 必要 |

**重要な注意点:**
- CADの"Copyright All Rights Reserved"はApache 2.0の著作権表示であり、**商用禁止ではない**

**Jannikの公式見解:**
> "Apache License Version 2.0 allows you to modify, distribute, and sublicense. You just need to include the following copyright notice: Copyright 2025 The Robot Learning Company UG (haftungsbeschränkt)."

---

## 6. 自作可能性

### 6.1 公開されているもの

- ✅ フォロワーアームSTEPファイル（v0.3、`trlc-dk1/hardware/`）
- ✅ リーダーアームCAD（3Dプリント用）
- ✅ パーツリスト（BOM）: <https://docs.robot-learning.co/hardware>
- ✅ ソフトウェア（LeRobotプラグイン）
- ✅ URDF（コミュニティ作成）
- ✅ 組み立て・キャリブレーション手順

→ **フルオープンソース。自作に必要な情報はすべて揃っている。**

### 6.2 自作コスト見積もり

| 部品 | 概算コスト |
|------|----------|
| Damiao モーター × 7 | $800–1,200 |
| シートメタル板金（JLCCNC） | $200–400 |
| 3Dプリント部品 | $50–100 |
| Dynamixel XL330 × 7（リーダー用） | $300–500 |
| カメラ × 2 | $80–120 |
| 電源・ケーブル・その他 | $100–200 |
| **合計** | **$1,530–2,520（~¥24–39万）** |

→ **キット($3,999)の40–60%程度で自作可能**

---

## 7. 重要な技術的知見

### 7.1 ARXファミリーの系譜

Jannik（TRLC開発者）の発言:
> "all arms on the market that are using this joint layout (incl. AgileX Piper etc.) are derived from arx-x.com R5 / X5"

以下のアームは全て **ARX R5/X5の運動学を共有する同一ファミリー:**

| アーム | 開発元 | 備考 |
|--------|--------|------|
| **ARX R5 / X5** | ARX（中国） | 原型 |
| **AgileX PiPER** | AgileX（中国） | ARX派生 |
| **TRLC-DK1** | TRLC（ドイツ） | ARX派生 |
| **Trossen WidowX AI** | Trossen（米国） | 独自設計だが運動学的に等価 |
| **I2RT YAM** | I2RT | 同じアクチュエータ使用 |

**→ このファミリー内ではポリシーの転移（policy transfer）が期待できる**

### 7.2 ALOHA Lightning

Chelsea Finn（Stanford）がCoRL 2025で発表した未発表論文:

| 項目 | 詳細 |
|------|------|
| 方式 | リーダー・フォロワーを一体化した直接教示方式 |
| メリット | データ収集速度がリーダーフォロワーテレオペより向上 |
| 課題1 | カメラ画像にオペレーターの手が映る（マスキング/インペインティングで対応可能） |
| 課題2 | 重力補償なしだと長時間のデータ収集が疲れる |
| 課題3 | オンサイトでしか使えない |

### 7.3 電力・安全

- 150W電源（24V/8.4A）で十分動作
- 緊急停止ボタンは **10A AC定格** → DC使用時のピーク電流に対するマージン懸念の声あり
- DK1購入キットにはE-stopボタン含む

---

## 8. コミュニティ

| メンバー | 役割 |
|---------|------|
| **Jannik Grothusen** | 開発者。非常にレスポンシブ |
| **Remi Cadene** | LeRobot開発者。コミュニティ参加 |
| **andreas koepf** | URDF作成者。積極的に貢献 |
| **Lakesenberg_QiLiu** | 重力補償実装者 |

**コミュニティ特徴:**
- 活発なDiscordコミュニティ
- 中国・欧州・米国からのユーザーが混在
- SFでの共同ビルドイベントの提案あり

---

## 9. 他製品との比較

### Jannik作成スライド（2025/11/14）

- **TRLC-DK1 vs I2RT YAM** の比較
- I2RTは自社モーター製造（垂直統合）
- TRLCの方が「見た目がセクシー」（コミュニティ評）

---

## 10. 購入判断に向けた整理

### 10.1 TRLC-DK1の位置づけ

| 用途 | 適合度 | 理由 |
|------|--------|------|
| 研究室での実験・プロトタイプ | **◎** | コスパ良い、LeRobotネイティブ、Apache 2.0 |
| VLAポリシーの転移実験 | **◎** | ARXファミリー内の互換性、自作可能 |
| 現場PoC（神戸工場等） | **△** | ペイロード1kg制約、産業用途のサポート体制不足 |
| 事業化ラインの正式機材 | **×** | 小規模UG、日本代理店なし |

### 10.2 vs AgileX COBOT Magic + PiPER（構成A）

| 項目 | TRLC-DK1-X | COBOT Magic + PiPER |
|------|------------|---------------------|
| 価格 | ~¥108万 | ~¥345–465万 |
| ペイロード | 1kg | 3kg / 1.5kg |
| VLA論文実績 | 0本 | 4本 + 3本 |
| Pi0サポート | ❌ | ✅ 公式 |
| 自作可能性 | ✅ Apache 2.0 | ❌ |
| LeRobot | ✅ ネイティブ | ✅ |
| 日本代理店 | ❌ | ✅ TechShare |
| ARXファミリー | ✅ | ✅（PiPERはARX派生） |

### 10.3 推奨戦略

1. **メイン調達: COBOT Magic + PiPER**（来年度PoC・論文実績・サポート）
2. **サブ: TRLC-DK1を1台自作**（安価、実験用、ARXファミリー内の転移実験）
3. 予算¥700万のうち、DK1自作は **¥25–40万** で収まるので予算への影響は軽微

---

## 参考リンク

| リソース | URL |
|---------|-----|
| TRLC公式サイト | <https://www.robot-learning.co/> |
| GitHub | <https://github.com/robot-learning-co> |
| BOM（パーツリスト） | <https://docs.robot-learning.co/hardware> |
| Discord | <https://discord.gg/PTZ3CN5WkJ> |
| bimanualブランチ | <https://github.com/robot-learning-co/trlc-dk1/tree/bimanual> |
| URDF（コミュニティ） | `andreaskoepf/trlc-dk1-follower-urdf` |
