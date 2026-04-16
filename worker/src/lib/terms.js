/**
 * 官方術語對照表（來源：translate.csv）
 * 用於 Gemini 輸出後的後處理修正，不佔 prompt token。
 * key = 中文, value = 官方英文
 */
export const TERMS = {
  // 動作名稱
  '腳部練習': 'FOOT WORK',
  '腳掌分開雙踵併攏': 'TOES APART HEELS TOGETHER',
  '腳趾抓桿': 'WRAP TOES ON BAR',
  '雙踵抵在腳踏桿上': 'HEELS ON BAR',
  '腳尖掂起': 'HIGH HALF TOE',
  '落踵與提踵': 'LOWER & LIFT',
  '第二種姿勢': 'SECOND POSITION',
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
  '後划準備動作': 'BACK ROWING PREPS',
  '划船動作': 'PLOW',
  '側坐手臂準備動作': 'SIDE ARM PREPS SITTING',
  '側轉坐姿': 'SIDE TWIST SITTING',
  '前划準備動作': 'FRONT ROWING PREPS',
  '腹部按摩': 'STOMACH MASSAGE',
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
  // 肌肉名稱
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
  '多裂肌': 'Multifidus',
  '腰方肌': 'Quadratus Lumborum',
  '斜角肌': 'Scalenes',
  '胸鎖乳突肌': 'Sternocleidomastoid',
  '腹直肌': 'Rectus Abdominis',
  '腹外斜肌': 'External Oblique',
  '腹內斜肌': 'Internal Oblique',
  '腹橫肌': 'Transversus Abdominis',
  '錐狀肌': 'Pyramidalis',
  '橫膈膜': 'Diaphragm',
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
};

/**
 * 在字串中，將「中文 (任意英文)」替換為「中文 (官方英文)」
 * 若中文出現在對照表中，強制修正括號內的英文翻譯。
 */
export function applyTerms(text) {
  if (!text) return text;
  for (const [zh, en] of Object.entries(TERMS)) {
    // 匹配「中文（任意括號內容）」並替換英文部分
    text = text.replaceAll(
      new RegExp(`${zh}\\s*[（(][^）)]*[）)]`, 'g'),
      `${zh} (${en})`
    );
  }
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
