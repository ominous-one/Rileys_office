# Riley's_Office

Riley's_Office is an iPhone-first OpenClaw command center built as a mobile-first Next.js app. This wave adds Vercel-oriented live-readiness scaffolding: a password gate, server session helpers, a read-only live snapshot API, and explicit mock/live environment contracts.

## Current status
- Next.js pinned at `15.5.14`
- Mock-first UI still boots locally with no external bridge required
- Password-protected access scaffold now exists for hosted/internal beta use
- Read-only live snapshot bridge route now degrades safely back to mock data
- Environment contract is explicit for local dev and Vercel deployment

## What is included
- App Router scaffold with mobile-safe layout and bottom navigation
- Office overview at `/`
- Project office detail at `/projects/[projectId]`
- Agent desk detail at `/agents/[agentId]`
- Activity and inbox shell routes
- Typed domain models for projects, runs, agents, alerts, events, and governed actions
- Mock runtime adapter boundaries with clear upgrade points for live OpenClaw integration
- Password/session scaffolding in `middleware.ts` and `lib/auth/session.ts`
- Read-only live bridge endpoint at `/api/live/snapshot`
- Design tokens and spatial UI foundations for the office metaphor

## Local startup
### Prerequisites
- Node.js 20+ recommended
- npm 10+ recommended

### 1. Install dependencies
```bash
npm install
```

### 2. Create local environment file
Copy the example file and set your local auth password:

```bash
cp .env.example .env.local
```

On Windows PowerShell:

```powershell
Copy-Item .env.example .env.local
```

Minimum local settings:
- `OPENCLAW_BASIC_PASSWORD` — change from the default placeholder before exposing the app beyond localhost
- `OPENCLAW_AUTH_MODE=basic-internal` for password-protected testing, or `disabled` for local-only bypass
- `OPENCLAW_APP_MODE=mock` to stay fully local

### 3. Start the development server
```bash
npm run dev
```

### 4. Sign in locally
Visit `http://localhost:3000`. If `OPENCLAW_AUTH_MODE=basic-internal`, the middleware redirects to `/api/auth/login` and sets a secure HTTP-only session cookie after successful login.

### 5. Optional live bridge test
To exercise the live-read path, set:

```env
OPENCLAW_APP_MODE=live
OPENCLAW_BRIDGE_BASE_URL=https://<private-bridge-url>
OPENCLAW_BRIDGE_TOKEN=<server-only-token>
```

If the bridge is unavailable or returns an error, `/api/live/snapshot` and the server adapter fall back to degraded mock data instead of failing the app.

## Validation commands
Run these before handoff or QA reruns:

```bash
npm run typecheck
npm run build
```

## Vercel deployment contract
Set these in the Vercel project environment before a hosted beta:

```env
NEXT_PUBLIC_APP_URL=https://rileys-office.<approved-domain>
OPENCLAW_ALLOWED_ORIGIN=https://rileys-office.<approved-domain>
OPENCLAW_APP_MODE=live
OPENCLAW_AUTH_MODE=basic-internal
OPENCLAW_SESSION_SECRET=<strong-random-secret>
OPENCLAW_ALLOWED_USERS=<approved-usernames>
OPENCLAW_BASIC_PASSWORD=<shared-password-or-temporary-internal-secret>
OPENCLAW_BRIDGE_BASE_URL=https://<private-bridge-url>
OPENCLAW_BRIDGE_TOKEN=<server-only-token>
OPENCLAW_LIVE_SNAPSHOT_PATH=/api/office
```

Production notes:
- Only `NEXT_PUBLIC_*` values may be exposed to the client bundle.
- Keep `OPENCLAW_BRIDGE_TOKEN` and `OPENCLAW_SESSION_SECRET` server-side only.
- The bridge should stay private and accept only server-to-server requests from the app.
- This wave ships **read-only live access only**; no privileged mutation path is exposed.

## Auth and live route behavior
- `middleware.ts` protects app routes and `/api/live/*` when auth is enabled.
- `GET /api/auth/login` returns a minimal internal login screen.
- `POST /api/auth/login` accepts form or JSON credentials and sets the session cookie.
- `POST /api/auth/logout` clears the session cookie.
- `GET /api/live/snapshot` returns `{ snapshot, meta }` and requires auth unless auth is disabled.

## Repo structure
- `app/` — routes and shared layout
- `components/` — shell, office, project, desk, and activity UI
- `lib/domain/` — domain types
- `lib/mock/` — seed data
- `lib/adapters/` — mock/live adapter boundary
- `lib/auth/` — session and access helpers
- `lib/config/` — validated environment contract
- `lib/actions/` — governed action guard helpers
- `styles/` — global design system CSS
- `evidence/` — validation logs for QA and review

## Notes
- `PROJECT.md` and `BRAND.md` were not present in the project root during this run.
- The current scaffold remains read-only and mock-safe by default.
- See `IMPLEMENTATION-SUMMARY.md` for the live-readiness change log and QA handoff context.
