function PrincipleBadge({ principle }) {
  // Handle both string format "呼吸 (Breathing)" and legacy object format
  const display = typeof principle === 'string' ? principle : `${principle.name}${principle.zh ? ` ${principle.zh}` : ''}`;
  return (
    <div className="rounded-card p-3" style={{ background: 'var(--sage-100)', boxShadow: 'var(--shadow-inner-soft)' }}>
      <p className="text-[12px] font-semibold" style={{ color: 'var(--sage-ink)' }}>{display}</p>
      {typeof principle === 'object' && principle.relevance && (
        <p className="text-[11px] mt-1 leading-relaxed" style={{ color: 'var(--ink-secondary)' }}>{principle.relevance}</p>
      )}
    </div>
  );
}

function AnatomyTag({ item }) {
  return (
    <div className="rounded-card p-3" style={{ background: 'var(--surface-base)', boxShadow: 'var(--shadow-inner-soft)', borderLeft: '2px solid var(--clay-300)' }}>
      <p className="text-[12px] font-semibold" style={{ color: 'var(--clay-700)' }}>{item.term}</p>
      <p className="text-[12px] leading-relaxed mt-0.5" style={{ color: 'var(--ink-secondary)' }}>{item.role}</p>
    </div>
  );
}

export default function RationalePanel({ rationale }) {
  return (
    <div className="rounded-card p-5 space-y-4" style={{ background: 'var(--surface-raised)', boxShadow: 'var(--shadow-elevated)' }}>
      {/* Explanation */}
      <div>
        <p className="section-label">解析</p>
        <p className="text-[13px] leading-relaxed" style={{ color: 'var(--ink-secondary)' }}>{rationale.explanation}</p>
      </div>

      {/* Principles */}
      {rationale.principles?.length > 0 && (
        <div>
          <p className="section-label">五大原則對應</p>
          <div className="flex flex-wrap gap-2">
            {rationale.principles.map((p, i) => <PrincipleBadge key={i} principle={p} />)}
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
