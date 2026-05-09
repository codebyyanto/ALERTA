import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('admin_token')?.value;
  const isLoginPage = request.nextUrl.pathname.startsWith('/login');

  if (!token && !isLoginPage) {
    // Redirect to login if no token and trying to access dashboard
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (token && isLoginPage) {
    // Redirect to dashboard if already logged in and trying to access login page
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

// Only run middleware on dashboard and login routes
export const config = {
  matcher: ['/', '/login'],
};
