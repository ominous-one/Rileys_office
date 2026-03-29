# Riley's_Office — Game Scene Direction

> Project note: `PROJECT.md` and `BRAND.md` were not present in the project root during this run. This package is grounded in the existing world-design, premium visual direction, spatial UI spec, and iPhone redesign docs.

## Intent
Shift Riley's_Office from a premium dashboard into a **world-like operating environment**. The user should feel like they are moving through an elegant, cinematic headquarters where projects are rooms, agents occupy workstations, and evidence physically lives somewhere in the scene.

The target reference is **The Sims in spatial readability**, not in art style. The product should preserve the intuitive room logic of simulation games while looking more like a luxury strategy interface or prestige sci-fi command set.

## Experience Thesis
The interface should feel like:
- entering a headquarters at night
- looking down into an active operations floor
- seeing work happen in specific places
- tapping deeper until one workstation fills the frame
- always understanding what is active, blocked, waiting, or approved from the scene itself

The interface should **not** feel like:
- stacked mobile cards pretending to be rooms
- cute isometric office illustration
- gamified productivity toy
- neon cyberpunk overload
- generic SaaS sections with renamed labels

## Core World Fantasy
Riley's_Office is a living executive command building.

Spatial layers:
1. **HQ World View** — the whole headquarters floor as the macro simulation board
2. **Project Room Scene** — one active project suite, staged like a premium operations room
3. **Agent Workstation Scene** — one desk or pod, where the work contract, evidence, and conversation are materially present

Every level must preserve three things:
- **readability in under 2 seconds**
- **clear action affordances on iPhone**
- **spatial continuity between levels**

## Art Direction Summary
### Visual genre
- premium architectural simulation interface
- dark-luxury command environment
- cinematic but restrained
- 2.5D layered composition, not literal 3D engine rendering

### Design DNA
- The Sims: spatial legibility and room logic
- Monument Valley / strategy overlays: composed depth and elegant simplification
- Apple / high-end automotive UI: premium material restraint
- film production design: motivated light, silhouette, hierarchy

### Render language
Treat each scene as a **painted isometric set with live UI overlays**, assembled in web layers:
- architectural base plane
- walls/furniture silhouette planes
- ambient light pools
- data beacons and state glows
- floating control labels
- tactical overlays for actions and evidence

## Scene Composition Rules
## 1. Always compose like a set, not a page
Each screen needs:
- a background environment plane
- a clear focal object
- supporting props/zones
- peripheral ambient detail
- one strong interaction rail

## 2. One hero object per scene
- HQ: central building floor / project corridor cluster
- Project room: run table or room core
- Workstation: desk surface / monitor bank / evidence stack

If everything glows equally, the world illusion collapses.

## 3. Depth comes from layers, not realism
Use 4 reliable depth bands:
1. **Backdrop layer** — dark architecture, wall gradients, skyline/fog hints
2. **World layer** — rooms, floors, desks, walls, corridors
3. **Interactive object layer** — cards, pods, evidence stacks, action capsules
4. **HUD layer** — labels, counters, buttons, system chips

## 4. The state should read from the scene before the text
A blocked desk should feel blocked from color, posture, and lighting before the label says `Blocked`.

## 5. Mobile framing beats literal completeness
Show enough of the room to imply a world. Do not try to fit a whole building blueprint onto a 390px screen.

---

# Scene 01 — HQ World View

## Narrative role
This is the **master world board**. It should feel like peering into a premium headquarters floor where multiple project rooms are alive at once.

## Primary user question
"What part of my world needs me right now?"

## Composition target
An **angled world tableau** with one main floor plane and several project suites embedded into it.

### Camera logic
- camera type: shallow isometric / elevated three-quarter top-down
- tilt target: 28°–36° implied angle
- horizon: off-screen or extremely high; avoid deep perspective tunnel
- crop: prioritize the central 65% of the composition for actionable content
- movement between states: slight dolly/slide, never dramatic orbit

### Layout structure
The HQ scene should be composed in five visual bands:
1. **Atmospheric crown** — header glow, building name, subtle skyline/ceiling wash
2. **Central world floor** — isometric floor plane containing project suites
3. **Priority lane** — urgent items docked at the nearest front edge of the world
4. **Presence strip** — active desk pods aligned along lower-middle thumb-friendly band
5. **Command dock** — floating nav and command trigger anchored to bottom

## World objects
### A. Headquarters floor plate
Represented as a dark beveled plane with subtle grid seams and room outlines.

Spec:
- visible width: 92–100% of content width
- apparent depth: 180–220px on iPhone
- edge lighting: cool-white top rim + one violet ambient seam
- floor segmentation: 3–5 implied zones max
- texture: blueprint linework at 2–4% opacity, never noisy

### B. Project suites
Each project is a self-contained isometric room tile nested into the floor plate.

Each suite should include:
- project name
- insignia or initials plaque
- one dominant state beacon
- occupancy markers (mini desk lights)
- progress bar embedded as architectural strip light
- one room-specific accent tone

Visual metaphor:
- not a card floating above the floor
- instead a **lit office module inset into the HQ floor**

### C. Priority incidents
Urgent items appear as elevated alert slabs at the near edge of the scene.

Reason:
The near edge reads as the user’s actionable foreground. This keeps urgent work thumb-reachable without breaking the world view.

### D. Presence pods
Represent agents as compact workstation pods or signal nodes, not plain list rows.

Pod anatomy:
- top glow or activity halo
- name and role label
- tiny task excerpt
- evidence tick or unread marker

### E. Ambient systems
Allowed ambient cues:
- corridor seam lights
- soft animated activity pulses in active rooms
- faint data trails between HQ and active project rooms
- soft dusk haze in back corners

Not allowed:
- animated people
- decorative office clutter
- sparkles, particles, or constant motion everywhere

## Visual hierarchy
Priority order:
1. critical alert slab / active CTA
2. currently hottest project suite
3. remaining project suites
4. presence pods
5. feed/history teaser
6. ornamental background detail

## Lighting direction
HQ is lit like a prestige building model at night.

Lighting recipe:
- base shadow: deep blue-black
- top-left cool key light for structural definition
- project suites emit their own local light
- active/healthy spaces = cool cyan-violet mix
- blocked spaces = restrained ember-red edge contamination
- approved/completed spaces = calm white-violet steadiness

## iPhone viability rules
- no suite smaller than a 44px action target in its interactive zone
- world depth must remain legible without pinch zoom
- any suite that cannot fit its information must collapse to: name + status + occupancy + progress
- urgency must be readable from brightness pattern, not tiny labels alone

## Implementation guidance
### Recommended DOM stack
1. `hq-world-shell`
2. `hq-atmosphere`
3. `hq-floor-plate`
4. multiple `project-suite` layers
5. `priority-incident-rail`
6. `presence-pod-strip`
7. `hud-and-command-dock`

### Rendering method
Use CSS transforms, layered gradients, shadows, and pseudo-elements. No requirement for canvas/WebGL in V1.

### Motion
- idle world drift: essentially none
- active suite pulse: 2.2s to 3.2s soft cycle
- open project: forward push + selected suite scale from `0.985` to `1`
- priority item tap: lift from foreground edge, not modal explosion

---

# Scene 02 — Project Room Scene

## Narrative role
This is where a project becomes a believable place. The user should feel they have entered a single premium operations suite with several zones inside it.

## Primary user question
"What is happening in this project room, and where do I intervene?"

## Composition target
A **single hero room** viewed in angled perspective with clear internal sub-zones.

### Room fantasy
Think of a polished operations studio with:
- one central mission table
- several desk stations around the perimeter
- a delivery wall / evidence wall on one side
- an ops console or server strip on another side
- a visible room navigation rail that corresponds to actual places in the room

### Camera logic
- slightly closer than HQ
- desk and wall objects large enough to feel tangible
- room should fill 75–85% of the visible page width
- scene crop should imply more room beyond the frame edges

## Room zoning
The project room should always contain these implied zones, whether fully shown or not:
1. **Mission Control core** — center/front focal object
2. **Team Floor** — desk cluster area
3. **Delivery Wall** — evidence and gate grouping plane
4. **Ops Room edge** — system health / transport / runtime area
5. **Archive edge** — dimmer historical storage zone

## Hero composition
### Central run table
This is the main focal object.

Represented as:
- luminous table, platform, or raised command slab
- contains project name, mission, active run, progress, gate state
- acts as both room header and live storyline anchor

Why it matters:
Instead of a generic cover card, the project’s governed run becomes the physical heart of the room.

### Desk perimeter
Agent desks orbit or flank the run table.

Rules:
- no more than 4–6 desk surfaces visible at once on mobile
- inactive desks can recede into darker silhouette tiles
- active desks receive brighter identity marks and subtle animation
- blocked desks show interruption via red-edged monitor glow or warning strip

### Delivery wall
Artifacts should feel pinned, stacked, or docked on a side wall surface.

Visual treatment:
- vertical wall plane
- grouped columns by gate state
- mono path labels on small instrument plaques
- evidence cards feel magnetically attached to the wall, not floating random cards

### Room navigator
Instead of abstract tabs, the room-switcher should feel like selecting visible zones in the room.

Implementation options:
- top rail with mini room plaques matching the room surfaces
- bottom sheet mini-floorplan
- segmented control that mirrors actual room segments in the illustration

Best default for V1:
A room plaque rail above the central room scene plus content swaps below.

## State staging
### Healthy room
- even cool lighting
- calm active table glow
- desk pods steady
- delivery wall organized and low-noise

### Active room
- central table brighter
- one to three data lines or active indicators pulsing subtly
- selected desk highlighted

### Blocked room
- red warning seam on central table edge
- one desk or wall group contaminated with warm alert light
- copy sits on a dark warning slab, not a full red room wash

### Waiting room
- amber queue light on run table
- inactive desks slightly dimmed
- action shelf becomes more prominent

### Degraded room
- ops edge lights flare coral
- transport warning ribbon appears on room perimeter
- central table stays readable; never let warning override whole scene

## Mobile layout rule
The room scene must break into **hero room + functional slices** rather than trying to show everything at once.

Recommended first viewport:
1. compact top framing
2. project room hero with central run table
3. room plaque rail
4. active run band integrated into room core
5. first two desks or delivery wall preview entering the fold

## Spatial storytelling cues
Use these to keep the room feeling alive:
- selected room zone brightens and comes slightly forward
- distant room zones desaturate and flatten slightly
- switching rooms changes the room’s local emphasis, not the global shell
- artifact updates briefly light a slot on the delivery wall
- unread thread count can appear like a call light at a desk station

## Implementation guidance
### Layer recipe
- back wall gradients
- side wall strips
- room floor plane
- central run table
- desk pods
- delivery wall plane
- room overlays / labels / action capsules

### Key components
- `project-room-scene`
- `run-table-core`
- `room-plaque-rail`
- `desk-pod-cluster`
- `delivery-wall-plane`
- `ops-edge-strip`
- `guarded-action-shelf`

### Motion
- entering from HQ: selected room expands from project suite
- room changes: lateral emphasis shift + 8–20px content slide
- desk selection: anchored zoom from pod to workstation scene

---

# Scene 03 — Agent Workstation Scene

## Narrative role
This is the most intimate level. The user should feel like they are looking directly at one elite workstation where a governed run is being executed.

## Primary user question
"What is this agent doing right now, what has it produced, and what should I say or approve?"

## Composition target
A **desk-surface composition** with strong foreground objects and compressed background context.

### Camera logic
- closer crop than Project Room
- top edge may show hints of surrounding room, but desk surface dominates
- compose like looking over a command desk, not opening a chat thread

## Workstation anatomy
The desk scene should include six tangible zones:
1. **Identity mast** — agent name, role, run breadcrumb
2. **Contract surface** — current governed task card or monitor
3. **Evidence stack** — latest files/artifacts as stacked plaques
4. **Conversation pane** — intervention surface / message thread preview
5. **Action tray** — quick governed actions near thumb zone
6. **Telemetry strip** — compact system facts at edge of desk

## Hero object
### Contract surface / monitor bank
This is the main focal object.

Possible treatment:
- one large angled glass display panel
- or a desk-mounted command slab
- or two-panel monitor composition with one dominant panel

Required contents:
- task summary
- progress state
- blocker if any
- project/run breadcrumb
- message CTA

The contract should feel like the **active machine** at this workstation.

## Secondary objects
### Evidence stack
Artifacts should appear as layered evidence slabs on the desk.

Rules:
- latest artifact is front-most and brightest
- next two recede underneath with visible edge labels
- paths should be middle-truncated mono lines
- state badge attached to each slab edge

### Conversation module
Treat conversation like a side console or communications panel.

Required cues:
- last speaker
- latest message excerpt
- quick replies as physical chips or toggles
- unread or waiting indicator as a small call light

### Telemetry strip
Thin, dense strip along bottom or side edge.

Contains:
- last update
- files touched
- waiting on
- blocker owner
- quality gate state

## State staging
### Active workstation
- cyan seam around main contract display
- evidence stack has one fresh highlight
- subtle live pulse in one corner only

### Blocked workstation
- contract display receives direct warning strip
- blocker reason sits above the fold
- unblock CTA is the nearest action in thumb zone

### Waiting workstation
- quick reply controls become dominant
- contract display softens
- amber waiting light on communications panel

### Approved workstation
- calmer white-violet rim light
- evidence stack looks resolved and neatly docked
- action tray collapses to fewer options

## Composition rules for iPhone
- do not exceed three major visible modules above the fold
- blocker or latest evidence must always be in first viewport
- action tray must be reachable with one thumb, above bottom nav/dock
- background room context should be hinted, not fully rendered

## Interaction model
### Opening a desk
Selected desk pod grows into the workstation scene using anchored zoom.

### Replying or intervening
Do not fully replace the desk. Raise a composer/action sheet from the lower edge so the desk remains present behind it.

### Switching between evidence and conversation
Use tabbed subpanes only if they preserve the desk metaphor. Prefer stacked modules with clear priority instead of hiding evidence behind tabs.

## Implementation guidance
### Layer recipe
- dimmed room backdrop
- desk plane / shadow tray
- contract display
- evidence stack
- conversation console
- action tray
- telemetry strip
- sticky compact identity header after scroll

### Key components
- `agent-workstation-scene`
- `desk-identity-mast`
- `contract-display`
- `evidence-stack`
- `conversation-console`
- `governed-action-tray`
- `desk-telemetry-strip`

### Motion
- open desk: 240ms anchored zoom
- evidence refresh: brief edge shimmer on newest slab only
- quick reply tap: 120–160ms press with fill brighten
- blocker appearance: warning strip slides in, no violent shake

---

# Cross-Scene World Cues

## Shared scene language
Every scene should reuse these world cues so the app feels like one place:
- architectural floor/wall planes
- localized light seams instead of full color fills
- room plaques and desk plaques with consistent shape language
- occupancy markers as miniature live indicators
- mono file-path labels as physical evidence markers
- governance states expressed as environmental light + direct text

## Continuity objects
Use recurring objects across levels:
- project insignia plaque appears in HQ suite and Project Room
- run progress strip appears in HQ, Room, and Workstation
- agent state beacon appears on presence pod, desk pod, and workstation mast
- evidence style remains the same plaque system everywhere

## Color and light translation
- HQ = coolest and broadest lighting
- Project Room = project-specific accent strongest here
- Workstation = most focused contrast and object detail

## Environment density by depth
- HQ: broad world, lower detail per object
- Project Room: medium object detail, strongest room identity
- Workstation: highest detail, smallest field of view

---

# Web Delivery Guidance

## Practical implementation stance
Build the world feeling through layered HTML/CSS and targeted motion, not a heavy game engine.

Recommended approach:
- CSS transforms for isometric illusion
- pseudo-elements for floor edges, wall highlights, and glow seams
- gradient stacks for lighting and atmosphere
- Framer Motion or equivalent for transitions
- semantic component layering rather than one giant illustration

## Performance constraints for mobile web
- keep animated elements under strict control
- avoid continuous parallax on scroll
- prefer opacity, transform, and shadow changes over blur-heavy motion
- use backdrop blur sparingly because iPhone Safari cost rises quickly on stacked translucent layers
- flatten decorative layers on lower-end devices or reduced motion

## Minimum viable world pass
If engineering needs to sequence the transformation, implement in this order:
1. establish floor/room/desk scene composition in layout
2. convert project cards into inset room modules
3. introduce central run-table treatment in project view
4. convert desk detail into workstation composition
5. add depth lighting, room plaques, and state glows
6. add scene transitions and subtle activity cues

## Kill criteria
A scene should be revised if:
- it still reads as vertical cards with renamed labels
- the environment has no clear focal object
- spatial cues are decorative rather than functional
- state can only be understood through text labels
- mobile readability drops because the scene tries to show too much

## Acceptance checklist
This direction is correctly realized when:
- HQ feels like a world board, not a dashboard home
- Project view feels like entering a room, not opening a report
- Agent view feels like a workstation, not a message screen
- evidence and governance are visibly placed in the environment
- spatial transitions strengthen comprehension on iPhone rather than slow it down
