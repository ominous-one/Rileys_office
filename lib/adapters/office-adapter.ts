import { z } from 'zod';
import { getMockAgentDesk, getMockProjectOffice, mockOfficeSnapshot } from '@/lib/mock/seed';
import type { ActivityEvent, AgentDesk, OfficeSnapshot, ProjectOffice, ProjectSummary } from '@/lib/domain/types';
import { env, isLiveModeEnabled } from '@/lib/config/env';

const connectionSchema = z.object({
  mode: z.enum(['mock', 'live']),
  state: z.enum(['connected', 'degraded', 'stale']),
  lastUpdated: z.string(),
});

const snapshotSchema = z.object({
  connection: connectionSchema,
  projects: z.array(z.any()).default([]),
  alerts: z.array(z.any()).default([]),
  activity: z.array(z.any()).default([]),
  conversations: z.array(z.any()).default([]),
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
