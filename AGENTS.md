# AGENTS.md — 給 Codex 與其他 AI agent 的開工入口

> Claude Code 讀 CLAUDE.md，Codex 和其他 agent 讀這份。兩份指向**同一套**規則，不要各自另立規矩。
> 這裡只放「在哪裡、要跑什麼」，事實和理由都在下面列的檔案裡（RULES R9：每個事實只有一個家）。

## 開工先讀（依序）

1. [HANDOFF.md](HANDOFF.md) — 現在做到哪、待辦、限制
2. [RULES.md](RULES.md) — **全文**。鐵律 R1–R12 和環境事實 E1–E7。違反鐵律比沒完成任務更嚴重。
3. [PROJECT_INSTRUCTIONS.md](PROJECT_INSTRUCTIONS.md) — 協作方式、決策三層（🟢／🟡／🔴）
4. 需要時再讀：[README.md](README.md)（系統結構、字型、GA 事件）、[DEPLOYMENT_LOG.md](DEPLOYMENT_LOG.md)（發布紀錄）、[HISTORY.md](HISTORY.md)（沿革）

## 改網站的固定流程

1. 改 `website/`，照 R10 遞增版號（HTML 註解、version meta、CSS/JS 的 `?v=` 三處要一致）。
2. 改了任何 h1/h2/h3、品牌名、關於區引言 → `node scripts/build-font.cjs`（原因見 README「SEO 與外部依賴」）。
3. 推送前：`node --check website/script.js`、`node scripts/verify-release.cjs`、`git diff --check` 全部通過。
4. 在 DEPLOYMENT_LOG 最下方的「發布紀錄」表加一列（簡化格式，見該檔開頭）。
5. 推送只走 GitHub Desktop，而且要 KK 當次同意（R2）。不用 CLI push、不用 token。
6. **推送後：`node scripts/verify-live.cjs`（R12）。PASS 之前不得說「已上線」。** FAIL → 當下回報 KK，照 E7 處理。

## 最常踩的雷（細節看括號裡的出處）

- Netlify 建置失敗，但 GitHub 已同步 → 正式站停在舊版（E7、R12）。不要照 Netlify AI 建議去鎖舊版 Node。
- 不要寫「結果另補」然後收工（R12；-05 事件，見 HISTORY 2026-09-24）。
- GA：不動 head 的 GA 原碼（R5）。GA 在 KK 的第二個 Google 帳號，預設帳號會看到「開始使用」頁，**不要按**（HANDOFF）。
- 不加自評星等（R6），不捏造評論、座標、照片（R7）。
- 回復來源是 Git。不要把備份只放在工具自己的暫存資料夾（例如 `.codex\...`），也不要在交接文件裡把它們當成主要回復方式。
- `.claude/` 是 Claude Code 的本機設定，不要提交。
- 文案：繁體中文（台灣用語），對客人用「您」，不用「牠」。其他偏好見 HANDOFF。

## 收工前

更新 HANDOFF（狀態、待辦）和 HISTORY（這次做了什麼、為什麼）。有新的雷就寫進 RULES（新增條號＋why＋日期）。
