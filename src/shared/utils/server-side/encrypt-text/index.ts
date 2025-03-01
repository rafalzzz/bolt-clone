import { createCipheriv, randomBytes } from 'crypto';

import { ALGORITHM, ENCODING } from '@/shared/consts/encryption';

const ENCRYPT_SECRET = process.env.ENCRYPT_SECRET as string;

const IV_SIZE = 16;

const generateIV = () => randomBytes(IV_SIZE);

export const encryptText = (text: string): string => {
  const keyBuffer = Buffer.from(ENCRYPT_SECRET, ENCODING);
  const ivBuffer = generateIV();

  const cipher = createCipheriv(ALGORITHM, keyBuffer, ivBuffer);

  let encrypted = cipher.update(text, 'utf8');
  encrypted = Buffer.concat([encrypted, cipher.final()]);

  return ivBuffer.toString(ENCODING) + ':' + encrypted.toString(ENCODING);
};
