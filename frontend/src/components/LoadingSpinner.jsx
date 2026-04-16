export default function LoadingSpinner({ message = 'AI 正在出題中...' }) {
  return (
    <div className="flex flex-col items-center justify-center gap-5 py-16">
      <div className="relative w-14 h-14 rounded-full" style={{ background: 'var(--surface-base)', boxShadow: 'var(--shadow-raised)' }}>
        <div className="absolute inset-2 rounded-full" style={{ background: 'var(--surface-canvas)', boxShadow: 'var(--shadow-inner-soft)' }} />
        <div className="absolute inset-2 rounded-full border-2 border-transparent animate-spin"
          style={{ borderTopColor: 'var(--sage-500)', borderRightColor: 'var(--sage-300)' }} />
      </div>
      <div className="text-center">
        <p className="text-[13px] font-semibold" style={{ color: 'var(--ink-secondary)' }}>{message}</p>
        <div className="dot-loader flex gap-1.5 justify-center mt-2">
          <span /><span /><span />
        </div>
      </div>
    </div>
  );
}
