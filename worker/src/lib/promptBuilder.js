/**
 * STOTT PILATES 核心 Prompt 構建器 - 學術筆試專業版
 */

const CATEGORY_NAME = {
  IMP:        'Essential & Intermediate Matwork (墊上運動)',
  IR:         'Essential & Intermediate Reformer (核心床)',
  ICCB:       'Cadillac / Chair / Barrels',
  MIXED:      'Matwork / Reformer / Cadillac / Chair / Barrels 混合',
  PRINCIPLES: '五大基本原則 (Essential Principles)',
  ANATOMY:    '解剖學與肌肉功能 (Anatomy)',
};

export function buildPrompt(category, excludeIds) {
  const excludeClause = excludeIds?.length > 0 ? `\n排除重複 ID：${excludeIds.join(', ')}` : '';
  const categoryName = CATEGORY_NAME[category] || CATEGORY_NAME.MIXED;
  const mixedNote = category === 'MIXED'
    ? '\n注意：從 IMP / IR / ICCB 三科中隨機選一出題，category 欄位填入實際代碼（IMP/IR/ICCB）。'
    : '';

  return {
    systemInstruction: `你是一位 STOTT PILATES 認證導師，專精於${categoryName}筆試理論。請嚴格根據官方教材出題，涵蓋解剖學分析、原理、目標肌肉、穩定性、靈活性、器械操作規範與原則、體態修正、動作調整。
術語格式：動作名稱與肌肉名稱用「中文 (English)」標示，其餘句子純繁體中文。
正確答案：A/B/C/D 均可，確保分布均勻。`,

    userMessage: `請生成 1 題高品質的筆試選擇題。${mixedNote}${excludeClause}

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
