# HANDOFF — 目前狀態

開工先讀本檔，再讀 [RULES.md](RULES.md) 全文。系統參考 [README.md](README.md)，所有推送流程看 [DEPLOYMENT_LOG.md](DEPLOYMENT_LOG.md)，完整沿革看 [HISTORY.md](HISTORY.md)。

## 目前狀態

- 2026-09-23 使用者已明確授權新版部署，要求保留 SEO、謹慎操作、記錄所有 push；不需要重複詢問這次部署授權。
- 已上線：2026.09.23-01。網站提交 5824099f24a853d9ca3af5c0ba7bed5fdd3f30ca 已透過 GitHub Desktop 推送；2026-09-24 凌晨公開 Netlify 網站與全部 11 個資源驗證成功。
- 本文件為第二次、只更新交接的提交；流程與最終回執位置見 DEPLOYMENT_LOG 的 Push 2。實際遠端同步用 git 核對。
- 部署來源是 C:\dev\cccathotel\website；C:\dev\CCCat-Design-Offline 是已接受的設計草稿，不是自動部署來源。
- 已備份原網站與完整 Git bundle，回復基準為 772c285c915085d48df8641d439c18f29a4342db；位置與回復步驟見部署紀錄。
- 新版拆為 index.html / style.css / script.js，原六張根目錄 JPG 保留。無建置流程、無新服務依賴。
- 原 title、description、OG/Twitter、canonical、robots、GA 原碼與圖片 URL 保留。LocalBusiness 只省略尚未核實的 geo，FAQ 與可見內容同步；詳細理由見部署紀錄。
- 使用者偏好：避免使用「牠」，用寶貝、貓咪或自然省略；走廊照片稱店內實景，加高房是上下連通的經典房。商家事實只以 index.html 為準。

## 驗證與下一步

- 本機 SEO/資源/FAQ 檢查、36 個試算案例、桌機及 320/390/430px 手機模擬通過。
- 正式站版號、11 個資源完整性、桌機呈現及 390px 互動通過；等待使用者看新版。
- 後續如需更改，從本 repo 正式版本開始，每次 push 先後都記錄；不要以舊離線草稿覆蓋已保留的正式 SEO / GA。
- 原有未追蹤 .claude/ 未提交。

## 限制與後續

- 未登入 Netlify；不能保證舊部署仍可一鍵重發。可靠回復來源為 Git 基準與備份。
- 未實測真實 iPhone/Android 的 LINE App 喚起、虛擬鍵盤。瀏覽器模擬不等於實機。
- 無 Search Console / GA 管理介面權限，不能宣稱排名不變、已收錄或 GA 後台收到事件。
- 好評、每日回報範例、經營者故事素材與訂金/取消政策仍待使用者提供或確認；不捏造。
- 不新增自評星等、不修改 GA、不改 DNS/Netlify 發布設定，不刪歷史、不 force push。

## 最近 2 個 session

- 2026-09-23 至 09-24：獲授權發布新版並已完成上線驗證。保留既有 SEO 訊號、備份網站與 Git、建立自動檢查及逐次推送紀錄；跨午夜完成驗證，網站仍用 09-23 發布版號。
- 2026-07-24：原站健檢、無障礙/營業狀態修正與 repo 搬遷。完整原 HANDOFF 已原文歸檔 HISTORY，不刪除舊記錄。
