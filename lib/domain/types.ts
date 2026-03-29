export type HealthState = 'healthy' | 'active' | 'blocked' | 'waiting' | 'stale' | 'degraded';

export interface GovernedAction {
  id: string;
  label: string;
  description: string;
  locked: boolean;
  requiresApproval: boolean;
  sideEffectClass: 'none' | 'internal_only' | 'external';
}

export interface ArtifactRef {
  id: string;
  label: string;
  path: string;
  status: 'ready' | 'in_progress' | 'blocked';
}

export interface AgentSummary {
  id: string;
  name: string;
  role: string;
  status: HealthState;
  currentTask: string;
  blocker?: string;
  projectId: string;
}

export interface RunState {
  id: string;
  status: HealthState;
  summary: string;
  progressLabel: string;
  updatedAt: string;
}

export interface ProjectSummary {
  id: string;
  name: string;
  tagline: string;
  health: HealthState;
  urgency: 'low' | 'medium' | 'high';
  mission: string;
  accent: string;
  activeRun: RunState;
  agents: AgentSummary[];
}

export interface AlertItem {
  id: string;
  level: 'info' | 'warning' | 'critical';
  title: string;
  detail: string;
  projectId?: string;
  agentId?: string;
}

export interface ActivityEvent {
  id: string;
  type: 'run' | 'agent' | 'qa' | 'reviewer' | 'alert';
  label: string;
  detail: string;
  timestamp: string;
  relatedPath?: string;
  projectId?: string;
  agentId?: string;
}

export interface Conversation {
  id: string;
  title: string;
  contextLabel: string;
  latestMessage: string;
  updatedAt: string;
}

export interface RoomCard {
  id: string;
  name: string;
  purpose: string;
  state: HealthState;
}

export interface ProjectOffice {
  project: ProjectSummary;
  rooms: RoomCard[];
  artifacts: ArtifactRef[];
  actions: GovernedAction[];
  conversation: Conversation;
}

export interface AgentDesk {
  agent: AgentSummary;
  run: RunState;
  evidence: ArtifactRef[];
  actions: GovernedAction[];
  conversation: Conversation;
}

export interface OfficeSnapshot {
  connection: {
    mode: 'mock' | 'live';
    state: 'connected' | 'degraded' | 'stale';
    lastUpdated: string;
  };
  projects: ProjectSummary[];
  alerts: AlertItem[];
  activity: ActivityEvent[];
  conversations: Conversation[];
}
