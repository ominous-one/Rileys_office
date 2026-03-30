export function AppShell({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="app-shell">
      <div className="app-shell__frame" aria-hidden="true" />
      <div className="app-shell__horizon" aria-hidden="true" />
      <div className="app-shell__grid" aria-hidden="true" />
      <div className="app-shell__ambient app-shell__ambient--violet" aria-hidden="true" />
      <div className="app-shell__ambient app-shell__ambient--cyan" aria-hidden="true" />
      <div className="app-shell__ambient app-shell__ambient--gold" aria-hidden="true" />
      <div className="app-shell__content">{children}</div>
    </div>
  );
}
