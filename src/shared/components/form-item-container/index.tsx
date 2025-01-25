import { FC, PropsWithChildren } from 'react';

import './form-item-container.scss';
import CustomError from '../custom-error';

type TFormItemContainer = {
  error?: string;
};

const FormItemContainer: FC<PropsWithChildren<TFormItemContainer>> = ({ error, children }) => (
  <div className='form-item-container'>
    <>{children}</>
    <CustomError error={error} />
  </div>
);

export default FormItemContainer;
