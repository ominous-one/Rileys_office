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
  const activity = Array.isArray(snapshot?.activity) ? snapshot.activity.slice(0, 4) : [];
  const conversations = Array.isArray(snapshot?.conversations) ? snapshot.conversations.slice(0, 3) : [];
  const agents = projects.flatMap((project) => (Array.isArray(project?.agents) ? project.agents : []));
  const activeCount = agents.filter((agent) => agent.status === 'active').length;

  return (
    <main className="page-stack">
      <section className="hero-card hero-card--office">
        <div className="hero-card__backdrop" />
        <div className="hero-card__eyebrow-row">
          <p className="eyebrow">HQ Lobby</p>
          <span className={`connection connection--${connection.state}`}>{connection.mode} signal · {connection.state}</span>
        </div>

        <div className="hero-card__headline">
          <div>
            <h1>Riley&apos;s Office</h1>
            <p className="lede">
              A premium command-center lobby for navigating projects, desks, delivery pressure, and live execution from an iPhone.
            </p>
          </div>
          <div className="hero-card__spotlight">
            <span className="hero-card__spotlight-label">Lobby pulse</span>
            <strong>{projects.length} rooms online</strong>
            <span>Updated {connection.lastUpdated}</span>
          </div>
        </div>

        <div className="metric-strip">
          <article className="metric-tile">
            <span className="metric-tile__label">Projects</span>
            <strong>{projects.length}</strong>
            <p>Executive corridor</p>
          </article>
          <article className="metric-tile">
            <span className="metric-tile__label">Active desks</span>
            <strong>{activeCount}</strong>
            <p>Agents under load</p>
          </article>
          <article className="metric-tile">
            <span className="metric-tile__label">Priority alerts</span>
            <strong>{alerts.length}</strong>
            <p>Needs operator attention</p>
          </article>
        </div>
      </section>

      <SectionCard title="Project corridor" eyebrow="Executive wing" tone="accent">
        <div className="card-grid card-grid--featured">
          {projects.map((project) => (
            <Link key={project.id} href={`/projects/${project.id}`} className="project-card" style={{ ['--accent' as string]: project.accent }}>
              <div className="project-card__glow" aria-hidden="true" />
              <div className="row-between row-start">
                <div>
                  <span className="project-card__eyebrow">Suite {project.urgency}</span>
                  <h3>{project.name}</h3>
                </div>
                <StatusPill state={project.health} />
              </div>
              <p className="project-card__tagline">{project.tagline}</p>
              <p className="muted">{project.mission}</p>
              <div className="project-card__footer">
                <span>{project.agents.length} desks staffed</span>
                <strong>{project.activeRun.progressLabel}</strong>
              </div>
            </Link>
          ))}
          {projects.length === 0 ? <article className="list-card"><strong>No projects available</strong><p>Snapshot data is empty or still loading.</p></article> : null}
        </div>
      </SectionCard>

      <SectionCard title="Operations deck" eyebrow="Spatial brief" tone="glass">
        <div className="operations-grid">
          <article className="list-card list-card--soft">
            <span className="label">Reception</span>
            <strong>Lobby readiness</strong>
            <p>Premium wayfinding keeps the command center legible during live sessions and review handoffs.</p>
          </article>
          <article className="list-card list-card--soft">
            <span className="label">War room</span>
            <strong>Priority traffic</strong>
            <p>{alerts[0]?.title ?? 'No urgent blockers in the war room right now.'}</p>
          </article>
          <article className="list-card list-card--soft">
            <span className="label">Desk cluster</span>
            <strong>Agent presence</strong>
            <p>{agents[0]?.currentTask ?? 'Desk activity appears once agents connect to the snapshot.'}</p>
          </article>
        </div>
      </SectionCard>

      <SectionCard title="Desk directory" eyebrow="Agent floor">
        <div className="list-stack">
          {agents.map((agent) => (
            <Link key={agent.id} href={`/agents/${agent.id}`} className="list-card list-card--interactive">
              <div className="row-between row-start">
                <div>
                  <strong>{agent.name}</strong>
                  <p className="muted">{agent.role} desk</p>
                </div>
                <StatusPill state={agent.status} />
              </div>
              <p>{agent.currentTask}</p>
              <span className="list-card__meta">Assigned to {agent.projectId}</span>
            </Link>
          ))}
          {agents.length === 0 ? <article className="list-card"><strong>No active agents</strong><p>Agent presence will appear once snapshot data is available.</p></article> : null}
        </div>
      </SectionCard>

      <SectionCard title="Priority ribbon" eyebrow="Risk lighting">
        <div className="list-stack">
          {alerts.map((alert) => (
            <article key={alert.id} className={`alert-card alert-card--${alert.level}`}>
              <div className="row-between row-start">
                <strong>{alert.title}</strong>
                <span className="alert-card__badge">{alert.level}</span>
              </div>
              <p>{alert.detail}</p>
            </article>
          ))}
          {alerts.length === 0 ? <article className="list-card"><strong>No active alerts</strong><p>The office is clear right now.</p></article> : null}
        </div>
      </SectionCard>

      <SectionCard title="Signal feed" eyebrow="Live activity">
        <div className="list-stack">
          {activity.map((event) => (
            <article key={event.id} className="timeline-item">
              <div className="timeline-item__rail" aria-hidden="true" />
              <div>
                <strong>{event.label}</strong>
                <p>{event.detail}</p>
                <span className="timestamp">{event.timestamp}</span>
              </div>
            </article>
          ))}
          {activity.length === 0 ? <article className="list-card"><strong>No activity yet</strong><p>Live events will appear here when the feed is available.</p></article> : null}
        </div>
      </SectionCard>

      <SectionCard title="Private threads" eyebrow="Concierge inbox" tone="glass">
        <div className="list-stack">
          {conversations.map((conversation) => (
            <article key={conversation.id} className="list-card list-card--soft">
              <div className="row-between row-start">
                <strong>{conversation.title}</strong>
                <span className="timestamp">{conversation.updatedAt}</span>
              </div>
              <p>{conversation.latestMessage}</p>
              <span className="list-card__meta">{conversation.contextLabel}</span>
            </article>
          ))}
        </div>
      </SectionCard>
    </main>
  );
}
