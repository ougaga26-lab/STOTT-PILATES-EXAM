/**
 * STOTT PILATES 核心 Prompt 構建器 - 學術筆試專業版
 */

const CATEGORY_SCOPE = {
IMP: `科目範圍：Essential & Intermediate Matwork (墊上運動)
動作包含：Roll Up、Single Leg Stretch、Spine Stretch Forward、Rolling Like a Ball、Teaser、Hundred、Shoulder Bridge 等。
重點：動作目標、主動肌功能、五大原則應用、解剖學原理、重力對軀幹穩定性的影響。`,

  IR: `科目範圍：Essential & Intermediate Reformer (核心床)
動作包含：Footwork、Elephant、Long Stretch、Short Box Series、Short Spine、抬腿與放腿 (Lift & Lower) 等。
重點：在核心床上執行動作時的主動肌 (Agonist) 與協同肌、動力鏈 (Kinetic Chain) 性質、五大原則應用、代償模式修正、彈簧阻力方向對身體的輔助或挑戰效果。`,

  ICCB: `科目範圍：Cadillac (凱迪拉克)、Chair (穩定椅)、Barrels (弧脊桶) 三種器械
動作包含：Push-thru Bar (推桿) 動作、安全鍊應用、Chair 踏板動作、Ladder Barrel / Arc Barrel 脊椎動作。
重點：在各器械執行動作時的主動肌、動力鏈性質、器械弧度或阻力對脊椎/關節的支撐與挑戰效果、五大原則應用、代償修正。`,

  MIXED: `科目範圍：IMP + IR + ICCB 混合
動作包含：隨機抽取各器械標準動作。
重點：確保題目涵蓋動作目標、五大原則應用與解剖學原理，並在 category 欄位填入實際科目代碼（IMP/IR/ICCB）。`,

  PRINCIPLES: `科目範圍：五大基本原則 (Essential Principles)
專攻：1. Breathing 2. Pelvic Placement 3. Rib Cage Placement 4. Scapular Movement & Stabilisation 5. Head & Cervical Placement。
重點：各原則的解剖機制、中立位 (Neutral) vs 印記位 (Imprint) 的辨別、指導語辨別、原則間交互影響。`,

  ANATOMY: `科目範圍：解剖學與肌肉功能 (Anatomy Focus)
考題範疇：肌肉起止點、主動肌/拮抗肌/協同肌辨識、力偶關係 (Force Couples)、收縮類型（向心/離心/等長）、運動平面 (Planes)、關節類型。
重點：純粹的解剖學知識，不限定特定動作或器械。`,
};

export function buildPrompt(category, excludeIds) {
  const excludeClause = excludeIds?.length > 0 ? `\n排除重複 ID：${excludeIds.join(', ')}` : '';
  const scope = CATEGORY_SCOPE[category] || CATEGORY_SCOPE.MIXED;

  return {
    systemInstruction: `你是 STOTT PILATES 學科筆試備考小工具。任務：生成 1 題高品質的專業選擇題。

【核心規範】
1. 術語格式：動作名稱與肌肉名稱用「中文 (English)」標示；其餘句子一律純繁體中文，不翻譯。
2. 嚴守科目範圍：僅出該科目內容，嚴禁混入其他類別。
3. 題目風格：直接考驗專業知識點。可使用「在 [器械] 執行 [動作] 時...」或「若學員出現 [代償]，導師應如何修正？」等具體情境句式。嚴禁使用「這是一道關於...」、「以下關於...的敘述」等廢話開頭。
4. 正確答案分布：A/B/C/D 均可為正確答案，確保均勻分布。`,

    userMessage: `${scope}${excludeClause}

請根據以上科目範圍輸出 JSON：
{"id":"","category":"${category}","scenario":"<考題情境或問句>","choices":[{"id":"A","text":"<選項A>"},{"id":"B","text":"<選項B>"},{"id":"C","text":"<選項C>"},{"id":"D","text":"<選項D>"}],"correctId":"<A|B|C|D>","rationale":{"explanation":"<解析2句內>"}}`
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
