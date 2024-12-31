import { FC, InputHTMLAttributes, ReactNode } from 'react';

import CustomInputLabel from '@/shared/components/custom-input-label';
import DefaultErrorIcon from '@/shared/components/default-error-icon';
import FormItemContainer from '@/shared/components/form-item-container';

import './custom-input.scss';

type TCustomInput = {
  label: string;
  props: InputHTMLAttributes<HTMLInputElement>;
  error?: string;
  prefix?: ReactNode;
};

const CustomInput: FC<TCustomInput> = ({ label, props, error, prefix }) => (
  <FormItemContainer error={error}>
    <CustomInputLabel label={label}>
      <div className='custom-input'>
        {prefix && <span className='custom-input__input custom-input__input-prefix'>{prefix}</span>}
        <input
          className={`custom-input__input custom-input__${error ? 'invalid' : 'correct'}-input`}
          {...props}
        />
        {error && (
          <div className='custom-input__error-icon'>
            <DefaultErrorIcon />
          </div>
        )}
      </div>
    </CustomInputLabel>
  </FormItemContainer>
);

export default CustomInput;
