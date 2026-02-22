# MEMORY.md - 長期記憶

MAIN SESSIONでのみ参照。整理された重要情報の集約。

---

## konukiプロファイル

- **名前:** konuki (Akira) | **TZ:** JST | **タイプ:** INTP
- **コミュニケーション:** 構造化・正確・再利用可能。意訳しすぎNG。「詳細版+要約版」の2段構え
- **ドキュメント好み:** プロダクト起点、簡潔、当たり前のリスク不要、HW選定は外向け不要、成功率→「要件」に変更
- **仕事スタイル:** 高密度並列処理、まず形にして高速改善、ADHD傾向（ルーティン苦手）

---

## 現在のプロジェクト

### 仕事
- **FY26事業計画** — アドバイザリーボード資料送付済み(2/12)、2/17-20 プロジェクトディスカッション
- **FY26ターゲットタスク選定** — 戦略ドキュメント作成済み(`Projects/rfa/fy26-task-selection-strategy.md`)
- **IndexVLA論文執筆**
- **彩都パーツセンターPoC** — オートストア出庫作業
- **Microsoft協業** — ADS Day 1/2完了(2/19-20)、協業スコープ・DoD・チーム体制確定、LeRobot+Azure推論
- **神戸工場キッティング工程** — VLA適用候補、動画データ解析中
- **TRLC-DK1-X × 2セット購入** — $13,998(~¥216万)、Proforma Invoice依頼済み → 受領後に決裁回付

### YouTube
- チャンネル: AnimeLiveAction / 呪術廻戦シリーズ / 動画ストック作成

### プライベート
- キミチカ（ボードゲーム）説明書
- 部屋掃除

---

## 学んだこと・決定事項

### 2026-02-20（MS ADS Day 1/2・協業スコープ確定）
- ADS Day 1/2 品川開催(2/19-20)、資料作成・発表完了
- データ形式: Rosbag → **LeRobot（HF）** に正式移行
- **Azure remote policy inference** 必須要件に追加（現場GPU制約）
- DoD: Azure arch deployed, Min viable data pipeline (LeRobot), GPU training demo, Hybrid inference validation, Container deployment to edge + Azure remote inference operational
- Out of Scope: 新LLM/GenAI推論システム、本番SLOs/HA、工場IT本番NW統合、大規模メタデータガバナンス
- Well-Architected: Reliability(Data conversion time-sync), Performance(Hybrid inference), OpEx(DataOps/MLOps), Security(Identity/Secret/Audit)
- チーム: PM=島本, Tech Lead(PCI)=桑田/黄瀬, Tech Lead(MS)=Mike Lanzetta/Sean Ma, DataOps=Muruganandam/Oshani, Simulation=Patrick/Paige
- アーキテクチャ: Task Planning / Symbol / Sensorimotor / Robo Sync + Data Platform

### 2026-02-16（TRLC-DK1・RFAデモ・Workshop・彩都計画）
- TRLC-DK1: Jannik返信 — 銀行振込OK、3月末出荷可能
- Proforma Invoice発行依頼済み（Panasonic Connect Co., Ltd., S9棟5F, 横浜市都筑区佐江戸町600番地, 〒224-8539）
- 次: Proforma Invoice受領 → 経理添付で決裁回付 → 承認後に銀行振込
- RFAデモ第8回完了 ✅ / Robotics Responsible AI Workshop(MS)完了 ✅
- 彩都実証計画DRAFT → `Projects/rfa/saito-poc-plan.md`（v4、2/17内部レビュー用）

### 2026-02-13（風見さんMTG・TRLC-DK1購入）
- 風見さんMTGでユースケース選定+データ戦略確認完了 ✅
- 購入決裁: 銀行振込確認 → 経理事前確認(伊藤志麻さん) → 決裁願起案 → 部門長承認(大坪紹二さん) → 合議(鈴木慶太さん) → 経理受理
- 20万超は簿外資産管理必須、決裁願テンプレート: 第2025IG00421号（Unitree G1参考）
- TRLC-DK1リサーチ完了 — ARXファミリー互換、Apache 2.0、自作コスト~¥24-39万

### 2026-02-12（Wisdom RFA TF・データ戦略）
- **Deploy-Time Scaling vs Training-Time Scaling** — 差別化軸として定着
- 神戸キッティング: カメラ設置済み、2025/10〜動画あり
- ヒューマンビデオ: 手先映ってない+アクション不足で直接利用困難 → 短期テレオペ+リカバリー、長期ヒューマンビデオ

### 2026-02-12（EOS社内フィードバック）
- チーム全員でFB議論（黄瀬、奥村、小栗、村上、黒川）
- 主要課題: リソース不足（全員共通）、「言い出しっぺの法則」問題

### 2026-02-12（Dreamina / Seedance 2.0）
- SMSPool香港番号でDouyin登録 → Dreaminaフルアクセス突破
- Seedance 2.0全機能利用可能
- 料金: 標準会員¥119初月→¥199/月（4,000pt、35%off）
- プロンプト: 中国語スタイルプリセット + 日本語脚本が効果的

### 2026-02-09（FY26タスク選定戦略）
- **2軸戦略**: 短期（RoboSync事業接続）+ 中長期（エージェント自律性）を同一タスクの難易度グラデーションでカバー
- **3判断軸**: RoboSync事業接続 / VLA事業価値 / エージェント自律性
- **彩都ピッキング**がメイン候補
- 詳細: `Projects/rfa/fy26-task-selection-strategy.md`

### 2026-02-04（運用ルール）
- 公式ドキュメントでは「小貫/konuki」ではなく「黄瀬」を使用
- NOW.md毎回更新（コンテキスト圧縮対策）

### 2026-02-03（池内先生ディスカッション）
- GMRフレームワークをRFAスキル設計に適用する方針合意
- ICF/PTG/STGによるタスク構造化
- IndexVLAの理論的基盤強化（パースの記号論）
- 詳細: `Projects/rfa/ikeuchi-discussion-summary.md`

### 2026-01-27（Git運用）
- 編集→commit→pushをセット、`[clawd]`プレフィックス
- konukiが言った大事なことは積極的に記録する

---

## 重要な関係者

| 名前 | 役割 |
|------|------|
| 池内先生 | RFA理論アドバイザー（GMR/ICF/PTG/STG） |
| 大坪さん | 戦略主担当（FY26事業計画の承認ライン） |
| 島本さん | FY26事業計画FB、MS協業PM |
| 中田真一さん | 彩都パーツセンターヒアリング |
| 一力さん | 彩都パーツセンター現場担当 |

---

## 運用知識

- **OpenClaw Gateway:** systemd自動起動済み（`/etc/systemd/system/openclaw-gateway.service`）
- **定期タスク:** HEARTBEAT.md参照
