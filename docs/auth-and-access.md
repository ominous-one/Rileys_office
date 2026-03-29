# Riley's_Office — Auth and Access

## Goal
Define the minimum safe auth/access model for a hosted Riley's_Office deployment that is usable on iPhone and does not expose the underlying OpenClaw runtime directly to the browser.

## Recommended Auth Approach
### Phase 1 recommendation
Use **single-operator authenticated access** for the hosted web app, with server-side sessions and a separate machine-to-machine credential between the app and the OpenClaw bridge.

This is the shortest safe path because Riley's_Office is currently an internal operator tool, not a multi-user SaaS.

## Recommended Stack Order
### Preferred
1. App auth via **NextAuth/Auth.js** or equivalent server-session auth already compatible with Next.js.
2. Identity provider via one of:
   - Google sign-in restricted to approved account(s)
   - GitHub sign-in restricted to approved account(s)
   - email magic link for a single approved operator
3. Bridge auth via **bearer token or signed shared secret** stored only on the server.

### Acceptable temporary internal beta fallback
- simple password gate plus server session, only if exposure is tightly limited and SSO is not ready yet

### Not recommended for first live version
- unauthenticated public URL
- client-side-only password prompt with no server session
- direct browser access to bridge credentials
- multi-role RBAC system before single-user access works reliably

## Access Model

### User-facing app access
The user authenticates to Riley's_Office. After login, the app creates a server-side session and grants access to protected routes:
- `/`
- `/projects/*`
- `/agents/*`
- `/activity`
- `/inbox`

### Server-to-bridge access
The Next.js server layer calls the OpenClaw bridge using:
- bearer token in server-side requests, or
- HMAC/signed headers if implemented later

The browser never talks directly to the bridge with bridge secrets.

## Authorization Levels
Keep authorization simple at first.

### Level 1 — Viewer/operator
Can:
- view office, project, agent, and activity state
- open inbox/chat surfaces
- submit low-risk internal requests

Cannot:
- execute privileged runtime mutations directly
- access raw secrets or raw machine internals

### Level 2 — Approver
Later only.
Can:
- approve explicitly gated actions
- confirm privileged workflows after review

For first live release, it is acceptable for Viewer/operator and Approver to be the same human, but the UI should still preserve the distinction in policy metadata.

## Route Protection
### App routes
Protect all operational routes behind auth middleware.

### API routes
Protect all `/api/live/*` and `/api/actions/*` routes with:
- valid session requirement
- server-side authorization check
- rate limiting
- structured audit logging for action routes

## Session Requirements
- HTTP-only secure cookies
- SameSite=Lax or Strict depending on auth flow
- short idle timeout for phone sessions
- explicit sign-out control
- re-auth requirement for privileged approvals later

## Bridge Trust Boundary
The bridge should trust only:
- requests from the Riley's_Office server environment
- the approved app origin
- valid server credential presented on each request

The bridge should not trust:
- direct browser requests
- unsigned action requests
- client-supplied role claims

## Secret Handling Rules
### Allowed in browser
- session-derived user display info
- client-safe feature flags
- public app URL

### Server-only
- app session secret
- identity provider secrets
- bridge bearer token
- event signing secret
- any OpenClaw host credentials

## Audit Requirements
For any non-read action, log at minimum:
- actor identity
- timestamp
- target project/agent/run context
- requested action ID
- approval requirement flag
- result status

## iPhone-specific Access Considerations
- session flow must work in Safari and home-screen-installed PWA mode
- avoid auth flows that break on popup-only mobile behavior
- prefer redirect-based OAuth or magic-link flows over fragile desktop-style popups
- ensure session expiry failure returns the user to a clean sign-in flow

## Recommended First Live Policy
### Can ship with hosting approval
- authenticated read-only live dashboard
- single approved operator account
- server-side session auth
- server-to-bridge token auth
- all high-impact actions locked

### Must remain blocked until later
- direct deployment triggers
- arbitrary task execution from the browser
- shell/browser/tool execution requests without approval workflow
- sharing access with multiple users without explicit authorization design

## Environment Contract
### App
```env
OPENCLAW_AUTH_MODE=
OPENCLAW_SESSION_SECRET=
AUTH_GOOGLE_ID=
AUTH_GOOGLE_SECRET=
AUTH_GITHUB_ID=
AUTH_GITHUB_SECRET=
OPENCLAW_ALLOWED_USERS=
OPENCLAW_BRIDGE_BASE_URL=
OPENCLAW_BRIDGE_TOKEN=
```

### Bridge
```env
OPENCLAW_API_TOKEN=
OPENCLAW_ALLOWED_APP_ORIGIN=
OPENCLAW_EVENT_SIGNING_SECRET=
```

## Local Build Work Available Now
- add auth provider abstraction
- add protected route middleware
- add server-side session check helpers
- add action-route guard utilities
- add audit log interface for future write actions

## External Approval Dependencies
- choose auth provider
- provision provider credentials
- approve operator account list
- approve bridge trust model/network exposure
- approve when any write-capable action may be enabled

## Minimum safe hosted access posture
A login-protected, single-operator web app with server-side sessions and a separate server-only bridge credential, with all privileged actions disabled by default.
