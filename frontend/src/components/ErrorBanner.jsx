import { useQuizDispatch } from '../context/QuizContext.jsx';

export default function ErrorBanner({ message }) {
  const dispatch = useQuizDispatch();
  return (
    <div className="rounded-card p-5" style={{ background: 'var(--surface-base)', boxShadow: 'var(--shadow-inner-soft)', borderLeft: '3px solid var(--clay-500)' }}>
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 rounded-btn flex-shrink-0 flex items-center justify-center text-sm"
          style={{ background: 'var(--surface-raised)', boxShadow: 'var(--shadow-raised)', color: 'var(--clay-500)' }}>
          !
        </div>
        <div>
          <p className="font-semibold text-[13px]" style={{ color: 'var(--ink-primary)' }}>發生錯誤</p>
          <p className="text-[13px] mt-1" style={{ color: 'var(--ink-secondary)' }}>{message}</p>
        </div>
      </div>
      <button
        className="btn w-full mt-4"
        style={{ background: 'var(--clay-500)', color: '#FAF4EE' }}
        onClick={() => dispatch({ type: 'RETRY_LOAD' })}
      >
        重試
      </button>
    </div>
  );
}
