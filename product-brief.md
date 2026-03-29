# Riley's_Office — Product Brief

## Product Definition
Riley's_Office is an iPhone-first live command center for operating OpenClaw as a spatial office. It turns projects, agents, queues, chats, and runtime health into a single mobile-native control surface where the operator can move through project offices, inspect agent desks, intervene in live work, and launch governed actions without leaving the phone.

## Problem
OpenClaw currently exposes powerful multi-agent operations across files, terminals, browser automation, and runtime state, but the operator experience is fragmented. Critical context lives across dashboards, logs, project folders, and chat threads. On mobile, this fragmentation makes it slow to understand:
- which projects need attention now
- which agents are active, blocked, or waiting
- whether a run is healthy, stale, or failing
- where to send instructions or approvals
- how to coordinate multiple workstreams from one screen

## Vision
Make Riley's_Office feel like walking into a living headquarters: every project has an office, every agent has a desk, every desk shows current work, and every room is actionable in real time.

## Target User
Primary: Ominous operating multiple businesses through OpenClaw.
Secondary: future owner-operators managing multiple projects and agent swarms from mobile.

## Core Jobs To Be Done
1. See the whole system in under 10 seconds.
2. Identify which project, run, or agent needs intervention now.
3. Open a live chat with any project or agent context instantly.
4. Launch safe actions from mobile without breaking governance.
5. Move between projects using a memorable spatial office metaphor instead of raw logs.

## Product Pillars
1. **Live by default** — state updates stream continuously.
2. **Mobile-first control** — optimized for one-handed iPhone usage.
3. **Spatial comprehension** — project offices and agent desks make system state legible.
4. **Governed actionability** — actions respect approval and quality gates.
5. **Fast intervention** — every important card leads to chat, evidence, or action within one tap.

## MVP Experience
- Home screen shows office overview: projects, active runs, blockers, alerts, and agent presence.
- Project office view shows project health, current run, rooms, desks, artifacts, and conversations.
- Agent desk view shows status, current contract, artifacts touched, blockers, and direct chat.
- Live activity stream shows events across runs, QA, reviewer gates, and browser/runtime signals.
- Chat layer supports direct instruction, contextual replies, and action suggestions.
- Spatial office map provides a lightweight 2.5D navigation layer on top of the data model.

## Differentiators
- Spatial UI grounded in actual governed execution primitives.
- Unified operator workflow across orchestration, QA, reviewer, and project delivery.
- Designed around OpenClaw’s real artifact-first execution model rather than generic AI chat.

## Success Metrics
### North Star
Operator can diagnose and route the highest-priority issue from iPhone in under 30 seconds.

### MVP Metrics
- Time to identify highest-priority alert: < 10 seconds
- Time from alert to contextual chat: < 2 taps
- Live state freshness for active runs: < 3 seconds target
- Percentage of operator interventions completed from mobile: > 70%
- Zero unsafe actions that bypass governance rules

## Constraints
- iPhone-first before desktop expansion
- Internal-only first release
- Must integrate with existing OpenClaw runtime/state files and governed workflows
- Must degrade gracefully when live data is delayed or partially unavailable

## Non-Goals for MVP
- Full 3D game engine office
- Multi-user collaboration with permissions matrix
- Native iOS binary in MVP
- External publishing, billing, or marketplace features
- Arbitrary agent creation from mobile without governance wrappers

## Release Thesis
Riley's_Office should ship as the operator control layer for OpenClaw: visually distinctive, operationally serious, and immediately useful for live project command from an iPhone.