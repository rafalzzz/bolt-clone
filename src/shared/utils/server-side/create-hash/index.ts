import { createHmac } from 'crypto';

import { ENCODING } from '@/shared/consts/encryption';

const HASH_SECRET = process.env.HASH_SECRET as string;

const createHash = (text: string) =>
  createHmac('sha256', HASH_SECRET).update(text).digest(ENCODING);

export default createHash;
