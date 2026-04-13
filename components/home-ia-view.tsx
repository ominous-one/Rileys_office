'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
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
  return `${mode === 'live' ? 'Live' : 'Mock'} \u00b7 ${state}`;
}

export function HomeIAView({ snapshot }: { snapshot: OfficeSnapshot }) {
  const projects = useMemo(() => getSafeProjects(snapshot.projects ?? []), [snapshot.projects]);
  const [activeProjectId, setActiveProjectId] = useState(() => projects[0]?.id ?? '');
  const [selectedAgentId, setSelectedAgentId] = useState<string | null>(null);

  const activeProject = useMemo(() => {
    return projects.find((p) => p.id === activeProjectId) ?? projects[0] ?? null;
  }, [activeProjectId, projects]);

  const allAgents = useMemo(() => activeProject?.agents ?? [], [activeProject]);
  const alerts = Array.isArray(snapshot.alerts) ? snapshot.alerts : [];
  const activity = Array.isArray(snapshot.activity) ? snapshot.activity : [];
  const selectedAgent = useMemo(() => allAgents.find((a) => a.id === selectedAgentId) ?? null, [allAgents, selectedAgentId]);
  const connectionLabel = formatMode(snapshot.connection.mode, snapshot.connection.state);

  return (
    <div className={styles.shell}>
      {/* Main viewport — map fills everything */}
      <div className={styles.viewport}>
        <OfficeWorld
          agents={allAgents}
          selectedAgentId={selectedAgentId}
          onSelectAgent={setSelectedAgentId}
          connectionLabel={connectionLabel}
        />
      </div>

      {/* Right sidebar */}
      <aside className={styles.sidebar}>
        {/* Presence summary */}
        <div className={styles.sidebarSection}>
          <span className={styles.sidebarLabel}>Presence</span>
          <div className={styles.presenceSummary}>
            <span className={styles.presenceActive}>{allAgents.filter(a => a.status === 'active').length} active</span>
            <span className={styles.presenceTotal}>{allAgents.length} total</span>
          </div>
        </div>

        {/* Agent roster */}
        <div className={styles.sidebarSection}>
          <span className={styles.sidebarLabel}>Agents</span>
          <div className={styles.agentList}>
            {allAgents.map((agent) => (
              <button
                key={agent.id}
                type="button"
                className={`${styles.agentListItem} ${selectedAgentId === agent.id ? styles.agentListItemActive : ''}`}
                onClick={() => setSelectedAgentId(agent.id === selectedAgentId ? null : agent.id)}
              >
                <span className={styles.agentDot} style={{ background: agent.status === 'active' ? '#78f7b5' : agent.status === 'blocked' ? '#ff7b7b' : '#8792a8' }} />
                <div className={styles.agentListInfo}>
                  <strong>{agent.name}</strong>
                  <span>{agent.role}</span>
                </div>
                <StatusPill state={agent.status} />
              </button>
            ))}
          </div>
        </div>

        {/* Selected agent detail */}
        {selectedAgent ? (
          <div className={styles.sidebarSection}>
            <span className={styles.sidebarLabel}>Workstation</span>
            <div className={styles.agentDetail}>
              <div className={styles.detailField}><span>Role</span><strong>{selectedAgent.role}</strong></div>
              <div className={styles.detailField}><span>Focus</span><strong>{selectedAgent.currentTask}</strong></div>
              {selectedAgent.blocker ? <div className={styles.detailField}><span>Blocker</span><strong className={styles.blockerText}>{selectedAgent.blocker}</strong></div> : null}
              <Link href={`/agents/${selectedAgent.id}`} className={styles.deskLink}>Open workstation &rarr;</Link>
            </div>
          </div>
        ) : null}

        {/* Live output */}
        {activity.length > 0 ? (
          <div className={styles.sidebarSection}>
            <span className={styles.sidebarLabel}>Live Output <span className={styles.eventCount}>{activity.length}</span></span>
            <div className={styles.feedList}>
              {activity.slice(0, 4).map((event) => (
                <div key={event.id} className={styles.feedItem}>
                  <strong>{event.label}</strong>
                  <span>{event.detail}</span>
                  <span className={styles.feedTime}>{event.timestamp}</span>
                </div>
              ))}
            </div>
          </div>
        ) : null}

        {/* Alerts */}
        {alerts.length > 0 ? (
          <div className={styles.sidebarSection}>
            <span className={styles.sidebarLabel}>Alerts</span>
            <div className={styles.feedList}>
              {alerts.slice(0, 3).map((alert) => (
                <div key={alert.id} className={`${styles.feedItem} ${styles.feedAlert}`}>
                  <strong>{alert.title}</strong>
                  <span>{alert.detail}</span>
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </aside>

      {/* Bottom project tabs */}
      <nav className={styles.bottomBar}>
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
      </nav>
    </div>
  );
}
