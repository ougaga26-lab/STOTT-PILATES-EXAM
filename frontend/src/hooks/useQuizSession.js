import { useEffect } from 'react';
import { useQuiz, useQuizDispatch } from '../context/QuizContext.jsx';
import { PHASES } from '../reducers/quizReducer.js';
import { generateQuestion, ApiError } from '../services/api.js';

// Module-level cache: cacheKey → question object
const questionCache = new Map();

function cacheKey(category, excludeIds) {
  return `${category}|${excludeIds.join(',')}`;
}

function prefetchNext(category, excludeIds) {
  const key = cacheKey(category, excludeIds);
  if (questionCache.has(key)) return; // already cached
  // Mark as in-flight to avoid duplicate calls
  questionCache.set(key, null);
  generateQuestion({ category, excludeIds })
    .then(({ question }) => { questionCache.set(key, question); })
    .catch(() => { questionCache.delete(key); }); // silent fail, will retry on demand
}

export function useQuizSession() {
  const state = useQuiz();
  const dispatch = useQuizDispatch();
  const { phase, category, sessionQuestions } = state;

  useEffect(() => {
    if (phase !== PHASES.LOADING || !category) return;

    let cancelled = false;
    const excludeIds = sessionQuestions.map(q => q.id);
    const key = cacheKey(category, excludeIds);
    const cached = questionCache.get(key);

    // Cache hit (fully loaded, not in-flight)
    if (cached) {
      questionCache.delete(key);
      dispatch({ type: 'QUESTION_LOADED', payload: cached });
      prefetchNext(category, [...excludeIds, cached.id]);
      return;
    }

    // Cache miss or in-flight → fetch from API
    generateQuestion({ category, excludeIds })
      .then(({ question }) => {
        if (!cancelled) {
          dispatch({ type: 'QUESTION_LOADED', payload: question });
          prefetchNext(category, [...excludeIds, question.id]);
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
