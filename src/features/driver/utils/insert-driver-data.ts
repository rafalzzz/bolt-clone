import { supabase } from '@/lib/supabase';

import getErrorMessage from '@/shared/utils/common/get-error-message';

import { TDriverEntity } from '@/features/driver/types';

const insertDriverData = async (driverDto: TDriverEntity) => {
  const { error } = await supabase.from('Drivers').insert(driverDto);

  if (error) {
    throw new Error(getErrorMessage(error));
  }
};

export default insertDriverData;
