import { createContext, useContext, useReducer } from 'react';
import { quizReducer, initialState } from '../reducers/quizReducer.js';

const QuizContext = createContext(null);
const QuizDispatchContext = createContext(null);

export function QuizProvider({ children }) {
  const [state, dispatch] = useReducer(quizReducer, initialState);
  return (
    <QuizContext.Provider value={state}>
      <QuizDispatchContext.Provider value={dispatch}>
        {children}
      </QuizDispatchContext.Provider>
    </QuizContext.Provider>
  );
}

export function useQuiz() {
  const ctx = useContext(QuizContext);
  if (!ctx) throw new Error('useQuiz must be used within QuizProvider');
  return ctx;
}

export function useQuizDispatch() {
  const ctx = useContext(QuizDispatchContext);
  if (!ctx) throw new Error('useQuizDispatch must be used within QuizProvider');
  return ctx;
}
