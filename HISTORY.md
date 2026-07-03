# HISTORY — 逐 session 考古

> Append-only。**新的放最上面**，不壓縮、不刪除。
> 查「為什麼 X 長這樣」才需要讀這份。日常開工讀 [HANDOFF.md](HANDOFF.md) 就好。
> 目前狀態與待辦在 HANDOFF；鐵律在 [RULES.md](RULES.md)；協作方式在 [PROJECT_INSTRUCTIONS.md](PROJECT_INSTRUCTIONS.md)。

---

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
