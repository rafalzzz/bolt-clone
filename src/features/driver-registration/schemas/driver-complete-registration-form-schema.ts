import { z } from 'zod';

import passwordValidation from '@/shared/utils/client-side/validations/password-validation';

import { EDriverCompleteRegistrationFormKeys } from '@/features/driver-registration/enums/driver-complete-registration-form-keys';
import { EErrorKeys } from '@/shared/enums/error-keys';

import { ONLY_LETTERS_WITH_POLISH_SIGNS_REGEX } from '@/shared/consts/regex';

export const driverCompleteRegistrationFormSchema = z
  .object({
    [EDriverCompleteRegistrationFormKeys.FIRST_NAME]: z
      .string()
      .nonempty(EErrorKeys.REQUIRED_FIELD)
      .min(3, EErrorKeys.MINIMUM_REQUIRED_CHARACTERS)
      .regex(ONLY_LETTERS_WITH_POLISH_SIGNS_REGEX, EErrorKeys.ONLY_LETTERS),
    [EDriverCompleteRegistrationFormKeys.LAST_NAME]: z
      .string()
      .nonempty(EErrorKeys.REQUIRED_FIELD)
      .min(3, EErrorKeys.MINIMUM_REQUIRED_CHARACTERS)
      .regex(ONLY_LETTERS_WITH_POLISH_SIGNS_REGEX, EErrorKeys.ONLY_LETTERS),
    [EDriverCompleteRegistrationFormKeys.PASSWORD]: passwordValidation,
    [EDriverCompleteRegistrationFormKeys.REPEAT_PASSWORD]: z
      .string()
      .nonempty(EErrorKeys.REQUIRED_FIELD),
  })
  .refine(
    (data) =>
      data[EDriverCompleteRegistrationFormKeys.PASSWORD] ===
      data[EDriverCompleteRegistrationFormKeys.REPEAT_PASSWORD],
    {
      message: EErrorKeys.PASSWORDS_MUST_MATCH,
      path: [EDriverCompleteRegistrationFormKeys.REPEAT_PASSWORD],
    },
  );

export type TDriverCompleteRegistrationFormSchema = z.infer<
  typeof driverCompleteRegistrationFormSchema
>;

export type TDriverCompleteRegistrationFormSchemaError = z.inferFlattenedErrors<
  typeof driverCompleteRegistrationFormSchema
>;
