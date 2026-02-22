# HEARTBEAT.md - 定期タスク

---

## ⏰ Nightly (23:00 JST cron)

毎晩自動実行。以下を順番にこなす。

### 1. ワークスペース同期
```bash
git -C /mnt/c/Users/user/clawdbot-workspace pull
```

### 2. Memory整理
- 当日の `memory/YYYY-MM-DD.md` を確認
- 繰り返し参照しそうな情報 → `MEMORY.md` に昇格
- `memory/NOW.md` が古ければ更新

### 3. ドキュメント整合性チェック
- `Projects/rfa/master-context.md` を基準に用語・日付の矛盾を検出
- 問題があれば修正 or 翌朝ブリーフに含める

### 4. TODO整理
- `TODO.md` の期限切れ・完了済みを整理

### 5. commit & push
変更があれば:
```bash
git -C /mnt/c/Users/user/clawdbot-workspace add -A && git commit -m "[clawd] nightly maintenance $(date +%Y-%m-%d)" && git push
```

---

## 🌅 モーニングブリーフ (朝 7:00-9:00)

konukiが起きてきたら送る。

```
📅 今日の予定: （カレンダーから取得）
✅ 今日やるべきこと: （TODO + 期限近いもの）
📝 昨日のサマリー: （日次ノートから要約）
💡 提案: （あれば）
```

---

## 📋 MTG前の準備

カレンダーの各MTGについて、1時間前 or モーニングブリーフ時に:

```
📋 [MTG名] (HH:MM-)
関連資料: ...
要点/アジェンダ案: ...
```

---

## 📊 週次チェック (週1回、nightlyに含める)

- 主要ドキュメント間の用語・日付矛盾
- TODO/WIPの放置チェック
- 結果は `🔍 整合性レポート` として記録
