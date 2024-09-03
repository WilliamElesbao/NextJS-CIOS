import { getUrl } from '@/lib/utils';
import { type NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const token =
    request.cookies.get('authjs.session-token') ||
    request.cookies.get('__Secure-authjs.session-token');
  const pathname = request.nextUrl.pathname;

  if (pathname === '/' && token) {
    return NextResponse.redirect(new URL(getUrl('/cios')));
  }

  if (pathname.includes('/cios') && !token) {
    return NextResponse.redirect(new URL(getUrl('/')));
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
