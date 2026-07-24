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
