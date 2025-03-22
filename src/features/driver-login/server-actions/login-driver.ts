'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import signInToSupabase from '@/features/driver-login/server-actions/sign-in-to-supabase';

import getRedirectPath from '@/features/driver-login/utils/get-redirect-path';
import getLocaleValue from '@/shared/utils/server-side/get-locale-value';

import { TDriverLoginFormSchema } from '@/features/driver-login/schemas/driver-login-form-schema';

const loginDriver = async (user: TDriverLoginFormSchema) => {
  const locale = await getLocaleValue();
  const userMetaData = await signInToSupabase(user, locale);

  const redirectPath = getRedirectPath(userMetaData, locale);

  revalidatePath('/', 'layout');
  redirect(redirectPath);
};

export default loginDriver;
