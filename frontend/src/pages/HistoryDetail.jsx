import Footer from '../components/Footer.jsx';

function getGrade(pct) {
  if (pct >= 90) return { label: '優秀！' };
  if (pct >= 75) return { label: '良好' };
  if (pct >= 60) return { label: '及格' };
  return { label: '需加強' };
}

function formatDate(iso) {
  const d = new Date(iso);
  return `${d.getFullYear()}/${String(d.getMonth() + 1).padStart(2, '0')}/${String(d.getDate()).padStart(2, '0')}`;
}

export default function HistoryDetail({ record, onBack }) {
  const grade = getGrade(record.percentage);

  return (
    <div className="min-h-screen px-4 py-10" style={{ background: 'var(--surface-canvas)' }}>
      <div className="max-w-xl mx-auto space-y-6">
        <header className="flex items-center gap-3">
          <button
            onClick={onBack}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--ink-secondary)', fontSize: 13, padding: 0 }}
          >
            ← 返回記錄
          </button>
          <span className="text-[12px]" style={{ color: 'var(--ink-tertiary)' }}>{formatDate(record.date)}</span>
        </header>

        {/* Score hero */}
        <div className="card-elevated text-center">
          <p className="text-[42px] font-medium leading-none mb-1" style={{ fontFamily: 'Fraunces, serif', color: '#FAF4EE' }}>
            {record.percentage}%
          </p>
          <p className="text-[14px] font-semibold" style={{ color: 'rgba(250,244,238,0.85)' }}>{grade.label}</p>
          <p className="text-[12px] mt-1" style={{ color: 'rgba(250,244,238,0.6)' }}>
            {record.score.correct} / {record.score.total} 題正確
          </p>
          <span className="inline-flex items-center gap-1.5 mt-3 px-3 py-1 rounded-full text-[11px] font-medium"
            style={{ background: 'rgba(255,252,244,0.15)', color: '#FAF4EE' }}>
            {record.categoryLabel}
          </span>
        </div>

        {/* Question review */}
        {record.questions?.length > 0 && (
          <div>
            <p className="section-label">題目回顧</p>
            <div className="space-y-2.5">
              {record.questions.map((q, i) => {
                const isCorrect = q.selectedChoice === q.correctId;
                const correctText = q.choices?.find(c => c.id === q.correctId)?.text;
                const selectedText = q.choices?.find(c => c.id === q.selectedChoice)?.text;
                const borderColor = isCorrect ? 'var(--sage-500)' : 'var(--clay-500)';
                return (
                  <div key={q.id ?? i} className="card-base" style={{ borderLeft: `3px solid ${borderColor}` }}>
                    <p className="text-[12px] leading-relaxed mb-2" style={{ color: 'var(--ink-primary)' }}>{q.scenario}</p>
                    {isCorrect ? (
                      <p className="text-[12px]" style={{ color: 'var(--sage-700)' }}>✅ {correctText}</p>
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
        )}

        {/* AI Analysis */}
        {record.analysis && (
          <div className="rounded-card p-5" style={{ background: 'var(--surface-raised)', boxShadow: 'var(--shadow-raised)' }}>
            <p className="section-label mb-3">AI 分析</p>
            <p className="text-[13px] leading-relaxed" style={{ color: 'var(--ink-secondary)', whiteSpace: 'pre-wrap' }}>
              {record.analysis}
            </p>
          </div>
        )}

        <Footer />
      </div>
    </div>
  );
}
