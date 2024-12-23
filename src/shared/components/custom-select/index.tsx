import { FC, InputHTMLAttributes, PropsWithChildren } from 'react';

import './custom-select.scss';

type TCustomSelect = {
  label: string;
  props?: InputHTMLAttributes<HTMLSelectElement>;
};

const CustomSelect: FC<PropsWithChildren<TCustomSelect>> = ({ label, props, children }) => (
  <label className='custom-select'>
    {label}
    <select className='custom-select__select' {...props}>
      {children}
    </select>
  </label>
);

export default CustomSelect;
