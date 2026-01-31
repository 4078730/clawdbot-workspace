# RFA - Robotics Foundation Agent

## 概要

人間の言語指示を理解し、物流・製造現場における**属人的かつ複雑で柔軟な推論が求められるタスク**をロボットが自律的に実行できる知能システム。

## コア技術スタック

```
┌─────────────────────────────────────┐
│ Task Planning Hub (LLM Agent)       │ ← 計画・判断の頭脳
│ タスク理解 / 計画生成 / Re-Plan      │
└─────────────────┬───────────────────┘
                  ↓
┌─────────────────────────────────────┐
│ Symbol Hub / Symbol Integration     │ ← 言語↔物理の接地
│ 意味状態管理 / VLM / IndexVLA        │
└─────────────────┬───────────────────┘
                  ↓
┌─────────────────────────────────────┐
│ Sensorimotor Hub (VLA Policy)       │ ← 身体操作
│ π0ベース動作生成 / KeypointVLA       │
└─────────────────┬───────────────────┘
                  ↓
┌─────────────────────────────────────┐
│ Robo Sync + データ基盤              │ ← 実行基盤
│ ハード抽象化 / 安全制御 / MLOps      │
└─────────────────────────────────────┘
```

## ターゲットドメイン

- **物流/SCM:** 入出庫・梱包・仕分け（EC倉庫など）
- **製造:** 多品種少量組立（Let's Note組立など）

## 差別化戦略

**段階的自律化（Deploy-Time Scaling）**
1. Phase 1: Robo Sync主力 + VLAリカバリー + 人介在
2. Phase 2: VLA主力化、リカバリー能力向上
3. Phase 3: 高自律運用

**データフライホイール:** 運用しながらデータ蓄積 → 現場固有OODデータが競争優位

## FY26 目標（4つの柱）

1. **Robo Sync × VLA統合** — VLAをスキルブロックとして正式化
2. **DataOps** — 使うほど賢くなる基盤
3. **Agent自律適応オペレーション** — 失敗前提のリカバリー
4. **現場実証・事業接続** — 神戸工場/彩都倉庫PoC

## 関連ドキュメント

- [master-context.md](master-context.md) — マスターコンテキスト（技術詳細・アーキテクチャ）
- [fy26-business-plan.md](fy26-business-plan.md) — FY26事業計画（手元ドラフト）
- [data-flywheel-diagram-plan.md](data-flywheel-diagram-plan.md) — データフライホイール図の構成案
- [cxc-demo-context.md](cxc-demo-context.md) — CXCデモの整理メモ
- [glossary.md](glossary.md) — 用語集（用語揺れ防止）
- [maintenance-report-2026-01-31.md](maintenance-report-2026-01-31.md) — ドキュメント整備ログ

## チーム

- **RFMチーム:** 黄瀬（リーダー）、小栗、黒川、朱
- **LLM Agentチーム:** 加賀屋（リーダー）、村上

---

*このプロジェクトについて話すときは、master-contextとfy26-business-planを参照すること*
