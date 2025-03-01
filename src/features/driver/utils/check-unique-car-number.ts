import { supabase } from '@/lib/supabase';

import CustomResponseError from '@/shared/classes/custom-response-error';

import getErrorMessage from '@/shared/utils/common/get-error-message';

const checkUniqueCarNumber = async (carRegistrationNumberHash: string) => {
  const { data: driver, error: searchDriverError } = await supabase
    .from('Drivers')
    .select('car_number_hash')
    .eq('car_number_hash', carRegistrationNumberHash)
    .maybeSingle();

  if (searchDriverError) {
    throw new Error(getErrorMessage(searchDriverError));
  }

  if (driver) {
    throw new CustomResponseError(409, 'Car registration number is already taken');
  }
};

export default checkUniqueCarNumber;
