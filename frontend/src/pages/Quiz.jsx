import { useQuiz, useQuizDispatch } from '../context/QuizContext.jsx';
import { PHASES } from '../reducers/quizReducer.js';
import { useQuizSession } from '../hooks/useQuizSession.js';
import { CATEGORIES } from '../constants/categories.js';
import LoadingSpinner from '../components/LoadingSpinner.jsx';
import ErrorBanner from '../components/ErrorBanner.jsx';
import ProgressBar from '../components/ProgressBar.jsx';
import ChoiceList from '../components/ChoiceList.jsx';

export default function Quiz() {
  useQuizSession();
  const state = useQuiz();
  const dispatch = useQuizDispatch();
  const { phase, category, sessionQuestions, currentIndex, selectedChoice, score, error, totalQuestions } = state;
  const catMeta = CATEGORIES.find(c => c.id === category);
  const question = sessionQuestions[currentIndex];
  const isLast = currentIndex + 1 >= totalQuestions;

  function handleNext() {
    dispatch({ type: 'NEXT_QUESTION' });
  }

  return (
    <div className="min-h-screen px-4 py-6" style={{ background: 'var(--surface-canvas)' }}>
      <div className="max-w-xl mx-auto space-y-4">
        {/* Top Bar */}
        <div className="flex items-center justify-between">
          <button className="btn-ghost" onClick={() => dispatch({ type: 'RESET' })}>
            ← 返回
          </button>
          <span className="pill" style={{ '--pill-dot': 'var(--sage-500)' }}>
            {catMeta?.label}
          </span>
        </div>

        {/* Progress */}
        <ProgressBar current={currentIndex + 1} total={totalQuestions} correct={score.correct} />

        {/* Loading */}
        {phase === PHASES.LOADING && !error && <LoadingSpinner />}

        {/* Error */}
        {error && <ErrorBanner message={error} />}

        {/* Question */}
        {question && (phase === PHASES.QUESTION || phase === PHASES.REVEALED) && (
          <div className="space-y-4">
            {/* MIXED badge */}
            {category === 'MIXED' && (
              <span className="pill">{question.category}</span>
            )}

            {/* Scenario — only show if not empty */}
            {question.scenario && (
              <div className="card-base">
                <p className="section-label">情境描述</p>
                <p className="text-[14px] leading-relaxed" style={{ color: 'var(--ink-primary)' }}>{question.scenario}</p>
              </div>
            )}

            {/* Choices + Actions */}
            <div className="rounded-card p-5 space-y-3" style={{ background: 'var(--surface-raised)', boxShadow: 'var(--shadow-raised)' }}>
              <p className="section-label">請選擇最正確的答案</p>
              <ChoiceList choices={question.choices} correctId={question.correctId} />

              <div className="pt-1 space-y-2">
                {phase === PHASES.QUESTION && (
                  <button
                    className="btn w-full"
                    disabled={!selectedChoice}
                    onClick={() => dispatch({ type: 'REVEAL', payload: selectedChoice })}
                  >
                    確認答案
                  </button>
                )}
                {phase === PHASES.REVEALED && (
                  <button
                    className="btn w-full"
                    onClick={handleNext}
                  >
                    {isLast ? '查看結果' : '下一題 →'}
                  </button>
                )}
              </div>
            </div>

            {/* Rationale — show directly after reveal */}
            {phase === PHASES.REVEALED && question.rationale?.explanation && (
              <div className="rounded-card p-4" style={{ background: 'var(--surface-raised)', boxShadow: 'var(--shadow-elevated)' }}>
                <p className="section-label">解析</p>
                <p className="text-[13px] leading-relaxed" style={{ color: 'var(--ink-secondary)' }}>{question.rationale.explanation}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
