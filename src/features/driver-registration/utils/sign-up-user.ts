import type { SignUpWithPasswordCredentials, SupabaseClient } from '@supabase/supabase-js';

import CustomResponseError from '@/shared/classes/custom-response-error';

type TSignUpUserArgs = {
  supabase: SupabaseClient;
  credentials: SignUpWithPasswordCredentials;
  missingUserIdMessage: string;
};

const signUpUser = async ({ supabase, credentials, missingUserIdMessage }: TSignUpUserArgs) => {
  const {
    data: { user },
    error,
  } = await supabase.auth.signUp(credentials);

  if (error) {
    throw error;
  }

  if (!user) {
    throw new CustomResponseError(500, missingUserIdMessage);
  }

  return user.id;
};

export default signUpUser;
