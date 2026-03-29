# Riley's_Office — MVP Scope

## Scope Statement
Ship a production-ready first implementation wave for an iPhone-first live control app that visualizes OpenClaw as project offices and agent desks, with realtime monitoring and direct chat/action entry points.

## In Scope
### 1. Office Shell
- Mobile web app shell optimized for iPhone viewport
- Bottom navigation: Office, Projects, Activity, Inbox, Me
- Real-time connection indicator
- Global command/search sheet

### 2. Office Overview
- Active projects summary
- Agent presence strip
- Run health summary
- Blocker/alert stack
- Recent activity timeline

### 3. Project Office
- Office hero with health state
- Room cards: mission control, delivery wall, agent floor, evidence cabinet
- Current run summary
- Artifact progress widgets
- Office chat thread

### 4. Agent Desk
- Agent identity, role, status, contract
- Current task summary
- Latest evidence and blockers
- Chat composer bound to agent/project context
- Quick actions: nudge, clarify, approve, inspect evidence

### 5. Realtime State Layer
- Polling/SSE/WebSocket adapter for local OpenClaw state
- Normalized event model for runs, agents, QA, reviewer, logs, alerts
- Last-updated and stale-state handling

### 6. Spatial UI Layer
- 2.5D card-based office map
- Tap to enter rooms/desks
- Motion-lite transitions safe for mobile performance

### 7. Governance-Aware Actions
- Read-only by default when permissions uncertain
- Action guards for approvals, sensitive execution, and side effects
- Confirmation sheets for privileged actions

## Out of Scope
- Full multi-user auth and RBAC
- Native iOS binary
- Voice interface
- Rich 3D avatar movement
- External customer-facing dashboards
- Autonomous action macros without operator review

## Acceptance Criteria
- Every core screen is usable at 390px width.
- Office, Project Office, and Agent Desk screens are scaffolded and linked.
- A normalized live-state contract exists for project, run, agent, and event data.
- Chat and action surfaces are designed with governance constraints.
- The app scaffold is implementation-ready for engineer execution.

## First Implementation Wave
1. Build Next.js app shell and navigation.
2. Define TypeScript domain models for projects, agents, runs, events, and actions.
3. Create mocked/local adapter for runtime data ingestion.
4. Scaffold Office overview, Project Office, Agent Desk, and Activity screens.
5. Add design tokens and motion rules for iPhone-first spatial UI.
6. Document upgrade path to live transport and secured action execution.