'use server';

import { createClient } from '@/lib/supabase/server-client';

import addCarToDatabase from '@/features/add-car/server-actions/add-car-to-database';

import getCarDto from '@/features/add-car/utils/get-car-dto';
import createHash from '@/shared/utils/server-side/create-hash';
import encryptSensitiveData from '@/shared/utils/server-side/encrypt-sensitive-data';
import generateRedirectPath from '@/shared/utils/server-side/generate-redirect-path';
import getLocaleValue from '@/shared/utils/server-side/get-locale-value';
import getMockActionCookie from '@/shared/utils/server-side/get-mock-action-cookie';
import getServerActionTranslations from '@/shared/utils/server-side/get-server-action-translations';
import getUserId from '@/shared/utils/server-side/get-user-id';
import mockResponse from '@/shared/utils/server-side/mock-response';

import { TAddCarFormSchema } from '@/features/add-car/schemas/add-car-form-schema';

import { EAddCarFormKeys } from '@/features/add-car/enums/add-car-form-keys';

const keysToEncrypt = [EAddCarFormKeys.CAR_REGISTRATION_NUMBER];

const addCar = async (data: TAddCarFormSchema) => {
  const locale = await getLocaleValue();
  const mockAction = await getMockActionCookie();

  if (mockAction) {
    return mockResponse(mockAction)?.(generateRedirectPath(locale, '/driver/auth/add-face-auth'));
  }

  const t = await getServerActionTranslations(locale, 'AddCarAction');

  const supabase = await createClient();

  const authUserId = await getUserId(supabase, t('authError'));
  const carRegistrationNumberHash = createHash(data[EAddCarFormKeys.CAR_REGISTRATION_NUMBER]);

  const encryptedData = encryptSensitiveData<TAddCarFormSchema>({
    data,
    keysToEncrypt,
  });

  const carDto = getCarDto({
    data: encryptedData,
    carRegistrationNumberHash,
    authUserId,
  });

  await addCarToDatabase({
    supabase,
    carDto,
    duplicatedCarNumberMessage: t('carNumberIsAlreadyTaken'),
  });

  return generateRedirectPath(locale, '/driver/auth/add-face-auth');
};

export default addCar;
