import { supabase } from '@/lib/supabase';

import CustomResponseError from '@/shared/classes/custom-response-error';

import getErrorMessage from '@/shared/utils/common/get-error-message';

import { EDriverRegistrationTokenPayloadKeys } from '@/features/driver-registration/enums/driver-registration-form-keys';
import { EDriverEntityKeys } from '@/shared/enums/driver-entity-keys';

type TDriverData = Record<EDriverEntityKeys.PHONE_NUMBER_HASH | EDriverEntityKeys.EMAIL, string>;

type TNewDriverData = Record<
  EDriverRegistrationTokenPayloadKeys.PHONE_NUMBER_HASH | EDriverRegistrationTokenPayloadKeys.EMAIL,
  string
>;

type THandleUniqueColumnsCheckParams = Record<
  | EDriverRegistrationTokenPayloadKeys.EMAIL
  | EDriverRegistrationTokenPayloadKeys.PHONE_NUMBER_HASH
  | 'takenEmailMessage'
  | 'takenPhoneNumberMessage',
  string
>;

const checkUniqueDriverColumns = async (email: string, phoneNumberHash: string) =>
  await supabase
    .from('Drivers')
    .select(`${EDriverEntityKeys.EMAIL}, ${EDriverEntityKeys.PHONE_NUMBER_HASH}`)
    .or(
      `${EDriverEntityKeys.EMAIL}.eq.${email}, ${EDriverEntityKeys.PHONE_NUMBER_HASH}.eq.${phoneNumberHash}`,
    )
    .maybeSingle();

const areDriverUniqueColumnsTaken = (driver: TDriverData | null, newDriver: TNewDriverData) => {
  if (!driver) {
    return { isEmailTaken: false, isPhoneNumberTaken: false };
  }

  const isEmailTaken =
    driver[EDriverEntityKeys.EMAIL] === newDriver[EDriverRegistrationTokenPayloadKeys.EMAIL];

  const isPhoneNumberTaken =
    driver[EDriverEntityKeys.PHONE_NUMBER_HASH] ===
    newDriver[EDriverRegistrationTokenPayloadKeys.PHONE_NUMBER_HASH];

  return { isEmailTaken, isPhoneNumberTaken };
};

const handleUniqueColumnsCheck = async ({
  phoneNumberHash,
  email,
  takenEmailMessage,
  takenPhoneNumberMessage,
}: THandleUniqueColumnsCheckParams) => {
  const { data: driver, error: findDriverError } = await checkUniqueDriverColumns(
    email,
    phoneNumberHash,
  );

  if (findDriverError) {
    throw findDriverError;
  }

  const { isEmailTaken, isPhoneNumberTaken } = areDriverUniqueColumnsTaken(driver, {
    email,
    phoneNumberHash,
  });

  if (isEmailTaken) {
    throw new CustomResponseError(409, takenEmailMessage);
  }

  if (isPhoneNumberTaken) {
    throw new CustomResponseError(409, takenPhoneNumberMessage);
  }
};

export default handleUniqueColumnsCheck;
