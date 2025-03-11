import { z } from 'zod';

import { EErrorKeys } from '@/shared/enums/error-keys';

import {
  ONLY_DIGITS_REGEX,
  ONLY_LOWERCASE_LETTERS_REGEX,
  ONLY_UPPERCASE_LETTERS_REGEX,
  SPECIAL_CHARACTER_REGEX,
} from '@/shared/consts/regex';

const passwordValidation = z
  .string()
  .nonempty(EErrorKeys.REQUIRED_FIELD)
  .min(8, EErrorKeys.PASSWORD_MINIMUM_CHARACTERS)
  .regex(ONLY_UPPERCASE_LETTERS_REGEX, EErrorKeys.PASSWORD_UPPER_CASE)
  .regex(ONLY_LOWERCASE_LETTERS_REGEX, EErrorKeys.PASSWORD_LOWER_CASE)
  .regex(ONLY_DIGITS_REGEX, EErrorKeys.PASSWORD_DIGIT)
  .regex(SPECIAL_CHARACTER_REGEX, EErrorKeys.PASSWORD_SPECIAL_CHARACTER);

export default passwordValidation;
