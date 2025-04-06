'use server';

import { redirect } from 'next/navigation';

import { createClient } from '@/lib/supabase/server-client';

import getLocaleValue from '@/shared/utils/server-side/get-locale-value';

import { host } from '@/config';

const loginWithFacebook = async () => {
  const locale = await getLocaleValue();
  const supabase = await createClient(false);

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'facebook',
    options: {
      redirectTo: `${host}/${locale}/client/auth`,
    },
  });

  if (data.url) {
    redirect(data.url);
  }

  if (error) {
    throw error;
  }
};

export default loginWithFacebook;
