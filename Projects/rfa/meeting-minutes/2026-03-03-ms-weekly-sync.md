# MS Weekly Sync 議事録

**日時:** 2026-03-03（火）09:00〜09:30 JST  
**形式:** オンライン（Teams）  
**参加者:** Panasonic（黄瀬）/ Microsoft（Sean Ma、Muruganandam、Paige Liu、Jun Kataoka、Akira Kasuga 他）

---

## 各USステータス

### US1 Bronze Zone Spec（担当: Sean Ma / Muruganandam）
- Landing Zone を作成し、データを Bronze Zone に抽出済み
- Bronze Zone Spike のドラフト版を作成予定 → Teamsに PDF 共有予定
- Bronze Zone のフォルダ構造: `日付/ロボット名/データセット名/` 形式
- Rosbagデータのフレーム間ギャップ検出・不適切データ検出の仕組みを開発中
- **ブロッカー:** UIファイルがフォルダ内にあるためスクリプトからロボット名が取得できない問題 → 修正対応中
- **ステータス:** 進行中・ブロッカーなし（技術的問題は自己解決中）

### US2 Silver Zone Spec（担当: 小栗）
- 小栗さんが先週欠席のため作業未着手
- 明日（3/4）からリソースを投入予定
- **アクション:** 黄瀬がメンバーアサインとタスク分解を整理（→ 次回MTGまでに）

### US3 Data Conversion Spec（担当: TBD）
- **アクション:** 黄瀬がアサイン先を確定しタスク分解を実施

### US5 Simulation & Evaluation（担当: Paige Liu）
- ほとんどの質問がPanasonic側の回答待ち
- **Paigeからのリクエスト:** シミュレーション質問への担当者を教えてほしい
- **アクション:** 黄瀬がUS5の担当者・回答をPaigeに連絡

### US6 Engagement Infra Setup（担当: 大坪）
- Azure サブスクリプション: 準備中
- Jira/GitHub: パナソニックメンバーへの招待メール送信予定
- **問題:** エンタープライズアカウントとのアンダーバー命名規則の差異 → MS側でサービスデスクに確認中
- **アクション:** 招待メール受信後にパナソニック側でアカウント確認・受諾

### US7 DevContainer Onboarding（担当: Jun Kataoka）
- Panasonicチーム向けチュートリアルの執筆開始
- GitHubアクセス取得次第、コンテナ設定をGitHubページに掲載 → オンボーディング開始可能

### US8 AzureML Onboarding（担当: Akira Kasuga）
- パイプラインのスケルトン完成
- LeRobot/Diffusion Training → AzureML CLI v2 YAML変換は未完了
- **アクション:** ドキュメントをTeams PDFで共有予定

---

## 黄瀬からの提起事項

### 🎥 録画アクセス問題
- パナソニック側はこれまでの会議録画にアクセスできない状態
- 欠席メンバーのフォローアップに支障が生じている
- **依頼:** MS側で過去・今後の録画へのアクセス権限付与を設定してほしい
- MS側で設定不可の場合は画面録画などの代替手段を検討する

### 📅 物理タスク開始時期
- 横浜サイドはUR5eテレオペレーションのセットアップが未完了
- **物理タスクの開始は3/9（月）以降**

### 👥 パナソニックチームリソース状況
- FY26事業計画対応等の別業務により、これまで十分なリソースを投入できていなかった
- **明日（3/4）からリソースを本格投入**

---

## 運用ルール（確認）
- 各USオーナーはTeamsチャンネルでスレッドを作成しステータスを更新する
- ドキュメントはTeamsにPDF投稿し、レビュアーを指定する

---

## アクションアイテム

| # | アクション | 担当 | 期限 |
|---|-----------|------|------|
| 1 | US2/US3 メンバーアサインとタスク分解 | 黄瀬 | 次回MTGまで |
| 2 | US5 シミュレーション担当者をPaigeに連絡 | 黄瀬 | 今週中 |
| 3 | 録画アクセス権限の設定確認 | MS側（Muruganandam？） | 今週中 |
| 4 | Jira/GitHub 招待メール送信 | MS側（US6チーム） | 今週中 |
| 5 | Bronze Zone Spike PDF をTeamsに共有 | Muruganandam | 今週中 |
| 6 | GitHub/Jira/Confluence 権限設定 | 小栗 | 3/4〜 |
| 7 | AzureML Pipeline ドキュメントをTeamsに共有 | Akira Kasuga | 今週中 |
| 8 | 各USオーナー: Teamsにスレッド作成・ステータス更新 | 各担当 | 随時 |

---

*作成: 黄瀬 / 2026-03-03*
