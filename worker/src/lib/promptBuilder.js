/**
 * STOTT PILATES 核心 Prompt 構建器 - 學術筆試專業版
 */

const CATEGORY_SCOPE = {
  IMP: `科目範圍：Essential & Intermediate Matwork（墊上運動）
動作包含：Roll Up、Single Leg Stretch、Spine Stretch Forward、Rolling Like a Ball、Teaser、Hundred、Shoulder Bridge 等。
重點：主動肌功能、五大原則應用、解剖學原理。`,

  IR: `科目範圍：Essential & Intermediate Reformer（彈簧床）
動作包含：彈簧設定（輕/中/重彈簧）、Carriage 操作、Footwork、Elephant、Long Stretch、Short Box Series 等。
重點：器械安全、彈簧阻力應用、離心控制。`,

  ICCB: `科目範圍：Cadillac、Chair、Barrels（三種器械）
動作包含：安全鍊操作、Push Through Bar、Chair 踏板設定、Barrels 脊椎弧度應用。
重點：器械特性、安全操作、脊椎適應。`,

  MIXED: `科目範圍：IMP + IR + ICCB 混合
從墊上、Reformer、Cadillac/Chair/Barrels 中隨機選一個出題，並在 category 欄位填入實際科目代碼（IMP/IR/ICCB）。`,

  PRINCIPLES: `科目範圍：五大基本原則（Essential Principles）
專攻：1. Breathing 2. Pelvic Placement 3. Rib Cage Placement 4. Scapular Movement & Stabilisation 5. Head & Cervical Placement。
重點：原則機制、指導語辨別、原則間交互影響。`,

  ANATOMY: `科目範圍：解剖學與肌肉功能（Anatomy Focus）
考題範疇：肌肉起止點、主動肌/拮抗肌辨識、收縮類型、運動平面、關節類型。
重點：純粹的解剖知識，不限定特定動作或器械。`,
};

export function buildPrompt(category, excludeIds) {
  const excludeClause = excludeIds?.length > 0 ? `\n排除重複 ID：${excludeIds.join(', ')}` : '';
  const scope = CATEGORY_SCOPE[category] || CATEGORY_SCOPE.MIXED;

  return {
    systemInstruction: `你是 STOTT PILATES 學科筆試備考小工具。任務：生成 1 題高品質的專業選擇題。

【核心規範】
1. 術語格式：凡提及動作或肌肉，必須顯示為「中文名稱 (English Name)」。
2. 嚴守科目範圍：僅出該科目內容，嚴禁混入其他類別。
3. 正確答案分布：A/B/C/D 均可為正確答案，確保均勻分布。`,

    userMessage: `${scope}${excludeClause}

請根據以上科目範圍輸出 JSON：
{"id":"","category":"${category}","scenario":"專業考題？","choices":[{"id":"A","text":""},{"id":"B","text":""},{"id":"C","text":""},{"id":"D","text":""}],"correctId":"A/B/C/D","rationale":{"explanation":"針對正確項的生物力學原因解析（2句話內）"}}`
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
