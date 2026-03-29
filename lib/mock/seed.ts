import type { ActivityEvent, AgentDesk, AgentSummary, AlertItem, Conversation, OfficeSnapshot, ProjectOffice, ProjectSummary, RunState, RoomCard } from '@/lib/domain/types';
import { getDefaultActions } from '@/lib/actions/governed-actions';

const now = '2026-03-28T19:00:00-07:00';

const runs: Record<string, RunState> = {
  riley: {
    id: 'run-riley-office-wave-1',
    status: 'active',
    summary: 'Implementing the first executable scaffold and adapter boundaries.',
    progressLabel: 'Scaffold wave in progress',
    updatedAt: now,
  },
  lotview: {
    id: 'run-lotview-ops-audit',
    status: 'waiting',
    summary: 'Awaiting reviewer response on the current dealership delivery package.',
    progressLabel: 'Waiting for review',
    updatedAt: now,
  },
};

const agents: AgentSummary[] = [
  {
    id: 'engineer-riley',
    name: 'Engineer',
    role: 'engineer',
    status: 'active',
    currentTask: 'Building app shell, route structure, and data contracts.',
    projectId: 'rileys-office',
  },
  {
    id: 'reviewer-riley',
    name: 'Reviewer',
    role: 'reviewer',
    status: 'waiting',
    currentTask: 'Queued for final scorecard after QA evidence lands.',
    projectId: 'rileys-office',
  },
  {
    id: 'qa-lotview',
    name: 'QA Tester',
    role: 'qa-tester',
    status: 'blocked',
    currentTask: 'Needs fresh runtime evidence before reopening validation.',
    blocker: 'Stale QA packet',
    projectId: 'lotview',
  },
];

const projects: ProjectSummary[] = [
  {
    id: 'rileys-office',
    name: "Riley's_Office",
    tagline: 'Mobile-first OpenClaw command center',
    health: 'active',
    urgency: 'high',
    mission: 'Ship HQ, project office, and agent desk views for mobile operations.',
    accent: '#8b5cf6',
    activeRun: runs.riley,
    agents: agents.filter((agent) => agent.projectId === 'rileys-office'),
  },
  {
    id: 'lotview',
    name: 'LotView',
    tagline: 'Dealership CRM + VDP operating floor',
    health: 'waiting',
    urgency: 'medium',
    mission: 'Keep commercial delivery packages moving through review.',
    accent: '#22c55e',
    activeRun: runs.lotview,
    agents: agents.filter((agent) => agent.projectId === 'lotview'),
  },
];

const alerts: AlertItem[] = [
  {
    id: 'alert-riley-live',
    level: 'info',
    title: 'Live adapter still in mock mode',
    detail: 'UI is scaffolded against normalized mock data until runtime ingestion is wired.',
    projectId: 'rileys-office',
  },
  {
    id: 'alert-lotview-qa',
    level: 'warning',
    title: 'QA evidence stale',
    detail: 'LotView validation package needs refreshed artifacts before signoff.',
    projectId: 'lotview',
    agentId: 'qa-lotview',
  },
];

const activity: ActivityEvent[] = [
  {
    id: 'evt-1',
    type: 'run',
    label: 'Riley scaffold wave started',
    detail: 'App shell, routes, and adapter seams are being implemented.',
    timestamp: now,
    projectId: 'rileys-office',
    relatedPath: "projects/Riley's_Office/app/page.tsx",
  },
  {
    id: 'evt-2',
    type: 'agent',
    label: 'Engineer active at desk',
    detail: 'Domain contracts and mock seeds are open on the delivery wall.',
    timestamp: now,
    projectId: 'rileys-office',
    agentId: 'engineer-riley',
  },
  {
    id: 'evt-3',
    type: 'alert',
    label: 'LotView QA blocked',
    detail: 'Fresh evidence required before reviewer handoff.',
    timestamp: now,
    projectId: 'lotview',
    agentId: 'qa-lotview',
  },
];

const conversations: Conversation[] = [
  {
    id: 'conv-riley',
    title: 'Riley build thread',
    contextLabel: "Riley's_Office · engineer",
    latestMessage: 'Scaffold route shell first, then wire adapter boundaries.',
    updatedAt: now,
  },
  {
    id: 'conv-lotview',
    title: 'LotView QA thread',
    contextLabel: 'LotView · qa-tester',
    latestMessage: 'Need fresh runtime validation before reopening review.',
    updatedAt: now,
  },
];

const roomsByProject: Record<string, RoomCard[]> = {
  'rileys-office': [
    { id: 'mission-control', name: 'Mission Control', purpose: 'Global system pulse and alerts', state: 'active' },
    { id: 'delivery-wall', name: 'Delivery Wall', purpose: 'Artifacts, QA, and review checkpoints', state: 'active' },
    { id: 'agent-floor', name: 'Agent Floor', purpose: 'Desk cluster for active agents', state: 'active' },
    { id: 'archive-cabinet', name: 'Archive Cabinet', purpose: 'Past evidence and historical runs', state: 'waiting' },
  ],
};

export const mockOfficeSnapshot: OfficeSnapshot = {
  connection: {
    mode: 'mock',
    state: 'connected',
    lastUpdated: now,
  },
  projects,
  alerts,
  activity,
  conversations,
};

export function getMockProjectOffice(projectId: string): ProjectOffice | null {
  const project = projects.find((item) => item.id === projectId);
  if (!project) return null;

  return {
    project,
    rooms: roomsByProject[projectId] ?? [
      { id: 'ops-room', name: 'Ops Room', purpose: 'Runtime signals and transport health', state: project.health },
    ],
    artifacts: [
      { id: 'artifact-1', label: 'product-brief.md', path: "projects/Riley's_Office/product-brief.md", status: 'ready' },
      { id: 'artifact-2', label: 'system-architecture.md', path: "projects/Riley's_Office/docs/system-architecture.md", status: 'ready' },
      { id: 'artifact-3', label: 'app scaffold', path: "projects/Riley's_Office/app", status: 'in_progress' },
    ],
    actions: getDefaultActions(),
    conversation: conversations[0],
  };
}

export function getMockAgentDesk(agentId: string): AgentDesk | null {
  const agent = agents.find((item) => item.id === agentId);
  if (!agent) return null;

  return {
    agent,
    run: agent.projectId === 'rileys-office' ? runs.riley : runs.lotview,
    evidence: [
      { id: 'evidence-1', label: 'Current contract', path: `agents/${agent.id}/contract.md`, status: 'ready' },
      { id: 'evidence-2', label: 'Touched artifacts', path: `agents/${agent.id}/artifacts.json`, status: 'in_progress' },
    ],
    actions: getDefaultActions(),
    conversation: conversations.find((item) => item.id === (agent.projectId === 'rileys-office' ? 'conv-riley' : 'conv-lotview')) ?? conversations[0],
  };
}
