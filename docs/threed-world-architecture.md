# Riley's_Office — 3D World Architecture

> Project note: `PROJECT.md` and `BRAND.md` were not present in the project root during this run. This architecture is anchored to the current Next.js 15 / React 19 codebase and the existing world-direction docs.

## Purpose
Define the execution-ready architecture for adding a **real scene-rendered 3D / isometric world foundation** to Riley's_Office without breaking iPhone usability, delivery velocity, or graceful fallback behavior.

This document intentionally replaces the earlier “2.5D only” ceiling with a bounded web-first 3D foundation.

## Architecture Decision
### Chosen path
Adopt a **hybrid web-first 3D scene shell** built on:
- **Three.js** for rendering
- **@react-three/fiber** for React-native scene composition inside Next.js
- **@react-three/drei** for camera helpers, environment helpers, bounds, text helpers, and interaction primitives
- **react-spring** _or_ **framer-motion** for non-scene UI transitions
- **Zustand** for world/UI state coordination
- **Zod** for adapter payload validation before data enters the world state

### Why this path
This gives the project:
- a real camera and scene graph
- actual object placement and depth ordering
- a believable HQ -> Project Room -> Workstation continuity model
- progressive degradation to the existing DOM-first shell when WebGL or device performance is poor
- a web stack that remains implementation-friendly for the current Next.js app

### Rejected alternatives
#### 1. Pure CSS faux-3D only
Rejected as the foundation because it cannot provide:
- stable world-space continuity
- camera transitions between scenes
- scalable asset/light/material organization
- long-term extensibility for richer rooms and object states

It remains valuable as the fallback path.

#### 2. Full game-engine architecture
Rejected for V1 because it adds too much complexity for:
- mobile Safari constraints
- app-shell integration overhead
- UI layering and accessibility needs
- current team velocity

#### 3. Babylon.js or PlayCanvas-first
Viable, but not preferred. React Three Fiber aligns better with the current React app, component mental model, and incremental rollout path.

---

# 1. Architectural Goals
## Product goals
- Make HQ, Project Room, and Workstation feel like one continuous operating world.
- Preserve <2 second comprehension on iPhone.
- Keep the scene actionable, not decorative.
- Let governance state read from space, light, and object posture before full text parsing.

## Technical goals
- Run as a client-side scene inside the current Next.js app.
- Support selective scene rendering per route, not one giant always-on world.
- Keep a DOM HUD layer for readable text, navigation, and accessibility.
- Allow runtime adapters and existing docs/domain work to feed the world model.
- Provide a deterministic fallback when WebGL, memory, FPS, or reduced-motion conditions fail.

## Non-goals for the first foundation
- no free-roam camera
- no avatar simulation
- no physics engine
- no multiplayer spatial sync
- no giant imported photorealistic office assets
- no “entire building visible at once” requirement on iPhone

---

# 2. Core Technical Stack
## Required libraries
### Rendering
- `three`
- `@react-three/fiber`
- `@react-three/drei`

### State and validation
- `zustand`
- `zod`

### Motion
- keep **Framer Motion** for DOM/HUD transitions if already adopted
- use R3F spring/interpolation patterns for camera/object movement inside the scene

### Optional but recommended later
- `@react-three/postprocessing` only if kept extremely restrained
- `meshline` or equivalent only if connection-path visuals are needed
- `leva` for local tuning only during development, not shipped to production

## Asset strategy
Prefer:
- primitive geometry
- authored low-poly GLB modules for reusable furniture/room pieces
- compressed textures only where necessary
- material-driven look over texture-heavy realism

Avoid in V1:
- high-poly DCC exports
- 4K texture packs
- heavy environment maps
- skeletal animation

---

# 3. World Model Boundaries
## Route-to-scene boundary
The 3D system should map to existing product depth:
1. **HQ World Scene**
2. **Project Room Scene**
3. **Agent Workstation Scene**

Each route renders:
- one primary scene canvas
- one world-state snapshot
- one DOM HUD/action layer above it

## Scene boundary rule
Do **not** build one giant persistent world with every project, room, and desk active simultaneously.

Instead, use a **bounded scene-per-scope model**:
- HQ scene contains the macro headquarters layout and project suite representations
- Project scene contains a single project room plus immediate sub-zones
- Workstation scene contains one desk/workstation plus compressed room context

This keeps memory, draw calls, and interaction scope under control on iPhone.

## Object boundary rule
Every rendered object must map to a product/domain object:
- `ProjectSuiteNode`
- `RunTableNode`
- `DeskPodNode`
- `EvidenceStackNode`
- `DeliveryWallNode`
- `ActionTrayNode`
- `StateBeaconNode`

Decorative objects are allowed only if they improve depth reading and remain cheap.

---

# 4. Scene System Architecture
## Layer model
Each screen uses three coordinated layers:

### Layer A — 3D World Layer
Rendered in WebGL.
Owns:
- floor planes
- room shells
- desks
- run tables
- evidence props
- state lighting anchors
- camera transitions

### Layer B — DOM HUD Layer
Rendered above canvas in normal React.
Owns:
- readable labels
- buttons
- chips
- drawers
- sheets
- chat/composer UI
- accessibility-first controls

### Layer C — World Adapter Layer
Owns transformation from runtime/domain payloads into render-safe scene state.

Flow:
`runtime adapters -> zod validation -> normalized world model -> zustand store -> R3F scene + DOM HUD`

## Why hybrid is mandatory
Pure in-canvas UI would hurt:
- text legibility
- mobile accessibility
- interaction speed
- shipping velocity

Pure DOM would fail the spatial continuity goal.

The correct architecture is **3D world for space, DOM for reading and control**.

---

# 5. Recommended Repo Layout Additions
## New directories
- `components/world/`
  - `WorldCanvas.tsx`
  - `WorldShell.tsx`
  - `WorldFallback.tsx`
- `components/world/scenes/`
  - `HQScene.tsx`
  - `ProjectRoomScene.tsx`
  - `WorkstationScene.tsx`
- `components/world/nodes/`
  - `FloorPlate.tsx`
  - `ProjectSuiteNode.tsx`
  - `RunTableNode.tsx`
  - `DeskPodNode.tsx`
  - `DeliveryWallNode.tsx`
  - `EvidenceStackNode.tsx`
  - `StateBeaconNode.tsx`
- `components/world/camera/`
  - `WorldCameraRig.tsx`
  - `SceneBounds.tsx`
- `components/world/materials/`
  - `materials.ts`
- `components/world/lights/`
  - `SceneLighting.tsx`
- `lib/world/`
  - `types.ts`
  - `store.ts`
  - `selectors.ts`
  - `capabilities.ts`
  - `performance.ts`
  - `mappers.ts`
- `lib/world/scenes/`
  - `hq-scene-model.ts`
  - `project-scene-model.ts`
  - `workstation-scene-model.ts`
- `public/world/`
  - `models/`
  - `textures/`

---

# 6. Scene Definitions
## 6.1 HQ World Scene
### Purpose
Macro operating board showing multiple project suites inside one premium headquarters world.

### Required contents
- one floor plate
- 3–6 visible project suite nodes on iPhone-class layouts
- one priority lane near the front edge
- one presence strip or desk-pod cluster
- localized state beacons

### Camera constraints
- fixed elevated three-quarter angle
- no free rotate
- no pinch orbit
- route-driven or tap-driven camera target only

### World budget
- target visible interactive nodes: 8–16
- decorative nodes: minimal
- one directional key + one ambient/fill strategy + localized emissive accents

## 6.2 Project Room Scene
### Purpose
Single project rendered as a believable room with a run table, desk perimeter, and delivery wall.

### Required contents
- central run table hero object
- 2–4 visible desk pods on initial mobile framing
- one delivery wall zone
- one room plaque/navigation rail in DOM HUD
- state lighting attached to room objects, not full-screen washes

### Camera constraints
- closer than HQ by ~15–20%
- anchored transitions from selected HQ suite
- room shell cropped to imply continuation beyond frame

## 6.3 Workstation Scene
### Purpose
Close-up tactical desk scene for one agent/work contract.

### Required contents
- workstation base plane
- contract display hero object
- evidence stack
- conversation console region
- action tray region
- compressed room context behind/around desk

### Camera constraints
- closest framing of all scenes
- no more than 3 major modules above fold on iPhone
- blocker/evidence focus must remain above fold in the DOM overlay

---

# 7. Camera Architecture
## Camera model
Use one reusable `WorldCameraRig` with scene presets:
- `hq`
- `project`
- `workstation`

Each preset defines:
- position
- lookAt target
- field of view
- dolly bounds
- transition duration
- reduced-motion behavior

## Camera rules
- camera movement is programmatic only
- transitions are short, anchored, and state-aware
- no user-controlled orbit on mobile
- no cinematic sweep that delays actionability

## Recommended defaults
### HQ
- FOV: ~28–34
- broad framing
- subtle forward push on selection

### Project
- FOV: ~30–38
- medium-close framing
- lateral zone shift for room changes

### Workstation
- FOV: ~32–42
- close framing
- slight target shift for evidence/message emphasis only

---

# 8. Materials, Lighting, and Visual Language
## Material system
Use a small shared material vocabulary:
- matte architectural body
- frosted glass overlay surfaces
- emissive seam strips
- metallic accent trim
- mono evidence plaque material

## Lighting system
### Global lights
- one soft directional key
- one low-cost hemisphere or ambient fill

### Localized lights
- emissive materials first
- very few real point/spot lights
- attach state lighting to nodes like run table edge, desk seam, beacon ring

## Performance rule
Prefer **emissive material cues** over multiple dynamic lights.

## Post-processing rule
Default to **none** in V1.
If later added, allow only highly restrained:
- mild bloom on active emissive accents
- possibly subtle vignette

No heavy DOF, SSR, volumetrics, or cinematic stacks for the first wave.

---

# 9. Interaction Architecture
## Interaction split
### 3D world interactions
Use 3D picking only for:
- selecting project suite
- selecting desk pod
- highlighting evidence or active zone

### DOM interactions
Use DOM controls for:
- all primary commands
- all text-heavy interactions
- chat/composer
- approval and governance actions
- room switching rail
- drawers, sheets, and navigation

## Input rule
A 3D object tap should primarily:
- focus
- highlight
- route
- open a DOM detail state

It should not require precision dragging or game-like manipulation.

---

# 10. Performance Constraints
## Mobile baseline target
Target modern iPhone Safari first.

### First-wave targets
- steady **30 FPS minimum** on supported iPhone hardware during normal interaction
- aspire to **45–60 FPS** on stronger devices
- initial world scene load target: **< 2.5s** on warm-ish mobile conditions
- interaction-to-response target: **< 150ms** for focus/highlight taps

## Scene budgets
### HQ
- draw calls target: **< 120**, hard ceiling **160**
- triangles target: **< 120k**, hard ceiling **180k**

### Project Room
- draw calls target: **< 100**, hard ceiling **140**
- triangles target: **< 100k**, hard ceiling **150k**

### Workstation
- draw calls target: **< 90**, hard ceiling **120**
- triangles target: **< 90k**, hard ceiling **130k**

## Texture budgets
- default texture cap: **1024px** for most assets
- hero-only exceptions: **2048px max** and only when justified
- compressed formats preferred where pipeline allows

## Rendering constraints
- no always-on shadow maps in V1 unless proven cheap
- bake look into materials/gradients where possible
- cap simultaneous animated emissive focal objects to **1–3**
- no continuous background animation field
- use demand-driven invalidation or controlled render loops where possible

## Memory safety
Implement capability checks and downgrade aggressively when:
- device memory appears constrained
- FPS drops below floor for sustained window
- reduced motion is enabled
- WebGL context is unavailable or unstable

---

# 11. Capability Detection and Fallback Strategy
## Runtime modes
The world foundation must support three modes.

### Mode A — Full 3D
Enabled when:
- WebGL available
- device capability acceptable
- user not in reduced-data / severe reduced-motion constraint

Experience:
- real 3D scene
- camera transitions
- bounded emissive state cues

### Mode B — Lite 3D
Enabled when:
- WebGL available but budget is tight

Downgrades:
- fewer decorative nodes
- simplified materials
- no post-processing
- reduced animation cadence
- lower DPR cap

### Mode C — DOM Isometric Fallback
Enabled when:
- WebGL unavailable
- capability gate fails
- user/device setting prefers reduced complexity
- runtime detects sustained poor performance

Experience:
- existing/future DOM-rendered faux-isometric scene
- same scene model and interaction structure
- no hard product loss for navigation or governance tasks

## Fallback rule
The product must never become unusable because the 3D layer is unavailable.

The same scene model should power both:
- R3F scene nodes
- DOM fallback components

That is the key architectural safeguard.

---

# 12. Data and State Architecture
## World state sources
Use existing project/runtime adapters as source-of-truth inputs.

## Normalized world model
Create a scene-safe world model with:
- project metadata
- room states
- desk states
- run summary
- evidence summary
- action availability
- scene lighting state
- focus target

## Suggested core types
- `WorldSceneKind = 'hq' | 'project' | 'workstation'`
- `WorldCapabilityMode = 'full-3d' | 'lite-3d' | 'dom-fallback'`
- `WorldNodeState = 'healthy' | 'active' | 'blocked' | 'waiting' | 'stale' | 'degraded' | 'approved' | 'locked'`

## Store ownership
Use Zustand for:
- selected scene target
- focused node
- capability mode
- camera preset state
- reduced-motion flags
- performance downgrade state

Do not store raw runtime files directly in the scene store. Store normalized, validated view models only.

---

# 13. Accessibility and iPhone Rules
## Accessibility rules
- all critical actions remain in DOM
- canvas interactions must have DOM equivalents
- focus state must be mirrored in accessible labels and HUD
- reduced-motion mode must disable spatial dramatics without hiding meaning

## iPhone-conscious rules
- 390px width is the default design constraint
- world scenes must preserve a single focal object above fold
- canvas height should not starve HUD/action areas
- bottom action/composer areas must remain thumb-reachable
- no multi-axis gesture dependency for core tasks

## Layout rule
Treat the canvas as a **hero environment band**, not an infinite fullscreen game surface.

---

# 14. Implementation Risks and Mitigations
## Risk: iPhone Safari performance collapse
Mitigation:
- scene-per-scope rendering
- primitive-first assets
- strict draw-call budgets
- DOM fallback mode

## Risk: 3D scene becomes decorative and unreadable
Mitigation:
- keep text/action UI in DOM
- one hero object per scene
- state lighting localized, not global

## Risk: world model diverges from runtime truth
Mitigation:
- adapter validation via Zod
- normalized scene mappers
- one mapper per scene scope

## Risk: too much engineering complexity in first pass
Mitigation:
- first wave only builds the shared foundation + one reference scene path
- defer richer assets and secondary zones until budgets are validated

---

# 15. First Implementation Wave Boundary
## Foundation wave scope
The first implementation wave should deliver:
1. library install and client-only world shell
2. capability detection and fallback switch
3. shared camera rig and world canvas wrapper
4. shared material/light primitives
5. one working **HQ World Scene** with 3–4 project suite nodes
6. route-level DOM HUD overlay on top of canvas
7. performance instrumentation for FPS/downgrade decisions

## Explicitly deferred
- full Project Room production scene
- full Workstation production scene
- custom GLB furniture library
- post-processing polish
- advanced transitions between every route
- evidence object richness beyond representative V1 props

---

# 16. Acceptance Checklist
This 3D foundation is architecturally correct only if:
- recommended libraries are installed around R3F/Three.js, not a heavier engine
- the system defines clear HQ / Project / Workstation scene boundaries
- performance budgets and downgrade rules are explicit
- iPhone Safari constraints drive the design
- DOM fallback is a first-class mode, not an afterthought
- the first implementation wave is small enough to execute safely
- the world remains useful when 3D is disabled

## Deliverable conclusion
Recommended foundation: **Next.js + React Three Fiber + Drei + Zustand + Zod + DOM HUD overlay + mandatory DOM fallback**.
This is the lightest architecture that provides a real rendered world without sacrificing mobile actionability or execution speed.
