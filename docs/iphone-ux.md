# Riley's_Office — iPhone UX

## Design Objective
Riley's_Office must feel native on iPhone even when shipped as a web app: glanceable, thumb-friendly, fast, and spatially memorable.

## Primary Device Assumption
- iPhone 13/14/15 class viewport
- Base design width: 390px
- Safe area aware
- One-handed use prioritized

## Navigation Model
### Bottom Navigation
- Office
- Projects
- Activity
- Inbox
- Me

### Secondary Navigation
- Swipe between project office rooms
- Pull up bottom sheets for details/actions
- Tap desk cards to open agent detail
- Floating command button for global actions/search

## Core Screen Patterns
### 1. Office Screen
- Hero summary with system pulse and alert count
- Horizontal project office carousel
- Agent presence row
- Priority blockers list
- Activity feed preview

### 2. Project Office Screen
- Office cover card with status
- Mini spatial map of rooms
- Current run progress rail
- Agent desk cluster
- Chat shortcut and evidence shortcuts

### 3. Agent Desk Screen
- Sticky status header
- Task + blocker card
- Evidence card stack
- Conversation panel
- Action tray with guarded actions

### 4. Activity Screen
- Filter chips: all, runs, agents, QA, reviewer, alerts
- Live timeline with timestamps and source labels
- Jump links to related office/desk/evidence

## Interaction Rules
- Every primary action reachable within thumb zone.
- Use bottom sheets instead of deep modal stacks.
- Avoid dense tables; prefer cards, rails, chips, and grouped summaries.
- Preserve context breadcrumbs when jumping from alert -> office -> desk -> evidence.

## Spatial UX Language
- Offices are distinct but minimal, not game-like clutter.
- Rooms are represented as tappable zones/cards.
- Desks represent agents and should visibly communicate state.
- Motion should suggest movement through space, not decorative animation.

## States To Design Explicitly
- healthy
- active
- blocked
- waiting
- stale data
- degraded transport
- action locked / approval required
- empty office / no active run

## Accessibility
- Minimum 44x44 tap targets
- High contrast status colors with icons and text labels
- Reduced-motion mode must flatten spatial transitions
- Dynamic type should preserve hierarchy without breaking cards

## Chat UX
- Composer pinned to bottom
- Quick chips: clarify, prioritize, unblock, summarize, approve
- Attach contextual reference automatically: project, run, agent, artifact path
- Show governance hints before sending privileged directives

## Performance Budget
- First meaningful paint on mobile should feel instant on local network
- Keep motion under 300ms for navigation transitions
- Avoid heavy canvas/WebGL in MVP