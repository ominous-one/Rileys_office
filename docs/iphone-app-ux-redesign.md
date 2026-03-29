# Riley's_Office — iPhone App UX Redesign

> Project note: `PROJECT.md` and `BRAND.md` were not present in the project root during this run. This redesign uses the current product brief, iPhone UX notes, world design, and live scaffold as source context.

## Redesign Goal
Turn the current stacked mobile dashboard into an iPhone-native luxury control app with stronger information hierarchy, better thumb ergonomics, and spatial movement between HQ, project office, and agent desk.

## Core UX Shift
### Current pattern
- vertically stacked dashboard cards
- mostly equal visual weight
- straightforward admin-shell navigation

### Redesigned pattern
- **single dominant hero + modular room slices**
- **room-to-room navigation through sheets, rails, and spatial cards**
- **one primary action per zone**
- **clear progression from overview -> office -> desk -> intervention**

## Device Frame Assumption
- Base width: 390px
- Max app frame width in web shell: 430px
- Respect safe-area top and bottom at all times
- Primary tap zone sits between 48px below top hero and 120px above nav bar

## Global Shell Redesign
### 1. Status Bar + App Frame
At the top of every screen:
- native-safe top spacing
- compact system row for time, connection, and mode
- no bulky custom headers unless the page needs a hero statement

### 2. Floating Navigation Dock
Redesign the bottom nav into a premium floating dock.

#### Dock spec
- Height: 68px body + safe-area bottom
- Outer margin: 12px
- Radius: 999px
- Background: smoked glass
- Active tab: inset illuminated capsule
- Icons above labels optional; if no icon system exists yet, keep label-only placeholders but reserve icon wells

#### Nav order
1. HQ
2. Projects
3. Activity
4. Inbox
5. Desk

Rename `Office` to **HQ** in nav copy. It sounds more premium, shorter, and clearer.

### 3. Global Command Access
Add a floating command trigger above the nav dock, centered-right.
- Size: 56px
- Visual: glossy dark orb with violet core light
- Opens command/search/action sheet
- Presents search, jump to project, jump to agent, recent blockers, guarded action shortcuts

## Information Architecture
## Primary Screens
1. **HQ** — system overview, priority routing, portfolio health
2. **Project Office** — one project's live mission floor
3. **Agent Desk** — single operator/agent live workstation
4. **Activity** — filtered event timeline
5. **Inbox** — intervention and thread center

## Secondary Surfaces
- project selector sheet
- room map sheet
- evidence drawer
- action guard sheet
- run detail sheet
- quick reply sheet

## Screen 1 — HQ Redesign
This replaces the current Office Overview page.

## HQ layout order
### A. Executive Hero
Height: ~240–280px
Contents:
- label: `Headquarters`
- title: `Riley's Office`
- live pulse statement: short operational summary
- connection state capsule
- portfolio health score / alert count cluster
- primary CTA: `Review priorities`

This hero should feel like entering the building lobby.

### B. Priority Rail
Horizontal snap rail directly below hero.
Each tile represents one urgent item:
- blocker
- stale run
- approval-needed task
- degraded transport

Tile contents:
- severity badge
- title
- affected project/agent
- one direct action label

### C. Project Corridor
Transform current project list into a horizontally scrollable office corridor.
Each project becomes a large tile with:
- project insignia or initials chip
- mission label
- health state
- live run progress line
- occupancy count (`3 desks active`)
- subtle room-light accent by project color

Interaction:
- tap opens project office
- long-press opens project quick sheet

### D. Presence Gallery
Replace the plain agent list with a desk-presence strip.
Structure:
- 2-column card grid or horizontal mini pods
- each pod shows avatar placeholder, role, state, current contract fragment
- active desks glow softly
- blocked desks gain sharper red edge and callout label

### E. Live Feed Teaser
Show only top 3 events plus a `View all activity` row.
Timeline items need stronger metadata hierarchy:
- label
- source chip
- relative time
- one-line detail

## HQ behavioral rules
- If there are urgent blockers, the priority rail appears before project corridor.
- If there are no blockers, the corridor moves directly below hero.
- Connection degraded state adds a banner ribbon inside hero instead of separate noisy card.

## Screen 2 — Project Office Redesign
This is the most important screen in the app. It must feel like entering a single premium operations suite.

## Project Office layout order
### A. Office Cover
Large branded cover card with:
- project name
- mission sentence
- health badge
- active run title
- urgency indicator
- quick actions: `Open chat`, `View evidence`, `Room map`

### B. Room Strip
Replace the current room grid with a horizontally scrollable room strip or segmented room rail.
Rooms:
- Mission Control
- Team Floor
- Delivery Wall
- Ops Room
- Archive

Each room card includes:
- room name
- live state dot
- short purpose
- occupancy / count metric

Active room gets a brighter backplate and slightly larger scale.

### C. Active Run Band
Persistent mid-screen band summarizing current governed run.
Contains:
- run summary
- phase label
- progress meter
- current owner role
- gate state (QA / reviewer / waiting / blocked)
- CTA: `Open run`

### D. Desk Cluster
Redesign agent listing into a visual desk floor.
Recommended mobile layout:
- 2-column staggered cards for up to 6 desks
- beyond 6: horizontal grouped trays by state

Each desk card must show:
- agent name
- role
- status badge
- current task fragment
- last artifact touched
- unread chat count if present

### E. Delivery Wall
Turn the artifact list into a visual wall with grouped sections:
- In progress
- Awaiting QA
- Awaiting Review
- Approved
- Blocked evidence

Each artifact row shows:
- artifact label
- exact path (compact mono style)
- status
- related gate

### F. Guarded Action Shelf
Actions should not appear as a disabled button dump.
Instead show:
- 2–4 action capsules
- each labeled with state: `Available`, `Locked`, `Approval needed`
- tapping locked actions opens explanation sheet

## Project Office interaction model
- Swiping the room strip updates the content area below without a full hard page change.
- Desk tap opens the agent desk with zoom-in transition anchored on that card.
- `Room map` opens as a bottom sheet mini floorplan, not a new page.

## Screen 3 — Agent Desk Redesign
The desk should feel intimate and operational, like leaning over one workstation.

## Agent Desk layout order
### A. Desk Header
Sticky compact header after initial scroll.
Expanded state includes:
- agent name
- role
- current task sentence
- status badge
- live presence indicator

### B. Contract Focus Card
This replaces the basic current contract section.
Contents:
- contract summary
- project / run breadcrumb
- progress label
- blocker callout if present
- CTA: `Message about this`

### C. Workstream Stack
A stack of 3 premium modules:
1. **Evidence** — latest changed files / artifacts
2. **Conversation** — latest thread state + quick reply chips
3. **Next governed actions** — controlled action set with explanation labels

### D. Desk Telemetry Strip
Compact row with:
- last update time
- artifacts touched count
- waiting on / blocked by value
- quality gate state if relevant

### E. Composer Tray
Persistent bottom composer above nav when in chat context:
- text input
- quick chips: clarify, prioritize, unblock, summarize, approve
- auto-attached context chip(s)

## Agent Desk UX rules
- Never push the latest blocker below the fold if one exists.
- Latest touched evidence should always appear within the first viewport.
- If no conversation exists, show a premium empty state with recommended prompts.

## Activity Screen Redesign
### Current issue
The activity feed is too plain and visually equal.

### New structure
- compact hero with live pulse count
- sticky filter chip rail
- grouped timeline by time bucket: `Now`, `Last 15 min`, `Earlier`
- each event row includes event type icon, source, timestamp, and jump CTA

### Event row variants
- run event
- agent event
- QA gate event
- reviewer event
- alert event
- system event

Each variant changes icon, accent edge, and metadata ordering.

## Inbox Screen Redesign
### New layout
- hero with unread and waiting counts
- pinned threads carousel at top
- main thread list below
- each thread card contains context chips, last speaker, governance marker, updated time, and quick actions

### Thread actions
Replace disabled static chips with contextual actions:
- `Clarify`
- `Prioritize`
- `Unblock`
- `Summarize`
- `Approve` only if permissions and governance state allow

## Thumb-Zone Rules
Primary interactive elements must live in the lower-middle band of screen whenever possible.

### Place low on screen
- quick actions
- reply composer
- room switcher when used persistently
- event/action confirmations

### Place high on screen
- hero summaries
- passive context
- total health indicators

## Layout Spacing System
- outer gutter: 16px
- hero internal padding: 24px
- card padding: 18–20px
- stack gap between sections: 16px
- mini-gap within instrumentation: 8px
- horizontal rail gap: 12px

## Copy Style Rules
- Avoid corporate dashboard labels like `overview`, `summary`, `details` when a stronger spatial term exists.
- Prefer premium concise labels:
  - HQ
  - Corridor
  - Team Floor
  - Delivery Wall
  - Desk Focus
  - Ops Room
  - Archive

## State Handling
### Healthy state
- calm neutral surfaces with low-level violet lighting

### Active state
- cyan motion accents and live pulse dots

### Blocked state
- localized warm-red edge, direct reason label, visible unblock CTA

### Waiting state
- amber meter and subdued pulse

### Stale state
- lavender-gray treatment plus `Refresh delayed` label

### Degraded transport
- orange-coral inline banner in hero or run band

### Locked action
- action remains visible but wrapped in lock state and explanation

## Empty-State Design
Premium empty states should feel intentional, not incomplete.

### HQ no alerts
`Quiet floor. No critical interventions right now.`

### Project no active run
`This office is staged and ready. Launch or attach a governed run.`

### Desk no evidence
`No artifact movement yet. Evidence appears as the run touches files.`

### Inbox empty
`No waiting conversations. New interventions will appear here with project context attached.`

## Suggested Screen Composition Map
### HQ first viewport
1. top safe row
2. executive hero
3. priority rail or project corridor start
4. partial next section tease

### Project Office first viewport
1. top safe row
2. office cover
3. room strip
4. active run band
5. first desk card entering viewport

### Agent Desk first viewport
1. desk header
2. contract focus card
3. evidence card
4. composer hint / quick action hint near bottom

## Engineer Implementation Priorities
1. Rebuild shell/navigation first.
2. Replace flat vertical list patterns with horizontal rails + modular bands.
3. Upgrade HQ, Project Office, and Agent Desk layouts in that order.
4. Add bottom sheets for room map, action explanations, and quick jump.
5. Add sticky interaction elements only after hierarchy is correct.
