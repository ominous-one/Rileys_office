'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { StatusPill } from '@/components/ui/status-pill';
import type { AgentSummary, OfficeSnapshot, ProjectSummary } from '@/lib/domain/types';
import styles from './home-ia-view.module.css';

type HomeView = 'overview' | 'live' | 'team';

type SafeProject = ProjectSummary & { agents: AgentSummary[] };

type RoomAgent = {
  id: string;
  name: string;
  role: string;
  status: AgentSummary['status'];
  currentTask: string;
  blocker?: string;
  x: string;
  y: string;
  accent: string;
};

const viewLabels: Record<HomeView, { eyebrow: string; title: string; description: string }> = {
  overview: {
    eyebrow: 'Overview',
    title: 'Walk the floor',
    description: 'Start with architecture, furniture, and the project suite that currently defines the room.',
  },
  live: {
    eyebrow: 'Live floor',
    title: 'Operations pulse',
    description: 'OpenClaw activity stays mounted to the office as timeline movement, alerting, and room pressure.',
  },
  team: {
    eyebrow: 'Team row',
    title: 'Stations and people',
    description: 'Agents appear as occupants with work pinned to desks instead of abstract status cards.',
  },
};

function getSafeProjects(projects: ProjectSummary[]): SafeProject[] {
  return (projects ?? []).map((project) => ({
    ...project,
    agents: Array.isArray(project.agents) ? project.agents : [],
  }));
}

function getSafeProject(projects: SafeProject[]) {
  return projects[0] ?? null;
}

function getConversationTitle(value: unknown) {
  return typeof value === 'string' ? value : '';
}

function formatMode(mode: OfficeSnapshot['connection']['mode'], state: OfficeSnapshot['connection']['state']) {
  return `${mode === 'live' ? 'OpenClaw live' : 'Mock snapshot'} • ${state}`;
}

function getPressure(project: SafeProject | null, alertCount: number) {
  if (!project) return 0;
  const activeAgents = project.agents.filter((agent) => agent.status === 'active').length;
  return Math.min(96, 26 + activeAgents * 14 + alertCount * 13);
}

function buildRoomAgents(project: SafeProject | null): RoomAgent[] {
  if (!project) return [];

  const anchors = [
    { x: '18%', y: '71%' },
    { x: '36%', y: '64%' },
    { x: '63%', y: '65%' },
    { x: '81%', y: '72%' },
  ];

  return project.agents.slice(0, 4).map((agent, index) => ({
    id: agent.id,
    name: agent.name,
    role: agent.role,
    status: agent.status,
    currentTask: agent.currentTask,
    blocker: agent.blocker,
    x: anchors[index]?.x ?? '50%',
    y: anchors[index]?.y ?? '68%',
    accent: project.accent,
  }));
}

export function HomeIAView({ snapshot }: { snapshot: OfficeSnapshot }) {
  const projects = useMemo(() => getSafeProjects(snapshot.projects ?? []), [snapshot.projects]);
  const [activeProjectId, setActiveProjectId] = useState(() => getSafeProject(projects)?.id ?? '');
  const [activeView, setActiveView] = useState<HomeView>('overview');

  const activeProject = useMemo(() => {
    return projects.find((project) => project.id === activeProjectId) ?? getSafeProject(projects);
  }, [activeProjectId, projects]);

  const alerts = Array.isArray(snapshot.alerts) ? snapshot.alerts : [];
  const activity = Array.isArray(snapshot.activity) ? snapshot.activity : [];
  const conversations = Array.isArray(snapshot.conversations) ? snapshot.conversations : [];

  const projectAlerts = useMemo(() => {
    if (!activeProject) return alerts.slice(0, 3);
    return alerts.filter((alert) => !alert.projectId || alert.projectId === activeProject.id).slice(0, 3);
  }, [activeProject, alerts]);

  const projectActivity = useMemo(() => {
    if (!activeProject) return activity.slice(0, 4);
    return activity.filter((event) => !event.projectId || event.projectId === activeProject.id).slice(0, 4);
  }, [activeProject, activity]);

  const roomAgents = useMemo(() => buildRoomAgents(activeProject), [activeProject]);
  const leadAgent = activeProject?.agents[0] ?? null;
  const conversation = conversations.find((item) => getConversationTitle(item?.title).toLowerCase().includes('riley')) ?? conversations[0] ?? null;
  const pressure = getPressure(activeProject, projectAlerts.length);

  return (
    <main className={`page-stack page-stack--world ${styles.page}`}>
      <section className={styles.shell} style={{ ['--project-accent' as string]: activeProject?.accent ?? '#9d7bff' }}>
        <header className={styles.headerCard}>
          <div className={styles.headerCopy}>
            <span className={styles.eyebrow}>Riley&apos;s Office</span>
            <h1>A believable office floor first, with the software tucked into the furniture.</h1>
            <p>
              Reception, corridor, bullpen, glass review room, executive suite, and archive wall stay readable on mobile while the
              live OpenClaw feed keeps the room current.
            </p>
          </div>
          <div className={styles.connectionCard}>
            <span className={styles.connectionLabel}>Connection</span>
            <strong>{formatMode(snapshot.connection.mode, snapshot.connection.state)}</strong>
            <small>{snapshot.connection.lastUpdated}</small>
          </div>
        </header>

        <section className={styles.worldCard}>
          <div className={styles.worldMeta}>
            <div>
              <span className={styles.sectionLabel}>Active suite</span>
              <h2>{activeProject?.name ?? 'No active project'}</h2>
              <p>{activeProject?.mission ?? 'Waiting on office snapshot data.'}</p>
            </div>
            <StatusPill state={activeProject?.health ?? 'degraded'} />
          </div>

          <div className={styles.metricRow}>
            <article className={styles.metricTile}>
              <span>Run state</span>
              <strong>{activeProject?.activeRun.progressLabel ?? 'Standby'}</strong>
            </article>
            <article className={styles.metricTile}>
              <span>Floor pressure</span>
              <strong>{pressure}%</strong>
            </article>
            <article className={styles.metricTile}>
              <span>Operators</span>
              <strong>{activeProject?.agents.length ?? 0}</strong>
            </article>
          </div>

          <div className={styles.officeScene} aria-hidden="true">
            <div className={styles.ceilingGrid} />
            <div className={styles.windowWall} />
            <div className={styles.cityGlow} />
            <div className={styles.leftWall} />
            <div className={styles.rightWall} />
            <div className={styles.floorStone} />
            <div className={styles.floorWood} />
            <div className={styles.corridor} />
            <div className={styles.receptionDesk}><span>Reception</span></div>
            <div className={styles.commandTable}><span>{activeProject?.activeRun.status ?? 'waiting'}</span></div>
            <div className={styles.opsWall}>
              {(projectAlerts.length ? projectAlerts : [{ id: 'fallback' } as never]).map((alert, index) => (
                <span key={('id' in alert ? alert.id : 'fallback') + index} className={styles.opsScreen} />
              ))}
            </div>
            <div className={styles.glassRoom}>
              <span className={styles.glassLabel}>Review room</span>
              <span className={styles.glassTable} />
              <span className={styles.glassScreen} />
            </div>
            <div className={styles.archiveWall}><span>Archive wall</span></div>
            <div className={styles.deskLane}>
              {projects.slice(0, 4).map((project, index) => (
                <div
                  key={project.id}
                  className={styles.deskPod}
                  style={{ ['--desk-accent' as string]: project.accent, ['--desk-offset' as string]: `${index}` }}
                >
                  <span className={styles.deskSurface} />
                  <span className={styles.deskMonitor} />
                  <span className={styles.deskChair} />
                </div>
              ))}
            </div>
            {roomAgents.map((agent) => (
              <div
                key={agent.id}
                className={`${styles.agent} ${styles[`agent${agent.status.charAt(0).toUpperCase()}${agent.status.slice(1)}`] ?? ''}`}
                style={{
                  ['--agent-x' as string]: agent.x,
                  ['--agent-y' as string]: agent.y,
                  ['--agent-accent' as string]: agent.accent,
                }}
              >
                <span className={styles.agentPing} />
                <span className={styles.agentDot} />
                <span className={styles.agentLabel}>{agent.name}</span>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.projectTabs} aria-label="Project rooms">
          {projects.map((project) => (
            <button
              key={project.id}
              type="button"
              className={`${styles.projectTab} ${project.id === activeProject?.id ? styles.projectTabActive : ''}`}
              style={{ ['--tab-accent' as string]: project.accent }}
              onClick={() => setActiveProjectId(project.id)}
            >
              <span>{project.name}</span>
              <small>{project.activeRun.progressLabel ?? 'Standby'}</small>
            </button>
          ))}
        </section>

        {activeProject ? (
          <>
            <section className={styles.detailRow}>
              <article className={styles.detailCard}>
                <span className={styles.sectionLabel}>Suite brief</span>
                <strong>{activeProject.activeRun.summary}</strong>
                <p>{activeProject.tagline}</p>
              </article>
              <article className={styles.detailCard}>
                <span className={styles.sectionLabel}>Lead workstation</span>
                <strong>{leadAgent?.name ?? 'Unassigned'}</strong>
                <p>{leadAgent?.currentTask ?? 'Assign a lead to surface workstation details.'}</p>
              </article>
            </section>

            <section className={styles.viewNav} role="tablist" aria-label="Project perspectives">
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
                  <h3>{viewLabels[activeView].title}</h3>
                </div>
                <p>{viewLabels[activeView].description}</p>
              </div>

              {activeView === 'overview' ? (
                <div className={styles.overviewGrid}>
                  <article className={styles.focusCard}>
                    <span className={styles.cardLabel}>Arrival edge</span>
                    <strong>{conversation?.title ?? 'No active thread'}</strong>
                    <p>{conversation?.latestMessage ?? 'Conversation updates will appear here.'}</p>
                  </article>
                  <article className={styles.focusCard}>
                    <span className={styles.cardLabel}>Executive suite</span>
                    <strong>{activeProject.mission}</strong>
                    <p>{projectAlerts[0]?.detail ?? 'No active priority signal in this room.'}</p>
                  </article>
                  <div className={styles.actionRow}>
                    <Link href={`/projects/${activeProject.id}`} className={styles.primaryAction}>Open project suite</Link>
                    {leadAgent ? <Link href={`/agents/${leadAgent.id}`} className={styles.secondaryAction}>Open lead desk</Link> : null}
                  </div>
                </div>
              ) : null}

              {activeView === 'live' ? (
                <div className={styles.stack}>
                  {projectActivity.map((event) => (
                    <article key={event.id} className={styles.timelineCard}>
                      <div className={styles.timelineHeader}>
                        <strong>{event.label}</strong>
                        <span>{event.timestamp}</span>
                      </div>
                      <p>{event.detail}</p>
                    </article>
                  ))}
                  {projectAlerts.map((alert) => (
                    <article key={alert.id} className={styles.alertCard}>
                      <div className={styles.timelineHeader}>
                        <strong>{alert.title}</strong>
                        <span>{alert.level}</span>
                      </div>
                      <p>{alert.detail}</p>
                    </article>
                  ))}
                </div>
              ) : null}

              {activeView === 'team' ? (
                <div className={styles.stack}>
                  {activeProject.agents.map((agent) => (
                    <Link key={agent.id} href={`/agents/${agent.id}`} className={styles.agentCard}>
                      <div className={styles.timelineHeader}>
                        <div>
                          <strong>{agent.name}</strong>
                          <p>{agent.role}</p>
                        </div>
                        <StatusPill state={agent.status} />
                      </div>
                      <p>{agent.status === 'blocked' ? agent.blocker ?? agent.currentTask : agent.currentTask}</p>
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
                <h3>Office world ready</h3>
              </div>
              <p>The shell is live, but the office snapshot has not returned any projects yet.</p>
            </div>
          </section>
        )}
      </section>
    </main>
  );
}
