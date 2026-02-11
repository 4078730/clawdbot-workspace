# Microsoft会議 想定Q&A

*2026年2月12日 Design Thinking WS Review Mtg / Weekly Sync用*

---

## 1. 技術・利用量見積もり質問票について

### Q1: Have you completed the Technical & Consumption Estimation Questionnaire?
**技術・利用量見積もり質問票は完了しましたか？**

**Answer（案）:**
> We are still working on it. Since the project scope is not fully defined yet, we found it difficult to provide accurate estimates for the commercial phase. We would like to first align on the project definition before finalizing the numbers. However, we understand the urgency and will provide rough estimates by [date].

**日本語:**
> まだ作業中です。プロジェクトのスコープがまだ完全に定義されていないため、商用フェーズの正確な見積もりを出すのが難しい状況です。数字を確定する前に、まずプロジェクト定義を合わせたいと考えています。ただし、緊急性は理解していますので、[日付]までに概算を提出します。

---

### Q2: What are the blockers for answering the questionnaire?
**質問票への回答を妨げているものは何ですか？**

**Answer（案）:**
> The main blocker is the uncertainty around the project scope. Specifically:
> - We are unclear about the scale of data we will process (number of robots, data volume)
> - The timeline for production deployment is not yet determined
> - We need to understand the expected workload patterns (batch vs. real-time)
> 
> Once these are clarified in ADS, we can provide more accurate estimates.

**日本語:**
> 主な障害はプロジェクトスコープの不確実性です。具体的には：
> - 処理するデータの規模（ロボット数、データ量）が不明確
> - 本番デプロイのタイムラインが未定
> - 想定されるワークロードパターン（バッチ vs リアルタイム）の理解が必要
> 
> ADSでこれらが明確になれば、より正確な見積もりを提供できます。

---

## 2. 開発チーム体制について

### Q3: Can you confirm the development team structure?
**開発チームの体制を確認できますか？**

**Answer（案）:**
> We are currently reviewing the resource requirements internally. The proposed structure (2 SW Engineers, 2 Data Scientists, 1 Robotics Engineer, 1 PM) is noted. We will confirm the availability and names of team members by [date]. 
> 
> One concern is the 80% dedication requirement—we may need to discuss how this aligns with our other ongoing projects.

**日本語:**
> 現在、リソース要件を社内で検討中です。提案された体制（SWエンジニア2名、データサイエンティスト2名、ロボティクスエンジニア1名、PM1名）は認識しています。チームメンバーの確保状況と氏名を[日付]までに確認します。
> 
> 懸念点として、80%稼働の要件があります。他の進行中プロジェクトとの調整について議論が必要かもしれません。

---

### Q4: How did you calculate the resource requirements?
**リソース要件はどのように算出しましたか？**

**Answer（回答を求める質問 - Microsoft側に確認）:**
> Could you share the assumptions behind the resource calculation? Understanding the breakdown (e.g., which tasks require Data Scientists vs. SW Engineers) would help us assign the right people.

**日本語:**
> リソース算出の前提を共有いただけますか？内訳（例：どのタスクがデータサイエンティスト vs SWエンジニアを必要とするか）が分かると、適切な人員を割り当てられます。

---

## 3. 契約文書（CWAA / Project Description）について

### Q5: What is the status of the CWAA and Project Description review?
**CWAAとProject Descriptionのレビュー状況は？**

**Answer（案）:**
> We have reviewed the Project Description draft internally. We have a few clarification questions:
> - [具体的な質問があれば記載]
> 
> Regarding the signature process, we need to confirm the internal approval workflow. We expect to complete this by [date].

**日本語:**
> Project Descriptionのドラフトは社内でレビューしました。いくつか確認事項があります：
> - [具体的な質問があれば記載]
> 
> 署名プロセスについては、社内承認フローを確認する必要があります。[日付]までに完了する見込みです。

---

### Q6: Are there any concerns with the Technical Goals described in the PD?
**PDに記載された技術目標に懸念はありますか？**

**Answer（案）:**
> The Technical Goals accurately reflect our discussion. We are aligned on:
> - Migrating LeRobot training to Azure
> - Building Data Ops, ML Ops, and Validation Ops pipelines
> - Rosbag-to-LeRobot data conversion
> 
> One area we would like to discuss further is the integration with our existing on-premises infrastructure during the transition period.

**日本語:**
> 技術目標は議論内容を正確に反映しています。以下について合意しています：
> - LeRobot学習のAzure移行
> - Data Ops、ML Ops、Validation Opsパイプラインの構築
> - Rosbag→LeRobotデータ変換
> 
> 追加で議論したい点として、移行期間中の既存オンプレインフラとの統合があります。

---

## 4. Design Thinking Workshop関連

### Q7: What were the key outcomes from the Design Thinking Workshop?
**Design Thinking Workshopの主要な成果は？**

**Answer（確認用 - konukiが内容を把握していれば回答）:**
> [Workshopの内容に基づいて回答]

**日本語:**
> [Workshopの内容に基づいて回答]

---

### Q8: How do you plan to proceed after ADS?
**ADS後の進め方は？**

**Answer（案）:**
> After ADS, we plan to:
> 1. Finalize the solution architecture based on ADS outcomes
> 2. Complete the CWAA/PD signature process
> 3. Begin Sprint 0 on March 2nd as planned
> 4. Start with a pilot scope (e.g., single robot type, limited data) before scaling

**日本語:**
> ADS後の計画：
> 1. ADSの成果に基づきソリューションアーキテクチャを確定
> 2. CWAA/PD署名プロセスを完了
> 3. 予定通り3月2日にSprint 0を開始
> 4. スケールする前にパイロットスコープ（例：単一ロボット、限定データ）から開始

---

## 5. Responsible AI Workshop（2/16）について

### Q9: Who will participate in the Responsible AI Workshop?
**Responsible AI Workshopには誰が参加しますか？**

**Answer（案）:**
> The following members are planned to participate:
> - [参加者リストを記載]
> 
> We understand the workshop covers fairness, bias, and transparency in AI. Our engineering members who will work on the project will attend.

**日本語:**
> 以下のメンバーが参加予定です：
> - [参加者リストを記載]
> 
> ワークショップはAIの公平性、バイアス、透明性を扱うと理解しています。プロジェクトに関わるエンジニアメンバーが出席します。

---

## 6. VLA Data Pipeline関連

### Q10: Can you walk us through the VLA data pipeline proposal?
**VLAデータパイプラインの提案を説明してもらえますか？**

**Answer（小栗さんの資料に基づく - 確認必要）:**
> [小栗さんの資料 20260204_PCO_VLA_data_pipeline.pptx の内容に基づいて回答]

**日本語:**
> [小栗さんの資料の内容に基づいて回答]

---

## 逆質問（パナソニック側からMicrosoft側へ）

### RQ1: What is the expected timeline for ADS?
**ADSの予定時期は？**

### RQ2: Can you share examples of similar robotics projects on Azure?
**Azure上の類似ロボティクスプロジェクトの事例を共有いただけますか？**

### RQ3: What level of detail is needed for the consumption estimate at this stage?
**この段階で必要な利用量見積もりの詳細度は？**

### RQ4: How will Microsoft support us during the development phase?
**開発フェーズでMicrosoftはどのようにサポートしてくれますか？**

---

*作成: 2026年2月12日*
