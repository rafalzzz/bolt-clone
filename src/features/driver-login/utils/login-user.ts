import { createClient } from '@/lib/supabase/server-client';

import CustomResponseError from '@/shared/classes/custom-response-error';

import getErrorMessage from '@/shared/utils/common/get-error-message';

import { TDriverLoginFormSchema } from '@/features/driver-login/schemas/driver-login-form-schema';

const getIncorrectCredentialsMessage = (incorrentCredentialsMessage: string) =>
  new CustomResponseError(401, incorrentCredentialsMessage);

const loginUser = async (user: TDriverLoginFormSchema, incorrentCredentialsMessage: string) => {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.signInWithPassword(user);

  if (error) {
    const errorMessage = getErrorMessage(error);

    if (errorMessage.includes('login credentials')) {
      const incorrectCredentialError = getIncorrectCredentialsMessage(incorrentCredentialsMessage);
      throw incorrectCredentialError;
    }

    throw error;
  }

  const {
    id: authUserId,
    user_metadata: { role, carAdded, faceAuth },
  } = data.user;

  if (role !== 'driver') {
    const incorrectCredentialError = getIncorrectCredentialsMessage(incorrentCredentialsMessage);
    throw incorrectCredentialError;
  }

  return { authUserId, carAdded, faceAuth };
};

export default loginUser;
