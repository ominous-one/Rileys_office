export function SectionCard({
  title,
  eyebrow,
  children,
  tone = 'default',
}: Readonly<{
  title: string;
  eyebrow?: string;
  children: React.ReactNode;
  tone?: 'default' | 'glass' | 'accent';
}>) {
  return (
    <section className={`section-card section-card--${tone}`}>
      <div className="section-card__topline">
        <div>
          {eyebrow ? <p className="section-card__eyebrow">{eyebrow}</p> : null}
          <div className="section-card__header">
            <h2>{title}</h2>
          </div>
        </div>
        <span className="section-card__halo" aria-hidden="true" />
      </div>
      <div className="section-card__content">{children}</div>
    </section>
  );
}
