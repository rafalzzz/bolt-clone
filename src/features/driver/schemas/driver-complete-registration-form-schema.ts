import { z } from 'zod';

import { EDriverCompleteRegistrationFormKeys } from '@/features/driver/enums/driver-complete-registration-form-keys';
import { EErrorKeys } from '@/shared/enums/error-keys';

export const driverCompleteRegistrationFormSchema = z
  .object({
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
