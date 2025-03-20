import type { SignUpWithPasswordCredentials, SupabaseClient } from '@supabase/supabase-js';

import getErrorMessage from '@/shared/utils/common/get-error-message';

type TSignUpUserArgs = {
  supabase: SupabaseClient;
  credentials: SignUpWithPasswordCredentials;
  missingUserIdMessage: string;
};

const signUpUser = async ({ supabase, credentials, missingUserIdMessage }: TSignUpUserArgs) => {
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.signUp(credentials);

  if (authError || !user?.id) {
    const errorMessage = authError ? getErrorMessage(authError) : missingUserIdMessage;

    throw new Error(errorMessage);
  }

  return user.id;
};

export default signUpUser;
