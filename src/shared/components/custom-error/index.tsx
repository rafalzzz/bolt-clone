import { useTranslations } from 'next-intl';
import { type FC } from 'react';

type TCustomError = {
  error?: string;
};

const CustomError: FC<TCustomError> = ({ error }) => {
  const t = useTranslations('FormErrors');

  return (
    !!error && (
      <p className='mt-1 text-sm font-normal tracking-wide text-errorIconColor transition'>
        {t(error)}
      </p>
    )
  );
};

export default CustomError;
