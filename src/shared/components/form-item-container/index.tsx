import { useTranslations } from 'next-intl';
import { FC, PropsWithChildren } from 'react';

import './form-item-container.scss';

type TFormItemContainer = {
  error?: string;
};

const FormItemContainer: FC<PropsWithChildren<TFormItemContainer>> = ({ error, children }) => {
  const t = useTranslations('FormErrors');

  return (
    <div className='form-item-container'>
      <>{children}</>
      {!!error && <p className='form-item-container__error'>{t(error)}</p>}
    </div>
  );
};

export default FormItemContainer;
