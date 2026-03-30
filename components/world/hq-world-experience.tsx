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

    const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
    const coarsePointer = window.matchMedia?.('(pointer: coarse)').matches ?? false;
    const smallViewport = window.matchMedia?.('(max-width: 900px)').matches ?? false;
    const hasWebGl = typeof window.WebGLRenderingContext !== 'undefined';
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isMobileBrowser = /android|iphone|ipad|ipod|mobile/.test(userAgent);

    const shouldUseFallback = reducedMotion || !hasWebGl;
    setMode(shouldUseFallback ? 'fallback' : 'scene');
  }, []);

  return mode;
}

export function HQWorldExperience({ snapshot }: { snapshot: OfficeSnapshot }) {
  const mode = useSceneMode();
  const [mobileOptimized, setMobileOptimized] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const coarsePointer = window.matchMedia?.('(pointer: coarse)').matches ?? false;
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isMobileBrowser = /android|iphone|ipad|ipod|mobile/.test(userAgent);
    setMobileOptimized(coarsePointer || isMobileBrowser);
  }, []);
  const projects = snapshot.projects ?? [];
  const alerts = snapshot.alerts ?? [];
  const activity = snapshot.activity?.slice(0, 4) ?? [];
  const activeAgents = useMemo(
    () => projects.flatMap((project) => project.agents).filter((agent) => agent.status === 'active').length,
    [projects],
  );
  const featuredProjects = useMemo(() => projects.slice(0, 3), [projects]);
  const meetingRooms = Math.max(1, Math.ceil(projects.length / 3));
  const displayWalls = Math.max(1, Math.min(projects.length, 4));

  return (
    <main className="page-stack page-stack--world">
      <section className="hq-world-shell hero-card scene-panel scene-panel--office">
        <div className="hq-world-shell__copy">
          <div className="hero-card__eyebrow-row">
            <p className="eyebrow">World HQ</p>
            <span className={`connection connection--${snapshot.connection.state}`}>
              {snapshot.connection.mode} relay A? {snapshot.connection.state}
            </span>
          </div>

          <div className="hero-card__headline hero-card__headline--split">
            <div>
              <h1>Riley&apos;s Office</h1>
              <p className="lede">
                The HQ now reads like a benchmark office floor: front glazing, reception desk, workstation neighborhoods, a glass war room,
                display wall, whiteboard lane, and lounge support spaces instead of abstract sci-fi forms.
              </p>
            </div>
            <div className="hero-card__spotlight hero-card__spotlight--scene hero-card__spotlight--office">
              <span className="hero-card__spotlight-label">Render mode</span>
              <strong>{mode === 'scene' ? 'Interactive office + war room live' : 'Office floor fallback engaged'}</strong>
              <span>{projects.length} desk bays A? {displayWalls} ops displays A? {alerts.length} reception alerts</span>
            </div>
          </div>
        </div>

        <div className="hq-world-stage hq-world-stage--office">
          <div className="hq-world-stage__backdrop hq-world-stage__backdrop--office" aria-hidden="true" />
          {mode === 'scene' ? (
            <div className="hq-world-stage__canvas-wrap hq-world-stage__canvas-wrap--office">
              <div className="hq-world-stage__chrome" aria-hidden="true">
                <span className="hq-world-stage__chrome-pill" />
                <span className="hq-world-stage__chrome-pill" />
                <span className="hq-world-stage__chrome-pill" />
              </div>
              <HQWorldCanvas snapshot={snapshot} mobileOptimized={mobileOptimized} />
            </div>
          ) : (
            <div className="hq-world-stage__fallback hq-world-stage__fallback--office" role="img" aria-label="Fallback office floor view of Riley's Office headquarters">
              <div className="hq-world-stage__fallback-ceiling" aria-hidden="true" />
              <div className="hq-world-stage__fallback-windowwall" aria-hidden="true" />
              <div className="hq-world-stage__fallback-walkway" aria-hidden="true" />
              <div className="hq-world-stage__fallback-reception" aria-hidden="true">
                <span />
                <strong>Reception</strong>
              </div>
              <div className="hq-world-stage__fallback-warroom" aria-hidden="true">
                <span>War room</span>
              </div>
              <div className="hq-world-stage__fallback-displaywall" aria-hidden="true">
                <span>Ops wall</span>
              </div>
              {projects.map((project, index) => (
                <div
                  key={project.id}
                  className="hq-world-stage__fallback-desk"
                  style={{ ['--accent' as string]: project.accent, ['--desk-index' as string]: `${index}` }}
                >
                  <span className="hq-world-stage__fallback-monitor" aria-hidden="true" />
                  <span className="hq-world-stage__fallback-chair" aria-hidden="true" />
                  <strong>{project.name}</strong>
                  <span>{project.activeRun.progressLabel}</span>
                </div>
              ))}
              <div className="hq-world-stage__fallback-glass" aria-hidden="true">
                <span>Board room glass</span>
              </div>
            </div>
          )}

          <div className="hq-world-overlay hq-world-overlay--office">
            {projects.map((project) => (
              <Link key={project.id} href={`/projects/${project.id}`} className="hq-world-overlay__card list-card list-card--interactive office-overlay-card">
                <div className="row-between row-start">
                  <div>
                    <span className="project-card__eyebrow">desk neighborhood</span>
                    <strong>{project.name}</strong>
                  </div>
                  <StatusPill state={project.health} />
                </div>
                <p>{project.tagline}</p>
                <span className="list-card__meta">{project.agents.length} seats A? {project.activeRun.progressLabel}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section-card section-card--accent hq-metrics-grid">
        <article className="metric-tile metric-tile--scene metric-tile--world metric-tile--office">
          <span className="metric-tile__label">Desk bays</span>
          <strong>{projects.length}</strong>
          <p>Each project now occupies a physical workstation cluster with desks, monitors, task lighting, and chairs.</p>
        </article>
        <article className="metric-tile metric-tile--scene metric-tile--world metric-tile--office">
          <span className="metric-tile__label">Shared rooms</span>
          <strong>{meetingRooms + 3}</strong>
          <p>Reception, war room, lounge zone, and whiteboard edge make the floor plan read like an actual office suite.</p>
        </article>
        <article className="metric-tile metric-tile--scene metric-tile--world metric-tile--office">
          <span className="metric-tile__label">Active stations</span>
          <strong>{activeAgents}</strong>
          <p>Live project activity still drives monitor glow and status accents without breaking the mobile-first render budget.</p>
        </article>
      </section>

      <section className="section-card section-card--glass">
        <div className="section-card__topline">
          <div>
            <p className="section-card__eyebrow">Office language</p>
            <h2>What makes the HQ unmistakably office + war-room now</h2>
          </div>
        </div>
        <div className="list-stack">
          <article className="list-card list-card--soft">
            <strong>Recognizable architecture</strong>
            <p>Perimeter walls, front windows, reception frontage, circulation lane, and glass partitions replace the older abstract sci-fi vocabulary.</p>
          </article>
          <article className="list-card list-card--soft">
            <strong>War-room center of gravity</strong>
            <p>A large central conference table, rear operations display wall, and side whiteboard introduce the command-center cues from the benchmark imagery.</p>
          </article>
          <article className="list-card list-card--soft">
            <strong>Workplace material palette</strong>
            <p>Soft carpet walkways, warm wood desktops, matte seating, frosted glass, and brighter daylight office tones pull the scene closer to a real interior.</p>
          </article>
        </div>
      </section>

      <section className="section-card section-card--glass">
        <div className="section-card__topline">
          <div>
            <p className="section-card__eyebrow">Featured desk neighborhoods</p>
            <h2>Highest-visibility project zones</h2>
          </div>
        </div>
        <div className="world-grid">
          {featuredProjects.map((project, index) => (
            <article
              key={project.id}
              className="world-card world-card--zone world-card--office"
              style={{ ['--zone-accent' as string]: project.accent, ['--zone-elevation' as string]: `${index}` }}
            >
              <span className="project-card__eyebrow">{project.health} signal</span>
              <strong>{project.name}</strong>
              <p>{project.tagline}</p>
              <span className="list-card__meta">{project.agents.length} seats A? {project.activeRun.progressLabel}</span>
            </article>
          ))}
        </div>
      </section>

      <section className="section-card section-card--glass">
        <div className="section-card__topline">
          <div>
            <p className="section-card__eyebrow">Runtime safety</p>
            <h2>Still mobile-conscious and Vercel-safe</h2>
          </div>
        </div>
        <div className="list-stack">
          <article className="list-card list-card--soft">
            <strong>Interactive path</strong>
            <p>React Three Fiber still renders client-side only, now with a richer office shell, war-room furniture, and ops-wall language on capable devices.</p>
          </article>
          <article className="list-card list-card--soft">
            <strong>Fallback path</strong>
            <p>Reduced-motion and non-WebGL users now get a layered office-floor fallback with windows, reception, desk pods, war-room callouts, and board-room glass.</p>
          </article>
        </div>
      </section>

      <section className="section-card">
        <div className="section-card__topline">
          <div>
            <p className="section-card__eyebrow">Office log</p>
            <h2>Fresh floor activity</h2>
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



