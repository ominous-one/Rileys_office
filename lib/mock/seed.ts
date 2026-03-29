import type { ActivityEvent, AgentDesk, AgentSummary, AlertItem, Conversation, OfficeSnapshot, ProjectOffice, ProjectSummary, RunState, RoomCard } from '@/lib/domain/types';
import { getDefaultActions } from '@/lib/actions/governed-actions';

const now = '2026-03-28T20:30:00-07:00';

const runs: Record<string, RunState> = {
  riley: {
    id: 'run-riley-office-wave-1',
    status: 'active',
    summary: 'Premium UI wave shipping the HQ lobby, project suite, and agent desk refinement.',
    progressLabel: 'Premium interface live in staging',
    updatedAt: now,
  },
  lotview: {
    id: 'run-lotview-ops-audit',
    status: 'waiting',
    summary: 'Awaiting reviewer response on the dealership delivery package.',
    progressLabel: 'Reviewer queue holding',
    updatedAt: now,
  },
};

const agents: AgentSummary[] = [
  {
    id: 'engineer-riley',
    name: 'Engineer',
    role: 'engineer',
    status: 'active',
    currentTask: 'Finishing premium spatial polish across the mobile office shell.',
    projectId: 'rileys-office',
  },
  {
    id: 'reviewer-riley',
    name: 'Reviewer',
    role: 'reviewer',
    status: 'waiting',
    currentTask: 'Standing by for QA evidence and final scorecard.',
    projectId: 'rileys-office',
  },
  {
    id: 'qa-lotview',
    name: 'QA Tester',
    role: 'qa-tester',
    status: 'blocked',
    currentTask: 'Needs refreshed runtime evidence before reopening validation.',
    blocker: 'Stale QA packet',
    projectId: 'lotview',
  },
];

const projects: ProjectSummary[] = [
  {
    id: 'rileys-office',
    name: "Riley's_Office",
    tagline: 'Luxury mobile command center for governed execution',
    health: 'active',
    urgency: 'high',
    mission: 'Coordinate lobby intelligence, project suites, and agent desks in one tactile iPhone experience.',
    accent: '#9d7bff',
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
    accent: '#3ddc97',
    activeRun: runs.lotview,
    agents: agents.filter((agent) => agent.projectId === 'lotview'),
  },
];

const alerts: AlertItem[] = [
  {
    id: 'alert-riley-live',
    level: 'info',
    title: 'Lobby is still running against governed mock telemetry',
    detail: 'Spatial UI is production-ready while live ingestion remains safely read-only.',
    projectId: 'rileys-office',
  },
  {
    id: 'alert-riley-handoff',
    level: 'warning',
    title: 'QA handoff required after premium wave',
    detail: 'Typecheck and build evidence must stay fresh before reviewer signoff.',
    projectId: 'rileys-office',
    agentId: 'reviewer-riley',
  },
  {
    id: 'alert-lotview-qa',
    level: 'warning',
    title: 'LotView QA evidence stale',
    detail: 'LotView validation package needs refreshed artifacts before signoff.',
    projectId: 'lotview',
    agentId: 'qa-lotview',
  },
];

const activity: ActivityEvent[] = [
  {
    id: 'evt-1',
    type: 'run',
    label: 'HQ lobby premium wave shipped',
    detail: 'The homepage now reads as a luxury command-center rather than a base dashboard.',
    timestamp: now,
    projectId: 'rileys-office',
    relatedPath: "projects/Riley's_Office/app/page.tsx",
  },
  {
    id: 'evt-2',
    type: 'agent',
    label: 'Engineer desk spotlighted',
    detail: 'Agent workstation now highlights run context, evidence shelf, and governed controls.',
    timestamp: now,
    projectId: 'rileys-office',
    agentId: 'engineer-riley',
  },
  {
    id: 'evt-3',
    type: 'qa',
    label: 'Project suite prepared for QA',
    detail: 'Project room map, delivery wall, and desk cluster are aligned for validation.',
    timestamp: now,
    projectId: 'rileys-office',
  },
  {
    id: 'evt-4',
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
    title: 'Riley premium build thread',
    contextLabel: "Riley's_Office · engineer",
    latestMessage: 'Lobby, project suite, and desk view now share the same luxury spatial language.',
    updatedAt: now,
  },
  {
    id: 'conv-riley-review',
    title: 'Riley review lane',
    contextLabel: "Riley's_Office · reviewer",
    latestMessage: 'Awaiting fresh build evidence before entering the final scorecard pass.',
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
    { id: 'reception', name: 'Reception Lobby', purpose: 'Executive arrival zone with global pulse and wayfinding.', state: 'active' },
    { id: 'mission-control', name: 'Mission Control', purpose: 'Project telemetry, run pressure, and live office status.', state: 'active' },
    { id: 'delivery-wall', name: 'Delivery Wall', purpose: 'Artifacts, QA checkpoints, and review readiness.', state: 'active' },
    { id: 'agent-floor', name: 'Agent Floor', purpose: 'Operator desks for focused execution and escalations.', state: 'active' },
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
      { id: 'artifact-1', label: 'Premium lobby shell', path: "projects/Riley's_Office/app/page.tsx", status: 'ready' },
      { id: 'artifact-2', label: 'Project suite UI', path: "projects/Riley's_Office/components/project/project-office-view.tsx", status: 'ready' },
      { id: 'artifact-3', label: 'Global visual system', path: "projects/Riley's_Office/styles/globals.css", status: 'ready' },
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
      { id: 'evidence-1', label: 'Run contract', path: `agents/${agent.id}/contract.md`, status: 'ready' },
      { id: 'evidence-2', label: 'Premium desk view', path: "projects/Riley's_Office/components/desk/agent-desk-view.tsx", status: 'ready' },
      { id: 'evidence-3', label: 'Validation logs', path: "projects/Riley's_Office/evidence", status: 'in_progress' },
    ],
    actions: getDefaultActions(),
    conversation: conversations.find((item) => item.id === (agent.projectId === 'rileys-office' ? 'conv-riley' : 'conv-lotview')) ?? conversations[0],
  };
}
