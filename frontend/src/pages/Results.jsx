import { useQuiz, useQuizDispatch } from '../context/QuizContext.jsx';
import { CATEGORIES } from '../constants/categories.js';

function getGrade(pct) {
  if (pct >= 90) return { label: '優秀！', emoji: '🏆', style: { color: 'var(--clay-500)' } };
  if (pct >= 75) return { label: '良好',   emoji: '🎯', style: { color: 'var(--sage-700)' } };
  if (pct >= 60) return { label: '及格',   emoji: '📚', style: { color: '#8A8FBF' } };
  return             { label: '需加強', emoji: '💪', style: { color: 'var(--clay-700)' } };
}

export default function Results() {
  const { score, category, sessionQuestions } = useQuiz();
  const dispatch = useQuizDispatch();
  const pct = score.total > 0 ? Math.round((score.correct / score.total) * 100) : 0;
  const grade = getGrade(pct);
  const catMeta = CATEGORIES.find(c => c.id === category);

  return (
    <div className="min-h-screen px-4 py-10" style={{ background: 'var(--surface-canvas)' }}>
      <div className="max-w-xl mx-auto space-y-6">
        {/* Score hero — elevated clay card */}
        <div className="card-elevated text-center">
          <div className="text-4xl mb-3">{grade.emoji}</div>
          <p className="text-[42px] font-medium leading-none mb-1" style={{ fontFamily: 'Fraunces, serif', color: '#FAF4EE' }}>
            {pct}%
          </p>
          <p className="text-[14px] font-semibold" style={{ color: 'rgba(250,244,238,0.85)' }}>{grade.label}</p>
          <p className="text-[12px] mt-1" style={{ color: 'rgba(250,244,238,0.6)' }}>
            {score.correct} / {score.total} 題正確
          </p>
          {catMeta && (
            <span className="inline-flex items-center gap-1.5 mt-3 px-3 py-1 rounded-full text-[11px] font-medium"
              style={{ background: 'rgba(255,252,244,0.15)', color: '#FAF4EE' }}>
              {catMeta.emoji} {catMeta.label}
            </span>
          )}
        </div>

        {/* Question review */}
        <div>
          <p className="section-label">題目回顧</p>
          <div className="space-y-2.5">
            {sessionQuestions.map((q, i) => {
              const isCorrect = q.selectedChoice === q.correctId;
              const correctText = q.choices.find(c => c.id === q.correctId)?.text;
              const selectedText = q.choices.find(c => c.id === q.selectedChoice)?.text;
              const borderColor = isCorrect ? 'var(--sage-500)' : 'var(--clay-500)';
              return (
                <div key={q.id} className="card-base" style={{ borderLeft: `3px solid ${borderColor}` }}>
                  <p className="text-[12px] leading-relaxed mb-2" style={{ color: 'var(--ink-primary)' }}>{q.scenario}</p>
                  {isCorrect ? (
                    <p className="text-[12px]" style={{ color: 'var(--sage-700)' }}>
                      ✅ {correctText}
                    </p>
                  ) : (
                    <p className="text-[12px]">
                      <span style={{ color: 'var(--clay-500)' }}>❌ {selectedText}</span>
                      <span style={{ color: 'var(--ink-tertiary)' }}> · </span>
                      <span style={{ color: 'var(--sage-700)' }}>✅ {correctText}</span>
                    </p>
                  )}
                  {q.rationale?.explanation && (
                    <p className="text-[11px] mt-2 leading-relaxed" style={{ color: 'var(--ink-tertiary)' }}>
                      {q.rationale.explanation}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <button className="btn w-full" onClick={() => dispatch({ type: 'SELECT_CATEGORY', payload: category })}>
            再練一回合
          </button>
          <button
            className="btn w-full"
            style={{ background: 'var(--surface-base)', color: 'var(--ink-secondary)', boxShadow: 'var(--shadow-inner-soft)' }}
            onMouseEnter={e => { e.currentTarget.style.boxShadow = 'var(--shadow-raised)'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
            onMouseLeave={e => { e.currentTarget.style.boxShadow = 'var(--shadow-inner-soft)'; e.currentTarget.style.transform = 'translateY(0)'; }}
            onClick={() => dispatch({ type: 'RESET' })}
          >
            返回選擇科目
          </button>
        </div>
      </div>
    </div>
  );
}
