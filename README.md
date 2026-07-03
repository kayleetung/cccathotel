# README — 系統現況參考書

> 這份描述系統「**現在的樣子**」。行為變了 → **直接改這裡對應章節**，不要在這裡寫 changelog
> （沿革在 [HISTORY.md](HISTORY.md)）。鐵律看 [RULES.md](RULES.md)、協作方式看
> [PROJECT_INSTRUCTIONS.md](PROJECT_INSTRUCTIONS.md)、目前待辦看 [HANDOFF.md](HANDOFF.md)。

---

## 這是什麼

希希貓旅 CC Cat Boarding 的官方網站 — 高雄鳳山純貓住宿。單頁式（single-page）行銷網站，
給訪客看服務、房價、預訂流程、FAQ、聯絡方式，主要轉換動作是加 LINE 詢問/預約。

## 技術棧

- **單一檔案**：`website/index.html`（約 1400+ 行，HTML + 內嵌 `<style>` + 內嵌 `<script>`）。
  無 build 步驟、無框架、無 npm。改完直接就是成品。
- **外部依賴（皆走 CDN）**：
  - Bootstrap 5.3.0（jsDelivr）— 只用少量 layout/nav
  - FontAwesome — icon（`fa-solid` / `fa-brands` class）
  - Google Fonts — `Noto Serif TC`（標題）＋`Noto Sans TC`（內文）
  - Google Analytics gtag `G-2KLHF5VMVZ`（流量分析，**受 R5 保護，勿刪改**）
- **結構化資料**：`LocalBusiness` + `FAQPage` JSON-LD（在 `<head>`）。**無** `aggregateRating`（見 R6）。

## 部署架構

```
本機編輯 (Read/Write/Edit)
   ↓
GitHub Desktop commit + push  →  GitHub repo: kayleetung/cccathotel (branch: main)
   ↓ (Netlify 偵測 push，自動 build)
Netlify  →  publish 目錄 = website/  →  https://cccathotel.com/
                                          （網域走 Netlify DNS / NS1 nameservers）
```

- **Host：Netlify**（非 GitHub Pages — 見 R3 的查證）。build 設定在 Netlify UI，repo 內無 netlify.toml。
- push 後約 1 分鐘上線。線上有 CDN 快取，驗證用 `https://cccathotel.com/?v=時間戳` 繞過。
- 無 API token、無自動化推送（見 R2）。

## 檔案佈局

| 路徑 | 是什麼 |
|------|--------|
| `website/index.html` | 整個網站（唯一實質程式檔） |
| `website/*.jpg` | 6 張圖：logo、cat-peek、cat-room、room-hall、room-hall2、room-interior |
| `website/robots.txt` | 允許全部爬蟲 + 指向 sitemap |
| `website/sitemap.xml` | 單一 URL，`lastmod` 手動更新 |
| `.gitattributes` | `* text=auto eol=lf`（統一換行符，避免整檔 diff 雜訊） |
| `RULES.md` / `HANDOFF.md` / `HISTORY.md` / `README.md` / `PROJECT_INSTRUCTIONS.md` | 文件制度 |

## 版本機制

`website/index.html` 的 `<head>` 有 `<meta name="version" content="YYYY.MM.DD-nn">`（並在檔首 HTML
註解放一份）。每次改動 index.html 的內容/行為就遞增（同日第 n 次改遞增 `nn`）。純 .md 變更不動版號。
驗證線上版本：抓 `https://cccathotel.com/?v=x` 後 Ctrl-F `name="version"`。

## § 區塊索引（Ctrl-F 用，刻意不記行號）

`index.html` 用 `/* ─── 名稱 ─── */`（CSS）和 `<!-- 名稱 -->`（HTML）分區。要定位就 Ctrl-F 這些字串：

**`<style>` 內（CSS，依序）：** `Scroll reveal` · `Navbar` · `Notice bar` · `Hero` ·
`Section scaffold` · `About section` · `Highlight strip` · `Room cards` ·
`Night counter / calculator` · `Steps` · `FAQ` · `Contact` · `Social section` · `Footer` ·
`Photo gallery strip` · `Room photo` · `Floating CTA` · `Accessibility: reduced motion` ·
`Desktop photo strip arrows` · `Photo strip: centred desktop nav bar`

**`<body>` 內（HTML section，依序）：** `Navbar` · `Notice Bar` · `Hero` · `Highlight strip` ·
`About`（`about-section`）· `Photo Gallery Strip`（`id="photoStrip"`）· `Rooms`（`id="rooms"`，含
`Calculator`）· `Booking Steps` · `FAQ`（`id="faqList"`）· `Contact`（`id="info"`）· `Social` ·
`Footer` · `Floating CTA`

**`<script>` 內（JS 區塊，依序）：** `Scroll reveal` · `Calculator`（估價器，含 `catOptions` 房型上限
邏輯）· `FAQ`（手風琴）· `Operating status`（依台北時間切「營業中/休息中」）· `Desktop photo strip`
（拖曳＋箭頭）

## 商家事實在哪

地址、電話、LINE ID、特寵業字號、房價、營業時間的**真相全在 `index.html`**（見 R9，別處不複製）：
- 房價/房型上限 → Ctrl-F `Rooms` 區＋JS 的 `catOptions`
- 地址/電話/LINE/字號/時間 → Ctrl-F `Contact`（`id="info"`）區
- 服務區域 / SEO 描述 → `<head>` 的 meta 與 JSON-LD

## 頁面區塊順序（給訪客看到的）

Hero →（01）About →（—）Photo Strip →（02）Rooms & Rates + 估價器 →（03）How to Book →
（04）FAQ →（05）Contact → Footer → Floating CTA（手機版底部常駐 LINE + 電話）
