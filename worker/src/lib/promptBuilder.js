const CATEGORY_CONTEXT = {
  IMP: `科目：Essential & Intermediate Matwork (IMP)
重點：呼吸模式（側胸廓呼吸）、骨盆與脊椎中立位、重力對動作的影響、Powerhouse啟動順序、
      常見代償模式（如髖屈肌過度使用、頸部張力）。
典型動作：Roll Up, Single Leg Stretch, Spine Stretch Forward, Rolling Like a Ball, Teaser。`,

  IR: `科目：Essential & Intermediate Reformer (IR)
重點：彈簧設定（輕/中/重彈簧對阻力路徑的影響）、Carriage的安全操作、
      腳踏板與肩架的正確配置、卸力技術（Deloading Springs）、
      常見補償（如在腳部練習時骨盆旋轉，在直線伸展時腰椎塌陷）。
典型動作：腳部練習, 百次拍擊, 大象姿, Long Box Series, 脊椎捲曲。`,

  ICCB: `科目：Cadillac, Chair & Barrels (ICCB)
重點：Cadillac 安全鍊操作（Trapeze bar 限制）、Chair 的平衡挑戰（雙腳/單腳踏板）、
      Barrels 對脊椎不同弧度的適應（Kyphosis/Lordosis 矯正）、
      器械獨特性帶來的安全考量。
典型動作（Cadillac）：Roll Down, Push Through Bar, Tower。
典型動作（Chair）：腳部練習, Pike, Tendon Stretch。
典型動作（Barrels）：Stretches, Side-Lying Series。`,

  MIXED: `科目：綜合（IMP + IR + ICCB 混合）
從三個科目中隨機選取一個作為本題主題，並在 category 欄位標明是哪個科目（IMP/IR/ICCB）。`,

  PRINCIPLES: `科目：五大基本原則深度專區 (Essential Principles)
專攻「小綠本」理論考題，重點測試以下五大原則的深度應用：
1. Breathing（呼吸）：側胸廓呼吸的機制、呼氣啟動 Powerhouse 的時機、呼吸對肋骨位置的影響。
2. Pelvic Placement（骨盆擺放）：中立位 vs 印記位的適用情境、前傾/後傾的識別。
3. Rib Cage Placement（肋骨位置）：Rib Flare 的成因與矯正、手臂過頭時的肋骨控制。
4. Scapular Movement & Stabilisation（肩胛動作與穩定）：六個方向動作、Serratus Anterior 的角色、聳肩代償。
5. Head & Cervical Placement（頭部與頸椎位置）：頸椎自然曲線、捲腹時的頸部支撐原則。
題目須包含「指導語 (Cues)」的選擇，例如：「以下哪一個指導語最能有效提示學員進行側胸廓呼吸？」
考點：原則間的交互影響、常見錯誤指導語的識別、不同族群的應用差異。`,

  ANATOMY: `科目：解剖學與肌肉功能 (Anatomy Focus)
專攻肌肉解剖學的考題，測試以下知識：
1. 肌肉的起止點（Origin & Insertion）
2. 關節的分類與動作方向（關節面、運動平面）
3. 動作中的主動肌 (Agonist)、拮抗肌 (Antagonist) 與協同肌 (Synergist)
4. 離心控制 (Eccentric Control) 在 Pilates 動作中的應用
5. 常見代償模式的解剖學解釋
考點類型：「在 Elephant 動作的推出階段，以下哪塊肌肉進行離心收縮？」
         「腰方肌過度主導時，會出現哪種代償模式？」`,
};

const OFFICIAL_MOVEMENTS = `【官方動作中文譯名 — 必須嚴格遵守】
Footwork=腳部練習 | Second Position=第二種姿勢 | Single Leg=單腿練習 | Hundred=百次拍擊 | Bend & Stretch=屈伸練習 | Lift & Lower=抬腿與放腿 | Adductor Stretch=伸展內收肌 | Short Spine Prep=脊椎捲曲準備動作 | Short Spine=脊椎捲曲 | Long Spine=脊椎伸展 | Semicircle=半弧 | Midback Series=中背部系列動作 | Back Rowing Preps=後划準備動作 | Side Arm Preps Sitting=側坐手臂準備動作 | Side Twist Sitting=側轉坐姿 | Front Rowing Preps=前划準備動作 | Stomach Massage=腹部按摩 | Arms Pulling Straps (Long Box)=雙臂拉動拉環（盒子豎放）| Round Back (Short Box)=弓背（盒子橫放）| Straight Back (Short Box)=直背（盒子橫放）| Twist (Short Box)=扭轉（盒子橫放）| Tree (Short Box)=樹姿（盒子橫放）| Elephant=大象姿 | Mermaid=美人魚姿 | Leg Circles=雙腿畫弧 | Knee Stretches=膝部伸展 | Running=跑步運動 | Hip Lift=髖部上抬 | Hip Rolls=髖部起伏 | Single Thigh Stretch=單側大腿伸展 | Side Splits=側劈叉 | Front Splits=前劈叉 | Back Splits=後劈叉 | Coordination=協調性 | Backstroke Prep=仰泳練習準備動作 | Long Stretch=直線伸展 | Down Stretch=向下伸展 | Up Stretch=向上伸展 | Chest Expansion=胸部擴張 | Star Prep=星姿準備動作`;

const OFFICIAL_ANATOMY = `【官方解剖術語對照 — 必須嚴格遵守】
Frontal Plane=額狀面 | Sagittal Plane=矢狀面 | Transverse Plane=水平面 | Synovial Joint=滑液關節 | Fibrous Joint=纖維關節 | Cartilaginous Joint=軟骨關節 | Ball-and-socket Joint=球窩關節 | Hinge Joint=屈戍關節 | Pivot Joint=車軸關節 | Trapezius=斜方肌 | Levator Scapulae=提肩胛肌 | Rhomboids=菱形肌 | Serratus Anterior=前鋸肌 | Pectoralis Minor=胸小肌 | Deltoid=三角肌 | Latissimus Dorsi=闊背肌 | Teres Major=大圓肌 | Teres Minor=小圓肌 | Rotator Cuff=旋轉肌袖 | Supraspinatus=棘上肌 | Infraspinatus=棘下肌 | Subscapularis=肩胛下肌 | Biceps Brachii=肱二頭肌 | Triceps Brachii=肱三頭肌 | Multifidus=多裂肌 | Quadratus Lumborum=腰方肌 | Scalenes=斜角肌 | Sternocleidomastoid=胸鎖乳突肌 | Rectus Abdominis=腹直肌 | External Oblique=腹外斜肌 | Internal Oblique=腹內斜肌 | Transversus Abdominis=腹橫肌 | Diaphragm=橫膈膜 | Psoas Major=腰大肌 | Iliacus=髂肌 | Gluteus Maximus=臀大肌 | Gluteus Medius=臀中肌 | Gluteus Minimus=臀小肌 | Piriformis=梨狀肌 | Biceps Femoris=股二頭肌 | Semitendinosus=半腱肌 | Semimembranosus=半膜肌 | Rectus Femoris=股直肌 | Vastus Medialis=股內側肌 | Vastus Intermedius=股中間肌 | Vastus Lateralis=股外側肌 | Tibialis Anterior=脛前肌 | Tibialis Posterior=脛後肌`;

const HIGH_FREQ_EXAMINER = `【考官視角高頻考點 — 主動納入這些邏輯出題】
1. 安全性 (Safety)：Cadillac 安全鍊的使用時機與限制、Chair 彈簧掛鉤等級對阻力的影響、Reformer Stopper 對應不同身高的設定。
2. 五大原則交互應用：呼氣如何同時影響肋骨位置與腹橫肌啟動、骨盆中立vs印記的切換邏輯及適用族群。
3. 代償觀察：Rib Flare（肋骨外翻）、Scapular Elevation（聳肩）、髂腰肌過度主導、頸部過度屈曲的識別與矯正提示。
4. 離心控制 (Eccentric Control)：強調彈簧或踏板回彈階段的控制肌群，與向心收縮做區分。
5. 指導語 (Cues) 精準性：測試考生是否能辨別有效vs無效的指導語。`;

const FIVE_PRINCIPLES = `STOTT PILATES 五大基本原則：
1. Breathing（呼吸）：側胸廓呼吸，呼氣時啟動深層穩定肌群。
2. Pelvic Placement（骨盆擺放）：在中立位或印記位（Imprinted）之間的選擇與原因。
3. Rib Cage Placement（肋骨位置）：避免肋骨外擴，尤其在手臂過頭動作。
4. Scapular Movement & Stabilisation（肩胛動作與穩定）：下沉、內收的適當時機。
5. Head & Cervical Placement（頭部與頸椎位置）：頸椎自然曲線的維持，避免過度屈曲。`;

const JSON_SCHEMA = `{
  "id": "any string",
  "category": "IMP" or "IR" or "ICCB",
  "scenario": "2-4句話描述真實客戶情境",
  "choices": [
    { "id": "A", "text": "選項文字" },
    { "id": "B", "text": "選項文字" },
    { "id": "C", "text": "選項文字" },
    { "id": "D", "text": "選項文字" }
  ],
  "correctId": "A" or "B" or "C" or "D",
  "rationale": {
    "explanation": "詳細解釋為何此選項正確",
    "principles": [
      { "id": 1, "name": "Breathing", "relevance": "關聯說明" }
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
    systemInstruction: `你是一位資深 STOTT PILATES 認證導師與考官，負責為準備認證考試的學員出題。

你的題目必須：
1. 以真實的客戶情境或代償模式為基礎
2. 深度測試考生對五大基本原則與解剖學的理解
3. 所有選項都應具有合理性，但只有一個最正確
4. 解析必須引用相關的解剖學概念和 STOTT 原則
5. 凡提及動作或解剖術語，必須嚴格使用以下官方譯名

${OFFICIAL_MOVEMENTS}

${OFFICIAL_ANATOMY}

${HIGH_FREQ_EXAMINER}

${FIVE_PRINCIPLES}

CRITICAL INSTRUCTIONS:
- Return ONLY a valid JSON object. Absolutely NO markdown formatting, NO code blocks, NO backticks, NO extra text before or after the JSON.
- Start your response directly with { and end with }

輸出格式（純 JSON，無任何其他內容）：
${JSON_SCHEMA}`,

    userMessage: `${context}${excludeClause}

請生成一道新的單選題。直接輸出 JSON，第一個字元必須是 {，最後一個字元必須是 }。`,
  };
}
