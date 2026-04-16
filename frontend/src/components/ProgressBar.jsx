export default function ProgressBar({ current, total, correct }) {
  const pct = Math.round((current / total) * 100);
  return (
    <div className="space-y-1.5">
      <div className="flex justify-between text-[11px] font-semibold uppercase tracking-wide" style={{ color: 'var(--ink-tertiary)' }}>
        <span>第 {current} / {total} 題</span>
        <span style={{ color: 'var(--sage-700)' }}>✓ {correct} 正確</span>
      </div>
      <div className="h-2 rounded-full overflow-hidden" style={{ background: 'var(--surface-sunken)', boxShadow: 'var(--shadow-inner-soft)' }}>
        <div
          className="h-full rounded-full"
          style={{
            width: `${pct}%`,
            background: `linear-gradient(90deg, var(--sage-500), var(--sage-300))`,
            boxShadow: '2px 0 8px rgba(110,132,86,0.4)',
            transition: 'width 400ms cubic-bezier(0.4,0,0.2,1)',
          }}
        />
      </div>
    </div>
  );
}
