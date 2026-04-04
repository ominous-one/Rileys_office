import { SectionCard } from '@/components/ui/section-card';
import { StatusPill } from '@/components/ui/status-pill';
import type { AgentDesk } from '@/lib/domain/types';

export function AgentDeskView({ desk }: { desk: AgentDesk }) {
  return (
    <main className="page-stack page-stack--scene">
      <section className="scene-hero agent-station-stage">
        <div className="agent-station-stage__shell">
          <div className="agent-station-stage__window" aria-hidden="true" />
          <div className="agent-station-stage__shelf" aria-hidden="true" />
          <div className="agent-station-stage__wall" aria-hidden="true" />
          <div className="agent-station-stage__desk" aria-hidden="true">
            <span className="agent-station-stage__monitor agent-station-stage__monitor--main" />
            <span className="agent-station-stage__monitor agent-station-stage__monitor--side" />
            <span className="agent-station-stage__desk-surface" />
            <span className="agent-station-stage__keyboard" />
            <span className="agent-station-stage__chair" />
            <span className="agent-station-stage__lamp" />
          </div>

          <div className="hero-card hero-card--desk scene-panel workstation-shell">
            <div className="hero-card__backdrop" />
            <div className="hero-card__eyebrow-row">
              <p className="eyebrow">Workstation</p>
              <StatusPill state={desk.agent.status} />
            </div>
            <div className="hero-card__headline hero-card__headline--split">
              <div>
                <h1>{desk.agent.name}</h1>
                <p className="lede">
                  A staffed desk with dual screens, side shelf, and conversation rail so the operator reads like a person inhabiting the office,
                  not a detached profile page.
                </p>
              </div>
              <div className="hero-card__spotlight workstation-shell__spotlight">
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

      <SectionCard title="Evidence shelf" eyebrow="Pinned at the station">
        <div className="list-stack">
          {desk.evidence.map((item, index) => (
            <article key={item.id} className="list-card list-card--interactive evidence-card evidence-card--office" style={{ ['--artifact-rotate' as string]: `${index % 3}` }}>
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
        <article className="list-card list-card--soft conversation-card conversation-card--office">
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
