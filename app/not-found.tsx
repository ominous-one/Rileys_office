export default function AppNotFound() {
  return (
    <main style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', background: '#0f172a', color: '#e2e8f0', padding: '24px', fontFamily: 'Arial, sans-serif' }}>
      <section style={{ width: 'min(92vw, 560px)', border: '1px solid #334155', borderRadius: '16px', padding: '24px', background: '#111827' }}>
        <p style={{ margin: '0 0 8px', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.08em', fontSize: '12px' }}>Not found</p>
        <h1 style={{ margin: '0 0 12px', fontSize: '28px' }}>This room does not exist</h1>
        <p style={{ margin: 0, lineHeight: 1.6 }}>The requested project or agent route did not resolve. Verify the route parameter and snapshot data.</p>
      </section>
    </main>
  );
}
