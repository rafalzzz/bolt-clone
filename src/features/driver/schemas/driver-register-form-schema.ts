import { z } from 'zod';

import { EDriverRegisterFormKeys } from '@/features/driver/enums/driver-register-form-keys';
import { EErrorKeys } from '@/shared/enums/error-keys';

export const driverRegisterFormSchema = z.object({
  [EDriverRegisterFormKeys.EMAIL]: z
    .string()
    .nonempty(EErrorKeys.REQUIRED_EMAIL)
    .email(EErrorKeys.INVALID_EMAIL),
  [EDriverRegisterFormKeys.PHONE_NUMBER]: z
    .string()
    .nonempty(EErrorKeys.REQUIRED_PHONE_NUMBER)
    .regex(/^\D*(\d\D*){9}$/, EErrorKeys.INVALID_PHONE_NUMBER),
  [EDriverRegisterFormKeys.CITY]: z.string({ message: EErrorKeys.REQUIRED_CITY }).nonempty({
    message: EErrorKeys.REQUIRED_CITY,
  }),
  [EDriverRegisterFormKeys.RULES]: z.boolean().refine((val) => val, {
    message: EErrorKeys.REQUIRED_RULES,
  }),
});

export type TDriverRegisterFormSchema = z.infer<typeof driverRegisterFormSchema>;

export type TDriverRegisterFormSchemaError = z.inferFlattenedErrors<
  typeof driverRegisterFormSchema
>;
