import { CATEGORIES } from '../constants/categories.js';
import { useQuizDispatch } from '../context/QuizContext.jsx';
import Footer from '../components/Footer.jsx';

const STRIP_BG = 'var(--surface-base)';

const CATEGORY_STYLES = {
  IMP:        { accent: 'var(--sage-500)' },
  IR:         { accent: '#8A8FBF' },
  ICCB:       { accent: 'var(--clay-500)' },
  MIXED:      { accent: 'var(--sage-700)' },
  PRINCIPLES: { accent: '#4A7C59' },
  ANATOMY:    { accent: 'var(--clay-700)' },
};

const ExternalLinkIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'inline', verticalAlign: 'middle' }}>
    <path d="M7 1h4v4M11 1L5 7M2 3H1v8h8V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

function CategoryCard({ cat }) {
  const dispatch = useQuizDispatch();
  const s = CATEGORY_STYLES[cat.id];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Upper card — main clickable area */}
      <button
        className="w-full text-left p-5"
        style={{
          background: 'var(--surface-raised)',
          boxShadow: '0 4px 16px rgba(0,0,0,0.12), 0 2px 4px rgba(0,0,0,0.08)',
          borderRadius: 14,
          transition: 'all 200ms var(--ease)',
          border: 'none',
          cursor: 'pointer',
          flex: 1,
          position: 'relative',
          zIndex: 1,
        }}
        onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.15), 0 2px 6px rgba(0,0,0,0.1)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
        onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.12), 0 2px 4px rgba(0,0,0,0.08)'; e.currentTarget.style.transform = 'translateY(0)'; }}
        onMouseDown={e => { e.currentTarget.style.boxShadow = 'var(--shadow-inner-deep)'; e.currentTarget.style.transform = 'translateY(1px)'; }}
        onMouseUp={e => { e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.15), 0 2px 6px rgba(0,0,0,0.1)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
        onClick={() => dispatch({ type: 'SELECT_CATEGORY', payload: cat.id })}
      >
        <p style={{ fontFamily: 'Fraunces, serif', fontSize: 18, fontWeight: 500, color: 'var(--ink-primary)', lineHeight: 1.2 }}>
          {cat.label}
        </p>
        <p style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: s.accent, marginTop: 3 }}>
          {cat.subtitle}
        </p>
        {cat.description && (
          <p style={{ fontSize: 12, color: 'var(--ink-secondary)', marginTop: 8, lineHeight: 1.5 }}>
            {cat.description}
          </p>
        )}
        <div style={{ marginTop: 12, fontSize: 11, fontWeight: 600, color: s.accent, display: 'flex', alignItems: 'center', gap: 4 }}>
          開始練習 <span>→</span>
        </div>
      </button>

      {/* Lower strip — tool link or empty */}
      <div
        style={{
          background: STRIP_BG,
          borderRadius: '0 0 12px 12px',
          padding: '12px 16px 8px',
          minHeight: 40,
          display: 'flex',
          alignItems: 'center',
          marginTop: -8,
        }}
      >
        {cat.toolLink && (
          <a
            href={cat.toolLink}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 5,
              fontSize: 11,
              color: s.accent,
              textDecoration: 'none',
              fontWeight: 600,
            }}
          >
            <ExternalLinkIcon />
            {cat.toolLabel}
          </a>
        )}
      </div>
    </div>
  );
}

export default function Home({ onHistory }) {
  return (
    <div className="min-h-screen px-4 py-10" style={{ background: 'var(--surface-canvas)' }}>
      <div className="max-w-xl mx-auto">
        {/* Header */}
        <header className="mb-8">
          <div className="flex items-start justify-between">
            <div>
              <h1 style={{ fontFamily: 'Fraunces, serif', fontSize: 32, fontWeight: 500, letterSpacing: '-0.02em', color: 'var(--ink-primary)', margin: 0 }}>
                STOTT PILATES
              </h1>
              <p style={{ fontSize: 14, color: 'var(--ink-secondary)', marginTop: 4 }}>AI備考小工具</p>
            </div>
            <button
              onClick={onHistory}
              style={{
                background: 'var(--surface-raised)',
                border: 'none',
                borderRadius: 8,
                padding: '6px 12px',
                fontSize: 12,
                color: 'var(--ink-secondary)',
                cursor: 'pointer',
                boxShadow: 'var(--shadow-raised)',
                marginTop: 4,
              }}
              onMouseEnter={e => { e.currentTarget.style.boxShadow = 'var(--shadow-raised-hover)'; }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow = 'var(--shadow-raised)'; }}
            >
              練習記錄
            </button>
          </div>
          <div className="flex gap-2 flex-wrap mt-4">
            {['IMP', 'IR', 'ICCB', '五大原則', '解剖學'].map(tag => (
              <span key={tag} className="pill">{tag}</span>
            ))}
          </div>
        </header>

        {/* 器械科目 */}
        <p className="section-label">器械科目</p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 mb-6" style={{ alignItems: 'stretch' }}>
          {CATEGORIES.filter(c => ['IMP','IR','ICCB','MIXED'].includes(c.id)).map(cat => (
            <CategoryCard key={cat.id} cat={cat} />
          ))}
        </div>

        {/* 理論專區 */}
        <p className="section-label">理論深度專區</p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2" style={{ alignItems: 'stretch' }}>
          {CATEGORIES.filter(c => ['PRINCIPLES','ANATOMY'].includes(c.id)).map(cat => (
            <CategoryCard key={cat.id} cat={cat} />
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: 48 }}>
          <img src="/STCALOGO2.png" alt="STCA Logo" style={{ maxWidth: 160, margin: '0 auto 24px', display: 'block', opacity: 0.8 }} />
        </div>
        <Footer />
      </div>
    </div>
  );
}
