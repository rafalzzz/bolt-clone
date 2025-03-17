import CustomResponseError from '@/shared/classes/custom-response-error';

import getErrorMessage from '@/shared/utils/common/get-error-message';
import sendResponse from '@/shared/utils/server-side/send-response';

const handleRequestError = (error: unknown) => {
  if (error instanceof CustomResponseError) {
    const { status, message } = error;

    return sendResponse({
      body: { message },
      status,
    });
  }

  return sendResponse({
    body: { message: getErrorMessage(error) },
    status: 500,
  });
};

export default handleRequestError;
