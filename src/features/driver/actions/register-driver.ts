'use server';

import { JWTPayload } from 'jose';

import { supabase } from '@/lib/supabase';

import getDriverDto from '@/features/driver/utils/get-driver-dto';
import encryptSensitiveData from '@/shared/utils/server-side/encrypt-sensitive-data';
import throwError from '@/shared/utils/server-side/throw-error';

import { EDriverCompleteRegistrationFormKeys } from '@/features/driver/enums/driver-complete-registration-form-keys';

import { TRegisterDriverFormData } from '@/features/driver/types';

const keysToEcrypt = [
  EDriverCompleteRegistrationFormKeys.PASSWORD,
  EDriverCompleteRegistrationFormKeys.VEHICLE_REGISTRATION_NUMBER,
];

export async function registerDriver(data: TRegisterDriverFormData, tokenPayload: JWTPayload) {
  try {
    const encryptedData = encryptSensitiveData<TRegisterDriverFormData>({
      data,
      keysToEcrypt,
    });

    const driverDto = getDriverDto(encryptedData, tokenPayload);

    const { error } = await supabase.from('Drivers').insert(driverDto);

    if (error) {
      throwError(error);
    }
  } catch (error: unknown) {
    throwError(error);
  }
}
