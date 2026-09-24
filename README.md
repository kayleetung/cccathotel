# README — 系統現況參考書

規則看 [RULES.md](RULES.md)，目前狀態看 [HANDOFF.md](HANDOFF.md)，沿革看 [HISTORY.md](HISTORY.md)，每次推送看 [DEPLOYMENT_LOG.md](DEPLOYMENT_LOG.md)。

## 技術與部署

希希貓旅的靜態單頁網站，主要動作為 LINE 詢問與預約。無框架、無 npm、無 build 步驟。正式來源為本 repo 的 website/；離線設計資料夾不是部署來源。

GitHub Desktop commit / push → kayleetung/cccathotel 的 main → Netlify 發布 website/ → https://cccathotel.com/。設定維持既有 Netlify UI，不更動 DNS，也不建立 netlify.toml。公開 HTML 的版號才是部署完成證據。

## 檔案與區塊索引

| 檔案 | 用途 |
|---|---|
| website/index.html | 所有可見文案、商家事實、SEO meta、GA 與 LocalBusiness / FAQPage |
| website/style.css | 桌機/手機版面、照片視窗、動畫及 reduced-motion 支援 |
| website/script.js | 試算、導覽、照片視窗、詢問文字、頁尾年份 |
| website/*.jpg | 原六張照片與 LOGO；維持根目錄 URL |
| website/fonts/cc-serif.woff2 | 標題襯線字（Noto Serif TC 子集，約 50 KB，OFL 1.1）；由 scripts/build-font.cjs 產生，不要手改 |
| website/robots.txt | 原爬蟲設定與 sitemap 位置 |
| website/sitemap.xml | 唯一首頁 URL；內容更新時更新 lastmod |
| scripts/verify-release.cjs | 發布前檢查：SEO/GA/圖片不變、版號一致、商家 schema 與畫面一致、FAQ 配對、標題字都在字型裡、44 個試算案例 |
| scripts/verify-live.cjs | 推送後驗證（R12）：等 Netlify 最多 3 分鐘，比對正式站版號和 website/ 每個檔案 |
| scripts/serif-chars.cjs / build-font.cjs | 找出標題用到的字／重建字型子集（需 Python＋fonttools、brotli） |
| scripts/serif-subset-chars.txt | 目前字型子集收錄的字，由 build-font.cjs 寫入 |
| DEPLOYMENT_LOG.md | 推送計畫、結果、回復基準與程序 |

index.html 用 id 查找：main、about、space、rooms、estimate、booking、faq、contact。照片區找 gallery-grid。原錨點 rooms、photoStrip、faqList、info 維持可用。實際 id 以 HTML 為準。

地址、電話、LINE、字號、房價與時間只在 index.html 維護（R9）。改價格時同步核對 script.js 的試算邏輯及驗證案例；改 FAQ 時同步 JSON-LD，不讓畫面與機器資料不同。

## 住宿日期試算

入住與退房使用原生 date 欄位（calc-checkin / calc-checkout），點選開啟裝置月曆。初始留空，選好有效日期才顯示金額並啟用詢問。以台北日期限制不可選過去入住日，以 UTC 日序差計算晚數，避免時區或日光節約時間造成偏差；維持原本 1–365 晚試算範圍。退房不得與入住同日或更早，錯誤時清除估價並提示修正。詢問視窗自動帶入兩個日期，並讀取 HTML 的 estimate-disclaimer，讓畫面與複製內容的估價但書維持一致。

日期僅供預算試算，不代表有空房。平日費率與特殊假期、長住需另確認的說明維持既有設定。桌機並排兩欄，手機上下排列；原生月曆外觀隨作業系統與瀏覽器不同。此功能已於 2026.09.24-04 上線，最新發布狀態以 HANDOFF 為準。

## SEO 與外部依賴

保留原 title、description、OG/Twitter、canonical、GA head 原碼、robots 與 JPG URL。LocalBusiness 的 geo 和 hasMap 取自 Google 商家檔案（2026-09-24 查證：22.5959176, 120.3441024；舊站座標偏北約 2.7 km，是錯的）。不加入自評星等（R6）；「Google 評論」只是連到商家頁的連結。FAQPage 與九題可見內容一致（Google 自 2023-08 起只對政府／醫療網站顯示 FAQ 複合式結果，這份資料的價值主要在內容一致與 AI 搜尋）。

唯一外部載入腳本為原 Google Analytics。標題襯線字是自己託管的子集，原因：iPhone 沒有內建繁中襯線字，2026-09-24 KK 用 iPhone 確認過字型和設計不同。**改了任何 h1/h2/h3、品牌名或關於區的引言，要跑 `node scripts/build-font.cjs`**，否則 verify-release 會擋下（新字在 iPhone 上會變成別的字型）。內文用系統字。LINE、電話、地圖與社群是外連。LINE URL 使用既有個人 ID 連結，手機能否成功喚起 App 仍依裝置與安裝狀態。

## GA 事件（script.js，不動 head 的 GA 原碼，R5）

| 事件 | 觸發 | 參數 |
|---|---|---|
| line_click | 點任何 LINE 連結 | link_location（header / mobile-dock / announcement / rooms / booking / faq / contact / inquiry-dialog） |
| phone_click | 點電話 | link_location |
| map_click | 點地圖導航或 Google 評論 | link_location、link_text |
| inquiry_open / inquiry_copy | 打開詢問視窗／按複製 | room |

要當成轉換來看，需要 KK 在 GA 後台把 line_click、phone_click 標成「重要事件」（Claude 不動 GA 後台）。

## 版本與驗證

每次實質修改更新 HTML 檔首與 version meta（YYYY.MM.DD-nn），CSS/JS 的查詢版本同步。純文件更新不動網站版號。查公開 HTML 時加查詢字串排除快取。

發布前執行 node --check website/script.js、node scripts/verify-release.cjs、git diff --check，並在瀏覽器檢查桌機與手機寬度、導覽、估價、照片視窗及聯絡入口。推送後執行 `node scripts/verify-live.cjs`（R12），PASS 才算上線。verify-release 從頁面讀版號，不用每次改腳本。title/description/OG/canonical/GA 仍和 772c285 基準比對，這些要改必須是刻意決定，改了再同步更新基準。

改版時刻意移除的舊功能：「目前營業中／休息中」狀態（2026-09 改版移除）。完全預約制下顯示「營業中」會引來沒預約的客人，不要加回來。

回復來源是 Git（GitHub 上的 main 歷史）。Codex 在 `.codex\visualizations\...` 留的 zip／bundle 是額外備份，那是工具暫存區，不保證長期存在，不要依賴。

瀏覽器模擬不能代替真實手機、Google Search Console、GA 後台或 Netlify 部署紀錄。未驗證項目應如實記錄。
