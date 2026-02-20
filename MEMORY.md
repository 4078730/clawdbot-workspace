# MEMORY.md - 長期記憶

整理された重要情報の集約。MAIN SESSIONでのみ参照。

---

## konukiについて

- **名前:** konuki (Akira)
- **タイプ:** INTP / マルチポテンシャライト
- **タイムゾーン:** JST (Asia/Tokyo)

### コミュニケーション傾向
- 構造化・正確・再利用可能を好む
- 意訳しすぎを嫌う、根拠のある精密さ重視
- 「詳細版 + 要約版」の2段構えが刺さる

### ドキュメント作成の好み（2026-02-17 FY26事業計画レビューより）
- **プロダクト起点で書く**（技術説明から入らない）
- **簡潔さを繰り返し要求** — 冗長さを嫌う
- 特定現場に寄りすぎると抽象度が下がる → 適度なバランス
- 「継続学習サイクルを構築・運用できること自体が差別化」
- 当たり前のリスク（スケジュール遅延、Sim2Realギャップ等）は記載不要
- HW選定・Agentic技術は内部検討事項なので外向け資料には記載不要
- 成功率の欄は「要件」に変更する方がよい

### 仕事スタイル
- 高密度の並列処理
- 「まず形にして高速改善」の反復
- 継続・ルーティンが苦手（ADHD傾向）

---

## 現在のプロジェクト

### 仕事
- **FY26事業計画** — アドバイザリーボード資料送付済み(2/12)、2/17-20 プロジェクトディスカッション
- **FY26ターゲットタスク選定** — 戦略ドキュメント作成済み(`Projects/rfa/fy26-task-selection-strategy.md`)、2/17-20チーム議論予定
- IndexVLA論文執筆
- 彩都パーツセンターPoC検討（オートストア出庫作業）
- **Microsoft協業** — ADS Day 1/2完了(2/19-20)、協業スコープ・DoD・チーム体制確定、LeRobot+Azure推論
- **神戸工場キッティング工程** — VLA適用候補、動画データ解析中
- **TRLC-DK1-X × 2セット購入** — $13,998（~¥216万）、Jannik返答済み✅（銀行振込OK・3月末出荷可能）、Proforma Invoice依頼済み → 受領後に決裁回付

### YouTube
- チャンネル: AnimeLiveAction
- 呪術廻戦シリーズ
- 動画ストック作成

### プライベート
- キミチカ（ボードゲーム）説明書
- 部屋掃除

---

## 学んだこと・決定事項

### 2026-02-09（FY26タスク選定戦略）
- **2軸戦略**を採用: 短期（RoboSync事業接続）と中長期（エージェント自律性）を同一タスクの難易度グラデーションでカバー
- **3つの判断軸**: RoboSync事業接続 / VLA事業価値 / エージェント自律性
- **彩都ピッキング**がメイン候補（難易度グラデーションで短期〜中長期）
- 奥村さんのUR5テレオペ実現が短期軸の基盤
- 来週チームで計画議論をすることで合意
- 詳細は `Projects/rfa/fy26-task-selection-strategy.md`

### 2026-02-13（風見さんMTG・TRLC-DK1購入）
- 風見さんMTGでユースケース選定+データ戦略を確認完了 ✅ — RoboSync/ヒューマンビデオデータ活用方針確定
- **購入決裁プロセス**: 銀行振込可否確認 → 経理事前確認(伊藤志麻さん) → 決裁願起案 → 部門長承認(大坪紹二さん) → 合議(鈴木慶太さん) → 経理受理
- 20万超は簿外資産管理が必須、決裁願テンプレート: 第2025IG00421号（Unitree G1参考）
- TRLC-DK1リサーチ完了 — ARXファミリー互換、Apache 2.0、自作コスト~¥24-39万（キット$3,999の半額以下）

### 2026-02-16（TRLC-DK1進捗・RFAデモ・Microsoft Workshop・彩都実証計画）
- TRLC-DK1: Jannikから返信あり — **銀行振込OK、3月末までに出荷可能**
- Proforma Invoice発行依頼済み（会社名義: Panasonic Connect Co., Ltd., S9棟5F, 横浜市都筑区佐江戸町600番地, 〒224-8539）
- 次ステップ: Proforma Invoice受領 → 経理に添付して決裁回付 → 承認後に銀行振込
- RFAデモ アップデート（第8回）完了 ✅
- Robotics Responsible AI Workshop（Microsoft）完了 ✅
- **彩都パーツセンター実証計画 DRAFT作成** → `Projects/rfa/saito-poc-plan.md`
  - α/β/GA要件定義、動画分析反映、大坪さんFB反映
  - 複数回レビュー・改訂済み（v1→v4）、2/17内部レビュー用

### 2026-02-20（Microsoft ADS Day 1/2・協業スコープ確定）
- **ADS Day 1/2** 品川で開催（2/19-20）、資料作成・発表完了
- **データフォーマット**: Rosbag → **LeRobot（Hugging Face）** に正式移行
- **Azure remote policy inference** を必須要件に追加（現場GPU制約のため）
- **Success Criteria/DoD**: Azure arch deployed, Min viable data pipeline (LeRobot), GPU training demo, Hybrid inference validation, Container deployment to edge + Azure remote inference operational
- **Out of Scope**: 新LLM/GenAI推論システム開発、本番グレードSLOs/HA、工場IT本番ネットワーク統合、大規模メタデータガバナンス
- **Well-Architected Mapping**: Reliability(Data conversion time-sync), Performance(Hybrid inference), OpEx(DataOps/MLOps), Security(Identity/Secret/Audit)
- **チーム体制**: PM=島本, Tech Lead(PCI)=桑田/黄瀬, Tech Lead(MS)=Mike Lanzetta/Sean Ma, DataOps=Muruganandam/Oshani, Simulation=Patrick/Paige
- **アーキテクチャ**: Task Planning / Symbol / Sensorimotor / Robo Sync + Data Platform

### 2026-02-20（Microsoft ADS Day 1/2・協業スコープ確定）
- **ADS Day 1/2** 品川で開催（2/19-20）、資料作成・発表完了
- **データフォーマット**: Rosbag → **LeRobot（Hugging Face）** に正式移行
- **Azure remote policy inference** を必須要件に追加（現場GPU制約のため）
- **Success Criteria/DoD**: Azure arch deployed, Min viable data pipeline (LeRobot), GPU training demo, Hybrid inference validation, Container deployment to edge + Azure remote inference operational
- **Out of Scope**: 新LLM/GenAI推論システム開発、本番グレードSLOs/HA、工場IT本番ネットワーク統合、大規模メタデータガバナンス
- **Well-Architected Mapping**: Reliability(Data conversion time-sync), Performance(Hybrid inference), OpEx(DataOps/MLOps), Security(Identity/Secret/Audit)
- **チーム体制**: PM=島本, Tech Lead(PCI)=桑田/黄瀬, Tech Lead(MS)=Mike Lanzetta/Sean Ma, DataOps=Muruganandam/Oshani, Simulation=Patrick/Paige
- **アーキテクチャ**: Task Planning / Symbol / Sensorimotor / Robo Sync + Data Platform

### 2026-02-12（Wisdom RFA TF・データ戦略）
- **Deploy-Time Scaling vs Training-Time Scaling** — パナソニックの差別化軸として定着
- 神戸工場キッティング工程: カメラ設置済み、2025年10月〜の動画データあり
- 動画解析 → データ指針まとめが黄瀬の次アクション
- 秦さん: データ活用加速、海堂さんのプラットフォーム連携を提案
- ヒューマンビデオデータ: 手先が映ってない・アクション情報不足で直接利用困難 → 短期はテレオペ+リカバリーデータ、長期はヒューマンビデオ

### 2026-02-12（EOS社内フィードバック）
- チーム全員でフィードバック議論実施（黄瀬、奥村、小栗、村上、黒川）
- 主要課題: **リソース不足**（全員共通）、来年度事業化でさらに拡大見込み
- 「言い出しっぺの法則」問題: チーム業務外の価値ある提案をサポートする仕組みがない → マトリクス的掛け持ち＋ツリー型縦割りの複合構造が原因

### 2026-02-12（Dreamina / Seedance 2.0）
- SMSPool香港番号でDouyin登録 → Dreaminaフルアクセス突破
- Seedance 2.0: 全能参考/首尾帧/智能多帧/主体参考/マルチショット全機能利用可能
- 料金: 標準会員¥119初月→¥199/月（4,000pt、Seedance 35%off）を予定
- プロンプト設計: 中国語スタイルプリセット + 日本語脚本が効果的

### 2026-02-03（池内先生ディスカッション）
- **GMRフレームワーク**をRFAスキル設計に適用する方針合意
- **ICF/PTG/STG**によるタスク構造化の方向性確認
- IndexVLAの理論的基盤強化（パースの記号論）
- 詳細は `Projects/rfa/ikeuchi-discussion-summary.md`

### 2026-02-04（運用ルール）
- 公式ドキュメントでは「小貫/konuki」ではなく「黄瀬」を使用
- NOW.mdを毎回更新すべき（コンテキスト圧縮対策）

### 2026-01-27
- Git運用: 編集 → commit → push をセット、`[clawd]`プレフィックス使用
- Github Pull通知: `[clawd]`なら無視、それ以外はpull→報告（変更内容含む）
- konukiが言ったことで大事だと思ったら積極的に記録する

---

## 重要な連絡先・関係者

- **池内先生** — RFAの理論的アドバイザー（GMR/ICF/PTG/STG）
- **大坪さん** — 戦略主担当（FY26事業計画の承認ライン）
- **島本さん** — FY26事業計画フィードバック提供者
- **中田真一さん** — 彩都パーツセンター関連ヒアリング対象
- **一力さん** — 彩都パーツセンター現場担当

---

## 運用知識

### OpenClaw Gateway自動起動（2026-02-17）
- systemdサービス: `/etc/systemd/system/openclaw-gateway.service`
- `systemctl enable openclaw-gateway` で自動起動有効化済み
- WSL起動時に手動restart不要

## 定期タスク・習慣

- **ナイトリーメンテナンス** — ドキュメント整合性チェック、Memory整理、TODO整理
- **モーニングブリーフィング** — 今日の予定・タスクの確認
