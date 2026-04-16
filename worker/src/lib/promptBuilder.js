const CATEGORY_CONTEXT = {
  IMP: `科目：Essential & Intermediate Matwork (IMP)
重點：呼吸模式（側胸廓呼吸）、骨盆與脊椎中立位、重力對動作的影響、Powerhouse啟動順序、
      常見代償模式（如髖屈肌過度使用、頸部張力）。
典型動作：Roll Up, Single Leg Stretch, Spine Stretch Forward, Rolling Like a Ball, Teaser。`,

  IR: `科目：Essential & Intermediate Reformer (IR)
重點：彈簧設定（輕/中/重彈簧對阻力路徑的影響）、Carriage的安全操作、
      腳踏板與肩架的正確配置、卸力技術（Deloading Springs）、
      常見補償（如在 Footwork 時骨盆旋轉，在 Long Stretch 時腰椎塌陷）。
典型動作：Footwork, Hundred, Elephant, Long Box Series, Short Spine Massage。`,

  ICCB: `科目：Cadillac, Chair & Barrels (ICCB)
重點：Cadillac 安全鍊操作（Trapeze bar 限制）、Chair 的平衡挑戰（雙腳/單腳踏板）、
      Barrels 對脊椎不同弧度的適應（Kyphosis/Lordosis 矯正）、
      器械獨特性帶來的安全考量。
典型動作（Cadillac）：Roll Down, Push Through Bar, Tower。
典型動作（Chair）：Footwork, Pike, Tendon Stretch。
典型動作（Barrels）：Stretches, Side-Lying Series。`,

  MIXED: `科目：綜合（IMP + IR + ICCB 混合）
從三個科目中隨機選取一個作為本題主題，並在 category 欄位標明是哪個科目。`,
};

const FIVE_PRINCIPLES = `STOTT PILATES 五大基本原則：
1. Breathing（呼吸）：側胸廓呼吸，呼氣時啟動深層穩定肌群。
2. Pelvic Placement（骨盆擺放）：在中立位或印記位（Imprinted）之間的選擇與原因。
3. Rib Cage Placement（肋骨位置）：避免肋骨外擴，尤其在手臂過頭動作。
4. Scapular Movement & Stabilisation（肩胛動作與穩定）：下沉、內收的適當時機。
5. Head & Cervical Placement（頭部與頸椎位置）：頸椎自然曲線的維持，避免過度屈曲。`;

const JSON_SCHEMA = `{
  "id": "q-xxxxxx",
  "category": "IMP" | "IR" | "ICCB",
  "scenario": "2-4句話描述真實客戶情境，包含代償或動作問題",
  "choices": [
    { "id": "A", "text": "選項文字" },
    { "id": "B", "text": "選項文字" },
    { "id": "C", "text": "選項文字" },
    { "id": "D", "text": "選項文字" }
  ],
  "correctId": "A" | "B" | "C" | "D",
  "rationale": {
    "explanation": "詳細解釋為何此選項正確，並說明其他選項的問題",
    "principles": [
      { "id": 1, "name": "Breathing", "relevance": "與本題的關聯說明" }
    ],
    "anatomy": [
      { "term": "解剖學術語（英文）", "role": "在此動作中的功能" }
    ]
  }
}`;

export function buildPrompt(category, excludeIds) {
  const context = CATEGORY_CONTEXT[category] || CATEGORY_CONTEXT.MIXED;
  const excludeClause =
    excludeIds && excludeIds.length > 0
      ? `\n請勿重複以下 ID 的題目：${excludeIds.join(', ')}`
      : '';

  return {
    systemInstruction: `你是一位資深 STOTT PILATES 認證導師，負責為準備認證考試的學員出題。
你的題目必須：
1. 以真實的客戶代償情境為基礎
2. 測試考生對五大基本原則的深入理解
3. 所有選項都應具有合理性，但只有一個最正確
4. 解析必須引用相關的解剖學概念和 STOTT 原則

${FIVE_PRINCIPLES}

輸出格式：僅輸出符合以下 JSON schema 的純 JSON，不要加任何 markdown 代碼塊或其他文字：
${JSON_SCHEMA}`,

    userMessage: `${context}${excludeClause}

請生成一道新的單選題。直接輸出 JSON，不要加任何說明文字。`,
  };
}
