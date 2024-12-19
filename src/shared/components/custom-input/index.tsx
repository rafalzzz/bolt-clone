import { FC, InputHTMLAttributes, ReactNode } from 'react';

import './custom-input.css';

type TCustomInput = {
  label: string;
  props: InputHTMLAttributes<HTMLInputElement>;
  prefix?: ReactNode;
};

const CustomInput: FC<TCustomInput> = ({ label, prefix, props }) => (
  <label className='custom-input-container'>
    {label}
    <div className='custom-input-container__input-container'>
      {prefix && (
        <span className='custom-input-container__input custom-input-container__input-prefix'>
          {prefix}
        </span>
      )}
      <input className='custom-input-container__input ' {...props} />
    </div>
  </label>
);

export default CustomInput;
