import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  // Allow access to auth page when not logged in
  if (!session && req.nextUrl.pathname === '/auth') {
    return res;
  }

  // Redirect to auth page if not logged in
  if (!session) {
    return NextResponse.redirect(new URL('/auth', req.url));
  }

  // Redirect to home if trying to access auth page while logged in
  if (session && req.nextUrl.pathname === '/auth') {
    return NextResponse.redirect(new URL('/', req.url));
  }

  return res;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};