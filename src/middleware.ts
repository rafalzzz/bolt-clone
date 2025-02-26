import { NextResponse, type NextRequest } from 'next/server';
import createMiddleware from 'next-intl/middleware';

import { routing } from '@/i18n/routing';

export default createMiddleware(routing);

export const config = {
  matcher: [
    // Enable a redirect to a matching locale at the root
    '/',

    // Set a cookie to remember the previous locale for
    // all requests that have a locale prefix
    `/(pl|en)/:path*`,

    // Enable redirects that add missing locales
    // (e.g. `/pathnames` -> `/en/pathnames`)
    '/((?!_next|_vercel|.*\\..*).*)',
  ],
};

export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  const pathname = url.pathname;

  // Delete locale part from api url
  if (pathname.includes('/api/')) {
    const segments = pathname.split('/');

    if (segments.length > 2 && segments[1] === 'api' && /^[a-z]{2}$/.test(segments[2])) {
      segments.splice(2, 1);
      url.pathname = segments.join('/');

      return NextResponse.rewrite(url);
    }
  }

  return NextResponse.next();
}
