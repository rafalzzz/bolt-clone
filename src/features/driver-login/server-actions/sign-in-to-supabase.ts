import { createClient } from '@/lib/supabase/server-client';

import getErrorMessage from '@/shared/utils/common/get-error-message';
import getServerActionTranslations from '@/shared/utils/server-side/get-server-action-translations';

import { TDriverLoginFormSchema } from '@/features/driver-login/schemas/driver-login-form-schema';

const signInToSupabase = async (user: TDriverLoginFormSchema, locale: string) => {
  const supabase = await createClient();
  const t = await getServerActionTranslations(locale, 'LoginAction');

  const {
    data: { user: userData },
    error,
  } = await supabase.auth.signInWithPassword(user);

  if (error || !userData) {
    const errorMessage = getErrorMessage(error);

    if (errorMessage.includes('login credentials')) {
      throw new Error(t('incorrentCredentialsMessage'));
    }

    throw error;
  }

  const {
    user_metadata: { role },
  } = userData;

  if (role !== 'driver') {
    throw new Error(t('incorrentCredentialsMessage'));
  }

  return userData.user_metadata;
};

export default signInToSupabase;
