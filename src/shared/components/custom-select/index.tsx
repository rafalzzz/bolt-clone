import { FC, InputHTMLAttributes, PropsWithChildren } from 'react';

import './custom-select.css';

type TCustomSelect = {
  label: string;
  props?: InputHTMLAttributes<HTMLSelectElement>;
};

const CustomSelect: FC<PropsWithChildren<TCustomSelect>> = ({ label, props, children }) => (
  <label className='text-sm font-bold text-gray-700 tracking-wide'>
    {label}
    <select className='custom-select block w-full rounded-md bg-gray-50 p-4' {...props}>
      {children}
    </select>
  </label>
);

export default CustomSelect;
