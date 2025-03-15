import CustomResponseError from '@/shared/classes/custom-response-error';

import { METHOD_NOT_ALLOWED } from '@/shared/consts/response-messages';

type TMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

const checkMethod = (expectedMethod: TMethod, method = '') => {
  if (method !== expectedMethod) {
    throw new CustomResponseError(405, METHOD_NOT_ALLOWED);
  }
};

export default checkMethod;
