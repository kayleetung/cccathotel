# Deployment log

每次 push 都要留紀錄。沒有實際證據之前，不得把「預計」寫成「已完成」。

**2026-09-24 起的簡化格式**（兩人公司的靜態網站不需要每次都寫計畫＋回執＋補記）：推送前在最下方「發布紀錄」表加一列，填上日期、版號、內容、授權；推送並驗證後，在同一列補上 SHA 和驗證結果，跟**下一次**提交一起送出。純文件的 [skip netlify] 提交不用記錄，git 歷史就是紀錄。遇到失敗、回復或特殊狀況，才另外寫一段說明（像下面 -05 的部署失敗）。回復來源是 Git，不靠外部備份檔。

以下 2026-09-23 至 09-24 -07 的長篇紀錄是舊格式，保留不改（R11）。

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
- 2026-09-24 00:01:20 Asia/Taipei：公開首頁、CSS、JS、robots、sitemap、六張 JPG 共 11 個資源皆 HTTP 200、Content-Type 正確，內容與本機一致（文字只正規化換行，圖片逐位元組相同），無 X-Robots-Tag noindex。
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
- 第一次推送因自動核准審查服務使用額度不足未執行；使用者說「繼續」後，正常重試成功，未繞過審核。
- 2026-09-24 21:05:47 Asia/Taipei，正式網站為 2026.09.24-04；11 個公開資源均 HTTP 200、Content-Type 正確、內容與本機一致（文字正規化換行），無 noindex 標頭。逐檔 SHA-256 與結果存在備份目錄 live-verification.json。
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

### Push 1 — 實際結果（2026-09-24 晚由 Claude Code 補記）

- d098b597cff996d2d5a193b3bd513613ba384049 已推到 origin/main（ls-remote 確認），但 Netlify 21:20 的自動部署**失敗**：`Failed during stage 'Install dependencies': Command did not finish within the time limit`（18 分鐘）。
- Codex 21:22 的上線檢查（同上備份目錄 live-verification.json）已顯示 index.html `same: false`，但未補記、未產生 release-receipt.json。22:01 抓正式站仍為 2026.09.24-04（`Cache-Status: fwd=miss`，非 CDN 快取）。
- Netlify log 關鍵行：node v22.23.3 下載完成且 `Checksums matched`，但 `mv: cannot overwrite '/opt/buildhome/.nvm/versions/node/v22.23.3/bin': Directory not empty` → 改走原始碼編譯直到超時。判定為建置快取殘留，不是版本相容性問題；repo 內無 .nvmrc / package.json / netlify.toml，網站本身不需 Node。Netlify AI 建議鎖 Node 20，未採用（Node 20 已於 2026-04 EOL，且不是根因）。
- 修復：KK 明確要求後，由 Claude 在 KK 已登入的 Chrome 操作 Netlify → Deploys → Trigger deploy →「Deploy project without cache」（即舊稱 Clear cache and deploy）。未改任何設定、未鎖定發布、未登入。
- 結果：deploy 6ab52e94147e0799e4e6e49f，22:07:18 開始（`Building without cache`），22:07:26 `Site is live`，約 8 秒。
- 22:08 驗證：公開首頁 SITE VERSION 2026.09.24-05、新副標存在、頁尾 `</html>` 完整；11 個資源全部 HTTP 200 且與本機一致（文字正規化換行、圖片逐位元組），無 X-Robots-Tag。
- 此補記與 HANDOFF / HISTORY / RULES E7 為文件變更，提交標題需含 [skip netlify]。

### Push 2 — 文件提交（計畫，推送前寫入）

- KK 於本次對話明確要求「幫我 commit push，並且要留下紀錄」。
- 基準：HEAD = origin/main = d098b597cff996d2d5a193b3bd513613ba384049。
- 範圍：僅 DEPLOYMENT_LOG / HANDOFF / HISTORY / RULES 四份文件；website/ 不動，.claude/ 不提交。
- Commit 在終端機以 git commit 建立（RULES E6 允許）；push 由 Claude 經 KK 同意以 computer-use 操作 GitHub Desktop「Push origin」（R2），不使用 CLI push 或 token。
- 標題：`Record -05 deploy failure and cache-clear fix [skip netlify]`。
- 推送後驗證：ls-remote 的 main 等於本機 HEAD；Netlify Deploys 列表該 commit 應為略過（skipped）而非新部署；正式站仍為 2026.09.24-05。
- 本段寫在提交之前，不能記錄自己的 SHA；實際 SHA、推送時間與驗證結果存放在 C:/Users/kaytu/.codex/visualizations/2026/09/08/01a07ffc-e124-7040-a7e8-c8a7ab5652a1/release-20260924-05/docs-push-receipt.json，並在下一次提交時補進本紀錄。

### Push 2 — 實際結果（推送後補記，隨下一次提交送出）

- Commit fb579c3bc6bd0edf5b73097a205edcb310223be9，約 22:10 Asia/Taipei 經 GitHub Desktop「Push origin」推送。
- 22:10:58 驗證：ls-remote main = fb579c3，本機與 origin 同步；正式站仍為 2026.09.24-05；Netlify Deploys 列表沒有為 fb579c3 建立部署，published 仍是 main@d098b59，[skip netlify] 生效。
- 回執：release-20260924-05/docs-push-receipt.json（路徑同上）。

## 2026-09-24 — 導覽文案「店內環境」發布 2026.09.24-06

### 授權與範圍（推送前寫入）

- KK 覺得「旅館風景」不符合店的規模（小班制），討論後選定「店內環境」，並指示「改完直接推上去」。
- 網站變更：index.html 內「旅館風景」3 處（桌機導覽、手機導覽、#space 區塊小標籤）改為「店內環境」；版號與 CSS/JS 查詢字串改成 -06；verify-release.cjs 的版號斷言同步更新。大標題、英文 AROUND THE HOUSE、SEO meta、GA、#space 錨點、sitemap 都沒動。
- 基準：HEAD = origin/main = fb579c3bc6bd0edf5b73097a205edcb310223be9（回復時從此提交建立還原 commit，不 force push）。
- 推送前檢查：node --check、verify-release PASS（SEO/GA/robots/六圖、9 FAQ、44 試算案例）、git diff --check 通過。
- 同一個提交也會送出上一節「Push 2 實際結果」補記，以及 HANDOFF / HISTORY 更新。不帶 [skip netlify]，要觸發部署。
- 流程：git commit（E6）→ GitHub Desktop「Push origin」（R2，computer-use 代操作）→ 監看 Netlify 部署 → 抓正式站驗證版號、文案與 11 個資源（E4/E7）。部署失敗就先用「Deploy project without cache」。
- 本段寫在推送前；實際 SHA、時間與驗證結果記在 release-20260924-05 同層的 release-20260924-06/release-receipt.json，並在下一次提交時補進本紀錄。

### 實際結果（推送後補記，隨下一次提交送出）

- Commit 358403fd126223898f4e877d13cae68b7375ac94，約 22:18 Asia/Taipei 經 GitHub Desktop「Push origin」推送；22:18:51 ls-remote main = 358403f。
- Netlify deploy 6ab53144b51ce100082814ed：22:18:54–22:18:59 建置 5 秒，Published，1 個新檔案。清快取後第一次自動部署正常，沒有再發生 E7 的問題。
- 22:19:53 正式站驗證：版號 2026.09.24-06；「旅館風景」0 處、「店內環境」3 處；頁尾 `</html>` 完整；11 個資源全部 HTTP 200，和本機一致，沒有 X-Robots-Tag。桌機導覽列顯示正常。手機寬度沒有重測（4 個字換 4 個字）。
- 回執：release-20260924-06/release-receipt.json。

## 2026-09-24 — 導覽文案改為「看看環境」發布 2026.09.24-07

### 授權與範圍（推送前寫入）

- KK 改變心意，認為「看看環境」比「店內環境」更符合網站整體語氣，並在確認後指示「好, 推上去」。
- 網站變更：index.html 內「店內環境」3 處（桌機導覽、手機導覽、#space 區塊小標籤）改為「看看環境」；版號與 CSS/JS 查詢字串改成 -07；verify-release.cjs 的版號斷言同步更新。其他內容都沒動。
- 基準：HEAD = origin/main = 358403fd126223898f4e877d13cae68b7375ac94（回復時從此提交建立還原 commit，不 force push）。
- 推送前檢查：node --check、verify-release PASS、git diff --check 通過。
- 同一個提交也會送出上一節 -06 的實際結果補記，以及 HANDOFF / HISTORY 更新。不帶 [skip netlify]。
- 流程和 -06 一樣：git commit（E6）→ GitHub Desktop「Push origin」（R2）→ 監看 Netlify → 抓正式站驗證（E4/E7）。
- 實際結果記在 release-20260924-07/release-receipt.json，並在下一次提交時補進本紀錄。

### 實際結果（推送後補記，隨下一次提交送出）

- Commit b3eea8622d4fe87b3493601f25152ab47d6f73e4，約 22:23 Asia/Taipei 經 GitHub Desktop「Push origin」推送；22:23:38 ls-remote main = b3eea86。
- Netlify deploy 6ab53263c4a24f00089d56df：Published。
- 22:24:01 正式站驗證：版號 2026.09.24-07；「看看環境」3 處、「店內環境」0 處、「旅館風景」0 處；頁尾 `</html>` 完整；11 個資源全部 HTTP 200，和本機一致，沒有 X-Robots-Tag。桌機導覽列顯示正常。手機寬度沒有重測（4 個字換 4 個字）。
- 回執：release-20260924-07/release-receipt.json。

### 補記提交（純文件，[skip netlify]）

- KK 指示「Log 推上去」。這次只提交上面這段 -07 實際結果，website/ 不動。
- 約定：純文件的 [skip netlify] 提交，推送結果**不再寫回本檔**（否則每次補記都會產生下一筆要補記的推送，沒完沒了），只記在 git 歷史和 release-20260924-07/docs-push-receipt.json。

## 發布紀錄（簡化格式）

| 日期 | 版號 | 內容 | 授權 | Commit | 驗證 |
|---|---|---|---|---|---|
| 2026-09-24 | 2026.09.24-08 | 標題字型改為自己託管的 Noto Serif TC 子集（修 iPhone 字型不同）；GA 事件 line_click／phone_click／map_click／inquiry_*；LocalBusiness 補正確 geo 和 hasMap；地圖連結改到商家頁；加「Google 評論」連結；刪除沒在用的 CSS；verify-release 改成從頁面讀版號，並檢查 schema 和畫面一致、字型是否涵蓋所有標題字 | KK：「做完直接推」 | 待補 | 待補 |
