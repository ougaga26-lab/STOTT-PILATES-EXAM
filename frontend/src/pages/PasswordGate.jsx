import { useState } from 'react';

export default function PasswordGate({ onUnlock }) {
  const [value, setValue] = useState('');
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    if (value.trim().toUpperCase() === 'SCTA') {
      sessionStorage.setItem('app_key', value.trim().toUpperCase());
      onUnlock();
    } else {
      setError(true);
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'var(--surface-canvas)',
      padding: '24px',
    }}>
      <div style={{
        background: 'var(--surface-raised)',
        borderRadius: 16,
        padding: '36px 32px',
        width: '100%',
        maxWidth: 360,
        boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
        animation: shake ? 'shake 0.4s ease' : 'none',
      }}>
        <h1 style={{
          fontFamily: 'Fraunces, serif',
          fontSize: 24,
          fontWeight: 500,
          color: 'var(--ink-primary)',
          margin: '0 0 4px',
        }}>
          STOTT PILATES
        </h1>
        <p style={{ fontSize: 13, color: 'var(--ink-secondary)', margin: '0 0 28px' }}>
          AI備考小工具
        </p>

        <form onSubmit={handleSubmit}>
          <label style={{ fontSize: 12, fontWeight: 600, color: 'var(--ink-secondary)', display: 'block', marginBottom: 8 }}>
            訪問密碼
          </label>
          <input
            autoFocus
            type="password"
            value={value}
            onChange={e => { setValue(e.target.value); setError(false); }}
            placeholder="請輸入密碼"
            style={{
              width: '100%',
              padding: '10px 14px',
              borderRadius: 8,
              border: `1.5px solid ${error ? 'var(--clay-500)' : 'var(--stroke-soft)'}`,
              background: 'var(--surface-base)',
              fontSize: 14,
              color: 'var(--ink-primary)',
              outline: 'none',
              boxSizing: 'border-box',
              transition: 'border-color 150ms',
            }}
          />
          {error && (
            <p style={{ fontSize: 12, color: 'var(--clay-500)', marginTop: 6, marginBottom: 0 }}>
              密碼錯誤，請再試一次
            </p>
          )}
          <button
            type="submit"
            style={{
              marginTop: 16,
              width: '100%',
              padding: '10px',
              borderRadius: 8,
              border: 'none',
              background: 'var(--sage-500)',
              color: '#fff',
              fontSize: 14,
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'opacity 150ms',
            }}
            onMouseEnter={e => { e.currentTarget.style.opacity = '0.85'; }}
            onMouseLeave={e => { e.currentTarget.style.opacity = '1'; }}
          >
            進入
          </button>
        </form>
      </div>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20%       { transform: translateX(-8px); }
          40%       { transform: translateX(8px); }
          60%       { transform: translateX(-6px); }
          80%       { transform: translateX(6px); }
        }
      `}</style>
    </div>
  );
}
