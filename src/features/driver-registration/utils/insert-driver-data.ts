import { supabase } from '@/lib/supabase/api-client';

import { TDriverEntity } from '@/shared/types/driver-entity';

const insertDriverData = async (driverDto: TDriverEntity) => {
  const { error } = await supabase.from('Drivers').insert(driverDto);

  if (error) {
    throw error;
  }
};

export default insertDriverData;
