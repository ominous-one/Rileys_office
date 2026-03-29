import { SectionCard } from '@/components/ui/section-card';
import type { ActivityEvent } from '@/lib/domain/types';

export function ActivityPageView({ events }: { events: ActivityEvent[] }) {
  return (
    <main className="page-stack">
      <section className="hero-card">
        <p className="eyebrow">Activity</p>
        <h1>Live timeline</h1>
        <p className="lede">Follow runs, agents, QA, reviewer state, and alerts in one scrolling feed.</p>
      </section>

      <SectionCard title="Feed" eyebrow="All events">
        <div className="filter-row">
          {['all', 'runs', 'agents', 'QA', 'reviewer', 'alerts'].map((label) => (
            <span key={label} className="filter-chip">{label}</span>
          ))}
        </div>
        <div className="list-stack">
          {events.map((event) => (
            <article key={event.id} className="timeline-item">
              <strong>{event.label}</strong>
              <p>{event.detail}</p>
              <span className="timestamp">{event.timestamp}</span>
            </article>
          ))}
        </div>
      </SectionCard>
    </main>
  );
}
