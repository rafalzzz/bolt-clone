import changeObjectKeys from '@/shared/utils/server-side/change-object-keys';

import { TAddCarFormSchema } from '@/features/add-car/schemas/add-car-form-schema';

import { ECarEntityKeys } from '@/shared/enums/car-entity-keys';

import { TCarEntity } from '@/shared/types/car-entity';

import { EAddCarFormKeys } from '../enums/add-car-form-keys';

type TGetDriverDtoArgs = {
  data: TAddCarFormSchema;
  carRegistrationNumberHash: string;
  authUserId: string;
};

const keyToMap = {
  [EAddCarFormKeys.CAR_REGISTRATION_NUMBER]: ECarEntityKeys.CAR_REGISTRATION_NUMBER,
  [EAddCarFormKeys.CAR_BRAND]: ECarEntityKeys.CAR_BRAND,
  [EAddCarFormKeys.CAR_MODEL]: ECarEntityKeys.CAR_MODEL,
  [EAddCarFormKeys.CAR_COLOR]: ECarEntityKeys.CAR_COLOR,
  carRegistrationNumberHash: ECarEntityKeys.CAR_NUMBER_REGISTRATION_HASH,
  authUserId: ECarEntityKeys.AUTH_USER_ID,
};

const getCarDto = ({
  data,
  carRegistrationNumberHash,
  authUserId,
}: TGetDriverDtoArgs): TCarEntity =>
  changeObjectKeys({ ...data, carRegistrationNumberHash, authUserId }, keyToMap) as TCarEntity;

export default getCarDto;
