export default function ServerErrorPage() {
  return (
    <main style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', background: '#0f172a', color: '#e2e8f0', padding: '24px', fontFamily: 'Arial, sans-serif' }}>
      <section style={{ width: 'min(92vw, 560px)', border: '1px solid #334155', borderRadius: '16px', padding: '24px', background: '#111827' }}>
        <p style={{ margin: '0 0 8px', color: '#fca5a5', textTransform: 'uppercase', letterSpacing: '0.08em', fontSize: '12px' }}>500</p>
        <h1 style={{ margin: '0 0 12px', fontSize: '28px' }}>Workspace error</h1>
        <p style={{ margin: 0, lineHeight: 1.6 }}>The app hit a server-side failure. If this appears on Vercel, check runtime logs and environment configuration instead of treating the blank page as a successful render.</p>
      </section>
    </main>
  );
}
