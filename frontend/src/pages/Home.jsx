import { CATEGORIES } from '../constants/categories.js';
import { useQuizDispatch } from '../context/QuizContext.jsx';

const CATEGORY_STYLES = {
  IMP:   { accent: 'var(--sage-500)',  tint: 'var(--sage-100)',  border: 'var(--sage-300)' },
  IR:    { accent: '#8A8FBF',          tint: '#EEEDF6',          border: '#C4C6DE' },
  ICCB:  { accent: 'var(--clay-500)',  tint: '#FBF2EE',          border: 'var(--clay-300)' },
  MIXED: { accent: 'var(--sage-700)',  tint: 'var(--surface-base)', border: 'var(--stroke-soft)' },
};

function CategoryCard({ cat }) {
  const dispatch = useQuizDispatch();
  const s = CATEGORY_STYLES[cat.id];
  return (
    <button
      className="w-full text-left rounded-card p-5 group"
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
      {/* Icon */}
      <div className="w-9 h-9 rounded-btn flex items-center justify-center text-lg mb-3"
        style={{ background: s.tint, boxShadow: 'var(--shadow-inner-soft)', border: `1px solid ${s.border}` }}>
        {cat.emoji}
      </div>

      {/* Label */}
      <p className="font-display font-semibold text-[18px] leading-tight" style={{ color: 'var(--ink-primary)', fontFamily: 'Fraunces, serif' }}>
        {cat.label}
      </p>
      <p className="text-[11px] font-semibold uppercase tracking-wide mt-0.5" style={{ color: s.accent }}>
        {cat.subtitle}
      </p>

      {/* Description */}
      <p className="text-[12px] leading-relaxed mt-2.5" style={{ color: 'var(--ink-secondary)' }}>
        {cat.description}
      </p>

      {/* Arrow */}
      <div className="mt-3 flex items-center gap-1 text-[11px] font-semibold" style={{ color: s.accent }}>
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
          <h1 className="text-[32px] font-medium leading-tight tracking-tight" style={{ fontFamily: 'Fraunces, serif', color: 'var(--ink-primary)' }}>
            STOTT PILATES
          </h1>
          <p className="text-[14px] mt-1" style={{ color: 'var(--ink-secondary)' }}>AI 認證考試準備系統</p>
          <div className="flex gap-2 flex-wrap mt-4">
            {['IMP', 'IR', 'ICCB'].map(tag => (
              <span key={tag} className="pill">{tag}</span>
            ))}
          </div>
        </header>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {CATEGORIES.map(cat => <CategoryCard key={cat.id} cat={cat} />)}
        </div>

        {/* Flashcard shortcut */}
        <button
          className="w-full mt-4 rounded-card p-4 flex items-center gap-4 text-left"
          style={{ background: 'var(--surface-base)', boxShadow: 'var(--shadow-inner-soft)', border: 'none', cursor: 'pointer', transition: 'all 200ms var(--ease)' }}
          onMouseEnter={e => { e.currentTarget.style.boxShadow = 'var(--shadow-raised)'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
          onMouseLeave={e => { e.currentTarget.style.boxShadow = 'var(--shadow-inner-soft)'; e.currentTarget.style.transform = 'translateY(0)'; }}
          onClick={() => dispatch({ type: 'SHOW_FLASHCARDS' })}
        >
          <div className="w-10 h-10 rounded-btn flex items-center justify-center text-xl flex-shrink-0"
            style={{ background: 'var(--surface-raised)', boxShadow: 'var(--shadow-raised)' }}>
            🃏
          </div>
          <div>
            <p className="font-semibold text-sm" style={{ color: 'var(--ink-primary)' }}>術語閃卡</p>
            <p className="text-xs" style={{ color: 'var(--ink-tertiary)' }}>38 個官方動作名稱 · 英中對照</p>
          </div>
          <span className="ml-auto text-sm" style={{ color: 'var(--ink-tertiary)' }}>→</span>
        </button>

        {/* Footer */}
        <p className="text-center text-[11px] mt-8" style={{ color: 'var(--ink-tertiary)' }}>
          Powered by Google Gemini · 非官方學習工具
        </p>
      </div>
    </div>
  );
}
