import changeObjectKeys from '@/shared/utils/server-side/change-object-keys';

import { EDriverCompleteRegistrationFormKeys } from '@/features/driver-registration/enums/driver-complete-registration-form-keys';
import { EDriverEntityKeys } from '@/shared/enums/driver-entity-keys';

import { TInitialDriverEntityData } from '@/features/driver-registration/types/driver-registration';
import { TDriverEntity } from '@/shared/types/driver-entity';

import { EDriverRegistrationTokenPayloadKeys } from '../enums/driver-registration-form-keys';

type TGetDriverDtoArgs = {
  data: TInitialDriverEntityData;
  authUserId: string;
};

const keyToMap = {
  [EDriverRegistrationTokenPayloadKeys.PHONE_NUMBER]: EDriverEntityKeys.PHONE_NUMBER,
  [EDriverRegistrationTokenPayloadKeys.PHONE_NUMBER_HASH]: EDriverEntityKeys.PHONE_NUMBER_HASH,
  [EDriverCompleteRegistrationFormKeys.FIRST_NAME]: EDriverEntityKeys.FIRST_NAME,
  [EDriverCompleteRegistrationFormKeys.LAST_NAME]: EDriverEntityKeys.LAST_NAME,
  authUserId: EDriverEntityKeys.AUTH_USER_ID,
};

const getDriverDto = ({ data, authUserId }: TGetDriverDtoArgs): TDriverEntity =>
  changeObjectKeys({ ...data, authUserId }, keyToMap) as TDriverEntity;

export default getDriverDto;
