import { createClient } from '@/lib/supabase/server-client';

import addDriverToDatabase from '@/features/driver-registration/server-actions/add-driver-to-database';
import signUpUserInSupabase from '@/features/driver-registration/server-actions/sign-up-user-in-supabase';

import getDriverCredentials from '@/features/driver-registration/utils/get-driver-credentials';
import getDriverDto from '@/features/driver-registration/utils/get-driver-dto';
import getLocaleValue from '@/shared/utils/server-side/get-locale-value';
import getMockActionCookie from '@/shared/utils/server-side/get-mock-action-cookie';
import getServerActionTranslations from '@/shared/utils/server-side/get-server-action-translations';
import mockResponse from '@/shared/utils/server-side/mock-response';

import { EDriverRegistrationFormKeys } from '@/features/driver-registration/enums/driver-registration-form-keys';

import { TCompleteDriverRegistrationFormData } from '@/features/driver-registration/types/driver-registration';

const registerDriver = async (data: TCompleteDriverRegistrationFormData) => {
  const mockAction = await getMockActionCookie();

  if (mockAction) {
    return mockResponse(mockAction)?.();
  }

  const locale = await getLocaleValue();
  const supabase = await createClient();
  const t = await getServerActionTranslations(locale, 'RegisterAction');

  const { password, ...rest } = data;

  const credentials = getDriverCredentials(data[EDriverRegistrationFormKeys.EMAIL], password);

  const authUserId = await signUpUserInSupabase({
    supabase,
    credentials,
    missingUserIdMessage: t('missingAuthUserId'),
  });

  const driverDto = getDriverDto({
    data: rest,
    authUserId,
  });

  await addDriverToDatabase(supabase, driverDto);
};

export default registerDriver;
