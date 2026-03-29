# Riley's_Office

Riley's_Office is an iPhone-first OpenClaw command center presented as a premium spatial web app. This implementation wave upgrades the original functional scaffold into a luxury-feeling mobile HQ with a redesigned lobby, project suite, agent desk, and elevated visual system.

## Premium UI wave highlights
- HQ homepage now reads as a high-end command-center lobby instead of a basic dashboard
- Project office screen now uses a suite-style spatial layout with room map, desk cluster, and delivery wall
- Agent desk now feels like a focused operator station with run context, evidence shelving, and governed controls
- Global shell, cards, pills, and styling now use layered glass, ambient lighting, premium spacing, and iPhone-safe framing
- Mock data was refreshed to support the new spatial narrative and premium presentation

## Key routes
- `/` — HQ lobby overview
- `/projects/[projectId]` — project suite / office detail
- `/agents/[agentId]` — agent desk detail
- `/activity` — activity feed shell
- `/inbox` — inbox shell

## Design direction
This wave emphasizes:
- iPhone-first composition
- luxury / app-like polish
- spatial office cues
- clearer visual hierarchy
- stronger motion-ready surfaces without relying on complex runtime animation

## Validation
Run before QA handoff:

```bash
npm run typecheck
npm run build
```

## Notes
- `PROJECT.md` and `BRAND.md` were not present in the project root during this run.
- The current experience remains mock-safe and read-only by default.
- See `IMPLEMENTATION-SUMMARY.md` for exact files changed and QA context.
