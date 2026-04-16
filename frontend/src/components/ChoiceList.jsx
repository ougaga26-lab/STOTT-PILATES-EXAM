import { useQuiz, useQuizDispatch } from '../context/QuizContext.jsx';
import { PHASES } from '../reducers/quizReducer.js';

export default function ChoiceList({ choices, correctId }) {
  const { phase, selectedChoice } = useQuiz();
  const dispatch = useQuizDispatch();
  const revealed = phase === PHASES.REVEALED;

  function getClass(choice) {
    const base = 'choice-btn';
    if (!revealed) {
      return selectedChoice === choice.id ? `${base} choice-btn-selected` : base;
    }
    if (choice.id === correctId) return `${base} choice-btn-correct`;
    if (choice.id === selectedChoice) return `${base} choice-btn-wrong`;
    return `${base} choice-btn-neutral`;
  }

  function getIcon(choice) {
    if (!revealed) return null;
    if (choice.id === correctId) return <span className="ml-2 text-[13px]" style={{ color: 'var(--sage-700)' }}>✓</span>;
    if (choice.id === selectedChoice) return <span className="ml-2 text-[13px]" style={{ color: 'var(--clay-500)' }}>✗</span>;
    return null;
  }

  return (
    <div className="space-y-2.5">
      {choices.map(choice => (
        <button
          key={choice.id}
          disabled={revealed}
          className={getClass(choice)}
          onClick={() => dispatch({ type: 'CHOOSE_ANSWER', payload: choice.id })}
        >
          <span className="font-bold mr-2 text-xs" style={{ color: 'var(--ink-tertiary)' }}>{choice.id}.</span>
          {choice.text}
          {getIcon(choice)}
        </button>
      ))}
    </div>
  );
}
