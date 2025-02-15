import { type JWTPayload, SignJWT, jwtVerify } from 'jose';

const ALGORITHMS = 'HS256';

type TEncryptJwtToken = {
  payload: JWTPayload | undefined;
  expire: string | number | Date;
  secretKey: Uint8Array;
};

export const encryptJwtToken = async ({ payload, expire, secretKey }: TEncryptJwtToken) => {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: ALGORITHMS })
    .setIssuedAt()
    .setExpirationTime(expire)
    .sign(secretKey);
};

type TDecryptJwtToken = {
  token: string;
  secretKey: Uint8Array;
};

export const enum EDecryptJwtTokenErrors {
  EXPIRED_TOKEN = 'tokenHasExpired',
  INVALID_TOKEN = 'invalidToken',
  UNKNOWN_ERROR = 'unknownError',
  FAILED_TO_VERIFY_TOKEN = 'failedToVerifyToken',
}

export const decryptJwtToken = async ({ token, secretKey }: TDecryptJwtToken) => {
  try {
    const { payload } = await jwtVerify(token, secretKey, {
      algorithms: [ALGORITHMS],
    });
    return payload;
  } catch (error) {
    console.log({ error });

    if (error instanceof Error) {
      if (error.message.includes('exp')) {
        return { error: EDecryptJwtTokenErrors.EXPIRED_TOKEN };
      }

      if (error.message.includes('verification failed')) {
        return { error: EDecryptJwtTokenErrors.INVALID_TOKEN };
      }

      return { error: EDecryptJwtTokenErrors.UNKNOWN_ERROR };
    }

    return { error: EDecryptJwtTokenErrors.FAILED_TO_VERIFY_TOKEN };
  }
};
