'use client';

export default function AppError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <main style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', background: '#0f172a', color: '#e2e8f0', padding: '24px', fontFamily: 'Arial, sans-serif' }}>
      <section style={{ width: 'min(92vw, 560px)', border: '1px solid #334155', borderRadius: '16px', padding: '24px', background: '#111827' }}>
        <p style={{ margin: '0 0 8px', color: '#fca5a5', textTransform: 'uppercase', letterSpacing: '0.08em', fontSize: '12px' }}>Application error</p>
        <h1 style={{ margin: '0 0 12px', fontSize: '28px' }}>Riley&apos;s_Office could not render this screen</h1>
        <p style={{ margin: '0 0 16px', lineHeight: 1.6 }}>A runtime render failure occurred. This now surfaces as an explicit error state instead of a white page.</p>
        <pre style={{ margin: '0 0 16px', padding: '12px', borderRadius: '12px', background: '#020617', color: '#cbd5e1', overflowX: 'auto', whiteSpace: 'pre-wrap' }}>{error.digest ?? error.message}</pre>
        <button type="button" onClick={reset} style={{ padding: '12px 16px', borderRadius: '10px', border: 0, background: '#8b5cf6', color: '#fff', fontWeight: 700, cursor: 'pointer' }}>Retry</button>
      </section>
    </main>
  );
}
