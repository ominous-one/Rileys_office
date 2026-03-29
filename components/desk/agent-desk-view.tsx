import { SectionCard } from '@/components/ui/section-card';
import { StatusPill } from '@/components/ui/status-pill';
import type { AgentDesk } from '@/lib/domain/types';

export function AgentDeskView({ desk }: { desk: AgentDesk }) {
  return (
    <main className="page-stack">
      <section className="hero-card">
        <p className="eyebrow">Agent Desk</p>
        <div className="row-between row-start">
          <div>
            <h1>{desk.agent.name}</h1>
            <p className="lede">{desk.agent.role} · {desk.agent.currentTask}</p>
          </div>
          <StatusPill state={desk.agent.status} />
        </div>
      </section>

      <SectionCard title="Current contract" eyebrow="Run context">
        <p>{desk.run.summary}</p>
        <p className="muted">{desk.run.progressLabel}</p>
      </SectionCard>

      <SectionCard title="Evidence stack" eyebrow="Artifacts">
        <div className="list-stack">
          {desk.evidence.map((item) => (
            <article key={item.id} className="list-card">
              <strong>{item.label}</strong>
              <p className="muted">{item.path}</p>
              <p>Status: {item.status}</p>
            </article>
          ))}
        </div>
      </SectionCard>

      <SectionCard title="Conversation" eyebrow="Chat">
        <article className="list-card">
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
