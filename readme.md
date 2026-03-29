# Riley's_Office

Riley's_Office is an iPhone-first OpenClaw command center presented as a scene-first mobile web app. This wave pushes the HQ world closer to a benchmark modern office: front glazing, reception desk, desk neighborhoods, a central war room, rear ops displays, whiteboard lane, lounge support space, and a safe non-WebGL fallback.

## What changed in this wave
- the HQ scene now uses recognizable office architecture instead of abstract tower/city metaphors
- project areas are represented as workstation clusters with desks, chairs, monitors, and branded task lighting
- the center of the room now reads as a war room with a large conference table, rear operations wall, and side whiteboard
- the floor now has clearer circulation, perimeter walls, front windows, reception frontage, meeting-room glass, lounge furniture, and storage credenza accents
- the fallback path now depicts an office floor with windows, reception, desk pods, war-room callouts, and board-room glazing rather than a skyline strip
- the scene remains Vercel-safe and mobile-conscious with client-only 3D rendering plus reduced-motion / non-WebGL fallback handling

## Scene stack
- **Renderer:** React Three Fiber
- **Scene helpers:** Drei
- **Engine:** Three.js
- **Fallback:** semantic DOM office-floor composition + linked project cards

## Key routes
- `/` — HQ world scene
- `/projects/[projectId]` — project room scene
- `/agents/[agentId]` — agent workstation scene
- `/activity` — activity feed shell
- `/inbox` — inbox shell

## Validation
```bash
npm install
npm run typecheck
npm run build
```

## Notes
- `PROJECT.md` and `BRAND.md` are now present in the project root for implementation and review context.
- Fresh validation for this wave is backed by local `npm run typecheck` and `npm run build` evidence.
- See `IMPLEMENTATION-SUMMARY.md` for exact changed files and evidence paths.

