import { z } from 'zod';

import { EDriverCompleteRegisterFormKeys } from '@/features/driver/enums/driver-complete-register-form-keys';
import { EErrorKeys } from '@/shared/enums/error-keys';

export const driverCompleteRegisterFormSchema = z.object({
  [EDriverCompleteRegisterFormKeys.PASSWORD]: z
    .string()
    .min(8, EErrorKeys.PASSWORD_MINIMUM_CHARACTERS)
    .regex(/[A-Z]/, EErrorKeys.PASSWORD_UPPER_CASE)
    .regex(/[a-z]/, EErrorKeys.PASSWORD_LOWER_CASE)
    .regex(/[0-9]/, EErrorKeys.PASSWORD_DIGIT)
    .regex(
      /[\!\@\#\$\%\^\&\*\(\)\_\+\-\=\[\]\{\}\;\:\'\"\,\<\.\>\/\?\|\\\`~]/,
      EErrorKeys.PASSWORD_SPECIAL_CHARACTER,
    ),
});

export type TDriverCompleteRegisterFormSchema = z.infer<typeof driverCompleteRegisterFormSchema>;

export type TDriverCompleteRegisterFormSchemaError = z.inferFlattenedErrors<
  typeof driverCompleteRegisterFormSchema
>;
