import { createDecipheriv } from 'crypto';

import { ALGORITHM, ENCODING } from '@/shared/consts/encryption';

const ENCRYPT_SECRET = process.env.ENCRYPT_SECRET as string;

export const decryptText = (text: string): string => {
  const textParts = text.split(':');

  const iv = Buffer.from(textParts.shift()!, ENCODING);
  const encryptedText = Buffer.from(textParts.join(':'), ENCODING);

  const keyBuffer = Buffer.from(ENCRYPT_SECRET, ENCODING);

  const decipher = createDecipheriv(ALGORITHM, keyBuffer, iv);

  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);

  return decrypted.toString();
};
