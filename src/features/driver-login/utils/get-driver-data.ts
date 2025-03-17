import { createClient } from '@/lib/supabase/server-client';

import { EDriverEntityKeys } from '@/shared/enums/driver-entity-keys';

async function getDriverByAuthUserId(userId: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('Drivers')
    .select(`${EDriverEntityKeys.CAR_NUMBER_HASH}, ${EDriverEntityKeys.FILE_URL}`)
    .eq('auth_user_id', userId)
    .single();

  if (error) {
    console.error('Błąd pobierania kierowcy:', error.message);
    return null;
  }

  return {
    carNumberHash: data?.[EDriverEntityKeys.CAR_NUMBER_HASH],
    fileUrl: data?.[EDriverEntityKeys.FILE_URL],
  };
}

export default getDriverByAuthUserId;
