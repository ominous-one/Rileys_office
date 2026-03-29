import { z } from 'zod';

const serverEnvSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  NEXT_PUBLIC_APP_URL: z.string().url().default('http://localhost:3000'),
  OPENCLAW_APP_MODE: z.enum(['mock', 'live', 'auto']).default('mock'),
  OPENCLAW_AUTH_MODE: z.enum(['disabled', 'basic-internal']).default('basic-internal'),
  OPENCLAW_SESSION_SECRET: z.string().min(16).default('dev-only-session-secret-change-me'),
  OPENCLAW_ALLOWED_USERS: z.string().default('operator'),
  OPENCLAW_BASIC_PASSWORD: z.string().min(8).default('change-me-now'),
  OPENCLAW_BRIDGE_BASE_URL: z.string().url().optional(),
  OPENCLAW_BRIDGE_TOKEN: z.string().optional(),
  OPENCLAW_ALLOWED_ORIGIN: z.string().url().optional(),
  OPENCLAW_LIVE_SNAPSHOT_PATH: z.string().default('/api/office'),
  OPENCLAW_SESSION_TTL_HOURS: z.coerce.number().int().min(1).max(168).default(12),
});

const parsed = serverEnvSchema.safeParse({
  NODE_ENV: process.env.NODE_ENV,
  NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
  OPENCLAW_APP_MODE: process.env.OPENCLAW_APP_MODE,
  OPENCLAW_AUTH_MODE: process.env.OPENCLAW_AUTH_MODE,
  OPENCLAW_SESSION_SECRET: process.env.OPENCLAW_SESSION_SECRET,
  OPENCLAW_ALLOWED_USERS: process.env.OPENCLAW_ALLOWED_USERS,
  OPENCLAW_BASIC_PASSWORD: process.env.OPENCLAW_BASIC_PASSWORD,
  OPENCLAW_BRIDGE_BASE_URL: process.env.OPENCLAW_BRIDGE_BASE_URL,
  OPENCLAW_BRIDGE_TOKEN: process.env.OPENCLAW_BRIDGE_TOKEN,
  OPENCLAW_ALLOWED_ORIGIN: process.env.OPENCLAW_ALLOWED_ORIGIN,
  OPENCLAW_LIVE_SNAPSHOT_PATH: process.env.OPENCLAW_LIVE_SNAPSHOT_PATH,
  OPENCLAW_SESSION_TTL_HOURS: process.env.OPENCLAW_SESSION_TTL_HOURS,
});

if (!parsed.success) {
  throw new Error(`Invalid environment configuration: ${parsed.error.message}`);
}

const allowedUsers = parsed.data.OPENCLAW_ALLOWED_USERS.split(',')
  .map((value) => value.trim().toLowerCase())
  .filter(Boolean);

export const env = {
  ...parsed.data,
  OPENCLAW_ALLOWED_USERS: allowedUsers.length > 0 ? allowedUsers : ['operator'],
};

export type AppEnv = typeof env;

export function isLiveModeEnabled(): boolean {
  if (env.OPENCLAW_APP_MODE === 'live') {
    return true;
  }

  if (env.OPENCLAW_APP_MODE === 'auto') {
    return Boolean(env.OPENCLAW_BRIDGE_BASE_URL && env.OPENCLAW_BRIDGE_TOKEN);
  }

  return false;
}
