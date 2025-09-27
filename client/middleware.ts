// import NextAuth from 'next-auth';
import { NextResponse } from 'next/server';
import { auth } from '@/auth';
// import { authConfig } from '@/auth.config';

import type { NextRequest } from 'next/server';
 
// export default NextAuth(authConfig).auth;

export default async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  
  const validRoutes = [
    '/',
    '/login',
    '/signup', 
    '/boost',
  ];
  
  // Skip validation for Next.js internal routes, API routes, and static files
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }
  
  // Check if the route is valid
  const isValidRoute = validRoutes.some(route => {
    if (route === '/') return pathname === '/';
    return pathname.startsWith(route);
  });
  
  // If route is not valid, redirect to 404
  if (!isValidRoute) {
    return NextResponse.rewrite(new URL('/404', request.url));
  }
  
  // Handle authentication
  const session = await auth();
  const isLoggedIn = !!session?.user;
  
  // Protected routes
  const protectedRoutes = [ '/boost', ];
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));
  
  if (isProtectedRoute && !isLoggedIn) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  
  // Redirect logged-in users away from login/signup
  if (isLoggedIn && (pathname === '/' || pathname === '/login' || pathname === '/signup')) {
    return NextResponse.redirect(new URL('/boost', request.url));
  }
  
  return NextResponse.next();
}
 
export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|.*\\.png$).*)'
  ],
  runtime: 'nodejs',
};
