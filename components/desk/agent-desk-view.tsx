import { SectionCard } from '@/components/ui/section-card';
import { StatusPill } from '@/components/ui/status-pill';
import type { AgentDesk } from '@/lib/domain/types';

export function AgentDeskView({ desk }: { desk: AgentDesk }) {
  return (
    <main className="page-stack page-stack--scene">
      <section className="scene-hero scene-hero--desk">
        <div className="workstation-scene">
          <div className="workstation-scene__surface" aria-hidden="true" />
          <div className="workstation-scene__monitor workstation-scene__monitor--main" aria-hidden="true" />
          <div className="workstation-scene__monitor workstation-scene__monitor--side" aria-hidden="true" />
          <div className="workstation-scene__keyboard" aria-hidden="true" />
          <div className="workstation-scene__lamp" aria-hidden="true" />

          <div className="hero-card hero-card--desk scene-panel">
            <div className="hero-card__backdrop" />
            <div className="hero-card__eyebrow-row">
              <p className="eyebrow">Workstation Scene</p>
              <StatusPill state={desk.agent.status} />
            </div>
            <div className="hero-card__headline hero-card__headline--split">
              <div>
                <h1>{desk.agent.name}</h1>
                <p className="lede">{desk.agent.role} station tuned like a playable setup: primary monitor, evidence shelf, side channel, and governed controls within thumb reach.</p>
              </div>
              <div className="hero-card__spotlight">
                <span className="hero-card__spotlight-label">Focused task</span>
                <strong>{desk.agent.currentTask}</strong>
                <span>{desk.run.progressLabel}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SectionCard title="Run surface" eyebrow="Active contract" tone="accent">
        <div className="desk-summary-grid desk-summary-grid--scene">
          <article className="metric-tile metric-tile--compact metric-tile--scene">
            <span className="metric-tile__label">Run summary</span>
            <strong>{desk.run.summary}</strong>
          </article>
          <article className="metric-tile metric-tile--compact metric-tile--scene">
            <span className="metric-tile__label">Updated</span>
            <strong>{desk.run.updatedAt}</strong>
          </article>
        </div>
      </SectionCard>

      <SectionCard title="Evidence shelf" eyebrow="Pinned beside the monitor">
        <div className="list-stack">
          {desk.evidence.map((item, index) => (
            <article key={item.id} className="list-card list-card--interactive evidence-card" style={{ ['--artifact-rotate' as string]: `${index % 3}` }}>
              <div className="row-between row-start">
                <strong>{item.label}</strong>
                <span className="list-card__meta">{item.status.replace('_', ' ')}</span>
              </div>
              <p className="muted">{item.path}</p>
            </article>
          ))}
        </div>
      </SectionCard>

      <SectionCard title="Side-channel display" eyebrow="Conversation rail" tone="glass">
        <article className="list-card list-card--soft conversation-card">
          <strong>{desk.conversation.title}</strong>
          <p>{desk.conversation.latestMessage}</p>
          <span className="timestamp">{desk.conversation.updatedAt}</span>
        </article>
      </SectionCard>

      <SectionCard title="Macro row" eyebrow="Governed controls">
        <div className="action-row action-row--scene">
          {desk.actions.map((action) => (
            <button key={action.id} className="action-chip action-chip--scene" disabled={action.locked}>
              {action.label}
            </button>
          ))}
        </div>
      </SectionCard>
    </main>
  );
}
