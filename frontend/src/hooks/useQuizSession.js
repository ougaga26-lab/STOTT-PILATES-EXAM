import { useEffect } from 'react';
import { useQuiz, useQuizDispatch } from '../context/QuizContext.jsx';
import { PHASES } from '../reducers/quizReducer.js';
import { generateQuestion, ApiError } from '../services/api.js';

// Topic sequences per category (10 topics, matches totalQuestions)
const MOVEMENT_TOPICS = [
  '目標肌肉與穩定肌',   // 1
  '五大原則應用',        // 2
  '體態分析與動作變體',  // 3
  '解剖學',             // 4
  '目標肌肉與穩定肌',   // 5
  '五大原則應用',        // 6
  '體態分析與動作變體',  // 7
  '解剖學',             // 8
  '目標肌肉與穩定肌',   // 9
  '體態分析與動作變體',  // 10
];

const TOPIC_SEQUENCES = {
  IMP:   MOVEMENT_TOPICS,
  IR:    MOVEMENT_TOPICS,
  ICCB:  MOVEMENT_TOPICS,
  MIXED: MOVEMENT_TOPICS,
  PRINCIPLES: [
    'Breathing',
    'Pelvic Placement',
    'Rib Cage Placement',
    'Scapular Movement & Stabilisation',
    'Head & Cervical Placement',
    'Breathing',
    'Pelvic Placement',
    'Rib Cage Placement',
    'Scapular Movement & Stabilisation',
    'Head & Cervical Placement',
  ],
  ANATOMY: [
    '肌肉起止點',
    '主動肌與拮抗肌',
    '協同肌與穩定肌',
    '收縮類型',
    '運動平面與關節類型',
    '肌肉起止點',
    '主動肌與拮抗肌',
    '協同肌與穩定肌',
    '收縮類型',
    '運動平面與關節類型',
  ],
};

function getTopic(category, index) {
  const seq = TOPIC_SEQUENCES[category] || MOVEMENT_TOPICS;
  return seq[index % seq.length] || '';
}

// Module-level cache: cacheKey → question object
const questionCache = new Map();

function cacheKey(category, excludeIds, topic) {
  return `${category}|${excludeIds.join(',')}|${topic}`;
}

function prefetchNext(category, excludeIds, topic) {
  const key = cacheKey(category, excludeIds, topic);
  if (questionCache.has(key)) return;
  questionCache.set(key, null);
  generateQuestion({ category, excludeIds, topic })
    .then(({ question }) => { questionCache.set(key, question); })
    .catch(() => { questionCache.delete(key); });
}

export function useQuizSession() {
  const state = useQuiz();
  const dispatch = useQuizDispatch();
  const { phase, category, sessionQuestions } = state;

  useEffect(() => {
    if (phase !== PHASES.LOADING || !category) return;

    let cancelled = false;
    const excludeIds = sessionQuestions.map(q => q.id);
    const topicIndex = sessionQuestions.length;
    const topic = getTopic(category, topicIndex);
    const nextTopic = getTopic(category, topicIndex + 1);
    const key = cacheKey(category, excludeIds, topic);
    const cached = questionCache.get(key);

    // Cache hit (fully loaded, not in-flight)
    if (cached) {
      questionCache.delete(key);
      dispatch({ type: 'QUESTION_LOADED', payload: cached });
      prefetchNext(category, [...excludeIds, cached.id], nextTopic);
      return;
    }

    // Cache miss or in-flight → fetch from API
    generateQuestion({ category, excludeIds, topic })
      .then(({ question }) => {
        if (!cancelled) {
          dispatch({ type: 'QUESTION_LOADED', payload: question });
          prefetchNext(category, [...excludeIds, question.id], nextTopic);
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
