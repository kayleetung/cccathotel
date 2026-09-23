# HANDOFF — 目前狀態

開工先讀本檔，再讀 [RULES.md](RULES.md) 全文。系統參考 [README.md](README.md)，所有推送流程看 [DEPLOYMENT_LOG.md](DEPLOYMENT_LOG.md)，完整沿革看 [HISTORY.md](HISTORY.md)。

## 目前狀態

- 2026-09-23 使用者已明確授權新版部署，要求保留 SEO、謹慎操作、記錄所有 push；不需要重複詢問這次部署授權。
- 正式候選版：2026.09.23-01，目前尚未 commit / push。請以部署紀錄與實際 Git/公開網站狀態核對，不把準備中當成已上線。
- 部署來源是 C:\dev\cccathotel\website；C:\dev\CCCat-Design-Offline 是已接受的設計草稿，不是自動部署來源。
- 已備份原網站與完整 Git bundle，回復基準為 772c285c915085d48df8641d439c18f29a4342db；位置與回復步驟見部署紀錄。
- 新版拆為 index.html / style.css / script.js，原六張根目錄 JPG 保留。無建置流程、無新服務依賴。
- 原 title、description、OG/Twitter、canonical、robots、GA 原碼與圖片 URL 保留。LocalBusiness 只省略尚未核實的 geo，FAQ 與可見內容同步；詳細理由見部署紀錄。
- 使用者偏好：避免使用「牠」，用寶貝、貓咪或自然省略；走廊照片稱店內實景，加高房是上下連通的經典房。商家事實只以 index.html 為準。

## 本次待辦

1. 正式候選版靜態檢查、桌機與 320/390/430px 手機模擬已通過（詳見部署紀錄）。
2. GitHub Desktop 審查檔案清單後 commit / push main；不得提交原有未追蹤 .claude/。
3. 確認 Netlify 公開版號、頁面與資源實際更新，再把結果寫入部署紀錄及本檔，做文件推送。

## 限制與後續

- 未登入 Netlify；不能保證舊部署仍可一鍵重發。可靠回復來源為 Git 基準與備份。
- 未實測真實 iPhone/Android 的 LINE App 喚起、虛擬鍵盤。瀏覽器模擬不等於實機。
- 無 Search Console / GA 管理介面權限，不能宣稱排名不變、已收錄或 GA 後台收到事件。
- 好評、每日回報範例、經營者故事素材與訂金/取消政策仍待使用者提供或確認；不捏造。
- 不新增自評星等、不修改 GA、不改 DNS/Netlify 發布設定，不刪歷史、不 force push。

## 最近 2 個 session

- 2026-09-23：獲授權發布已接受的全新設計。保守保留既有 SEO 訊號、備份網站與 Git、建立自動檢查及部署紀錄；發布進度以上方狀態及部署紀錄為準。
- 2026-07-24：原站健檢、無障礙/營業狀態修正與 repo 搬遷。完整原 HANDOFF 已原文歸檔 HISTORY，不刪除舊記錄。
