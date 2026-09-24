# RULES — 鐵律＋地雷憲法

> 這份是 cccathotel 的憲法。**每次開工先讀全文**（很短，撐得住）。
> 每條獨立成立、附 why、附日期。**刪除或放寬任何一條 = 🔴 必須 KK 本人點頭。**
> 違反這裡任何一條，比沒完成任務更嚴重。

---

## 🔴 會弄壞網站 / 不可逆

### R1. 改檔只用 Read／Write／Edit，禁止破壞性就地 shell 指令
永不使用 `sed -i`、`>` 覆寫重導、`truncate`、`tee` 等就地改這個 repo 的檔案。
**Why：** 2026-06 曾用 `sed -i` 修換行符，在 OneDrive 同步競爭下把 `index.html` 檔尾**截斷**
（掉了 photo-strip JS 和 `</script></body></html>`，整頁互動全掛）。repo 已搬離 OneDrive（2026-07-24），
但此規則作為安全慣例保留。檔案編輯工具走 Windows 正規寫入、逐段替換，不會整檔重寫。

### R2. 部署只透過 GitHub Desktop commit／push
不用任何 API token、`git push` CLI 自動化、或第三方推送。改完檔 → KK（或經 KK 同意用
computer-use 代操作）在 GitHub Desktop commit＋push。
**Why：** KK 要親自掌控每次上線；部署鏈無 token（見 R9）。2026-06 起的既定流程。

### R3. Host 是 Netlify，不是 GitHub Pages
部署鏈：**GitHub Desktop push → main → Netlify 自動偵測 build → cccathotel.com**。
publish 目錄 = `website/`（設在 Netlify UI，repo 無 netlify.toml）。網域走 Netlify DNS（NS1）。
**Why：** 2026-07-03 用 DNS 查證：NS = `dns1~4.p08.nsone.net`（Netlify DNS）、A = AWS us-east-1
IP，非 GitHub Pages 的 185.199.x。舊 handoff 誤寫「GitHub Pages」，已更正。改任何部署設定 = 🔴。

### R4. 版本可上線的最小步，斷在任一步網站都要完全正常
每個任務拆成可獨立 commit 上線的小步，**不留半成品**。若一次改到一半，也要確保當下的檔案
語法完整、頁面能渲染到 footer。
**Why：** 這是生產網站，隨時可能被 KK push 上線。

---

## 🔴 資料 / 合規 / 安全

### R5. 不得移除或竄改 Google Analytics 追蹤碼 `G-2KLHF5VMVZ`
`<head>` 裡的 gtag script 與這組 Measurement ID 不可刪、不可改。
**Why：** 它是網站流量分析的唯一來源；一旦中斷，訪客數據無法回補、歷史斷點。2026-07-03 立。

### R6. 不得加回「自評星等」aggregateRating
LocalBusiness schema 內不得放店家自評的 `aggregateRating`／`review`。
**Why：** 頁面上沒有真實評論，屬 Google self-serving review，不合規。真實評分留在 Google 商家檔案。
2026-06-24 移除，勿復原。

### R7. 假資料 / dummy 絕不進正式檔
不得為了「先放著」把假評論、假電話、假房價、placeholder 圖塞進 `website/`。
**Why：** 這是正式產品，會被真實客人看到。

### R8. 敏感事的紅線一律 KK 本人
密碼、token、金鑰、付款、GitHub/Netlify 帳號登入 — Claude 不碰，一律 KK 親自輸入。
本 repo 目前**無任何機密檔**（無 .env、無 .gitignore、全公開靜態）。若未來要加機密，先問 KK。
**Why：** 安全邊界；KK 掌控憑證。2026-07-03 查證無機密檔。

---

## 🟡 一致性 / 文件

### R9. 商家事實只有一個家 = `index.html`
地址、電話、LINE ID、特寵業字號、房價、營業時間的**真相在 `index.html`**。
RULES／README／HANDOFF **不得複製這些值**，只能指向 index.html。
**Why：** 「每個事實只有一個家」。複製 = 弱模型只改一份 = 漂移。2026-07-03 立。

### R10. 每次實質變更要更新版號 meta
改動 `website/index.html` 的內容/行為後，更新 `<meta name="version">`（格式 `YYYY.MM.DD-nn`，
同日第 n 次遞增 nn）。純文件（.md）變更不需動版號。
**Why：** 讓「線上跑的是哪一版」可 Ctrl-F 驗證。2026-07-03 立。

### R11. 歷史歸檔、不刪除
舊 session 紀錄搬 HISTORY.md（append-only），不壓縮、不刪。HANDOFF 只留最近 2 個 session。
**Why：** 「為什麼 X 長這樣」的考古價值；弱模型別重蹈覆轍。

### R12. 推送不等於上線：推完一定要跑 `node scripts/verify-live.cjs`
會改到 `website/` 的推送，推送後必須執行 `node scripts/verify-live.cjs`（最多等 3 分鐘，比對正式站版號和
website/ 每個檔案）。**這支腳本 PASS 之前，不得回報「已上線」**。FAIL 就當下告訴 KK，照 E7 處理；不准寫
「結果另補」、「稍後確認」就收工。純文件的 [skip netlify] 提交不需要跑。
**Why：** 2026-09-24 Codex 推送 -05 後，自己的上線檢查已經失敗，卻寫「實際結果另補」就結束。Netlify 其實是
建置失敗，正式站停在舊版 47 分鐘沒人知道。GitHub 已同步 ≠ Netlify 已部署 ≠ 客人看得到。2026-09-24 立。

---

## 環境事實（不是禁令，但每次都要記得）

> 2026-07-24 起主力用 Claude Code 在 Windows 原生終端機（Git Bash/PowerShell/cmd）跑，不再透過
> Cowork 的 Linux sandbox。E1／E3／E6 原本記錄的是 sandbox 限定的雷，內容已更新／退役；
> 沿革見 [HISTORY.md](HISTORY.md) 2026-07-03 與 2026-07-24。編號保留不變，避免舊文件互引失效。

- **E1.**（已退役）repo 已從 OneDrive 搬到 `C:\dev\cccathotel`（2026-07-24），不再有雲端同步問題。
  歷史：原本記錄 OneDrive 雲端限定檔案可能未同步到本機的風險；更早記錄 Cowork sandbox bash
  掛載落後的雷。兩者皆不再適用。舊細節見 HISTORY。
- **E2.** 驗語法：把新片段存暫存檔再跑 `node --check`，不要對 repo 內檔案直接跑破壞性指令。
- **E3.**（已退役）2026-07-24 前此號記錄「Cowork sandbox 內 DNS 被擋，要用 DoH API 查」。Windows
  原生終端機網路正常，不需要繞過。舊細節見 HISTORY 2026-07-03。
- **E4.** 線上部署有 CDN 快取 → 驗證用查詢字串繞過：`https://cccathotel.com/?v=時間戳`。
- **E5.** repo root 在 `C:\dev\cccathotel`（含所有 .md 與 `website/`）。`CCat Website\` 是**空的子資料夾**
  → cd／開 Claude Code 都要對根目錄，不要進空的子資料夾。2026-07-03 踩到並記錄；
  2026-07-24 搬離 OneDrive 到 `C:\dev\`。
- **E6.** git 現在可以直接在原生終端機跑（`status`／`diff`／`log`／`add`／`commit` 等都可以）。**但
  push／部署仍照 R2：不自動化推送**，流程沒變，除非 KK 明確決定調整。
  （早期記錄「別在此 repo 用 bash 跑 git，會在 OneDrive 掛載下留殘留 `index.lock`」——那是 Cowork
  sandbox + OneDrive 的問題。repo 已搬離 OneDrive（2026-07-24），git 操作無此風險。
  舊細節見 HISTORY 2026-07-03。）
- **E7.** Netlify 建置快取可能損壞：症狀是 log 出現 `mv: cannot overwrite ... Directory not empty` 後
  開始 `make`／`g++` 編譯 Node，最後 `Install dependencies` 超時，正式站停在上一版。處理方式是 Deploys →
  Trigger deploy →「Deploy project without cache」（不改設定）。**不要照 Netlify AI 建議去鎖舊版 Node**；
  網站不需要 Node，要鎖版本屬於改部署設定（🔴，見 R3）。推送後照 R12 跑 `node scripts/verify-live.cjs`，
  GitHub 已同步不等於已上線。清快取重新部署後要再跑一次，PASS 才算修好。2026-09-24 踩到並記錄（見 HISTORY）。

---

_最後更新：2026-09-24（新增 R12 推送後驗證、E7 Netlify 快取；給其他 agent 的入口見 AGENTS.md）。
前次：2026-07-24（repo 從 OneDrive 搬到 `C:\dev\cccathotel`；E1 退役、E5/E6/R1 why 更新）。
詳細沿革見 [HISTORY.md](HISTORY.md)。協作方式見 [PROJECT_INSTRUCTIONS.md](PROJECT_INSTRUCTIONS.md)。_
