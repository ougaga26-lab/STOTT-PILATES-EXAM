import { PRINCIPLES } from '../constants/categories.js';

function PrincipleBadge({ principle }) {
  const def = PRINCIPLES.find(p => p.id === principle.id);
  return (
    <div className="rounded-card p-3.5" style={{ background: 'var(--sage-100)', boxShadow: 'var(--shadow-inner-soft)' }}>
      <div className="flex items-center gap-2 mb-1">
        <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: 'var(--sage-700)' }}>
          原則 {principle.id}
        </span>
        <span className="text-[11px]" style={{ color: 'var(--ink-tertiary)' }}>{def?.zh}</span>
      </div>
      <p className="text-[12px] font-semibold" style={{ color: 'var(--sage-ink)' }}>{principle.name}</p>
      <p className="text-[12px] leading-relaxed mt-1" style={{ color: 'var(--ink-secondary)' }}>{principle.relevance}</p>
    </div>
  );
}

function AnatomyTag({ item }) {
  return (
    <div className="rounded-card p-3.5" style={{ background: 'var(--surface-base)', boxShadow: 'var(--shadow-inner-soft)', borderLeft: '2px solid var(--clay-300)' }}>
      <p className="text-[12px] font-semibold" style={{ color: 'var(--clay-700)' }}>{item.term}</p>
      <p className="text-[12px] leading-relaxed mt-0.5" style={{ color: 'var(--ink-secondary)' }}>{item.role}</p>
    </div>
  );
}

export default function RationalePanel({ rationale }) {
  return (
    <div className="rounded-card p-5 space-y-5" style={{ background: 'var(--surface-raised)', boxShadow: 'var(--shadow-elevated)' }}>
      {/* Explanation */}
      <div>
        <p className="section-label">📖 解析</p>
        <p className="text-[13px] leading-relaxed" style={{ color: 'var(--ink-secondary)' }}>{rationale.explanation}</p>
      </div>

      {/* Principles */}
      {rationale.principles?.length > 0 && (
        <div>
          <p className="section-label">五大原則對應</p>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {rationale.principles.map(p => <PrincipleBadge key={p.id} principle={p} />)}
          </div>
        </div>
      )}

      {/* Anatomy */}
      {rationale.anatomy?.length > 0 && (
        <div>
          <p className="section-label">解剖學重點</p>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {rationale.anatomy.map(a => <AnatomyTag key={a.term} item={a} />)}
          </div>
        </div>
      )}
    </div>
  );
}
