# Riley's_Office — Deployment Plan

## Recommended Hosting Decision
**Primary recommendation: deploy the Next.js app on Vercel and keep the OpenClaw bridge on the existing OpenClaw machine or a private VPS/Tailscale-reachable host.**

Why this is the best first live path:
- zero stack rewrite from the current project
- fast preview/production deployments for the UI
- good performance for iPhone web usage
- simple environment/secret management for the app
- separates public web delivery from private runtime access

## Deployment Topology
```text
Public Internet
    |
    v
Vercel-hosted Riley's_Office web app
    |
    | server-to-server authenticated requests
    v
Private OpenClaw bridge host
    |
    v
OpenClaw runtime + project artifacts on the operator machine/VPS
```

## Why not host everything together publicly first
Avoid exposing the raw OpenClaw runtime directly behind the same public app deployment because it increases risk around:
- secrets exposure
- filesystem access leakage
- unreviewed write actions
- tight coupling between UI deploys and runtime host state

## Deployment Phases

### Phase 0 — local hardening
Status: can be done locally now.

Work:
- add production env validation
- add live/mock feature flagging
- add API route contracts
- add auth middleware skeleton
- confirm mobile viewport behavior on iPhone-sized dimensions

Deliverable outcome:
- app is deployment-configurable without changing core UI contracts

### Phase 1 — hosted read-only beta
Status: best first live release.

Work:
- deploy Next.js app to Vercel
- configure production URL
- connect to bridge in read-only mode
- enable authenticated operator access
- enable office/project/agent/activity live reads
- keep all mutating actions disabled or server-queued only

Success criteria:
- operator can open Riley's_Office from iPhone and see fresh live state
- stale/degraded states are clearly shown
- no browser-executed privileged action path exists

### Phase 2 — governed action beta
Status: after Phase 1 is stable.

Work:
- add audited action submission endpoints
- enable a minimal safe action set
- add approval confirmation UX
- log each action request with actor, context, and result

Success criteria:
- safe mobile interventions can be submitted with full traceability
- privileged actions remain blocked unless approved server-side

### Phase 3 — daily-driver internal deployment
Status: after live reliability is proven.

Work:
- add observability and health checks
- add uptime monitoring for bridge and app
- add replay buffer for recent events
- add incident fallback messaging for bridge downtime

Success criteria:
- app is stable enough for regular operational use from phone

## Concrete Hosting Options

### Option A — Recommended
- **UI:** Vercel
- **Bridge:** existing OpenClaw machine behind Tailscale/secure reverse proxy
- **Best for:** fastest launch with lowest engineering drag

Pros:
- fastest time to first hosted version
- preserves current Next.js architecture
- strong preview deployment workflow

Cons:
- requires secure private networking plan to reach the bridge

### Option B
- **UI + bridge:** single VPS with Docker/Node process manager
- **Best for:** tighter control, fewer vendors

Pros:
- one host to manage
- easier private internal networking model if all server-side

Cons:
- slower to stand up
- more ops burden
- weaker preview workflow than Vercel

### Option C
- **UI:** Cloudflare Pages/Workers-adjacent setup
- **Bridge:** private host
- **Best for:** future edge-heavy architecture, not shortest path now

Pros:
- strong edge tooling

Cons:
- more adaptation from current Next.js full-stack assumptions
- unnecessary complexity for first deployment

## Best Path Recommendation
Choose **Option A** unless there is a firm requirement to avoid Vercel.

## Domain and URL Plan
### Suggested URLs
- Production app: `https://rileys-office.<approved-domain>`
- Preview app: Vercel preview URLs
- Bridge: private URL only, not indexed/publicly discoverable

### Required approval items
- domain/subdomain choice
- TLS/DNS ownership
- bridge network exposure method
- who can access the production URL

## Environment Variables
### App (Vercel)
```env
NEXT_PUBLIC_APP_URL=https://rileys-office.<approved-domain>
OPENCLAW_BRIDGE_BASE_URL=https://<private-bridge-url>
OPENCLAW_AUTH_MODE=clerk|nextauth|basic-internal
OPENCLAW_SESSION_SECRET=<secret>
OPENCLAW_ALLOWED_ORIGIN=https://rileys-office.<approved-domain>
```

### Bridge host
```env
OPENCLAW_RUNTIME_ROOT=<path-to-runtime>
OPENCLAW_PROJECTS_ROOT=<path-to-projects>
OPENCLAW_API_TOKEN=<secret>
OPENCLAW_EVENT_SIGNING_SECRET=<secret>
OPENCLAW_ALLOWED_APP_ORIGIN=https://rileys-office.<approved-domain>
PORT=<bridge-port>
```

## Build and Release Workflow
### Recommended
1. Push repo changes.
2. Vercel preview deploy runs automatically.
3. Validate preview on desktop + iPhone viewport.
4. Promote to production.
5. Verify bridge connectivity and freshness from production URL.

### Runtime checks after each production deploy
- homepage loads on mobile
- office snapshot returns live data
- project page drill-down works
- agent desk loads
- stale/degraded banners behave when bridge is unavailable
- auth gate blocks unauthenticated access

## Security Requirements Before Public URL Use
Must be true before broad hosted usage:
- authenticated access is enabled
- bridge only accepts requests from approved origin/token pairing
- no raw runtime path browsing exists
- no unrestricted action execution route exists
- server logs do not emit secrets

## Engineering Work Split
### Build locally now
- Vercel-ready env contract
- server route live adapter
- auth middleware hooks
- health endpoint and error states
- mobile deploy checklist

### Needs hosting approval
- actual Vercel project creation
- domain assignment
- production secrets provisioning
- bridge networking decision
- operator access list

## Launch Checklist
- [ ] Production env variables configured
- [ ] Bridge reachable from hosted app
- [ ] Auth enabled and tested
- [ ] Read-only live data verified
- [ ] iPhone Safari smoke test passed
- [ ] Stale/degraded fallback tested
- [ ] No privileged mutation path exposed without approval

## Smallest viable live launch
A password/SSO-protected Vercel deployment serving live read-only office state from a private bridge, validated on iPhone Safari.
