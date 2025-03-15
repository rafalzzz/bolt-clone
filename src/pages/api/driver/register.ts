import type { NextApiRequest, NextApiResponse } from 'next';

import deleteUser from '@/features/driver-registration/utils/delete-user';
import getDriverDto from '@/features/driver-registration/utils/get-driver-dto';
import insertDriverData from '@/features/driver-registration/utils/insert-driver-data';
import signUpUser from '@/features/driver-registration/utils/sign-up-user';
import checkMethod from '@/shared/utils/server-side/check-method';
import getApiTranslations from '@/shared/utils/server-side/get-api-translations';
import handleRequestError from '@/shared/utils/server-side/handle-request-error';

import { EDriverRegistrationFormKeys } from '@/features/driver-registration/enums/driver-registration-form-keys';

import { TCompleteDriverRegistrationFormData } from '@/features/driver-registration/types/driver-registration';
import { TApiResponse } from '@/shared/types/api-response';

export default async function POST(
  { method, headers: { cookie }, body }: NextApiRequest,
  res: NextApiResponse<TApiResponse>,
) {
  checkMethod('POST', method);

  const { password, ...rest } = body as TCompleteDriverRegistrationFormData;

  try {
    const t = await getApiTranslations(cookie);

    const user = {
      email: body[EDriverRegistrationFormKeys.EMAIL],
      password,
      options: {
        data: {
          isDriver: true,
        },
      },
    };

    const authUserId = await signUpUser(user, t('missingAuthUserId'));

    const driverDto = getDriverDto({
      data: rest,
      authUserId,
    });

    try {
      await insertDriverData(driverDto);
      res.status(201).end();
    } catch (error) {
      await deleteUser(authUserId);
      throw error;
    }
  } catch (error: unknown) {
    handleRequestError(res, error);
  }
}
