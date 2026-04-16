import { CATEGORIES } from '../constants/categories.js';
import { useQuizDispatch } from '../context/QuizContext.jsx';

const CATEGORY_STYLES = {
  IMP:        { accent: 'var(--sage-500)',  tint: 'var(--sage-100)',  border: 'var(--sage-300)' },
  IR:         { accent: '#8A8FBF',          tint: '#EEEDF6',          border: '#C4C6DE' },
  ICCB:       { accent: 'var(--clay-500)',  tint: '#FBF2EE',          border: 'var(--clay-300)' },
  MIXED:      { accent: 'var(--sage-700)',  tint: 'var(--surface-base)', border: 'var(--stroke-soft)' },
  PRINCIPLES: { accent: '#4A7C59',          tint: '#EAF2EB',          border: '#A8C5AD' },
  ANATOMY:    { accent: 'var(--clay-700)',  tint: '#F5EEEA',          border: 'var(--clay-300)' },
};

function CategoryCard({ cat }) {
  const dispatch = useQuizDispatch();
  const s = CATEGORY_STYLES[cat.id];
  return (
    <button
      className="w-full text-left rounded-card p-5"
      style={{
        background: 'var(--surface-raised)',
        boxShadow: 'var(--shadow-raised)',
        transition: 'all 200ms var(--ease)',
        border: 'none',
        cursor: 'pointer',
      }}
      onMouseEnter={e => { e.currentTarget.style.boxShadow = 'var(--shadow-raised-hover)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
      onMouseLeave={e => { e.currentTarget.style.boxShadow = 'var(--shadow-raised)'; e.currentTarget.style.transform = 'translateY(0)'; }}
      onMouseDown={e => { e.currentTarget.style.boxShadow = 'var(--shadow-inner-deep)'; e.currentTarget.style.transform = 'translateY(1px)'; }}
      onMouseUp={e => { e.currentTarget.style.boxShadow = 'var(--shadow-raised-hover)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
      onClick={() => dispatch({ type: 'SELECT_CATEGORY', payload: cat.id })}
    >
      <div className="w-9 h-9 rounded-btn flex items-center justify-center text-lg mb-3"
        style={{ background: s.tint, boxShadow: 'var(--shadow-inner-soft)', border: `1px solid ${s.border}` }}>
        {cat.emoji}
      </div>
      <p style={{ fontFamily: 'Fraunces, serif', fontSize: 18, fontWeight: 500, color: 'var(--ink-primary)', lineHeight: 1.2 }}>
        {cat.label}
      </p>
      <p style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: s.accent, marginTop: 3 }}>
        {cat.subtitle}
      </p>
      <p style={{ fontSize: 12, color: 'var(--ink-secondary)', marginTop: 8, lineHeight: 1.5 }}>
        {cat.description}
      </p>
      <div style={{ marginTop: 12, fontSize: 11, fontWeight: 600, color: s.accent, display: 'flex', alignItems: 'center', gap: 4 }}>
        開始練習 <span>→</span>
      </div>
    </button>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen px-4 py-10" style={{ background: 'var(--surface-canvas)' }}>
      <div className="max-w-xl mx-auto">
        {/* Header */}
        <header className="mb-8">
          <div className="w-12 h-12 rounded-modal flex items-center justify-center text-2xl mb-4"
            style={{ background: 'var(--surface-raised)', boxShadow: 'var(--shadow-elevated)' }}>
            🏋️
          </div>
          <h1 style={{ fontFamily: 'Fraunces, serif', fontSize: 32, fontWeight: 500, letterSpacing: '-0.02em', color: 'var(--ink-primary)', margin: 0 }}>
            STOTT PILATES
          </h1>
          <p style={{ fontSize: 14, color: 'var(--ink-secondary)', marginTop: 4 }}>AI 認證考試準備系統</p>
          <div className="flex gap-2 flex-wrap mt-4">
            {['IMP', 'IR', 'ICCB', '五大原則', '解剖學'].map(tag => (
              <span key={tag} className="pill">{tag}</span>
            ))}
          </div>
        </header>

        {/* 器械科目 */}
        <p className="section-label">器械科目</p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 mb-6">
          {CATEGORIES.filter(c => ['IMP','IR','ICCB','MIXED'].includes(c.id)).map(cat => (
            <CategoryCard key={cat.id} cat={cat} />
          ))}
        </div>

        {/* 理論專區 */}
        <p className="section-label">理論深度專區</p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {CATEGORIES.filter(c => ['PRINCIPLES','ANATOMY'].includes(c.id)).map(cat => (
            <CategoryCard key={cat.id} cat={cat} />
          ))}
        </div>

        <p style={{ textAlign: 'center', fontSize: 11, color: 'var(--ink-tertiary)', marginTop: 32 }}>
          Powered by Google Gemini · 非官方學習工具
        </p>
      </div>
    </div>
  );
}
