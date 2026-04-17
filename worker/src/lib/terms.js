/**
 * 官方術語對照表（來源：translate.csv）
 * 用於 Gemini 輸出後的後處理修正，不佔 prompt token。
 * key = 中文, value = 官方英文
 */
export const TERMS = {
  // 動作名稱 — Footwork & Reformer
  '腳部練習': 'FOOT WORK',
  '腳掌分開雙踵併攏': 'TOES APART HEELS TOGETHER',
  '腳趾抓桿': 'WRAP TOES ON BAR',
  '雙踵抵在腳踏桿上': 'HEELS ON BAR',
  '腳尖掂起': 'HIGH HALF TOE',
  '落踵與提踵': 'LOWER & LIFT',
  '第二種姿勢': 'SECOND POSITION',
  '平行': 'PARALLEL',
  '外旋': 'External Rotation',
  '內旋': 'Internal Rotation',
  '內收': 'Adduction',
  '外展': 'Abduction',
  '單腿練習': 'SINGLE LEG',
  '單腿彎曲': 'ONE LEG BENT',
  '腳踏車式動作': 'BICYCLE',
  '單踵練習': 'SINGLE HEEL',
  '百次拍擊': 'HUNDRED',
  '屈伸練習': 'BEND & STRETCH',
  '抬腿與放腿': 'LIFT & LOWER',
  '伸展內收肌': 'ADDUCTOR STRETCH',
  '脊椎捲曲準備動作': 'SHORT SPINE PREP',
  '脊椎捲曲': 'SHORT SPINE',
  '中背部系列動作': 'MIDBACK SERIES',
  '下壓肱三頭肌': 'TRICEPS PRESS',
  '雙臂伸直下壓': 'STRAIGHT DOWN',
  '四十五度': 'FORTY-FIVE DEGREES',
  '側展': 'SIDE',
  '畫圈': 'CIRCLES',
  '後划準備動作': 'BACK ROWING PREPS',
  '划船動作': 'PLOW',
  '分開雙肘': 'OPEN ELBOWS',
  '飛翔動作': 'AIRPLANE',
  '二頭肌捲曲': 'BICEPS CURLS',
  '向後捲動-二頭肌捲曲': 'ROLL-DOWN WITH BICEPS CURLS',
  '側旋後捲': 'ROLL-DOWN WITH OBLIQUES',
  '向後捲動': 'ROLL-DOWN',
  '側坐手臂準備動作': 'SIDE ARM PREPS SITTING',
  '側轉坐姿': 'SIDE TWIST SITTING',
  '前划準備動作': 'FRONT ROWING PREPS',
  '向前伸直': 'STRAIGHT FORWARD',
  '雙手上托': 'OFFERING',
  '腹部按摩': 'STOMACH MASSAGE',
  '弓背(盒子橫放)': 'ROUND BACK SHORT BOX',
  '直背(盒子橫放)': 'STRAIGHT BACK SHORT BOX',
  '扭轉(盒子橫放)': 'TWIST SHORT BOX',
  '樹姿(盒子橫放)': 'TREE SHORT BOX',
  '雙臂拉動拉環(盒子豎放)': 'ARMS PULLING STRAPS LONG BOX',
  '弓背': 'ROUND BACK',
  '直背': 'STRAIGHT BACK',
  '大象姿': 'ELEPHANT',
  '美人魚姿': 'MERMAID',
  '雙腿畫弧': 'LEG CIRCLES',
  '膝部伸展': 'KNEE STRETCHES',
  '跑步運動': 'RUNNING',
  '髖部上抬': 'HIP LIFT',
  '髖部起伏': 'HIP ROLLS',
  '單側大腿伸展': 'SINGLE THIGH STRETCH',
  '側劈叉': 'SIDE SPLITS',

  // 解剖平面與關節
  '額狀面': 'Frontal Plane',
  '冠狀面': 'Coronal Plane',
  '矢狀面': 'Sagittal Plane',
  '水平面': 'Transverse Plane',
  '橫切面': 'Horizontal Plane',
  '近端': 'Proximal',
  '遠端': 'Distal',
  '滑液關節': 'Synovial Joint',
  '纖維關節': 'Fibrous Joint',
  '軟骨關節': 'Cartilaginous Joint',
  '球窩關節': 'Ball-and-socket Joint',
  '屈戍關節': 'Hinge Joint',
  '車軸關節': 'Pivot Joint',
  '平面關節': 'Gliding (Plane) Joint',

  // 肌肉名稱 — 肩胛/上肢
  '斜方肌': 'Trapezius',
  '提肩胛肌': 'Levator Scapulae',
  '大菱形肌': 'Rhomboid Major',
  '小菱形肌': 'Rhomboid Minor',
  '鎖骨下肌': 'Subclavius',
  '前鋸肌': 'Serratus Anterior',
  '胸小肌': 'Pectoralis Minor',
  '三角肌': 'Deltoid',
  '胸大肌': 'Pectoralis Major',
  '喙肱肌': 'Coracobrachialis',
  '闊背肌': 'Latissimus Dorsi',
  '大圓肌': 'Teres Major',
  '小圓肌': 'Teres Minor',
  '棘上肌': 'Supraspinatus',
  '棘下肌': 'Infraspinatus',
  '肩胛下肌': 'Subscapularis',
  '肱二頭肌': 'Biceps Brachii',
  '肱三頭肌': 'Triceps Brachii',
  '肘肌': 'Anconeus',
  '肱橈肌': 'Brachioradialis',
  '肱肌': 'Brachialis',
  '旋後肌': 'Supinator',
  '旋前圓肌': 'Pronator Teres',

  // 肌肉名稱 — 頭頸
  '頸長肌': 'Longus Colli',
  '頭長肌': 'Longus Capitis',
  '頭前直肌': 'Rectus Capitis Anterior',
  '頭外直肌': 'Rectus Capitis Lateralis',
  '頭後大直肌': 'Rectus Capitis Posterior Major',
  '頭後小直肌': 'Rectus Capitis Posterior Minor',
  '頭上斜肌': 'Obliquus Capitis Superior',
  '頭下斜肌': 'Obliquus Capitis Inferior',

  // 肌肉名稱 — 脊椎深層
  '橫突間肌': 'Intertransversarii',
  '迴旋長肌': 'Rotatores Longus',
  '迴旋短肌': 'Rotatores Brevis',
  '多裂肌': 'Multifidus',
  '半棘肌 胸部': 'Semispinalis Thoracis',
  '半棘肌 頸部': 'Semispinalis Cervicis',
  '半棘肌 頭部': 'Semispinalis Capitis',
  '髂肋肌 腰部': 'Iliocostalis Lumborum',
  '髂肋肌 胸部': 'Iliocostalis Thoracis',
  '髂肋肌 頸部': 'Iliocostalis Cervicis',
  '頸最長肌': 'Longissimus Cervicis',
  '頭最長肌': 'Longissimus Capitis',
  '棘肌 胸部': 'Spinalis Thoracis',
  '棘肌 頸部': 'Spinalis Cervicis',
  '頭夾肌': 'Splenius Capitis',
  '頸夾肌': 'Splenius Cervicis',
  '腰方肌': 'Quadratus Lumborum',
  '斜角肌': 'Scalenes',
  '胸鎖乳突肌': 'Sternocleidomastoid',

  // 肌肉名稱 — 軀幹/呼吸
  '腹直肌': 'Rectus Abdominis',
  '腹外斜肌': 'External Oblique',
  '腹內斜肌': 'Internal Oblique',
  '腹橫肌': 'Transversus Abdominis',
  '錐狀肌': 'Pyramidalis',
  '橫膈膜': 'Diaphragm',
  '肋外間肌': 'External Intercostals',
  '肋內間肌': 'Internal Intercostals',
  '肋提肌 長肌': 'Levatores Costarum Longis',
  '肋提肌 短肌': 'Levatores Costarum Breves',
  '後上鋸肌': 'Serratus Posterior Superior',

  // 肌肉名稱 — 髖/大腿
  '腰大肌': 'Psoas Major',
  '腰小肌': 'Psoas Minor',
  '髂肌': 'Iliacus',
  '臀大肌': 'Gluteus Maximus',
  '臀中肌': 'Gluteus Medius',
  '臀小肌': 'Gluteus Minimus',
  '闊筋膜張肌': 'Tensor Fasciae Latae',
  '恥骨肌': 'Pectineus',
  '內收大肌': 'Adductor Magnus',
  '內收短肌': 'Adductor Brevis',
  '內收長肌': 'Adductor Longus',
  '股薄肌': 'Gracilis',
  '閉孔外肌': 'Obturator Externus',
  '閉孔內肌': 'Obturator Internus',
  '上孖肌': 'Gemellus Superior',
  '下孖肌': 'Gemellus Inferior',
  '股方肌': 'Quadratus Femoris',
  '梨狀肌': 'Piriformis',
  '股直肌': 'Rectus Femoris',
  '股內側肌': 'Vastus Medialis',
  '股中間肌': 'Vastus Intermedius',
  '股外側肌': 'Vastus Lateralis',
  '股二頭肌': 'Biceps Femoris',
  '縫匠肌': 'Sartorius',
  '半腱肌': 'Semitendinosus',
  '半膜肌': 'Semimembranosus',

  // 肌肉名稱 — 小腿/足
  '膕肌': 'Popliteus',
  '比目魚肌': 'Soleus',
  '腓腸肌': 'Gastrocnemius',
  '蹠肌': 'Plantaris',
  '脛前肌': 'Tibialis Anterior',
  '脛後肌': 'Tibialis Posterior',
  '伸拇長肌': 'Extensor Hallucis Longus',
  '伸趾長肌': 'Extensor Digitorum Longus',
  '第三腓骨肌': 'Peroneus Tertius',
  '腓骨長肌': 'Peroneus Longus',
  '腓骨短肌': 'Peroneus Brevis',
  '屈拇長肌': 'Flexor Hallucis Longus',
  '屈趾長肌': 'Flexor Digitorum Longus',

  // 器械名稱（供 TERMS 修正「中文 (英文)」格式用）
  '床架': 'Carriage',
  '核心床': 'Reformer',
  '凱迪拉克': 'Cadillac',
  '平衡椅': 'Stability Chair',
  '梯桶': 'Ladder Barrel',
  '弧型桶': 'Arc Barrel',
  '脊柱矯正器': 'Spine Corrector',
  '推桿': 'Push-thru Bar',
  '墊上練習': 'Matwork',
  '斯多特皮拉提斯': 'STOTT PILATES',
};

/**
 * 器械名稱對照：英文 → 純中文（不保留英文括號）
 * 長名稱先替換，避免 "Ladder Barrel" 被 "Barrel" 先截斷
 */
const EQUIPMENT_ZH = [
  ['Stability Chair', '平衡椅'],
  ['Ladder Barrel', '梯桶'],
  ['Arc Barrel', '弧型桶'],
  ['Spine Corrector', '脊柱矯正器'],
  ['Cadillac', '凱迪拉克'],
  ['Reformer', '核心床'],
  ['Matwork', '墊上練習'],
  ['Chair', '平衡椅'],
];

/**
 * 在字串中，將「中文 (任意英文)」替換為「中文 (官方英文)」
 * 並將器械英文名稱（含或不含括號）統一替換為純中文。
 * 同時清除 Gemini 產生的 markdown 反引號。
 */
export function applyTerms(text) {
  if (!text) return text;

  // 清除反引號
  text = text.replaceAll('`', '');

  // 移除 "STOTT PILATES" 字樣（含前後書名號/引號及後接的「的」），已是預設語境，無需重複顯示
  text = text.replace(/[「『]?\s*STOTT PILATES\s*[」』]?\s*的?\s*/g, '');

  // 清除空引號 「」「 」
  text = text.replace(/「\s*」/g, '');

  // 修正術語格式：中文 (任意英文) → 中文 (官方英文)
  for (const [zh, en] of Object.entries(TERMS)) {
    const escaped = zh.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    text = text.replaceAll(
      new RegExp(`${escaped}\\s*[（(][^）)]*[）)]`, 'g'),
      `${zh} (${en})`
    );
  }

  // 器械名稱：English (中文) 或 中文 (English) 或單獨出現 → 純中文
  for (const [en, zh] of EQUIPMENT_ZH) {
    const escaped = en.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    // English (中文) → 中文
    text = text.replaceAll(
      new RegExp(`${escaped}\\s*[（(][^）)]*[）)]`, 'g'), zh
    );
    // 中文 (English) → 中文
    text = text.replaceAll(
      new RegExp(`[^(（]*[（(]\\s*${escaped}\\s*[）)]`, 'g'),
      (match) => match.replace(/\s*[（(][^）)]*[）)]/, '')
    );
    // 單獨出現的英文 → 中文（詞界限保護）
    text = text.replaceAll(
      new RegExp(`(?<![a-zA-Z])${escaped}(?![a-zA-Z])`, 'g'), zh
    );
  }

  // 翻轉 "English (中文)" → "中文 (English)"（器械名已處理完，這裡處理動作/其他術語）
  text = text.replace(/([A-Z][a-zA-Z\s\-&]+?)\s*[（(]([\u4e00-\u9fff／\-]+)[）)]/g, '$2 ($1)');

  // 清理中文字符間多餘空格（如「在 墊上運動 的」→「在墊上運動的」）
  text = text.replace(/([\u4e00-\u9fff，。？！、：；「」【】]) +([\u4e00-\u9fff，。？！、：；「」【】])/g, '$1$2');
  // 重複執行一次以處理連續多個空格
  text = text.replace(/([\u4e00-\u9fff，。？！、：；「」【】]) +([\u4e00-\u9fff，。？！、：；「」【】])/g, '$1$2');

  return text;
}

/**
 * 遞迴修正 question 物件內所有字串欄位的術語
 */
export function normalizeTerms(obj) {
  if (typeof obj === 'string') return applyTerms(obj);
  if (Array.isArray(obj)) return obj.map(normalizeTerms);
  if (obj && typeof obj === 'object') {
    return Object.fromEntries(
      Object.entries(obj).map(([k, v]) => [k, normalizeTerms(v)])
    );
  }
  return obj;
}
