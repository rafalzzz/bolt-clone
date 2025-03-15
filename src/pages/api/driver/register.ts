import type { NextApiRequest, NextApiResponse } from 'next';

import CustomResponseError from '@/shared/classes/custom-response-error';

import getDriverDto from '@/features/driver-registration/utils/get-driver-dto';
import insertDriverData from '@/features/driver-registration/utils/insert-driver-data';
import signUpUser from '@/features/driver-registration/utils/sign-up-user';
import createHash from '@/shared/utils/server-side/create-hash';
import getApiTranslations from '@/shared/utils/server-side/get-api-translations';
import handleRequestError from '@/shared/utils/server-side/handle-request-error';

import { EDriverRegistrationFormKeys } from '@/features/driver-registration/enums/driver-registration-form-keys';

import { METHOD_NOT_ALLOWED } from '@/shared/consts/response-messages';

import { TCompleteDriverRegistrationFormData } from '@/features/driver-registration/types/driver-registration';
import { TApiResponse } from '@/shared/types/api-response';

export default async function POST(
  { method, headers: { cookie }, body: data }: NextApiRequest,
  res: NextApiResponse<TApiResponse>,
) {
  if (method !== 'POST') {
    throw new CustomResponseError(405, METHOD_NOT_ALLOWED);
  }

  const { password, ...rest } = data as TCompleteDriverRegistrationFormData;

  try {
    const t = await getApiTranslations(cookie);

    const passwordHash = createHash(password);

    const user = {
      email: data[EDriverRegistrationFormKeys.EMAIL],
      password: passwordHash,
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

    await insertDriverData(driverDto);

    res.status(201).end();
  } catch (error: unknown) {
    handleRequestError(res, error);
  }
}
