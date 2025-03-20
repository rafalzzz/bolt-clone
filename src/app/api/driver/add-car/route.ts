import { createClient } from '@/lib/supabase/server-client';

import getCarDto from '@/features/add-car/utils/get-car-dto';
import insertCarData from '@/features/add-car/utils/insert-car-data';
import createHash from '@/shared/utils/server-side/create-hash';
import encryptSensitiveData from '@/shared/utils/server-side/encrypt-sensitive-data';
import getApiTranslations from '@/shared/utils/server-side/get-api-translations';
import getUserId from '@/shared/utils/server-side/get-user-id';
import handleRequestError from '@/shared/utils/server-side/handle-request-error';
import sendResponse from '@/shared/utils/server-side/send-response';

import { TAddCarFormSchema } from '@/features/add-car/schemas/add-car-form-schema';

import { EAddCarFormKeys } from '@/features/add-car/enums/add-car-form-keys';

const keysToEncrypt = [EAddCarFormKeys.CAR_REGISTRATION_NUMBER];

export async function POST(request: Request) {
  try {
    const t = await getApiTranslations();
    const data = await request.json();
    const supabase = await createClient();

    const carRegistrationNumberHash = createHash(
      String(data[EAddCarFormKeys.CAR_REGISTRATION_NUMBER]),
    );

    const encryptedData = encryptSensitiveData<TAddCarFormSchema>({
      data,
      keysToEncrypt,
    });

    const authUserId = await getUserId(supabase, t('unknownError'));

    const carDto = getCarDto({
      data: encryptedData,
      carRegistrationNumberHash,
      authUserId,
    });

    await insertCarData(supabase, carDto);
    return sendResponse({ status: 201 });
  } catch (error: unknown) {
    return handleRequestError(error);
  }
}
