import type { TranslationValues } from 'next-intl';
import type { InputHTMLAttributes, ReactNode } from 'react';
import type { Path, UseFormRegister } from 'react-hook-form';

import CustomInputLabel from '@/shared/components/custom-input-label';
import FormItemContainer from '@/shared/components/form-item-container';

import getInputTestId from '@/test-helpers/get-input-test-id';

import ErrorSvg from '@/shared/svg/error-svg';

import { TBasicFormType } from '@/shared/types/basic-form-type';

export type TCustomInput<FormType extends TBasicFormType> = {
  label: string;
  props: InputHTMLAttributes<HTMLInputElement>;
  inputKey: Path<FormType>;
  register: UseFormRegister<FormType>;
  error?: string;
  errorValues?: TranslationValues;
  prefix?: ReactNode;
};

const CustomInput = <FormType extends TBasicFormType>({
  label,
  props,
  inputKey,
  register,
  error,
  errorValues,
  prefix,
}: TCustomInput<FormType>) => (
  <FormItemContainer inputKey={inputKey} error={error} errorValues={errorValues}>
    <CustomInputLabel label={label}>
      <div className='custom-input'>
        {prefix && <span className='custom-input__input custom-input__input-prefix'>{prefix}</span>}
        <input
          className={`custom-input__input custom-input__${error ? 'invalid' : 'correct'}-input`}
          {...props}
          {...register(inputKey, {
            setValueAs: (value) => value.trim(),
          })}
          data-testid={getInputTestId(inputKey)}
        />
        {error && (
          <div className='custom-input__error-icon'>
            <ErrorSvg />
          </div>
        )}
      </div>
    </CustomInputLabel>
  </FormItemContainer>
);

export default CustomInput;
