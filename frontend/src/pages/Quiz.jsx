import { useState } from 'react';
import { useQuiz, useQuizDispatch } from '../context/QuizContext.jsx';
import { PHASES } from '../reducers/quizReducer.js';
import { useQuizSession } from '../hooks/useQuizSession.js';
import { CATEGORIES } from '../constants/categories.js';
import { generateRationale } from '../services/api.js';
import LoadingSpinner from '../components/LoadingSpinner.jsx';
import ErrorBanner from '../components/ErrorBanner.jsx';
import ProgressBar from '../components/ProgressBar.jsx';
import ChoiceList from '../components/ChoiceList.jsx';
import RationalePanel from '../components/RationalePanel.jsx';

export default function Quiz() {
  useQuizSession();
  const state = useQuiz();
  const dispatch = useQuizDispatch();
  const { phase, category, sessionQuestions, currentIndex, selectedChoice, score, error, totalQuestions } = state;
  const catMeta = CATEGORIES.find(c => c.id === category);
  const question = sessionQuestions[currentIndex];
  const isLast = currentIndex + 1 >= totalQuestions;

  const [rationaleLoading, setRationaleLoading] = useState(false);
  const [rationaleError, setRationaleError] = useState(null);

  async function handleLoadRationale() {
    setRationaleLoading(true);
    setRationaleError(null);
    try {
      const data = await generateRationale({
        scenario: question.scenario,
        choices: question.choices,
        correctId: question.correctId,
      });
      dispatch({ type: 'RATIONALE_LOADED', payload: { index: currentIndex, rationale: data.rationale } });
    } catch (e) {
      setRationaleError(e.message || '解析載入失敗，請重試');
    } finally {
      setRationaleLoading(false);
    }
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

            {/* Scenario */}
            <div className="card-base">
              <p className="section-label">情境描述</p>
              <p className="text-[14px] leading-relaxed" style={{ color: 'var(--ink-primary)' }}>{question.scenario}</p>
            </div>

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
                    onClick={() => dispatch({ type: 'NEXT_QUESTION' })}
                  >
                    {isLast ? '查看結果' : '下一題 →'}
                  </button>
                )}
              </div>
            </div>

            {/* Rationale — lazy loaded */}
            {phase === PHASES.REVEALED && (
              <div>
                {!question.rationale && !rationaleLoading && (
                  <button
                    className="btn w-full"
                    style={{ background: 'var(--surface-raised)', color: 'var(--sage-700)', boxShadow: 'var(--shadow-raised)' }}
                    onClick={handleLoadRationale}
                  >
                    查看解析 →
                  </button>
                )}
                {rationaleLoading && <LoadingSpinner message="AI 正在生成解析..." />}
                {rationaleError && (
                  <div className="rounded-card p-4 text-center" style={{ background: 'var(--surface-base)', boxShadow: 'var(--shadow-inner-soft)' }}>
                    <p className="text-[12px]" style={{ color: 'var(--clay-500)' }}>{rationaleError}</p>
                    <button className="btn mt-3" onClick={handleLoadRationale}>重試</button>
                  </div>
                )}
                {question.rationale && <RationalePanel rationale={question.rationale} />}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
