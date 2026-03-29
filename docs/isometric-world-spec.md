# Riley's_Office — Isometric World Spec

> Project note: `PROJECT.md` and `BRAND.md` were not present in the project root during this run. This spec is based on the current Riley's_Office documentation and UI scaffold.

## Purpose
Define the exact isometric world system for Riley's_Office so engineering can translate the product into a mobile-web-compatible spatial experience.

This document covers:
- camera logic
- isometric geometry rules
- world object system
- layer architecture
- responsive/mobile constraints
- state lighting and motion behavior
- implementation notes for CSS/web delivery

## Design Principle
Use **implied isometric space**, not literal 3D.

The goal is to create a believable world hierarchy using:
- skewed planes
- stacked depth bands
- consistent object angles
- lighting direction
- anchored transitions

The world should be readable as a simulation-like environment without requiring canvas, WebGL, or free camera movement.

---

# 1. World Geometry System

## 1.1 Perspective model
Use a simplified isometric-inspired projection.

### Target geometry
- horizontal axis: visually angled ~26° to 30°
- vertical screen axis remains true vertical for readability
- depth axis implied through skewed floor planes and compressed top surfaces
- cards/labels remain front-facing for legibility

### Practical rule
The environment uses isometric logic; the informational UI remains orthographic.

Meaning:
- floors, room plates, wall edges, and desk tops may skew
- text panels, chips, labels, buttons, and evidence plaques should mostly stay front-on

This keeps the world feeling spatial while preserving mobile clarity.

## 1.2 Plane vocabulary
Use four plane types only.

### A. Floor plane
Main world carrier.
- shape: wide skewed quadrilateral
- use: HQ base, project room base, desk base
- depth cue: front edge shadow + top rim highlight

### B. Wall plane
Secondary environmental definition.
- shape: rectangular or trapezoid rear/side surfaces
- use: delivery wall, back room wall, ops strip
- opacity: lower than floor plane so they never overpower content

### C. Object block
Primary world object silhouette.
- shape: softened rectangular extrusions or slabs
- use: run table, project suite, workstation monitor, action pedestal
- may include top face plus front face

### D. Overlay plaque
Readable UI attached to object.
- shape: front-facing glass tag or panel
- use: labels, status, paths, CTAs, counters
- should not be skewed more than ~4° if at all

## 1.3 Depth hierarchy
All scenes must obey the same z-order system.

| Depth Band | Purpose | Typical Objects |
|---|---|---|
| Z0 | atmosphere/backdrop | haze, gradient, skyline hints |
| Z1 | architecture | floor plane, back walls, room outlines |
| Z2 | world objects | project suites, run table, desks |
| Z3 | interactive objects | evidence slabs, action capsules, room plaques |
| Z4 | HUD/readability layer | text labels, nav, chips, buttons |
| Z5 | transient overlays | sheets, composer, tooltips |

Rule: never let a decorative Z0/Z1 layer visually compete with a Z2 focal object.

---

# 2. Camera and Framing Spec

## 2.1 HQ world camera
### Role
Show the whole headquarters floor as one coherent simulation board.

### Framing
- camera distance: farthest of all three main scenes
- visible floor width: nearly full viewport
- visible floor depth: medium
- focal zone: central third
- cropping: front edge may be partially cut to bring actionable foreground closer

### Angle
- floor skew moderate
- room objects distinct but not tiny
- avoid deep perspective vanishing points

## 2.2 Project room camera
### Role
Bring the user inside one premium project suite.

### Framing
- camera closer by ~15–20% relative to HQ
- central run table occupies main focal mass
- room edges extend beyond frame to imply continuity
- delivery wall and desk cluster are partly visible simultaneously when possible

## 2.3 Workstation camera
### Role
Focus on one desk like a premium tactical close-up.

### Framing
- closest crop of all scenes
- desk plane or contract display dominates lower/middle frame
- surrounding room reduced to contextual blur/dim silhouette
- no more than 3 large modules above fold on iPhone

## 2.4 Transition continuity rule
Each deeper scene should feel like the camera has moved into the same world, not opened an unrelated page.

Required relationship:
- HQ project suite -> Project room core
- Project desk pod -> Workstation desk scene

Shared element candidates:
- project plaque
- room light strip
- run progress bar
- desk beacon

---

# 3. World Object Library

## 3.1 HQ objects
### Headquarters floor plate
Purpose: global world base.

Spec:
- width: 340–358px within 390px frame
- apparent height: 180–220px
- front edge thickness: 8–14px visual extrusion
- corner radius impression: 24–32px

Styling:
- top surface dark architectural matte
- front face darker than top by 8–12% luminance
- subtle seam lines define embedded project zones

### Project suite module
Purpose: one project represented as a room in the HQ world.

Spec:
- width: 136–168px on mobile in main corridor cluster
- height: 92–124px top face impression
- extrusion: 6–12px front edge where useful
- minimum internal content areas:
  - name plaque
  - health beacon
  - occupancy lights
  - progress strip

### Presence node / desk pod
Purpose: small distributed agent presence marker.

Spec:
- width: 112–156px
- height: 76–110px
- emphasis lower than project suite
- front-facing labels preferred for clarity

## 3.2 Project room objects
### Run table core
Purpose: physical centerpiece of the project scene.

Spec:
- width: 84–92% of content width
- visual height: 120–164px
- sits slightly forward of room center
- includes surface panel for run summary and progress

Structure:
- top glass slab
- underglow base
- inset telemetry strip
- optional side light fins for status

### Desk pod
Purpose: agent station within room.

Spec:
- width: 148–168px in 2-column mobile layout
- min height: 136px
- contains:
  - agent plaque
  - role text
  - task excerpt
  - artifact footer
  - state indicator

### Delivery wall column
Purpose: wall-mounted artifact grouping system.

Spec:
- width: full content width or 1 side zone width
- group header visible at all times
- each artifact row height: 48–64px
- should read like mounted evidence slots, not list rows

### Room plaque
Purpose: navigation object for room switching.

Spec:
- height: 44–52px
- min width: 92px
- active plaque slightly brighter and larger (`scale(1.02)` max)
- should visually resemble named room segments in the environment

## 3.3 Workstation objects
### Contract display
Purpose: primary focus plane.

Spec:
- width: full available width
- min height: 148px
- top corners may be slightly sharper than cards to imply hardware/glass panel
- contains progress, summary, blocker, CTA

### Evidence slab
Purpose: file/output object.

Spec:
- full-width stackable plaque
- height: 60–84px
- front-most slab highest contrast
- rear slabs offset vertically by 8–12px

### Conversation console
Purpose: communication side module.

Spec:
- width: full available width
- min height: 108–132px
- includes last message, last speaker, quick actions

### Action tray capsule
Purpose: thumb-zone governed action set.

Spec:
- height: 44–52px each capsule
- horizontal rail or 2-column grid
- visible lock/approval states mandatory

---

# 4. Scene Construction Rules

## 4.1 HQ world construction
Compose the HQ world using this order:
1. atmospheric background gradient
2. structural floor plate
3. embedded project suite modules
4. corridor / connection seam lights
5. priority foreground rail
6. presence nodes
7. labels and controls

### Must-have world cues
- at least 3 visible project suites or suite previews
- at least 1 foreground urgency plane
- at least 1 visible depth cue connecting spaces
- at least 1 occupancy/presence indicator cluster

### Must avoid
- fully flat carousel cards detached from a shared base
- equal emphasis on all projects
- text-heavy room modules with no environmental silhouette

## 4.2 Project room construction
Compose the project room using this order:
1. room backdrop walls
2. floor plane
3. run table core
4. desk perimeter cluster
5. delivery wall plane
6. ops/archive edge cues
7. room plaques and action shelf

### Must-have world cues
- obvious central hero object
- at least 2 visible desk stations
- evidence area physically separated from desk area
- room switching visibly corresponds to environmental zones

### Must avoid
- hero card plus unrelated list sections below
- tabs that have no spatial relationship to the room
- delivery content as a generic card stack with no wall logic

## 4.3 Workstation construction
Compose the desk scene using this order:
1. dimmed room context
2. desk plane or workstation base
3. contract display
4. evidence slab stack
5. conversation console
6. action tray
7. telemetry strip and sticky mast

### Must-have world cues
- one clear workstation surface
- one obvious live contract object
- evidence physically present in the scene
- intervention controls close to the desk context

### Must avoid
- generic chat layout with decorative gradients
- scrolling the blocker below evidence/telemetry when blocked
- more than one competing hero module

---

# 5. State Lighting and Material Behavior

## 5.1 State lighting table
| State | World signal | Scene effect | Copy priority |
|---|---|---|---|
| Healthy | cool balanced glow | calm even lighting | secondary |
| Active | cyan-violet live seam | one localized pulse | high |
| Blocked | restrained ember-red edge | warning strip, sharper contrast | highest |
| Waiting | amber queue light | softened activity, focus on response controls | high |
| Stale | muted lavender-gray haze | reduced brightness, no pulse | medium |
| Degraded | coral ops contamination | warning ribbon on system edge | high |
| Approved | neutral-white premium edge | stable resolved feel | medium |
| Locked | graphite low-energy state | no glow, low contrast | medium |

## 5.2 Lighting placement rules
State light should live in world objects, not wash over full screens.

Correct examples:
- active desk has cyan seam under monitor
- blocked room has red warning strip on run table edge
- degraded transport lives on ops wall ribbon

Incorrect examples:
- entire screen tinted red
- giant gradient fills replacing structural hierarchy
- multi-color glows on every object simultaneously

## 5.3 Material stack
For world objects, use this surface hierarchy:
1. matte structural body
2. glass or polished top plane
3. edge highlight
4. local glow only where state requires it

For overlay plaques, use:
- slightly frosted dark glass
- crisp border
- inner top highlight
- strong text contrast

---

# 6. Responsive and iPhone Constraints

## 6.1 Base viewport target
- design width: 390px
- content width after gutters: 358px
- safe max shell width: 430px

## 6.2 Compression rules
When space gets tight, compress in this order:
1. reduce environmental ornament
2. reduce secondary labels
3. collapse occupancy detail
4. simplify wall/floor extent
5. preserve focal object and primary CTA at all costs

Do **not** compress by:
- shrinking all text equally
- flattening the world into uniform cards
- removing state indicators

## 6.3 Tap target rules
- any interactable suite/pod/plaque: minimum 44x44px
- preferred desk/project tap areas: 52px min height
- room plaques should remain selectable with one thumb while scrolling

## 6.4 Scroll rules
- avoid requiring both horizontal and vertical micro-precision in the same area
- horizontal rails should snap predictably
- vertical progression must preserve the illusion of moving through a scene, not a long admin feed

## 6.5 Above-the-fold requirements
### HQ
Must show:
- headquarters identity
- at least one priority or project focal object
- clear world floor impression

### Project room
Must show:
- project identity
- central run table
- room navigation
- first actionable detail

### Workstation
Must show:
- desk identity
- contract display
- blocker or latest evidence

---

# 7. Motion and Transition Spec

## 7.1 Motion philosophy
Motion should confirm spatial relationships.

It should feel:
- smooth
- weighted
- premium
- restrained

It should not feel:
- gamey
- bouncy
- flashy
- decorative for its own sake

## 7.2 Transition types
### HQ -> Project room
- duration: 260–300ms
- behavior: forward push into selected suite
- selected suite expands while neighboring suites recede/fade
- project plaque or progress strip can act as shared element

### Project room -> Workstation
- duration: 220–260ms
- behavior: anchored zoom from selected desk pod
- background room dims by 10–16%
- contract display resolves first, secondary modules follow

### Room change within project room
- duration: 180–220ms
- behavior: lateral emphasis shift, not full navigation reset
- new zone brightens and rises subtly in contrast

## 7.3 Micro-motion rules
- active pulse cadence: 2.2s to 3.0s max
- hover is optional for web desktop, not primary
- press state: `scale(.985)` with tightened shadow
- evidence update: short edge flash on newest slab only
- no continuous parallax tied to scroll on mobile

## 7.4 Reduced motion
Replace:
- zoom with fade + contrast shift
- slide with opacity transition + active outline
- pulses with static state indicators

Reduced motion must still preserve room and desk context through clear labeling and static lighting.

---

# 8. CSS / Front-End Implementation Guidance

## 8.1 Recommended technical approach
Use composable React/Next components with CSS transforms and layered pseudo-elements.

Recommended primitives:
- `WorldPlane`
- `IsometricModule`
- `StateBeacon`
- `LightSeam`
- `GlassPlaque`
- `EvidenceSlab`
- `DeskPod`
- `RoomPlaque`

## 8.2 Example transform strategy
### Floor plane
- use a container with a skewed pseudo-element background
- keep content layer unskewed above it

### Extruded module
- top surface: main element
- front face: `::after`
- side face if needed: `::before`

### Readability layer
- absolutely positioned front-facing children
- never skew body text with the environment plane

## 8.3 Semantic class map
- `.world-scene`
- `.world-atmosphere`
- `.world-floor`
- `.world-module`
- `.world-module--active`
- `.world-module--blocked`
- `.room-core`
- `.desk-pod`
- `.evidence-slab`
- `.room-plaque`
- `.state-beacon`
- `.light-seam`

## 8.4 Performance guardrails
- avoid nested heavy backdrop-blur stacks
- use shadow and gradient illusions before blur
- limit simultaneous animated glows to the active focal objects
- prefer transforms and opacity for animation
- rasterize decorative SVG textures where cheaper than large CSS filters if needed

---

# 9. Validation Criteria

## The isometric world spec is successful only if:
1. HQ reads as one shared world surface with multiple project spaces inside it.
2. Project view reads as an actual room with zones, not tabs over cards.
3. Desk view reads as a workstation with tangible work objects.
4. Labels remain highly legible because informational overlays stay mostly orthographic.
5. The world remains usable on a 390px-wide mobile viewport.
6. State is communicated by environment, object posture, and light before the user reads all text.
7. The implementation is achievable in modern web UI without requiring a real-time 3D engine.

## Failure signs
The implementation has drifted if:
- skew transforms are applied to text-heavy panels making them harder to read
- rooms lose their shared world base
- screens become decorative paintings with weak actions
- the mobile viewport becomes cramped or fiddly
- the illusion depends on too many layers or expensive effects to run smoothly

---

# 10. Engineering Build Order
1. Create reusable world-plane and extruded-module primitives.
2. Rebuild HQ around a shared floor plate with embedded project suites.
3. Rebuild Project Office around the run table core, desk perimeter, and delivery wall.
4. Rebuild Agent Desk as a workstation scene with contract display and evidence slabs.
5. Add consistent state beacons and light seams.
6. Add anchored scene transitions.
7. Optimize/reduce decorative layers for performance on iPhone Safari.
