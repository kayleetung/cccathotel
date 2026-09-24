# CLAUDE.md — cccathotel 開工入口

> 這是 Claude Code 在此 repo 自動載入的入口檔。**不要在這裡塞事實**——內容都在下面 import
> 的檔案裡（每個事實只有一個家，見 PROJECT_INSTRUCTIONS.md ②）。2026-07-24 起主力工具改為
> Claude Code（Windows 原生終端機），Cowork 版本停用。

## 開工先讀（下面三份會自動 import 進 context，不用手動 Read）

@PROJECT_INSTRUCTIONS.md
@RULES.md
@HANDOFF.md

## 按任務再讀（不自動載入，需要時用 Read 開）

- 系統結構／§ 區塊索引 → README.md
- 沿革／「為什麼 X 長這樣」→ HISTORY.md
- 網站本體＋商家事實 → `website/index.html`（約 240 行）＋ `style.css` ＋ `script.js`（檔案用途與 id 索引見 README）
- 每次推送的計畫與結果 → DEPLOYMENT_LOG.md
- Codex／其他 agent 的入口是 AGENTS.md（和本檔指向同一套規則；改流程時兩邊都要同步）
- 推送後一定要跑 `node scripts/verify-live.cjs`（RULES R12）

## repo 位置

repo root 就是這個資料夾（含 `.git`、所有 `.md`、`website/`）。**不要在 `CCat Website\` 子資料夾
裡開工，那是空的**（見 RULES.md E5）。
