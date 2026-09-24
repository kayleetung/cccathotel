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
| website/robots.txt | 原爬蟲設定與 sitemap 位置 |
| website/sitemap.xml | 唯一首頁 URL；內容更新時更新 lastmod |
| scripts/verify-release.cjs | 此次發布相對原站基準的 SEO/資源/試算回歸檢查 |
| DEPLOYMENT_LOG.md | 推送計畫、結果、回復基準與程序 |

index.html 用 id 查找：main、about、space、rooms、estimate、booking、faq、contact。照片區找 gallery-grid。原錨點 rooms、photoStrip、faqList、info 維持可用。實際 id 以 HTML 為準。

地址、電話、LINE、字號、房價與時間只在 index.html 維護（R9）。改價格時同步核對 script.js 的試算邏輯及驗證案例；改 FAQ 時同步 JSON-LD，不讓畫面與機器資料不同。

## 住宿日期試算

入住與退房使用原生 date 欄位（calc-checkin / calc-checkout），點選開啟裝置月曆。初始留空，選好有效日期才顯示金額並啟用詢問。以台北日期限制不可選過去入住日，以 UTC 日序差計算晚數，避免時區或日光節約時間造成偏差；維持原本 1–365 晚試算範圍。退房不得與入住同日或更早，錯誤時清除估價並提示修正。詢問視窗自動帶入兩個日期，並讀取 HTML 的 estimate-disclaimer，讓畫面與複製內容的估價但書維持一致。

日期僅供預算試算，不代表有空房。平日費率與特殊假期、長住需另確認的說明維持既有設定。桌機並排兩欄，手機上下排列；原生月曆外觀隨作業系統與瀏覽器不同。此功能目前在本機候選版，發布狀態以 HANDOFF 為準。

## SEO 與外部依賴

保留原 title、description、OG/Twitter、canonical、GA head 原碼、robots 與 JPG URL。LocalBusiness 保留原商家欄位，僅省略尚未核實的 geo；不加入自評星等。FAQPage 與九題可見內容一致。不要為了 SEO 捏造座標或評論。

唯一外部載入腳本為原 Google Analytics；字體使用系統字體，不依賴 Bootstrap、FontAwesome 或 Google Fonts。LINE、電話、地圖與社群是外連。LINE URL 使用既有個人 ID 連結，手機能否成功喚起 App 仍依裝置與安裝狀態。

## 版本與驗證

每次實質修改更新 HTML 檔首與 version meta（YYYY.MM.DD-nn），CSS/JS 的查詢版本同步。純文件更新不動網站版號。查公開 HTML 時加查詢字串排除快取。

發布前執行 node --check website/script.js、node scripts/verify-release.cjs、git diff --check，並在瀏覽器檢查桌機與手機寬度、導覽、估價、照片視窗及聯絡入口。此次基準檢查為特定發布設計；日後合法改商家內容時應同步調整對應斷言，不可只為通過而改回過期資訊。

瀏覽器模擬不能代替真實手機、Google Search Console、GA 後台或 Netlify 部署紀錄。未驗證項目應如實記錄。
