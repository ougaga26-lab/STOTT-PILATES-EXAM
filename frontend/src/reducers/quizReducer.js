export const PHASES = {
  SELECT: 'SELECT',
  LOADING: 'LOADING',
  QUESTION: 'QUESTION',
  REVEALED: 'REVEALED',
  COMPLETE: 'COMPLETE',
};

export const initialState = {
  phase: PHASES.SELECT,
  category: null,
  sessionQuestions: [],
  currentIndex: 0,
  selectedChoice: null,
  score: { correct: 0, total: 0 },
  error: null,
  totalQuestions: 20,
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
      if (state.sessionQuestions.length >= state.totalQuestions) return state;
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

    case 'REVEAL': {
      const qs = [...state.sessionQuestions];
      const isCorrect = action.payload === qs[state.currentIndex].correctId;
      qs[state.currentIndex] = { ...qs[state.currentIndex], selectedChoice: action.payload };
      return {
        ...state,
        phase: PHASES.REVEALED,
        sessionQuestions: qs,
        score: {
          correct: state.score.correct + (isCorrect ? 1 : 0),
          total: state.score.total + 1,
        },
      };
    }

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

    case 'RATIONALE_LOADED': {
      const qs = [...state.sessionQuestions];
      qs[action.payload.index] = { ...qs[action.payload.index], rationale: action.payload.rationale };
      return { ...state, sessionQuestions: qs };
    }

    case 'RETRY_LOAD':
      return { ...state, phase: PHASES.LOADING, error: null };

    case 'RESET':
      return { ...initialState };

    case 'SET_TOTAL':
      return { ...state, totalQuestions: action.payload };

    default:
      return state;
  }
}
