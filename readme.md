# Riley's_Office

Riley's_Office is an iPhone-first OpenClaw command center presented as a scene-first mobile web app. This beauty pass advances the HQ world from a functional 3D foundation into a richer atmospheric skyline with stronger composition, lighting, materials, and fallback presentation.

## What changed in this wave
- the HQ world now stages itself as a premium nocturnal command campus instead of a simple floating tower pad
- project districts gained stronger material definition, emissive roof plates, facade light bands, and animated data rings
- the world gained skyline silhouettes, volumetric light columns, star depth, spark particles, and a more cinematic command-floor composition
- the fallback path was upgraded to feel like a real skyline strip rather than a plain static placeholder
- the app remains Vercel-friendly: the scene still loads client-side only and preserves a non-WebGL path

## Scene stack
- **Renderer:** React Three Fiber
- **Scene helpers:** Drei
- **Engine:** Three.js
- **Fallback:** semantic DOM skyline strip + linked district cards

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
- `PROJECT.md` and `BRAND.md` were not present in the project root during this run.
- Local browser verification hit the existing auth gate and then `ERR_TOO_MANY_REDIRECTS` after sign-in with default local credentials, so scene validation for this wave is backed by code inspection plus fresh typecheck/build evidence.
- See `IMPLEMENTATION-SUMMARY.md` for exact changed files and evidence paths.
