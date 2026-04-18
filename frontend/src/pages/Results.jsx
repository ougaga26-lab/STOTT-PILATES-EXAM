import { useEffect, useRef, useState } from 'react';
import { useQuiz, useQuizDispatch } from '../context/QuizContext.jsx';
import { CATEGORIES } from '../constants/categories.js';
import Footer from '../components/Footer.jsx';
import LoadingSpinner from '../components/LoadingSpinner.jsx';
import { saveSession, updateAnalysis } from '../services/history.js';
import { generateAnalysis } from '../services/api.js';

function renderBold(text) {
  return text.split('**').map((part, i) =>
    i % 2 === 1 ? <strong key={i}>{part}</strong> : part
  );
}

function getGrade(pct) {
  if (pct >= 90) return { label: '優秀！' };
  if (pct >= 75) return { label: '良好' };
  if (pct >= 60) return { label: '及格' };
  return { label: '需加強' };
}

export default function Results({ onHistory }) {
  const { score, category, sessionQuestions } = useQuiz();
  const dispatch = useQuizDispatch();
  const pct = score.total > 0 ? Math.round((score.correct / score.total) * 100) : 0;
  const grade = getGrade(pct);
  const catMeta = CATEGORIES.find(c => c.id === category);

  const [analysis, setAnalysis] = useState(null);
  const [analysisLoading, setAnalysisLoading] = useState(true);
  const [analysisError, setAnalysisError] = useState(false);
  const saved = useRef(false);
  const recordId = useRef(null);

  useEffect(() => {
    if (saved.current) return;
    saved.current = true;

    const record = {
      id: Date.now(),
      date: new Date().toISOString(),
      category,
      categoryLabel: catMeta?.label || category,
      score,
      percentage: pct,
      questions: sessionQuestions,
      analysis: null,
    };
    recordId.current = record.id;
    saveSession(record);

    // Build wrong questions list for analysis
    const wrongQuestions = sessionQuestions
      .filter(q => q.selectedChoice !== q.correctId)
      .map(q => ({
        scenario: q.scenario,
        correctText: q.choices.find(c => c.id === q.correctId)?.text || '',
        selectedText: q.choices.find(c => c.id === q.selectedChoice)?.text || '',
        explanation: q.rationale?.explanation || '',
      }));

    generateAnalysis({
      categoryLabel: catMeta?.label || category,
      score,
      wrongQuestions,
    })
      .then(({ analysis: text }) => {
        setAnalysis(text);
        setAnalysisLoading(false);
        updateAnalysis(recordId.current, text);
      })
      .catch(() => {
        setAnalysisError(true);
        setAnalysisLoading(false);
      });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="min-h-screen px-4 py-10" style={{ background: 'var(--surface-canvas)' }}>
      <div className="max-w-xl mx-auto space-y-6">
        {/* Score hero */}
        <div className="card-elevated text-center">
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
              {catMeta.label}
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

        {/* AI Analysis */}
        <div className="rounded-card p-5" style={{ background: 'var(--surface-raised)', boxShadow: 'var(--shadow-raised)' }}>
          <p className="section-label mb-3">AI 分析</p>
          {analysisLoading && <LoadingSpinner />}
          {analysisError && (
            <p className="text-[13px]" style={{ color: 'var(--clay-500)' }}>分析生成失敗，請稍後再試。</p>
          )}
          {analysis && (
            <p className="text-[13px] leading-relaxed" style={{ color: 'var(--ink-secondary)', whiteSpace: 'pre-wrap' }}>{renderBold(analysis)}</p>
          )}
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
          <button
            className="btn w-full"
            style={{ background: 'var(--surface-base)', color: 'var(--ink-secondary)', boxShadow: 'var(--shadow-inner-soft)' }}
            onMouseEnter={e => { e.currentTarget.style.boxShadow = 'var(--shadow-raised)'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
            onMouseLeave={e => { e.currentTarget.style.boxShadow = 'var(--shadow-inner-soft)'; e.currentTarget.style.transform = 'translateY(0)'; }}
            onClick={onHistory}
          >
            練習記錄
          </button>
        </div>

        <Footer />
      </div>
    </div>
  );
}
