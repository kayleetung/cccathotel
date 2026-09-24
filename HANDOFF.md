# HANDOFF — 目前狀態

開工先讀本檔，再讀 [RULES.md](RULES.md) 全文。系統參考 [README.md](README.md)，所有推送流程看 [DEPLOYMENT_LOG.md](DEPLOYMENT_LOG.md)，完整沿革看 [HISTORY.md](HISTORY.md)。

## 目前狀態

- 已上線：2026.09.24-05（網站提交 d098b59）。2026-09-24 22:07 經 Netlify「Deploy project without cache」重新部署成功，22:08 核對公開網站 11 個資源與本機一致。
- 注意：d098b59 在 21:20 的自動部署**失敗**（Netlify 建置快取損壞，Node 安裝撞到殘留目錄後改走原始碼編譯，18 分鐘超時），正式站停在 -04 約 47 分鐘沒人發現。之後每次推送都要抓公開網站確認版號，失敗就先試不帶快取重新部署（RULES E7）。細節見 DEPLOYMENT_LOG。
- 歷次與本次推送流程見 DEPLOYMENT_LOG；遠端同步以 Git 與公開網站實際內容核對。
- 部署來源是 C:\dev\cccathotel\website；C:\dev\CCCat-Design-Offline 是已接受的設計草稿，不是自動部署來源。
- 已備份原網站與完整 Git bundle，回復基準為 772c285c915085d48df8641d439c18f29a4342db；位置與回復步驟見部署紀錄。
- 新版拆為 index.html / style.css / script.js，原六張根目錄 JPG 保留。無建置流程、無新服務依賴。
- 原 title、description、OG/Twitter、canonical、robots、GA 原碼與圖片 URL 保留。LocalBusiness 只省略尚未核實的 geo，FAQ 與可見內容同步；詳細理由見部署紀錄。
- 使用者偏好：網站對客人統一使用「您」；避免使用「牠」，用寶貝、貓咪或自然省略；走廊照片稱店內實景，加高房是上下連通的經典房。商家事實只以 index.html 為準。

## 未上線的每日回報動畫提案（2026-09-24）

- 使用者已要求先放下動畫，優先處理日期試算；不要繼續整合動畫。

- 使用者希望用模擬 LINE 打字動畫呈現飯飯照片、探索及睡覺／玩耍，已製作獨立示意小樣。
- 桌面離線副本：C:/Users/kaytu/OneDrive/Desktop/希希每日回報動畫小樣-20260924/index.html，可直接雙擊開啟。
- 工作檔：C:/Users/kaytu/.codex/visualizations/2026/09/08/01a07ffc-e124-7040-a7e8-c8a7ab5652a1/daily-note-preview/index.html；同資料夾 README 說明功能與文案位置。
- 兩種個性、三個日常片段、33 秒一次播放，使用原創 SVG 插畫及明確示意標籤。尚待使用者看效果，沒有整合 website/，本次沒有 commit 或 push。
- 不得把先前部署授權視為此新提案已確認上線。

## 驗證與下一步

- 2026.09.24-05：首頁副標「躲懶」改為「有安心休息的角落，也有自在探索的空間。」已上線並驗證（見上）。
- 2026.09.24-04：日期月曆試算、估價但書、敬稱及 FAQ 七項補充，已上線。回復基準 9269feb5b96e402f7a254d61e6cd417bc8c64c97，備份位置見部署紀錄。動畫與 .claude/ 不包含在網站發布。
- 原 SEO meta / canonical / GA / robots / 六圖保留；9 FAQ 可見內容與 JSON-LD 一致；44 日期／價格案例通過。已有本機桌機、320px 模擬與詢問文字驗證；正式站桌機與 390px 驗證通過：金額、日期、但書、錯誤日期禁用詢問、無橫向溢出或 console error/warn。未宣稱實機測試。

## 限制與後續

- Netlify 後台：KK 的 Chrome 已登入，專案名 cccatwebsite（https://app.netlify.com/projects/cccatwebsite/deploys）。Claude 只在 KK 當次明確要求時代操作，不改設定、不登入（R8）。可靠回復來源仍為 Git 基準與備份。
- 未實測真實 iPhone/Android 的 LINE App 喚起、虛擬鍵盤。瀏覽器模擬不等於實機。
- 無 Search Console / GA 管理介面權限，不能宣稱排名不變、已收錄或 GA 後台收到事件。
- 好評、每日回報範例、經營者故事素材與訂金/取消政策仍待使用者提供或確認；不捏造。
- 不新增自評星等、不修改 GA、不改 DNS/Netlify 發布設定，不刪歷史、不 force push。

## 最近 2 個 session

- 2026-09-24 晚（Claude Code）：發現 -05 推送後部署失敗、正式站仍為 -04；依 Netlify 診斷判定為建置快取損壞，經 KK 要求代操作不帶快取重新部署，-05 上線並驗證。新增 RULES E7。
- 2026-09-24（Codex）：先做每日回報獨立動畫提案，後依使用者要求暫停；完成日期試算、但書、敬稱與 FAQ 修訂，獲授權並發布 2026.09.24-04；另推送 -05 文案（部署失敗未察覺，見上）。
