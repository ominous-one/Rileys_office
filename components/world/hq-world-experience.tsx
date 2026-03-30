'use client';

import Link from 'next/link';
import { useMemo } from 'react';
import { StatusPill } from '@/components/ui/status-pill';
import type { AgentSummary, OfficeSnapshot } from '@/lib/domain/types';

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(value, max));
}

interface LobbyAgentNode {
  id: string;
  name: string;
  role: string;
  status: AgentSummary['status'];
  blocker?: string;
  accent: string;
  x: number;
  y: number;
  delay: number;
  duration: number;
}

function buildLobbyAgents(snapshot: OfficeSnapshot): LobbyAgentNode[] {
  const agents = snapshot.projects.flatMap((project, projectIndex) =>
    project.agents.map((agent, agentIndex) => ({
      id: agent.id,
      name: agent.name,
      role: agent.role,
      status: agent.status,
      blocker: agent.blocker,
      accent: project.accent,
      x: 18 + (projectIndex % 4) * 19 + (agentIndex % 2) * 6,
      y: 57 + Math.floor(projectIndex / 4) * 10 + agentIndex * 6,
      delay: projectIndex * 0.35 + agentIndex * 0.18,
      duration: 4.8 + ((projectIndex + agentIndex) % 4) * 0.7,
    })),
  );

  return agents.slice(0, 8);
}

export function HQWorldExperience({ snapshot }: { snapshot: OfficeSnapshot }) {
  const projects = snapshot.projects ?? [];
  const alerts = snapshot.alerts ?? [];
  const activity = snapshot.activity?.slice(0, 4) ?? [];
  const featuredProjects = useMemo(() => projects.slice(0, 4), [projects]);
  const activeAgents = useMemo(
    () => projects.flatMap((project) => project.agents).filter((agent) => agent.status === 'active').length,
    [projects],
  );
  const displayWalls = Math.max(2, Math.min(projects.length + 1, 5));
  const heat = clamp(activeAgents * 9 + alerts.length * 12, 20, 96);
  const lobbyAgents = useMemo(() => buildLobbyAgents(snapshot), [snapshot]);

  return (
    <main className="page-stack page-stack--world">
      <section className="hero-card scene-panel scene-panel--office hq-lobby-shell">
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
          <div className="hq-lobby-backdrop__statusring" style={{ ['--heat' as string]: `${heat}%` }} />
          <div className="hq-lobby-backdrop__monitors">
            {Array.from({ length: displayWalls }).map((_, index) => (
              <span key={`display-${index}`} className="hq-lobby-backdrop__monitor" style={{ ['--display-index' as string]: `${index}` }} />
            ))}
          </div>
          <div className="hq-lobby-backdrop__desks">
            {featuredProjects.map((project, index) => (
              <div key={project.id} className="hq-lobby-backdrop__desk" style={{ ['--desk-index' as string]: `${index}`, ['--desk-accent' as string]: project.accent }}>
                <span className="hq-lobby-backdrop__desk-screen" />
                <span className="hq-lobby-backdrop__desk-chair" />
              </div>
            ))}
          </div>
          <div className="hq-lobby-agents">
            {lobbyAgents.map((agent) => (
              <div
                key={agent.id}
                className={`hq-lobby-agent hq-lobby-agent--${agent.status}`}
                style={{
                  ['--agent-x' as string]: `${agent.x}%`,
                  ['--agent-y' as string]: `${agent.y}%`,
                  ['--agent-accent' as string]: agent.accent,
                  ['--agent-delay' as string]: `${agent.delay}s`,
                  ['--agent-duration' as string]: `${agent.duration}s`,
                }}
              >
                <span className="hq-lobby-agent__ping" />
                <span className="hq-lobby-agent__body">
                  <span className="hq-lobby-agent__halo" />
                  <span className="hq-lobby-agent__dot" />
                </span>
                <span className="hq-lobby-agent__label">
                  <strong>{agent.name}</strong>
                  <span>{agent.status === 'blocked' ? agent.blocker ?? 'Blocked' : agent.role}</span>
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="hq-world-shell__copy hq-lobby-shell__copy">
          <div className="hero-card__eyebrow-row">
            <p className="eyebrow">Live command lobby</p>
            <span className={`connection connection--${snapshot.connection.state}`}>
              {snapshot.connection.mode} relay Ã¢â‚¬Â¢ {snapshot.connection.state}
            </span>
          </div>

          <div className="hero-card__headline hero-card__headline--split hq-lobby-shell__headline">
            <div>
              <h1>Riley&apos;s Office</h1>
              <p className="lede">
                A static command-room backdrop with lightweight live motion that only animates agents, so the lobby stays polished, readable, and mobile-first.
              </p>
            </div>
            <div className="hero-card__spotlight hero-card__spotlight--scene hq-lobby-shell__spotlight">
              <span className="hero-card__spotlight-label">Lobby pressure</span>
              <strong>{activeAgents} active agents Ã¢â‚¬Â¢ {alerts.length} live alerts</strong>
              <span>{projects.length} project zones Ã¢â‚¬Â¢ {lobbyAgents.length} tracked agents Ã¢â‚¬Â¢ heat {heat}%</span>
            </div>
          </div>
        </div>

        <div className="hq-lobby-zones">
          {featuredProjects.map((project, index) => (
            <Link
              key={project.id}
              href={`/projects/${project.id}`}
              className="hq-lobby-zone"
              style={{ ['--zone-accent' as string]: project.accent, ['--zone-index' as string]: `${index}` }}
            >
              <div className="row-between row-start">
                <div>
                  <span className="project-card__eyebrow">zone {index + 1}</span>
                  <strong>{project.name}</strong>
                </div>
                <StatusPill state={project.health} />
              </div>
              <p>{project.tagline}</p>
              <span className="list-card__meta">{project.agents.length} seats Ã¢â‚¬Â¢ {project.activeRun.progressLabel}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="section-card section-card--accent hq-metrics-grid">
        <article className="metric-tile metric-tile--scene metric-tile--world metric-tile--office">
          <span className="metric-tile__label">Project zones</span>
          <strong>{projects.length}</strong>
          <p>Interactive lobby stations stay clickable while the visual shell sells a deeper game-like command room.</p>
        </article>
        <article className="metric-tile metric-tile--scene metric-tile--world metric-tile--office">
          <span className="metric-tile__label">Live pressure</span>
          <strong>{heat}%</strong>
          <p>Only agent markers animate now, keeping the room itself stable and lighter on mobile GPUs.</p>
        </article>
        <article className="metric-tile metric-tile--scene metric-tile--world metric-tile--office">
          <span className="metric-tile__label">Active stations</span>
          <strong>{activeAgents}</strong>
          <p>Snapshot state still decides which operators pulse, hover, wait, or flag blocked work in the lobby.</p>
        </article>
      </section>

      <section className="section-card section-card--glass">
        <div className="section-card__topline">
          <div>
            <p className="section-card__eyebrow">Why this pivot works</p>
            <h2>Static environment, live operator motion</h2>
          </div>
        </div>
        <div className="list-stack">
          <article className="list-card list-card--soft">
            <strong>Background stays locked</strong>
            <p>Ceiling, floor, desks, walls, and screens remain fixed, so the room reads clearly and avoids unnecessary motion noise.</p>
          </article>
          <article className="list-card list-card--soft">
            <strong>Agents carry the motion</strong>
            <p>Active, waiting, and blocked operators each get a distinct animated marker layered over the scene using existing snapshot data.</p>
          </article>
          <article className="list-card list-card--soft">
            <strong>Lightweight for phones</strong>
            <p>The homepage no longer depends on a live 3D scene for motion, which keeps the hero cheaper to render and easier to maintain.</p>
          </article>
        </div>
      </section>

      <section className="section-card section-card--glass">
        <div className="section-card__topline">
          <div>
            <p className="section-card__eyebrow">Fresh floor activity</p>
            <h2>Live office log</h2>
          </div>
        </div>
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
        </div>
      </section>
    </main>
  );
}