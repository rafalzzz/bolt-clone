import type { SignUpWithPasswordCredentials } from '@supabase/supabase-js';

import { supabase } from '@/lib/supabase/api-client';

import getErrorMessage from '@/shared/utils/common/get-error-message';

const signUpUser = async (
  credentials: SignUpWithPasswordCredentials,
  missingUserIdMessage: string,
) => {
  const { data, error: authError } = await supabase.auth.signUp(credentials);

  if (authError || !data.user?.id) {
    const errorMessage = authError ? getErrorMessage(authError) : missingUserIdMessage;

    throw new Error(errorMessage);
  }

  return data.user.id;
};

export default signUpUser;
