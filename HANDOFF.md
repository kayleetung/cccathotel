# HANDOFF — 目前狀態

> 每次開工先讀這份，再讀 [RULES.md](RULES.md) 全文。系統結構看 [README.md](README.md)、
> 更早的沿革看 [HISTORY.md](HISTORY.md)、協作方式看 [PROJECT_INSTRUCTIONS.md](PROJECT_INSTRUCTIONS.md)。
> **本檔只放：目前狀態＋待辦＋不做清單＋最近 2 個 session。超過 2 個 session 或 ~150 行就把最舊的搬去 HISTORY.md。**

---

## 目前狀態

- 網站正常上線於 https://cccathotel.com/（host = Netlify，見 R3）。
- 最近一次網站內容變更（移除入住準備清單）**已上線並驗證**。
- 本 session（2026-07-03）剛建立完整文件制度（RULES／HISTORY／README／PROJECT_INSTRUCTIONS）＋
  在 index.html 加了版號 meta。**這批文件與版號 meta 尚待 KK 在 GitHub Desktop commit＋push。**

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

- **2026-07-03 建立文件制度**：拆出 RULES/HISTORY/README/PROJECT_INSTRUCTIONS，HANDOFF 改瘦，
  index.html 加版號 meta；**查證並更正 host = Netlify（非 GitHub Pages）**。
- **2026-07-01 移除入住準備清單**：刪重複的互動勾選區塊，FAQ/Contact 重編號，保留估價器，已上線。

（更早的見 [HISTORY.md](HISTORY.md)）
