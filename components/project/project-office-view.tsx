import Link from 'next/link';
import { SectionCard } from '@/components/ui/section-card';
import { StatusPill } from '@/components/ui/status-pill';
import type { ProjectOffice } from '@/lib/domain/types';
import { getReadOnlyGuardMessage } from '@/lib/actions/governed-actions';

export function ProjectOfficeView({ office }: { office: ProjectOffice }) {
  return (
    <main className="page-stack">
      <section className="hero-card hero-card--project" style={{ ['--accent' as string]: office.project.accent }}>
        <div className="hero-card__backdrop" />
        <div className="hero-card__eyebrow-row">
          <p className="eyebrow">Project Suite</p>
          <StatusPill state={office.project.health} />
        </div>
        <div className="hero-card__headline">
          <div>
            <h1>{office.project.name}</h1>
            <p className="lede">{office.project.mission}</p>
          </div>
          <div className="hero-card__spotlight">
            <span className="hero-card__spotlight-label">Current pressure</span>
            <strong>{office.project.urgency} urgency</strong>
            <span>{office.project.activeRun.progressLabel}</span>
          </div>
        </div>
        <div className="project-hero-grid">
          <article className="metric-tile metric-tile--compact">
            <span className="metric-tile__label">Run brief</span>
            <strong>{office.project.activeRun.summary}</strong>
          </article>
          <article className="metric-tile metric-tile--compact">
            <span className="metric-tile__label">Tagline</span>
            <strong>{office.project.tagline}</strong>
          </article>
        </div>
      </section>

      <SectionCard title="Room map" eyebrow="Spatial floorplan" tone="accent">
        <div className="card-grid">
          {office.rooms.map((room) => (
            <article key={room.id} className="room-card">
              <div className="row-between row-start">
                <div>
                  <span className="room-card__eyebrow">Office zone</span>
                  <h3>{room.name}</h3>
                </div>
                <StatusPill state={room.state} />
              </div>
              <p>{room.purpose}</p>
            </article>
          ))}
        </div>
      </SectionCard>

      <SectionCard title="Desk cluster" eyebrow="Assigned operators">
        <div className="list-stack">
          {office.project.agents.map((agent) => (
            <Link key={agent.id} href={`/agents/${agent.id}`} className="list-card list-card--interactive">
              <div className="row-between row-start">
                <div>
                  <strong>{agent.name}</strong>
                  <p className="muted">{agent.role}</p>
                </div>
                <StatusPill state={agent.status} />
              </div>
              <p>{agent.currentTask}</p>
            </Link>
          ))}
        </div>
      </SectionCard>

      <SectionCard title="Delivery wall" eyebrow="Artifact lane" tone="glass">
        <div className="list-stack">
          {office.artifacts.map((artifact) => (
            <article key={artifact.id} className="list-card list-card--soft">
              <div className="row-between row-start">
                <strong>{artifact.label}</strong>
                <span className="list-card__meta">{artifact.status.replace('_', ' ')}</span>
              </div>
              <p className="muted">{artifact.path}</p>
            </article>
          ))}
        </div>
      </SectionCard>

      <SectionCard title="Governed actions" eyebrow="Read-only console">
        <p className="muted">{getReadOnlyGuardMessage()}</p>
        <div className="action-row">
          {office.actions.map((action) => (
            <button key={action.id} className="action-chip" disabled>
              {action.label}
            </button>
          ))}
        </div>
      </SectionCard>
    </main>
  );
}
