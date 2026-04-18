# 任務：實作多層級字典注入系統

> 建立日期：2026-04-18　狀態：待執行

---

## 背景說明

目前系統只有**後處理**（`terms.js`）：Gemini 出題後強制替換術語格式。
但如果 Gemini 一開始就用了錯誤的術語名稱（例如「公三頭機」而非「肱三頭肌」），
後處理根本認不出來，錯誤就會直接放行。

本任務新增**前注入**層：出題前先告訴 Gemini 要用哪些官方術語，兩層同時運作互補。

```
前注入 dictionary.js  →  Gemini 出題  →  後處理 terms.js  →  回傳前端
（防術語用錯）                              （防格式錯誤）
```

---

## CSV 來源（已確認翻譯正確）

位置：`translate/` 資料夾，共 8 份，**編碼為 Big5**，讀取時需指定。

| 檔案 | 對應字典 key | 注入科目 |
|------|-------------|---------|
| `translate_ANATOMY.csv` | `CORE` | 全科目（必注入）|
| `translate_Matwork 墊上練習.csv` | `IMP` | IMP、MIXED |
| `translate_IR核心床.csv` | `IR` | IR、MIXED |
| `translate_Cadillac 凱迪拉克.csv` | `ICCB.CADILLAC` | ICCB、MIXED |
| `translate_Stability Chair平衡椅.csv` | `ICCB.CHAIR` | ICCB、MIXED |
| `translate_Arc Barrel 弧型桶.csv` | `ICCB.BARRELS` | ICCB、MIXED |
| `translate_Ladder Barrel 梯桶.csv` | `ICCB.BARRELS` | ICCB、MIXED |
| `translate_Spine Corrector 脊柱矯正器.csv` | `ICCB.BARRELS` | ICCB、MIXED |

---

## 需要過濾的 CSV 雜訊

每份 CSV 都含有手冊章節標題，不是術語，**建立字典時要過濾掉**：

```
引言、基本原則、原理、練習原理、練習、熱身、起始姿勢、常見的動作修整、
安全與使用、特徵、貢獻者、斯多特普拉提教培訓、
初級凱迪拉克、中級與高級凱迪拉克、完整平衡椅、完整梯桶、全套梯桶手冊、
基礎、中級、高級、現代方法、練習動作列表
```

過濾邏輯：EN 欄位如果是以下這些，就跳過：
`INTRODUCTION, BASIC PRINCIPLES, ESSENCES, EXERCISE ESSENCES, EXERCISES,
WARM UP, WARM UPS, STARTING POSITIONS, COMMON MODIFICATIONS, SAFETY & USAGE,
FEATURES, CONTRIBUTORS, STOTT PILATES EDUCATION, TABLE OF CONTENTS,
ESSENTIAL, INTERMEDIATE, ADVANCED, CONTEMPORARY APPROACH, WORKOUT CHART,
COMPLETE ARC BARREL, COMPLETE LADDER BARREL, COMPLETE STABILITY CHAIR,
BASIC CADILLAC, INTERMEDIATE & ADVANCED CADILLAC`

---

## 第一步：建立 `worker/src/lib/dictionary.js`

**注意**：放在 `worker/src/lib/`，不是 `services/`（Gemini 建議的路徑有誤）。

### 結構

```js
export const STOTT_DICT = {
  CORE: {
    // 來自 translate_ANATOMY.csv
    // key = 中文, value = 英文
    '額狀面 / 冠狀面': 'Frontal / Coronal Plane',
    '矢狀面': 'Sagittal Plane',
    // ... 全部 112 條（過濾章節標題後）
  },

  IMP: {
    // 來自 translate_Matwork 墊上練習.csv（過濾後）
    '百次拍擊': 'HUNDRED',
    '單腿伸展': 'SINGLE LEG STRETCH',
    // ...
  },

  IR: {
    // 來自 translate_IR核心床.csv（過濾後）
    '腳部練習': 'FOOT WORK',
    '大象姿': 'ELEPHANT',
    // ...
  },

  ICCB: {
    CADILLAC: {
      // 來自 translate_Cadillac 凱迪拉克.csv（過濾後）
    },
    CHAIR: {
      // 來自 translate_Stability Chair平衡椅.csv（過濾後）
    },
    BARRELS: {
      // 合併三份：Arc Barrel + Ladder Barrel + Spine Corrector（過濾後，去重）
    },
  },
};

/**
 * 根據 category 組合出要注入的字典字串
 * 格式：「中文 = English」，每行一條
 */
export function getDictionaryString(category) {
  // 1. 全科目都注入 CORE（解剖術語）
  let combined = { ...STOTT_DICT.CORE };

  // 2. 按科目疊加專項術語
  if (category === 'IMP' || category === 'MIXED') {
    Object.assign(combined, STOTT_DICT.IMP);
  }
  if (category === 'IR' || category === 'MIXED') {
    Object.assign(combined, STOTT_DICT.IR);
  }
  if (category === 'ICCB' || category === 'MIXED') {
    Object.assign(combined, STOTT_DICT.ICCB.CADILLAC);
    Object.assign(combined, STOTT_DICT.ICCB.CHAIR);
    Object.assign(combined, STOTT_DICT.ICCB.BARRELS);
  }

  // 3. 轉成字串
  return Object.entries(combined)
    .map(([zh, en]) => `${zh} = ${en}`)
    .join('\n');
}
```

---

## 第二步：修改 `worker/src/lib/promptBuilder.js`

### 修改點 1：import dictionary

在檔案最上方加入：

```js
import { getDictionaryString } from './dictionary.js';
```

### 修改點 2：更新 SYSTEM_INSTRUCTION

原本：
```js
const SYSTEM_INSTRUCTION = `你是一位 STOTT PILATES 認證考試的出題助理...`;
```

改為動態函數：
```js
function getSystemInstruction(category) {
  const dictStr = getDictionaryString(category);
  return `你是一位 STOTT PILATES 認證考試的出題助理，熟悉官方教材與筆試重點考試方向。題目為筆試理論題，不考操作步驟或現場指導語。
所有輸出（題目、選項、解析）一律使用繁體中文，不附加任何英文或括號英文。
正確答案：A/B/C/D 均可，確保分布均勻。

【強制翻譯標準】
以下是本科目的官方術語對照表。出題時必須嚴格使用左側的繁體中文名稱，不得自行翻譯或使用俗稱：
${dictStr}`;
}
```

### 修改點 3：更新 buildPrompt

原本：
```js
export function buildPrompt(category, excludeIds, topic) {
  ...
  return {
    systemInstruction: SYSTEM_INSTRUCTION,
    ...
  };
}
```

改為：
```js
export function buildPrompt(category, excludeIds, topic) {
  ...
  return {
    systemInstruction: getSystemInstruction(category),
    ...
  };
}
```

---

## 第三步：修改 `frontend/src/hooks/useQuizSession.js`

### 目的

ICCB 科目目前主題只有「目標肌肉與穩定肌 / 五大原則應用 / 體態分析與動作變體 / 解剖學」，
Gemini 不知道要輪流出 Cadillac / Chair / Barrels 的題，需要在 topic 裡加入器械資訊。

### 修改點：新增 ICCB 專屬主題序列

原本：
```js
const MOVEMENT_TOPICS = [ ... ];

const TOPIC_SEQUENCES = {
  IMP:   MOVEMENT_TOPICS,
  IR:    MOVEMENT_TOPICS,
  ICCB:  MOVEMENT_TOPICS,   // ← 這裡要改
  MIXED: MOVEMENT_TOPICS,
  ...
};
```

改為：
```js
const ICCB_TOPICS = [
  '凱迪拉克 (Cadillac) — 目標肌肉與穩定肌',
  '平衡椅 (Chair) — 五大原則應用',
  '弧型桶 (Arc Barrel) — 體態分析與動作變體',
  '梯桶 (Ladder Barrel) — 解剖學',
  '凱迪拉克 (Cadillac) — 五大原則應用',
  '脊柱矯正器 (Spine Corrector) — 目標肌肉與穩定肌',
  '平衡椅 (Chair) — 體態分析與動作變體',
  '梯桶 (Ladder Barrel) — 目標肌肉與穩定肌',
  '凱迪拉克 (Cadillac) — 解剖學',
  '弧型桶 (Arc Barrel) — 五大原則應用',
];

const TOPIC_SEQUENCES = {
  IMP:   MOVEMENT_TOPICS,
  IR:    MOVEMENT_TOPICS,
  ICCB:  ICCB_TOPICS,       // ← 換成專屬序列
  MIXED: MOVEMENT_TOPICS,
  ...
};
```

---

## 注意事項

1. **`terms.js` 不要動**：後處理保留，兩層並存
2. **CSV 編碼是 Big5**：用 Python 腳本或手動轉換後貼入 dictionary.js 的 JS 物件，不要直接 require CSV
3. **三份 Barrels CSV 合併去重**：Arc Barrel、Ladder Barrel、Spine Corrector 合入同一個 `ICCB.BARRELS` 物件，重複的 key 保留一份即可
4. **不影響其他功能**：只改 `dictionary.js`（新增）、`promptBuilder.js`（加注入）、`useQuizSession.js`（ICCB 主題）
5. **部署**：改完 push 到 GitHub main branch，GitHub Actions 會自動部署前端和 Worker

---

## 部署後驗證

- [ ] 選 ANATOMY 科目出題，確認肌肉名稱正確
- [ ] 選 IR 科目出題，確認 Reformer 動作名稱正確
- [ ] 選 ICCB 科目出題，確認 10 題中有輪流出現 Cadillac / Chair / Barrels 器械
- [ ] 選 MIXED 科目出題，確認混合正常
- [ ] AI 分析功能正常（不應受影響）
