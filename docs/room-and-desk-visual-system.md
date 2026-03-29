# Riley's_Office — Room and Desk Visual System

> Project note: `PROJECT.md` and `BRAND.md` are now present in the project root and should be treated as active implementation context. This visual system extends the existing premium and spatial direction into implementation-ready room and workstation patterns.

## Purpose
Define the exact visual system for:
- project rooms as premium operational environments
- agent desks as cinematic workstation scenes
- world cues that make project state, evidence, and governance visibly located in space

This spec is for design and engineering execution, not moodboarding.

---

# 1. System Overview

## Experience goal
Every project should feel like entering a room with a purpose. Every agent should feel like occupying a real workstation within that room.

This system replaces:
- anonymous cards
- generic section blocks
- list-only artifact presentation
- detached governance UI

With:
- room surfaces
- desk pods
- wall-mounted evidence
- scene-based state lighting
- thumb-reachable intervention controls

## Spatial hierarchy
### Macro
- HQ = multi-room building floor

### Mid-level
- Project = one named room suite with sub-zones

### Close-up
- Agent = one workstation/pod within that suite

## Core visual promise
The user should be able to answer these questions almost instantly:
- Which room is hot?
- Which desk is blocked?
- Where are the latest artifacts?
- What can I do from here?

---

# 2. Project Room Visual System

## 2.1 Room archetype
Each project room is a **premium mission suite**.

Base ingredients:
- one central operational object
- 2–6 visible desks or desk previews
- one evidence/delivery surface
- one systems/ops edge
- one room identity plaque

## 2.2 Room archetypes by state
### Healthy room
Use when the project is stable.

Visual cues:
- balanced cool-violet lighting
- organized wall layout
- no aggressive warning surfaces
- desks readable but not noisy

### Active room
Use when the run is underway.

Visual cues:
- central run table brighter than surrounding objects
- one or two active desk seams pulsing softly
- delivery wall updates visible but controlled
- cyan activity signal present

### Blocked room
Use when intervention is required.

Visual cues:
- warning strip on run table or affected desk cluster
- delivery wall shows blocked group with warmer edge treatment
- ambient room lighting remains premium and dark; do not flood whole room red

### Waiting room
Use when the room is paused on input/approval.

Visual cues:
- amber queue signal on central object
- quick action shelf elevated in prominence
- desk activity reduced

### Degraded room
Use when runtime or transport issues affect the project.

Visual cues:
- ops edge glows coral/orange
- central room remains readable
- degradation appears as infrastructure contamination, not content confusion

## 2.3 Room layout anatomy
Every project room should be built from these six zones.

### Zone A — Room plaque
A branded identification marker for the room.

Contains:
- project name
- project insignia or initials
- mission label
- room status badge

Placement:
- upper-left or anchored into room hero
- always visible in first viewport

### Zone B — Run table core
The project’s operational heart.

Contains:
- active run summary
- current phase
- gate state
- progress meter
- primary project CTA(s)

Visual treatment:
- large slab or command table
- edge-lit
- more luminous than any desk
- embedded telemetry strip

### Zone C — Desk cluster
The human/agent execution layer.

Contains per desk:
- agent name
- role
- task excerpt
- status
- artifact hint
- unread/waiting marker

Placement:
- flanking or below central run table
- arranged as staggered pods or a compact two-column floor

### Zone D — Delivery wall
The project’s artifact and quality-gate surface.

Contains:
- grouped artifact slots by gate
- exact paths
- status markers
- gate labels

Placement:
- side wall or lower wall continuation
- visually distinct from desks

### Zone E — Ops edge
The infrastructure/system side of the room.

Contains:
- runtime health
- connection state
- degraded/locked notices
- integration/system readouts

Placement:
- side strip or top-edge ribbon
- secondary unless degraded

### Zone F — Guarded action shelf
Visible, bounded interventions.

Contains:
- action capsules
- lock state or approval explanation
- state labels

Placement:
- lower-middle thumb zone or anchored shelf below room hero

---

# 3. Desk Pod Visual System

## 3.1 Desk pod identity
A desk pod is not a small card. It is a mini workstation marker inside a room.

It should imply:
- who is seated here
- what they are doing
- how urgent their state is
- whether they have touched evidence

## 3.2 Desk pod anatomy
Each desk pod includes five stacked layers:
1. **Name plaque** — identity layer
2. **Role line** — job definition
3. **Task excerpt** — what is happening now
4. **Artifact footer** — latest output hint
5. **State beacon** — visual urgency marker

## 3.3 Pod posture by state
### Active pod
- brighter edge seam
- soft cyan glow under upper edge
- freshest artifact footer contrast
- optional subtle pulse every 2.2s+

### Blocked pod
- warm warning edge on one side
- blocker label visible without opening pod
- artifact footer may dim while warning rises in priority

### Waiting pod
- amber dot or seam
- task copy remains visible
- waiting note shown in footer/right corner

### Healthy pod
- neutral premium glass body
- low-level violet rim
- no motion

### Stale pod
- low-energy cool-gray-violet treatment
- no pulse
- refresh-delayed label if relevant

## 3.4 Pod dimensions
For project room desk floor:
- width: 148–168px
- min height: 144px
- padding: 16–18px
- radius: 22–24px

For HQ presence floor:
- width: 132–156px
- min height: 128px
- reduced metadata allowed

## 3.5 Pod copy hierarchy
Order of emphasis:
1. agent name
2. state
3. current task
4. role
5. latest artifact / waiting note

Rules:
- task excerpt: 2 lines max
- role: 1 line
- artifact footer: 1 line with truncation
- avoid stacking too many small chips

---

# 4. Agent Workstation Visual System

## 4.1 Workstation identity
The workstation scene should feel like a premium desk with governed work materially present.

It is the point where:
- context becomes intimate
- evidence becomes tangible
- intervention becomes immediate

## 4.2 Workstation anatomy
### A. Identity mast
Persistent identity block.

Contains:
- agent name
- role
- run breadcrumb
- state badge
- live presence dot

Behavior:
- expanded on load
- collapses to sticky compact mast on scroll

### B. Contract display
Primary surface.

Contains:
- task summary
- run summary
- progress label
- blocker reason if any
- message CTA

Treatment:
- largest object in scene
- slightly more rigid/hardware-like than room cards
- active seam light around edge or underglass

### C. Evidence stack
Secondary object system.

Contains:
- latest 3 artifacts preferred
- state per item
- exact path
- update/gate note

Treatment:
- stacked plaques with visible edge offsets
- newest evidence on top
- approved items calmer and flatter
- blocked items receive warm warning corner

### D. Conversation console
Communications surface.

Contains:
- last thread line
- last speaker
- context chips
- quick reply chips

Treatment:
- side-console or subpanel aesthetic
- more subdued than contract display
- active waiting state can elevate its contrast

### E. Governed action tray
Thumb-zone action row.

Contains:
- Clarify
- Prioritize
- Unblock
- Summarize
- Approve where allowed

Treatment:
- premium capsules
- visible lock states instead of disappearing options
- clear availability labels

### F. Telemetry strip
Dense support data.

Contains:
- last update
- files touched
- waiting on
- blocker owner
- quality gate state

Treatment:
- thin instrument rail
- mono numerics / compact labels
- visually quiet but legible

---

# 5. Delivery Wall System

## 5.1 Role
The delivery wall gives artifacts a physical home inside the project room.

This is critical to the world illusion. Evidence cannot feel like random text rows floating under the room.

## 5.2 Group structure
Required groups:
- Working
- Awaiting QA
- Awaiting Review
- Approved
- Blocked

## 5.3 Wall composition
Each wall group needs:
- group header plaque
- count indicator
- vertical stack of evidence slots
- optional empty-state surface

Each evidence slot contains:
- artifact label
- exact path line
- state marker
- related gate note

## 5.4 Visual behavior by state
### Working
- cool active edge
- strongest contrast after blocked

### Awaiting QA
- pale cyan-white edge
- procedural feel

### Awaiting Review
- violet-white edge
- premium but not done yet

### Approved
- stable neutral-white / soft violet edge
- calmer and more ordered

### Blocked
- warm red edge, darkest interior
- reason or gate issue visible

## 5.5 Path formatting rule
Paths should always use a mono or near-mono style and truncate in the middle.

Correct:
`docs/.../GAME-SCENE-DIRECTION.md`

Incorrect:
`C:\Users\omino\.openclaw\workspace\projects\Riley's_Office\docs\GA...`

---

# 6. Room-to-Desk Cue System

## 6.1 Shared visual tokens
To preserve continuity, rooms and desks must share:
- plaque shapes
- edge highlight style
- status beacon logic
- evidence slab styling
- typography hierarchy
- action capsule family

## 6.2 Visual handoff from room to desk
A desk selected in the room should carry at least two matching visual anchors into the workstation scene:
- same agent/state beacon color
- same name plaque label block
- same active seam orientation if possible

## 6.3 Evidence continuity
If a desk pod shows a recent artifact hint, that artifact should appear as the first evidence slab when the desk opens.

This is important to make the world feel coherent.

---

# 7. Color, Material, and Light for Rooms and Desks

## 7.1 Base materials
### Structural body
- dark ink/navy matte
- used for room shell, desk base, wall bodies

### Glass surface
- used for plaques, displays, premium control surfaces
- subtle translucency
- high edge definition

### Instrument body
- more opaque and dense
- used for telemetry strips, small controls, state capsules

## 7.2 Accent usage
### Violet
Use for:
- identity light
- premium ambient seams
- selected or stable focus states

### Cyan
Use for:
- active/live work
- current desk focus
- live transport/data energy

### Amber
Use for:
- waiting/input-needed
- queue and approval attention

### Red/Coral
Use for:
- blockers and degradation
- always localized, never full-screen dominant

## 7.3 Light placement hierarchy
### Room level
- central run table emits strongest room light
- desk pods emit secondary light
- delivery wall receives edge light only

### Desk level
- contract display emits strongest local light
- evidence stack gets top slab emphasis
- conversation console gets lower-energy light

---

# 8. Typography and Iconography Rules for Rooms and Desks

## 8.1 Typography hierarchy
### Room level
- room/project name: 22–28px equivalent emphasis
- run summary: 15–16px
- zone labels: 11–12px uppercase/eyebrow style
- desk/task copy: 13–15px

### Desk level
- agent name: 20–24px equivalent emphasis
- contract summary: 15–16px
- evidence label: 13–14px
- telemetry: 11–12px compact/mono-friendly

## 8.2 Icon usage
Icons should support object identity, not replace labels.

Recommended uses:
- small state dots/icons in badges
- action tray icons
- delivery wall gate icons
- ops edge system markers

Avoid:
- oversized decorative icons
- multiple icon styles in same room
- icons as the only state indicator

---

# 9. Mobile-Web Behavior Rules

## 9.1 Room scene on iPhone
### First viewport must include:
- project plaque
- central run table
- room switcher
- first actionable desk or wall cue

### Scroll progression
As the user scrolls:
- the room identity should compress but remain present
- the desk cluster and delivery wall should unfold in clear chunks
- the action shelf should remain reachable without forcing return to top

## 9.2 Desk scene on iPhone
### First viewport must include:
- identity mast
- contract display
- blocker or latest evidence

### Secondary viewport can include:
- conversation console
- extended evidence stack
- telemetry strip

### Sticky behavior
Allowed sticky elements:
- compact desk identity mast
- composer/action tray in intervention mode

Avoid too many sticky bars. One persistent mast plus one bottom action layer is the upper limit.

## 9.3 Horizontal rails
Use rails only where they strengthen room logic:
- room plaques
- quick actions if compact
- presence pods in HQ

Do not place critical evidence behind awkward horizontal scrolling.

---

# 10. Component Implementation Map

## Project room components
- `ProjectRoomShell`
- `ProjectRoomPlaque`
- `RunTableCore`
- `DeskCluster`
- `DeskPod`
- `DeliveryWall`
- `DeliveryWallGroup`
- `OpsEdgeRibbon`
- `GuardedActionShelf`

## Workstation components
- `AgentWorkstationShell`
- `DeskIdentityMast`
- `ContractDisplay`
- `EvidenceStack`
- `EvidenceSlab`
- `ConversationConsole`
- `GovernedActionTray`
- `DeskTelemetryStrip`

## Shared primitives
- `GlassPlaque`
- `StateBeacon`
- `LightSeam`
- `MonoPathLabel`
- `StatusCapsule`
- `InsetTelemetryBar`

---

# 11. Acceptance Criteria

The room and desk visual system is correct only if:
1. Project rooms read as places with zones, not section cards with decorative styling.
2. Agent desks read as workstation scenes with a clear live contract object.
3. Evidence has a physical home in both room and desk contexts.
4. State can be inferred from light, edge treatment, and posture before all labels are read.
5. Mobile users can still act quickly because key controls remain thumb-friendly.
6. The visual system preserves continuity between HQ, room, and desk levels.

## Failure indicators
Revise the implementation if:
- the room hero is just a large generic card
- desk pods feel like repeated profile cards
- evidence looks like a basic list
- state relies mostly on tiny labels or badges
- the workstation loses intimacy because too many modules compete above the fold

---

# 12. Immediate Engineering Priorities
1. Convert project hero into `RunTableCore` rather than a standard cover card.
2. Rebuild agent cards as `DeskPod` components with clear workstation posture.
3. Build `DeliveryWall` grouping with physical evidence-slot styling.
4. Rebuild agent detail into `ContractDisplay + EvidenceStack + ConversationConsole + ActionTray` scene composition.
5. Add consistent state-beacon and light-seam rules across room and desk components.

