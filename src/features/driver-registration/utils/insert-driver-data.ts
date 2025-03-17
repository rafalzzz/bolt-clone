import type { SupabaseClient } from '@supabase/supabase-js';

import { TDriverEntity } from '@/shared/types/driver-entity';

const insertDriverData = async (supabase: SupabaseClient, driverDto: TDriverEntity) => {
  const { error } = await supabase.from('Drivers').insert(driverDto);

  if (error) {
    throw error;
  }
};

export default insertDriverData;
