# VLA研究・データ収集用 ロボットアーム 徹底調査レポート
**調査日: 2026-02-10 | 対象: オープンソース・低コスト・量産向きアーム**

---

## 📊 総合比較表

| 名前 | メーカー | DOF | リーチ | ペイロード | 価格帯（単腕） | オープンソース | LeRobot対応 | 量産適性 | VLA実績 |
|------|---------|-----|--------|-----------|---------------|--------------|-------------|---------|---------|
| **SO-101** | HuggingFace / TheRobotStudio | 5+1 | ~300mm | ~200g | **~$100** (部品) | ✅ 完全OS | ✅ 公式 | 3Dプリント | ⭐⭐⭐ 最多 |
| **Koch v1.1** | Alexander Koch | 5+1 | ~300mm | ~200g | ~$200 | ✅ 完全OS | ✅ 公式 | 3Dプリント | ⭐⭐ |
| **XLeRobot** | vectorwang (コミュニティ) | 双腕+移動 | SO-100x2 | ~200g | **~$660** (双腕+台車) | ✅ 完全OS | ✅ | 3Dプリント+IKEA | ⭐⭐ |
| **AhaRobot** | 学術 (arXiv) | 双腕+移動 | - | - | **~$1,000** (双腕+移動) | ✅ 完全OS | ✅ | 3Dプリント | ⭐ |
| **StarAI (Viola+Violin)** | FashionStar | 7 | ~280mm | ~500g | **~$839** (dual kit) | 部分OS | ✅ | 金属+組立済 | ⭐⭐ |
| **StarAI (Cello+Violin)** | FashionStar | 7 | ~400mm | ~750g | **~$1,799** (dual kit) | 部分OS | ✅ | 金属+組立済 | ⭐ |
| **RoArm-M3** | Waveshare | 5+1 | ~300mm | ~500g | **~$200-300** | 部分OS | ✅ (コミュニティ) | 金属 | ⭐ |
| **reBot B601** | Seeed Studio | 6+1 | **650mm** | **1.5kg** | **<$1,000** | ✅ 完全OS | ✅ (計画中) | ブラシレス金属 | 新製品 |
| **Forte** | 学術 (arXiv/MIT系) | 6 | 467mm | 630g | **~$215** | ✅ 完全OS | 未対応 | 3Dプリント | 論文のみ |
| **AgileX PiPER** | AgileX Robotics | 6 | ~500mm | **1.5kg** | **~$2,499** | 部分OS | ✅ (phosphobot) | 金属量産 | ⭐⭐ |
| **AgileX NERO** | AgileX Robotics | **7** | **580mm** | **3kg** | **~$2,500** | 部分OS | 対応予定 | 金属量産 | 新製品 |
| **AgileX COBOT Magic** | AgileX Robotics | 双腕6x2+移動 | - | - | ~$10,000+ | 部分OS | ✅ | 金属量産 | ⭐⭐ |
| **OpenArm 01** | Enactic | **7** | ~600mm | **4.1kg** | **~$2,500** (BOM) / ~$6,500 (双腕キット) | ✅ 完全OS | ROS2/MuJoCo | 金属(DAMIAO) | ⭐ |
| **Agility A1** | Foxtech (OpenArmベース) | 7 | ~600mm | 4.1kg | 要問合せ | ✅ (OpenArmベース) | ROS2 | 金属量産品 | ⭐ |
| **Trossen WidowX AI** | Trossen Robotics | 6 | ~500mm | ~750g | **~$4,500** (Solo: $8,999) | 部分OS | ✅ 公式 | 金属量産 | ⭐⭐⭐ |
| **TRLC-DK1** | Trossen Robotics (旧) | - | - | - | $3,999/$6,999 | 部分OS | ✅ | 金属 | ⭐⭐ |
| **myCobot 280** | Elephant Robotics | 6 | 280mm | 250g | ~$500-700 | 部分OS | コミュニティ | 金属量産 | ⭐ |
| **myCobot 320** | Elephant Robotics | 6 | 350mm | **1kg** | ~$1,500-2,000 | 部分OS | コミュニティ | 金属量産 | ⭐ |
| **Galaxea R1 / R1 Pro** | Galaxea Dynamics | 双腕7x2+移動 | - | - | 未公開（研究向け） | 部分OS | 独自SDK | 金属量産 | ⭐⭐⭐ |
| **UFACTORY Lite6** | UFACTORY | 6 | 440mm | 600g | **~$2,999** | SDKのみ | ROS2 | 金属量産 | ⭐⭐ |
| **UFACTORY xArm 6** | UFACTORY | 6 | 700mm | **5kg** | **~$5,299** | SDKのみ | ROS2 | 金属量産 | ⭐⭐ |
| **RealMan ECO65** | RealMan | 6 | 650mm | 5kg | ~$3,000-5,000 | 部分OS | RealBOT | 金属量産 | ⭐⭐ |
| **Dobot Magician E6** | Dobot | 6 | - | ~500g | ~€5,980 | SDKのみ | ROS2 | 金属量産 | ⭐ |
| **U-ARM** | MINT-SJTU (学術) | テレオペIF | - | - | **超低コスト** | ✅ | ✅ LeRobot-Anything | N/A | ⭐ 論文 |

---

## 🏆 Tier別 詳細解説

### Tier 1: 超低コスト入門（~$500以下）— データ収集の量を稼ぐ

#### 1. SO-101 (HuggingFace / TheRobotStudio)
- **価格**: ~$100 (モーターキットのみ), $220-240 (デュアルセット: Seeed Studio/AliExpress)
- **DOF**: 5+1 (5軸+グリッパー)
- **構造**: 3Dプリント + Feetech ST3215/ST3235サーボ
- **LeRobot**: ✅ **公式第一級サポート** — SmolVLA, π0, GR00T N1すべてこの上で開発・テスト
- **VLA実績**: 最も多い。SmolVLA公式デモ、OpenPI、GR00T N1のファインチューン先として使用
- **量産**: 3Dプリントのため個人向き。大規模展開にはモーターキットのバルク購入が現実的
- **日本入手性**: Seeed Studio（日本倉庫あり）、AliExpress、WowRobo、Amazon
- **コミュニティ**: ⭐⭐⭐⭐⭐ Discord非常に活発、phosphobot対応
- **弱点**: ペイロード200g程度、3Dプリントのため剛性低い、遊びが大きい
- **評価**: **VLA研究のデファクトスタンダード。最初の1台はこれ。**

#### 2. Koch v1.1
- **価格**: ~$200 (デュアルセット)
- **DOF**: 5+1
- **構造**: 3Dプリント + サーボ
- **LeRobot**: ✅ 公式サポート
- **VLA実績**: LeRobot初期から対応、多数の論文で使用
- **評価**: SO-100/101とほぼ同等。好みの問題。

#### 3. RoArm-M3 (Waveshare)
- **価格**: ~$200-300
- **DOF**: 5+1
- **構造**: 金属フレーム + ST3235サーボ + ESP32コントローラ内蔵
- **LeRobot**: ✅ Waveshare公式でLeRobot対応を謳っている
- **特徴**: SO-101と同じサーボだが金属フレームで剛性UP。ESP32内蔵でスタンドアロン動作も可能
- **日本入手性**: Amazon.co.jp、Waveshare直販で入手容易
- **評価**: **SO-101の金属版として検討価値あり。剛性が欲しいならこちら。**

#### 4. Forte (学術プロジェクト, arXiv 2507.15693)
- **価格**: **~$215** (材料費)
- **DOF**: 6
- **リーチ**: 467mm / **ペイロード**: 630g / **再現性**: サブミリ
- **構造**: 完全3Dプリント + キャプスタンドライブ + タイミングベルト
- **特徴**: 学術的に極めて興味深い。SO-101の10倍近いペイロードを同価格帯で実現
- **弱点**: 論文段階、組立難度高、LeRobot未対応
- **評価**: **ウォッチリスト。将来のLeRobot統合があれば最強候補に。**

---

### Tier 2: 中コスト実用派（$500-$2,000）— 品質と価格のバランス

#### 5. StarAI Robot Arm (FashionStar / Viola+Violin)
- **価格**: $839 (Viola+Violin dual), $1,799 (Cello+Violin dual)
- **DOF**: **7** (5+2手首)
- **構造**: 金属フレーム + 高品質サーボ、**組立済みで届く**
- **LeRobot**: ✅ 対応（Seeed StudioのEmbodied AIハッカソンでも使用）
- **GR00T**: ✅ NVIDIA JetPack 7 / Isaac Simでテスト済み
- **日本入手性**: Seeed Studio経由で購入可能、npaka氏が日本語ガイドを公開中
- **特徴**: 7DOFなので冗長性がありVLA的に有利。組立不要なのも大きなメリット
- **評価**: **SO-101からのステップアップに最適。7DOF+組立済み+LeRobot対応のバランスが良い。日本から最も入手しやすい中価格帯。**

#### 6. reBot B601 (Seeed Studio) — ★NEW! (2026年2月発表)
- **価格**: **<$1,000**
- **DOF**: 6+グリッパー
- **リーチ**: **650mm** / **ペイロード**: **1.5kg** / **再現性**: <0.2mm
- **構造**: ブラシレスモーター + 金属フレーム (4kg)
- **LeRobot**: ✅ 対応予定（ROS2, LeRobot, Pinocchio, Isaac Sim）
- **オープンソース**: ✅ 完全（STEP, BOM, ソフト全公開、GitHub: Seeed-Projects/reBot-DevArm）
- **特徴**: Seeed Studioの本気設計。ブラシレスモーターで本格的な性能。$1,000以下でリーチ650mm/1.5kgペイロードは破格
- **弱点**: 2026年3月フルリリース予定、まだ初期段階
- **日本入手性**: Seeed Studio日本対応あり
- **評価**: **⭐ 最注目の新星。$1,000以下でブラシレス6DOF+完全OSは前例がない。VLA量産に最適な可能性。ただし成熟度に注意。**

#### 7. XLeRobot (コミュニティプロジェクト)
- **価格**: ~$660 (双腕モバイル完全体)
- **構造**: SO-100 x2 + LeKiwi車輪 + IKEAカート
- **DOF**: 双腕(5+1)x2 + 移動
- **LeRobot**: ✅ 完全対応
- **特徴**: **$660で双腕モバイルマニピュレータ**。家庭用タスクのVLAデータ収集に理想的
- **GitHub**: ⭐急増中、Hackaday等で話題
- **評価**: **Mobile ALOHAの超格安版。移動を含むデータが欲しいなら第一選択。**

#### 8. AhaRobot (学術プロジェクト)
- **価格**: ~$1,000 (双腕+移動、計算リソース除く)
- **特徴**: XLeRobotと類似コンセプト。Mobile ALOHAの1/15のコスト
- **LeRobot**: ✅
- **評価**: 学術論文発。XLeRobotの方がコミュニティは活発。

---

### Tier 3: プロ研究グレード（$2,000-$5,000）— 本格VLA研究

#### 9. AgileX PiPER
- **価格**: ~$2,499
- **DOF**: 6 / **リーチ**: ~500mm / **ペイロード**: 1.5kg
- **構造**: 金属量産品 (遊星歯車) 、4.2kg軽量
- **LeRobot**: ✅ phosphobot経由、ROS2対応
- **VLA実績**: COBOT Magic / Mobile ALOHAクローンの腕部として広く使用
- **日本入手性**: AgileX公式、各種ディストリビューター
- **コミュニティ**: 活発。CES 2026にも出展
- **評価**: **$2,500クラスの定番。ただしNEROの登場で立ち位置が微妙に。**

#### 10. AgileX NERO — ★NEW! (2025年11月発表)
- **価格**: **~$2,500**
- **DOF**: **7** / **リーチ**: **580mm** / **ペイロード**: **3kg**
- **構造**: 金属量産、4.8kg、ヒューマノイド型設計
- **特徴**: PiPERと同価格で7DOF+3kgペイロード。圧倒的コスパ
- **弱点**: 遊星歯車（ハーモニック非使用）なので精度・バックドライバビリティに疑問の声あり
- **VLA対応**: GR00T対応が期待される
- **評価**: **⭐ 注目。$2,500で7DOF/3kgは前例がない。精度よりトルクが重要なVLAデータ収集には最適かも。**

#### 11. OpenArm 01 (Enactic)
- **価格**: ~$2,500 (BOM) / ~$6,500 (双腕キット)
- **DOF**: **7** / **ペイロード**: **4.1kg**
- **構造**: 金属（DAMIAOモーター、CANインターフェース）
- **オープンソース**: ✅ 完全
- **特徴**: バックドライブ可能、重力補償、コンプライアント制御。接触タスクに強い
- **ExoArm-7**: 外骨格テレオペアームも用意（別売）
- **Agility A1**: FoxtechがOpenArmベースの組立済み製品を販売
- **ROS2 / MuJoCo / Genesis対応**
- **日本入手性**: Foxtech経由で購入可能
- **評価**: **7DOFで完全OSの最高峰。接触リッチなタスクのVLAなら最良。ただし組立は上級者向け。**

#### 12. UFACTORY Lite6
- **価格**: ~$2,999
- **DOF**: 6 / **リーチ**: 440mm / **ペイロード**: 600g
- **構造**: 金属量産、高精度（±0.5mm）
- **ROS2**: ✅
- **特徴**: 産業品質のテーブルトップアーム。信頼性高い
- **弱点**: ペイロード600g、LeRobotは直接未対応
- **評価**: ラボ環境の安定運用向き。VLAエコシステムとの統合はやや手間。

---

### Tier 4: 研究室レベル（$5,000+）— フル機能

#### 13. Trossen WidowX AI / Aloha Solo / Stationary AI
- **価格**: WidowX AI 単腕 ~$4,500 / Aloha Solo ~$8,999 / Stationary AI ~$16,000
- **DOF**: 6
- **構造**: 金属量産、Dynamixelサーボ
- **LeRobot**: ✅ **公式第一級** — Google I/O 2025でGemini Roboticsデモに使用
- **VLA実績**: ⭐⭐⭐⭐⭐ 最多クラス。ACT, π0, Geminiすべてこの上で開発
- **日本入手性**: **UNIPOS（テガラ）が正規代理店** — 日本語サポートあり
- **評価**: **VLA研究の金字塔。予算があれば間違いない選択。日本の代理店があるのも大きい。**

#### 14. UFACTORY xArm 6/7
- **価格**: xArm 6: ~$5,299 / xArm 7: ~$8,849
- **DOF**: 6 or 7 / **リーチ**: 700mm / **ペイロード**: 5kg
- **精度**: ±0.1mm
- **ROS2**: ✅
- **日本入手性**: UNIPOS経由
- **評価**: UR5eの半額。産業レベルのVLA研究に。

#### 15. Galaxea R1 / R1 Pro (Galaxea Dynamics)
- **価格**: 未公開（推定$10,000-30,000）
- **DOF**: 双腕7x2 + 4DOFトルソ + 移動
- **特徴**: BEHAVIOR Robot Suiteで使用。家庭タスクVLAデータセットの主力プラットフォーム
- **VLA実績**: G0 VLAモデル、LingBot-VLA対応
- **評価**: 本格的な全身マニピュレーション研究に。

#### 16. RealMan ECO65 / RM65
- **価格**: 推定$3,000-5,000
- **DOF**: 6 / **ペイロード**: 5kg
- **特徴**: RealBOTプラットフォームでのデータ収集に特化。RealSourceデータセット公開
- **評価**: 中国市場で急成長。データインフラごと活用したいなら。

---

### 番外: ソフトウェア/テレオペレーションツール

#### phosphobot
- SO-100/101, PiPER等の上で動作
- Meta Quest VRテレオペ → LeRobotフォーマットでデータ収集 → クラウド学習
- SmolVLA, GR00T N1, π0のワンクリックファインチューン
- **評価**: ハードウェアと組み合わせて使うべき必須ツール

#### U-ARM (上海交通大学)
- テレオペインターフェース（アーム自体ではない）
- 既存アームに取り付けて低コストでデモ収集
- JoyConBox2AIと比較して39%高効率
- LeRobot-Anything対応

---

## 🎯 RFAプロジェクト向け推奨

### 🥇 最優先検討: reBot B601 + SO-101の併用

| 用途 | 推奨 | 理由 |
|------|------|------|
| **プロトタイプ・初期VLA実験** | SO-101 x2セット ($240) | LeRobotエコシステムの中心。即座に開始可能 |
| **量産・本格データ収集** | reBot B601 (<$1,000) | ブラシレス、650mmリーチ、1.5kg。OS完全公開。2026年3月フルリリース |
| **7DOF+高品質が必要** | StarAI Viola+Violin ($839) or OpenArm 01 ($2,500 BOM) | 冗長DOFがVLAに有利 |
| **双腕モバイル** | XLeRobot ($660) | Mobile ALOHAの超格安版 |
| **$2,500予算で最大性能** | AgileX NERO (7DOF/3kg) | 新製品、コスパ最高 |
| **信頼性・論文実績重視** | Trossen WidowX AI ($4,500+) | Google/Stanford御用達 |

### 🇯🇵 日本からの入手性ランキング

1. **SO-101** — Seeed Studio日本倉庫、Amazon.co.jp ✅
2. **RoArm-M3** — Amazon.co.jp、Waveshare直販 ✅
3. **StarAI** — Seeed Studio経由 ✅
4. **Trossen WidowX AI** — UNIPOS（テガラ）正規代理店 ✅
5. **myCobot 280** — スイッチサイエンス ✅
6. **UFACTORY xArm** — UNIPOS ✅
7. **AgileX PiPER/NERO** — AgileX Japan or 代理店経由
8. **reBot B601** — Seeed Studio（2026年3月予定）
9. **OpenArm** — Foxtech/CEREBOTO経由（国際配送）

---

## 🔮 今後のトレンド（2026年予測）

1. **ブラシレスモーター化**: SO-101世代のサーボ → reBot B601世代のブラシレスへの移行が加速
2. **7DOFの標準化**: 5DOFから7DOFへ。OpenArm, NERO, StarAIが先行
3. **VLAファンデーションモデルのハード非依存化**: LingBot-VLA（9種のアーム対応）のように、モデル側がマルチアーム対応に
4. **中国勢の台頭**: RealMan, AgileX, Galaxea, AgiBot — データインフラごと提供する戦略
5. **phosphobot的SaaSの普及**: ハード+ソフト+クラウド学習の統合プラットフォーム

---

## 📚 参考リンク

- LeRobot: https://github.com/huggingface/lerobot
- SO-ARM100/101: https://github.com/TheRobotStudio/SO-ARM100
- reBot B601: https://github.com/Seeed-Projects/reBot-DevArm/
- XLeRobot: GitHub (vectorwang)
- OpenArm: https://open-arm.org/
- phosphobot: https://github.com/phospho-app/phosphobot
- Robots That Exist (カタログ): https://robotsthatexist.com/robots
- Forte論文: https://arxiv.org/abs/2507.15693
- AhaRobot論文: https://arxiv.org/abs/2503.10070
- U-ARM論文: https://arxiv.org/abs/2509.02437
