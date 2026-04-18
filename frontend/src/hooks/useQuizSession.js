import { useEffect } from 'react';
import { useQuiz, useQuizDispatch } from '../context/QuizContext.jsx';
import { PHASES } from '../reducers/quizReducer.js';
import { generateQuestion, ApiError } from '../services/api.js';

// ── 20題主題輪轉序列 ────────────────────────────────────────────
// 比重：姿勢分析6 / 五大原則5 / 目標肌肉5 / 動作變體2 / 客戶評估2
// 第10題固定加「（反向題型）」標記，讓 AI 使用「下列何者不符合…」格式

const IMP_TOPICS = [
  '姿勢分析與肌肉失衡',             // 1
  '五大原則應用',                    // 2
  '目標肌肉與功能解剖',             // 3
  '姿勢分析與肌肉失衡',             // 4
  '五大原則應用',                    // 5
  '目標肌肉與功能解剖',             // 6
  '姿勢分析與肌肉失衡',             // 7
  '五大原則應用',                    // 8
  '目標肌肉與功能解剖',             // 9
  '姿勢分析與肌肉失衡（反向題型）', // 10 ← 反向
  '動作變體與禁忌症',               // 11
  '五大原則應用',                    // 12
  '目標肌肉與功能解剖',             // 13
  '姿勢分析與肌肉失衡',             // 14
  '客戶評估與動作選擇',             // 15
  '五大原則應用',                    // 16
  '目標肌肉與功能解剖',             // 17
  '姿勢分析與肌肉失衡',             // 18
  '動作變體與禁忌症',               // 19
  '客戶評估與動作選擇',             // 20
];

// IR 與 IMP 相同主題分布，情境由 category 名稱區分
const IR_TOPICS = [...IMP_TOPICS];

// MIXED 純理論，不指定器械
const MIXED_TOPICS = [...IMP_TOPICS];

// ICCB：凱迪拉克7 / 平衡椅7 / 桶系器械6，同時帶入理論主題
// 器械按 C, CH, B, C, CH, B... 交錯；主題比重同上
const ICCB_TOPICS = [
  '凱迪拉克 — 姿勢分析與肌肉失衡',             // 1  C
  '平衡椅 — 五大原則應用',                       // 2  CH
  '桶系器械 — 目標肌肉與功能解剖',              // 3  B
  '凱迪拉克 — 姿勢分析與肌肉失衡',             // 4  C
  '平衡椅 — 目標肌肉與功能解剖',               // 5  CH
  '桶系器械 — 姿勢分析與肌肉失衡',             // 6  B
  '凱迪拉克 — 五大原則應用',                    // 7  C
  '平衡椅 — 姿勢分析與肌肉失衡',               // 8  CH
  '桶系器械 — 五大原則應用',                    // 9  B
  '凱迪拉克 — 目標肌肉與功能解剖（反向題型）', // 10 C ← 反向
  '平衡椅 — 動作變體與禁忌症',                  // 11 CH
  '桶系器械 — 目標肌肉與功能解剖',              // 12 B
  '凱迪拉克 — 姿勢分析與肌肉失衡',             // 13 C
  '平衡椅 — 五大原則應用',                       // 14 CH
  '桶系器械 — 姿勢分析與肌肉失衡',             // 15 B
  '凱迪拉克 — 五大原則應用',                    // 16 C
  '平衡椅 — 目標肌肉與功能解剖',               // 17 CH
  '桶系器械 — 動作變體與禁忌症',               // 18 B
  '凱迪拉克 — 客戶評估與動作選擇',             // 19 C
  '平衡椅 — 客戶評估與動作選擇',               // 20 CH
];
// C=7(1,4,7,10,13,16,19) CH=7(2,5,8,11,14,17,20) B=6(3,6,9,12,15,18)

// PRINCIPLES：5原則 × 4角度 = 20題
const PRINCIPLES_TOPICS = [
  'Breathing — 定義與目的',
  'Pelvic Placement — 定義與目的',
  'Rib Cage Placement — 定義與目的',
  'Scapular Movement & Stabilisation — 定義與目的',
  'Head & Cervical Placement — 定義與目的',
  'Breathing — 解剖對齊點',
  'Pelvic Placement — 解剖對齊點',
  'Rib Cage Placement — 解剖對齊點',
  'Scapular Movement & Stabilisation — 解剖對齊點',
  'Head & Cervical Placement — 解剖對齊點（反向題型）', // 10 ← 反向
  'Breathing — 常見代償判定',
  'Pelvic Placement — 常見代償判定',
  'Rib Cage Placement — 常見代償判定',
  'Scapular Movement & Stabilisation — 常見代償判定',
  'Head & Cervical Placement — 常見代償判定',
  'Breathing — 動作實例應用',
  'Pelvic Placement — 動作實例應用',
  'Rib Cage Placement — 動作實例應用',
  'Scapular Movement & Stabilisation — 動作實例應用',
  'Head & Cervical Placement — 動作實例應用',
];

// ANATOMY：起止點4 / 主動拮抗協同穩定6 / 收縮類型4 / 運動平面關節4 / 姿勢力學2
const ANATOMY_TOPICS = [
  '肌肉起止點與位置',               // 1
  '主動肌與拮抗肌',                 // 2
  '收縮類型（離心／向心／等長）',   // 3
  '運動平面與關節類型',             // 4
  '協同肌與穩定肌',                 // 5
  '肌肉起止點與位置',               // 6
  '主動肌與拮抗肌',                 // 7
  '收縮類型（離心／向心／等長）',   // 8
  '運動平面與關節類型',             // 9
  '協同肌與穩定肌（反向題型）',     // 10 ← 反向
  '主動肌與拮抗肌',                 // 11
  '肌肉起止點與位置',               // 12
  '收縮類型（離心／向心／等長）',   // 13
  '協同肌與穩定肌',                 // 14
  '運動平面與關節類型',             // 15
  '姿勢力學（鉛垂線與重力）',       // 16
  '肌肉起止點與位置',               // 17
  '收縮類型（離心／向心／等長）',   // 18
  '運動平面與關節類型',             // 19
  '姿勢力學（鉛垂線與重力）',       // 20
];

const TOPIC_SEQUENCES = {
  IMP:        IMP_TOPICS,
  IR:         IR_TOPICS,
  ICCB:       ICCB_TOPICS,
  MIXED:      MIXED_TOPICS,
  PRINCIPLES: PRINCIPLES_TOPICS,
  ANATOMY:    ANATOMY_TOPICS,
};

function getTopic(category, index) {
  const seq = TOPIC_SEQUENCES[category] || IMP_TOPICS;
  return seq[index % seq.length] || '';
}

/**
 * 從題目的 scenario 提取 2~6 字的情境關鍵詞
 * 例：「一位客戶呈現骨盆前傾體態」→「骨盆前傾」
 */
function extractContext(question) {
  if (!question?.scenario) return null;
  const s = question.scenario;
  // 優先抓括號前的中文體態名稱或動作名稱（4~10字）
  const match =
    s.match(/呈現([^，。？\s]{2,8})(?:體態|姿勢|的體態|狀態)/) ||
    s.match(/執行[「『]?([^」』，。？\s]{2,10})[」』]?/) ||
    s.match(/進行[「『]?([^」』，。？\s]{2,10})[」』]?/) ||
    s.match(/([^，。？！\s]{2,8})(?:縮短|被拉長|緊繃|無力)/);
  if (match) return match[1];
  // fallback：取 scenario 前 8 字
  return s.replace(/[，。？！\s]/g, '').slice(0, 8);
}

// Module-level cache: cacheKey → question object
const questionCache = new Map();

function cacheKey(category, excludeIds, topic, usedContexts) {
  return `${category}|${excludeIds.join(',')}|${topic}|${usedContexts.join(',')}`;
}

function prefetchNext(category, excludeIds, topic, usedContexts) {
  const key = cacheKey(category, excludeIds, topic, usedContexts);
  if (questionCache.has(key)) return;
  questionCache.set(key, null);
  generateQuestion({ category, excludeIds, topic, usedContexts })
    .then(({ question }) => { questionCache.set(key, question); })
    .catch(() => { questionCache.delete(key); });
}

export function useQuizSession() {
  const state = useQuiz();
  const dispatch = useQuizDispatch();
  const { phase, category, sessionQuestions, totalQuestions } = state;

  // ── Backup prefetch on REVEALED ─────────────────────────────────
  // Fires when user sees the answer, ensuring the next question is
  // in-flight even if they answer faster than the initial prefetch.
  useEffect(() => {
    if (phase !== PHASES.REVEALED || !category) return;
    const nextIndex = sessionQuestions.length; // next question index
    if (nextIndex >= totalQuestions) return;   // last question, skip

    const excludeIds = sessionQuestions.map(q => q.id);
    const nextTopic = getTopic(category, nextIndex);
    const nextNextTopic = getTopic(category, nextIndex + 1);
    const usedContexts = sessionQuestions
      .map(extractContext).filter(Boolean).slice(-8);
    prefetchNext(category, excludeIds, nextTopic, usedContexts);
    prefetchNext(category, excludeIds, nextNextTopic, usedContexts);
  }, [phase]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (phase !== PHASES.LOADING || !category) return;

    let cancelled = false;
    const excludeIds = sessionQuestions.map(q => q.id);
    const topicIndex = sessionQuestions.length;
    const topic = getTopic(category, topicIndex);
    const nextTopic = getTopic(category, topicIndex + 1);

    // 收集已出過的情境關鍵詞（最多保留最近 8 筆，避免 prompt 過長）
    const usedContexts = sessionQuestions
      .map(extractContext)
      .filter(Boolean)
      .slice(-8);

    const key = cacheKey(category, excludeIds, topic, usedContexts);
    const cached = questionCache.get(key);

    const nextNextTopic = getTopic(category, topicIndex + 2);

    // Cache hit (fully loaded, not in-flight)
    if (cached) {
      questionCache.delete(key);
      dispatch({ type: 'QUESTION_LOADED', payload: cached });
      const nextContexts = [...usedContexts, extractContext(cached)].filter(Boolean).slice(-8);
      prefetchNext(category, [...excludeIds, cached.id], nextTopic, nextContexts);
      // Also prefetch N+2 in parallel
      prefetchNext(category, [...excludeIds, cached.id], nextNextTopic, nextContexts);
      return;
    }

    // Cache miss or in-flight → fetch from API
    generateQuestion({ category, excludeIds, topic, usedContexts })
      .then(({ question }) => {
        if (!cancelled) {
          dispatch({ type: 'QUESTION_LOADED', payload: question });
          const nextContexts = [...usedContexts, extractContext(question)].filter(Boolean).slice(-8);
          prefetchNext(category, [...excludeIds, question.id], nextTopic, nextContexts);
          // Also prefetch N+2 in parallel
          prefetchNext(category, [...excludeIds, question.id], nextNextTopic, nextContexts);
        }
      })
      .catch(err => {
        if (!cancelled) {
          const message =
            err instanceof ApiError
              ? err.message
              : `AI 服務錯誤：${err.message || err}`;
          dispatch({ type: 'SET_ERROR', payload: message });
        }
      });

    return () => { cancelled = true; };
  }, [phase, category]); // eslint-disable-line react-hooks/exhaustive-deps
}
