import { createClient } from '@/lib/supabase/server-client';

import deleteUser from '@/features/driver-registration/utils/delete-user';
import getDriverDto from '@/features/driver-registration/utils/get-driver-dto';
import insertDriverData from '@/features/driver-registration/utils/insert-driver-data';
import signUpUser from '@/features/driver-registration/utils/sign-up-user';
import getApiTranslations from '@/shared/utils/server-side/get-api-translations';
import handleRequestError from '@/shared/utils/server-side/handle-request-error';
import sendResponse from '@/shared/utils/server-side/send-response';

import { EDriverRegistrationFormKeys } from '@/features/driver-registration/enums/driver-registration-form-keys';

import { TCompleteDriverRegistrationFormData } from '@/features/driver-registration/types/driver-registration';

export async function POST(request: Request) {
  try {
    const t = await getApiTranslations();
    const body = await request.json();
    const supabase = await createClient();

    const { password, ...rest } = body as TCompleteDriverRegistrationFormData;

    const credentials = {
      email: body[EDriverRegistrationFormKeys.EMAIL],
      password,
      options: {
        data: {
          driver: true,
        },
      },
    };

    const authUserId = await signUpUser({
      supabase,
      credentials,
      missingUserIdMessage: t('missingAuthUserId'),
    });

    const driverDto = getDriverDto({
      data: rest,
      authUserId,
    });

    try {
      await insertDriverData(supabase, driverDto);
      return sendResponse({ status: 201 });
    } catch (error) {
      await deleteUser(supabase, authUserId);
      throw error;
    }
  } catch (error: unknown) {
    return handleRequestError(error);
  }
}
