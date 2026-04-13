'use client';

import { useMemo, useState, useCallback, useRef, useEffect } from 'react';
import Link from 'next/link';
import { StatusPill } from '@/components/ui/status-pill';
import type { AgentSummary, OfficeSnapshot, ProjectSummary } from '@/lib/domain/types';

const MAP_IMG = '/reference/office-map-pixel.png';
const MAP_W = 1024;
const MAP_H = 534;

/* Room zones as percentages of the map */
const ROOMS = [
  { id: 'workstations', name: 'Workstations', x: 5, y: 10, w: 90, h: 28 },
  { id: 'meeting',      name: 'Meeting Room',  x: 30, y: 42, w: 40, h: 28 },
  { id: 'archive',      name: 'Archive',        x: 10, y: 74, w: 80, h: 22 },
];

/* Seat positions (% of full map) matching where desks actually are */
const SEATS = [
  { x: 12, y: 24 }, { x: 22, y: 24 }, { x: 40, y: 24 }, { x: 52, y: 24 },
  { x: 64, y: 24 }, { x: 76, y: 24 }, { x: 86, y: 24 }, { x: 50, y: 56 },
];

/* Agent sprite by status */
function getSprite(status: string) {
  switch (status) {
    case 'active': return '/sprites/characters/agent-dev-full.png';
    case 'blocked': return '/sprites/characters/agent-tech-full.png';
    default: return '/sprites/office/Julia-Idle.png';
  }
}

function getColor(status: string) {
  switch (status) {
    case 'active': return '#78f7b5';
    case 'blocked': return '#ff7b7b';
    case 'waiting': return '#95d8ff'; case 'stale': return '#8792a8';
    default: return '#8792a8';
  }
}

type SafeProject = ProjectSummary & { agents: AgentSummary[] };

function getSafeProjects(projects: ProjectSummary[]): SafeProject[] {
  return (projects ?? []).map(p => ({ ...p, agents: Array.isArray(p.agents) ? p.agents : [] }));
}

export function HomeIAView({ snapshot }: { snapshot: OfficeSnapshot }) {
  const projects = useMemo(() => getSafeProjects(snapshot.projects ?? []), [snapshot.projects]);
  const [activeProjectId, setActiveProjectId] = useState(() => projects[0]?.id ?? '');
  const [selectedAgentId, setSelectedAgentId] = useState<string | null>(null);
  const [mapScale, setMapScale] = useState(2);
  const mapScrollRef = useRef<HTMLDivElement>(null);

  const activeProject = useMemo(() => projects.find(p => p.id === activeProjectId) ?? projects[0] ?? null, [activeProjectId, projects]);
  const agents = useMemo(() => activeProject?.agents ?? [], [activeProject]);
  const selected = useMemo(() => agents.find(a => a.id === selectedAgentId) ?? null, [agents, selectedAgentId]);
  const alerts = Array.isArray(snapshot.alerts) ? snapshot.alerts : [];
  const activity = Array.isArray(snapshot.activity) ? snapshot.activity : [];

  const handleZoom = useCallback((dir: 1 | -1) => {
    setMapScale(s => Math.min(4, Math.max(1, s + dir * 0.5)));
  }, []);

  /* Scroll-wheel zoom */
  useEffect(() => {
    const el = mapScrollRef.current;
    if (!el) return;
    function onWheel(e: WheelEvent) {
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault();
        setMapScale(s => Math.min(4, Math.max(1, s + (e.deltaY < 0 ? 0.25 : -0.25))));
      }
    }
    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, []);

  const mapW = MAP_W * mapScale;
  const mapH = MAP_H * mapScale;
  const isLive = snapshot.connection.mode === 'live';

  return (
    <div className="office-world">
      <main className="office-layout">
        <div className="layout-three-column">
          {/* Left sidebar: agent roster */}
          <div className="layout-left">
            <div className="sidebar-section">
              <span className="sidebar-label">Presence</span>
              <div className="presence-row">
                <span className="presence-dot-lg" style={{ background: '#78f7b5' }} />
                <span className="presence-name">Active</span>
                <span className="presence-count">{agents.filter(a => a.status === 'active').length}</span>
              </div>
              <div className="presence-row">
                <span className="presence-dot-lg" style={{ background: '#8792a8' }} />
                <span className="presence-name">Total</span>
                <span className="presence-count">{agents.length}</span>
              </div>
            </div>
            <div className="sidebar-section">
              <span className="sidebar-label">Agents</span>
              {agents.map(agent => (
                <button
                  key={agent.id}
                  type="button"
                  className={`roster-card ${selectedAgentId === agent.id ? 'active' : ''}`}
                  onClick={() => setSelectedAgentId(agent.id === selectedAgentId ? null : agent.id)}
                >
                  <span className="roster-dot" style={{ background: getColor(agent.status) }} />
                  <div className="roster-info">
                    <strong>{agent.name}</strong>
                    <span>{agent.role}</span>
                  </div>
                  <span className="roster-state" style={{ color: getColor(agent.status) }}>{agent.status}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Center: map */}
          <div className="layout-center">
            <div className="map-viewport">
              <div className="map-status">
                <h1 className="office-title">Riley&apos;s Office</h1>
                <span className={`office-status ${isLive ? 'on' : 'off'}`}>{isLive ? 'Live' : 'Mock'}</span>
                <span className="office-clock">{agents.length} agents</span>
              </div>

              <div className="map-controls">
                <button onClick={() => handleZoom(1)} title="Zoom in" aria-label="Zoom in">+</button>
                <button onClick={() => handleZoom(-1)} title="Zoom out" aria-label="Zoom out">&minus;</button>
                <span className="zoom-label">{mapScale}x</span>
              </div>

              <div className="map-scroll" ref={mapScrollRef}>
                <div className="map-container" style={{ width: mapW, height: mapH }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={MAP_IMG} alt="Riley's Office pixel-art map" className="map-bg" draggable={false} />

                  {/* Room overlays */}
                  {ROOMS.map(room => (
                    <div
                      key={room.id}
                      className="room-overlay"
                      style={{ left: `${room.x}%`, top: `${room.y}%`, width: `${room.w}%`, height: `${room.h}%` }}
                    >
                      <span className="room-label">{room.name}</span>
                      <span className="room-count">{agents.filter((_, i) => {
                        const seat = SEATS[i];
                        return seat && seat.x >= room.x && seat.x <= room.x + room.w && seat.y >= room.y && seat.y <= room.y + room.h;
                      }).length}</span>
                    </div>
                  ))}

                  {/* Agent sprites */}
                  {agents.slice(0, SEATS.length).map((agent, i) => {
                    const seat = SEATS[i];
                    const color = getColor(agent.status);
                    const sprite = getSprite(agent.status);
                    const isSelected = selectedAgentId === agent.id;
                    const isIdle = agent.status === 'waiting' || agent.status === 'stale';
                    const task = agent.status === 'blocked' ? agent.blocker ?? agent.currentTask : agent.currentTask;

                    return (
                      <div
                        key={agent.id}
                        className={`agent-sprite ${isSelected ? 'selected' : ''} ${isIdle ? 'idle' : ''}`}
                        style={{ left: `${seat.x}%`, top: `${seat.y}%`, ['--accent' as string]: color }}
                        role="button"
                        tabIndex={0}
                        aria-label={`${agent.name} - ${agent.status}`}
                        onClick={() => setSelectedAgentId(agent.id === selectedAgentId ? null : agent.id)}
                        onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSelectedAgentId(agent.id); } }}
                      >
                        {/* Speech bubble */}
                        {(isSelected || agent.status === 'active') && task ? (
                          <div className="speech-bubble" style={{ ['--bubble-accent' as string]: color }}>
                            <span className="speech-text">{task.length > 50 ? task.slice(0, 47) + '\u2026' : task}</span>
                            <div className="speech-tail" />
                          </div>
                        ) : null}

                        <div className="sprite-shadow" />
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={sprite} alt={agent.name} className="sprite-art" style={{ width: 40, height: 40 }} draggable={false} />
                        <div className="sprite-badge" style={{ background: color }} />
                        <div className="sprite-label">{agent.name}</div>

                        {agent.status === 'active' && (
                          <div className="sprite-pulse" style={{ borderColor: color }} />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Bottom project tabs */}
              <div className="project-tabs-bar">
                {projects.map(project => (
                  <button
                    key={project.id}
                    type="button"
                    className={`project-tab-btn ${project.id === activeProject?.id ? 'active' : ''}`}
                    style={{ ['--tab-accent' as string]: project.accent }}
                    onClick={() => { setActiveProjectId(project.id); setSelectedAgentId(null); }}
                  >
                    <span>{project.name}</span>
                    <small>{project.activeRun.progressLabel ?? 'Standby'}</small>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right sidebar */}
          <div className="layout-right">
            {selected ? (
              <div className="detail-card" style={{ borderColor: getColor(selected.status) }}>
                <div className="detail-head">
                  <div className="detail-avatar" style={{ background: getColor(selected.status) + '22', border: `1px solid ${getColor(selected.status)}44` }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={getSprite(selected.status)} alt="" style={{ width: 32, height: 32, imageRendering: 'pixelated' as const }} />
                  </div>
                  <div>
                    <h3>{selected.name}</h3>
                    <span className="roster-state" style={{ color: getColor(selected.status) }}>{selected.status}</span>
                  </div>
                </div>
                <dl className="detail-fields">
                  <dt>Role</dt><dd>{selected.role}</dd>
                  <dt>Focus</dt><dd>{selected.currentTask}</dd>
                  {selected.blocker ? <><dt>Blocker</dt><dd style={{ color: '#ff7b7b' }}>{selected.blocker}</dd></> : null}
                </dl>
                <Link href={`/agents/${selected.id}`} className="detail-link">Open workstation &rarr;</Link>
              </div>
            ) : (
              <div className="sidebar-section">
                <span className="sidebar-label">Select an agent</span>
                <p style={{ fontSize: 11, color: '#8792a8' }}>Click an agent on the map or in the roster to see their details.</p>
              </div>
            )}

            {/* Activity feed */}
            <div className="sidebar-section">
              <span className="sidebar-label">Live Output</span>
              {activity.slice(0, 6).map(event => (
                <div key={event.id} className="feed-entry">
                  <span className="feed-icon">&bull;</span>
                  <div className="feed-body">
                    <span className="feed-text">{event.label}: {event.detail}</span>
                    <span className="feed-time">{event.timestamp}</span>
                  </div>
                </div>
              ))}
              {activity.length === 0 && <p style={{ fontSize: 11, color: '#5a6478' }}>No activity yet.</p>}
            </div>

            {/* Alerts */}
            {alerts.length > 0 && (
              <div className="sidebar-section">
                <span className="sidebar-label">Alerts</span>
                {alerts.slice(0, 4).map(alert => (
                  <div key={alert.id} className="feed-entry" style={{ borderLeftColor: '#ff7b7b44' }}>
                    <span className="feed-icon" style={{ color: '#ff7b7b' }}>&#x26A0;</span>
                    <div className="feed-body">
                      <span className="feed-text">{alert.title}: {alert.detail}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Quick nav */}
            {activeProject && (
              <div className="sidebar-section">
                <Link href={`/projects/${activeProject.id}`} className="detail-link">Open project suite &rarr;</Link>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

