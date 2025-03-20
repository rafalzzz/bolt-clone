import type { SupabaseClient } from '@supabase/supabase-js';

import { TCarEntity } from '@/shared/types/car-entity';

const insertCarData = async (supabase: SupabaseClient, carDto: TCarEntity) => {
  const { error } = await supabase.from('cars').insert(carDto);

  if (error) {
    throw error;
  }
};

export default insertCarData;
