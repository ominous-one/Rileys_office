# Riley's_Office — Spatial UI Spec

> Project note: `PROJECT.md` and `BRAND.md` are now present in the project root and should be treated as active implementation context. This spec is based on existing product/domain artifacts and the current component structure.

## Purpose
This document turns the world-design metaphor into implementation-ready UI structure for engineering. It defines spatial zones, screen anatomy, component rules, state mapping, and motion behavior for the three primary experiences:
- HQ (`OfficeOverview`)
- Project Office (`ProjectOfficeView`)
- Agent Desk (`AgentDeskView`)

## Spatial Model
The product is a building, not a dashboard.

### Hierarchy
1. **HQ Lobby** — portfolio-wide control layer
2. **Project Corridor** — row of project offices
3. **Project Office** — one project's operational suite
4. **Room Layer** — mission control, team floor, delivery wall, ops room, archive
5. **Agent Desk** — one workstation within the office

### Translation Rule
Every spatial metaphor must map to a real object.
- HQ Lobby = global office snapshot
- Corridor tile = project summary
- Room = filtered subdomain of project data
- Desk = agent detail
- Delivery Wall = artifacts and gates
- Ops Room = runtime/connection health

If a spatial element does not map to real data or action, do not build it.

## Layout Grid
## Mobile Frame
- design width: 390px
- safe working content width: 358px after 16px gutters
- app max width in shell: 430px

## Vertical Rhythm
- top safe inset + 8px minimum
- hero-to-next-zone gap: 16px
- section gap: 16px
- content row gap inside cards: 10px / 12px / 16px depending on density

## Horizontal Rhythm
- full-width cards align to 16px outer gutters
- rails bleed visually edge-to-edge but snap within padded content rails
- room and project cards use 12px inter-card gap

## Screen Anatomy
## 1. HQ / Lobby Spec
Maps to `components/office/office-overview.tsx`.

### Required zones
#### Zone A — Lobby Hero
Purpose: orient operator instantly.

Required content:
- building label
- app title
- live summary sentence
- connection capsule
- timestamp
- system health cluster
- primary action

Spec:
- height min: 248px
- radius: 28px
- background: directional violet light with neutral base
- bottom area includes inset telemetry tray

#### Zone B — Priority Rail
Purpose: surface what needs intervention now.

Structure:
- horizontal snap rail
- 1.2 cards visible at a time
- card width: 288–312px
- severity edge + single CTA label

Data sources:
- alerts
- blocked agents
- degraded connection
- stale runs

#### Zone C — Project Corridor
Purpose: spatially represent portfolio.

Structure:
- horizontal snap rail of office tiles
- each tile reads like a door/room panel
- tile width: 300–330px
- tile height: 176–196px

Each tile must contain:
- project name
- mission/tagline
- health badge
- run progress
- occupancy count
- accent beacon

#### Zone D — Presence Floor
Purpose: show active desks across the system.

Structure options:
- 2-column grid if <= 6 desks
- horizontal pods if > 6

Desk pod spec:
- height: 132–156px
- top row: role + state
- body: current task fragment
- footer: artifact or chat micro-metadata

#### Zone E — Feed Preview
Purpose: keep activity visible without overwhelming the lobby.

Structure:
- 3 top events max
- footer CTA row to full activity view
- each row includes source chip and relative time

## 2. Project Office Spec
Maps to `components/project/project-office-view.tsx`.

### Required zones
#### Zone A — Office Cover
Purpose: communicate project identity and current mission.

Contents:
- project name
- mission statement
- health badge
- urgency label
- active run summary
- 2–3 quick action buttons

Spec:
- height min: 220px
- accent lighting tied to project color token
- quick actions aligned low for thumb reach if within first viewport

#### Zone B — Room Navigator
Purpose: make project subareas spatially legible.

Preferred implementation:
- horizontal room rail with cards or segmented rail with richer cards beneath

Room list:
- Mission Control
- Team Floor
- Delivery Wall
- Ops Room
- Archive

Room card contains:
- room name
- purpose
- live state dot
- item count or occupancy stat

Behavior:
- tapping room updates sections below via animated content swap
- do not navigate away for simple room changes

#### Zone C — Active Run Band
Purpose: keep the governed run visible as the core storyline.

Contents:
- run summary
- progress label
- phase indicator
- owner role
- gate state
- open-run CTA

Spec:
- sticky after hero collapse on long screens
- visually denser instrument surface
- progress meter with state-colored fill

#### Zone D — Desk Floor
Purpose: represent the team working in this office.

Structure:
- 2-column staggered desk cards
- each desk card anchors transition into Agent Desk

Desk card required fields:
- agent name
- role
- state
- current task
- latest artifact path or label
- unread thread count or waiting marker

Variant rules:
- blocked desk: stronger red edge and unblock label
- active desk: cyan light seam and subtle pulse
- waiting desk: amber dot and subdued footer

#### Zone E — Delivery Wall
Purpose: cluster artifacts and quality gates.

Structure:
- grouped vertical sections by status/gate
- inside each group, artifact rows use mono path line + status marker

Required groups:
- Working
- Awaiting QA
- Awaiting Review
- Approved
- Blocked

#### Zone F — Guarded Action Shelf
Purpose: expose what can be done safely from mobile.

Action capsule anatomy:
- label
- status tag
- optional reason text
- icon or state dot

Behavior:
- available => immediate action path
- locked => explanation sheet
- approval needed => request / route sheet

## 3. Agent Desk Spec
Maps to `components/desk/agent-desk-view.tsx`.

### Required zones
#### Zone A — Desk Identity Header
Contents:
- agent name
- role
- current task
- status badge
- project/run breadcrumb

Behavior:
- large version at top
- compact sticky header after scroll threshold ~72px

#### Zone B — Contract Focus Card
Purpose: summarize the exact work contract.

Contents:
- run summary
- contract snippet
- progress label
- blocker state if any
- contextual reply CTA

#### Zone C — Evidence Stack
Purpose: show tangible output first.

Rules:
- latest 3 evidence items above the fold when possible
- each evidence item includes label, path, state, last-updated or gate note
- mono file path line must truncate middle, not tail only

#### Zone D — Conversation Module
Purpose: enable fast intervention.

Contents:
- thread title
- last message preview
- last-updated time
- context chips
- quick reply row

Quick replies:
- Clarify
- Prioritize
- Unblock
- Summarize
- Approve (gated)

#### Zone E — Governed Action Tray
Purpose: show available moves from the desk.

Structure:
- horizontally scrollable capsule row or 2-column mini grid
- keep within thumb zone near bottom

#### Zone F — Telemetry Strip
Purpose: surface compact desk facts.

Fields:
- last update
- files touched
- waiting on
- blocker owner
- gate state

## Component-Level Specifications
## Project Office Tile
Use on HQ corridor.

```text
Top row: insignia chip | health badge
Middle: project name
Subline: mission / tagline
Bottom row: progress meter + occupancy
Accent: side beacon or top-right room light
```

Measurements:
- padding 20px
- radius 24px
- min tap area full tile

## Desk Card
Use on HQ presence and Project Office desk floor.

```text
Top row: agent name | status pill
Second row: role
Body: current task (2 lines max)
Footer left: latest artifact
Footer right: unread / waiting / updated
```

Measurements:
- padding 18px
- radius 22–24px
- min height 144px in project office, 128px in presence strip

## Room Card
Use in project office room rail.

```text
Top row: room name | live dot
Body: purpose
Footer: count metric
```

Active state:
- brighter border
- more luminous background
- 1.02 scale

## Status Encoding Spec
Map visual state consistently across screens.

| State | Border | Fill/Glow | Motion | Copy treatment |
|---|---|---|---|---|
| Healthy | neutral-soft + green accent | faint green dot | none | calm positive |
| Active | cyan border accent | cyan seam/glow | soft ambient pulse | live / in progress |
| Blocked | warm-red edge | localized red glow | no pulse, sharper contrast | direct blocker reason |
| Waiting | amber dot | subtle amber fill | slow pulse optional | awaiting input / gate |
| Stale | violet-gray border | low-luma violet tint | none | refresh delayed |
| Degraded | coral-orange border | haze in banner area | warning pulse only in banner | transport degraded |
| Locked | muted graphite | no glow | none | approval required / unavailable |

## Motion Specification
## Navigation motion
### HQ -> Project Office
- transition type: forward room entry
- duration: 280ms
- entering screen scale: 0.985 -> 1.0
- opacity: 0.7 -> 1.0
- shared element candidate: selected project tile accent or title block

### Project Office -> Agent Desk
- transition type: anchored desk zoom
- duration: 240ms
- desk card expands into header origin
- background dims slightly during transition

### Room change inside Project Office
- transition type: rail-linked content slide
- duration: 220ms
- content offset: 20px horizontal + 8px opacity fade

## Micro-interactions
- card press: 96–140ms scale to 0.985 + shadow tighten
- chip select: 140ms fill brighten
- live pill pulse: every 2.2s max, active state only
- meter fill changes: 260ms ease-out

## Accessibility Rules
- all actionable rows min 44x44
- all color-coded states require text + icon or label reinforcement
- room rail must be fully keyboard and screen-reader navigable in web app
- reduced motion disables zoom/parallax and uses fade/outline emphasis only
- body text contrast target: WCAG AA minimum on dark surfaces

## CSS Architecture Recommendation
Engineering should introduce semantic classes or tokens for spatial zones rather than styling every card ad hoc.

Recommended layer names:
- `.lobby-hero`
- `.priority-rail`
- `.office-tile`
- `.room-rail`
- `.run-band`
- `.desk-card`
- `.delivery-wall`
- `.action-shelf`
- `.telemetry-strip`

## Mapping to Existing Components
### `office-overview.tsx`
Replace sections with:
- `LobbyHero`
- `PriorityRail`
- `ProjectCorridor`
- `PresenceFloor`
- `FeedPreview`

### `project-office-view.tsx`
Replace sections with:
- `OfficeCover`
- `RoomRail`
- `ActiveRunBand`
- `DeskFloor`
- `DeliveryWall`
- `GuardedActionShelf`

### `agent-desk-view.tsx`
Replace sections with:
- `DeskIdentityHeader`
- `ContractFocusCard`
- `EvidenceStack`
- `ConversationModule`
- `GovernedActionTray`
- `DeskTelemetryStrip`

## Acceptance Criteria for Engineering
The spatial UI spec is correctly implemented only if:
1. HQ clearly reads as a lobby and corridor, not a generic card stack.
2. Project Office clearly reads as one office with switchable rooms.
3. Agent Desk clearly reads as one workstation with focused evidence and intervention controls.
4. Status/state encoding is consistent across project, room, desk, artifact, and action surfaces.
5. Motion reinforces navigation depth and room relationships.
6. All primary actions remain iPhone-thumb reachable and governance states remain explicit.

## First-Pass Build Order
1. New tokens and premium surface primitives
2. Floating dock and shell framing
3. HQ lobby and corridor components
4. Project office cover, room rail, and run band
5. Desk floor and agent desk modules
6. Delivery wall grouping and action explanation sheets
7. Motion pass and reduced-motion fallback

