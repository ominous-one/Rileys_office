import Link from 'next/link';
import { SectionCard } from '@/components/ui/section-card';
import { StatusPill } from '@/components/ui/status-pill';
import type { OfficeSnapshot } from '@/lib/domain/types';

export function OfficeOverview({ snapshot }: { snapshot: OfficeSnapshot }) {
  const connection = snapshot?.connection ?? {
    mode: 'mock',
    state: 'degraded',
    lastUpdated: 'unknown',
  };
  const projects = Array.isArray(snapshot?.projects) ? snapshot.projects : [];
  const alerts = Array.isArray(snapshot?.alerts) ? snapshot.alerts : [];
  const activity = Array.isArray(snapshot?.activity) ? snapshot.activity : [];
  const agents = projects.flatMap((project) => (Array.isArray(project?.agents) ? project.agents : []));

  return (
    <main className="page-stack">
      <section className="hero-card hero-card--office">
        <div>
          <p className="eyebrow">Office Lobby</p>
          <h1>Riley&apos;s Office</h1>
          <p className="lede">See project health, agent presence, blockers, and live activity in one iPhone-first control surface.</p>
        </div>
        <div className="hero-meta">
          <span className={`connection connection--${connection.state}`}>{connection.mode} · {connection.state}</span>
          <span className="timestamp">Updated {connection.lastUpdated}</span>
        </div>
      </section>

      <SectionCard title="Project corridor" eyebrow="Projects">
        <div className="card-grid">
          {projects.map((project) => (
            <Link key={project.id} href={`/projects/${project.id}`} className="project-card" style={{ ['--accent' as string]: project.accent }}>
              <div className="row-between">
                <h3>{project.name}</h3>
                <StatusPill state={project.health} />
              </div>
              <p>{project.tagline}</p>
              <p className="muted">{project.activeRun.progressLabel}</p>
            </Link>
          ))}
          {projects.length === 0 ? <article className="list-card"><strong>No projects available</strong><p>Snapshot data is empty or still loading.</p></article> : null}
        </div>
      </SectionCard>

      <SectionCard title="Agent presence" eyebrow="Desks">
        <div className="list-stack">
          {agents.map((agent) => (
            <Link key={agent.id} href={`/agents/${agent.id}`} className="list-card">
              <div className="row-between">
                <div>
                  <strong>{agent.name}</strong>
                  <p className="muted">{agent.role}</p>
                </div>
                <StatusPill state={agent.status} />
              </div>
              <p>{agent.currentTask}</p>
            </Link>
          ))}
          {agents.length === 0 ? <article className="list-card"><strong>No active agents</strong><p>Agent presence will appear once snapshot data is available.</p></article> : null}
        </div>
      </SectionCard>

      <SectionCard title="Priority alerts" eyebrow="Blockers">
        <div className="list-stack">
          {alerts.map((alert) => (
            <article key={alert.id} className={`alert-card alert-card--${alert.level}`}>
              <strong>{alert.title}</strong>
              <p>{alert.detail}</p>
            </article>
          ))}
          {alerts.length === 0 ? <article className="list-card"><strong>No active alerts</strong><p>The office is clear right now.</p></article> : null}
        </div>
      </SectionCard>

      <SectionCard title="Activity preview" eyebrow="Live feed">
        <div className="list-stack">
          {activity.map((event) => (
            <article key={event.id} className="timeline-item">
              <strong>{event.label}</strong>
              <p>{event.detail}</p>
              <span className="timestamp">{event.timestamp}</span>
            </article>
          ))}
          {activity.length === 0 ? <article className="list-card"><strong>No activity yet</strong><p>Live events will appear here when the feed is available.</p></article> : null}
        </div>
      </SectionCard>
    </main>
  );
}
