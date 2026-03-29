import { NextRequest, NextResponse } from 'next/server';
import { createOfficeAdapter } from '@/lib/adapters/office-adapter';
import { getSessionFromRequest } from '@/lib/auth/session';
import { env } from '@/lib/config/env';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  if (env.OPENCLAW_AUTH_MODE !== 'disabled') {
    const session = getSessionFromRequest(request);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
  }

  const adapter = createOfficeAdapter();
  const snapshot = await adapter.getOfficeSnapshot();

  return NextResponse.json(
    {
      snapshot,
      meta: {
        authMode: env.OPENCLAW_AUTH_MODE,
        appMode: env.OPENCLAW_APP_MODE,
        liveBridgeConfigured: Boolean(env.OPENCLAW_BRIDGE_BASE_URL),
        readOnly: true,
      },
    },
    {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate',
      },
    },
  );
}
