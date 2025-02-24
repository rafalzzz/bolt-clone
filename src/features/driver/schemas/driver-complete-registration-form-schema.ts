import { z } from 'zod';

import { EDriverCompleteRegistrationFormKeys } from '@/features/driver/enums/driver-complete-registration-form-keys';
import { EErrorKeys } from '@/shared/enums/error-keys';

const ONLY_LETTERS_REGEX = /^[A-Za-z]+$/;

export const driverCompleteRegistrationFormSchema = z
  .object({
    [EDriverCompleteRegistrationFormKeys.FIRST_NAME]: z
      .string()
      .nonempty(EErrorKeys.REQUIRED_FIRST_NAME)
      .min(2, EErrorKeys.FIRST_NAME_MINIMUM_CHARACTERS)
      .regex(ONLY_LETTERS_REGEX, EErrorKeys.FIRST_NAME_CHARACTERS),
    [EDriverCompleteRegistrationFormKeys.LAST_NAME]: z
      .string()
      .nonempty(EErrorKeys.REQUIRED_LAST_NAME)
      .min(2, EErrorKeys.LAST_NAME_MINIMUM_CHARACTERS)
      .regex(ONLY_LETTERS_REGEX, EErrorKeys.LAST_NAME_CHARACTERS),
    [EDriverCompleteRegistrationFormKeys.PASSWORD]: z
      .string()
      .nonempty(EErrorKeys.REQUIRED_PASSWORD)
      .min(8, EErrorKeys.PASSWORD_MINIMUM_CHARACTERS)
      .regex(/[A-Z]/, EErrorKeys.PASSWORD_UPPER_CASE)
      .regex(/[a-z]/, EErrorKeys.PASSWORD_LOWER_CASE)
      .regex(/[0-9]/, EErrorKeys.PASSWORD_DIGIT)
      .regex(
        /[\!\@\#\$\%\^\&\*\(\)\_\+\-\=\[\]\{\}\;\:\'\"\,\<\.\>\/\?\|\\\`~]/,
        EErrorKeys.PASSWORD_SPECIAL_CHARACTER,
      ),
    [EDriverCompleteRegistrationFormKeys.REPEAT_PASSWORD]: z
      .string()
      .nonempty(EErrorKeys.REQUIRED_REPEAT_PASSWORD),
    [EDriverCompleteRegistrationFormKeys.VEHICLE_REGISTRATION_NUMBER]: z
      .string()
      .nonempty(EErrorKeys.REQUIRED_VEHICLE_REGISTRATION_NUMBER)
      .min(4, EErrorKeys.VEHICLE_REGISTRATION_NUMBER_MINIMUM_CHARACTERS)
      .regex(/^[A-Z0-9]*$/, EErrorKeys.VEHICLE_REGISTRATION_NUMBER_CHARACTERS),
    [EDriverCompleteRegistrationFormKeys.FILE]: z
      .instanceof(File, { message: EErrorKeys.REQUIRED_FACIAL_RECOGNITION })
      .refine((file) => file.size > 0, { message: EErrorKeys.REQUIRED_FACIAL_RECOGNITION }),
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
