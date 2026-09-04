# cv

線上履歷 / Online CV — 蔡宗穎 Camus Tsai

**網址：** https://cecefat.github.io/cv/

## 檔案結構

| 檔案 | 用途 |
|---|---|
| `index.html` | 全部內容（履歷文字、經歷、聯絡資訊）都在這裡 |
| `styles.css` | 版型與配色。改主色只要動最上面 `:root` 那幾行 |
| `script.js` | 手機選單、捲動顯示、回到頂端、GitHub star 數 |
| `.nojekyll` | 告訴 GitHub Pages 不要跑 Jekyll，直接吃靜態檔 |

## 怎麼改內容

1. 開 `index.html`，找到對應的 `<section>`（`#about`、`#experience`…）直接改文字。
2. 新增一段工作經歷 → 複製一整塊 `<div class="timeline-item">…</div>` 貼在同一個 `<div class="timeline">` 裡面。
3. 存檔後：

```bash
git add -A && git commit -m "update cv" && git push
```

推上去約 1 分鐘後線上就會更新。

## 本機預覽

```bash
python -m http.server 8000
```

然後開 http://localhost:8000

## 匯出 PDF

瀏覽器直接 Ctrl+P → 另存為 PDF。CSS 已有 `@media print` 規則，會自動隱藏導覽列與按鈕、把深色區塊轉成白底黑字。

## 免責聲明

本站所述 AI 相關產出均由大型語言模型基於公開專利文件與已發布技術標準生成，**不構成**法律意見或任何形式之專業諮詢；內容不代表作者任何現任或前任雇主之觀點、方法論或立場。
