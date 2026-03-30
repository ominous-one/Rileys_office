'use client';

import Link from 'next/link';
import { useMemo } from 'react';
import { StatusPill } from '@/components/ui/status-pill';
import type { OfficeSnapshot } from '@/lib/domain/types';

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(value, max));
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
        </div>

        <div className="hq-world-shell__copy hq-lobby-shell__copy">
          <div className="hero-card__eyebrow-row">
            <p className="eyebrow">Live command lobby</p>
            <span className={`connection connection--${snapshot.connection.state}`}>
              {snapshot.connection.mode} relay · {snapshot.connection.state}
            </span>
          </div>

          <div className="hero-card__headline hero-card__headline--split hq-lobby-shell__headline">
            <div>
              <h1>Riley&apos;s Office</h1>
              <p className="lede">
                A cinematic HQ shell designed to read like a premium game lobby on mobile while still updating live from your OpenClaw project state.
              </p>
            </div>
            <div className="hero-card__spotlight hero-card__spotlight--scene hq-lobby-shell__spotlight">
              <span className="hero-card__spotlight-label">Lobby pressure</span>
              <strong>{activeAgents} active agents · {alerts.length} live alerts</strong>
              <span>{projects.length} project zones · {displayWalls} ops displays · heat {heat}%</span>
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
              <span className="list-card__meta">{project.agents.length} seats · {project.activeRun.progressLabel}</span>
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
          <p>Lobby glow and monitor intensity rise with active agents and alerts from the OpenClaw-backed snapshot.</p>
        </article>
        <article className="metric-tile metric-tile--scene metric-tile--world metric-tile--office">
          <span className="metric-tile__label">Active stations</span>
          <strong>{activeAgents}</strong>
          <p>Real runtime state still drives the shell so the scene feels alive instead of being a dead mockup.</p>
        </article>
      </section>

      <section className="section-card section-card--glass">
        <div className="section-card__topline">
          <div>
            <p className="section-card__eyebrow">Why this pivot works</p>
            <h2>Game-like look, web-safe delivery</h2>
          </div>
        </div>
        <div className="list-stack">
          <article className="list-card list-card--soft">
            <strong>Cinematic shell</strong>
            <p>Depth, lighting, fog, screens, and floor perspective now come from a purpose-built faux-3D composition instead of fragile full-scene WebGL.</p>
          </article>
          <article className="list-card list-card--soft">
            <strong>Interactive by default</strong>
            <p>Project zones remain tappable, readable, and linked into live project views without making the homepage feel like a plain dashboard.</p>
          </article>
          <article className="list-card list-card--soft">
            <strong>Live OpenClaw state</strong>
            <p>Active agents, alerts, and project counts still drive what you see, so the lobby stays connected to your runtime instead of becoming static art.</p>
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
