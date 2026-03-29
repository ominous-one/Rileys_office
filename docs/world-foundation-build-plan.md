# Riley's_Office — World Foundation Build Plan

> Project note: `PROJECT.md` and `BRAND.md` were not present in the project root during this run. This build plan assumes the current Next.js 15 / React 19 app and the architecture defined in `docs/THREED-WORLD-ARCHITECTURE.md`.

## Purpose
Turn the approved 3D world architecture into the first shippable implementation wave with controlled risk, explicit boundaries, and fresh validation points.

## Build Outcome
At the end of Wave 1, Riley's_Office should have a **real scene-rendered HQ world foundation** that:
- runs inside the existing app
- renders a bounded 3D scene with a real camera
- overlays readable DOM controls/HUD on top
- downgrades cleanly to a DOM isometric fallback
- establishes reusable primitives for later Project Room and Workstation scenes

---

# 1. Delivery Scope
## Primary implementation target
Build the **HQ World Scene** first.

## Why HQ first
HQ is the correct proving ground because it validates:
- scene shell integration
- camera preset model
- project suite node composition
- state lighting language
- mobile readability
- fallback mechanics
- performance behavior under a multi-object view

It is the smallest scene that still proves the real-world architecture.

## Deliverables from this wave
### Required code outcomes
- R3F installed and wired into the Next.js app
- reusable world canvas wrapper
- capability detection and fallback selector
- HQ scene with sample/live project suite nodes
- DOM HUD overlay aligned with scene selection
- initial performance instrumentation and downgrade rules

### Required product outcomes
- user can open HQ and see a real rendered world
- user can tap/select project suites
- selected suite state is mirrored in DOM content
- fallback mode preserves the same product comprehension path

---

# 2. Recommended Dependency Additions
## Add now
- `three`
- `@react-three/fiber`
- `@react-three/drei`
- `zustand`

## Add only if needed during implementation
- `framer-motion` if not already present for overlay transitions
- `@react-three/postprocessing` only after baseline performance proves safe

## Do not add in Wave 1
- physics libraries
- large asset pipelines
- animation toolchains beyond basic transform/material animation
- complex shader frameworks

---

# 3. Proposed File Plan
## New implementation paths
- `components/world/WorldShell.tsx`
- `components/world/WorldCanvas.tsx`
- `components/world/WorldFallback.tsx`
- `components/world/scenes/HQScene.tsx`
- `components/world/nodes/FloorPlate.tsx`
- `components/world/nodes/ProjectSuiteNode.tsx`
- `components/world/nodes/StateBeaconNode.tsx`
- `components/world/camera/WorldCameraRig.tsx`
- `components/world/lights/SceneLighting.tsx`
- `components/world/materials/materials.ts`
- `lib/world/types.ts`
- `lib/world/store.ts`
- `lib/world/capabilities.ts`
- `lib/world/performance.ts`
- `lib/world/mappers.ts`
- `lib/world/scenes/hq-scene-model.ts`

## Expected touched app paths
Exact route wiring depends on the current route tree, but likely one of:
- `app/page.tsx`
- `app/hq/page.tsx`
- `app/(office)/page.tsx`
- supporting overview components currently acting as the HQ shell

The engineer should attach the world shell to the current HQ/overview entry point rather than branching into a disconnected prototype route.

---

# 4. Execution Sequence
## Step 1 — Install and wire the rendering foundation
### Tasks
- install `three`, `@react-three/fiber`, `@react-three/drei`, `zustand`
- create a client-only `WorldCanvas` wrapper
- ensure Next.js SSR boundaries do not try to render WebGL on the server
- cap DPR for mobile safety

### Definition of done
- app builds with world dependencies present
- a trivial scene mounts safely in the target route

## Step 2 — Implement capability detection and fallback switching
### Tasks
- build `lib/world/capabilities.ts`
- detect WebGL availability
- read reduced-motion preference
- enforce DPR/quality caps for mobile
- choose mode: `full-3d`, `lite-3d`, or `dom-fallback`

### Definition of done
- world shell can branch deterministically between scene and fallback
- fallback renders without product dead-ends

## Step 3 — Create the shared world shell
### Tasks
- build `WorldShell.tsx`
- stack canvas below DOM HUD
- define scene container sizing rules for mobile
- expose scene selection/focus state to overlay components

### Definition of done
- one route can render a world hero band with interactive overlay content above it

## Step 4 — Create camera, lights, and material primitives
### Tasks
- implement `WorldCameraRig`
- set HQ camera preset
- implement `SceneLighting`
- define small reusable material palette
- verify the visual language works with cheap primitives first

### Definition of done
- scene looks structurally premium before any custom assets are introduced

## Step 5 — Build the HQ scene model mapper
### Tasks
- map current project/runtime data into:
  - project suites
  - suite state
  - occupancy indicators
  - priority lane summary
- validate with Zod before storing
- keep the scene model detached from raw source files

### Definition of done
- HQ scene can be driven by normalized data, not hard-coded geometry only

## Step 6 — Build the HQ scene itself
### Tasks
- render floor plate
- render 3–4 project suite nodes
- attach suite state beacons/emissive seams
- add light depth cues and front-edge priority area
- support tap selection on suite nodes

### Definition of done
- HQ reads as one world surface with multiple project rooms inside it
- selected suite is visually obvious

## Step 7 — Build the DOM HUD overlay
### Tasks
- add readable labels, chips, and action buttons in DOM
- mirror selected suite/project details in overlay
- preserve 44px+ targets on mobile
- ensure keyboard/accessibility-equivalent controls exist for scene selections

### Definition of done
- the product remains highly readable and actionable even with the canvas behind it

## Step 8 — Instrument performance and downgrade behavior
### Tasks
- capture a simple FPS health signal
- downgrade from `full-3d` to `lite-3d` when sustained frame drops occur
- optionally downgrade to fallback when thresholds fail badly
- cap active emissive animations

### Definition of done
- poor-performing devices degrade gracefully instead of just feeling broken

---

# 5. First Wave Acceptance Criteria
Wave 1 passes only if all are true:
- HQ uses a real WebGL-rendered scene, not CSS-only illusion
- camera is fixed and controlled, not free-roam
- world has explicit scene boundaries and object roles
- product remains readable because HUD/actions stay in DOM
- iPhone constraints are respected in layout and tap targets
- performance budgets are enforced through mode switching
- DOM fallback exists and preserves usability

---

# 6. Performance Guardrails for Implementation
## Hard constraints
- do not introduce large GLB files in the first wave
- do not enable expensive post-processing by default
- do not use many dynamic light sources
- do not let the canvas occupy the full app interaction budget

## Recommended implementation defaults
- cap DPR around `1.25–1.5` on mobile
- use emissive materials over real lights where possible
- use primitive geometry for floor, suites, and pods in Wave 1
- keep animated objects limited to the current focal suite(s)
- prefer demand-based or controlled re-rendering strategies

## Validation targets
- first meaningful world render feels immediate on local modern iPhone-class hardware
- tapping suites feels responsive
- fallback mode remains visually coherent with the world language

---

# 7. Fallback Build Requirements
## DOM fallback must include
- shared world shell framing
- faux-isometric floor plate or room corridor presentation
- same selected-project state model
- same overlay content and actions

## Why this matters
Fallback is not just a safety net. It guarantees:
- accessibility continuity
- low-end device continuity
- testability during 3D iteration
- no product regression if WebGL fails in Safari

---

# 8. Deferred Work After Wave 1
## Wave 2 candidates
- Project Room scene implementation
- anchored HQ -> Project transition
- richer suite modules and occupancy nodes
- low-poly reusable asset kit

## Wave 3 candidates
- Workstation scene
- evidence prop system
- room-specific lighting profiles
- stronger shared-element transitions

## Later only if justified
- restrained bloom/post-processing
- custom shader accents
- richer environment assets
- deeper telemetry animations

---

# 9. Engineer Notes
## Implementation posture
- build with primitives first
- prove camera, scene composition, and downgrade logic before polish
- avoid early asset production overhead
- keep every 3D decision accountable to iPhone usability

## Critical decision rule
If a visual feature improves spectacle but threatens readability, FPS, tap ergonomics, or fallback simplicity, reject it in this wave.

---

# 10. Validation Plan
## Required proof for this architecture wave
### Fresh implementation proof
- build/typecheck passes after dependency and component integration
- route renders successfully in local app
- fallback path can be forced and verified

### Fresh visual proof
- at least one screenshot or local evidence capture of:
  - full 3D HQ mode
  - DOM fallback mode

### Fresh behavioral proof
- suite selection updates overlay state
- capability mode selection is observable and deterministic

## Suggested evidence paths for the future implementation run
- `evidence/world-foundation/hq-3d-*.png`
- `evidence/world-foundation/hq-fallback-*.png`
- `evidence/world-foundation/build-validation.md`

---

# 11. Exact First Implementation Wave
## Wave 1 lock
Build exactly this first:
1. dependency install
2. `WorldShell` + `WorldCanvas`
3. capability/fallback selector
4. `WorldCameraRig`
5. `SceneLighting`
6. `FloorPlate`
7. `ProjectSuiteNode`
8. `HQScene`
9. DOM overlay integration on HQ route
10. performance downgrade hooks

## Do not expand Wave 1 to include
- Project Room production scene
- Workstation production scene
- custom imported room kits
- non-essential effects
- experimental camera controls

This keeps the first wave small, real, and implementation-safe.

---

# 12. Milestone Summary
## Milestone A — Foundation mounted
Scene shell and dependencies exist.

## Milestone B — HQ world visible
A real world scene renders in the app.

## Milestone C — Interaction and fallback validated
Selection, overlay sync, and fallback mode all work.

## Milestone D — Ready for Project Room expansion
The shared foundation is now stable enough to extend deeper.

## Deliverable conclusion
The first build wave should ship a **bounded HQ-only 3D foundation with mandatory fallback**. That is the minimum implementation that proves the architecture without overcommitting the project to risky scene scope or mobile performance debt.
