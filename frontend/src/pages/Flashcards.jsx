import { useState } from 'react';
import { FLASHCARDS } from '../constants/flashcards.js';
import { useQuizDispatch } from '../context/QuizContext.jsx';

function FlipCard({ card, index }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className="cursor-pointer select-none"
      style={{ perspective: '1000px' }}
      onClick={() => setFlipped(f => !f)}
    >
      <div
        style={{
          position: 'relative',
          width: '100%',
          paddingBottom: '56%',
          transformStyle: 'preserve-3d',
          transition: 'transform 300ms cubic-bezier(0.4,0,0.2,1)',
          transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
        }}
      >
        {/* Front — English */}
        <div
          style={{
            position: 'absolute', inset: 0,
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            background: 'var(--surface-raised)',
            boxShadow: 'var(--shadow-raised)',
            borderRadius: '12px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '16px',
          }}
        >
          <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--ink-tertiary)', marginBottom: 8 }}>
            #{index + 1} · 英文
          </span>
          <p style={{ fontFamily: 'Fraunces, serif', fontSize: 20, fontWeight: 500, color: 'var(--ink-primary)', textAlign: 'center', lineHeight: 1.3 }}>
            {card.en}
          </p>
          <span style={{ fontSize: 11, color: 'var(--ink-tertiary)', marginTop: 12 }}>點擊翻轉</span>
        </div>

        {/* Back — Chinese */}
        <div
          style={{
            position: 'absolute', inset: 0,
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            background: 'linear-gradient(145deg, var(--sage-500), var(--sage-700))',
            boxShadow: 'var(--shadow-elevated)',
            borderRadius: '12px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '16px',
          }}
        >
          <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)', marginBottom: 8 }}>
            中文官方譯名
          </span>
          <p style={{ fontFamily: 'Fraunces, serif', fontSize: 22, fontWeight: 500, color: '#FAF4EE', textAlign: 'center', lineHeight: 1.3 }}>
            {card.zh}
          </p>
          <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', marginTop: 8 }}>{card.en}</p>
        </div>
      </div>
    </div>
  );
}

export default function Flashcards() {
  const dispatch = useQuizDispatch();
  const [filter, setFilter] = useState('');

  const filtered = FLASHCARDS.filter(c =>
    c.en.toLowerCase().includes(filter.toLowerCase()) ||
    c.zh.includes(filter)
  );

  return (
    <div className="min-h-screen px-4 py-6" style={{ background: 'var(--surface-canvas)' }}>
      <div className="max-w-xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <button className="btn-ghost" onClick={() => dispatch({ type: 'RESET' })}>← 返回</button>
          <span className="pill">術語閃卡</span>
        </div>

        <div className="mb-6">
          <h1 style={{ fontFamily: 'Fraunces, serif', fontSize: 28, fontWeight: 500, color: 'var(--ink-primary)', marginBottom: 4 }}>
            動作術語
          </h1>
          <p style={{ fontSize: 13, color: 'var(--ink-secondary)' }}>點擊卡片翻轉，查看中文官方譯名</p>
        </div>

        {/* Search */}
        <div className="mb-5">
          <input
            type="text"
            placeholder="搜尋動作名稱..."
            value={filter}
            onChange={e => setFilter(e.target.value)}
            style={{
              width: '100%', padding: '10px 14px', borderRadius: 8, border: 'none',
              background: 'var(--surface-base)', boxShadow: 'var(--shadow-inner-soft)',
              fontFamily: 'inherit', fontSize: 13, color: 'var(--ink-primary)', outline: 'none',
            }}
          />
        </div>

        {/* Count */}
        <p style={{ fontSize: 11, color: 'var(--ink-tertiary)', marginBottom: 16, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
          {filtered.length} / {FLASHCARDS.length} 個動作
        </p>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {filtered.map((card, i) => (
            <FlipCard key={card.en} card={card} index={FLASHCARDS.indexOf(card)} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="card-base text-center py-10">
            <p style={{ color: 'var(--ink-tertiary)', fontSize: 13 }}>找不到符合的動作</p>
          </div>
        )}
      </div>
    </div>
  );
}
