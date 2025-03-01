import { type NextApiRequest } from 'next/types';

import { TCompleteDriverRegistrationFormData, TDriverRegistrationTokenPayload } from '../types';

const extractCompleteRegistrationData = (body: NextApiRequest['body']) => {
  const { data, tokenPayload } = body as {
    data: TCompleteDriverRegistrationFormData;
    tokenPayload: TDriverRegistrationTokenPayload;
  };
  return { data, tokenPayload };
};

export default extractCompleteRegistrationData;
