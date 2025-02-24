'use server';

import encryptSensitiveData from '@/shared/utils/server-side/encrypt-sensitive-data';

import { EDriverCompleteRegistrationFormKeys } from '@/features/driver/enums/driver-complete-registration-form-keys';

import { TDriverItem, TDriverRegistrationFormData } from '@/features/driver/types';

const keysToEcrypt = [
  EDriverCompleteRegistrationFormKeys.PASSWORD,
  EDriverCompleteRegistrationFormKeys.VEHICLE_REGISTRATION_NUMBER,
];

const keysToOmit = [EDriverCompleteRegistrationFormKeys.REPEAT_PASSWORD];

export async function registerDriver(data: TDriverRegistrationFormData) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const encryptedData = encryptSensitiveData<TDriverRegistrationFormData, TDriverItem>({
    data,
    keysToEcrypt,
    keysToOmit,
  });

  // TODO - save registered driver in Database

  return { isSuccess: true };
}
