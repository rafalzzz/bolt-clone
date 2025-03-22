import type { SignUpWithPasswordCredentials, SupabaseClient } from '@supabase/supabase-js';

type TSignUpUserInSupabaseArgs = {
  supabase: SupabaseClient;
  credentials: SignUpWithPasswordCredentials;
  missingUserIdMessage: string;
};

const signUpUserInSupabase = async ({
  supabase,
  credentials,
  missingUserIdMessage,
}: TSignUpUserInSupabaseArgs) => {
  const {
    data: { user },
    error,
  } = await supabase.auth.signUp(credentials);

  if (error) {
    throw error;
  }

  if (!user) {
    throw new Error(missingUserIdMessage);
  }

  return user.id;
};

export default signUpUserInSupabase;
