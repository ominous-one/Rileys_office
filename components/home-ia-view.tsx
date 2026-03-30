'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { StatusPill } from '@/components/ui/status-pill';
import type { OfficeSnapshot, ProjectSummary } from '@/lib/domain/types';
import styles from './home-ia-view.module.css';

type HomeView = 'overview' | 'activity' | 'team';

const viewLabels: Record<HomeView, { eyebrow: string; title: string; description: string }> = {
  overview: {
    eyebrow: 'Overview',
    title: 'Command brief',
    description: 'Mission posture, delivery signal, and the fastest route into the active project room.',
  },
  activity: {
    eyebrow: 'Activity',
    title: 'Live execution feed',
    description: 'Recent movement for the selected project, curated for a clean read on mobile.',
  },
  team: {
    eyebrow: 'Team',
    title: 'Active operators',
    description: 'Current desks, roles, and who is carrying the frontline work right now.',
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
    return snapshot.alerts.filter((alert) => alert.projectId === activeProject.id).slice(0, 3);
  }, [activeProject, snapshot.alerts]);

  const projectActivity = useMemo(() => {
    if (!activeProject) return snapshot.activity.slice(0, 4);
    return snapshot.activity.filter((event) => event.projectId === activeProject.id).slice(0, 4);
  }, [activeProject, snapshot.activity]);

  const leadAgent = activeProject?.agents[0] ?? null;
  const activeAgents = activeProject?.agents.filter((agent) => agent.status === 'active').length ?? 0;
  const totalAgents = activeProject?.agents.length ?? 0;
  const pressure = Math.min(98, 26 + activeAgents * 18 + projectAlerts.length * 15);
  const focusLabel = activeProject?.activeRun.progressLabel ?? 'Standby';

  return (
    <main className={`page-stack page-stack--world ${styles.page}`}>
      <section className={styles.shell}>
        <div className={styles.heroArt} aria-hidden="true">
          <div className={styles.heroGlow} />
          <div className={styles.heroGrid} />
          <div className={styles.heroHorizon} />
          <div className={styles.heroRing} style={{ opacity: 0.3 + pressure / 180 }} />
          <div className={styles.heroPanel} />
        </div>

        <header className={styles.hero}>
          <div className={styles.heroTopline}>
            <span className={styles.eyebrow}>Riley&apos;s Office HQ</span>
            <span className={styles.connection}>
              {snapshot.connection.mode} relay - {snapshot.connection.state}
            </span>
          </div>

          <div className={styles.headlineBlock}>
            <div>
              <h1 className={styles.title}>Premium command lobby for the work that matters now.</h1>
              <p className={styles.lede}>
                Calm, dark, and signal-first. The lobby keeps a cinematic shell while the selected project surfaces the
                live snapshot that actually drives decisions.
              </p>
            </div>

            <div className={styles.heroCard}>
              <span className={styles.heroCardLabel}>Selected project</span>
              <strong>{activeProject?.name ?? 'No project loaded'}</strong>
              <p>{activeProject?.tagline ?? 'Waiting for office snapshot data.'}</p>
              <div className={styles.heroStats}>
                <div>
                  <span>Pressure</span>
                  <strong>{pressure}%</strong>
                </div>
                <div>
                  <span>Operators</span>
                  <strong>{activeAgents}/{totalAgents}</strong>
                </div>
                <div>
                  <span>Alerts</span>
                  <strong>{projectAlerts.length}</strong>
                </div>
              </div>
            </div>
          </div>
        </header>

        {activeProject ? (
          <>
            <section className={styles.controlStrip}>
              <div className={styles.primaryBrief}>
                <span className={styles.sectionLabel}>Current directive</span>
                <strong>{activeProject.activeRun.summary}</strong>
                <p>{activeProject.mission}</p>
              </div>
              <div className={styles.miniMetrics}>
                <article className={styles.metricCard}>
                  <span>Delivery state</span>
                  <strong>{focusLabel}</strong>
                </article>
                <article className={styles.metricCard}>
                  <span>Health</span>
                  <div className={styles.metricInline}>
                    <StatusPill state={activeProject.health} />
                  </div>
                </article>
              </div>
            </section>

            <section className={styles.viewNav} role="tablist" aria-label="Selected project views">
              {(Object.keys(viewLabels) as HomeView[]).map((view) => (
                <button
                  key={view}
                  type="button"
                  className={`${styles.viewButton} ${activeView === view ? styles.viewButtonActive : ''}`}
                  onClick={() => setActiveView(view)}
                  role="tab"
                  aria-selected={activeView === view}
                >
                  {viewLabels[view].eyebrow}
                </button>
              ))}
            </section>

            <section className={styles.contentCard}>
              <div className={styles.contentHeader}>
                <div>
                  <span className={styles.sectionLabel}>{viewLabels[activeView].eyebrow}</span>
                  <h2>{viewLabels[activeView].title}</h2>
                </div>
                <p>{viewLabels[activeView].description}</p>
              </div>

              {activeView === 'overview' ? (
                <div className={styles.overviewGrid}>
                  <article className={styles.featureCard}>
                    <span className={styles.cardLabel}>Mission</span>
                    <strong>{activeProject.tagline}</strong>
                    <p>{activeProject.activeRun.progressLabel}</p>
                  </article>
                  <article className={styles.featureCard}>
                    <span className={styles.cardLabel}>Lead operator</span>
                    <strong>{leadAgent?.name ?? 'Unassigned'}</strong>
                    <p>{leadAgent?.currentTask ?? 'Assign a lead to surface workstation details here.'}</p>
                  </article>
                  <div className={styles.actionRow}>
                    <Link href={`/projects/${activeProject.id}`} className={styles.primaryAction}>Open project room</Link>
                    {leadAgent ? (
                      <Link href={`/agents/${leadAgent.id}`} className={styles.secondaryAction}>
                        Open lead workstation
                      </Link>
                    ) : null}
                  </div>
                </div>
              ) : null}

              {activeView === 'activity' ? (
                <div className={styles.stack}>
                  {projectActivity.length ? (
                    projectActivity.map((event) => (
                      <article key={event.id} className={styles.timelineCard}>
                        <div className={styles.timelineHeader}>
                          <strong>{event.label}</strong>
                          <span>{event.timestamp}</span>
                        </div>
                        <p>{event.detail}</p>
                      </article>
                    ))
                  ) : (
                    <article className={styles.emptyCard}>
                      <strong>No recent activity</strong>
                      <p>Signals will land here as the live feed updates.</p>
                    </article>
                  )}
                </div>
              ) : null}

              {activeView === 'team' ? (
                <div className={styles.stack}>
                  {activeProject.agents.map((agent) => (
                    <Link key={agent.id} href={`/agents/${agent.id}`} className={styles.agentCard}>
                      <div className={styles.agentRow}>
                        <div>
                          <strong>{agent.name}</strong>
                          <p>{agent.role}</p>
                        </div>
                        <div className={styles.agentStatus}>
                          <span
                            className={`${styles.liveDot} ${agent.status === 'active' ? styles.liveDotActive : ''}`}
                            aria-hidden="true"
                          />
                          <StatusPill state={agent.status} />
                        </div>
                      </div>
                      <p>{agent.currentTask}</p>
                    </Link>
                  ))}
                </div>
              ) : null}
            </section>
          </>
        ) : (
          <section className={styles.contentCard}>
            <div className={styles.contentHeader}>
              <div>
                <span className={styles.sectionLabel}>No project data</span>
                <h2>Lobby ready</h2>
              </div>
              <p>The shell is live, but the office snapshot has not returned any projects yet.</p>
            </div>
          </section>
        )}

        <nav className={styles.projectTabs} role="tablist" aria-label="Projects">
          {projects.map((project) => (
            <button
              key={project.id}
              type="button"
              className={`${styles.projectTab} ${project.id === activeProject?.id ? styles.projectTabActive : ''}`}
              onClick={() => setActiveProjectId(project.id)}
              role="tab"
              aria-selected={project.id === activeProject?.id}
              style={{ ['--tab-accent' as string]: project.accent }}
            >
              <span>{project.name}</span>
              <small>{project.activeRun.progressLabel}</small>
            </button>
          ))}
        </nav>
      </section>
    </main>
  );
}