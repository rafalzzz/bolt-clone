import { JWTPayload } from 'jose';
import type { NextApiRequest, NextApiResponse } from 'next';

import { supabase } from '@/lib/supabase';

import getDriverDto from '@/features/driver/utils/get-driver-dto';
import getErrorMessage from '@/shared/utils/common/get-error-message';
import createHash from '@/shared/utils/server-side/create-hash';
import encryptSensitiveData from '@/shared/utils/server-side/encrypt-sensitive-data';

import { METHOD_NOT_ALLOWED } from '@/shared/consts/response-messages';

import { EDriverCompleteRegistrationFormKeys } from '@/features/driver/enums/driver-complete-registration-form-keys';

import { TRegisterDriverFormData } from '@/features/driver/types';

import { TApiResponse } from '@/shared/types/api-response';

const keysToEncrypt = [
  EDriverCompleteRegistrationFormKeys.REPEAT_PASSWORD,
  EDriverCompleteRegistrationFormKeys.CAR_REGISTRATION_NUMBER,
];

export default async function handler(req: NextApiRequest, res: NextApiResponse<TApiResponse>) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: METHOD_NOT_ALLOWED });
  }

  try {
    const { data, tokenPayload } = req.body as {
      data: TRegisterDriverFormData;
      tokenPayload: JWTPayload;
    };

    const { carRegistrationNumber } = data;

    const carRegistrationNumberHash = createHash(carRegistrationNumber);

    const encryptedData = encryptSensitiveData({
      data,
      keysToEncrypt,
    });

    const driverDto = getDriverDto(encryptedData, tokenPayload);

    const { error } = await supabase.from('Drivers').insert(driverDto);

    if (error) {
      res.status(500).json({ message: 'Failed to register driver', error: getErrorMessage(error) });
    }

    res.status(201).end();
  } catch (error: unknown) {
    res.status(500).json({ message: 'Failed to register driver', error: getErrorMessage(error) });
  }
}
