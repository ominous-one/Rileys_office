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
  const topProject = projects[0];

  return (
    <main className="page-stack page-stack--scene">
      <section className="scene-hero scene-hero--hq">
        <div className="scene-hero__atmosphere" aria-hidden="true" />
        <div className="scene-hero__skyline" aria-hidden="true">
          <span className="scene-hero__tower scene-hero__tower--tall" />
          <span className="scene-hero__tower scene-hero__tower--mid" />
          <span className="scene-hero__tower scene-hero__tower--short" />
          <span className="scene-hero__tower scene-hero__tower--signal" />
        </div>

        <div className="hero-card hero-card--office scene-panel">
          <div className="hero-card__backdrop" />
          <div className="hero-card__eyebrow-row">
            <p className="eyebrow">World HQ</p>
            <span className={`connection connection--${connection.state}`}>{connection.mode} relay · {connection.state}</span>
          </div>

          <div className="hero-card__headline hero-card__headline--split">
            <div>
              <h1>Riley&apos;s Office</h1>
              <p className="lede">
                A scene-first operator HQ where projects read as active rooms, agents read as staffed desks, and system pressure resolves into a credible office / war-room floor instead of a generic dashboard.
              </p>
            </div>
            <div className="hero-card__spotlight">
              <span className="hero-card__spotlight-label">HQ state</span>
              <strong>{projects.length} active rooms</strong>
              <span>Refresh {connection.lastUpdated}</span>
            </div>
          </div>

          <div className="metric-strip metric-strip--scene">
            <article className="metric-tile metric-tile--scene">
              <span className="metric-tile__label">Project rooms online</span>
              <strong>{projects.length}</strong>
              <p>Rooms visible from the operator floor</p>
            </article>
            <article className="metric-tile metric-tile--scene">
              <span className="metric-tile__label">Staffed desks</span>
              <strong>{activeCount}</strong>
              <p>Operators active right now</p>
            </article>
            <article className="metric-tile metric-tile--scene">
              <span className="metric-tile__label">Active alerts</span>
              <strong>{alerts.length}</strong>
              <p>Issues rising above background load</p>
            </article>
          </div>
        </div>

        <div className="world-grid">
          <article className="world-card world-card--elevator">
            <span className="label">Front desk</span>
            <strong>{topProject?.name ?? 'No active room'}</strong>
            <p>{topProject?.activeRun.summary ?? 'The office floor will populate as soon as snapshot data arrives.'}</p>
          </article>
          <article className="world-card world-card--beacon">
            <span className="label">Ops wall</span>
            <strong>{alerts[0]?.title ?? 'No priority alerts active'}</strong>
            <p>{alerts[0]?.detail ?? 'The HQ floor is stable right now.'}</p>
          </article>
        </div>
      </section>

      <SectionCard title="Office floor" eyebrow="Tap into rooms and teams" tone="accent">
        <div className="city-grid">
          {projects.map((project, index) => (
            <Link
              key={project.id}
              href={`/projects/${project.id}`}
              className="project-card project-card--scene"
              style={{ ['--accent' as string]: project.accent, ['--elevation' as string]: `${index % 3}` }}
            >
              <div className="project-card__glow" aria-hidden="true" />
              <div className="project-card__building" aria-hidden="true">
                <span className="project-card__roof" />
                <span className="project-card__windows" />
                <span className="project-card__base" />
              </div>
              <div className="row-between row-start">
                <div>
                  <span className="project-card__eyebrow">{project.urgency} priority room</span>
                  <h3>{project.name}</h3>
                </div>
                <StatusPill state={project.health} />
              </div>
              <p className="project-card__tagline">{project.tagline}</p>
              <p className="muted">{project.mission}</p>
              <div className="project-card__footer">
                <span>{project.agents.length} stations staffed</span>
                <strong>{project.activeRun.progressLabel}</strong>
              </div>
            </Link>
          ))}
          {projects.length === 0 ? <article className="list-card"><strong>No project rooms online</strong><p>Snapshot data is empty or still loading.</p></article> : null}
        </div>
      </SectionCard>

      <SectionCard title="Floor operations" eyebrow="Live operator readout" tone="glass">
        <div className="operations-grid operations-grid--scene">
          <article className="list-card list-card--soft">
            <span className="label">Reception lane</span>
            <strong>Foot traffic</strong>
            <p>{conversations[0]?.latestMessage ?? 'Thread activity appears once operators join the office.'}</p>
          </article>
          <article className="list-card list-card--soft">
            <span className="label">Power core</span>
            <strong>Run pressure</strong>
            <p>{topProject?.activeRun.progressLabel ?? 'No active run pressure detected.'}</p>
          </article>
          <article className="list-card list-card--soft">
            <span className="label">Whiteboard lane</span>
            <strong>Atmosphere</strong>
            <p>{activity[0]?.label ?? 'Ambient office data will appear here when the feed is live.'}</p>
          </article>
        </div>
      </SectionCard>

      <SectionCard title="Desk row" eyebrow="Staffed workstations">
        <div className="list-stack">
          {agents.map((agent, index) => (
            <Link key={agent.id} href={`/agents/${agent.id}`} className="list-card list-card--interactive desk-link-card" style={{ ['--desk-accent' as string]: projects[index % Math.max(projects.length, 1)]?.accent ?? '#9d7bff' }}>
              <div className="desk-link-card__lamp" aria-hidden="true" />
              <div className="row-between row-start">
                <div>
                  <strong>{agent.name}</strong>
                  <p className="muted">{agent.role} station</p>
                </div>
                <StatusPill state={agent.status} />
              </div>
              <p>{agent.currentTask}</p>
              <span className="list-card__meta">Assigned to room {agent.projectId}</span>
            </Link>
          ))}
          {agents.length === 0 ? <article className="list-card"><strong>No desks staffed</strong><p>Agent presence will appear once snapshot data is available.</p></article> : null}
        </div>
      </SectionCard>

      <SectionCard title="Alert lane" eyebrow="Priority signals">
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
          {alerts.length === 0 ? <article className="list-card"><strong>No active alerts</strong><p>The office floor is stable right now.</p></article> : null}
        </div>
      </SectionCard>

      <SectionCard title="Ops log" eyebrow="Movement across the office">
        <div className="list-stack">
          {activity.map((event) => (
            <article key={event.id} className="timeline-item timeline-item--scene">
              <div className="timeline-item__rail" aria-hidden="true" />
              <div>
                <strong>{event.label}</strong>
                <p>{event.detail}</p>
                <span className="timestamp">{event.timestamp}</span>
              </div>
            </article>
          ))}
          {activity.length === 0 ? <article className="list-card"><strong>No office movement yet</strong><p>Live office events will appear here when the feed is available.</p></article> : null}
        </div>
      </SectionCard>
    </main>
  );
}


