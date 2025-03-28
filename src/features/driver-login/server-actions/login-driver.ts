'use server';

import { revalidatePath } from 'next/cache';

import signInToSupabase from '@/features/driver-login/server-actions/sign-in-to-supabase';

import getRedirectPath from '@/features/driver-login/utils/get-redirect-path';
import getLocaleValue from '@/shared/utils/server-side/get-locale-value';
import mockResponse from '@/shared/utils/server-side/mock-response';
import mockServerAction from '@/shared/utils/server-side/mock-server-action';

import { TDriverLoginFormSchema } from '@/features/driver-login/schemas/driver-login-form-schema';

const loginDriver = async (user: TDriverLoginFormSchema) => {
  const mockAction = await mockServerAction();

  if (mockAction) {
    return mockResponse(mockAction)?.('/driver/auth/add-car');
  }

  const locale = await getLocaleValue();
  const userMetaData = await signInToSupabase(user, locale);

  const redirectPath = getRedirectPath(userMetaData, locale);

  revalidatePath('/', 'layout');

  return redirectPath;
};

export default loginDriver;
