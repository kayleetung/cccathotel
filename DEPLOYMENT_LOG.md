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
