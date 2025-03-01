import type { NextApiResponse } from 'next/types';

import CustomResponseError from '@/shared/classes/custom-response-error';

import getErrorMessage from '@/shared/utils/common/get-error-message';

import { TApiResponse } from '@/shared/types/api-response';

const handleRequestError = (res: NextApiResponse<TApiResponse>, error: unknown) => {
  if (error instanceof CustomResponseError) {
    const { statusCode, message } = error;
    res.status(statusCode).json({ message });
  }

  res.status(500).json({ message: getErrorMessage(error) });
};

export default handleRequestError;
