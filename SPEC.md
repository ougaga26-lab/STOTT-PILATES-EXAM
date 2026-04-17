# STOTT PILATES AI 備考小工具 — 完整規格文件

> 版本：v1.0　最後更新：2026-04-17

---

## 1. 專案概覽

一個專為 STOTT PILATES 認證筆試設計的 AI 練習工具。用戶可依科目選題，AI 即時生成考題並在回答後提供詳解，並有成績分析與歷史記錄功能。

**目標使用者**：準備 STOTT PILATES 認證考試的學員（非官方工具）

---

## 2. 技術架構

```
使用者瀏覽器
     │
     ▼
Cloudflare Pages（靜態前端）
  React + Vite
  https://stott-pilates-exam.pages.dev
     │
     │  HTTPS + X-App-Key header
     ▼
Cloudflare Worker（API 後端）
  Node-compatible JS
  https://stott-exam-worker.ougaga26.workers.dev
     │
     ▼
Google Gemini 2.5 Flash API
```

---

## 3. 前端

### 3.1 技術棧

| 項目 | 選擇 |
|------|------|
| 框架 | React 18 |
| 建置工具 | Vite |
| 樣式 | Tailwind CSS + CSS Variables（設計系統） |
| 字型 | Fraunces（serif 標題）、系統字型（內文） |
| 狀態管理 | React Context + useReducer |
| 資料持久化 | localStorage（歷史記錄）、sessionStorage（密碼驗證） |

### 3.2 頁面結構

```
App.jsx
├── PasswordGate.jsx        密碼驗證頁（未解鎖時顯示）
└── QuizProvider（Context）
    ├── Home.jsx            首頁 — 科目選擇
    ├── Quiz.jsx            答題頁
    ├── Results.jsx         成績頁（含 AI 分析）
    ├── HistoryList.jsx     練習記錄列表
    └── HistoryDetail.jsx   單次記錄詳情
```

### 3.3 重要組件

| 組件 | 功能 |
|------|------|
| `ProgressBar` | 顯示第 N / 10 題進度 |
| `ChoiceList` | A/B/C/D 四選項，回答後高亮正確/錯誤 |
| `RationalePanel` | 答題後展開，顯示 AI 解析 |
| `ErrorBanner` | API 錯誤提示 |
| `LoadingSpinner` | 載入動畫 |
| `Footer` | 免責聲明 |

### 3.4 狀態機（quizReducer.js）

```
SELECT → LOADING → ANSWERING → LOADING → ... → COMPLETE
                     ↓
                  ERROR（可重試）
```

| Phase | 說明 |
|-------|------|
| `SELECT` | 首頁，選擇科目 |
| `LOADING` | 呼叫 API 生成題目中 |
| `ANSWERING` | 題目已載入，等待用戶作答 |
| `COMPLETE` | 10 題全部作答完畢，顯示成績 |
| `ERROR` | API 失敗 |

### 3.5 題目快取與預取

`useQuizSession.js` 維護一個 module-level `Map` 快取：
- 用戶回答當前題目的同時，背景預取下一題
- 快取 key：`${category}|${excludeIds}|${topic}`
- 下一題已備好時，切換幾乎無延遲

### 3.6 主題輪轉（Topic Rotation）

每場 10 題按固定順序分配主題，確保考題涵蓋均衡：

**器械科目（IMP / IR / ICCB / MIXED）**：
1. 目標肌肉與穩定肌
2. 五大原則應用
3. 體態分析與動作變體
4. 解剖學
5. 目標肌肉與穩定肌
6. 五大原則應用
7. 體態分析與動作變體
8. 解剖學
9. 目標肌肉與穩定肌
10. 體態分析與動作變體

**五大原則（PRINCIPLES）**：
Breathing → Pelvic Placement → Rib Cage Placement → Scapular Movement & Stabilisation → Head & Cervical Placement（循環兩輪）

**解剖學（ANATOMY）**：
肌肉起止點 → 主動肌與拮抗肌 → 協同肌與穩定肌 → 收縮類型 → 運動平面與關節類型（循環兩輪）

### 3.7 歷史記錄

- 存於 `localStorage`，key：`quiz_history`
- 最多保留 10 筆，超過自動移除最舊一筆
- 每筆記錄包含：科目、日期、分數、所有題目與作答、AI 分析報告

---

## 4. 後端（Cloudflare Worker）

### 4.1 API 端點

| 方法 | 路徑 | 功能 |
|------|------|------|
| `POST` | `/api/auth` | 驗證訪問密碼（`X-App-Key` header） |
| `POST` | `/api/generate` | 生成單道練習題 |
| `POST` | `/api/analysis` | 生成 AI 學習分析報告 |
| `GET` | `/health` | 健康檢查（跳過密碼驗證） |

### 4.2 訪問控制

所有 `/api/*` 請求（除 `/health`）必須附帶：

```
X-App-Key: <密碼>
```

密碼與 Cloudflare Secret `APP_KEY` 比對，不符合回 `401 UNAUTHORIZED`。密碼不存於前端 code。

### 4.3 /api/generate 請求格式

```json
{
  "category": "IMP | IR | ICCB | MIXED | PRINCIPLES | ANATOMY",
  "excludeIds": ["id1", "id2"],
  "topic": "本題主題字串"
}
```

**回應**：

```json
{
  "question": {
    "id": "uuid",
    "category": "IMP",
    "scenario": "題目敘述",
    "choices": [
      { "id": "A", "text": "選項A" },
      { "id": "B", "text": "選項B" },
      { "id": "C", "text": "選項C" },
      { "id": "D", "text": "選項D" }
    ],
    "correctId": "B",
    "rationale": { "explanation": "解析文字" }
  }
}
```

### 4.4 /api/analysis 請求格式

```json
{
  "categoryLabel": "Matwork",
  "score": { "correct": 7, "total": 10 },
  "wrongQuestions": [
    {
      "scenario": "題目",
      "correctText": "正確選項文字",
      "selectedText": "用戶選的文字",
      "explanation": "解析"
    }
  ]
}
```

### 4.5 Cloudflare Worker 環境變數

| 名稱 | 類型 | 說明 |
|------|------|------|
| `GEMINI_API_KEY` | Secret | Google Gemini API 金鑰 |
| `APP_KEY` | Secret | 訪問密碼（目前：SCTA） |
| `MODEL_NAME` | Plaintext | `gemini-2.5-flash` |
| `ALLOWED_ORIGIN` | Plaintext | `https://stott-pilates-exam.pages.dev` |

---

## 5. AI Prompt 設計

### 5.1 System Instruction

```
你是一位 STOTT PILATES 認證考試的出題助理，熟悉官方教材與筆試重點考試方向。
題目為筆試理論題，不考操作步驟或現場指導語。
所有輸出（題目、選項、解析）一律使用繁體中文，不附加任何英文或括號英文。
正確答案：A/B/C/D 均可，確保分布均勻。
```

### 5.2 User Message 格式

```
我近期要考 {examName} 認證筆試，請協助我出 1 道筆試練習題，考驗我的理論知識。
本題主題：{topic}
排除重複 ID：{excludeIds}

輸出 JSON：
{"id":"","category":"...","scenario":"<考題>","choices":[...],"correctId":"<A|B|C|D>","rationale":{"explanation":"<解析>"}}
```

### 5.3 Gemini 設定

- 模型：`gemini-2.5-flash`
- `responseMimeType: "application/json"`（強制 JSON 輸出）

---

## 6. 術語後處理管線（terms.js）

Gemini 輸出後，依序執行以下處理，確保格式一致：

1. 清除 Markdown 格式（`**bold**`、`*italic*`、反引號）
2. 移除 `STOTT PILATES` 字樣（含前後書名號、後接的「的」）
3. 脫掉術語外層引號（`「腹橫肌 (Transversus)」` → `腹橫肌 (Transversus)`）
4. 清除空引號 `「」`
5. 修正術語格式：`中文 (任意英文)` → `中文 (官方英文)`（對照 TERMS 表）
6. 器械英文名稱 → 純中文（EQUIPMENT_ZH 表）
7. 翻轉格式：`English (中文)` → `中文 (English)`
8. 清除所有殘留英文括號
9. 清理中文字間多餘空格

**術語表**涵蓋：動作名稱、解剖平面、關節類型、全身肌肉名稱（約 130 條）、器械名稱。

---

## 7. 科目清單

| 科目 ID | 標題 | 副標題 | 說明 |
|---------|------|--------|------|
| `IMP` | Matwork | IMP 墊上運動 | — |
| `IR` | Reformer | IR 核心床 | 附 Reformer 動作串聯小工具連結 |
| `ICCB` | ICCB | ICCB 全器械 | — |
| `MIXED` | 混合模式 | IMP + IR + ICCB | 三科隨機混合，模擬完整考試環境 |
| `PRINCIPLES` | 五大原則 | Essential Principles | STOTT 理論之基石 |
| `ANATOMY` | 解剖學 | Anatomy Focus | 附解剖學字卡小工具連結 |

---

## 8. 部署流程

### 前端（Cloudflare Pages）

```bash
# 本地 build
cd frontend
npm run build

# 推 git 即自動觸發 Cloudflare Pages 部署
git push origin main
```

環境變數（Pages 設定）：
- `VITE_WORKER_URL` = `https://stott-exam-worker.ougaga26.workers.dev`

### Worker（Cloudflare Workers）

```bash
cd worker

# 部署
npx wrangler deploy

# 設定 Secret（首次或變更時）
npx wrangler secret put GEMINI_API_KEY
npx wrangler secret put APP_KEY
```

---

## 9. 檔案結構

```
S備考/
├── frontend/
│   ├── src/
│   │   ├── App.jsx                  根組件 + 密碼判斷
│   │   ├── pages/
│   │   │   ├── PasswordGate.jsx     密碼驗證頁
│   │   │   ├── Home.jsx             科目選擇首頁
│   │   │   ├── Quiz.jsx             答題頁
│   │   │   ├── Results.jsx          成績 + AI 分析頁
│   │   │   ├── HistoryList.jsx      練習記錄列表
│   │   │   └── HistoryDetail.jsx    記錄詳情
│   │   ├── components/
│   │   │   ├── ChoiceList.jsx
│   │   │   ├── RationalePanel.jsx
│   │   │   ├── ProgressBar.jsx
│   │   │   ├── ErrorBanner.jsx
│   │   │   ├── LoadingSpinner.jsx
│   │   │   └── Footer.jsx
│   │   ├── context/
│   │   │   └── QuizContext.jsx      全局狀態 Context
│   │   ├── reducers/
│   │   │   └── quizReducer.js       狀態機
│   │   ├── hooks/
│   │   │   └── useQuizSession.js    題目快取 + 預取邏輯
│   │   ├── services/
│   │   │   ├── api.js               Worker API 呼叫
│   │   │   └── history.js           localStorage 歷史記錄
│   │   └── constants/
│   │       ├── categories.js        科目定義
│   │       └── flashcards.js        字卡資料
│   └── vite.config.js
├── worker/
│   ├── src/
│   │   ├── index.js                 路由 + 密碼驗證
│   │   ├── handlers/
│   │   │   ├── generateQuestion.js  生成考題
│   │   │   ├── generateRationale.js 生成解析（備用）
│   │   │   └── generateAnalysis.js  生成學習分析
│   │   └── lib/
│   │       ├── promptBuilder.js     Prompt 構建
│   │       ├── gemini.js            Gemini API 呼叫
│   │       ├── validation.js        Zod 輸入驗證 + JSON 解析
│   │       ├── terms.js             術語後處理
│   │       └── cors.js              CORS headers
│   └── wrangler.toml
├── design-system/                   設計系統文件
├── translate.csv                    術語對照表原始檔
├── STCALOGO.png / STCALOGO2.png    Logo 資源
└── SPEC.md                          本文件
```

---

## 10. 重要設計決策與原因

| 決策 | 原因 |
|------|------|
| 密碼驗證在 Worker 做比對 | 密碼不暴露於前端 source code |
| `responseMimeType: "application/json"` | 強制 Gemini 輸出 JSON，省去 JSON 解析失敗問題 |
| 主題輪轉由前端控制 | Gemini 若自由出題會偏向少數類型（如器械操作）；前端注入 topic 確保均衡 |
| 術語後處理 vs. Prompt 規則 | Prompt 規則靠 Gemini 遵守不穩定；後處理保證 100% 格式一致 |
| Module-level 快取 Map | sessionStorage 有序列化成本；Map 在 JS 模組內共享，生命週期與 tab 相同 |
| localStorage 歷史記錄 | 無需後端、無隱私疑慮，最多 10 筆足夠使用 |

---

## 11. 已知限制

- AI 生成內容不保證 100% 正確，請以官方課本為準
- 密碼（`SCTA`）透過口耳相傳仍可分享，無法防止傳播，但可防止 API 被完全陌生人濫用
- Worker 免費方案每日有請求次數上限
- 本工具為非官方學習輔助，與 STOTT PILATES 官方無關聯

---

*Powered by Google Gemini AI｜非官方學習工具*
