import { useTranslations } from 'next-intl';
import { type FC } from 'react';

type TCustomError = {
  inputKey: string;
  error?: string;
};

const CustomError: FC<TCustomError> = ({ inputKey, error }) => {
  const t = useTranslations('FormErrors');

  return (
    !!error && (
      <p
        className='mt-1 text-sm font-normal tracking-wide text-errorIconColor transition'
        data-testid={`${inputKey}Error`}
      >
        {t(error)}
      </p>
    )
  );
};

export default CustomError;
