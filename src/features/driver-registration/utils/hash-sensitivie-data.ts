import createHash from '@/shared/utils/server-side/create-hash';

import { EDriverCompleteRegistrationFormKeys } from '@/features/driver-registration/enums/driver-complete-registration-form-keys';

import { TCompleteDriverRegistrationFormData } from '@/features/driver-registration/types';

const hashSensitiveData = (data: TCompleteDriverRegistrationFormData) => {
  const passwordHash = createHash(data[EDriverCompleteRegistrationFormKeys.PASSWORD]);

  const carRegistrationNumberHash = createHash(
    data[EDriverCompleteRegistrationFormKeys.CAR_REGISTRATION_NUMBER],
  );

  return { carRegistrationNumberHash, passwordHash };
};

export default hashSensitiveData;
