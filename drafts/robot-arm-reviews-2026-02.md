# ロボットアーム 評判・口コミ調査レポート

**調査日:** 2026年2月12日  
**調査者:** Claude (サブエージェント)  
**調査ソース:** Reddit, GitHub Issues/Discussions, YouTube, ブログ, X(Twitter), ROS Discourse, arXiv論文

---

## 目次

1. [AgileX COBOT Magic](#1-agilex-cobot-magic)
2. [AgileX PiPER / NERO](#2-agilex-piper--nero)
3. [Trossen WidowX AI (TrossenArm)](#3-trossen-widowx-ai-trossenarm)
4. [Trossen Mobile AI / Stationary AI / Solo AI](#4-trossen-mobile-ai--stationary-ai--solo-ai)
5. [OpenArm 01 (Enactic)](#5-openarm-01-enactic)
6. [比較まとめ](#6-比較まとめ)

---

## 1. AgileX COBOT Magic

**カテゴリ:** 移動双腕ロボット（Mobile ALOHA互換）  
**価格:** 要問い合わせ（Generation Robotsでは€27,000前後で販売）

### 1.1 ポジティブな評判

- **Mobile ALOHAの完全オープンソースコード互換:** Stanford研究室のMobile ALOHAプラットフォームのコードをシミュレーション・実環境の両方で完全実行可能
  > "AgileX Robotics has successfully achieved the open-source code from the Stanford laboratory used on the Mobile ALOHA platform, including in simulation and real environment."
  > — [Reddit r/robotics, 2024/03/15](https://www.reddit.com/r/robotics/comments/1bf84we/cobot_magic_agilex_achieved_the_whole_process_of/)

- **ALOHA 2より高スペック・低コスト:** より高負荷のロボットアームと高性能産業用コンピュータを搭載
  > "AgileX developed Cobot Magic, which can achieve the complete code of Mobile Aloha, with higher configurations and lower costs, and is equipped with larger-load robotic arms and high-computing power industrial computers."
  > — [Reddit u/Agilex_Robotics, 2024/03/08](https://www.reddit.com/user/Agilex_Robotics/comments/1b9ekcr/cobot_magic_mobile_aloha_system_works_on_agilex/)

- **VLA研究でのベンチマーク利用実績:** RoboTwinベンチマーク（ECCV採択）のハードウェアとして採用
  > "Based on the work of cobot magic hardware, roboTwin work is officially open source, Songling Robotics is deeply involved, and the corresponding article has been accepted by ECCV."
  > — [Reddit r/robotics, 2024/09/23](https://www.reddit.com/r/robotics/comments/1fnbp2c/robotwin_dualarm_robot_benchmark_with_generative/)

- **DexVLAとの統合実績:** VLA（Vision-Language-Action）モデルとの組み合わせが公式に実証済み
  > "Cobot Magic + DexVLA = next-level robot learning! Adapt to any task, any robot, with ease."
  > — [AgileX Twitter, 2025/02/16](https://x.com/AgilexRobotics/status/1891313848751173903)

### 1.2 ネガティブな評判・問題点

- **Pi0推論での成功率低下:** OpenPiベースのPi0推論をCobot Magicで動作させた際、ACTモデルと比較して成功率が大幅に低下するとの報告
  > "I've noticed a significantly lower success rate compared to the ACT model when performing simple pick tasks... Pi0 behaves more hurry up than ACT, resulting in jerkier motions and a reduced success rate."
  > — [GitHub Physical-Intelligence/openpi Issue #405, 2025/03/26](https://github.com/Physical-Intelligence/openpi/issues/405)

- **独立したユーザーレビューが少ない:** AgileX公式アカウントからの投稿が多く、第三者の独立レビューはまだ限定的

### 1.3 品質・耐久性

- 具体的な品質問題の報告は確認されていない。ただし長期使用レポートも少ない
- PiPERアームと同じモーター技術（BLDCプラネタリーギア）を使用しているため、同様の特性が予想される

### 1.4 サポート対応

- AgileXはDiscordコミュニティ、GitHub、ROS Discourseで積極的にサポートを提供
- 中国拠点のため、タイムゾーンの違いによるレスポンス遅延の可能性あり

### 1.5 VLA/ML研究での使用事例

- **RoboTwin** (ECCV 2024): デジタルツインベースの双腕ロボットベンチマーク
- **DexVLA** (2025): Vision-Language-Actionモデルの実機検証
- **OpenPi / Pi0** (2025): Physical Intelligenceのπ0推論の実機テスト
- 中国の複数の研究機関で広く採用

### 1.6 総合評価: ★★★★☆ (4/5)

**強み:** Mobile ALOHA完全互換、中国研究コミュニティでの広い採用、VLA研究の実績豊富  
**弱み:** 独立レビュー不足、価格が高い、英語ドキュメントの充実度に不明点  
**適した用途:** Mobile ALOHA研究の即戦力プラットフォーム

---

## 2. AgileX PiPER / NERO

**カテゴリ:** デスクトップロボットアーム  
**PiPER:** 6DOF, 1.5kgペイロード, 626mmリーチ, ~$2,500  
**NERO:** 7DOF, 3kgペイロード, ~$2,500（ハンド別）

### 2.1 ポジティブな評判

- **コストパフォーマンスの高さ:** $2,500で1.5kgペイロードは市場で突出
  > "It looks like the best deal around your size is the AgileX PiPER (1.5 kg payload, 626 mm reach, repeatability 0.1 mm) for about $3000."
  > — [Reddit r/robotics, 2024/12/22](https://www.reddit.com/r/robotics/comments/1hk906p/7axis_desktop_robot_arm/)

- **新製品（PiPER）への期待感:**
  > "The Agilex PiPER is new and looks promising. It can do hand teaching record/playback motion, and has a Python API for programming."
  > — [Reddit r/robotics, 2024/12/10](https://www.reddit.com/r/robotics/comments/1har3yp/best_robotic_arm_for_application_hiring/)

- **NEROの7DOFスペックに対する驚き:** 研究者から高い注目
  > "Robots will be the new PC soon! 3KG payload + 7DOF arm at $2500 seems so exciting... Franka Emika used to be the cheap arm at $27K"
  > — [Animesh Garg (ロボティクス研究者) on X](https://x.com/animesh_garg/status/1993339904726909097)

- **学術論文での採用実績:** UniVLA、DexVLA、Affordance Field Interventionなどの論文で使用
  > "Real-world experimental results on AgileX Piper manipulator across four manipulation tasks."
  > — [arXiv:2512.07472, Affordance Field Intervention, 2025/12](https://arxiv.org/html/2512.07472v1)

### 2.2 ネガティブな評判・問題点

- **プラネタリーギアによる振動（シェイク）:**
  > "It has about the same reach, but weighs only 4 kg and moves faster than the AR4, but has some shake."
  > — [Reddit r/robotics, 2025/01/12](https://www.reddit.com/r/robotics/comments/1hzzw4u/entrylevel_robot_arm/)

- **安価なプラネタリーギアへの懐疑:**
  > "AgileX uses cheap planetary gears for their PiPER arm, and I would assume for the new NERO too."
  > — [Reddit r/robotics, 2025/11/27](https://www.reddit.com/r/robotics/comments/1p7za49/agilex_unveiled_a_robotic_arm_two_days_ago_nero/)

- **SDK起動時のジョイントステート不整合:**
  > "Joint states are incorrectly initialized on startup and require a series of steps to correct. The issue is primarily visible on joint2, which reports an unusually high value near its zero position."
  > — [GitHub agilexrobotics/piper_sdk Issue #35, 2025/04/04](https://github.com/agilexrobotics/piper_sdk/issues/35)

- **リアルタイム読み取りの遅延:**
  > "We're experiencing a latency... between actual physical joint movements on the robotic arm and reading joint states... This latency impacts our use case for real time teleoperation."
  > — [GitHub agilexrobotics/piper_sdk Issue #34, 2025/04/04](https://github.com/agilexrobotics/piper_sdk/issues/34)

- **SDKの複雑さ・ドキュメント不足:**
  > "The piper_sdk API is powerful and quickly maturing, but it's a bit complex and under-documented... There are also several sharp bits in piper_sdk which can make the robots seem temperamental, e.g. becoming unresponsive despite repeated calls to MotionCtrl_2, EnableArm, GripperCtrl, etc."
  > — [GitHub Reimagine-Robotics/piper_control README](https://github.com/Reimagine-Robotics/piper_control)

- **ROS2ドキュメントが中国語中心:**
  > "The ROS documentation seems to be only in Chinese."
  > — [Reddit r/robotics, 2024/12/18](https://www.reddit.com/r/robotics/comments/1hgoeam/robot_arm_recommendation/)

- **macOS非対応:**
  > "Agilex Piper CAN does not work with MacOS"
  > — [GitHub agilexrobotics/piper_sdk Issue #24, 2025/02/25](https://github.com/agilexrobotics/piper_sdk/issues/24)

- **NEROの価格混乱:** 公式価格が不明瞭で、$2,500〜$5,000まで情報が錯綜
  > "Which I'm salty about, but it's standard practice. Edit: Nvm, they said it's 5k according to other posters... No, NERO is $2500. AgileX said so on X and YouTube comments."
  > — [Reddit r/robotics, 2025/11/27](https://www.reddit.com/r/robotics/comments/1p7za49/agilex_unveiled_a_robotic_arm_two_days_ago_nero/)

### 2.3 品質・耐久性

- プラネタリーギアのバックラッシュによる精度の限界が指摘されている
- ハーモニックドライブ搭載のロボットアームと比較して、backlash、重量、ノイズでトレードオフ
- サードパーティがMIT mode使用時のjerkinessを修正するフォークを作成
  > "Use our fork of piper_sdk, which fixes some jerkiness issues when using MIT mode on the Piper"
  > — [GitHub Reimagine-Robotics/piper_control](https://github.com/Reimagine-Robotics/piper_control)

### 2.4 サポート対応

- GitHubでのIssue対応は活発（piper_sdkリポジトリで定期的にリリース更新）
- Discordコミュニティ（discord.gg/wrKYTxwDBd）を運営
- support@agilex.ai でのメールサポート、WhatsAppサポートの報告もあり
- ただし中国語圏中心のサポート体制で、英語対応は改善途中

### 2.5 VLA/ML研究での使用事例

- **UniVLA** (HKU / OpenDriveLab): クロスモーフォロジーポリシー学習
  > — [ROS Discourse, 2025/07/31](https://discourse.openrobotics.org/t/case-study-cross-morphology-policy-learning-with-univla-and-piper-robotic-arm/49361)
- **DexVLA** (2025): VLAモデルのトレーニングデータの42.7%がAgileXアーム（ARX + PiPER）
  > — [arXiv:2502.05855](https://arxiv.org/html/2502.05855v1)
- **Affordance Field Intervention** (2025/12): VLAの失敗回復メカニズムの検証
- **MIT DexWrist** (修士論文): PiPERの手首と比較した研究
  > — [MIT DSpace, 2025](https://dspace.mit.edu/bitstream/handle/1721.1/163571/ulloa-gulloa-sm-meche-2025-thesis.pdf)
- LeRobotサポートをリクエスト中（GitHub Issue #1335）

### 2.6 総合評価: ★★★★☆ (3.5/5)

**強み:** 圧倒的なコスパ、VLA研究での採用増加、活発なSDK開発  
**弱み:** プラネタリーギアの振動/バックラッシュ、SDK未成熟、英語ドキュメント不足  
**適した用途:** VLA/模倣学習研究のエントリーポイント、教育用途

---

## 3. Trossen WidowX AI (TrossenArm)

**カテゴリ:** 新世代ML研究用ロボットアーム（2025年発売）  
**スペック:** 6DOF, 1.5kgペイロード, 700mmリーチ, 1mm精度  
**価格:** Base $4,545.95 / Leader $4,685.95 / Follower $4,995.95  
**特徴:** 自社設計モーター + iNerveコントローラー + イーサネット接続（旧WidowX 250のDynamixelとは完全に異なるアーキテクチャ）

### 3.1 ポジティブな評判

- **旧WidowX 250からの大幅な進化:** ペイロード250g → 1.5kg（6倍）、Dynamixelサーボから自社モーターへ完全移行
- **広範なソフトウェアエコシステム:** HuggingFace LeRobot, ROS2, MuJoCo, Gazebo, NVIDIA Isaac対応
  > "It is powered by the iNerve controller and supports a wide range of software: Hugging Face, LeRobot, ROS2, MuJoCo, Gazebo, NVIDIA Isaac, and more."
  > — [Generation Robots 製品ページ](https://www.generationrobots.com/en/404333-widowx-ai.html)

- **ALOHA Projectの正統後継:** Stanford ALOHA Projectの精神を引き継ぐ公式プラットフォーム
  > "At the core of our AI hardware line is the ethos of the ALOHA Project—A LOw-cost HArdware—bringing advanced robotics to researchers, students, and engineers at an unparalleled price"
  > — [Trossen Robotics 公式サイト](https://www.trossenrobotics.com/widowx-ai)

- **堅実なサポート体制:** 1年保証 + 生涯サポート + 交換部品提供
  > "ROBUST 1-YEAR WARRANTY / LIFETIME SUPPORT FOR TROSSEN PRODUCTS / REPLACEMENT PARTS AVAILABLE FOR EASY USER REPAIR"
  > — [Trossen Robotics 公式サイト](https://www.trossenrobotics.com/widowx-ai)

- **米国拠点の24時間以内サポートレスポンス:**
  > "That's why our promise to respond to support requests within 24 hours, with U.S.-based engineers, is core to how we operate."
  > — [Trossen Robotics Blog, 2026/01](https://www.trossenrobotics.com/post/what-our-support-inbox-is-teaching-us-about-how-teams-succeed-with-robotics)

- **レピュテーション:** カスタマーサービスに定評あり
  > "Their customer service and relations are unparalleled."
  > — [Matt Trossen LinkedIn推薦文](https://www.linkedin.com/in/matttrossen/)

### 3.2 ネガティブな評判・問題点

- **旧WidowX 250ベースのALOHA kit（Dynamixel版）に対する不満が根深い:**
  > "To answer your question about the arms used on aloha - $6k is kind of cheap in the grand scheme of things but the arm's hardware definitely sucks for that kind of money. There are many cheaper, off brand arms with better hardware and performance."
  > — [Reddit r/robotics, 2024/09/16](https://www.reddit.com/r/robotics/comments/1fifekq/why_are_robotic_arms_used_in_research_so/)
  
  ※注意: この批判は旧世代（Dynamixel）に対するもの。WidowX AIは自社モーター搭載の全く新しい製品だが、ブランドイメージへの影響は残る

- **PiPERと比較して割高感:**
  > "The Dynamixel-based Trossen/Interbotix WidowX is actually 50% more expensive, smaller, and only has 0.25 kg."
  > — [Reddit r/robotics, 2024/12/22](https://www.reddit.com/r/robotics/comments/1hk906p/7axis_desktop_robot_arm/)
  
  ※注意: これも旧WidowX 250との比較。WidowX AIは1.5kgペイロードで同スペック帯

- **新製品ゆえの実績不足:** 2025年3月発売のため、長期使用レポートが少ない
- **LeRobot統合がまだ進行中:**
  > "Is anyone working on integrating a driver and HW configuration for using the newest WidowAI arms from Trossen Robotics into LeRobot?"
  > — [GitHub huggingface/lerobot Issue #1357, 2025/06/20](https://github.com/huggingface/lerobot/issues/1357)

### 3.3 品質・耐久性

- 自社設計モーターにより、旧Dynamixelの信頼性問題（過熱、サーボ故障）を根本的に解消を目指している
- アルミ削り出しフレーム、イーサネット接続による安定通信
- 「ラボで使い倒す」設計思想（モーター交換が容易）
  > "The X-Series arms are made for the lab, our arms are intended to be worked on and we've made it as easy as possible to keep your manipulator up and running."
  > — [Trossen Robotics 公式サイト](https://www.trossenrobotics.com/widowx-250)

### 3.4 サポート対応

- **業界最高水準:** 米国拠点エンジニアによる24時間以内レスポンス、1年保証、生涯サポート
- Trossen Roboticsは2005年創業の老舗で、サポート品質に定評あり
- 公式ドキュメンテーション（docs.trossenrobotics.com）が充実

### 3.5 VLA/ML研究での使用事例

- **ALOHA 2 (Google DeepMind):** 前世代WidowX 250が使用されていた
- **LeRobot統合:** 公式チュートリアルが存在（OpenPi連携含む）
  > — [Trossen Arm Documentation - OpenPi](https://docs.trossenrobotics.com/trossen_arm/main/tutorials/openpi.html)
- WidowX AI用のLeRobotプラグイン統合がPR進行中
- MuJoCoシミュレーション対応済み

### 3.6 総合評価: ★★★★☆ (4/5)

**強み:** 自社モーターによる品質向上、最高水準のサポート、ALOHAの正統後継、LeRobot統合  
**弱み:** 価格がPiPERの約2倍、新製品で実績がまだ限定的、6DOFのみ（7DOFなし）  
**適した用途:** サポート重視の研究室、ALOHA後継プラットフォーム

---

## 4. Trossen Mobile AI / Stationary AI / Solo AI

**カテゴリ:** WidowX AIベースの統合研究キット  
**価格帯:**
- Solo AI: ~£10,000前後 / ~$12,000前後
- Stationary AI: ~£24,000–31,000 / ~$28,000–37,000
- Mobile AI: ~£34,000–37,000 / ~$40,000–44,000

### 4.1 ポジティブな評判

- **ALOHA Kitの正式後継として設計:**
  > "Mobile AI replaces Aloha Mobile. Stationary AI replaces Aloha Stationary. Solo AI replaces Aloha Solo. These kits maintain the core principles of the Aloha Project—low-cost, high-quality."
  > — [Trossen Robotics プレスリリース, 2025/02/25](https://www.einnews.com/pr_news/788100763/trossen-robotics-redefines-value-in-robotics-research-with-next-generation-ai-hardware)

- **「世代を超える進歩」の位置づけ:**
  > "These are not just incremental upgrades—they're a generational leap forward, pushing the boundaries of what affordable research hardware can achieve."
  > — [Trossen Robotics プレスリリース](https://fox4kc.com/business/press-releases/ein-presswire/788100763/trossen-robotics-redefines-value-in-robotics-research-with-next-generation-ai-hardware/)

- **Solo AIの柔軟性:** フィールドでのデータ収集に最適化
  > "Solo AI is designed for data collection in the field and for those NOT needing bimanual manipulation."
  > — [Trossen Robotics 公式サイト](https://www.trossenrobotics.com/mobile-ai)

### 4.2 ネガティブな評判・問題点

- **高価格:** Mobile AIは$40,000超で、ALOHA 2の$27,000と比較して高い
- **Solo AIの制約:** 2台のSolo AIをStationary AIに変換することは不可
  > "2x Solo AIs CANNOT be converted into a Stationary AI"
  > — [Trossen Robotics 公式サイト](https://www.trossenrobotics.com/mobile-ai)

- **独立したユーザーレビューが極めて少ない:** 発売から日が浅く、実際のユーザーからのフィードバックはほぼ確認されていない

### 4.3 品質・耐久性

- WidowX AIベースのため、同等の品質が期待される
- 1年保証 + 生涯サポート

### 4.4 サポート対応

- WidowX AIと同じTrossen Roboticsのサポート体制

### 4.5 VLA/ML研究での使用事例

- 公式にLeRobot、OpenPi、MuJoCoとの統合チュートリアルが提供されている
- ALOHA Kitの後継のため、ALOHA系の研究をそのまま移行可能

### 4.6 総合評価: ★★★☆☆ (3.5/5)

**強み:** ALOHA正統後継の統合キット、手厚いサポート、ソフトウェアエコシステム  
**弱み:** 高価格、レビュー実績が少ない、Solo AIの制約  
**適した用途:** ALOHA系研究を本格的に行う研究室（予算が潤沢な場合）

---

## 5. OpenArm 01 (Enactic)

**カテゴリ:** オープンソース7DOFヒューマノイドアーム  
**スペック:** 7DOF, Damiao QDDモーター, 633mmリーチ, 4.1kg保持可能, BOM $2,500  
**価格:** 完成品（ベンダー経由）$5,000–$8,000前後  
**開発元:** Enactic, Inc.（東京拠点）

### 5.1 ポジティブな評判

- **オープンソースの7DOFアームとして画期的:**
  > "It looks remarkably capable and the info graphic says it can be manufactured for $2500."
  > — [Reddit r/robotics, 2025/07/08](https://www.reddit.com/r/robotics/comments/1lv0wkk/is_openarm_legit/)

- **VLAモデルトレーニングへの適性:**
  > "What I like about openarm is that it's two arms and you can track trajectories, should be good for custom training VLA models."
  > — [Reddit r/robotics, 2025/10/16](https://www.reddit.com/r/robotics/comments/1o7kxji/what_do_you_think_about_openarm_01/)

- **コミュニティの熱量:** GitHub上で活発なDiscussionとIssue管理
- **ドキュメントの質:** "Well documented" との評価
  > "OpenArm seems to be well documented and is developed for physical AI research and deployment in contact-rich environments."
  > — [GOSH Community Forum, 2025/10/11](https://forum.openhardware.science/t/openarm-7dof-humanoid-arm-by-enactic-inc/7191)

- **高ペイロード:** 4.1kgを完全伸長状態で60秒以上保持可能
  > "Able to hold 4.1kg fully extended for over 60s"
  > — [Anvil Robotics 製品ページ](https://shop.anvil.bot/products/openarm-v1-0)

- **backdrivability / compliance:** 安全な人間-ロボットインタラクションに優れる

### 5.2 ネガティブな評判・問題点

- **プラネタリーギアの限界（PiPERと同様）:**
  > "The Damiao actuators in this one use much cheaper planetary gears, which explains the lower cost. If you can accept the greater backlash, weight, noise, etc., of the planetary gears in your application, in tradeoff."
  > — [Reddit r/robotics, 2025/07/08](https://www.reddit.com/r/robotics/comments/1lv0wkk/is_openarm_legit/)

- **ベンダー品質のばらつき — 最大の問題:**
  > "Users faced confusion due to multiple vendors producing OpenArm at varying quality levels, with no clear guidance on where to buy."
  > — [GitHub enactic/openarm Releases](https://github.com/enactic/openarm/releases)

- **「公式」を騙るベンダーの問題:**
  > "We've seen some vendors claiming to be 'official' in order to gain advantages (for example, in motor procurement). If you are a vendor making such claims, please remove any mention of being 'official' from your public materials immediately."
  > — [GitHub enactic/openarm Discussion #273](https://github.com/enactic/openarm/discussions/273)

- **初期リリースの組み立て問題（Release No.2で修正）:**
  - J2モーターケーブルがボルト頭に引っかかる問題
  - ゼロポジションキャリブレーションが手動で誤差が出やすい → 自動化で修正
  - PCBハブが露出しており、コネクタが脱落しやすい → 専用ケース追加
  - カメラマウントのCADがなく、ユーザーが自作する必要があった → 追加
  - ワイヤーハーネスの組み立て説明が不明瞭 → ビジュアルガイド追加
  > — [GitHub enactic/openarm Release No.2, 2025/10/31](https://github.com/enactic/openarm/releases)

- **自作コストの現実:**
  > "I got a quote from an online China based CNC machining site for 56 parts (one arm of the openarm_01) at $1.1k and that's before tariffs."
  > — [Reddit r/robotics, 2025/10/16](https://www.reddit.com/r/robotics/comments/1o7kxji/what_do_you_think_about_openarm_01/)

- **組み立てへの抵抗感:**
  > "I would instead pay a bit more, and get a preassembled one like a Ufactory arm. That way you don't have to build it yourself."
  > — [Reddit r/robotics, 2025/10/16](https://www.reddit.com/r/robotics/comments/1o7kxji/what_do_you_think_about_openarm_01/)

### 5.3 品質・耐久性

- Damiao QDDモーター使用（プラネタリーギア）— ハーモニックドライブと比較してバックラッシュが大きい
- Release No.2でハードウェア信頼性の大幅改善
- EU/UK規制（CE等）への準拠を確認済み
  > "OpenArm hardware has been evaluated and is compliant with applicable EU and UK regulations"
  > — [WowRobo 製品ページ](https://shop.wowrobo.com/products/openarm-open-source-humanoid-robot-arm-by-enactic)
- CNC加工パーツ使用、ただしベンダーによって品質にばらつきあり

### 5.4 サポート対応

- GitHub Issues/Discussions で活発に対応
- Discordコミュニティを運営
- openarm@enactic.ai でのメールサポート
- コミュニティフィードバックへの対応速度は良好（Release No.2は複数のユーザー報告を反映）
- ただし、ベンダー経由の購入ではベンダーのサポート品質に依存

### 5.5 VLA/ML研究での使用事例

- 比較的新しいプロジェクトのため、学術論文での採用事例はまだ限定的
- 7DOFの冗長自由度によるヒューマノイド研究への応用が期待されている
- ROS2対応、MuJoCo/MJCFシミュレーション対応済み
- テレオペレーションスタック搭載（leader-follower構成対応）

### 5.6 総合評価: ★★★☆☆ (3.5/5)

**強み:** 完全オープンソース、7DOF、高ペイロード、活発なコミュニティ、東京拠点  
**弱み:** ベンダー品質ばらつき、組み立てハードル、プラネタリーギアの精度限界、実績がまだ少ない  
**適した用途:** オープンソース志向の研究者、ヒューマノイド研究、DIY志向の開発者

---

## 6. 比較まとめ

| 項目 | COBOT Magic | PiPER/NERO | WidowX AI | Mobile/Stationary/Solo AI | OpenArm 01 |
|------|-------------|------------|-----------|---------------------------|------------|
| **価格** | ~$27,000 | $2,500 | $4,500-5,000 | $12,000-44,000 | $5,000-8,000(完成品) |
| **DOF** | 双腕6DOF×2 | 6/7DOF | 6DOF | 6DOF×2-4 | 7DOF |
| **ペイロード** | 1.5kg/arm | 1.5/3kg | 1.5kg | 1.5kg/arm | 4.1kg |
| **モーター** | BLDC+プラネタリー | BLDC+プラネタリー | 自社設計 | 自社設計 | Damiao QDD |
| **サポート** | ★★★☆☆ | ★★★☆☆ | ★★★★★ | ★★★★★ | ★★★★☆ |
| **ドキュメント** | ★★★☆☆ | ★★★☆☆ | ★★★★★ | ★★★★★ | ★★★★☆ |
| **VLA研究実績** | ★★★★★ | ★★★★☆ | ★★★☆☆ | ★★★☆☆ | ★★☆☆☆ |
| **オープンソース** | 部分的 | SDK公開 | 部分的 | 部分的 | 完全オープンソース |
| **総合評価** | ★★★★☆ | ★★★½☆ | ★★★★☆ | ★★★½☆ | ★★★½☆ |

### 用途別推奨

| 用途 | 推奨機種 | 理由 |
|------|----------|------|
| **VLA研究（予算重視）** | AgileX PiPER | 最安$2,500で論文実績豊富 |
| **VLA研究（品質重視）** | Trossen WidowX AI | サポート品質最高、LeRobot統合 |
| **Mobile ALOHA研究** | AgileX COBOT Magic | Mobile ALOHA完全互換、研究実績最多 |
| **ヒューマノイド研究** | OpenArm 01 | 7DOF冗長自由度、完全オープンソース |
| **統合キット（即座に開始）** | Trossen Stationary AI | セットアップ済み、手厚いサポート |
| **高ペイロード研究** | OpenArm 01 or AgileX NERO | 4.1kg / 3kg対応 |

### 注意点

1. **プラネタリーギアの限界:** PiPER、NERO、OpenArmはすべてプラネタリーギアを使用。ハーモニックドライブ（Franka等）と比較してバックラッシュ・ノイズ・精度でトレードオフがある
2. **新製品リスク:** WidowX AI（2025/03〜）、OpenArm（2025/02〜）はいずれも新しく、長期使用データが不足
3. **ベンダーリスク（OpenArm）:** 購入先によって品質が大きく異なる可能性。公式認定ベンダーリスト（docs.openarm.dev/purchase）を確認すること
4. **中国語ドキュメント問題（AgileX）:** SDKやROSドライバーの一部が中国語のみ。英語化は進行中だが完全ではない

---

*本レポートは公開情報に基づく調査であり、全ての情報の正確性を保証するものではありません。購入前に最新情報をメーカーに確認することを推奨します。*
