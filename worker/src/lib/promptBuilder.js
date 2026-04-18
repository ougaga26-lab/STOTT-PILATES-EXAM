/**
 * STOTT PILATES 核心 Prompt 構建器 - 學術筆試專業版
 */

import { getDictionaryString } from './dictionary.js';

function getSystemInstruction(category) {
  const dictStr = getDictionaryString(category);
  return `你是一位 STOTT PILATES 認證考試資深導師，對官方教材（Manual）有極高忠誠度，熟悉筆試重點考試方向。

【出題規範】
- 題目為筆試理論題，嚴禁出操作程序、步驟順序或現場口令題
- 所有輸出（題目、選項、解析）一律使用繁體中文，不附加任何英文或括號英文
- 正確答案 A/B/C/D 均可，確保分布均勻

【題型規則】
- 若本題主題標記「反向題型」，題目必須使用「下列何者不符合…」或「下列何者錯誤…」的否定格式
- 若本題主題包含「姿勢分析與肌肉失衡」，題目須包含「看到體態或狀況 → 推理肌肉長短或訓練策略」的臨床推理邏輯（例：某體態下某肌群處於縮短或被拉長狀態）
- 解析長度：解剖相關題目最多 3 句，其餘題目最多 2 句

【強制術語標準】
以下是本科目的官方術語對照表。動作名稱、肌肉名稱、器械名稱必須嚴格使用左側的繁體中文，不得自行翻譯或使用俗稱：
${dictStr}`;
}

const CATEGORY_EXAM = {
  IMP:        'Essential & Intermediate Matwork (墊上運動)',
  IR:         'Essential & Intermediate Reformer (核心床)',
  ICCB:       'Cadillac / Chair / Barrels (全器械)',
  MIXED:      'Matwork / Reformer / Cadillac / Chair / Barrels 混合',
  PRINCIPLES: '五大基本原則 (Essential Principles)',
  ANATOMY:    '解剖學與肌肉功能 (Anatomy)',
};

export function buildPrompt(category, excludeIds, topic) {
  const excludeClause = excludeIds?.length > 0 ? `\n排除重複 ID：${excludeIds.join(', ')}` : '';
  const examName = CATEGORY_EXAM[category] || CATEGORY_EXAM.MIXED;
  const mixedNote = category === 'MIXED'
    ? '從 IMP / IR / ICCB 三科中隨機選一出題，category 欄位填入實際代碼（IMP/IR/ICCB）。'
    : '';
  const topicNote = topic ? `\n本題主題：${topic}` : '';

  return {
    systemInstruction: getSystemInstruction(category),
    userMessage: `我近期要考 ${examName} 認證筆試，請協助我出 1 道筆試練習題，考驗我的理論知識。${mixedNote}${topicNote}${excludeClause}

輸出 JSON：
{"id":"","category":"${category}","scenario":"<考題>","choices":[{"id":"A","text":"<選項A>"},{"id":"B","text":"<選項B>"},{"id":"C","text":"<選項C>"},{"id":"D","text":"<選項D>"}],"correctId":"<A|B|C|D>","rationale":{"explanation":"<解析2句內>"}}`
  };
}

export function buildAnalysisPrompt(categoryLabel, score, wrongQuestions) {
  const wrongSummary = wrongQuestions.map((q, i) =>
    `${i + 1}. 題目：${q.scenario}\n   正確答案：${q.correctText}\n   學員選擇：${q.selectedText}\n   解析：${q.explanation}`
  ).join('\n\n');

  return {
    systemInstruction: `你是 STOTT PILATES 學科筆試備考顧問，請根據學員的作答結果，用繁體中文撰寫一份約 300 字的學習分析報告。報告須包含：整體表現評估、主要弱點分析、具體學習建議。語氣專業但鼓勵。`,
    userMessage: `科目：${categoryLabel}
成績：${score.correct} / ${score.total} 題正確

答錯題目如下：
${wrongSummary || '（全部答對）'}

請輸出純 JSON：{"analysis":"報告內容"}`
  };
}
