import Link from 'next/link';
import { SectionCard } from '@/components/ui/section-card';
import { StatusPill } from '@/components/ui/status-pill';
import type { ProjectOffice } from '@/lib/domain/types';
import { getReadOnlyGuardMessage } from '@/lib/actions/governed-actions';

export function ProjectOfficeView({ office }: { office: ProjectOffice }) {
  return (
    <main className="page-stack page-stack--scene">
      <section className="scene-hero scene-hero--project">
        <div className="scene-room scene-room--project" style={{ ['--accent' as string]: office.project.accent }}>
          <div className="scene-room__wall scene-room__wall--back" aria-hidden="true" />
          <div className="scene-room__wall scene-room__wall--side" aria-hidden="true" />
          <div className="scene-room__floor" aria-hidden="true" />

          <div className="hero-card hero-card--project scene-panel" style={{ ['--accent' as string]: office.project.accent }}>
            <div className="hero-card__backdrop" />
            <div className="hero-card__eyebrow-row">
              <p className="eyebrow">Project Room</p>
              <StatusPill state={office.project.health} />
            </div>
            <div className="hero-card__headline hero-card__headline--split">
              <div>
                <h1>{office.project.name}</h1>
                <p className="lede">{office.project.mission}</p>
              </div>
              <div className="hero-card__spotlight">
                <span className="hero-card__spotlight-label">Room pressure</span>
                <strong>{office.project.urgency} urgency</strong>
                <span>{office.project.activeRun.progressLabel}</span>
              </div>
            </div>
            <div className="project-hero-grid project-hero-grid--scene">
              <article className="metric-tile metric-tile--compact metric-tile--scene">
                <span className="metric-tile__label">Run brief</span>
                <strong>{office.project.activeRun.summary}</strong>
              </article>
              <article className="metric-tile metric-tile--compact metric-tile--scene">
                <span className="metric-tile__label">Room mood</span>
                <strong>{office.project.tagline}</strong>
              </article>
            </div>
          </div>

          <div className="scene-room__props" aria-hidden="true">
            <span className="scene-prop scene-prop--table" />
            <span className="scene-prop scene-prop--screen" />
            <span className="scene-prop scene-prop--plant" />
          </div>
        </div>
      </section>

      <SectionCard title="Room blueprint" eyebrow="Spatial zones" tone="accent">
        <div className="room-map-grid">
          {office.rooms.map((room, index) => (
            <article key={room.id} className="room-card room-card--scene" style={{ ['--room-tilt' as string]: `${index}` }}>
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

      <SectionCard title="Workstations" eyebrow="Assigned operators">
        <div className="list-stack">
          {office.project.agents.map((agent, index) => (
            <Link
              key={agent.id}
              href={`/agents/${agent.id}`}
              className="list-card list-card--interactive workstation-card"
              style={{ ['--desk-accent' as string]: index % 2 === 0 ? office.project.accent : '#63d5ff' }}
            >
              <div className="workstation-card__monitor" aria-hidden="true" />
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

      <SectionCard title="Delivery wall" eyebrow="Pinned artifacts" tone="glass">
        <div className="delivery-wall">
          {office.artifacts.map((artifact, index) => (
            <article key={artifact.id} className="list-card list-card--soft artifact-panel" style={{ ['--artifact-rotate' as string]: `${index % 3}` }}>
              <div className="row-between row-start">
                <strong>{artifact.label}</strong>
                <span className="list-card__meta">{artifact.status.replace('_', ' ')}</span>
              </div>
              <p className="muted">{artifact.path}</p>
            </article>
          ))}
        </div>
      </SectionCard>

      <SectionCard title="Governed console" eyebrow="Read-only control rail">
        <p className="muted">{getReadOnlyGuardMessage()}</p>
        <div className="action-row action-row--scene">
          {office.actions.map((action) => (
            <button key={action.id} className="action-chip action-chip--scene" disabled>
              {action.label}
            </button>
          ))}
        </div>
      </SectionCard>
    </main>
  );
}