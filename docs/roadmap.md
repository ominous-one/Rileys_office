# Riley's_Office — Roadmap

## Phase 0 — Architecture Lock
- Finalize product brief, MVP scope, UX, world design, system architecture
- Create implementation scaffold and domain contracts
- Produce QA and review artifacts

## Phase 1 — App Foundation
- Bootstrap Next.js TypeScript app
- Install design system, tokens, and motion foundations
- Add route shell and bottom navigation
- Implement mock data layer and seed content

## Phase 2 — Core Screens
- Office overview screen
- Projects list / project office screen
- Agent desk detail
- Activity feed
- Inbox/chat shell

## Phase 3 — Live Integration
- Normalize runtime status and swarm data
- Add live transport bridge
- Implement stale/degraded-state UX
- Connect project artifacts and evidence links

## Phase 4 — Governed Actions
- Introduce action gateway contracts
- Add confirmation and approval UX
- Implement safe pilot actions in read-mostly mode

## Phase 5 — Polish + Hardening
- mobile performance pass
- accessibility pass
- offline/degraded state fallback
- observability and error handling
- visual refinement of spatial office UI

## Exit Criteria for MVP
- Operator can identify project/run/agent health from phone rapidly.
- Operator can open contextual chat from any critical screen.
- Live state updates reach core views reliably.
- Governance prevents unsafe actions.
- Package is stable enough for daily internal use.

## Immediate Engineering Queue
1. Scaffold app shell and routes
2. Create domain types and mocks
3. Implement Office overview UI
4. Implement Project Office UI
5. Implement Agent Desk UI
6. Add adapter stubs and API route contracts
7. Document run/deploy instructions