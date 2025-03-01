import { supabase } from '@/lib/supabase';

import CustomResponseError from '@/shared/classes/custom-response-error';

import getErrorMessage from '@/shared/utils/common/get-error-message';

const checkUniqueDriverColumns = async (phoneNumberHash: string, email: string) =>
  await supabase
    .from('Drivers')
    .select('phone_number_hash, email')
    .or(`phone_number_hash.eq.${phoneNumberHash},email.eq.${email}`)
    .maybeSingle();

type TDriverData = {
  phone_number_hash: string;
  email: string;
};

type TNewDriverData = {
  phoneNumberHash: string;
  email: string;
};

const areDriverUniqueColumnsTaken = (
  driver: TDriverData | null,
  { email, phoneNumberHash }: TNewDriverData,
) => {
  if (!driver) {
    return { isEmailTaken: false, isPhoneNumberTaken: false };
  }

  const { phone_number_hash: driverPhoneNumberHash, email: driverEmail } = driver;

  const isEmailTaken = driverEmail === email;
  const isPhoneNumberTaken = driverPhoneNumberHash === phoneNumberHash;

  return { isEmailTaken, isPhoneNumberTaken };
};

const handleUniqueColumnsCheck = async ({
  phoneNumberHash,
  email,
  takenEmailMessage,
  takenPhoneNumberMessage,
}: Record<
  'phoneNumberHash' | 'email' | 'takenEmailMessage' | 'takenPhoneNumberMessage',
  string
>) => {
  const { data: driver, error: findDriverError } = await checkUniqueDriverColumns(
    phoneNumberHash,
    email,
  );

  if (findDriverError) {
    throw new Error(getErrorMessage(findDriverError));
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
