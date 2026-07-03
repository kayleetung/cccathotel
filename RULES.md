# RULES — 鐵律＋地雷憲法

> 這份是 cccathotel 的憲法。**每次開工先讀全文**（很短，撐得住）。
> 每條獨立成立、附 why、附日期。**刪除或放寬任何一條 = 🔴 必須 KK 本人點頭。**
> 違反這裡任何一條，比沒完成任務更嚴重。

---

## 🔴 會弄壞網站 / 不可逆

### R1. 改檔只用 Read／Write／Edit，禁止破壞性就地 shell 指令
永不使用 `sed -i`、`>` 覆寫重導、`truncate`、`tee` 等就地改這個 repo 的檔案。
**Why：** 這資料夾是 OneDrive 同步的。2026-06 曾用 `sed -i` 修換行符，在同步競爭下把
`index.html` 檔尾**截斷**（掉了 photo-strip JS 和 `</script></body></html>`，整頁互動全掛）。
檔案編輯工具走 Windows 正規寫入、逐段替換，不會整檔重寫。

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

---

## 環境事實（不是禁令，但每次都要記得）

- **E1.** bash 掛載的 OneDrive 視圖常落後於 Windows 實檔 → 以 Read／Edit 工具看到的為準；
  用 bash 驗證前先確認它讀到最新內容。
- **E2.** 驗語法：把新片段存 `/tmp` 再 `node --check`，不要對 repo 內檔案直接跑破壞性指令。
- **E3.** sandbox 內 DNS 被擋 → 要查 DNS 用 DoH API（`https://dns.google/resolve?name=...`）。
- **E4.** 線上部署有 CDN 快取 → 驗證用查詢字串繞過：`https://cccathotel.com/?v=時間戳`。
- **E5.** repo root 在 `cccathotel\`（含所有 .md 與 `website/`）。`cccathotel\CCat Website\` 是**空的子資料夾**
  → 若 Cowork 連接的是 `CCat Website`，會看到「資料夾全空」而讀不到任何文件；改用 `request_cowork_directory`
  授權上一層 `cccathotel\`，或請 KK 在 Cowork 把連接資料夾重指到 `cccathotel\` 根。2026-07-03 踩到並記錄。
- **E6.** 別在這個 repo 用 bash 跑 `git` 指令（連唯讀的 `git status` 都算）。git 會在 `.git/` 建
  `index.lock`，在 OneDrive 掛載下 bash 清不掉（unlink「Operation not permitted」），殘鎖會擋住 GitHub
  Desktop commit，最後得 KK 在 Windows 端手動刪 `index.lock` 才能繼續。要看狀態/diff 一律用 GitHub
  Desktop（它讀 Windows 實檔、也是部署真相）。2026-07-03 踩到並記錄。

---

_最後更新：2026-07-03。詳細沿革見 [HISTORY.md](HISTORY.md)。協作方式見 [PROJECT_INSTRUCTIONS.md](PROJECT_INSTRUCTIONS.md)。_
