import { FC, InputHTMLAttributes, PropsWithChildren } from 'react';

import './custom-select.css';

type TCustomSelect = {
  label: string;
  props?: InputHTMLAttributes<HTMLSelectElement>;
};

const CustomSelect: FC<PropsWithChildren<TCustomSelect>> = ({ label, props, children }) => (
  <label className='custom-select-container'>
    {label}
    <select className='custom-select-container__select' {...props}>
      {children}
    </select>
  </label>
);

export default CustomSelect;
