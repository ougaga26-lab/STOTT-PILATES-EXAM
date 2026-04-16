import { useState } from 'react';
import { loadHistory } from '../services/history.js';
import Footer from '../components/Footer.jsx';

function formatDate(iso) {
  const d = new Date(iso);
  return `${d.getFullYear()}/${String(d.getMonth() + 1).padStart(2, '0')}/${String(d.getDate()).padStart(2, '0')}`;
}

export default function HistoryList({ onBack, onDetail }) {
  const [records] = useState(() => loadHistory());

  return (
    <div className="min-h-screen px-4 py-10" style={{ background: 'var(--surface-canvas)' }}>
      <div className="max-w-xl mx-auto space-y-6">
        <header className="flex items-center gap-3">
          <button
            onClick={onBack}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--ink-secondary)', fontSize: 13, padding: 0 }}
          >
            ← 返回
          </button>
          <h1 style={{ fontFamily: 'Fraunces, serif', fontSize: 24, fontWeight: 500, color: 'var(--ink-primary)', margin: 0 }}>
            練習記錄
          </h1>
        </header>

        {records.length === 0 ? (
          <div className="card-base text-center">
            <p className="text-[13px]" style={{ color: 'var(--ink-tertiary)' }}>尚無練習記錄</p>
          </div>
        ) : (
          <div className="space-y-2.5">
            {records.map(r => (
              <button
                key={r.id}
                className="w-full text-left card-base"
                style={{ cursor: 'pointer', border: 'none' }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow = 'var(--shadow-raised)'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = ''; e.currentTarget.style.transform = 'translateY(0)'; }}
                onClick={() => onDetail(r)}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[13px] font-medium" style={{ color: 'var(--ink-primary)' }}>
                    {r.categoryLabel}
                  </span>
                  <span className="text-[12px]" style={{ color: 'var(--ink-tertiary)' }}>
                    {formatDate(r.date)}
                  </span>
                </div>
                <div className="mt-1 flex items-center gap-2">
                  <span className="text-[20px] font-medium" style={{ fontFamily: 'Fraunces, serif', color: 'var(--ink-primary)' }}>
                    {r.percentage}%
                  </span>
                  <span className="text-[12px]" style={{ color: 'var(--ink-tertiary)' }}>
                    {r.score.correct} / {r.score.total} 題
                  </span>
                </div>
              </button>
            ))}
          </div>
        )}

        <Footer />
      </div>
    </div>
  );
}
