import { createClient } from '@/lib/supabase/server-client';

import CustomResponseError from '@/shared/classes/custom-response-error';

import getErrorMessage from '@/shared/utils/common/get-error-message';

import { TDriverLoginFormSchema } from '@/features/driver-login/schemas/driver-login-form-schema';

const loginUser = async (user: TDriverLoginFormSchema, incorrentCredentialsMessage: string) => {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.signInWithPassword(user);

  if (error) {
    const errorMessage = getErrorMessage(error);

    if (errorMessage.includes('login credentials')) {
      throw new CustomResponseError(401, incorrentCredentialsMessage);
    }

    throw error;
  }

  return { authUserId: data.user.id, isDriver: data.user.user_metadata.driver };
};

export default loginUser;
