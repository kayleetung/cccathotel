# PROJECT INSTRUCTIONS — cccathotel 協作協議

> 這份是「**怎麼一起工作**」的協議。2026-07-24 起主力工具改為 Claude Code：
> repo root 的 [CLAUDE.md](CLAUDE.md) 會自動 `@import` 這份＋RULES.md＋HANDOFF.md，
> 不用手動貼進任何介面。Cowork 版本（貼進 Project → Instructions）已停用。
> 文件是真相載體，CLAUDE.md 只是引路。維護習慣與另一個 repo `cccat-pos` 一致。

---

## ① 開工讀檔順序

每個 session 一開始，**照這個順序讀**：

1. **HANDOFF.md** — 現在做到哪、待辦、不做清單、最近 2 個 session。
2. **RULES.md — 讀全文**。這是憲法，很短，撐得住。動手前要能引用條號。
3. **按任務再讀**：要懂系統結構 → README.md（含 § 區塊索引）；查「為什麼 X 長這樣」→ HISTORY.md。

不要一開始就把 index.html 整檔讀進工作記憶（1400+ 行）。用 README 的 § 索引 Ctrl-F 定位需要的段。

> 用 Claude Code 時，1.／2.（HANDOFF.md／RULES.md）已由 CLAUDE.md 的 `@import` 自動載入 context，
> 不用手動 Read；上面的順序是心智模型，不是操作步驟。

## ② 文件地圖（每個檔是什麼的家）

| 檔案 | 是什麼的家 | 什麼時候寫它 |
|------|-----------|-------------|
| **RULES.md** | 鐵律＋地雷。每條獨立＋why＋日期 | 新增/放寬鐵律（放寬=🔴） |
| **HANDOFF.md** | 目前狀態＋待辦＋不做＋最近 2 session | 每個 session 收尾 |
| **HISTORY.md** | 逐 session 考古，append-only 新的在上 | 每個 session 收尾（搬舊的過來） |
| **README.md** | 系統「現在的樣子」＋§ 索引 | 系統行為/結構改變時，直接改對應章節 |
| **PROJECT_INSTRUCTIONS.md** | 協作方式（本檔） | 協作流程本身要調整時 |
| **index.html** | 網站本體＋**所有商家事實的唯一真相** | 改網站時 |

原則：**每個事實只有一個家；每次必讀的要夠短；歷史歸檔、不刪除。**

## ③ 判斷準則

- **Discovery 先做**：動手前先確認需求。先講的方案上線後常縮水，多問一句勝過白做。
- **「不做」是合法產出**：如果最好的答案是「這個不該做」或「先別做」，直接說，不用硬生一個改動。
- **最小改動優先**：能小改就不大改。
- **加法優於改寫**：新增區塊/檔案比重寫既有的安全（重寫易連坐弄壞既有行為）。
- **被質疑時用證據回答**，不要為了順從亂改（見 ⑧ 自檢）。

## ④ 決策三層

- 🟢 **可直接做**：純視覺微調、文案錯字、加註解、更新文件、明顯無害的小修。做完回報即可。
- 🟡 **先回報再做**：新功能、動到既有 JS 邏輯、改版面結構、影響 SEO/schema、任何「我不確定 KK 要不要」的。
  先講方案＋影響，等 KK 回應。
- 🔴 **等 KK 點頭**：刪除/放寬任何 RULES 條、改部署設定（Netlify/DNS/branch）、動 GA、
  處理任何憑證/付款、不可逆的事。**絕不自行決定。**

判不準是 🟢 還 🟡 → 當它是 🟡。

## ⑤ 部署與安全

- 部署鏈：GitHub Desktop commit＋push → main → Netlify 自動 build → cccathotel.com（見 README「部署架構」）。
- **無 token、無自動化推送**（R2）。密碼/金鑰/帳號登入一律 KK 本人（R8）。
- 每個 commit 都要能獨立上線，斷在任一步網站都正常（R4）。
- 驗證上線：抓 `https://cccathotel.com/?v=時間戳` 繞快取；確認版號 meta、頁面完整渲染到 footer。
- **不要信 GitHub commits API 的即時性**（會快取）；以線上實際頁面為部署真相。

## ⑥ 環境雷（這台 Windows 機器特有）

> 2026-07-24 起在 Windows 原生終端機（Git Bash/PowerShell/cmd）跑 Claude Code，不再透過 Cowork
> 的 Linux sandbox。repo 已從 OneDrive 搬到 `C:\dev\cccathotel`，不再有雲端同步問題。
> 細節與沿革見 [RULES.md](RULES.md) 的「環境事實」區（E1–E6）。

- **repo root 是 `C:\dev\cccathotel`**，`CCat Website\` 子資料夾是空的 → cd／開 Claude Code 都對根目錄
  （RULES E5）。
- **驗語法**：新片段先存暫存檔再檢查，不要對 repo 檔案直接跑破壞性就地指令（R1／RULES E2）。
- **git 現在可以直接在終端機跑**（RULES E6）。**但 push／部署仍照 R2：不自動化推送**，流程沒變，
  除非 KK 明確決定調整。
- **線上驗證**：抓 `https://cccathotel.com/?v=時間戳` 繞快取確認版號 meta（RULES E4）。

## ⑦ 文件維護協議 ＋ Session 收尾 ritual

**事件 → 更新哪份** 對照表：

| 發生什麼 | 更新哪份 |
|----------|----------|
| 改了網站內容/行為 | index.html（＋遞增版號 meta）→ 若結構變，改 README 對應章節 |
| 踩到新雷 / 立新鐵律 | RULES.md（新增條號＋why＋日期） |
| 完成一個 session 的工作 | HANDOFF.md（更新狀態/待辦）＋ HISTORY.md（把這 session 摘要加到最上） |
| HANDOFF 超過 2 個 session 或 ~150 行 | 把最舊的整段搬去 HISTORY.md |
| 系統結構/依賴改變 | README.md（直接改，不寫 changelog） |

**Session 收尾 ritual（每次結束前做）：**
1. 主動更新上表對應的文件（不等 KK 提醒）。
2. 交叉檢查文件互引沒有死連結。
3. 在對話裡給 KK 一段**可複製的交接 prompt**（下個 session 貼上就能接手）。
   — 記住：**文件是真相載體，交接 prompt 只是引路**；prompt 不該塞事實，只指路。

## ⑧ 模型分工與自檢（行為協議）

**分工（按任務性質，不是能力高低）：**
- **開規格/改制度/查證關鍵事實** → 由開規格的模型（Opus 級）主導：定義 scope、拆步驟、立 RULES。
- **照既定規格施工** → 施工模型（Sonnet 級）：按已批准的方案改檔，不擅自擴張 scope。
- **無害單步** → 輕量模型（Haiku 級）：只做明確、單一、可逆、無副作用的一步（如改錯字、更新 lastmod）；
  遇到需要判斷或多步的，停下來回報，不硬做。

**自檢協議（所有模型都要遵守）：**
1. **開工複述任務**，並主動列出 **Non-scope**（這次不做什麼），跟 KK 對齊再動手。
2. **動手前引用相關 RULES 條號**（例如「依 R1 我用 Edit 不用 sed」）。
3. **任務超出你這輪該做的範圍 → 先回報，不硬做**。
4. **同一個問題連續失敗兩次 → 停手**，把現況和卡點講清楚，不要鬼打牆。
5. **被質疑時用證據回答**（查檔案、查 DNS、抓線上 HTML），不為了順從亂改。

---

## KK 的溝通習慣

- 繁體中文＋English 中英參雜、台灣慣用語（KK 是 ABC/CBC）。精簡直接、不包糖衣、**可以反駁 KK**。
- **新想法走六步**：Discovery → 產品判斷 → MVP 邊界（**主動列 Non-scope**）→ 實作規劃 → 驗證方式 →
  風險＋待決。純視覺微調可跳過，確認細節後直接做。
- 每個任務拆成可獨立 commit 上線的小步，不留半成品。
- 假資料絕不混進正式產品。

_鐵律全文見 [RULES.md](RULES.md)。最後更新 2026-07-24。_
