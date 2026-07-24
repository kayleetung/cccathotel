# HISTORY — 逐 session 考古

> Append-only。**新的放最上面**，不壓縮、不刪除。
> 查「為什麼 X 長這樣」才需要讀這份。日常開工讀 [HANDOFF.md](HANDOFF.md) 就好。
> 目前狀態與待辦在 HANDOFF；鐵律在 [RULES.md](RULES.md)；協作方式在 [PROJECT_INSTRUCTIONS.md](PROJECT_INSTRUCTIONS.md)。

---

## 2026-07-24 — 健檢 ＋ 無障礙/行為修正（版號 2026.07.24-01）

**健檢結論：網站健康，無 bug。** 線上與本機當時位元組完全一致（60,575 bytes）、HTTP 200、
FCP 816ms、無 console 錯誤、估價器 5 個 case 全過、FAQ schema 9 題＝頁面 9 題、9 張圖 alt 齊全、
手機 375px 無水平溢出。

**做了什麼：**
- **② sitemap.xml**：`lastmod` 從 `2026-06-24` 更新為 `2026-07-24`（07-01 改過內容卻沒更新，
  等於跟 Google 說「我沒更新」）。順手修正原本錯亂的縮排（XML 語意不變）。
- **③ FAQ 無障礙**：JS 動態建立 `aria-controls` ↔ `faqBody{n}` id 配對；並把收合中的答案
  設 `aria-hidden="true"`。**後者是查證時發現的、比原本 aria-controls 更嚴重的問題**——
  `.faq-body` 是 `max-height:0; overflow:hidden`，視覺上看不到但仍留在無障礙樹，
  螢幕閱讀器會把 9 題答案全部念出來。
- **④ 營業狀態**：改為 `setInterval(render, 60000)` 每分鐘重算（原本只在載入時算一次，
  分頁開著跨過 20:00 不會變）；且原本只有「設為休息中」單向路徑，現在雙向都會正確切換。
  同時把脆弱的 `new Date(new Date().toLocaleString('en-US',{timeZone}))` 換成
  `Intl.DateTimeFormat(...).formatToParts()`（解析 locale 字串各瀏覽器格式不一致），
  並對「部分實作午夜回傳 24」加 `% 24` 防護。

**刻意沒做（原本列為①、查證後推翻）：** 給 9 張 `<img>` 加 `width`/`height` 屬性。
理由是**實測 CLS = 0**：CSS 已把每張圖的寬高都釘死（`.photo-strip-item img` 是
`width:100%;height:100%` 且容器固定 260px、`.room-photo` 是 `width:100%;height:210px`），
而且這些 CSS 內嵌在同一個 HTML 檔的 `<style>`，不存在「CSS 還沒載入」的情境。
加上去對 CLS 效益是 0，只是在正式檔製造 9 行無意義改動。**先前「①最值得做」是未實測的推論，已收回。**

**過程中踩到並修掉的自己的 bug：** ③ 第一版用 CSS `visibility: hidden` ＋
`transition: visibility 0s linear 0.4s` 來隱藏收合內容。實測發現**答案一旦打開過就永遠停在
`visibility: visible`**（0s duration ＋ delay 的轉場在此瀏覽器不會回復），反而讓 3 題卡在可讀狀態。
已完全還原該 CSS，改用 JS 切換 `aria-hidden` —— 零視覺變動、動畫完整保留、無轉場時序風險。
（收合區塊內 0 個可聚焦元素，只有 `<br>`/`<strong>`，故 `aria-hidden` 不會造成鍵盤陷阱。）

**測試：** 本機起臨時 HTTP server（不進 repo）在 375px 手機視角實測，最終 **27 PASS / 0 FAIL**，
含 FAQ 快速切換 8 次的狀態一致性、估價器回歸、CLS、R5/R6/R7/R10 護欄。
④ 另做端對端驗證：攔截 `Intl` 偽造 21:00 → 等真實 60s 計時器 → 確認自動翻成「休息中」
（圓點 `#bbb`、文字 `#aaa`）；還原真實時間後再等一輪 → 確認自動翻回「營業中」。

**環境備註：** 這個 session 的 working directory 仍是搬家前的 OneDrive 路徑（session 早於搬遷），
編輯全程使用 `C:\dev\cccathotel` 絕對路徑，檔案正確。**下個 session 請直接在 `C:\dev\cccathotel`
開 Claude Code。** 另：Browser pane 截圖在此環境有裁切問題（563px 擷取 375 CSS px @ DPR2），
視覺截圖不可靠，版面以 DOM 量測為準。

## 2026-07-24 — repo 從 OneDrive 搬到 `C:\dev\cccathotel`

- KK 決定把 repo 從 OneDrive 同步資料夾（`~\OneDrive\Desktop\cccathotel`）搬到本機
  `C:\dev\cccathotel`，與其他 project 放在一起，消除 OneDrive 雲端同步跟 git/檔案寫入打架的風險。
- 使用 robocopy 複製整個資料夾（含 `.git`），驗證新位置 `git status` clean、`git log` 完整、
  remote 指向 `https://github.com/kayleetung/cccathotel.git`。
- GitHub Desktop 重新指向 `C:\dev\cccathotel`。
- **文件更新**：
  - RULES.md：E1 退役（不再有 OneDrive 同步問題）；E5 路徑改為 `C:\dev\cccathotel`；
    E6 歷史描述加註「repo 已搬離 OneDrive」；R1 why 加註搬離 OneDrive 但規則作為安全慣例保留。
  - PROJECT_INSTRUCTIONS.md ⑥：移除 OneDrive 提醒（E1 已退役）、repo root 路徑更新。
  - HANDOFF.md：更新目前狀態、加本次 session 摘要。
- OneDrive 上的舊副本保留，待 KK 確認無誤後自行刪除。

## 2026-07-24 — 搬遷到 Claude Code（tooling session）

- KK 決定把主力工具從 Cowork 換成 Claude Code，在 Windows 原生終端機（Git Bash/PowerShell/cmd）跑，
  不再透過 Cowork 的 Linux sandbox。Cowork 版本停用。
- **新增 `CLAUDE.md`**（repo root）作為 Claude Code 開工入口，用 `@import` 語法自動載入
  PROJECT_INSTRUCTIONS.md／RULES.md／HANDOFF.md 進 context，不需要手動 Read；README/HISTORY
  仍按任務再讀，不自動 import（避免一開工就塞爆 context）。
- **PROJECT_INSTRUCTIONS.md**：入口說明改成指向 CLAUDE.md（移除「內容也貼進 Cowork Project →
  Instructions」的舊描述）；① 開工讀檔順序加註「用 Claude Code 時 1/2 已自動載入」；
  ⑥ 環境雷段落改寫給新環境。
- **RULES.md 環境事實區**：E1／E3／E6 原本是 Cowork sandbox 限定的雷（bash 掛載落後、sandbox DNS
  被擋、bash git 殘留 index.lock），Claude Code 在原生終端機直接操作 Windows 實檔，這三個問題都不
  適用了。**編號保留不動**（避免這篇 HISTORY 舊條目裡的 E1/E5/E6 引用失效），但內容改寫：E1 改記
  「OneDrive 雲端限定檔案可能未同步」的新提醒、E3 標記已退役、E6 改記「git 現在可以直接跑，但
  push/部署仍照 R2」。E5（repo root 路徑雷）保留、只把補救方式從「重指 Cowork 連接資料夾」改成
  「cd 對根目錄」。E2／E4 環境無關，原封不動。
- **明確保留、這次沒有動的東西**：R1–R11 鐵律本身完全沒改；**R2（部署只透過 GitHub Desktop
  commit/push，不自動化推送）刻意保留** — Claude Code 現在技術上可以直接在原生終端機跑
  `git push`，但這是部署控制權的政策決定（🔴 等 KK 點頭），這次只做「讓 Claude Code 讀得到協議」
  的落地設定，沒有動 R2。留給 KK 之後決定要不要調整。
- **順手修正一個舊漂移**：HANDOFF.md 原本寫「2026-07-03 的文件制度尚待 KK commit+push」，但
  `git log` 查證 commit `c2e49d6` 已經 push 上線（`git status` 也是 clean），這是過期未更新的
  待辦，已在 HANDOFF 更正並移除。
- **HANDOFF.md**：清掉已作廢的「Cowork 連接資料夾待重指到 cccathotel 根」待辦（Cowork 停用，
  此項不再適用）。

## 2026-07-03 — 檢視規則＋修正資料夾路徑雷（review session）

- 交接後檢視剛建立的 RULES/HANDOFF/README/HISTORY，逐條對照 `index.html` 實檔驗證：R5（GA
  `G-2KLHF5VMVZ` 在 line 837/842）、R6（無 aggregateRating）、R10（版號 meta line 7＋檔首註解）、
  R1（`.gitattributes` eol=lf）、R8（無 .env/.gitignore）皆屬實。制度內部一致、無錯誤。
- **踩到資料夾路徑雷**：Cowork 連接的是空的子資料夾 `CCat Website\`，真正 repo root 在上一層
  `cccathotel\` → 開工讀不到任何文件，得繞 GitHub Desktop 才找到。加 RULES **E5** 記錄＋HANDOFF 指路，
  KK 已把 Cowork 連接重指到 `cccathotel\` 根。
- **踩到 git 殘鎖**：用 bash 跑 `git status` 診斷時，git 在 OneDrive 掛載的 repo 建了 `.git/index.lock`
  卻因掛載權限清不掉（bash unlink「Operation not permitted」、GitHub Desktop commit 被擋）。由 KK 在
  Windows 端手動刪 `index.lock` 後才 commit 成功。催生 RULES **E6**（別在此 repo 用 bash 跑 git）。
- 澄清假象：先前擔心的「index.html 檔尾截斷」「行數 1442 vs 1446 漂移」「jpg 被刪」全是 bash 掛載落後
  （E1）造成的假象；Read 工具與 GitHub Desktop 顯示真實檔完整（1449 行、正常結尾 `})();</script></body></html>`）。

## 2026-07-03 — 建立文件制度（institution session）

把原本單一 HANDOFF.md 拆成「每個事實只有一個家」的制度：
- 新增 **RULES.md**（鐵律＋地雷憲法）、**HISTORY.md**（本檔）、**README.md**（系統現況）、
  **PROJECT_INSTRUCTIONS.md**（協作協議 8 節）。
- **HANDOFF.md 改瘦**：只留狀態＋待辦＋不做清單＋最近 2 session；刪掉原第八節重複的商家資料
  （商家事實的家改為 index.html，見 R9）。
- **index.html 加可見版號機制**：`<meta name="version">`＋HTML 註解，格式 `YYYY.MM.DD-nn`，
  初始值 `2026.07.03-01`（見 R10）。
- **重大事實更正：host 是 Netlify，不是 GitHub Pages。** 用 DNS 查證（NS = nsone.net／Netlify DNS，
  A = AWS us-east-1），推翻舊 handoff 與原始 session prompt 的「GitHub Pages」說法。詳見 R3。
- 決策：MAP.md 暫不建（index.html 1446 行未達數千行門檻），改用 README 的 § 區塊索引表替代；
  待 index.html 破 ~2500 行再拆獨立 MAP.md。

## 2026-07-01 — 移除重複的入住準備清單（已上線）

移除「入住準備清單」互動勾選區塊（HTML section＋`.check-*`/`.btn-*` CSS＋`checkItems`/
`renderChecklist`/`checkAll`/`resetAll` JS），FAQ 05→04、Contact 06→05 重編號，**保留估價器**。
理由：內容與 FAQ「家長需要準備什麼／入住前可做什麼」重複，勾選框勾完不儲存、不帶進預約流程，
屬純裝飾。2026-07-03 驗證線上已生效（FAQ=04、Contact=05、清單消失、頁面完整渲染）。

> 註：GitHub commits API 端點在驗證當下仍回傳舊 commit `ea06b54`（API 快取），但**線上實際頁面
> 已是新版**——以線上頁面為部署真相，勿被 API 快取誤導。

## 2026-06-24 — SEO / a11y / perf 批次（commit `0446f4a` + `ea06b54`）

- 移除自評 `aggregateRating`（合規，見 R6）
- 加 favicon、apple-touch-icon、theme-color
- 加 preconnect（fonts/CDN）；首屏以下 8 張圖 `loading="lazy"` `decoding="async"`
- 標題層級修正 h5 → h3
- 文字對比 `--text-muted` 改 `#6B655F`（WCAG AA 4.5:1）；FAQ 展開高度放寬
- `areaServed` 收斂為實際服務區（鳳山／前鎮／大寮／苓雅）；sitemap `lastmod` 更新
- 加 `.gitattributes`（`* text=auto eol=lf`）統一換行符
- `ea06b54`：修復上一步被 `sed -i` 截斷的檔尾（此事件催生了 R1）

## 2026-06-06 及更早 — 早期 UX 微調

- `42ca0ea` UX: 簡化 photo strip nav 標籤
- `a28af85` fix: og:url 收尾引號；桌面停用 scroll-snap 以利拖曳
- `561c648` UX: 桌面 room photo 高度 380px
