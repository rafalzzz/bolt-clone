import type { SupabaseClient } from '@supabase/supabase-js';

import getErrorMessage from '@/shared/utils/common/get-error-message';

import { TCarEntity } from '@/shared/types/car-entity';

type TAddCarToDatabaseArgs = {
  supabase: SupabaseClient;
  carDto: TCarEntity;
  duplicatedCarNumberMessage: string;
};

const addCarToDatabase = async ({
  supabase,
  carDto,
  duplicatedCarNumberMessage,
}: TAddCarToDatabaseArgs) => {
  const { error } = await supabase.from('cars').insert(carDto);

  if (error) {
    const errorMessage = getErrorMessage(error);

    if (errorMessage.includes('duplicate key value')) {
      throw new Error(duplicatedCarNumberMessage);
    }

    throw error;
  }

  const { error: updateMetadataError } = await supabase.auth.updateUser({
    data: {
      carAdded: true,
    },
  });

  if (updateMetadataError) {
    throw updateMetadataError;
  }
};

export default addCarToDatabase;
