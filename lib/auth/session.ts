import { createHmac, timingSafeEqual } from 'node:crypto';
import type { NextRequest } from 'next/server';
import { cookies } from 'next/headers';
import { env } from '@/lib/config/env';

export const SESSION_COOKIE_NAME = 'rileys_office_session';

interface SessionPayload {
  username: string;
  expiresAt: string;
}

export interface AuthSession extends SessionPayload {
  valid: true;
}

function sign(value: string): string {
  return createHmac('sha256', env.OPENCLAW_SESSION_SECRET).update(value).digest('hex');
}

function encode(payload: SessionPayload): string {
  const value = Buffer.from(JSON.stringify(payload)).toString('base64url');
  return `${value}.${sign(value)}`;
}

function decode(token: string | undefined): AuthSession | null {
  if (!token) return null;

  const [value, signature] = token.split('.');
  if (!value || !signature) return null;

  const expected = sign(value);
  const providedBuffer = Buffer.from(signature);
  const expectedBuffer = Buffer.from(expected);
  if (providedBuffer.length !== expectedBuffer.length) return null;

  const matches = timingSafeEqual(providedBuffer, expectedBuffer);
  if (!matches) return null;

  const parsed = JSON.parse(Buffer.from(value, 'base64url').toString('utf8')) as SessionPayload;
  if (!parsed.username || !parsed.expiresAt) return null;

  if (new Date(parsed.expiresAt).getTime() <= Date.now()) {
    return null;
  }

  return { ...parsed, valid: true };
}

export function createSessionToken(username: string): string {
  return encode({
    username: username.trim().toLowerCase(),
    expiresAt: new Date(Date.now() + env.OPENCLAW_SESSION_TTL_HOURS * 60 * 60 * 1000).toISOString(),
  });
}

export function isAllowedUser(username: string): boolean {
  return env.OPENCLAW_ALLOWED_USERS.includes(username.trim().toLowerCase());
}

export function verifyPassword(password: string): boolean {
  return password === env.OPENCLAW_BASIC_PASSWORD;
}

export async function getServerSession(): Promise<AuthSession | null> {
  const cookieStore = await cookies();
  return decode(cookieStore.get(SESSION_COOKIE_NAME)?.value);
}

export function getSessionFromRequest(request: NextRequest): AuthSession | null {
  return decode(request.cookies.get(SESSION_COOKIE_NAME)?.value);
}

export function clearSessionCookieOptions() {
  return {
    name: SESSION_COOKIE_NAME,
    value: '',
    httpOnly: true,
    sameSite: 'lax' as const,
    secure: env.NODE_ENV === 'production',
    path: '/',
    expires: new Date(0),
  };
}

export function createSessionCookie(username: string) {
  return {
    name: SESSION_COOKIE_NAME,
    value: createSessionToken(username),
    httpOnly: true,
    sameSite: 'lax' as const,
    secure: env.NODE_ENV === 'production',
    path: '/',
    expires: new Date(Date.now() + env.OPENCLAW_SESSION_TTL_HOURS * 60 * 60 * 1000),
  };
}
