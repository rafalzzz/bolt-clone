import type { NextApiRequest } from 'next/types';

import {
  TCompleteDriverRegistrationFormData,
  TDriverRegistrationTokenPayload,
} from '@/features/driver/types';

const extractCompleteRegistrationData = (body: NextApiRequest['body']) => {
  const { data, tokenPayload } = body as {
    data: TCompleteDriverRegistrationFormData;
    tokenPayload: TDriverRegistrationTokenPayload;
  };
  return { data, tokenPayload };
};

export default extractCompleteRegistrationData;
