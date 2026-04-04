'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { StatusPill } from '@/components/ui/status-pill';
import type { OfficeSnapshot, ProjectSummary } from '@/lib/domain/types';
import styles from './home-ia-view.module.css';

type HomeView = 'overview' | 'live' | 'team';

type RoomAgent = {
  id: string;
  name: string;
  role: string;
  status: ProjectSummary['agents'][number]['status'];
  currentTask: string;
  blocker?: string;
  x: number;
  y: number;
  accent: string;
};

const viewLabels: Record<HomeView, { eyebrow: string; title: string; description: string }> = {
  overview: {
    eyebrow: 'Overview',
    title: 'Room brief',
    description: 'Read the room first: active mission, occupied desks, and the path into the live project suite.',
  },
  live: {
    eyebrow: 'Live feed',
    title: 'OpenClaw activity on the floor',
    description: 'Fresh movement, alerting, and thread state pulled into the office instead of floating above it.',
  },
  team: {
    eyebrow: 'Operators',
    title: 'People in the room',
    description: 'Agents are represented as stationed operators with live status and current work pinned to their desk.',
  },
};

function getSafeProject(projects: ProjectSummary[]) {
  return projects[0] ?? null;
}

function getPressure(activeAgents: number, alerts: number) {
  return Math.min(96, 24 + activeAgents * 17 + alerts * 14);
}

function buildRoomAgents(project: ProjectSummary | null): RoomAgent[] {
  if (!project) return [];

  const anchors = [
    { x: 23, y: 63 },
    { x: 40, y: 56 },
    { x: 60, y: 58 },
    { x: 77, y: 65 },
  ];

  return project.agents.slice(0, 4).map((agent, index) => ({
    id: agent.id,
    name: agent.name,
    role: agent.role,
    status: agent.status,
    currentTask: agent.currentTask,
    blocker: agent.blocker,
    x: anchors[index]?.x ?? 50,
    y: anchors[index]?.y ?? 60,
    accent: project.accent,
  }));
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

  const roomAgents = useMemo(() => buildRoomAgents(activeProject), [activeProject]);
  const leadAgent = activeProject?.agents[0] ?? null;
  const activeAgents = activeProject?.agents.filter((agent) => agent.status === 'active').length ?? 0;
  const totalAgents = activeProject?.agents.length ?? 0;
  const pressure = getPressure(activeAgents, projectAlerts.length);
  const conversation = snapshot.conversations.find((item) => item.title.toLowerCase().includes('riley')) ?? snapshot.conversations[0] ?? null;

  return (
    <main className={`page-stack page-stack--world ${styles.page}`}>
      <section className={styles.shell} style={{ ['--project-accent' as string]: activeProject?.accent ?? '#9d7bff' }}>
        <header className={styles.topBar}>
          <div>
            <span className={styles.eyebrow}>Riley&apos;s Office</span>
            <h1 className={styles.title}>A furnished command world that lets the room do the talking.</h1>
          </div>
          <div className={styles.connectionBadge}>
            <span>{snapshot.connection.mode}</span>
            <strong>{snapshot.connection.state}</strong>
            <small>{snapshot.connection.lastUpdated}</small>
          </div>
        </header>

        <section className={styles.stageCard}>
          <div className={styles.sceneCopy}>
            <div className={styles.sceneLead}>
              <span className={styles.sceneLabel}>Active suite</span>
              <strong>{activeProject?.name ?? 'No active project'}</strong>
              <p>{activeProject?.mission ?? 'Waiting on office snapshot data.'}</p>
            </div>

            <div className={styles.metricRail}>
              <article className={styles.metricTile}>
                <span>Run state</span>
                <strong>{activeProject?.activeRun.progressLabel ?? 'Standby'}</strong>
              </article>
              <article className={styles.metricTile}>
                <span>Operators</span>
                <strong>{activeAgents}/{totalAgents}</strong>
              </article>
              <article className={styles.metricTile}>
                <span>Pressure</span>
                <strong>{pressure}%</strong>
              </article>
            </div>
          </div>

          <div className={styles.roomStage} aria-hidden="true">
            <div className={styles.skyGlow} />
            <div className={styles.windowBand} />
            <div className={styles.wallLeft} />
            <div className={styles.wallRight} />
            <div className={styles.ceiling} />
            <div className={styles.floor} />
            <div className={styles.walkwayGlow} />
            <div className={styles.centralTable} />
            <div className={styles.tableLight} />
            <div className={styles.opsWall}>
              {projectAlerts.length ? projectAlerts.map((alert) => <span key={alert.id} className={styles.opsScreen} />) : <span className={styles.opsScreen} />}
            </div>

            <div className={styles.deskRow}>
              {projects.slice(0, 4).map((project, index) => (
                <div key={project.id} className={styles.deskPod} style={{ ['--desk-index' as string]: `${index}`, ['--desk-accent' as string]: project.accent }}>
                  <span className={styles.deskMonitor} />
                  <span className={styles.deskSurface} />
                  <span className={styles.deskChair} />
                </div>
              ))}
            </div>

            {roomAgents.map((agent) => (
              <div
                key={agent.id}
                className={`${styles.agentMarker} ${styles[`agentMarker${agent.status.charAt(0).toUpperCase()}${agent.status.slice(1)}`] ?? ''}`}
                style={{
                  ['--agent-x' as string]: `${agent.x}%`,
                  ['--agent-y' as string]: `${agent.y}%`,
                  ['--agent-accent' as string]: agent.accent,
                }}
              >
                <span className={styles.agentPulse} />
                <span className={styles.agentBody} />
                <span className={styles.agentTag}>{agent.name}</span>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.projectRail} aria-label="Projects">
          {projects.map((project) => (
            <button
              key={project.id}
              type="button"
              className={`${styles.projectChip} ${project.id === activeProject?.id ? styles.projectChipActive : ''}`}
              onClick={() => setActiveProjectId(project.id)}
              style={{ ['--chip-accent' as string]: project.accent }}
            >
              <span>{project.name}</span>
              <small>{project.activeRun.progressLabel}</small>
            </button>
          ))}
        </section>

        {activeProject ? (
          <>
            <section className={styles.controlDeck}>
              <div className={styles.directiveCard}>
                <span className={styles.sectionLabel}>Current directive</span>
                <strong>{activeProject.activeRun.summary}</strong>
                <p>{activeProject.tagline}</p>
              </div>
              <div className={styles.summaryCard}>
                <span className={styles.sectionLabel}>Lead desk</span>
                <strong>{leadAgent?.name ?? 'Unassigned'}</strong>
                <p>{leadAgent?.currentTask ?? 'Assign a lead to surface workstation details.'}</p>
                <div className={styles.statusRow}>
                  <StatusPill state={activeProject.health} />
                </div>
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
                  <article className={styles.focusCard}>
                    <span className={styles.cardLabel}>Mission posture</span>
                    <strong>{activeProject.mission}</strong>
                    <p>{activeProject.activeRun.progressLabel}</p>
                  </article>
                  <article className={styles.focusCard}>
                    <span className={styles.cardLabel}>Conversation rail</span>
                    <strong>{conversation?.title ?? 'No active thread'}</strong>
                    <p>{conversation?.latestMessage ?? 'Conversation updates will appear here.'}</p>
                  </article>
                  <div className={styles.actionRow}>
                    <Link href={`/projects/${activeProject.id}`} className={styles.primaryAction}>Open project room</Link>
                    {leadAgent ? <Link href={`/agents/${leadAgent.id}`} className={styles.secondaryAction}>Open lead workstation</Link> : null}
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
        ) : null}
      </section>
    </main>
  );
}
