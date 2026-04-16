import { useEffect } from 'react';
import { useQuiz, useQuizDispatch } from '../context/QuizContext.jsx';
import { PHASES } from '../reducers/quizReducer.js';
import { generateQuestion, ApiError } from '../services/api.js';

/**
 * Side-effect hook: watches for LOADING phase and fires the Gemini API call.
 * Must be rendered inside QuizProvider.
 */
export function useQuizSession() {
  const state = useQuiz();
  const dispatch = useQuizDispatch();

  const { phase, category, sessionQuestions } = state;

  useEffect(() => {
    if (phase !== PHASES.LOADING || !category) return;

    let cancelled = false;
    const excludeIds = sessionQuestions.map(q => q.id);

    generateQuestion({ category, excludeIds })
      .then(({ question }) => {
        if (!cancelled) dispatch({ type: 'QUESTION_LOADED', payload: question });
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
