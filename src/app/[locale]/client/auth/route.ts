import { NextRequest, NextResponse } from 'next/server';

import { createClient } from '@/lib/supabase/server-client';

import isDevelopmentEnvironment from '@/shared/utils/is-development-environment';
import getApiLocale from '@/shared/utils/server-side/get-api-locale';

import { host } from '@/config';

export async function GET(request: NextRequest) {
  const locale = getApiLocale(request);
  const { searchParams } = new URL(request.url);

  const baseUrl = host + `/${locale}`;

  const code = searchParams.get('code');
  const next = '/client/auth/route';

  console.log({ code });

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    console.log({ baseUrl, code, error, isDev: isDevelopmentEnvironment() });

    if (!error) {
      const forwardedHost = request.headers.get('x-forwarded-host');

      if (isDevelopmentEnvironment()) {
        return NextResponse.redirect(`${baseUrl}${next}`);
      } else if (forwardedHost) {
        return NextResponse.redirect(`https://${forwardedHost}${next}`);
      } else {
        return NextResponse.redirect(`${baseUrl}${next}`);
      }
    }
  }

  return NextResponse.redirect(`${baseUrl}/client/login`);
}
