import changeObjectKeys from '@/shared/utils/server-side/change-object-keys';

import { EDriverCompleteRegistrationFormKeys } from '@/features/driver-registration/enums/driver-complete-registration-form-keys';
import { EDriverEntityKeys } from '@/features/driver-registration/enums/driver-entity-keys';
import { EDriverRegistrationTokenPayloadKeys } from '@/features/driver-registration/enums/driver-registration-form-keys';

import {
  TDriverEntity,
  TEncryptedCompleteDriverRegistrationFormData,
} from '@/features/driver-registration/types';

type TGetDriverDtoParams = {
  encryptedDriverData: TEncryptedCompleteDriverRegistrationFormData;
  passwordHash: string;
  carRegistrationNumberHash: string;
};

const keyToMap = {
  [EDriverRegistrationTokenPayloadKeys.PHONE_NUMBER]: EDriverEntityKeys.PHONE_NUMBER,
  [EDriverRegistrationTokenPayloadKeys.PHONE_NUMBER_HASH]: EDriverEntityKeys.PHONE_NUMBER_HASH,
  [EDriverCompleteRegistrationFormKeys.FIRST_NAME]: EDriverEntityKeys.FIRST_NAME,
  [EDriverCompleteRegistrationFormKeys.LAST_NAME]: EDriverEntityKeys.LAST_NAME,
  [EDriverCompleteRegistrationFormKeys.CAR_REGISTRATION_NUMBER]: EDriverEntityKeys.CAR_NUMBER,
  [EDriverCompleteRegistrationFormKeys.CAR_BRAND]: EDriverEntityKeys.CAR_BRAND,
  [EDriverCompleteRegistrationFormKeys.CAR_MODEL]: EDriverEntityKeys.CAR_MODEL,
  [EDriverCompleteRegistrationFormKeys.CAR_COLOR]: EDriverEntityKeys.CAR_COLOR,
  [EDriverCompleteRegistrationFormKeys.FILE]: EDriverEntityKeys.FILE_URL,
  carRegistrationNumberHash: EDriverEntityKeys.CAR_NUMBER_HASH,
};

const getDriverDto = ({
  encryptedDriverData,
  passwordHash,
  carRegistrationNumberHash,
}: TGetDriverDtoParams): TDriverEntity => {
  const driverData = {
    ...encryptedDriverData,
    password: passwordHash,
    carRegistrationNumberHash,
  };

  const driverEntity = changeObjectKeys(driverData, keyToMap) as TDriverEntity;

  return driverEntity;
};

export default getDriverDto;
