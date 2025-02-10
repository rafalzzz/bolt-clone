import { encryptJwtToken } from '@/shared/utils/server-side/json-web-token';
import { encodeSecretKey } from '@/shared/utils/server-side/secret-key';

import type { TDriverRegistrationFormSchema } from '@/features/driver/schemas/driver-register-form-schema';

const REGISTER_DRIVER_TOKEN_SECRET_KEY = process.env.REGISTER_DRIVER_TOKEN_SECRET_KEY;
const TOKEN_EXPIRATION = '3d';

export async function generateDriverRegistrationToken({
  email,
  phoneNumber,
  city,
}: TDriverRegistrationFormSchema) {
  if (!REGISTER_DRIVER_TOKEN_SECRET_KEY) {
    throw new Error('Missing REGISTER_DRIVER_TOKEN_SECRET_KEY env variable');
  }

  return encryptJwtToken({
    payload: { email, phoneNumber, city },
    expire: TOKEN_EXPIRATION,
    secretKey: encodeSecretKey(REGISTER_DRIVER_TOKEN_SECRET_KEY),
  });
}
