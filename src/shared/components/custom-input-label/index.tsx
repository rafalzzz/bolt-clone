import { FC, PropsWithChildren } from 'react';

import './custom-input-label.scss';

type TCustomInputLabel = {
  label: string;
};

const CustomInputLabel: FC<PropsWithChildren<TCustomInputLabel>> = ({ label, children }) => (
  <label className='custom-input-label'>
    {label}
    <>{children}</>
  </label>
);

export default CustomInputLabel;
