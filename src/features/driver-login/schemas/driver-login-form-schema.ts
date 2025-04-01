import { z } from 'zod';

import emailValidation from '@/shared/utils/client-side/validations/email-validation';
import passwordValidation from '@/shared/utils/client-side/validations/password-validation';

import { EDriverLoginFormKeys } from '@/features/driver-login/enums/driver-login-form-keys';

export const driverLoginFormSchema = z.object({
  [EDriverLoginFormKeys.EMAIL]: emailValidation,
  [EDriverLoginFormKeys.PASSWORD]: passwordValidation,
});

export type TDriverLoginFormSchema = z.infer<typeof driverLoginFormSchema>;
export type TDriverLoginFormSchemaError = z.inferFlattenedErrors<typeof driverLoginFormSchema>;
