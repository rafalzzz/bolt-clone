import { z } from 'zod';

import { EDriverCompleteRegistrationFormKeys } from '@/features/driver/enums/driver-complete-registration-form-keys';
import { EErrorKeys } from '@/shared/enums/error-keys';

import {
  ONLY_DIGITS_REGEX,
  ONLY_LETTERS_WITH_POLISH_SIGNS_REGEX,
  ONLY_LOWERCASE_LETTERS_REGEX,
  ONLY_UPPERCASE_LETTERS_REGEX,
  ONLY_LETTERS_REGEX,
  ONLY_LETTERS_AND_DIGITS_REGEX,
  CAR_REGISTRATION_NUMBER_REGEX,
  SPECIAL_CHARACTER_REGEX,
} from '@/shared/consts/regex';

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
    [EDriverCompleteRegistrationFormKeys.PASSWORD]: z
      .string()
      .nonempty(EErrorKeys.REQUIRED_FIELD)
      .min(8, EErrorKeys.PASSWORD_MINIMUM_CHARACTERS)
      .regex(ONLY_UPPERCASE_LETTERS_REGEX, EErrorKeys.PASSWORD_UPPER_CASE)
      .regex(ONLY_LOWERCASE_LETTERS_REGEX, EErrorKeys.PASSWORD_LOWER_CASE)
      .regex(ONLY_DIGITS_REGEX, EErrorKeys.PASSWORD_DIGIT)
      .regex(SPECIAL_CHARACTER_REGEX, EErrorKeys.PASSWORD_SPECIAL_CHARACTER),
    [EDriverCompleteRegistrationFormKeys.REPEAT_PASSWORD]: z
      .string()
      .nonempty(EErrorKeys.REQUIRED_FIELD),
    [EDriverCompleteRegistrationFormKeys.CAR_REGISTRATION_NUMBER]: z
      .string()
      .nonempty(EErrorKeys.REQUIRED_FIELD)
      .min(4, EErrorKeys.MINIMUM_REQUIRED_CHARACTERS)
      .regex(CAR_REGISTRATION_NUMBER_REGEX, EErrorKeys.CAR_REGISTRATION_NUMBER_CHARACTERS),
    [EDriverCompleteRegistrationFormKeys.CAR_BRAND]: z
      .string()
      .nonempty(EErrorKeys.REQUIRED_FIELD)
      .min(2, EErrorKeys.MINIMUM_REQUIRED_CHARACTERS)
      .regex(ONLY_LETTERS_REGEX, EErrorKeys.ONLY_LETTERS),
    [EDriverCompleteRegistrationFormKeys.CAR_MODEL]: z
      .string()
      .nonempty(EErrorKeys.REQUIRED_FIELD)
      .min(2, EErrorKeys.MINIMUM_REQUIRED_CHARACTERS)
      .regex(ONLY_LETTERS_AND_DIGITS_REGEX, EErrorKeys.ONLY_LETTERS_AND_DIGITS),
    [EDriverCompleteRegistrationFormKeys.CAR_COLOR]: z
      .string()
      .optional()
      .refine((val) => val !== undefined && val.trim() !== '', {
        message: EErrorKeys.REQUIRED_FIELD,
      }),
    [EDriverCompleteRegistrationFormKeys.FILE]: z
      .any()
      .refine((file) => file instanceof File && file.size, {
        message: EErrorKeys.REQUIRED_FACIAL_RECOGNITION,
      }),
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
