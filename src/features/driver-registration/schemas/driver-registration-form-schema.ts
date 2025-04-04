import { z } from 'zod';

import emailValidation from '@/shared/utils/client-side/validations/email-validation';

import { EDriverRegistrationFormKeys } from '@/features/driver-registration/enums/driver-registration-form-keys';
import { EErrorKeys } from '@/shared/enums/error-keys';

import { PHONE_NUMBER_REGEX } from '@/shared/consts/regex';

export const driverRegistrationFormSchema = z.object({
  [EDriverRegistrationFormKeys.EMAIL]: emailValidation,
  [EDriverRegistrationFormKeys.PHONE_NUMBER]: z
    .string()
    .nonempty(EErrorKeys.REQUIRED_FIELD)
    .regex(PHONE_NUMBER_REGEX, EErrorKeys.INVALID_PHONE_NUMBER),
  [EDriverRegistrationFormKeys.CITY]: z.string({ message: EErrorKeys.REQUIRED_FIELD }).nonempty({
    message: EErrorKeys.REQUIRED_FIELD,
  }),
  [EDriverRegistrationFormKeys.RULES]: z.boolean().refine((val) => val, {
    message: EErrorKeys.REQUIRED_FIELD,
  }),
});

export type TDriverRegistrationFormSchema = z.infer<typeof driverRegistrationFormSchema>;

export type TDriverRegistrationFormSchemaError = z.inferFlattenedErrors<
  typeof driverRegistrationFormSchema
>;
