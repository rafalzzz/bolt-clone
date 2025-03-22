import type { SupabaseClient } from '@supabase/supabase-js';

import CustomResponseError from '@/shared/classes/custom-response-error';

const getUserId = async (supabase: SupabaseClient, unknownErrorMessage: string) => {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    throw new CustomResponseError(401, unknownErrorMessage);
  }

  return user.id;
};

export default getUserId;
