export function SectionCard({ title, eyebrow, children }: Readonly<{ title: string; eyebrow?: string; children: React.ReactNode }>) {
  return (
    <section className="section-card">
      {eyebrow ? <p className="section-card__eyebrow">{eyebrow}</p> : null}
      <div className="section-card__header">
        <h2>{title}</h2>
      </div>
      {children}
    </section>
  );
}
