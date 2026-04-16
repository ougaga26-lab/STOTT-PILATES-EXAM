/**
 * STOTT PILATES 核心 Prompt 構建器 - 學術筆試專業版
 */

const CATEGORY_SCOPE = {
  IMP: `科目範圍：Essential & Intermediate Matwork（墊上運動）
只能出與墊上動作相關的考題，包含：Roll Up、Single Leg Stretch、Spine Stretch Forward、Rolling Like a Ball、Teaser、Hundred、Shoulder Bridge 等墊上動作的主動肌、五大原則應用、解剖學原理。
嚴禁出現任何器械（Reformer、Cadillac、Chair、Barrels）相關內容。`,

  IR: `科目範圍：Essential & Intermediate Reformer（彈簧床）
只能出與 Reformer 相關的考題，包含：彈簧設定（輕/中/重彈簧）、Carriage 操作、腳部練習 (Footwork)、Elephant、Long Stretch、Short Box Series 等 Reformer 動作。
嚴禁出現墊上動作或其他器械內容。`,

  ICCB: `科目範圍：Cadillac、Chair、Barrels（三種器械）
只能出與 Cadillac、Chair 或 Barrels 相關的考題，包含：安全鍊操作、Push Through Bar、Chair 踏板設定、Barrels 脊椎弧度應用。
嚴禁出現 Reformer 或墊上動作內容。`,

  MIXED: `科目範圍：IMP + IR + ICCB 混合
從墊上、Reformer、Cadillac/Chair/Barrels 三個科目中隨機選一個出題，並在 category 欄位填入實際科目代碼（IMP/IR/ICCB）。`,

  PRINCIPLES: `科目範圍：五大基本原則（Essential Principles）
只能出與五大原則相關的考題：
1. Breathing（呼吸）2. Pelvic Placement（骨盆擺放）3. Rib Cage Placement（肋骨位置）4. Scapular Movement & Stabilisation（肩胛動作與穩定）5. Head & Cervical Placement（頭部與頸椎位置）
測試考生對原則機制、指導語辨別、原則間交互影響的理解。`,

  ANATOMY: `科目範圍：解剖學與肌肉功能（Anatomy Focus）
只能出純解剖學考題：肌肉起止點、主動肌/拮抗肌/協同肌識別、離心收縮、運動平面分類、關節類型。
不限定特定動作，可跨器械，但題目核心必須是解剖學知識。`,
};

export function buildPrompt(category, excludeIds) {
  const excludeClause = excludeIds?.length > 0 ? `\n排除重複 ID：${excludeIds.join(', ')}` : '';
  const scope = CATEGORY_SCOPE[category] || CATEGORY_SCOPE.MIXED;

  return {
    systemInstruction: `你是一位 STOTT PILATES 學科筆試 (Theory Exam) 編輯。
任務：生成 1 題高品質的專業選擇題。

【核心規範】
1. 術語格式：凡提及動作或肌肉，必須顯示為「中文名稱 (English Name)」。
2. scenario 必填：scenario 欄位必須填入完整的題目問句（例如「在肩橋 (Shoulder Bridge) 動作中，哪塊肌肉是主要的髖伸展主動肌？」），禁止留空。
3. 嚴守科目範圍：題目必須完全符合以下指定科目，不得混入其他科目內容。
4. 輸出穩定：僅輸出純 JSON，正確答案隨機分佈在 B, C, D。`,

    userMessage: `${scope}${excludeClause}

請根據以上科目範圍，輸出結構完整的純 JSON，格式範例如下：
{
  "id": "string",
  "category": "${category}",
  "scenario": "在某動作中，下列哪塊肌肉負責某功能？",
  "choices": [
    { "id": "A", "text": "選項內容" },
    { "id": "B", "text": "選項內容" },
    { "id": "C", "text": "選項內容" },
    { "id": "D", "text": "選項內容" }
  ],
  "correctId": "B/C/D",
  "rationale": {
    "explanation": "針對正確項的生物力學原因解析（2句話內）"
  }
}`
  };
}

export function buildRationalePrompt(scenario, choices, correctId) {
  return {
    systemInstruction: `你是一位 STOTT PILATES 學術編輯。請針對筆試題目提供簡潔的生物力學解析，使用「中文 (English)」格式。`,
    userMessage: `題目內容：${scenario}\n正確選項：${correctId}\n
請輸出 JSON 格式：
{
  "explanation": "專業解析文字",
  "principles": ["原則一 (Principle 1)"],
  "anatomy": [{ "term": "肌肉 (Muscle)", "role": "功能描述" }]
}`
  };
}