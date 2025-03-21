import { SupabaseClient } from '@supabase/supabase-js';

import CustomResponseError from '@/shared/classes/custom-response-error';

import getErrorMessage from '@/shared/utils/common/get-error-message';

import { TDriverLoginFormSchema } from '@/features/driver-login/schemas/driver-login-form-schema';

type TLoginUserArgs = {
  supabase: SupabaseClient;
  user: TDriverLoginFormSchema;
  incorrentCredentialsMessage: string;
};

const getIncorrectCredentialsMessage = (incorrentCredentialsMessage: string) =>
  new CustomResponseError(401, incorrentCredentialsMessage);

const loginUser = async ({ supabase, user, incorrentCredentialsMessage }: TLoginUserArgs) => {
  const {
    data: { user: userData },
    error,
  } = await supabase.auth.signInWithPassword(user);

  if (error || !userData) {
    const errorMessage = getErrorMessage(error);

    if (errorMessage.includes('login credentials')) {
      const incorrectCredentialError = getIncorrectCredentialsMessage(incorrentCredentialsMessage);
      throw incorrectCredentialError;
    }

    throw error;
  }

  const {
    user_metadata: { role, carAdded, faceAuth },
  } = userData;

  if (role !== 'driver') {
    const incorrectCredentialError = getIncorrectCredentialsMessage(incorrentCredentialsMessage);
    throw incorrectCredentialError;
  }

  return { carAdded, faceAuth };
};

export default loginUser;
