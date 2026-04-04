import { NextRequest, NextResponse } from 'next/server';
import { clearSessionCookieOptions } from '@/lib/auth/session';

export async function POST(request: NextRequest) {
  const nextPath = request.nextUrl.searchParams.get('next') ?? '/api/auth/login';
  const response = NextResponse.redirect(new URL(nextPath.startsWith('/') ? nextPath : '/', request.url), { status: 303 });
  response.cookies.set(clearSessionCookieOptions());
  return response;
}

