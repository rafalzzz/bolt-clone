'use server';

import type { SupabaseClient } from '@supabase/supabase-js';

import { EDriverEntityKeys } from '@/shared/enums/driver-entity-keys';

type TAddFileToStorageParams = {
  filePath: string;
  authUserId: string;
  supabase: SupabaseClient;
};

const addFilePathToDriverEntity = async ({
  filePath,
  authUserId,
  supabase,
}: TAddFileToStorageParams) => {
  const { error } = await supabase
    .from('drivers')
    .update({ [EDriverEntityKeys.FILE_URL]: filePath })
    .eq(EDriverEntityKeys.AUTH_USER_ID, authUserId);

  if (error) {
    throw error;
  }

  const { error: updateMetadataError } = await supabase.auth.updateUser({
    data: {
      faceAuth: true,
    },
  });

  if (updateMetadataError) {
    throw updateMetadataError;
  }
};

export default addFilePathToDriverEntity;
