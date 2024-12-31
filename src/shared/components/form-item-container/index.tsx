import { FC, PropsWithChildren } from 'react';

import './form-item-container.scss';

type TFormItemContainer = {
  error?: string;
};

const FormItemContainer: FC<PropsWithChildren<TFormItemContainer>> = ({ error, children }) => (
  <div className='form-item-container'>
    <>{children}</>
    {!!error && <p className='form-item-container__error'>{error}</p>}
  </div>
);

export default FormItemContainer;
