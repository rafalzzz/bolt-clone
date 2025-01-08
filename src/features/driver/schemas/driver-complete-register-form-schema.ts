import { z } from 'zod';

import { EDriverCompleteRegisterFormKeys } from '@/features/driver/enums/driver-complete-register-form-keys';
import { EErrorKeys } from '@/shared/enums/error-keys';

export const driverCompleteRegisterFormSchema = z
  .object({
    [EDriverCompleteRegisterFormKeys.PASSWORD]: z
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
    [EDriverCompleteRegisterFormKeys.REPEAT_PASSWORD]: z
      .string()
      .nonempty(EErrorKeys.REQUIRED_REPEAT_PASSWORD),
    [EDriverCompleteRegisterFormKeys.VEHICLE_REGISTRATION_NUMBER]: z
      .string()
      .nonempty(EErrorKeys.REQUIRED_VEHICLE_REGISTRATION_NUMBER)
      .min(4, EErrorKeys.VEHICLE_REGISTRATION_NUMBER_MINIMUM_CHARACTERS)
      .max(10, EErrorKeys.VEHICLE_REGISTRATION_NUMBER_MAXIMUM_CHARACTERS)
      .regex(/^[A-Z0-9]*$/, EErrorKeys.VEHICLE_REGISTRATION_NUMBER_CHARACTERS),
  })
  .refine(
    (data) =>
      data[EDriverCompleteRegisterFormKeys.PASSWORD] ===
      data[EDriverCompleteRegisterFormKeys.REPEAT_PASSWORD],
    {
      message: EErrorKeys.PASSWORDS_MUST_MATCH,
      path: [EDriverCompleteRegisterFormKeys.REPEAT_PASSWORD],
    },
  );

export type TDriverCompleteRegisterFormSchema = z.infer<typeof driverCompleteRegisterFormSchema>;

export type TDriverCompleteRegisterFormSchemaError = z.inferFlattenedErrors<
  typeof driverCompleteRegisterFormSchema
>;
