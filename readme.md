# Riley's_Office

Riley's_Office is an iPhone-first OpenClaw command center presented as a scene-first mobile web app. This implementation wave transforms the original premium dashboard scaffold into a game-like command world with an explorable HQ skyline, cinematic project room, and tactile agent workstation scene.

## Scene transformation highlights
- HQ homepage now reads like a world map with district towers, skyline depth, and live command atmosphere instead of a flat dashboard
- Project route now reads like an office room scene with fake-3D walls, floor plane, blueprint zones, workstation row, and pinned delivery wall
- Agent route now reads like a workstation scene with monitors, desk surface, evidence shelf, side-channel display, and macro row
- App shell and global CSS now provide the environmental lighting, horizon grid, glass panels, fake-isometric cues, and iPhone-safe framing that tie the three scenes together
- Mock seed data was rewritten so copy and state reinforce the new world/room/workstation narrative

## Key routes
- `/` — HQ world / building overview
- `/projects/[projectId]` — project room scene
- `/agents/[agentId]` — agent workstation scene
- `/activity` — activity feed shell
- `/inbox` — inbox shell

## Design direction
This wave emphasizes:
- scene-first composition over dashboard composition
- fake-3D / isometric cues without heavy runtime cost
- atmospheric lighting and environmental storytelling
- iPhone-safe density and touch targets
- deployable Next.js rendering with no special runtime dependencies

## Validation
Run before QA handoff:

```bash
npm run typecheck
npm run build
```

## Notes
- `PROJECT.md` and `BRAND.md` were not present in the project root during this run.
- The current experience remains mock-safe and read-only by default.
- See `IMPLEMENTATION-SUMMARY.md` for exact changed files and QA context.
