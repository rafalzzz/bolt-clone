import { type NextRequest } from 'next/server';

import { createClient } from '@/lib/supabase/server-client';

import loginUser from '@/features/driver-login/utils/login-user';
import getServerCookie from '@/shared/utils/server-side/cookies';
import generateRedirectPath from '@/shared/utils/server-side/generate-redirect-path';
import getApiTranslations from '@/shared/utils/server-side/get-api-translations';
import handleRequestError from '@/shared/utils/server-side/handle-request-error';
import sendResponse from '@/shared/utils/server-side/send-response';

import { EDriverLoginFormKeys } from '@/features/driver-login/enums/driver-login-form-keys';

import { LANGUAGE } from '@/shared/consts/cookie-names';

export async function POST(request: NextRequest) {
  try {
    const cookie = await getServerCookie(LANGUAGE);
    const locale = cookie?.value || 'en';
    const { supabase, headers } = await createClient(request);

    const t = await getApiTranslations(cookie);
    const body = await request.json();

    const user = {
      email: body[EDriverLoginFormKeys.EMAIL],
      password: body[EDriverLoginFormKeys.PASSWORD],
    };

    const { carAdded, faceAuth } = await loginUser({
      supabase,
      user,
      incorrentCredentialsMessage: t('incorrentCredentialsMessage'),
    });

    if (!carAdded) {
      return sendResponse({
        body: { path: generateRedirectPath(locale, '/driver/auth/add-car') },
        status: 200,
        headers,
      });
    }

    if (!faceAuth) {
      return sendResponse({
        body: { path: generateRedirectPath(locale, '/driver/auth/add-face-auth') },
        status: 200,
        headers,
      });
    }

    return sendResponse({ status: 200, headers });
  } catch (error: unknown) {
    return handleRequestError(error);
  }
}
