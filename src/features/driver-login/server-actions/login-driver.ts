'use server';

import { revalidatePath } from 'next/cache';

import signInToSupabase from '@/features/driver-login/server-actions/sign-in-to-supabase';

import getRedirectPath from '@/features/driver-login/utils/get-redirect-path';
import generateRedirectPath from '@/shared/utils/server-side/generate-redirect-path';
import getLocaleValue from '@/shared/utils/server-side/get-locale-value';
import getMockActionCookie from '@/shared/utils/server-side/get-mock-action-cookie';
import mockResponse from '@/shared/utils/server-side/mock-response';

import { TDriverLoginFormSchema } from '@/features/driver-login/schemas/driver-login-form-schema';

const loginDriver = async (user: TDriverLoginFormSchema): Promise<unknown> => {
  const locale = await getLocaleValue();
  const mockAction = await getMockActionCookie();

  if (mockAction) {
    return mockResponse(mockAction)?.(generateRedirectPath(locale, '/driver/auth/add-car'));
  }

  const userMetaData = await signInToSupabase(user, locale);

  const redirectPath = getRedirectPath(userMetaData, locale);

  revalidatePath('/', 'layout');

  return redirectPath;
};

export default loginDriver;
