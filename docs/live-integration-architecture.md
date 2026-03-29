# Riley's_Office — Live Integration Architecture

## Purpose
Define the shortest path from the current mock-backed Next.js app to a hosted, live OpenClaw control surface that is usable from iPhone Safari without requiring a native app.

## Current Baseline
Evidence from the current project state:
- UI is already scaffolded as a Next.js 15 App Router app.
- Domain contracts already exist in `lib/domain/types.ts`.
- Mock/live adapter boundary already exists in `lib/adapters/office-adapter.ts`.
- Governed action placeholders already exist in `lib/actions/governed-actions.ts`.
- Local startup/build evidence already exists in `readme.md`, `implementation-summary.md`, and `evidence/`.

## Recommended Production Path
### Best web-hosting-first path
1. Keep the app as a **Next.js web app**.
2. Deploy it to **Vercel** first for the fastest hosted path and strong mobile web performance.
3. Add a **small server-side integration layer** inside the app that reads normalized OpenClaw state from a dedicated bridge service.
4. Keep Riley's_Office itself **read-mostly first**; unlock mutations only after governance/auth are proven.

This is the shortest path because it preserves the current stack, matches the current app structure, and avoids a native iOS build or heavy infrastructure before live value exists.

## Target Architecture
```text
[iPhone Safari / mobile web]
        |
        v
[Riley's_Office Next.js app on Vercel]
  - App Router UI
  - server routes / API handlers
  - auth/session checks
  - normalized view models
        |
        v
[OpenClaw Bridge Service]
  - reads OpenClaw runtime/project artifacts
  - exposes normalized snapshot + event endpoints
  - signs/filters governed action requests
  - never exposes raw secrets to browser
        |
        v
[OpenClaw host]
  - runtime/status
  - runtime/swarm
  - project artifacts/evidence
  - governed execution layer
```

## Integration Boundary
### Riley's_Office responsibilities
Riley's_Office should own:
- mobile UI and route rendering
- authenticated session handling
- normalized read models for office/project/agent screens
- client-safe polling/SSE consumption
- guarded action request submission
- stale/degraded/offline UX states

### OpenClaw bridge responsibilities
The bridge should own:
- reading filesystem/runtime artifacts from the OpenClaw machine
- translating raw runtime files into stable API payloads
- server-to-server authentication
- rate limiting and audit logging for action requests
- approval/gating enforcement before any side-effecting action is accepted

### Browser responsibilities
The browser should only receive:
- already-normalized office snapshot data
- project/agent/read-model payloads
- safe action availability metadata
- non-secret status and evidence references

The browser should **not** receive:
- filesystem paths outside approved evidence links unless intentionally exposed
- raw daemon credentials, host tokens, or API secrets
- unrestricted shell/browser/tool invocation capability
- uncontrolled session logs or raw prompt history dumps

## Live Data Contract
### Read APIs to implement first
1. `GET /api/live/office`
   - returns `OfficeSnapshot`
2. `GET /api/live/projects/:projectId`
   - returns `ProjectOffice`
3. `GET /api/live/agents/:agentId`
   - returns `AgentDesk`
4. `GET /api/live/activity`
   - returns `ActivityEvent[]`
5. `GET /api/live/stream`
   - SSE stream for freshness and event updates

### Source mapping
| Riley's_Office model | Likely OpenClaw source |
|---|---|
| `OfficeSnapshot.connection` | bridge health + last sync timestamp |
| `ProjectSummary` | runtime swarm status + project metadata |
| `RunState` | active run markers, swarm run status, QA/reviewer state |
| `AgentSummary` | active subagent/session state |
| `ActivityEvent` | run events, QA/reviewer updates, alerts, evidence changes |
| `ArtifactRef` | deliverables/evidence paths approved for display |
| `GovernedAction` | policy-filtered action registry by context |

## Mutating Action Boundary
### Phase 1: read-only live mode
Ship live data first with action buttons still locked except safe internal-only actions such as:
- clarify
- prioritize
- request human review
- open contextual chat

### Phase 2: governed write mode
Only after auth and audit are proven, permit actions that submit into a server-side queue such as:
- create governed task request
- reprioritize a run
- request approval
- acknowledge alert

### Phase 3: approval-gated privileged mode
Later, allow carefully-scoped high-impact actions with mandatory confirmation and full audit:
- approve a gated run stage
- restart a monitored workflow
- trigger a deployment handoff

## Freshness Strategy
### Recommended order
1. Initial page load via server fetch from bridge
2. Client revalidation every 15-30 seconds for fallback
3. SSE stream for active update push
4. explicit stale banner if no refresh within threshold

### UI states to preserve
- `connected`
- `degraded`
- `stale`
- `read-only`
- `approval required`

These states already align with the current domain model and should remain first-class on mobile.

## Environment Contract
### Riley's_Office app env
```env
NEXT_PUBLIC_APP_URL=
OPENCLAW_BRIDGE_BASE_URL=
OPENCLAW_AUTH_MODE=
OPENCLAW_SESSION_SECRET=
OPENCLAW_ALLOWED_ORIGIN=
```

### Bridge env
```env
OPENCLAW_RUNTIME_ROOT=
OPENCLAW_PROJECTS_ROOT=
OPENCLAW_API_TOKEN=
OPENCLAW_EVENT_SIGNING_SECRET=
OPENCLAW_ALLOWED_APP_ORIGIN=
```

### Rules
- Only `NEXT_PUBLIC_*` values may reach the client bundle.
- Bridge credentials stay server-side only.
- If Vercel is used, all secrets live in Vercel project env settings and the bridge host env store, not in repo files.

## iPhone Readiness Requirements
To stay mobile-web-first:
- keep server payloads compact and summary-first
- prefer card summaries before drill-down logs
- support safe-area insets and installed-home-screen mode
- ensure links/buttons are thumb-reachable
- do not rely on hover or multi-pane desktop-only layouts
- show last-updated timestamps and degraded-state banners prominently

## What can be built locally now
- replace `readLiveSnapshot()` with a real server-side fetch adapter contract
- add typed API route handlers inside the Next.js app
- add an SSE client and stale-state UI
- add auth/session middleware scaffolding
- add env validation for app-side configuration
- keep all mutating actions locked behind feature flags

## What needs external approval or hosted infrastructure
- public hosting target selection and DNS
- bridge service host/location
- production secrets issuance and storage
- any direct exposure of OpenClaw runtime over network
- SSO/provider setup if external identity is chosen
- real write-enabled action approval policy

## First Engineer Wave
1. Add server-side live adapter implementation behind feature flag.
2. Introduce app env schema and runtime validation.
3. Create `/api/live/*` read endpoints backed by mock/live switching.
4. Add SSE subscription and stale/degraded UI state handling.
5. Keep actions read-only except low-risk internal request actions.
6. Add auth guard middleware and route protection hooks.

## Exit Condition for this architecture wave
Riley's_Office is ready for engineering when the app can switch between mock and live bridge-backed reads without changing UI contracts, and when all write actions remain governed server-side rather than browser-side.