import { EDriverEntityKeys } from '@/shared/enums/driver-entity-keys';

export type TDriverEntity = {
  [EDriverEntityKeys.AUTH_USER_ID]: string;
  [EDriverEntityKeys.EMAIL]: string;
  [EDriverEntityKeys.FIRST_NAME]: string;
  [EDriverEntityKeys.LAST_NAME]: string;
  [EDriverEntityKeys.PHONE_NUMBER]: string;
  [EDriverEntityKeys.PHONE_NUMBER_HASH]: string;
  [EDriverEntityKeys.CITY]: string;
  [EDriverEntityKeys.PASSWORD]: string;
  [EDriverEntityKeys.FILE_URL]?: string;
};
