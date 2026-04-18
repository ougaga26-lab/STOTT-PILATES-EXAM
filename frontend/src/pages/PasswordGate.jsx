import { useState } from 'react';

const API_BASE = import.meta.env.VITE_WORKER_URL
  ? `${import.meta.env.VITE_WORKER_URL}/api`
  : '/api';

export default function PasswordGate({ onUnlock }) {
  const [value, setValue] = useState('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [shake, setShake] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    const key = value.trim();
    if (!key) return;

    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/auth`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-App-Key': key },
      });
      if (res.ok) {
        sessionStorage.setItem('app_key', key);
        onUnlock();
      } else {
        setError(true);
        setShake(true);
        setTimeout(() => setShake(false), 500);
      }
    } catch {
      setError(true);
      setShake(true);
      setTimeout(() => setShake(false), 500);
    } finally {
      setLoading(false);
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
            disabled={loading}
            style={{
              width: '100%',
              padding: '10px 14px',
              borderRadius: 8,
              border: `1.5px solid ${error ? 'var(--clay-500)' : 'var(--stroke-soft)'}`,
              background: 'var(--surface-base)',
              fontSize: 16, /* ≥16px prevents iOS Safari auto-zoom on focus */
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
            disabled={loading}
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
              cursor: loading ? 'default' : 'pointer',
              opacity: loading ? 0.6 : 1,
              transition: 'opacity 150ms',
            }}
            onMouseEnter={e => { if (!loading) e.currentTarget.style.opacity = '0.85'; }}
            onMouseLeave={e => { if (!loading) e.currentTarget.style.opacity = '1'; }}
          >
            {loading ? '驗證中…' : '進入'}
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
