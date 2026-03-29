import type { ActivityEvent, AgentDesk, AgentSummary, AlertItem, Conversation, OfficeSnapshot, ProjectOffice, ProjectSummary, RunState, RoomCard } from '@/lib/domain/types';
import { getDefaultActions } from '@/lib/actions/governed-actions';

const now = '2026-03-28T20:30:00-07:00';

const runs: Record<string, RunState> = {
  riley: {
    id: 'run-riley-office-wave-1',
    status: 'active',
    summary: 'Game-scene UI wave ships a world-map HQ, cinematic project room, and tactile workstation scene.',
    progressLabel: 'Scene pass lighting the office world',
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
    currentTask: 'Tuning room lighting, scene depth, and iPhone-safe composition across the office world.',
    projectId: 'rileys-office',
  },
  {
    id: 'reviewer-riley',
    name: 'Reviewer',
    role: 'reviewer',
    status: 'waiting',
    currentTask: 'Standing by for fresh typecheck/build evidence and final scorecard.',
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
    tagline: 'Scene-first mobile HQ with district towers, lit rooms, and focused workstations',
    health: 'active',
    urgency: 'high',
    mission: 'Navigate work as a playable command world where projects occupy physical space and agents feel stationed inside it.',
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
    title: 'HQ scene remains connected to governed mock telemetry',
    detail: 'The world, rooms, and workstations now read visually as spaces while live ingestion stays safely read-only.',
    projectId: 'rileys-office',
  },
  {
    id: 'alert-riley-handoff',
    level: 'warning',
    title: 'QA handoff still required after the scene pass',
    detail: 'Fresh typecheck and build evidence must stay green before reviewer signoff.',
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
    label: 'HQ skyline converted into a world map',
    detail: 'The homepage now frames projects like playable towers in a neon command district.',
    timestamp: now,
    projectId: 'rileys-office',
    relatedPath: "projects/Riley's_Office/components/office/office-overview.tsx",
  },
  {
    id: 'evt-2',
    type: 'agent',
    label: 'Project suite staged as a cinematic room',
    detail: 'The project page now reads like a furnished office scene with blueprint zones and a delivery wall.',
    timestamp: now,
    projectId: 'rileys-office',
    relatedPath: "projects/Riley's_Office/components/project/project-office-view.tsx",
  },
  {
    id: 'evt-3',
    type: 'qa',
    label: 'Agent desk upgraded into a workstation scene',
    detail: 'Primary monitor, side monitor, evidence shelf, and macro row now anchor the station view.',
    timestamp: now,
    projectId: 'rileys-office',
    relatedPath: "projects/Riley's_Office/components/desk/agent-desk-view.tsx",
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
    title: 'Riley world-build thread',
    contextLabel: "Riley's_Office · engineer",
    latestMessage: 'HQ, room, and workstation scenes now share the same lighting language and spatial depth cues.',
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
    { id: 'atrium', name: 'Reception Atrium', purpose: 'Arrival lane that sets the world-scale mood and routes operators into the active room.', state: 'active' },
    { id: 'strategy', name: 'Strategy Wall', purpose: 'Blueprint zone for room pressure, mission context, and execution pacing.', state: 'active' },
    { id: 'delivery', name: 'Delivery Wall', purpose: 'Pinned artifact lane for QA, review, and shipment readiness.', state: 'active' },
    { id: 'workstations', name: 'Operator Row', purpose: 'Connected desks for active agents, reviewer staging, and escalation traffic.', state: 'active' },
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
      { id: 'artifact-1', label: 'World-map HQ scene', path: "projects/Riley's_Office/components/office/office-overview.tsx", status: 'ready' },
      { id: 'artifact-2', label: 'Project room scene', path: "projects/Riley's_Office/components/project/project-office-view.tsx", status: 'ready' },
      { id: 'artifact-3', label: 'Scene visual system', path: "projects/Riley's_Office/styles/globals.css", status: 'ready' },
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
      { id: 'evidence-2', label: 'Workstation scene', path: "projects/Riley's_Office/components/desk/agent-desk-view.tsx", status: 'ready' },
      { id: 'evidence-3', label: 'Validation logs', path: "projects/Riley's_Office/evidence", status: 'in_progress' },
    ],
    actions: getDefaultActions(),
    conversation: conversations.find((item) => item.id === (agent.projectId === 'rileys-office' ? 'conv-riley' : 'conv-lotview')) ?? conversations[0],
  };
}
