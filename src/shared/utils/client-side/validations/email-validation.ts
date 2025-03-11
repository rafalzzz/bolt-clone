import { z } from 'zod';

import { EErrorKeys } from '@/shared/enums/error-keys';

const emailValidation = z
  .string()
  .nonempty(EErrorKeys.REQUIRED_FIELD)
  .email(EErrorKeys.INVALID_EMAIL);

export default emailValidation;
