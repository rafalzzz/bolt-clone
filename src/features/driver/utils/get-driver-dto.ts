import type { JWTPayload } from 'jose';

import { EDriverCompleteRegistrationFormKeys } from '@/features/driver/enums/driver-complete-registration-form-keys';
import { EDriverRegistrationFormKeys } from '@/features/driver/enums/driver-registration-form-keys';

import { TDriverEntityKeys, TRegisterDriverFormData } from '@/features/driver/types';

const getDriverDto = (data: TRegisterDriverFormData, tokenPayload: JWTPayload) => ({
  [TDriverEntityKeys.EMAIL]: tokenPayload[EDriverRegistrationFormKeys.EMAIL],
  [TDriverEntityKeys.PHONE_NUMBER]: tokenPayload[EDriverRegistrationFormKeys.PHONE_NUMBER],
  [TDriverEntityKeys.CITY]: tokenPayload[EDriverRegistrationFormKeys.CITY],
  [TDriverEntityKeys.FIRST_NAME]: data[EDriverCompleteRegistrationFormKeys.FIRST_NAME],
  [TDriverEntityKeys.LAST_NAME]: data[EDriverCompleteRegistrationFormKeys.LAST_NAME],
  [TDriverEntityKeys.CAR_NUMBER]: data[EDriverCompleteRegistrationFormKeys.CAR_REGISTRATION_NUMBER],
  [TDriverEntityKeys.PASSWORD]: data[EDriverCompleteRegistrationFormKeys.PASSWORD],
  [TDriverEntityKeys.TERMS]: true,
});

export default getDriverDto;
