import { SectionCard } from '@/components/ui/section-card';
import { StatusPill } from '@/components/ui/status-pill';
import type { AgentDesk } from '@/lib/domain/types';

export function AgentDeskView({ desk }: { desk: AgentDesk }) {
  return (
    <main className="page-stack">
      <section className="hero-card hero-card--desk">
        <div className="hero-card__backdrop" />
        <div className="hero-card__eyebrow-row">
          <p className="eyebrow">Agent Desk</p>
          <StatusPill state={desk.agent.status} />
        </div>
        <div className="hero-card__headline">
          <div>
            <h1>{desk.agent.name}</h1>
            <p className="lede">{desk.agent.role} station configured for focused execution, governed actions, and artifact review.</p>
          </div>
          <div className="hero-card__spotlight">
            <span className="hero-card__spotlight-label">Current task</span>
            <strong>{desk.agent.currentTask}</strong>
            <span>{desk.run.progressLabel}</span>
          </div>
        </div>
      </section>

      <SectionCard title="Current contract" eyebrow="Run context" tone="accent">
        <div className="desk-summary-grid">
          <article className="metric-tile metric-tile--compact">
            <span className="metric-tile__label">Run summary</span>
            <strong>{desk.run.summary}</strong>
          </article>
          <article className="metric-tile metric-tile--compact">
            <span className="metric-tile__label">Updated</span>
            <strong>{desk.run.updatedAt}</strong>
          </article>
        </div>
      </SectionCard>

      <SectionCard title="Evidence stack" eyebrow="Delivery shelf">
        <div className="list-stack">
          {desk.evidence.map((item) => (
            <article key={item.id} className="list-card list-card--interactive">
              <div className="row-between row-start">
                <strong>{item.label}</strong>
                <span className="list-card__meta">{item.status.replace('_', ' ')}</span>
              </div>
              <p className="muted">{item.path}</p>
            </article>
          ))}
        </div>
      </SectionCard>

      <SectionCard title="Conversation rail" eyebrow="Thread focus" tone="glass">
        <article className="list-card list-card--soft">
          <strong>{desk.conversation.title}</strong>
          <p>{desk.conversation.latestMessage}</p>
          <span className="timestamp">{desk.conversation.updatedAt}</span>
        </article>
      </SectionCard>

      <SectionCard title="Quick actions" eyebrow="Governed controls">
        <div className="action-row">
          {desk.actions.map((action) => (
            <button key={action.id} className="action-chip" disabled={action.locked}>
              {action.label}
            </button>
          ))}
        </div>
      </SectionCard>
    </main>
  );
}
