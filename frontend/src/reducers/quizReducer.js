export const PHASES = {
  SELECT: 'SELECT',
  LOADING: 'LOADING',
  QUESTION: 'QUESTION',
  REVEALED: 'REVEALED',
  COMPLETE: 'COMPLETE',
};

export const initialState = {
  phase: PHASES.SELECT,
  view: null,
  category: null,
  sessionQuestions: [],
  currentIndex: 0,
  selectedChoice: null,
  score: { correct: 0, total: 0 },
  error: null,
  totalQuestions: 10,
};

export function quizReducer(state, action) {
  switch (action.type) {
    case 'SELECT_CATEGORY':
      return {
        ...initialState,
        phase: PHASES.LOADING,
        category: action.payload,
      };

    case 'QUESTION_LOADED':
      return {
        ...state,
        phase: PHASES.QUESTION,
        sessionQuestions: [...state.sessionQuestions, action.payload],
        selectedChoice: null,
        error: null,
      };

    case 'CHOOSE_ANSWER':
      if (state.phase !== PHASES.QUESTION) return state;
      return { ...state, selectedChoice: action.payload };

    case 'REVEAL':
      if (state.selectedChoice === null) return state;
      const question = state.sessionQuestions[state.currentIndex];
      const isCorrect = action.payload === question.correctId;
      return {
        ...state,
        phase: PHASES.REVEALED,
        score: {
          correct: state.score.correct + (isCorrect ? 1 : 0),
          total: state.score.total + 1,
        },
      };

    case 'NEXT_QUESTION': {
      const nextIndex = state.currentIndex + 1;
      if (nextIndex >= state.totalQuestions) {
        return { ...state, phase: PHASES.COMPLETE };
      }
      return {
        ...state,
        phase: PHASES.LOADING,
        currentIndex: nextIndex,
        selectedChoice: null,
      };
    }

    case 'SET_ERROR':
      return { ...state, phase: PHASES.QUESTION, error: action.payload };

    case 'RETRY_LOAD':
      return { ...state, phase: PHASES.LOADING, error: null };

    case 'SHOW_FLASHCARDS':
      return { ...initialState, view: 'FLASHCARDS' };

    case 'RESET':
      return { ...initialState };

    case 'SET_TOTAL':
      return { ...state, totalQuestions: action.payload };

    default:
      return state;
  }
}
