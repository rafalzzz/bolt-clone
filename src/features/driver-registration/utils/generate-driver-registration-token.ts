import CustomResponseError from '@/shared/classes/custom-response-error';

import { encryptJwtToken } from '@/shared/utils/server-side/json-web-token';
import { encodeSecretKey } from '@/shared/utils/server-side/secret-key';

import { TDriverRegistrationTokenPayload } from '@/features/driver-registration/types/driver-registration';

const REGISTER_DRIVER_TOKEN_SECRET_KEY = process.env.REGISTER_DRIVER_TOKEN_SECRET_KEY;
const TOKEN_EXPIRATION = '3d';

export async function generateDriverRegistrationToken(payload: TDriverRegistrationTokenPayload) {
  if (!REGISTER_DRIVER_TOKEN_SECRET_KEY) {
    throw new CustomResponseError(500, 'Missing REGISTER_DRIVER_TOKEN_SECRET_KEY env variable');
  }

  return encryptJwtToken({
    payload,
    expire: TOKEN_EXPIRATION,
    secretKey: encodeSecretKey(REGISTER_DRIVER_TOKEN_SECRET_KEY),
  });
}
