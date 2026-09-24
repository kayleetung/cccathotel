# HANDOFF — 目前狀態

開工先讀本檔，再讀 [RULES.md](RULES.md) 全文。系統參考 [README.md](README.md)，每次推送看 [DEPLOYMENT_LOG.md](DEPLOYMENT_LOG.md)，完整沿革看 [HISTORY.md](HISTORY.md)。

## 目前狀態

- 網站版號與驗證結果看 DEPLOYMENT_LOG 最下方的「發布紀錄」表（簡化格式，2026-09-24 起）。截至本檔更新時，-08 已推送；正式站實際版號以公開 HTML 為準（E4）。
- 網站在 2026-09 改版後拆成 index.html／style.css／script.js，另有 fonts/cc-serif.woff2（標題字型子集）。無 build、無 npm。部署：GitHub Desktop push → Netlify 發布 website/。
- **改了任何標題（h1/h2/h3）、品牌名或關於區引言 → 要跑 `node scripts/build-font.cjs`**，不然 verify-release 會擋下。原因和做法見 README「SEO 與外部依賴」。
- 推送後一定要跑 `node scripts/verify-live.cjs`（RULES R12），PASS 才算上線。Netlify 部署失敗的處理見 RULES E7。
- Codex／其他 agent 讀 AGENTS.md，Claude Code 讀 CLAUDE.md，兩者指向同一套規則。改流程時兩邊都要同步。
- 回復來源是 Git。Codex 在 `.codex\visualizations\...` 的備份檔只是額外備份，不要依賴。
- 使用者偏好：網站對客人統一用「您」；不用「牠」，改用寶貝、貓咪或自然省略；走廊照片稱店內實景；加高房是上下連通的經典房。商家事實只以 index.html 為準（R9）。

## 待 KK 處理

- **GA 後台**：把 `line_click`、`phone_click` 標成「重要事件」（管理 → 事件）。事件大約 24 小時後才會出現在清單裡，即時報表可以馬上看到。Claude 不動 GA 後台（R5）。
  - 【事實，2026-09-24】GA 資源在 KK 的**第二個 Google 帳號**下（Chrome 帳號切換選單的第 2 個帳號，GA 網址帶 `?authuser=1`，資源 a396319521p539598993「CC Cat Boarding」）。預設的 kaytung@live.com 沒有權限，會看到「開始使用」頁，**不要按 Start measuring**（會建立新的 GA 帳號）。Claude 只在 KK 當次要求時操作 GA，不登入（R8）。
  - 【事實】即時報表 22:5x 已收到 line_click 3 筆、map_click 2 筆，整條鏈都通了。GA 內建的 click（外連點擊）也會一起計數，**不要把 click 標成重要事件**，會和 line_click 重複計算。
  - **還沒做**：GA 的「管理 → 資料顯示 → 事件」沒辦法先用名稱建立重要事件，要等 line_click 出現在「近期事件」清單（24 小時內），再按旁邊的星號。phone_click 要等到有人真的點電話之後才會出現。KK 已同意標記這兩個事件（2026-09-24）。
  - 【事實】2026-09-24 經 KK 同意，已把 Search Console「網域」資源 `cccathotel.com` 連結到 GA 資料串流 CC Cat Boarding（串流 ID 14974100114）。Search Console 另有一個「網址前置字元」資源 `https://cccathotel.com/`，沒有連結（一個串流只能連一個，網域版涵蓋範圍最完整）。Search Console 的資料會在接下來幾天陸續出現在 GA。
- 素材：真實每日回報截圖、經營者故事、訂金／取消政策。網站最缺的是「證據」，不捏造（R7）。
- 每日回報動畫小樣：已暫停，沒有整合進網站。桌面副本在 C:/Users/kaytu/OneDrive/Desktop/希希每日回報動畫小樣-20260924/index.html。

## 限制

- Netlify 後台：KK 的 Chrome 已登入，專案名 cccatwebsite。Claude 只在 KK 當次明確要求時代操作，不改設定、不登入（R8）。
- 沒有在 iPhone／Android 實機測試 LINE App 跳轉和虛擬鍵盤。iPhone 字型問題是 KK 用實機確認的，-08 修正後也要請 KK 用 iPhone 再看一次。
- 沒有 Search Console／GA 管理權限，不能宣稱排名、收錄或事件已被 GA 收到。
- 不加自評星等（R6）、不改 GA 原碼（R5）、不改 DNS／Netlify 設定（R3）、不刪歷史、不 force push。

## 最近 2 個 session

- 2026-09-24 晚（Claude Code）：修好 -05 部署失敗（Netlify 快取，E7）；導覽文案改兩次到「看看環境」（-06、-07）；全面檢視 Codex 的成果；-08 修正 iPhone 標題字型（自己託管字型子集）、加 GA 轉換事件、補正確座標（舊座標偏北 2.7 km）、加 Google 評論連結、清理 CSS、簡化測試與發布紀錄格式。
- 2026-09-24（Codex）：日期月曆試算、估價但書、敬稱與 FAQ 修訂，發布 -04；推送 -05 文案（部署失敗沒有發現）。每日回報動畫小樣暫停。
