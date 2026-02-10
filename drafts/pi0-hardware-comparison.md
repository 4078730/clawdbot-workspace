# π0 / π0.5 / π*0.6 ハードウェア比較 & UR5×Pi0 調査レポート

*作成日: 2026-02-10*

---

## 1. 各バージョンの使用ハードウェア

### π0（2024年10月）

π0は**8種類のロボット**でデータ収集・評価。

**評価タスクとハードウェア:**

| タスク | ロボット | 成績 |
|--------|---------|------|
| Bussing Easy | **UR5e** | π0圧勝 |
| Bussing Hard | **UR5e** | π0圧勝 |
| Grocery Bagging | **UR5e** | π0圧勝 |
| Shirt Folding | **Bi-ARX**（双腕ARX） | π0圧勝 |
| Toast out of Toaster | **Bi-Trossen**（双腕Trossen） | π0圧勝 |

**UR5e構成詳細:**

| 項目 | 単腕 | 双腕 |
|------|------|------|
| カメラ | リスト + オーバーショルダー（2台） | 3台 |
| アクション次元 | 7次元（6DoF + グリッパー） | 14次元 |
| グリッパー | パラレルジョー | パラレルジョー |

→ **UR5eが主要な評価プラットフォーム**（5タスク中3つ）

### π0.5（2025年4月）

- **モバイルマニピュレーター**が主体（100以上の家庭環境でのデータ収集）
- Cross-Embodiment: π0のデータセット（UR5e、ARX、Trossen含む）を引き継ぎ
- 汎化性能の検証が主目的（OOD環境での成功率）

### π*0.6（2025年11月）

- Recap（RL with Experience & Corrections）で改善
- 3つの実世界タスクで長時間連続稼働を実証:

| タスク | 成果 |
|--------|------|
| エスプレッソ作り | 5:30am〜11:30pm 連続稼働 |
| 箱組立 | チョコレート工場で59箱 |
| 洗濯物畳み | 新しい家で50種類の衣類 |

- OpenPIフレームワーク経由でTrossen AIと統合済み

---

## 2. UR5 × π0 調査レポート

### 2.1 公式サポート状況

**UR5eはπ0の公式サポート対象ロボット（7種の1つ）。**

- π0のベースモデル（pi0_base）に**UR5eの正規化統計量（norm stats）を内蔵**（asset_id="ur5e"）
- **OpenPI公式リポジトリにUR5用example**が存在（`examples/ur5/README.md`、Karl Pertschがマージ）

**参考URL:**
- 論文: https://arxiv.org/abs/2410.24164
- 公式ブログ: https://www.pi.website/blog/pi0
- OpenPI GitHub: https://github.com/Physical-Intelligence/openpi
- UR5 Example: https://github.com/Physical-Intelligence/openpi/blob/main/examples/ur5/README.md

### 2.2 学術論文での事例

| 論文 | ロボット | タスク | 成果 |
|------|---------|--------|------|
| **π0原論文**（PI社, 2024/10） | UR5e | Table bussing, Grocery bagging, Shirt folding | OpenVLA・Octoを全タスクで大幅上回り |
| **π0-FAST**（PI社, 2025/1） | UR5e | Table bussing（20Hz制御） | Flow matchingと同等以上を効率的に達成 |
| **VLAS**（Zhao et al., 2025/2） | UR5 | カップ把持（音声指示） | Berkeley UR5データセットでfine-tune成功 |

### 2.3 HuggingFace上のUR5データセット

| データセット | 内容 | URL |
|-------------|------|-----|
| **lerobot/berkeley_autolab_ur5** | UC Berkeleyデータ。π0の事前学習に使用 | huggingface.co/datasets/lerobot/berkeley_autolab_ur5 |
| **Loki0929/pi0_ur5** | UR5+Pi0専用。1ep/154frames、base+wristカメラ | huggingface.co/datasets/Loki0929/pi0_ur5 |
| **qruisjtu/ur5_lift_200** | UR5リフト。200ep/9920frames、OpenPI対応 | huggingface.co/datasets/qruisjtu/ur5_lift_200 |

### 2.4 コミュニティ状況

- OpenPIのGitHub Discussionでは UR5統合の質問が活発
- LeRobotバージョン間の互換性問題（カラム名`actions` vs `action`）が報告あり
- Penn PAL Lab（ペンシルバニア大学）: π0-FASTの実世界300+トライアル評価（Franka Panda）→ 透明物体把持に成功、課題はearly stopping・衝突回避

---

## 3. UR5e vs Trossen AI 比較

| 項目 | **UR5e** | **Trossen AI** |
|------|---------|---------------|
| **分類** | 産業用協働ロボット | 研究用マニピュレータ |
| **DOF** | 6 | 6 |
| **ペイロード** | **5kg** | **750g** |
| **リーチ** | 850mm | ~450mm程度 |
| **繰返し精度** | ±0.03mm | 研究用レベル |
| **制御周波数** | 500Hz | 500Hz |
| **コントローラ** | URコントロールボックス | iNerve®（HWベース重力補償） |
| **通信** | RTDE / Modbus | Ethernet UDP（10,000Hz非同期） |
| **価格** | 約$35,000〜 | 約$8,000〜（キット） |
| **π0対応** | ✅ 論文での主要評価PF | ✅ OpenPI公式対応 |
| **LeRobot** | ✅ | ✅ ネイティブ対応 |
| **双腕** | 別途構築必要 | Stationaryキットで標準提供 |
| **耐久性** | 産業用（連続稼働） | 研究用（CNCアルミ、10Kサイクル） |
| **安全機能** | ISO準拠、力覚センシング | QDDトルクセンシング |
| **用途** | **現場PoC・量産** | **ラボ検証・データ収集** |

---

## 4. RFAプロジェクトへの示唆

### UR5e路線の追い風

1. **π0公式サポート**: UR5eは7つの学習ロボットの1つ。norm stats・チェックポイント・exampleすべて提供済み
2. **評価実績**: PI社自身がUR5eで全ベースライン圧勝の結果を出している
3. **OpenPIでfine-tuneが比較的容易**: 公式UR5 exampleに沿えばstraightforward
4. **LeRobotデータセット**: Berkeley UR5データが事前学習に含まれており、追加データ収集量を削減可能

### Trossen AIの位置づけ

1. **ラボ検証・データ収集のコスパが高い**: UR5eの1/4以下の価格
2. **双腕が標準**: Stationary AIキットで双腕タスク（段ボール組立等）の検証が容易
3. **OpenPI公式対応**: π0/π0.5のfine-tuneが可能
4. **制約**: ペイロード750gは彩都ピッキング等の実用タスクには不足

### 推奨戦略

| フェーズ | ハードウェア | 用途 |
|---------|------------|------|
| **短期（ラボ検証）** | Trossen AI | データ収集、VLAスキル開発、双腕タスク検証 |
| **短期（現場PoC）** | **UR5e** | RoboSync統合、α版デプロイ、彩都ピッキング |
| **中長期** | UR5e + 産業用双腕（要選定） | β版、本格実証 |

---

## 参考URL一覧

| 資料 | URL |
|------|-----|
| π0論文 | https://arxiv.org/abs/2410.24164 |
| π0.5ブログ | https://www.pi.website/blog/pi05 |
| π*0.6ブログ | https://www.pi.website/blog/pistar06 |
| OpenPI GitHub | https://github.com/Physical-Intelligence/openpi |
| OpenPI UR5 Example | https://github.com/Physical-Intelligence/openpi/blob/main/examples/ur5/README.md |
| π0-FAST論文 | https://arxiv.org/abs/2501.09747 |
| VLAS論文 | https://arxiv.org/abs/2502.13508 |
| Trossen AI | https://www.trossenrobotics.com/ai |
| Penn PAL Lab評価 | https://penn-pal-lab.github.io/Pi0-Experiment-in-the-Wild/ |
