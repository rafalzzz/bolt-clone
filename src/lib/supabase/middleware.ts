import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';
import createMiddleware from 'next-intl/middleware';

import { routing } from '@/i18n/routing';
import { LANGUAGE } from '@/shared/consts/cookie-names';
import { MOCK_ACTION_COOKIE } from '@/test-consts/cookies';

const intlMiddleware = createMiddleware(routing);

const getCurrentLocale = (request: NextRequest) => {
  const localeCookie = request.cookies.get(LANGUAGE);
  return localeCookie?.value || routing.defaultLocale;
};

const getRedirectUrl = (request: NextRequest) => {
  const locale = getCurrentLocale(request);
  const requestUrl = request.nextUrl.pathname;
  const userType = requestUrl.includes('driver') ? 'driver' : 'client';

  const url = request.nextUrl.clone();
  url.pathname = `/${locale}/${userType}/login/`;
  return url;
};

const isAuthRoute = (request: NextRequest) => {
  return request.nextUrl.pathname.includes('/auth');
};

const isTest = (request: NextRequest) =>
  request.cookies.get(MOCK_ACTION_COOKIE)?.value &&
  process.env.NEXT_PUBLIC_ENVIRONMENT !== 'production';

export async function updateSession(request: NextRequest) {
  let intlResponse = intlMiddleware(request);

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_API_URL!,
    process.env.NEXT_PUBLIC_API_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));

          intlResponse = NextResponse.next({
            request,
          });

          cookiesToSet.forEach(({ name, value, options }) =>
            intlResponse.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user && isAuthRoute(request) && !isTest(request)) {
    const url = getRedirectUrl(request);

    return NextResponse.redirect(url);
  }

  return intlResponse;
}
