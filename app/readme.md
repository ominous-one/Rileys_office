# Riley's_Office App Scaffold

## Recommended Stack
- Next.js App Router
- TypeScript
- Tailwind CSS
- Zustand or equivalent lightweight client store
- TanStack Query
- Zod
- Framer Motion

## Suggested Directory Layout
```text
app/
  (shell)/
    layout.tsx
    page.tsx                 # Office overview
    projects/[projectId]/page.tsx
    agents/[agentId]/page.tsx
    activity/page.tsx
    inbox/page.tsx
  api/
    office/route.ts
    projects/[projectId]/route.ts
    agents/[agentId]/route.ts
    activity/route.ts
components/
  ui/
  office/
  project/
  desk/
  activity/
  chat/
lib/
  domain/
  adapters/
  actions/
  mock/
  utils/
public/
  icons/
  textures/
docs/
```

## Core Build Order
1. Set up shell layout with safe-area support and bottom navigation.
2. Define domain models in `lib/domain`.
3. Seed realistic mock data in `lib/mock`.
4. Implement read-only API routes returning normalized mock data.
5. Build Office overview and project office components.
6. Build agent desk and activity surfaces.
7. Layer in live adapter integration.

## Initial Route Contract
- `/` → Office overview
- `/projects/[projectId]` → Project office
- `/agents/[agentId]` → Agent desk
- `/activity` → Global activity feed
- `/inbox` → Direct/project chat inbox

## Data Contract Priority
Implement against normalized objects first:
- `OfficeSnapshot`
- `ProjectOffice`
- `AgentDesk`
- `RunState`
- `ActivityEvent`
- `GovernedAction`

## Definition of a Good First Demo
A local mock-powered build where the operator can:
- open the office overview
- enter a project office
- inspect an agent desk
- read a live-style activity stream
- open a chat composer/action sheet with governance context