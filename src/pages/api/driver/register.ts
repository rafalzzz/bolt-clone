import { NextApiRequest, NextApiResponse } from 'next';

import CustomResponseError from '@/shared/classes/custom-response-error';

import addFileToStorage from '@/features/driver/utils/add-driver-file-to-storage';
import checkUniqueCarNumber from '@/features/driver/utils/check-unique-car-number';
import getDriverDto from '@/features/driver/utils/get-driver-dto';
import hashSensitiveData from '@/features/driver/utils/hash-sensitivie-data';
import insertDriverData from '@/features/driver/utils/insert-driver-data';
import encryptSensitiveData from '@/shared/utils/server-side/encrypt-sensitive-data';
import getApiTranslations from '@/shared/utils/server-side/get-api-translations';
import handleRequestError from '@/shared/utils/server-side/handle-request-error';
import parseForm from '@/shared/utils/server-side/parse-form';

import { METHOD_NOT_ALLOWED } from '@/shared/consts/response-messages';

import { EDriverCompleteRegistrationFormKeys } from '@/features/driver/enums/driver-complete-registration-form-keys';

import {
  TCompleteDriverRegistrationFormData,
  TEncryptedCompleteDriverRegistrationFormData,
} from '@/features/driver/types';

import { TApiResponse } from '@/shared/types/api-response';

const keysToEncrypt = [EDriverCompleteRegistrationFormKeys.CAR_REGISTRATION_NUMBER];
const keysToOmit = [
  EDriverCompleteRegistrationFormKeys.REPEAT_PASSWORD,
  EDriverCompleteRegistrationFormKeys.FILE,
];

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function POST(req: NextApiRequest, res: NextApiResponse<TApiResponse>) {
  const { method, headers } = req;

  const { cookie } = headers;

  if (method !== 'POST') {
    throw new CustomResponseError(405, METHOD_NOT_ALLOWED);
  }

  try {
    const t = await getApiTranslations(cookie);
    const { fields: data, files } = await parseForm(req);

    const driverData = data as unknown as TCompleteDriverRegistrationFormData;

    const { carRegistrationNumberHash, passwordHash } = hashSensitiveData(driverData);

    await checkUniqueCarNumber(carRegistrationNumberHash, t('takenCarRegistrationNumber'));

    const filePath = addFileToStorage({
      file: files.file,
      bucketName: 'driver_files',
      missingFileMessage: t('missingFileMessage'),
    });

    const encryptedDriverData = encryptSensitiveData<
      TCompleteDriverRegistrationFormData,
      TEncryptedCompleteDriverRegistrationFormData
    >({
      data: { ...driverData, [EDriverCompleteRegistrationFormKeys.FILE]: filePath },
      keysToEncrypt,
      keysToOmit,
    });

    const driverDto = getDriverDto({
      encryptedDriverData,
      passwordHash,
      carRegistrationNumberHash,
    });

    await insertDriverData(driverDto);

    res.status(201).end();
  } catch (error: unknown) {
    handleRequestError(res, error);
  }
}
