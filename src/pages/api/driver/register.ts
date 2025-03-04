import type { NextApiRequest, NextApiResponse } from 'next';

import CustomResponseError from '@/shared/classes/custom-response-error';

import checkUniqueCarNumber from '@/features/driver/utils/check-unique-car-number';
import extractCompleteRegistrationData from '@/features/driver/utils/extract-complete-driver-registration-data';
import getDriverDto from '@/features/driver/utils/get-driver-dto';
import hashSensitiveData from '@/features/driver/utils/hash-sensitivie-data';
import insertDriverData from '@/features/driver/utils/insert-driver-data';
import encryptSensitiveData from '@/shared/utils/server-side/encrypt-sensitive-data';
import getApiTranslations from '@/shared/utils/server-side/get-api-translations';
import handleRequestError from '@/shared/utils/server-side/handle-request-error';

import { EDriverCompleteRegistrationFormKeys } from '@/features/driver/enums/driver-complete-registration-form-keys';

import {
  TCompleteDriverRegistrationFormData,
  TEncryptedCompleteDriverRegistrationFormData,
} from '@/features/driver/types';
import { METHOD_NOT_ALLOWED } from '@/shared/consts/response-messages';

import { TApiResponse } from '@/shared/types/api-response';

const keysToEncrypt = [EDriverCompleteRegistrationFormKeys.CAR_REGISTRATION_NUMBER];
const keysToOmit = [
  EDriverCompleteRegistrationFormKeys.REPEAT_PASSWORD,
  EDriverCompleteRegistrationFormKeys.FILE,
];

export default async function POST(
  { method, headers: { cookie }, body }: NextApiRequest,
  res: NextApiResponse<TApiResponse>,
) {
  if (method !== 'POST') {
    throw new CustomResponseError(405, METHOD_NOT_ALLOWED);
  }

  try {
    const t = await getApiTranslations(cookie);
    const { data, tokenPayload } = extractCompleteRegistrationData(body);
    const { carRegistrationNumberHash, passwordHash } = hashSensitiveData(data);

    await checkUniqueCarNumber(carRegistrationNumberHash, t('takenCarRegistrationNumber'));

    const encryptedDriverData = encryptSensitiveData<
      TCompleteDriverRegistrationFormData,
      TEncryptedCompleteDriverRegistrationFormData
    >({
      data,
      keysToEncrypt,
      keysToOmit,
    });

    const driverDto = getDriverDto({
      encryptedDriverData,
      tokenPayload,
      passwordHash,
      carRegistrationNumberHash,
    });

    await insertDriverData(driverDto);

    res.status(201).end();
  } catch (error: unknown) {
    handleRequestError(res, error);
  }
}
