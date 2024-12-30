import { FC, InputHTMLAttributes, ReactNode } from 'react';

import './custom-input.scss';

type TCustomInput = {
  label: string;
  props: InputHTMLAttributes<HTMLInputElement>;
  prefix?: ReactNode;
};

const CustomInput: FC<TCustomInput> = ({ label, prefix, props }) => (
  <label className='custom-input'>
    {label}
    <div className='custom-input__input-container'>
      {prefix && <span className='custom-input__input custom-input__input-prefix'>{prefix}</span>}
      <input className='custom-input__input' {...props} />
    </div>
  </label>
);

export default CustomInput;
