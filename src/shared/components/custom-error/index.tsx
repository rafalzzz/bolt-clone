import { useTranslations } from 'next-intl';
import { type FC } from 'react';

import './form-item-container.scss';

type TCustomError = {
  error?: string;
};

const CustomError: FC<TCustomError> = ({ error }) => {
  const t = useTranslations('FormErrors');

  return !!error && <p className='form-item-container__error'>{t(error)}</p>;
};

export default CustomError;
