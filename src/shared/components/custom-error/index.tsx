import { type TranslationValues, useTranslations } from 'next-intl';
import type { FC } from 'react';

import getErrorTestId from '@/test-helpers/get-error-test-id';

type TCustomError = {
  inputKey: string;
  error?: string;
  errorValues?: TranslationValues;
};

const CustomError: FC<TCustomError> = ({ inputKey, error, errorValues }) => {
  const t = useTranslations('FormErrors');

  return (
    !!error && (
      <p
        className='mt-1 text-sm font-normal tracking-wide text-errorIconColor transition'
        data-testid={getErrorTestId(inputKey)}
      >
        {t(error, errorValues)}
      </p>
    )
  );
};

export default CustomError;
