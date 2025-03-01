import changeObjectKeys from '@/shared/utils/server-side/change-object-keys';

import { EDriverCompleteRegistrationFormKeys } from '@/features/driver/enums/driver-complete-registration-form-keys';
import { EDriverRegistrationTokenPayloadKeys } from '@/features/driver/enums/driver-registration-form-keys';

import {
  TDriverEntity,
  TDriverEntityKeys,
  TDriverRegistrationTokenPayload,
  TEncryptedCompleteDriverRegistrationFormData,
} from '@/features/driver/types';

type TGetDriverDtoParams = {
  encryptedDriverData: TEncryptedCompleteDriverRegistrationFormData;
  tokenPayload: TDriverRegistrationTokenPayload;
  passwordHash: string;
  carRegistrationNumberHash: string;
};

const keyToMap = {
  [EDriverRegistrationTokenPayloadKeys.PHONE_NUMBER]: TDriverEntityKeys.PHONE_NUMBER,
  [EDriverRegistrationTokenPayloadKeys.PHONE_NUMBER_HASH]: TDriverEntityKeys.PHONE_NUMBER_HASH,
  [EDriverCompleteRegistrationFormKeys.FIRST_NAME]: TDriverEntityKeys.FIRST_NAME,
  [EDriverCompleteRegistrationFormKeys.LAST_NAME]: TDriverEntityKeys.LAST_NAME,
  [EDriverCompleteRegistrationFormKeys.CAR_REGISTRATION_NUMBER]: TDriverEntityKeys.CAR_NUMBER,
  [EDriverCompleteRegistrationFormKeys.CAR_BRAND]: TDriverEntityKeys.CAR_BRAND,
  [EDriverCompleteRegistrationFormKeys.CAR_COLOR]: TDriverEntityKeys.CAR_COLOR,
  carRegistrationNumberHash: TDriverEntityKeys.CAR_NUMBER_HASH,
};

const getDriverDto = ({
  encryptedDriverData,
  tokenPayload,
  passwordHash,
  carRegistrationNumberHash,
}: TGetDriverDtoParams): TDriverEntity => {
  const driverData = {
    ...encryptedDriverData,
    ...tokenPayload,
    password: passwordHash,
    carRegistrationNumberHash,
  };

  const driverEntity = changeObjectKeys(driverData, keyToMap) as TDriverEntity;

  return driverEntity;
};

export default getDriverDto;
