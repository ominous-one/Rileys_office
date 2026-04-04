import { z } from 'zod';
import { getMockAgentDesk, getMockProjectOffice, mockOfficeSnapshot } from '@/lib/mock/seed';
import type { ActivityEvent, AgentDesk, OfficeSnapshot, ProjectOffice, ProjectSummary } from '@/lib/domain/types';
import { env, isLiveModeEnabled } from '@/lib/config/env';

const healthStateSchema = z.enum(['healthy', 'active', 'blocked', 'waiting', 'stale', 'degraded']);

const connectionSchema = z.object({
  mode: z.enum(['mock', 'live']).catch('mock'),
  state: z.enum(['connected', 'degraded', 'stale']).catch('degraded'),
  lastUpdated: z.string().catch(''),
});

const runStateSchema = z.object({
  id: z.string().catch(''),
  status: healthStateSchema.catch('waiting'),
  summary: z.string().catch(''),
  progressLabel: z.string().catch('Standby'),
  updatedAt: z.string().catch(''),
});

const agentSummarySchema = z.object({
  id: z.string().catch(''),
  name: z.string().catch('Unnamed agent'),
  role: z.string().catch('operator'),
  status: healthStateSchema.catch('waiting'),
  currentTask: z.string().catch('No current task reported.'),
  blocker: z.string().optional(),
  projectId: z.string().catch(''),
});

const projectSummarySchema = z.object({
  id: z.string().catch(''),
  name: z.string().catch('Untitled project'),
  tagline: z.string().catch(''),
  health: healthStateSchema.catch('degraded'),
  urgency: z.enum(['low', 'medium', 'high']).catch('medium'),
  mission: z.string().catch('Waiting on project mission details.'),
  accent: z.string().catch('#9d7bff'),
  activeRun: runStateSchema.catch({
    id: '',
    status: 'waiting',
    summary: '',
    progressLabel: 'Standby',
    updatedAt: '',
  }),
  agents: z.array(agentSummarySchema).catch([]),
});

const alertSchema = z.object({
  id: z.string().catch(''),
  level: z.enum(['info', 'warning', 'critical']).catch('info'),
  title: z.string().catch('Untitled alert'),
  detail: z.string().catch('No alert detail provided.'),
  projectId: z.string().optional(),
  agentId: z.string().optional(),
});

const activityEventSchema = z.object({
  id: z.string().catch(''),
  type: z.enum(['run', 'agent', 'qa', 'reviewer', 'alert']).catch('run'),
  label: z.string().catch('Untitled event'),
  detail: z.string().catch('No event detail provided.'),
  timestamp: z.string().catch(''),
  relatedPath: z.string().optional(),
  projectId: z.string().optional(),
  agentId: z.string().optional(),
});

const conversationSchema = z.object({
  id: z.string().catch(''),
  title: z.string().catch('Untitled thread'),
  contextLabel: z.string().catch('Conversation'),
  latestMessage: z.string().catch('No recent messages.'),
  updatedAt: z.string().catch(''),
});

const snapshotSchema = z.object({
  connection: connectionSchema.catch({
    mode: 'mock',
    state: 'degraded',
    lastUpdated: '',
  }),
  projects: z.array(projectSummarySchema).catch([]),
  alerts: z.array(alertSchema).catch([]),
  activity: z.array(activityEventSchema).catch([]),
  conversations: z.array(conversationSchema).catch([]),
});

export interface OfficeAdapter {
  getOfficeSnapshot(): Promise<OfficeSnapshot>;
  getProjectOffice(projectId: string): Promise<ProjectOffice | null>;
  getAgentDesk(agentId: string): Promise<AgentDesk | null>;
  getActivityFeed(): Promise<ActivityEvent[]>;
  listProjects(): Promise<ProjectSummary[]>;
}

async function readLiveSnapshot(): Promise<OfficeSnapshot | null> {
  if (!isLiveModeEnabled() || !env.OPENCLAW_BRIDGE_BASE_URL) {
    return null;
  }

  const target = new URL(env.OPENCLAW_LIVE_SNAPSHOT_PATH, env.OPENCLAW_BRIDGE_BASE_URL).toString();

  try {
    const response = await fetch(target, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        ...(env.OPENCLAW_BRIDGE_TOKEN ? { Authorization: `Bearer ${env.OPENCLAW_BRIDGE_TOKEN}` } : {}),
        ...(env.OPENCLAW_ALLOWED_ORIGIN ? { Origin: env.OPENCLAW_ALLOWED_ORIGIN } : {}),
      },
      cache: 'no-store',
      next: { revalidate: 0 },
    });

    if (!response.ok) {
      return {
        ...mockOfficeSnapshot,
        connection: {
          mode: 'live',
          state: 'degraded',
          lastUpdated: new Date().toISOString(),
        },
      };
    }

    const payload = snapshotSchema.parse(await response.json()) as OfficeSnapshot;
    return {
      ...payload,
      connection: {
        ...payload.connection,
        mode: 'live',
      },
    };
  } catch {
    return {
      ...mockOfficeSnapshot,
      connection: {
        mode: 'live',
        state: 'degraded',
        lastUpdated: new Date().toISOString(),
      },
    };
  }
}

export function createOfficeAdapter(): OfficeAdapter {
  return {
    async getOfficeSnapshot() {
      const live = await readLiveSnapshot();
      return snapshotSchema.parse(live ?? mockOfficeSnapshot) as OfficeSnapshot;
    },
    async getProjectOffice(projectId: string) {
      return getMockProjectOffice(projectId);
    },
    async getAgentDesk(agentId: string) {
      return getMockAgentDesk(agentId);
    },
    async getActivityFeed() {
      const snapshot = await this.getOfficeSnapshot();
      return snapshot.activity;
    },
    async listProjects() {
      const snapshot = await this.getOfficeSnapshot();
      return snapshot.projects;
    },
  };
}


