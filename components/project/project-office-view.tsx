import Link from 'next/link';
import { SectionCard } from '@/components/ui/section-card';
import { StatusPill } from '@/components/ui/status-pill';
import type { ProjectOffice } from '@/lib/domain/types';
import { getReadOnlyGuardMessage } from '@/lib/actions/governed-actions';

export function ProjectOfficeView({ office }: { office: ProjectOffice }) {
  return (
    <main className="page-stack">
      <section className="hero-card" style={{ ['--accent' as string]: office.project.accent }}>
        <p className="eyebrow">Project Office</p>
        <div className="row-between row-start">
          <div>
            <h1>{office.project.name}</h1>
            <p className="lede">{office.project.mission}</p>
          </div>
          <StatusPill state={office.project.health} />
        </div>
        <div className="hero-subgrid">
          <div>
            <span className="label">Active run</span>
            <p>{office.project.activeRun.summary}</p>
          </div>
          <div>
            <span className="label">Urgency</span>
            <p>{office.project.urgency}</p>
          </div>
        </div>
      </section>

      <SectionCard title="Room map" eyebrow="Spatial view">
        <div className="card-grid">
          {office.rooms.map((room) => (
            <article key={room.id} className="room-card">
              <div className="row-between">
                <h3>{room.name}</h3>
                <StatusPill state={room.state} />
              </div>
              <p>{room.purpose}</p>
            </article>
          ))}
        </div>
      </SectionCard>

      <SectionCard title="Agent desks" eyebrow="Team floor">
        <div className="list-stack">
          {office.project.agents.map((agent) => (
            <Link key={agent.id} href={`/agents/${agent.id}`} className="list-card">
              <div className="row-between">
                <strong>{agent.name}</strong>
                <StatusPill state={agent.status} />
              </div>
              <p>{agent.currentTask}</p>
            </Link>
          ))}
        </div>
      </SectionCard>

      <SectionCard title="Delivery wall" eyebrow="Artifacts">
        <div className="list-stack">
          {office.artifacts.map((artifact) => (
            <article key={artifact.id} className="list-card">
              <strong>{artifact.label}</strong>
              <p className="muted">{artifact.path}</p>
              <p>Status: {artifact.status}</p>
            </article>
          ))}
        </div>
      </SectionCard>

      <SectionCard title="Governed actions" eyebrow="Read-mostly">
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
