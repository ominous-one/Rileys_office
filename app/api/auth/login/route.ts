import { NextRequest, NextResponse } from 'next/server';
import { createSessionCookie, isAllowedUser, verifyPassword } from '@/lib/auth/session';
import { env } from '@/lib/config/env';

function renderLoginHtml(nextPath: string, error?: string) {
  const safeNext = nextPath.startsWith('/') ? nextPath : '/';
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Riley's_Office login</title>
    <style>
      body { font-family: Arial, sans-serif; background: #0f172a; color: #e2e8f0; display: grid; place-items: center; min-height: 100vh; margin: 0; }
      form { width: min(92vw, 420px); background: #111827; border: 1px solid #334155; border-radius: 16px; padding: 24px; }
      label { display: block; margin-bottom: 8px; font-size: 14px; }
      input { width: 100%; box-sizing: border-box; margin-bottom: 16px; padding: 12px; border-radius: 10px; border: 1px solid #475569; background: #020617; color: #fff; }
      button { width: 100%; padding: 12px; border: 0; border-radius: 10px; background: #8b5cf6; color: white; font-weight: 700; }
      p { color: #94a3b8; }
      .error { color: #fca5a5; }
    </style>
  </head>
  <body>
    <form method="post" action="/api/auth/login">
      <h1>Riley's_Office</h1>
      <p>Internal access only. Enter the approved username and shared password.</p>
      ${error ? `<p class="error">${error}</p>` : ''}
      <input type="hidden" name="next" value="${safeNext}" />
      <label for="username">Username</label>
      <input id="username" name="username" type="text" autocomplete="username" required />
      <label for="password">Password</label>
      <input id="password" name="password" type="password" autocomplete="current-password" required />
      <button type="submit">Sign in</button>
    </form>
  </body>
</html>`;
}

async function getCredentials(request: NextRequest) {
  const contentType = request.headers.get('content-type') ?? '';

  if (contentType.includes('application/json')) {
    const body = await request.json();
    return {
      username: String(body.username ?? ''),
      password: String(body.password ?? ''),
      next: String(body.next ?? '/'),
    };
  }

  const form = await request.formData();
  return {
    username: String(form.get('username') ?? ''),
    password: String(form.get('password') ?? ''),
    next: String(form.get('next') ?? '/'),
  };
}

export async function GET(request: NextRequest) {
  const nextPath = request.nextUrl.searchParams.get('next') ?? '/';
  return new NextResponse(renderLoginHtml(nextPath), {
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'no-store',
    },
  });
}

export async function POST(request: NextRequest) {
  if (env.OPENCLAW_AUTH_MODE === 'disabled') {
    return NextResponse.json({ ok: true, disabled: true });
  }

  const { username, password, next } = await getCredentials(request);
  const normalizedUser = username.trim().toLowerCase();

  if (!normalizedUser || !verifyPassword(password) || !isAllowedUser(normalizedUser)) {
    if ((request.headers.get('content-type') ?? '').includes('application/json')) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    return new NextResponse(renderLoginHtml(next, 'Invalid credentials'), {
      status: 401,
      headers: { 'Content-Type': 'text/html; charset=utf-8' },
    });
  }

  const destination = next.startsWith('/') ? next : '/';
  const response = NextResponse.redirect(new URL(destination, request.url), { status: 303 });
  response.cookies.set(createSessionCookie(normalizedUser));
  return response;
}

