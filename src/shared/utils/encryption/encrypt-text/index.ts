import { createCipheriv } from 'crypto';

import { ALGORITHM, ENCODING } from '@/shared/consts/encryption';

const ENCRYPT_KEY = process.env.ENCRYPT_KEY as string;
const ENCRYPT_IV = process.env.ENCRYPT_IV as string;

export const encryptText = (text: string): string => {
  const keyBuffer = Buffer.from(ENCRYPT_KEY, ENCODING);
  const ivBuffer = Buffer.from(ENCRYPT_IV, ENCODING);

  const cipher = createCipheriv(ALGORITHM, keyBuffer, ivBuffer);

  let encrypted = cipher.update(text, 'utf8');
  encrypted = Buffer.concat([encrypted, cipher.final()]);

  return ivBuffer.toString(ENCODING) + ':' + encrypted.toString(ENCODING);
};
