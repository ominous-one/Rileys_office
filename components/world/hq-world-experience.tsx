'use client';

import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { StatusPill } from '@/components/ui/status-pill';
import type { OfficeSnapshot } from '@/lib/domain/types';

const HQWorldCanvas = dynamic(() => import('@/components/world/hq-world-canvas').then((module) => module.HQWorldCanvas), {
  ssr: false,
});

function useSceneMode() {
  const [mode, setMode] = useState<'scene' | 'fallback'>('fallback');

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    const hasWebGl = Boolean(window.WebGLRenderingContext);

    setMode(!reducedMotion && hasWebGl ? 'scene' : 'fallback');
  }, []);

  return mode;
}

export function HQWorldExperience({ snapshot }: { snapshot: OfficeSnapshot }) {
  const mode = useSceneMode();
  const projects = snapshot.projects ?? [];
  const alerts = snapshot.alerts ?? [];
  const activity = snapshot.activity?.slice(0, 4) ?? [];
  const activeAgents = useMemo(
    () => projects.flatMap((project) => project.agents).filter((agent) => agent.status === 'active').length,
    [projects],
  );
  const elevatedProjects = useMemo(() => projects.slice(0, 3), [projects]);

  return (
    <main className="page-stack page-stack--world">
      <section className="hq-world-shell hero-card scene-panel">
        <div className="hq-world-shell__copy">
          <div className="hero-card__eyebrow-row">
            <p className="eyebrow">World HQ</p>
            <span className={`connection connection--${snapshot.connection.state}`}>{snapshot.connection.mode} relay · {snapshot.connection.state}</span>
          </div>

          <div className="hero-card__headline hero-card__headline--split">
            <div>
              <h1>Riley&apos;s Office</h1>
              <p className="lede">
                HQ now reads like a premium nocturnal command campus: luminous tower districts, skyline depth, atmospheric lighting, and a fallback path that still preserves the world model.
              </p>
            </div>
            <div className="hero-card__spotlight hero-card__spotlight--scene">
              <span className="hero-card__spotlight-label">Render mode</span>
              <strong>{mode === 'scene' ? 'Interactive skyline live' : 'Fallback skyline engaged'}</strong>
              <span>{projects.length} districts · {activeAgents} active stations · {alerts.length} alert nodes</span>
            </div>
          </div>
        </div>

        <div className="hq-world-stage">
          <div className="hq-world-stage__backdrop" aria-hidden="true" />
          {mode === 'scene' ? (
            <div className="hq-world-stage__canvas-wrap">
              <div className="hq-world-stage__chrome" aria-hidden="true">
                <span className="hq-world-stage__chrome-pill" />
                <span className="hq-world-stage__chrome-pill" />
                <span className="hq-world-stage__chrome-pill" />
              </div>
              <HQWorldCanvas snapshot={snapshot} />
            </div>
          ) : (
            <div className="hq-world-stage__fallback" role="img" aria-label="Fallback world map of Riley's Office headquarters">
              <div className="hq-world-stage__fallback-sky" aria-hidden="true" />
              <div className="hq-world-stage__fallback-floor" aria-hidden="true" />
              {projects.map((project, index) => (
                <div
                  key={project.id}
                  className="hq-world-stage__fallback-building"
                  style={{ ['--accent' as string]: project.accent, ['--tower-height' as string]: `${7.5 + index * 1.25}rem` }}
                >
                  <span className="hq-world-stage__fallback-glow" aria-hidden="true" />
                  <span className="hq-world-stage__fallback-windowband" aria-hidden="true" />
                  <strong>{project.name}</strong>
                  <span>{project.activeRun.progressLabel}</span>
                </div>
              ))}
            </div>
          )}

          <div className="hq-world-overlay">
            {projects.map((project) => (
              <Link key={project.id} href={`/projects/${project.id}`} className="hq-world-overlay__card list-card list-card--interactive">
                <div className="row-between row-start">
                  <div>
                    <span className="project-card__eyebrow">{project.urgency} priority tower</span>
                    <strong>{project.name}</strong>
                  </div>
                  <StatusPill state={project.health} />
                </div>
                <p>{project.tagline}</p>
                <span className="list-card__meta">{project.agents.length} stations · {project.activeRun.progressLabel}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section-card section-card--accent hq-metrics-grid">
        <article className="metric-tile metric-tile--scene metric-tile--world">
          <span className="metric-tile__label">Skyline districts</span>
          <strong>{projects.length}</strong>
          <p>Project structures now sit inside a layered world composition instead of a flat dashboard strip.</p>
        </article>
        <article className="metric-tile metric-tile--scene metric-tile--world">
          <span className="metric-tile__label">Active stations</span>
          <strong>{activeAgents}</strong>
          <p>Live agents emit rails, roof beacons, and circulation cues across the command floor.</p>
        </article>
        <article className="metric-tile metric-tile--scene metric-tile--world">
          <span className="metric-tile__label">Atmosphere score</span>
          <strong>{mode === 'scene' ? 'High' : 'Safe fallback'}</strong>
          <p>Scene mode adds depth, skyline presence, and motion accents without breaking fallback delivery.</p>
        </article>
      </section>

      <section className="section-card section-card--glass">
        <div className="section-card__topline">
          <div>
            <p className="section-card__eyebrow">Beauty upgrades</p>
            <h2>What makes this HQ feel premium now</h2>
          </div>
        </div>
        <div className="list-stack">
          <article className="list-card list-card--soft">
            <strong>World composition</strong>
            <p>Foreground command floor, mid-ground towers, and a distant skyline give the HQ a real sense of staged depth.</p>
          </article>
          <article className="list-card list-card--soft">
            <strong>Lighting + materials</strong>
            <p>Metallic floor accents, emissive roof plates, skyline wash lights, and beacon glow push the scene beyond utilitarian blocks.</p>
          </article>
          <article className="list-card list-card--soft">
            <strong>Motion cues</strong>
            <p>Floating towers, sparkles, rotating atmosphere rings, and active rails create life without demanding user interaction.</p>
          </article>
        </div>
      </section>

      <section className="section-card section-card--glass">
        <div className="section-card__topline">
          <div>
            <p className="section-card__eyebrow">Featured skyline</p>
            <h2>Highest-visibility districts</h2>
          </div>
        </div>
        <div className="world-grid">
          {elevatedProjects.map((project, index) => (
            <article
              key={project.id}
              className="world-card world-card--district"
              style={{ ['--district-accent' as string]: project.accent, ['--district-elevation' as string]: `${index}` }}
            >
              <span className="project-card__eyebrow">{project.health} signal</span>
              <strong>{project.name}</strong>
              <p>{project.tagline}</p>
              <span className="list-card__meta">{project.agents.length} stations · {project.activeRun.progressLabel}</span>
            </article>
          ))}
        </div>
      </section>

      <section className="section-card section-card--glass">
        <div className="section-card__topline">
          <div>
            <p className="section-card__eyebrow">Fallback path</p>
            <h2>Scene-safe on Vercel, readable without WebGL</h2>
          </div>
        </div>
        <div className="list-stack">
          <article className="list-card list-card--soft">
            <strong>Interactive path</strong>
            <p>React Three Fiber drives the command floor, district towers, skyline band, atmosphere rings, active rails, and alert beacon on capable devices.</p>
          </article>
          <article className="list-card list-card--soft">
            <strong>Fallback path</strong>
            <p>Reduced-motion or non-WebGL environments still get a layered skyline treatment through a richer DOM city strip instead of a broken canvas.</p>
          </article>
        </div>
      </section>

      <section className="section-card">
        <div className="section-card__topline">
          <div>
            <p className="section-card__eyebrow">Transit log</p>
            <h2>Fresh world movement</h2>
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
