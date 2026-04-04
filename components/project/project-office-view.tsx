import Link from 'next/link';
import { SectionCard } from '@/components/ui/section-card';
import { StatusPill } from '@/components/ui/status-pill';
import type { ProjectOffice } from '@/lib/domain/types';
import { getReadOnlyGuardMessage } from '@/lib/actions/governed-actions';

function getRoomAccent(index: number, accent: string) {
  return index % 2 === 0 ? accent : '#63d5ff';
}

export function ProjectOfficeView({ office }: { office: ProjectOffice }) {
  return (
    <main className="page-stack page-stack--scene">
      <section className="scene-hero project-suite-stage" style={{ ['--accent' as string]: office.project.accent }}>
        <div className="project-suite-stage__shell">
          <div className="project-suite-stage__windowband" aria-hidden="true" />
          <div className="project-suite-stage__ceiling" aria-hidden="true" />
          <div className="project-suite-stage__sidewall project-suite-stage__sidewall--left" aria-hidden="true" />
          <div className="project-suite-stage__sidewall project-suite-stage__sidewall--right" aria-hidden="true" />
          <div className="project-suite-stage__floor project-suite-stage__floor--stone" aria-hidden="true" />
          <div className="project-suite-stage__floor project-suite-stage__floor--rug" aria-hidden="true" />
          <div className="project-suite-stage__command-desk" aria-hidden="true">
            <span className="project-suite-stage__desk-screen" />
            <span className="project-suite-stage__desk-chair" />
          </div>
          <div className="project-suite-stage__bench-row" aria-hidden="true">
            {office.project.agents.slice(0, 4).map((agent, index) => (
              <span key={agent.id} className="project-suite-stage__bench" style={{ ['--bench-accent' as string]: getRoomAccent(index, office.project.accent), ['--bench-index' as string]: `${index}` }} />
            ))}
          </div>
          <div className="project-suite-stage__glass-room" aria-hidden="true">
            <span className="project-suite-stage__glass-table" />
            <span className="project-suite-stage__glass-display" />
          </div>
          <div className="project-suite-stage__artifact-wall" aria-hidden="true" />

          <div className="hero-card hero-card--project scene-panel project-suite-shell" style={{ ['--accent' as string]: office.project.accent }}>
            <div className="hero-card__backdrop" />
            <div className="hero-card__eyebrow-row">
              <p className="eyebrow">Project Suite</p>
              <StatusPill state={office.project.health} />
            </div>
            <div className="hero-card__headline hero-card__headline--split">
              <div>
                <h1>{office.project.name}</h1>
                <p className="lede">
                  A furnished executive project room with window edge, meeting glass, desk neighborhood, and delivery wall so the work
                  reads as a real office suite instead of a dashboard panel.
                </p>
              </div>
              <div className="hero-card__spotlight project-suite-shell__spotlight">
                <span className="hero-card__spotlight-label">Current run</span>
                <strong>{office.project.activeRun.progressLabel}</strong>
                <span>{office.project.activeRun.summary}</span>
              </div>
            </div>
            <div className="project-hero-grid project-hero-grid--scene">
              <article className="metric-tile metric-tile--compact metric-tile--scene project-suite-shell__metric">
                <span className="metric-tile__label">Mission</span>
                <strong>{office.project.mission}</strong>
              </article>
              <article className="metric-tile metric-tile--compact metric-tile--scene project-suite-shell__metric">
                <span className="metric-tile__label">Tone</span>
                <strong>{office.project.tagline}</strong>
              </article>
            </div>
          </div>
        </div>
      </section>

      <SectionCard title="Suite zones" eyebrow="Architecture and purpose" tone="accent">
        <div className="room-map-grid">
          {office.rooms.map((room, index) => (
            <article key={room.id} className="room-card room-card--scene suite-zone-card" style={{ ['--zone-accent' as string]: getRoomAccent(index, office.project.accent) }}>
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

      <SectionCard title="Workstation row" eyebrow="Operators in-room">
        <div className="list-stack">
          {office.project.agents.map((agent, index) => (
            <Link
              key={agent.id}
              href={`/agents/${agent.id}`}
              className="list-card list-card--interactive workstation-card workstation-card--office"
              style={{ ['--desk-accent' as string]: getRoomAccent(index, office.project.accent) }}
            >
              <div className="workstation-card__furniture" aria-hidden="true">
                <span className="workstation-card__monitor" />
                <span className="workstation-card__surface" />
                <span className="workstation-card__chair" />
              </div>
              <div className="row-between row-start">
                <div>
                  <strong>{agent.name}</strong>
                  <p className="muted">{agent.role}</p>
                </div>
                <StatusPill state={agent.status} />
              </div>
              <p>{agent.status === 'blocked' ? agent.blocker ?? agent.currentTask : agent.currentTask}</p>
            </Link>
          ))}
        </div>
      </SectionCard>

      <SectionCard title="Delivery wall" eyebrow="Pinned artifacts" tone="glass">
        <div className="delivery-wall">
          {office.artifacts.map((artifact, index) => (
            <article key={artifact.id} className="list-card list-card--soft artifact-panel artifact-panel--office" style={{ ['--artifact-rotate' as string]: `${index % 3}` }}>
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
