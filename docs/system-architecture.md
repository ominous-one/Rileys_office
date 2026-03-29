# Riley's_Office — System Architecture

## Architecture Goal
Deliver a mobile-first control surface that sits above existing OpenClaw runtime artifacts and exposes them through a realtime, governance-aware UI.

## Top-Level Architecture
1. **Presentation Layer**
   - Next.js App Router UI
   - Mobile-first screens and spatial office components
   - Client state store for live presence and navigation
2. **Application Layer**
   - Query services for office overview, project office, agent desk, inbox, activity
   - Action gateway for safe operator commands
   - Chat orchestration service for direct messages and contextual prompts
3. **Domain Layer**
   - Project
   - Office
   - Room
   - Agent
   - Desk
   - Run
   - Artifact
   - Alert
   - Conversation
   - GovernedAction
4. **Integration Layer**
   - Runtime file adapter for `runtime/status`, `runtime/swarm`, and project metadata
   - Optional local API wrappers for richer events
   - WebSocket/SSE bridge for live updates
5. **Persistence / Cache Layer**
   - Server cache for normalized snapshots
   - Event buffer for recent activity replay
   - Optional SQLite/Postgres later if historical analytics become necessary

## Recommended Stack
- Next.js 15 + React 19 + TypeScript
- Tailwind CSS + CSS variables for design tokens
- Zustand or TanStack Store for local live state
- TanStack Query for fetch/cache orchestration
- Zod for runtime validation of state artifacts
- Framer Motion for lightweight transitions
- Node server routes for adapter endpoints

## Data Sources
### Initial Sources
- `runtime/status/*.json`
- `runtime/swarm/*.json`
- project-level run markers such as `ACTIVE_SWARM_RUN.md`, `WORKING_BUFFER.md`
- generated deliverable docs within project directories

### Future Sources
- process event ingestion bridge
- direct OpenClaw session/agent APIs when exposed
- browser automation telemetry

## Realtime Model
Preferred order:
1. WebSocket bridge from local adapter
2. SSE stream
3. Short-interval polling fallback

## Key Technical Decisions
- Use a normalized server adapter instead of binding UI directly to raw JSON files.
- Keep reads optimistic and actions conservative.
- Treat stale data as a first-class state with explicit UI warnings.
- Separate spatial view model from runtime domain model so the office metaphor can evolve without rewriting ingestion.

## Proposed Repo Layout
- `app/` — routes, layouts, pages
- `components/` — UI primitives and office widgets
- `lib/domain/` — domain types and rules
- `lib/adapters/` — runtime ingestion and normalization
- `lib/actions/` — guarded action definitions
- `lib/mock/` — seed data for local build-out
- `public/` — icons, office textures, illustrations
- `docs/` — product, UX, world, roadmap, architecture

## Critical Interfaces
### Adapter Interface
- `getOfficeSnapshot()`
- `getProjectOffice(projectId)`
- `getAgentDesk(agentId)`
- `getActivityFeed()`
- `subscribeToEvents()`

### Action Gateway Interface
- `listAvailableActions(context)`
- `executeAction(actionId, payload)`
- `validateAction(actionId, context)`

## Security / Safety
- Read-only mode default until an action pathway is explicitly enabled.
- All mutating actions must carry governance metadata.
- No secret material should render in UI cards.
- Sensitive logs must be summarized rather than dumped by default.

## Implementation Hand-off
Engineer should start with:
1. route shell
2. domain types + mock data
3. adapter contracts
4. overview and office screens
5. action guard UI patterns
6. progressive live data hookup