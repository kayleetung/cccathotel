# cccathotel.com 網站維護 — 接手說明（HANDOFF）

> 希希貓旅 CC Cat Boarding｜高雄鳳山純貓住宿
> 最後更新：2026-07-01

---

## 一、專案概要

- **Repo**：`kayleetung/cccathotel`（GitHub）
- **主要檔案**：`website/index.html`（單頁式網站，HTML + 內嵌 CSS/JS，無框架）
- **部署**：GitHub Pages，自訂網域 `https://cccathotel.com/`
- **本機路徑**：`C:\Users\kaytu\OneDrive\Desktop\cccathotel\website\index.html`
- **Repo 根目錄**：`C:\Users\kaytu\OneDrive\Desktop\cccathotel`（`.git` 在此）

---

## 二、工作流程

1. 本機用**檔案編輯工具**（Read／Write／Edit）修改 `website/index.html`
2. GitHub Desktop 檢視 diff → commit → **Push origin**
3. GitHub Pages 約 1–2 分鐘後部署完成

---

## 三、⚠️ 環境地雷（務必遵守，前人踩過）

1. **此資料夾是 OneDrive 同步的**（桌面被 Known Folder Move 接管，Desktop = `OneDrive\Desktop`）。

2. **絕對不要用破壞性的就地 shell 指令改檔**——`sed -i`、`>` 覆寫重導、`truncate` 等一律禁止。
   曾用 `sed -i` 修換行符，在 OneDrive 同步競爭下把 `index.html` 檔尾**截斷**（掉了照片條 JS 和
   `</script></body></html>`，整頁互動全掛）。
   → 改檔一律走檔案編輯工具（Read／Write／Edit），逐段替換，不整檔重寫。

3. **sandbox 的 Linux 掛載視圖可能跟 Windows 實檔不同步**。以檔案編輯工具與 GitHub Desktop
   看到的（Windows 端）為準；用 bash 驗證前先確認它讀到的是最新內容。

4. 已加 `.gitattributes`（`* text=auto eol=lf`）統一換行符，避免每次 commit 出現整檔變動雜訊。

---

## 四、驗證部署的方法

- 線上有 CDN 快取，驗證時用查詢字串繞過：`https://cccathotel.com/?v=時間戳`
- 確認 commit 是否真的上 main：
  `https://api.github.com/repos/kayleetung/cccathotel/commits?per_page=3`（可加 `&t=xxx` 破快取）
- 觀察訊號：預訂流程標題為 h3、`meta theme-color` 存在、整頁完整渲染到 footer。

---

## 五、頁面結構（區塊順序）

| 編號 | 區塊 | 說明 |
|------|------|------|
| Hero | 首屏 | logo、標語、三個賣點徽章（純貓／每日回報／合法立案） |
| 01 | About 關於希希貓旅 | 品牌故事、特寵業字號、照片條（可左右拖動） |
| 02 | Rooms & Rates 房型與收費 | 經典房 $600／加高房 $900 + **費用試算估價器** |
| 03 | How to Book 預訂流程 | 5 步驟 |
| 04 | FAQ 常見問題 | 9 題手風琴展開 |
| 05 | Contact 聯絡我們 | 地址、時間、LINE/TEL、地圖、社群 |
| — | Footer | 品牌資訊、LINE/電話 |
| — | Floating CTA | **手機版底部常駐**：LINE 預約 + 撥打電話（`position: fixed; bottom: 0`） |

技術重點：
- 結構化資料：`LocalBusiness` + `FAQPage` schema（JSON-LD，`<head>` 內）
- 無 `aggregateRating`（頁面無實際評論，避免 Google self-serving review 違規）
- 營業狀態（Contact 區「營業中」）由 JS 依台北時間即時判斷

---

## 六、變更紀錄（Changelog）

### 2026-07-01（session：清單移除）— **待 commit**
移除重複又無實際作用的「入住準備清單」互動勾選區塊：
- 刪 HTML：整個「04 入住準備清單」section（勾選框 + 全部勾選/重置按鈕）
- 刪 CSS：`.check-*`、`.btn-outline-green`、`.btn-ghost`、`.checklist-done-msg` 等
- 刪 JS：`checkItems` 陣列與 `renderChecklist`／`checkAll`／`resetAll`
- 重編號：FAQ 05→04、Contact 06→05
- **保留**估價器（費用試算）不動
- 理由：內容與 FAQ「家長需要準備什麼」「入住前可以先做什麼」重複，勾選框勾完不儲存、
  不帶進預約流程，屬純裝飾，增加頁面長度卻不轉換。

### 2026-06(?)（前一 session：SEO/a11y/perf，commit `ea06b54`）
- 移除自評 `aggregateRating`（合規）
- 加 favicon、apple-touch-icon、theme-color
- 加 preconnect（fonts/CDN）；首屏以下 8 張圖 `loading="lazy"` `decoding="async"`
- 標題層級修正 h5→h3
- 文字對比 `--text-muted` 改 `#6B655F`（WCAG AA 4.5:1）；FAQ 展開高度放寬
- `areaServed` 收斂為實際服務區（鳳山／前鎮／大寮／苓雅）；sitemap `lastmod` 更新
- 加 `.gitattributes`；修復被截斷的檔尾

---

## 七、待辦與改善路線圖（Roadmap）

依「資深網站策略」評估，優先級由高到低。核心結論：
**網站不缺設計，缺的是「證據」和「人」——全篇都是店家自述，沒有真實客人替品牌背書。**

| 優先 | 項目 | 內容 | 需要的素材 |
|------|------|------|-----------|
| ① 最高 | 真實社會證明 | 放 3–5 則真實家長好評（LINE 對話截圖或 Google 評論擷圖，去識別化） | 需老闆提供截圖 |
| ② 高 | 每日回報眼見為憑 | 把「每日影片回報」王牌賣點從文字改成真實回報訊息截圖／範例影片 | 需一張回報截圖 |
| ③ 高 | 經營者故事＋一張臉 | About 加一段「我是誰／為什麼開純貓旅館」＋真人抱貓照 | 需照片＋3 句理由 |
| ④ 完成 | ~~移除重複的勾選清單~~ | 已完成（見上方 changelog） | — |
| ⑤ 中 | Hero 痛點副標 | 英文標語旁補一句直擊痛點的中文（如「純貓空間，沒有狗味與吵鬧」） | 無，可直接做 |
| 補 | 訂金/取消政策明文 | 預訂流程有提「支付訂金」，但退款/取消規則未寫，是成交前摩擦點 | 需老闆確認政策 |

> 註：手機版常駐 LINE 按鈕**已存在**（Floating CTA），無需再加。

---

## 八、聯絡與商家資訊（供文案參考）

- 地址：高雄市鳳山區鳳甲路 329 號 1 樓
- 服務範圍：鳳山・前鎮・大寮・五甲・苓雅及高雄全區
- 營業：11:00–20:00｜接送/參觀 12:00–19:00（預約制）
- LINE：`cc-cat-home`｜電話：0909-005-031
- 特寵業字第 W1141091-00 號
- IG：ryo18.19｜FB：profile.php?id=61578060331659
- 房價：經典房 $600/晚（120³cm，1–2 貓，多一貓 +$200）；加高房 $900/晚（120×120×240cm，最多 4 貓）
