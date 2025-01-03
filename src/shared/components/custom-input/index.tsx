import { InputHTMLAttributes, ReactNode } from 'react';
import { Path, UseFormRegister } from 'react-hook-form';

import CustomInputLabel from '@/shared/components/custom-input-label';
import DefaultErrorIcon from '@/shared/components/default-error-icon';
import FormItemContainer from '@/shared/components/form-item-container';

import { TBasicFormType } from '@/shared/types/basic-form-type';

import './custom-input.scss';

type TCustomInput<FormType extends TBasicFormType> = {
  label: string;
  props: InputHTMLAttributes<HTMLInputElement>;
  inputKey: Path<FormType>;
  register: UseFormRegister<FormType>;
  error?: string;
  prefix?: ReactNode;
};

const CustomInput = <FormType extends TBasicFormType>({
  label,
  props,
  inputKey,
  register,
  error,
  prefix,
}: TCustomInput<FormType>) => (
  <FormItemContainer error={error}>
    <CustomInputLabel label={label}>
      <div className='custom-input'>
        {prefix && <span className='custom-input__input custom-input__input-prefix'>{prefix}</span>}
        <input
          className={`custom-input__input custom-input__${error ? 'invalid' : 'correct'}-input`}
          {...props}
          {...register(inputKey)}
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
