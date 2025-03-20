import { ECarEntityKeys } from '../enums/car-entity-keys';

export type TCarEntity = {
  [ECarEntityKeys.AUTH_USER_ID]: string;
  [ECarEntityKeys.CAR_NUMBER]?: string;
  [ECarEntityKeys.CAR_NUMBER_HASH]?: string;
  [ECarEntityKeys.CAR_BRAND]?: string;
  [ECarEntityKeys.CAR_MODEL]?: string;
  [ECarEntityKeys.CAR_COLOR]?: string;
};
