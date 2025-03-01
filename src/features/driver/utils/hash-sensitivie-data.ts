import createHash from '@/shared/utils/server-side/create-hash';

import { TCompleteDriverRegistrationFormData } from '../types';

const hashSensitiveData = (data: TCompleteDriverRegistrationFormData) => {
  const { carRegistrationNumber, password } = data;

  const passwordHash = createHash(password);
  const carRegistrationNumberHash = createHash(carRegistrationNumber);

  return { carRegistrationNumberHash, passwordHash };
};

export default hashSensitiveData;
