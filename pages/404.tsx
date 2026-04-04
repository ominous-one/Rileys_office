export default function NotFoundPage() {
  return (
    <main style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', background: '#0f172a', color: '#e2e8f0', padding: '24px', fontFamily: 'Arial, sans-serif' }}>
      <section style={{ width: 'min(92vw, 560px)', border: '1px solid #334155', borderRadius: '16px', padding: '24px', background: '#111827' }}>
        <p style={{ margin: '0 0 8px', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.08em', fontSize: '12px' }}>404</p>
        <h1 style={{ margin: '0 0 12px', fontSize: '28px' }}>Page not found</h1>
        <p style={{ margin: 0, lineHeight: 1.6 }}>Riley&apos;s_Office could not find the requested route. Check the URL or return to the main workspace.</p>
      </section>
    </main>
  );
}
