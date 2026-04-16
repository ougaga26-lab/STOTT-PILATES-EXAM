/**
 * STOTT PILATES 核心 Prompt 構建器 - 學術筆試專業版
 */

// 動作類科目（IMP / IR / ICCB / MIXED）
const MOVEMENT_CATEGORY_NAME = {
  IMP:   'STOTT PILATES Essential & Intermediate Matwork (墊上運動)',
  IR:    'STOTT PILATES Essential & Intermediate Reformer (核心床)',
  ICCB:  'STOTT PILATES Cadillac / Chair / Barrels (全器械)',
  MIXED: 'STOTT PILATES Matwork / Reformer / Cadillac / Chair / Barrels 混合',
};

function buildMovementInstruction(categoryName) {
  return `你是一 STOTT PILATES 備考小工具，專精於${categoryName}筆試理論。請嚴格根據官方教材出題，涵蓋解剖學、起始姿勢、呼吸練習(吸氣、吐氣)、原理(目標肌肉、穩定性、靈活性、協調性)、器械操作規範與原則、體態評估、要點、動作調整，出相關筆試考題非術科考題。
術語格式：動作名稱與肌肉名稱用「中文 (English)」標示，其餘句子純繁體中文。
正確答案：A/B/C/D 均可，確保分布均勻。`;
}

// 理論類科目（PRINCIPLES / ANATOMY）
const THEORY_INSTRUCTION = {
  PRINCIPLES: `你是一 STOTT PILATES 備考小工具，專精於五大基本原則（Essential Principles）筆試理論。
科目範圍：1. Breathing 2. Pelvic Placement 3. Rib Cage Placement 4. Scapular Movement & Stabilisation 5. Head & Cervical Placement。
考題重點：原則機制、指導語辨別、原則間交互影響。出純理論筆試考題，非術科考題。
術語格式：動作名稱與肌肉名稱用「中文 (English)」標示，其餘句子純繁體中文。
正確答案：A/B/C/D 均可，確保分布均勻。`,

  ANATOMY: `你是一 STOTT PILATES 備考小工具，專精於解剖學與肌肉功能（Anatomy Focus）筆試理論。
考題範疇：各式肌肉起始點 (Origin)、結束點 (Insertion)、功能、動作 (Action)、動作類型（屈曲、伸展、外展、內收、旋轉）、脊椎解剖結構等。
考題重點：純粹的解剖知識，不限定特定動作或器械。出純理論筆試考題，非術科考題。
術語格式：動作名稱與肌肉名稱用「中文 (English)」標示，其餘句子純繁體中文。
正確答案：A/B/C/D 均可，確保分布均勻。`,
};

export function buildPrompt(category, excludeIds) {
  const excludeClause = excludeIds?.length > 0 ? `\n排除重複 ID：${excludeIds.join(', ')}` : '';

  const systemInstruction = THEORY_INSTRUCTION[category]
    ?? buildMovementInstruction(MOVEMENT_CATEGORY_NAME[category] || MOVEMENT_CATEGORY_NAME.MIXED);

  const mixedNote = category === 'MIXED'
    ? '\n注意：從 IMP / IR / ICCB 三科中隨機選一出題，category 欄位填入實際代碼（IMP/IR/ICCB）。'
    : '';

  return {
    systemInstruction,
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
