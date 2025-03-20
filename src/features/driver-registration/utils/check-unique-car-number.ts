import type { SupabaseClient } from '@supabase/supabase-js';

import CustomResponseError from '@/shared/classes/custom-response-error';

import getErrorMessage from '@/shared/utils/common/get-error-message';

type TCheckUniqueCarNumberArgs = {
  supabase: SupabaseClient;
  carRegistrationNumberHash: string;
  takenCarRegistrationNumbeMessage: string;
};

const checkUniqueCarNumber = async ({
  supabase,
  carRegistrationNumberHash,
  takenCarRegistrationNumbeMessage,
}: TCheckUniqueCarNumberArgs) => {
  const { data: driver, error: searchDriverError } = await supabase
    .from('drivers')
    .select('car_number_hash')
    .eq('car_number_hash', carRegistrationNumberHash)
    .maybeSingle();

  if (searchDriverError) {
    throw new Error(getErrorMessage(searchDriverError));
  }

  if (driver) {
    throw new CustomResponseError(409, takenCarRegistrationNumbeMessage);
  }
};

export default checkUniqueCarNumber;
