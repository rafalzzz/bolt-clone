import { z } from 'zod';

import { EDriverRegistrationFormKeys } from '@/features/driver/enums/driver-registration-form-keys';
import { EErrorKeys } from '@/shared/enums/error-keys';

export const driverRegistrationFormSchema = z.object({
  [EDriverRegistrationFormKeys.EMAIL]: z
    .string()
    .nonempty(EErrorKeys.REQUIRED_EMAIL)
    .email(EErrorKeys.INVALID_EMAIL),
  [EDriverRegistrationFormKeys.PHONE_NUMBER]: z
    .string()
    .nonempty(EErrorKeys.REQUIRED_PHONE_NUMBER)
    .regex(/^\D*(\d\D*){9}$/, EErrorKeys.INVALID_PHONE_NUMBER),
  [EDriverRegistrationFormKeys.CITY]: z.string({ message: EErrorKeys.REQUIRED_CITY }).nonempty({
    message: EErrorKeys.REQUIRED_CITY,
  }),
  [EDriverRegistrationFormKeys.RULES]: z.boolean().refine((val) => val, {
    message: EErrorKeys.REQUIRED_RULES,
  }),
});

export type TDriverRegistrationFormSchema = z.infer<typeof driverRegistrationFormSchema>;

export type TDriverRegistrationFormSchemaError = z.inferFlattenedErrors<
  typeof driverRegistrationFormSchema
>;
