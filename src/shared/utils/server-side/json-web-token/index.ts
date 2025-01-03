import { JWTPayload, SignJWT, jwtVerify } from 'jose';

const ALGORITHMS = 'HS256';

type TEncryptJwtToken = {
  payload: JWTPayload | undefined;
  expire: string | number | Date;
  secretKey: Uint8Array;
};

export async function encryptJwtToken({ payload, expire, secretKey }: TEncryptJwtToken) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: ALGORITHMS })
    .setIssuedAt()
    .setExpirationTime(expire)
    .sign(secretKey);
}

type TDecryptJwtToken = {
  token: string;
  secretKey: Uint8Array;
};

export async function decryptJwtToken({ token, secretKey }: TDecryptJwtToken) {
  try {
    const { payload } = await jwtVerify(token, secretKey, {
      algorithms: [ALGORITHMS],
    });
    return payload;
  } catch {
    console.log('Failed to verify token');
  }
}
