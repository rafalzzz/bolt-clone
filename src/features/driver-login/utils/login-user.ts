import { supabase } from '@/lib/supabase';

import CustomResponseError from '@/shared/classes/custom-response-error';

import getErrorMessage from '@/shared/utils/common/get-error-message';

import { TDriverLoginFormSchema } from '@/features/driver-login/schemas/driver-login-form-schema';

const loginUser = async (user: TDriverLoginFormSchema, incorrentCredentialsMessage: string) => {
  const { data, error } = await supabase.auth.signInWithPassword(user);

  if (!error) {
    return {
      user: data?.user,
      session: data.session,
    };
  }

  const errorMessage = getErrorMessage(error);

  if (errorMessage.toLowerCase().includes('login credentials')) {
    throw new CustomResponseError(401, incorrentCredentialsMessage);
  }

  throw new Error(errorMessage);
};

export default loginUser;
