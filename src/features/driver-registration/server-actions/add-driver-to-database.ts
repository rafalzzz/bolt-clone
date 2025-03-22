import type { SupabaseClient } from '@supabase/supabase-js';

import deleteUser from '@/features/driver-registration/server-actions/delete-user';

import { EDriverEntityKeys } from '@/shared/enums/driver-entity-keys';

import { TDriverEntity } from '@/shared/types/driver-entity';

const addDriverToDatabase = async (supabase: SupabaseClient, driverDto: TDriverEntity) => {
  const { error } = await supabase.from('drivers').insert(driverDto);

  if (error) {
    // It's necessary to delete signed up driver from Supabase
    // when error occurs during adding driver to database
    await deleteUser(supabase, driverDto[EDriverEntityKeys.AUTH_USER_ID]);

    throw error;
  }
};

export default addDriverToDatabase;
