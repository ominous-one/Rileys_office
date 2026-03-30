'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { StatusPill } from '@/components/ui/status-pill';
import type { OfficeSnapshot, ProjectSummary } from '@/lib/domain/types';

type HomeView = 'overview' | 'activity' | 'team';

const viewLabels: Record<HomeView, { eyebrow: string; title: string; description: string }> = {
  overview: {
    eyebrow: 'Overview',
    title: 'Project pulse',
    description: 'Mission, health, delivery pressure, and the fastest path into the full project room.',
  },
  activity: {
    eyebrow: 'Activity',
    title: 'Recent movement',
    description: 'Latest execution signals tied to the selected project so the lobby reads clearly on mobile.',
  },
  team: {
    eyebrow: 'Team',
    title: 'Staffed operators',
    description: 'Agent desks for the selected project with a direct route into each workstation view.',
  },
};

function getSafeProject(projects: ProjectSummary[]) {
  return projects[0] ?? null;
}

export function HomeIAView({ snapshot }: { snapshot: OfficeSnapshot }) {
  const projects = snapshot.projects ?? [];
  const [activeProjectId, setActiveProjectId] = useState(() => getSafeProject(projects)?.id ?? '');
  const [activeView, setActiveView] = useState<HomeView>('overview');

  const activeProject = useMemo(() => {
    return projects.find((project) => project.id === activeProjectId) ?? getSafeProject(projects);
  }, [activeProjectId, projects]);

  const projectAlerts = useMemo(() => {
    if (!activeProject) return [];
    return snapshot.alerts.filter((alert) => alert.projectId === activeProject.id).slice(0, 2);
  }, [activeProject, snapshot.alerts]);

  const projectActivity = useMemo(() => {
    if (!activeProject) return snapshot.activity.slice(0, 3);
    return snapshot.activity.filter((event) => event.projectId === activeProject.id).slice(0, 3);
  }, [activeProject, snapshot.activity]);

  const leadAgent = activeProject?.agents[0] ?? null;
  const activeAgents = activeProject?.agents.filter((agent) => agent.status === 'active').length ?? 0;
  const pressure = Math.min(98, 24 + activeAgents * 22 + projectAlerts.length * 16);

  return (
    <main className="page-stack page-stack--world">
      <section className="hero-card scene-panel scene-panel--office hq-lobby-shell hq-lobby-shell--ia">
        <div className="hq-lobby-backdrop" aria-hidden="true">
          <div className="hq-lobby-backdrop__sky" />
          <div className="hq-lobby-backdrop__fog" />
          <div className="hq-lobby-backdrop__floor" />
          <div className="hq-lobby-backdrop__ceiling" />
          <div className="hq-lobby-backdrop__city" />
          <div className="hq-lobby-backdrop__beam hq-lobby-backdrop__beam--left" />
          <div className="hq-lobby-backdrop__beam hq-lobby-backdrop__beam--right" />
          <div className="hq-lobby-backdrop__wall hq-lobby-backdrop__wall--left" />
          <div className="hq-lobby-backdrop__wall hq-lobby-backdrop__wall--right" />
          <div className="hq-lobby-backdrop__grid" />
          <div className="hq-lobby-backdrop__particles" />
          <div className="hq-lobby-backdrop__table" />
          <div className="hq-lobby-backdrop__glow" />
          <div className="hq-lobby-backdrop__statusring" style={{ ['--heat' as string]: `${pressure}%` }} />
        </div>

        <div className="hq-lobby-shell__copy hq-lobby-shell__copy--ia">
          <div className="hero-card__eyebrow-row">
            <p className="eyebrow">Command lobby</p>
            <span className={`connection connection--${snapshot.connection.state}`}>
              {snapshot.connection.mode} relay - {snapshot.connection.state}
            </span>
          </div>

          <div className="hero-card__headline hero-card__headline--split hq-lobby-shell__headline">
            <div>
              <h1>Riley&apos;s Office</h1>
              <p className="lede">
                Static premium atmosphere up top, project switching at the bottom, and one clear content rail for the selected project.
              </p>
            </div>
            <div className="hero-card__spotlight hero-card__spotlight--scene hq-lobby-shell__spotlight">
              <span className="hero-card__spotlight-label">Selected project</span>
              <strong>{activeProject?.name ?? 'No project loaded'}</strong>
              <span>{activeAgents} active agents - {projectAlerts.length} alerts - pressure {pressure}%</span>
            </div>
          </div>

          <div className="hq-view-switcher" role="tablist" aria-label="Selected project views">
            {(Object.keys(viewLabels) as HomeView[]).map((view) => (
              <button
                key={view}
                type="button"
                className={`hq-view-switcher__item${activeView === view ? ' is-active' : ''}`}
                onClick={() => setActiveView(view)}
                role="tab"
                aria-selected={activeView === view}
              >
                {viewLabels[view].eyebrow}
              </button>
            ))}
          </div>
        </div>

        <div className="hq-lobby-panel-stack">
          {activeProject ? (
            <article className="hq-focus-panel">
              <div className="row-between row-start">
                <div>
                  <p className="project-card__eyebrow">{viewLabels[activeView].eyebrow}</p>
                  <h2>{viewLabels[activeView].title}</h2>
                </div>
                <StatusPill state={activeProject.health} />
              </div>
              <p className="muted">{viewLabels[activeView].description}</p>

              {activeView === 'overview' ? (
                <div className="hq-focus-panel__body">
                  <div className="hq-stat-grid">
                    <article className="metric-tile metric-tile--scene metric-tile--compact">
                      <span className="metric-tile__label">Mission</span>
                      <strong>{activeProject.tagline}</strong>
                      <p>{activeProject.activeRun.progressLabel}</p>
                    </article>
                    <article className="metric-tile metric-tile--scene metric-tile--compact">
                      <span className="metric-tile__label">Delivery</span>
                      <strong>{activeProject.activeRun.summary}</strong>
                      <p>{activeProject.mission}</p>
                    </article>
                  </div>
                  <div className="action-row action-row--stacked">
                    <Link href={`/projects/${activeProject.id}`} className="action-link action-link--primary">Open project room</Link>
                    {leadAgent ? <Link href={`/agents/${leadAgent.id}`} className="action-link">Open lead workstation</Link> : null}
                  </div>
                </div>
              ) : null}

              {activeView === 'activity' ? (
                <div className="list-stack">
                  {projectActivity.map((event) => (
                    <article key={event.id} className="timeline-item timeline-item--scene timeline-item--compact">
                      <strong>{event.label}</strong>
                      <p>{event.detail}</p>
                      <span className="timestamp">{event.timestamp}</span>
                    </article>
                  ))}
                  {projectActivity.length === 0 ? <article className="list-card list-card--soft"><strong>No recent activity</strong><p>Signals will land here when the feed updates.</p></article> : null}
                </div>
              ) : null}

              {activeView === 'team' ? (
                <div className="list-stack">
                  {activeProject.agents.map((agent) => (
                    <Link key={agent.id} href={`/agents/${agent.id}`} className="list-card list-card--interactive workstation-card workstation-card--compact">
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
              ) : null}
            </article>
          ) : (
            <article className="hq-focus-panel">
              <h2>No project data yet</h2>
              <p className="muted">The lobby is ready, but the office snapshot is empty.</p>
            </article>
          )}

          <div className="hq-project-tabs" role="tablist" aria-label="Projects">
            {projects.map((project) => (
              <button
                key={project.id}
                type="button"
                className={`hq-project-tabs__item${project.id === activeProject?.id ? ' is-active' : ''}`}
                style={{ ['--tab-accent' as string]: project.accent }}
                onClick={() => setActiveProjectId(project.id)}
                role="tab"
                aria-selected={project.id === activeProject?.id}
              >
                <span className="hq-project-tabs__label">{project.name}</span>
                <span className="hq-project-tabs__meta">{project.activeRun.progressLabel}</span>
              </button>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}