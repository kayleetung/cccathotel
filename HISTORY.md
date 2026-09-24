# HISTORY — 逐 session 考古

> Append-only。**新的放最上面**，不壓縮、不刪除。
> 查「為什麼 X 長這樣」才需要讀這份。日常開工讀 [HANDOFF.md](HANDOFF.md) 就好。
> 目前狀態與待辦在 HANDOFF；鐵律在 [RULES.md](RULES.md)；協作方式在 [PROJECT_INSTRUCTIONS.md](PROJECT_INSTRUCTIONS.md)。

---

## 2026-09-24 晚 — -05 部署失敗與修復（Claude Code）

- 接手 Codex 的進度時，發現 d098b59（-05）已推到 GitHub，正式站卻仍為 -04。Codex 自己的上線檢查當時已失敗（index.html 不一致），但沒有補記。
- KK 貼上 Netlify 診斷：Node 安裝時 `mv` 撞到殘留目錄，改走原始碼編譯，18 分鐘超時。判定為建置快取損壞；Netlify AI 建議鎖 Node 20，因為不是根因而且 20 已 EOL，沒有採用。
- KK 要求 Claude 代操作：Netlify「Deploy project without cache」，8 秒完成。22:08 驗證正式站 -05 與 11 個資源一致。沒有改任何設定。
- 新增 RULES E7。教訓：推送後只看 GitHub 同步不夠，要看公開網站；上線檢查失敗必須當下回報，不能留「另補」。
- 依 R11 從 HANDOFF 移出的舊 session 摘要原文：2026-09-23 至 09-24：獲授權發布新版並已完成上線驗證。保留既有 SEO 訊號、備份網站與 Git、建立自動檢查及逐次推送紀錄；跨午夜完成驗證，網站仍用 09-23 發布版號。

## 2026-09-24 — 首頁副標文案調整（本機 2026.09.24-05）

使用者指出「有地方躲懶」不自然，改為「有安心休息的角落，也有自在探索的空間。」下句維持原文，僅調整首頁可見文案及版號、資源查詢版本，SEO meta / GA 不變。未 commit、push 或部署；正式站仍為 2026.09.24-04。

## 2026-09-24 — 2026.09.24-04 正式上線完成

- 網站 commit 58b79be56bf59a7aad619480ca799d2861054522 於 2026-09-24 21:04:32 Asia/Taipei 透過 GitHub Desktop 推送；UI 顯示 push complete，HEAD/origin/main 一致。
- 2026-09-24 21:05:47 Asia/Taipei 確認公開版號 2026.09.24-04，11 個資源全部 HTTP 200 且與本機一致，無 noindex 標頭。
- 正式站桌機與 390px 模擬確認日期試算、詢問文字及完整但書、錯誤日期防護；無橫向溢出及 console error/warn。SEO/GA 保留檢查與 44 案例先前通過。
- 推送曾被自動審核服務使用額度中斷；使用者要求繼續後，以相同 Desktop 流程成功重試，沒有繞過審核。
- 第二次提交只更新 README / HANDOFF / HISTORY / DEPLOYMENT_LOG，使用 [skip netlify]；SHA 與最終回執位置見部署紀錄。

## 2026-09-24 — 使用者授權發布 2026.09.24-04

已完成日期試算、但書、敬稱及 FAQ 修訂，使用者說「好了可以 publish」。發布前語法、44 日期／價格案例、SEO/GA/圖片/FAQ 回歸通過。回復基準與每次推送流程見 DEPLOYMENT_LOG。以下完整歸檔發布前 HANDOFF，保留歷史狀態，不代表目前仍未獲授權。

<details><summary>發布前 HANDOFF 原文</summary>

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
- 使用者偏好：網站對客人統一使用「您」；避免使用「牠」，用寶貝、貓咪或自然省略；走廊照片稱店內實景，加高房是上下連通的經典房。商家事實只以 index.html 為準。

## 未上線的每日回報動畫提案（2026-09-24）

- 使用者已要求先放下動畫，優先處理日期試算；不要繼續整合動畫。

- 使用者希望用模擬 LINE 打字動畫呈現飯飯照片、探索及睡覺／玩耍，已製作獨立示意小樣。
- 桌面離線副本：C:/Users/kaytu/OneDrive/Desktop/希希每日回報動畫小樣-20260924/index.html，可直接雙擊開啟。
- 工作檔：C:/Users/kaytu/.codex/visualizations/2026/09/08/01a07ffc-e124-7040-a7e8-c8a7ab5652a1/daily-note-preview/index.html；同資料夾 README 說明功能與文案位置。
- 兩種個性、三個日常片段、33 秒一次播放，使用原創 SVG 插畫及明確示意標籤。尚待使用者看效果，沒有整合 website/，本次沒有 commit 或 push。
- 不得把先前部署授權視為此新提案已確認上線。

## 驗證與下一步

- 2026-09-24 FAQ 修訂：依使用者 7 則註記補充不強迫適應原則、行李準備、接送安全、除蟲產品來源、梳理及參觀安靜提醒；可見 FAQ 與 JSON-LD 同步。本機候選版 2026.09.24-04，未推送。

- 2026-09-24 稱呼修訂：全站「你」改為「您」，包含首頁、FAQ 可見內容與 JSON-LD、動態提示及詢問問候語。本機候選版 2026.09.24-04，未推送。

- 2026-09-24 追加：依使用者要求，估算金額後附完整但書，包含優惠折扣、特殊假期調整、額外服務費用及店家確認為準；頁面與詢問文字共用 HTML 的 estimate-disclaimer。仍未 commit / push。

- 2026-09-24 本機候選版 2026.09.24-04：試算改為入住／退房原生日期月曆，自動計算晚數與金額、驗證日期並帶入詢問文字。正式站尚未更新；本次無 commit / push。
- 本機預覽 http://127.0.0.1:8766/?v=20260924-04#estimate；伺服器停止後需從 website/ 重啟本機 HTTP server。
- 日期候選版：語法與差異檢查、44 個日期／價格案例、SEO/GA/圖片/FAQ 回歸通過。瀏覽器實測原生月曆選日、跨年、同日錯誤及詢問內容；320px 欄位完整且無水平溢出，無 console error/warn。未實測 iPhone/Android。
- 下一步讓使用者看本機效果；上線時照 R2 GitHub Desktop，逐次記錄流程與結果，不把此本機候選版當成已部署。

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

- 2026-09-24：先做每日回報獨立動畫提案，後依使用者要求暫停；完成日期月曆試算本機候選版，尚未推送。
- 2026-09-23 至 09-24：獲授權發布新版並已完成上線驗證。保留既有 SEO 訊號、備份網站與 Git、建立自動檢查及逐次推送紀錄；跨午夜完成驗證，網站仍用 09-23 發布版號。

</details>

## 2026-09-24 — FAQ 七項補充（本機 2026.09.24-04）

依使用者 7 則瀏覽器註記，更新放風原則、食物與舊貓砂準備、安全外出籠、除蟲產品來源、修剪指甲與梳毛、參觀及接送安靜提醒。每項同時修改可見內容與 FAQ JSON-LD，保留原有其他商家資訊。版本及資源查詢字串同步。未 commit、push 或部署。

## 2026-09-24 — 全站改用敬稱（本機 2026.09.24-03）

依使用者要求，網站 HTML 與 JS 對話文案的「你」統一改為「您」，FAQ JSON-LD 同步；版號與 CSS/JS 查詢版本同步更新。完成全文殘留搜尋、語法與既有回歸檢查。未 commit、push 或部署。

## 2026-09-24 — 估價但書補充（本機 2026.09.24-02）

使用者要求詢問文字在估算金額後一併附上但書。已補充優惠折扣、特殊假期價格調整、額外服務費用及店家回覆確認為準；畫面與複製內容使用同一 HTML 文案來源，避免日後不同步。網站版號與資源查詢字串同步更新，既有 SEO／GA 與 44 個試算案例通過。無 commit、push 或部署。

## 2026-09-24 — 日期月曆試算本機候選版

- 使用者在正式站圈選住宿晚數，要求改為點開月曆選日期，並明確暫停動畫工作。
- 候選版 2026.09.24-01：入住／退房日期取代加減晚數，原生月曆、自動日期差與估價、日期錯誤提示及詢問文字帶入日期。初始不預填日期；原房價、容量與特殊假期說明維持。CSS/JS 快取版本與 sitemap lastmod 同步。
- 44 個日期／價格案例（含跨月、跨年、閏年、時區邊界、無效及過去日期）通過；原 SEO/GA/robots/六圖/FAQ 檢查通過。桌機月曆實際鍵盤選日、詢問內容、同日錯誤與 320px 版面驗證完成；無水平溢出或 console error/warn。未冒稱真實手機測試。
- 本 session 沒有 commit、push 或部署；本機預覽及後續流程見 HANDOFF。既有動畫原型及未追蹤 .claude/ 保留。
- HANDOFF 移入的舊 session 摘要原文：2026-07-24：原站健檢、無障礙/營業狀態修正與 repo 搬遷。完整原 HANDOFF 已原文歸檔 HISTORY，不刪除舊記錄。

## 2026-09-24 — 每日回報動畫獨立提案

使用者描述實際回報：會貼飯飯、睡覺、貓抓板或玩具照片，觀察語氣如鼓起勇氣主動探索、完全不怕生而探頭打量四周。允許真實或卡通示意。完成獨立 HTML/CSS/JS 原型，配自製 SVG 插畫、兩種情境、三片段、打字與訊息浮現；約 33 秒、可暫停重播及展開完整文字。清楚標示情境與插畫示意，不冒充真實住宿紀錄。工作位置與使用說明見 HANDOFF。正式網站內容未改，此 session 沒有 commit/push。


## 2026-09-24 — 新版正式上線驗證完成

- 2026-09-23 23:59:56 透過 GitHub Desktop 推送網站 commit 5824099f24a853d9ca3af5c0ba7bed5fdd3f30ca，UI 顯示 push complete。
- 公開 Netlify 網站已是 2026.09.23-01；00:01:20 核對 11 個資源全部 HTTP 200、內容一致、無 noindex 標頭。正式桌機与 390px 手機主要操作正常，無 console error/warn。
- 第二次提交只記錄實際部署結果、更新交接，使用 [skip netlify]；每次推送流程、原站回復基準與完整驗證證據位置見 DEPLOYMENT_LOG.md。
- 自動審核曾因服務額度中斷，使用者要求繼續後正常恢復；無繞過審核。未更改 DNS、Netlify 設定、GA 原碼或原圖片 URL。
- 無真實手機、Search Console / GA 後台與 Netlify deploy ID 的驗證，不保證搜尋排名不波動。


## 2026-09-23 — 使用者授權新版部署準備（2026.09.23-01）

- 新設計於獨立離線資料夾完成並經使用者接受；後續依使用者要求調整稱呼、房型說明、LINE 聯絡資訊、手機排版及 SEO。
- 本輪使用者要求正式部署，並要求所有 push 都記錄流程及結果。原版先做網站／文件備份與完整 Git bundle。
- 正式版本採保守 SEO 遷移：原 title/description/OG/Twitter/canonical/robots/GA 保留，原六张圖片根路徑不變。商家 geo 的省略原因、FAQ 同步與回復流程詳見 DEPLOYMENT_LOG。
- 目前尚未 push；不能把準備完成當作已上線。後續結果補記 DEPLOYMENT_LOG。

## 2026-09-23 — 舊交接狀態原文歸檔

下文保留改版前 HANDOFF 原文，屬歷史狀態；最新狀態請看現行 HANDOFF。

# HANDOFF — 目前狀態

> 每次開工先讀這份，再讀 [RULES.md](RULES.md) 全文。系統結構看 [README.md](README.md)、
> 更早的沿革看 [HISTORY.md](HISTORY.md)、協作方式看 [PROJECT_INSTRUCTIONS.md](PROJECT_INSTRUCTIONS.md)。
> **本檔只放：目前狀態＋待辦＋不做清單＋最近 2 個 session。超過 2 個 session 或 ~150 行就把最舊的搬去 HISTORY.md。**

---

## 目前狀態

- 網站正常上線於 https://cccathotel.com/（host = Netlify，見 R3）。
- 最近一次網站內容變更（移除入住準備清單）**已上線並驗證**。
- 文件制度（RULES／HISTORY／README／PROJECT_INSTRUCTIONS）＋ index.html 版號 meta 已於
  2026-07-03 commit＋push 上線（git log 已確認：commit `c2e49d6`；舊版本檔誤寫「尚待 commit」，已更正）。
- **2026-07-24：協作工具主力改為 Claude Code**（Windows 原生終端機），Cowork 版本停用。repo root
  新增 [CLAUDE.md](CLAUDE.md) 作為開工入口（`@import` 本檔＋RULES.md＋PROJECT_INSTRUCTIONS.md）；
  RULES.md 環境事實區（E1/E3/E5/E6）依新環境更新。**R1–R11 鐵律本身、R2 部署流程皆未變動。**
- **2026-07-24：repo 從 OneDrive 搬到 `C:\dev\cccathotel`**，消除雲端同步與 git 打架的風險。
  GitHub Desktop 已重新指向新位置。RULES E1 退役、E5/E6/R1 why 更新。OneDrive 舊副本待 KK 確認後刪除
  （**注意：舊副本內容已過時，以 `C:\dev\cccathotel` 為準**）。
- **2026-07-24：健檢通過＋無障礙/行為修正已完成，版號 `2026.07.24-01`**。健檢無 bug；
  修了 sitemap `lastmod`、FAQ 無障礙（`aria-controls` ＋ 收合內容 `aria-hidden`）、
  營業狀態每分鐘重算。本機 27 PASS / 0 FAIL。詳見 [HISTORY.md](HISTORY.md)。

## 待辦（Roadmap，優先級由高到低）

核心結論：**網站不缺設計，缺的是「證據」和「人」**——全篇店家自述，沒有真實客人背書。

| 優先 | 項目 | 內容 | 卡在哪 |
|------|------|------|--------|
| ① | 真實社會證明 | 放 3–5 則真實家長好評（LINE 對話/Google 評論截圖，去識別化） | 等 KK 提供截圖 |
| ② | 每日回報眼見為憑 | 「每日影片回報」王牌賣點從文字改成真實回報截圖/範例影片 | 等 KK 提供截圖 |
| ③ | 經營者故事＋一張臉 | About 加「我是誰/為什麼開純貓旅館」＋真人抱貓照 | 等 KK 提供照片＋3 句 |
| ⑤ | Hero 痛點副標 | 英文標語旁補一句直擊痛點的中文（如「純貓空間，沒有狗味與吵鬧」） | 無素材需求，可直接做 |
| 補 | 訂金/取消政策明文 | 預訂流程有「支付訂金」但退款/取消規則未寫，是成交前摩擦點 | 等 KK 確認政策 |

> ④「移除重複勾選清單」已完成（見 HISTORY 2026-07-01）。手機版常駐 LINE 按鈕**已存在**，勿重複加。

## 不做清單（現在明確不做）

- 不加回自評星等 aggregateRating（R6）。
- 不動 Google Analytics 追蹤碼（R5）。
- 不建 MAP.md（index.html 未達數千行；用 README 的 § 索引替代，見 HISTORY 2026-07-03）。
- 不在頁面放顯眼的客戶端版號（除非 KK 另外要求；目前版號走 meta，不做 footer 顯示）。

## 最近 2 個 session 摘要

- **2026-07-24 健檢＋無障礙/行為修正**（版號 `2026.07.24-01`）：健檢全數通過、無 bug。修了
  ② sitemap `lastmod`（06-24 → 07-24）、③ FAQ `aria-controls` 配對＋**收合答案 `aria-hidden`**
  （查證時發現的更嚴重問題：收合內容仍留在無障礙樹，9 題答案會被全部念出來）、
  ④ 營業狀態改 `setInterval` 每分鐘重算＋換用 `Intl` API。**原列①「圖片加 width/height」實測
  CLS=0 後推翻，刻意不做。** 過程中自己第一版的 CSS `visibility` 方案被測試抓包（打開過就卡在
  visible），已還原改用 `aria-hidden`。本機 27 PASS / 0 FAIL。
- **2026-07-24 repo 搬遷到 `C:\dev\`**：把 repo 從 OneDrive（`~\OneDrive\Desktop\cccathotel`）搬到
  `C:\dev\cccathotel`，消除雲端同步風險。更新 RULES（E1 退役、E5 路徑、E6/R1 why 加註搬離 OneDrive）、
  PROJECT_INSTRUCTIONS（⑥ 移除 OneDrive 提醒、更新路徑）。GitHub Desktop 重新指向新位置。

（更早的見 [HISTORY.md](HISTORY.md)）


---

## 2026-07-24 — 健檢 ＋ 無障礙/行為修正（版號 2026.07.24-01）

**健檢結論：網站健康，無 bug。** 線上與本機當時位元組完全一致（60,575 bytes）、HTTP 200、
FCP 816ms、無 console 錯誤、估價器 5 個 case 全過、FAQ schema 9 題＝頁面 9 題、9 張圖 alt 齊全、
手機 375px 無水平溢出。

**做了什麼：**
- **② sitemap.xml**：`lastmod` 從 `2026-06-24` 更新為 `2026-07-24`（07-01 改過內容卻沒更新，
  等於跟 Google 說「我沒更新」）。順手修正原本錯亂的縮排（XML 語意不變）。
- **③ FAQ 無障礙**：JS 動態建立 `aria-controls` ↔ `faqBody{n}` id 配對；並把收合中的答案
  設 `aria-hidden="true"`。**後者是查證時發現的、比原本 aria-controls 更嚴重的問題**——
  `.faq-body` 是 `max-height:0; overflow:hidden`，視覺上看不到但仍留在無障礙樹，
  螢幕閱讀器會把 9 題答案全部念出來。
- **④ 營業狀態**：改為 `setInterval(render, 60000)` 每分鐘重算（原本只在載入時算一次，
  分頁開著跨過 20:00 不會變）；且原本只有「設為休息中」單向路徑，現在雙向都會正確切換。
  同時把脆弱的 `new Date(new Date().toLocaleString('en-US',{timeZone}))` 換成
  `Intl.DateTimeFormat(...).formatToParts()`（解析 locale 字串各瀏覽器格式不一致），
  並對「部分實作午夜回傳 24」加 `% 24` 防護。

**刻意沒做（原本列為①、查證後推翻）：** 給 9 張 `<img>` 加 `width`/`height` 屬性。
理由是**實測 CLS = 0**：CSS 已把每張圖的寬高都釘死（`.photo-strip-item img` 是
`width:100%;height:100%` 且容器固定 260px、`.room-photo` 是 `width:100%;height:210px`），
而且這些 CSS 內嵌在同一個 HTML 檔的 `<style>`，不存在「CSS 還沒載入」的情境。
加上去對 CLS 效益是 0，只是在正式檔製造 9 行無意義改動。**先前「①最值得做」是未實測的推論，已收回。**

**過程中踩到並修掉的自己的 bug：** ③ 第一版用 CSS `visibility: hidden` ＋
`transition: visibility 0s linear 0.4s` 來隱藏收合內容。實測發現**答案一旦打開過就永遠停在
`visibility: visible`**（0s duration ＋ delay 的轉場在此瀏覽器不會回復），反而讓 3 題卡在可讀狀態。
已完全還原該 CSS，改用 JS 切換 `aria-hidden` —— 零視覺變動、動畫完整保留、無轉場時序風險。
（收合區塊內 0 個可聚焦元素，只有 `<br>`/`<strong>`，故 `aria-hidden` 不會造成鍵盤陷阱。）

**測試：** 本機起臨時 HTTP server（不進 repo）在 375px 手機視角實測，最終 **27 PASS / 0 FAIL**，
含 FAQ 快速切換 8 次的狀態一致性、估價器回歸、CLS、R5/R6/R7/R10 護欄。
④ 另做端對端驗證：攔截 `Intl` 偽造 21:00 → 等真實 60s 計時器 → 確認自動翻成「休息中」
（圓點 `#bbb`、文字 `#aaa`）；還原真實時間後再等一輪 → 確認自動翻回「營業中」。

**環境備註：** 這個 session 的 working directory 仍是搬家前的 OneDrive 路徑（session 早於搬遷），
編輯全程使用 `C:\dev\cccathotel` 絕對路徑，檔案正確。**下個 session 請直接在 `C:\dev\cccathotel`
開 Claude Code。** 另：Browser pane 截圖在此環境有裁切問題（563px 擷取 375 CSS px @ DPR2），
視覺截圖不可靠，版面以 DOM 量測為準。

## 2026-07-24 — repo 從 OneDrive 搬到 `C:\dev\cccathotel`

- KK 決定把 repo 從 OneDrive 同步資料夾（`~\OneDrive\Desktop\cccathotel`）搬到本機
  `C:\dev\cccathotel`，與其他 project 放在一起，消除 OneDrive 雲端同步跟 git/檔案寫入打架的風險。
- 使用 robocopy 複製整個資料夾（含 `.git`），驗證新位置 `git status` clean、`git log` 完整、
  remote 指向 `https://github.com/kayleetung/cccathotel.git`。
- GitHub Desktop 重新指向 `C:\dev\cccathotel`。
- **文件更新**：
  - RULES.md：E1 退役（不再有 OneDrive 同步問題）；E5 路徑改為 `C:\dev\cccathotel`；
    E6 歷史描述加註「repo 已搬離 OneDrive」；R1 why 加註搬離 OneDrive 但規則作為安全慣例保留。
  - PROJECT_INSTRUCTIONS.md ⑥：移除 OneDrive 提醒（E1 已退役）、repo root 路徑更新。
  - HANDOFF.md：更新目前狀態、加本次 session 摘要。
- OneDrive 上的舊副本保留，待 KK 確認無誤後自行刪除。

## 2026-07-24 — 搬遷到 Claude Code（tooling session）

- KK 決定把主力工具從 Cowork 換成 Claude Code，在 Windows 原生終端機（Git Bash/PowerShell/cmd）跑，
  不再透過 Cowork 的 Linux sandbox。Cowork 版本停用。
- **新增 `CLAUDE.md`**（repo root）作為 Claude Code 開工入口，用 `@import` 語法自動載入
  PROJECT_INSTRUCTIONS.md／RULES.md／HANDOFF.md 進 context，不需要手動 Read；README/HISTORY
  仍按任務再讀，不自動 import（避免一開工就塞爆 context）。
- **PROJECT_INSTRUCTIONS.md**：入口說明改成指向 CLAUDE.md（移除「內容也貼進 Cowork Project →
  Instructions」的舊描述）；① 開工讀檔順序加註「用 Claude Code 時 1/2 已自動載入」；
  ⑥ 環境雷段落改寫給新環境。
- **RULES.md 環境事實區**：E1／E3／E6 原本是 Cowork sandbox 限定的雷（bash 掛載落後、sandbox DNS
  被擋、bash git 殘留 index.lock），Claude Code 在原生終端機直接操作 Windows 實檔，這三個問題都不
  適用了。**編號保留不動**（避免這篇 HISTORY 舊條目裡的 E1/E5/E6 引用失效），但內容改寫：E1 改記
  「OneDrive 雲端限定檔案可能未同步」的新提醒、E3 標記已退役、E6 改記「git 現在可以直接跑，但
  push/部署仍照 R2」。E5（repo root 路徑雷）保留、只把補救方式從「重指 Cowork 連接資料夾」改成
  「cd 對根目錄」。E2／E4 環境無關，原封不動。
- **明確保留、這次沒有動的東西**：R1–R11 鐵律本身完全沒改；**R2（部署只透過 GitHub Desktop
  commit/push，不自動化推送）刻意保留** — Claude Code 現在技術上可以直接在原生終端機跑
  `git push`，但這是部署控制權的政策決定（🔴 等 KK 點頭），這次只做「讓 Claude Code 讀得到協議」
  的落地設定，沒有動 R2。留給 KK 之後決定要不要調整。
- **順手修正一個舊漂移**：HANDOFF.md 原本寫「2026-07-03 的文件制度尚待 KK commit+push」，但
  `git log` 查證 commit `c2e49d6` 已經 push 上線（`git status` 也是 clean），這是過期未更新的
  待辦，已在 HANDOFF 更正並移除。
- **HANDOFF.md**：清掉已作廢的「Cowork 連接資料夾待重指到 cccathotel 根」待辦（Cowork 停用，
  此項不再適用）。

## 2026-07-03 — 檢視規則＋修正資料夾路徑雷（review session）

- 交接後檢視剛建立的 RULES/HANDOFF/README/HISTORY，逐條對照 `index.html` 實檔驗證：R5（GA
  `G-2KLHF5VMVZ` 在 line 837/842）、R6（無 aggregateRating）、R10（版號 meta line 7＋檔首註解）、
  R1（`.gitattributes` eol=lf）、R8（無 .env/.gitignore）皆屬實。制度內部一致、無錯誤。
- **踩到資料夾路徑雷**：Cowork 連接的是空的子資料夾 `CCat Website\`，真正 repo root 在上一層
  `cccathotel\` → 開工讀不到任何文件，得繞 GitHub Desktop 才找到。加 RULES **E5** 記錄＋HANDOFF 指路，
  KK 已把 Cowork 連接重指到 `cccathotel\` 根。
- **踩到 git 殘鎖**：用 bash 跑 `git status` 診斷時，git 在 OneDrive 掛載的 repo 建了 `.git/index.lock`
  卻因掛載權限清不掉（bash unlink「Operation not permitted」、GitHub Desktop commit 被擋）。由 KK 在
  Windows 端手動刪 `index.lock` 後才 commit 成功。催生 RULES **E6**（別在此 repo 用 bash 跑 git）。
- 澄清假象：先前擔心的「index.html 檔尾截斷」「行數 1442 vs 1446 漂移」「jpg 被刪」全是 bash 掛載落後
  （E1）造成的假象；Read 工具與 GitHub Desktop 顯示真實檔完整（1449 行、正常結尾 `})();</script></body></html>`）。

## 2026-07-03 — 建立文件制度（institution session）

把原本單一 HANDOFF.md 拆成「每個事實只有一個家」的制度：
- 新增 **RULES.md**（鐵律＋地雷憲法）、**HISTORY.md**（本檔）、**README.md**（系統現況）、
  **PROJECT_INSTRUCTIONS.md**（協作協議 8 節）。
- **HANDOFF.md 改瘦**：只留狀態＋待辦＋不做清單＋最近 2 session；刪掉原第八節重複的商家資料
  （商家事實的家改為 index.html，見 R9）。
- **index.html 加可見版號機制**：`<meta name="version">`＋HTML 註解，格式 `YYYY.MM.DD-nn`，
  初始值 `2026.07.03-01`（見 R10）。
- **重大事實更正：host 是 Netlify，不是 GitHub Pages。** 用 DNS 查證（NS = nsone.net／Netlify DNS，
  A = AWS us-east-1），推翻舊 handoff 與原始 session prompt 的「GitHub Pages」說法。詳見 R3。
- 決策：MAP.md 暫不建（index.html 1446 行未達數千行門檻），改用 README 的 § 區塊索引表替代；
  待 index.html 破 ~2500 行再拆獨立 MAP.md。

## 2026-07-01 — 移除重複的入住準備清單（已上線）

移除「入住準備清單」互動勾選區塊（HTML section＋`.check-*`/`.btn-*` CSS＋`checkItems`/
`renderChecklist`/`checkAll`/`resetAll` JS），FAQ 05→04、Contact 06→05 重編號，**保留估價器**。
理由：內容與 FAQ「家長需要準備什麼／入住前可做什麼」重複，勾選框勾完不儲存、不帶進預約流程，
屬純裝飾。2026-07-03 驗證線上已生效（FAQ=04、Contact=05、清單消失、頁面完整渲染）。

> 註：GitHub commits API 端點在驗證當下仍回傳舊 commit `ea06b54`（API 快取），但**線上實際頁面
> 已是新版**——以線上頁面為部署真相，勿被 API 快取誤導。

## 2026-06-24 — SEO / a11y / perf 批次（commit `0446f4a` + `ea06b54`）

- 移除自評 `aggregateRating`（合規，見 R6）
- 加 favicon、apple-touch-icon、theme-color
- 加 preconnect（fonts/CDN）；首屏以下 8 張圖 `loading="lazy"` `decoding="async"`
- 標題層級修正 h5 → h3
- 文字對比 `--text-muted` 改 `#6B655F`（WCAG AA 4.5:1）；FAQ 展開高度放寬
- `areaServed` 收斂為實際服務區（鳳山／前鎮／大寮／苓雅）；sitemap `lastmod` 更新
- 加 `.gitattributes`（`* text=auto eol=lf`）統一換行符
- `ea06b54`：修復上一步被 `sed -i` 截斷的檔尾（此事件催生了 R1）

## 2026-06-06 及更早 — 早期 UX 微調

- `42ca0ea` UX: 簡化 photo strip nav 標籤
- `a28af85` fix: og:url 收尾引號；桌面停用 scroll-snap 以利拖曳
- `561c648` UX: 桌面 room photo 高度 380px
