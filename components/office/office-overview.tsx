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
                A scene-first command world where projects become lit buildings, agents become live stations, and pressure reads like a city pulse instead of a dashboard.
              </p>
            </div>
            <div className="hero-card__spotlight">
              <span className="hero-card__spotlight-label">World state</span>
              <strong>{projects.length} structures lit</strong>
              <span>Refresh {connection.lastUpdated}</span>
            </div>
          </div>

          <div className="metric-strip metric-strip--scene">
            <article className="metric-tile metric-tile--scene">
              <span className="metric-tile__label">Districts online</span>
              <strong>{projects.length}</strong>
              <p>Buildings on the command map</p>
            </article>
            <article className="metric-tile metric-tile--scene">
              <span className="metric-tile__label">Live stations</span>
              <strong>{activeCount}</strong>
              <p>Operator desks glowing right now</p>
            </article>
            <article className="metric-tile metric-tile--scene">
              <span className="metric-tile__label">Alarm beacons</span>
              <strong>{alerts.length}</strong>
              <p>Signals climbing above ambient noise</p>
            </article>
          </div>
        </div>

        <div className="world-grid">
          <article className="world-card world-card--elevator">
            <span className="label">Sky elevator</span>
            <strong>{topProject?.name ?? 'No active district'}</strong>
            <p>{topProject?.activeRun.summary ?? 'The city grid will populate as soon as snapshot data arrives.'}</p>
          </article>
          <article className="world-card world-card--beacon">
            <span className="label">Signal beacon</span>
            <strong>{alerts[0]?.title ?? 'No priority beacons active'}</strong>
            <p>{alerts[0]?.detail ?? 'The HQ skyline is stable right now.'}</p>
          </article>
        </div>
      </section>

      <SectionCard title="City map" eyebrow="Playable district view" tone="accent">
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
                  <span className="project-card__eyebrow">{project.urgency} priority tower</span>
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
          {projects.length === 0 ? <article className="list-card"><strong>No districts online</strong><p>Snapshot data is empty or still loading.</p></article> : null}
        </div>
      </SectionCard>

      <SectionCard title="Street-level operations" eyebrow="World simulation feed" tone="glass">
        <div className="operations-grid operations-grid--scene">
          <article className="list-card list-card--soft">
            <span className="label">Lobby floor</span>
            <strong>Foot traffic</strong>
            <p>{conversations[0]?.latestMessage ?? 'Thread activity appears once operators join the world.'}</p>
          </article>
          <article className="list-card list-card--soft">
            <span className="label">Power core</span>
            <strong>Run pressure</strong>
            <p>{topProject?.activeRun.progressLabel ?? 'No active run pressure detected.'}</p>
          </article>
          <article className="list-card list-card--soft">
            <span className="label">Roof access</span>
            <strong>Atmosphere</strong>
            <p>{activity[0]?.label ?? 'Ambient scene data will appear here when the feed is live.'}</p>
          </article>
        </div>
      </SectionCard>

      <SectionCard title="Operator row" eyebrow="Station lights">
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
              <span className="list-card__meta">Assigned to {agent.projectId}</span>
            </Link>
          ))}
          {agents.length === 0 ? <article className="list-card"><strong>No stations occupied</strong><p>Agent presence will appear once snapshot data is available.</p></article> : null}
        </div>
      </SectionCard>

      <SectionCard title="Alarm lane" eyebrow="Neon alerts">
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
          {alerts.length === 0 ? <article className="list-card"><strong>No active alerts</strong><p>The world is stable right now.</p></article> : null}
        </div>
      </SectionCard>

      <SectionCard title="Transit log" eyebrow="Moving through the world">
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
          {activity.length === 0 ? <article className="list-card"><strong>No movement yet</strong><p>Live events will appear here when the feed is available.</p></article> : null}
        </div>
      </SectionCard>
    </main>
  );
}
