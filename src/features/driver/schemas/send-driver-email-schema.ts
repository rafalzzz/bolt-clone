import { z } from 'zod';

import { EDriverRegisterFormKeys } from '@/features/driver/enums/driver-register-form-keys';
import { EErrorKeys } from '@/shared/enums/error-keys';

export const sendDriverEmailSchema = z.object({
  [EDriverRegisterFormKeys.EMAIL]: z
    .string()
    .nonempty(EErrorKeys.REQUIRED_EMAIL)
    .email(EErrorKeys.INVALID_EMAIL),
  [EDriverRegisterFormKeys.PHONE_NUMBER]: z
    .string()
    .nonempty(EErrorKeys.REQUIRED_PHONE_NUMBER)
    .regex(/^\D*(\d\D*){9}$/, EErrorKeys.REQUIRED_PHONE_NUMBER),
  [EDriverRegisterFormKeys.CITY]: z.string().nonempty(EErrorKeys.REQUIRED_CITY),
  [EDriverRegisterFormKeys.RULES]: z
    .string()
    .optional()
    .refine((val) => val !== undefined, {
      message: EErrorKeys.REQUIRED_RULES,
    }),
});

export type TSendDriverEmailSchema = z.infer<typeof sendDriverEmailSchema>;

export type TSendDriverEmailSchemaError = z.inferFlattenedErrors<typeof sendDriverEmailSchema>;
