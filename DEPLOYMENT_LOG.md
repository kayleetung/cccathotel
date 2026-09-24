# Deployment log

每次 push 都必須新增計畫與結果。未取得實際證據前，不得把「預計」寫成「已完成」。

## 2026-09-23 — redesign release 2026.09.23-01

### 授權與範圍

- 使用者於本次對話明確要求部署新版、核對 SEO、謹慎保留回復能力，並記錄所有 push 與交接。
- 使用既有 GitHub Desktop → `main` → Netlify 流程；不改網域、DNS、站點、發布目錄或帳號權限。
- 不使用 CLI push、API 寫入或 token；遵守 RULES R2/R3/R8。

### 上線前基準

- 本機 HEAD 與已 fetch 的 `origin/main`：`772c285c915085d48df8641d439c18f29a4342db`。
- 基準網站版號：`2026.07.24-01`。先前已核對公開網站與 GitHub。
- 備份目錄（不在發布目錄）：`C:\Users\kaytu\.codex\visualizations\2026\09\08\01a07ffc-e124-7040-a7e8-c8a7ab5652a1\release-backup-20260923-772c285`。
- Git 完整歷史備份：同層 `cccathotel-pre-release-20260923.bundle`。
- 原有未追蹤 `.claude/` 不屬此次發布，不提交。
- 尚未登入 Netlify，無法證明其舊部署仍可一鍵還原；可靠回復來源為上述 commit 與本機備份。

### 變更與 SEO 保留

- 採用使用者已接受的離線新版，包含手機修正、照片視窗、住宿試算及詢問文字整理。
- 所有稱呼避免使用「牠」；店內照片不稱為另一條加高房走廊，房型說明遵照使用者確認。
- 正式版的 title、description、既有 OG/Twitter 標籤、canonical 與原 GA head 程式保留原值；不使用離線版的 analytics.js。
- 原根目錄六張 JPG 不動，新版繼續引用原網址，避免圖片 URL 改變。逐檔與草稿照片比對相同。
- `robots.txt` 不動；sitemap 仍是同一個首頁 URL，僅更新 lastmod。
- LocalBusiness 保留既有名稱、地址、電話、服務區域、價格範圍、社群、照片及營業時間，新增穩定 @id/url/logo。
- 唯一刻意未搬的商家欄位：原 geo 尚未核實且只有四位小數，9 月 9 日已向使用者說明先省略，不補造座標。
- 每日營業已於 9 月 9 日由使用者確認。FAQPage 與新版九題可見內容同步。不加入自評星等。
- 保留既有 `#rooms`、`#photoStrip`、`#faqList`、`#info` 錨點。新區塊錨點也可使用。
- 排名無法保證不波動；沒有 Search Console 權限，未宣稱已驗證搜尋收錄或實際 GA 接收。

### Push 1 — 網站與發布交接

- 狀態：已完成 commit / push，公開網站驗證通過。
- Commit：5824099f24a853d9ca3af5c0ba7bed5fdd3f30ca。
- 推送操作：2026-09-23 23:59:56 Asia/Taipei；GitHub Desktop 隨後顯示 push complete，HEAD 與 origin/main 相同。
- 提交前曾因自動審核服務額度不足中止填寫說明，當時沒有執行操作；使用者說「繼續」後由同一審核流程正常完成，未繞過審核。
- 預定 commit summary：`Release approved redesign with preserved SEO (v2026.09.23-01)`。
- 預定範圍：網站 HTML/CSS/JS、sitemap、README/HANDOFF/HISTORY、本紀錄、驗證腳本。
- 發布前已完成：node 語法檢查、git diff --check、verify-release（原 SEO/GA/robots、六張圖片、9 FAQ、36 試算案例與房型上限切換）。
- 瀏覽器實測：桌機視覺；320px 導覽開合、4 貓 7 晚試算、詢問視窗與複製；390px 相簿開關與換頁、FAQ 展開；430px 無水平溢出，無已載入壞圖、無 console error/warn。真實手機限制仍保留。
- GitHub Desktop 顯示此次預定 9 個檔案，.claude/ 未列入。介面初始未刷新，互動後顯示正確變更；未改儲存庫設定。
- 2026-09-24 00:01:20 Asia/Taipei：公開首頁、CSS、JS、robots、sitemap、六張 JPG 共 11 個資源皆 HTTP 200、Content-Type 正確，内容與本機一致（文字只正規化換行，圖片逐位元組相同），無 X-Robots-Tag noindex。
- 公開頁面版號 2026.09.23-01；Server=Netlify；canonical 仍是原首頁。完整比對結果與 SHA-256 存在備份目錄 live-verification.json。
- 正式站瀏覽器：桌機首頁至 footer 正常；390px 手機選單、2 晚試算、詢問視窗及 LINE URL 正常；無橫向溢出、已載入壞圖或 console error/warn。未操作 LINE 發送，也未宣稱真實手機 App 實測。

### Push 2 — 實際發布結果

- 2026-09-24：Push 1 與公開驗證完成後，更新 DEPLOYMENT_LOG / HANDOFF / HISTORY，僅三份文件，website/ 不再修改。
- Commit summary：`Record verified production release and handoff [skip netlify]`。
- 流程：審查三份文件差異 → GitHub Desktop commit → Push origin → 確認 UI push complete、HEAD = origin/main，再確認公開站仍是 2026.09.23-01。
- 本段是隨第二次提交送出的流程紀錄，不能預先宣稱自身推送完成；實際完成時間、SHA 與核對結果會寫入備份目錄 release-receipt.json。遠端此提交的存在與 Git 同步狀態也可獨立驗證。
- [Netlify 官方文件](https://docs.netlify.com/deploy/manage-deploys/manage-deploys-overview/#skip-a-deploy) 已確認 `[skip netlify]` 可跳過此文件提交的部署；沒有登入後台查 deploy ID，因此不聲稱已從管理介面證明跳過。

### 回復程序

1. 若需緊急回復且 Netlify 可登入，先確認既有成功部署仍可用，再經使用者授權重發並防止自動發布覆蓋。
2. 不假設 Netlify 回復會還原 GitHub。Git 端應建立回復 commit，恢復基準 `website/` 完整內容並移除此次新增的 CSS/JS；保留文件歷史。
3. 透過 GitHub Desktop 提交與推送回復，記錄原因、SHA、時間，再檢查公開網站版號及資源。
4. 不 reset 遠端、不 force push、不修改 DNS；已產生的訪問、分析與 LINE 訊息無法倒帶。

## 2026-09-24 — 日期試算候選版（尚未推送）

- 本機版本 2026.09.24-01：改用入住／退房月曆，自動晚數估價與詢問日期。網站四檔、驗證腳本及交接文件已更新。
- 已通過語法、44 個日期／價格案例與原 SEO/GA/資源回歸，完成桌機及 320px 瀏覽器檢查；先交付本機預覽。
- 此次沒有 commit 或 push，不產生新部署；正式發布仍是上一節記錄的 2026.09.23-01。未改 DNS、Netlify 設定或登入任何管理後台。
- 後續若部署：檢查本次差異 → GitHub Desktop 提交與推送 → 記錄 SHA/時間/結果 → 核對公開版號與資源。不可預先填寫「已上線」。

- 2026-09-24 後續本機修訂 2026.09.24-02：依使用者要求補充估價但書，畫面與詢問文字同步；未 commit / push，未部署。

- 2026-09-24 後續本機修訂 2026.09.24-03：網站全站敬稱改為「您」，FAQ 結構化資料同步；未 commit / push，未部署。

- 2026-09-24 後續本機修訂 2026.09.24-04：依 7 則註記補充 FAQ，畫面與 JSON-LD 同步；未 commit / push，未部署。

## 2026-09-24 — 授權發布 2026.09.24-04

使用者確認「好了可以 publish」。此次包含已預覽的日期試算、完整估價但書、全站敬稱及 FAQ 七項補充；動畫仍暫停。

### 發布基準與驗證

- GitHub Desktop 已顯示 cccathotel / main；HEAD 與 origin/main 均為 9269feb5b96e402f7a254d61e6cd417bc8c64c97。
- 回復備份：C:/Users/kaytu/.codex/visualizations/2026/09/08/01a07ffc-e124-7040-a7e8-c8a7ab5652a1/release-20260924-04/pre-release-9269feb.zip；candidate-website 保存待發布網站。需要回復時，從此 Git 基準建立恢復 website/ 的新 commit，透過 Desktop 推送，保留文件歷史，不 force push。
- 語法、git diff --check、原 SEO/GA/robots/六圖、9 FAQ 配對與 44 日期／價格案例通過。既有本機桌機及 320px 互動檢查完成。
- 僅 9 個已追蹤檔案有變更，.claude/ 排除；未改 DNS、Netlify 設定、GA 或網站照片。

### Push 1 — 網站與修訂紀錄（準備）

- 預定 summary：Publish date calculator and FAQ updates (v2026.09.24-04)。
- 範圍：website/index.html、script.js、style.css、sitemap.xml、scripts/verify-release.cjs、README、HANDOFF、HISTORY、DEPLOYMENT_LOG。
- 流程：核對差異 → GitHub Desktop commit → Push origin → 核對 HEAD/origin 與公開網站版號及資源 → 補記實際 SHA、時間與結果。此段於提交前寫入，不預先宣稱成功。
- Push 2 計畫：僅記錄上線驗證結果與交接，使用 [skip netlify]；最終完成回執另存在上述備份目錄 release-receipt.json，避免為了記錄自己的 SHA 產生無限提交。

### Push 1 — 實際結果

- 網站 commit：58b79be56bf59a7aad619480ca799d2861054522；提交時間 2026-09-24 13:40:46 +08:00。
- 推送操作時間：2026-09-24 21:04:32 Asia/Taipei；GitHub Desktop 顯示 push complete，HEAD = origin/main。
- 第一次推送因自動核准審查服務使用額度不足未執行；使用者說「繼續」後，正常重試成功，未绕過審核。
- 2026-09-24 21:05:47 Asia/Taipei，正式網站為 2026.09.24-04；11 個公開資源均 HTTP 200、Content-Type 正確、內容與本機一致（文字正規化換行），无 noindex 標頭。逐檔 SHA-256 與結果存在備份目錄 live-verification.json。
- 正式站桌機詢問：日期、晚數、金額與完整但書符合預期；390px 顯示正常，同日入住退房會提示錯誤並停用詢問。無水平溢出、console error/warn；未發送 LINE 訊息，未冒稱真實手機實測。

### Push 2 — 發布結果與交接文件

- Summary：Record date calculator release verification [skip netlify]。
- 僅 README / HANDOFF / HISTORY / DEPLOYMENT_LOG 四份文件，website/ 不再更動。
- 流程：審閱文件 → GitHub Desktop commit → Push origin → 核對 UI 與 HEAD/origin，將最終 SHA/時間/同步結果記入 C:/Users/kaytu/.codex/visualizations/2026/09/08/01a07ffc-e124-7040-a7e8-c8a7ab5652a1/release-20260924-04/release-receipt.json。
- 本段在第二次提交前寫入；完成證據以該回執及遠端 Git 實際狀態為準，避免預先宣稱自身推送完成。

## 2026-09-24 — 首頁副標發布 2026.09.24-05

- 使用者指示「直接推送」。僅將首頁副標改為「有安心休息的角落，也有自在探索的空間。」並同步版號與資源查詢字串；SEO meta、GA、試算邏輯、圖片未變。
- 回復基準 ef729113e629f80101288f04ed6a91d45a554f5b，完整備份 C:/Users/kaytu/.codex/visualizations/2026/09/08/01a07ffc-e124-7040-a7e8-c8a7ab5652a1/release-20260924-05/pre-release.zip。
- 發布前既有 SEO/資源/FAQ 與 44 試算案例通過，git diff --check 通過。
- Push 1 預定標題：Refine homepage introduction (v2026.09.24-05)。範圍為 index.html、驗證腳本、HANDOFF、HISTORY、DEPLOYMENT_LOG 五檔，排除 .claude/。
- 流程：GitHub Desktop commit → Push origin → 公開首頁版號、文案與檔案比對。Push 2 僅回寫結果，標題使用 [skip netlify]。最終 SHA 與時間回執保存 C:/Users/kaytu/.codex/visualizations/2026/09/08/01a07ffc-e124-7040-a7e8-c8a7ab5652a1/release-20260924-05/release-receipt.json。此段為推送前計畫，實際結果另補。
