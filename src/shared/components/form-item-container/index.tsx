import { FC, PropsWithChildren } from 'react';

import CustomError from '@/shared/components/custom-error';

import './form-item-container.scss';

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
