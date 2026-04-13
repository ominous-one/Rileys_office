'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import { StatusPill } from '@/components/ui/status-pill';
import { OfficeWorld } from '@/components/office-world';
import type { AgentSummary, OfficeSnapshot, ProjectSummary } from '@/lib/domain/types';
import styles from './home-ia-view.module.css';

type SafeProject = ProjectSummary & { agents: AgentSummary[] };

function getSafeProjects(projects: ProjectSummary[]): SafeProject[] {
  return (projects ?? []).map((project) => ({
    ...project,
    agents: Array.isArray(project.agents) ? project.agents : [],
  }));
}

function formatMode(mode: OfficeSnapshot['connection']['mode'], state: OfficeSnapshot['connection']['state']) {
  return `${mode === 'live' ? 'OpenClaw live' : 'Mock'} \u00b7 ${state}`;
}

export function HomeIAView({ snapshot }: { snapshot: OfficeSnapshot }) {
  const projects = useMemo(() => getSafeProjects(snapshot.projects ?? []), [snapshot.projects]);
  const [activeProjectId, setActiveProjectId] = useState(() => projects[0]?.id ?? '');
  const [selectedAgentId, setSelectedAgentId] = useState<string | null>(null);

  const activeProject = useMemo(() => {
    return projects.find((p) => p.id === activeProjectId) ?? projects[0] ?? null;
  }, [activeProjectId, projects]);

  const alerts = Array.isArray(snapshot.alerts) ? snapshot.alerts : [];
  const activity = Array.isArray(snapshot.activity) ? snapshot.activity : [];
  const conversations = Array.isArray(snapshot.conversations) ? snapshot.conversations : [];

  const allAgents = useMemo(() => {
    return activeProject?.agents ?? [];
  }, [activeProject]);

  const selectedAgent = useMemo(() => {
    return allAgents.find((a) => a.id === selectedAgentId) ?? null;
  }, [allAgents, selectedAgentId]);

  const connectionLabel = formatMode(snapshot.connection.mode, snapshot.connection.state);

  return (
    <main className={`page-stack page-stack--world ${styles.page}`}>
      {/* Office world map — the hero */}
      <OfficeWorld
        agents={allAgents}
        selectedAgentId={selectedAgentId}
        onSelectAgent={setSelectedAgentId}
        connectionLabel={connectionLabel}
      />

      {/* Agent detail sidebar (when an agent is selected) */}
      {selectedAgent ? (
        <section className={styles.agentPanel}>
          <div className={styles.agentPanelHeader}>
            <div>
              <span className={styles.eyebrow}>Workstation</span>
              <h3>{selectedAgent.name}</h3>
              <p className={styles.muted}>{selectedAgent.role}</p>
            </div>
            <StatusPill state={selectedAgent.status} />
          </div>
          <div className={styles.agentPanelBody}>
            <div className={styles.agentField}>
              <span className={styles.fieldLabel}>Focus</span>
              <span>{selectedAgent.currentTask}</span>
            </div>
            {selectedAgent.blocker ? (
              <div className={styles.agentField}>
                <span className={styles.fieldLabel}>Blocker</span>
                <span className={styles.blockerText}>{selectedAgent.blocker}</span>
              </div>
            ) : null}
            <Link href={`/agents/${selectedAgent.id}`} className={styles.deskLink}>
              Open full workstation &rarr;
            </Link>
          </div>
          <button
            type="button"
            className={styles.panelClose}
            onClick={() => setSelectedAgentId(null)}
            aria-label="Close panel"
          >
            &times;
          </button>
        </section>
      ) : null}

      {/* Project tabs */}
      <section className={styles.projectTabs} aria-label="Project rooms">
        {projects.map((project) => (
          <button
            key={project.id}
            type="button"
            className={`${styles.projectTab} ${project.id === activeProject?.id ? styles.projectTabActive : ''}`}
            style={{ ['--tab-accent' as string]: project.accent }}
            onClick={() => { setActiveProjectId(project.id); setSelectedAgentId(null); }}
          >
            <span>{project.name}</span>
            <small>{project.activeRun.progressLabel ?? 'Standby'}</small>
          </button>
        ))}
      </section>

      {/* Activity & alerts feed */}
      {(activity.length > 0 || alerts.length > 0) ? (
        <section className={styles.feedSection}>
          <span className={styles.feedLabel}>Live Output</span>
          <div className={styles.feedList}>
            {activity.slice(0, 5).map((event) => (
              <article key={event.id} className={styles.feedItem}>
                <strong>{event.label}</strong>
                <span className={styles.muted}>{event.timestamp}</span>
                <p>{event.detail}</p>
              </article>
            ))}
            {alerts.slice(0, 3).map((alert) => (
              <article key={alert.id} className={`${styles.feedItem} ${styles.feedAlert}`}>
                <strong>{alert.title}</strong>
                <span className={styles.muted}>{alert.level}</span>
                <p>{alert.detail}</p>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      {/* Quick nav */}
      {activeProject ? (
        <section className={styles.quickNav}>
          <Link href={`/projects/${activeProject.id}`} className={styles.navButton}>
            Open project suite
          </Link>
          {allAgents[0] ? (
            <Link href={`/agents/${allAgents[0].id}`} className={styles.navButtonSecondary}>
              Lead workstation
            </Link>
          ) : null}
        </section>
      ) : null}
    </main>
  );
}
