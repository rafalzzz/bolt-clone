import { z } from 'zod';

import { EAddCarFormKeys } from '@/features/add-car/enums/add-car-form-keys';
import { EErrorKeys } from '@/shared/enums/error-keys';

import {
  CAR_REGISTRATION_NUMBER_REGEX,
  ONLY_LETTERS_AND_DIGITS_REGEX,
  ONLY_LETTERS_REGEX,
} from '@/shared/consts/regex';

export const addCarFormSchema = z.object({
  [EAddCarFormKeys.CAR_REGISTRATION_NUMBER]: z
    .string()
    .nonempty(EErrorKeys.REQUIRED_FIELD)
    .min(4, EErrorKeys.MINIMUM_REQUIRED_CHARACTERS)
    .regex(CAR_REGISTRATION_NUMBER_REGEX, EErrorKeys.CAR_REGISTRATION_NUMBER_CHARACTERS),
  [EAddCarFormKeys.CAR_BRAND]: z
    .string()
    .nonempty(EErrorKeys.REQUIRED_FIELD)
    .min(2, EErrorKeys.MINIMUM_REQUIRED_CHARACTERS)
    .regex(ONLY_LETTERS_REGEX, EErrorKeys.ONLY_LETTERS),
  [EAddCarFormKeys.CAR_MODEL]: z
    .string()
    .nonempty(EErrorKeys.REQUIRED_FIELD)
    .min(2, EErrorKeys.MINIMUM_REQUIRED_CHARACTERS)
    .regex(ONLY_LETTERS_AND_DIGITS_REGEX, EErrorKeys.ONLY_LETTERS_AND_DIGITS),
  [EAddCarFormKeys.CAR_COLOR]: z
    .string()
    .optional()
    .refine((val) => val !== undefined && val.trim() !== '', {
      message: EErrorKeys.REQUIRED_FIELD,
    }),
});

export type TAddCarFormSchema = z.infer<typeof addCarFormSchema>;
export type TAddCarFormSchemaError = z.inferFlattenedErrors<typeof addCarFormSchema>;
