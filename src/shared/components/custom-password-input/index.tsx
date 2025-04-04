import { useTranslations } from 'next-intl';
import { type InputHTMLAttributes, useState } from 'react';
import type { Path, UseFormRegister } from 'react-hook-form';

import CustomInputLabel from '@/shared/components/custom-input-label';
import FormItemContainer from '@/shared/components/form-item-container';

import getInputTestId from '@/test-helpers/get-input-test-id';

import EyeSlashSvg from '@/shared/svg/closed-slash-svg';
import EyeSvg from '@/shared/svg/eye-svg';

import { TBasicFormType } from '@/shared/types/basic-form-type';

export type TCustomPasswordInput<FormType extends TBasicFormType> = {
  label: string;
  props: InputHTMLAttributes<HTMLInputElement>;
  inputKey: Path<FormType>;
  register: UseFormRegister<FormType>;
  error?: string;
};

const CustomPasswordInput = <FormType extends TBasicFormType>({
  label,
  props,
  inputKey,
  error,
  register,
}: TCustomPasswordInput<FormType>) => {
  const [showPassword, setShowPassword] = useState(false);

  const t = useTranslations('PasswordInput');

  return (
    <FormItemContainer inputKey={inputKey} error={error}>
      <CustomInputLabel label={label}>
        <div className='custom-input'>
          <input
            className={`custom-input__input custom-input__${error ? 'invalid' : 'correct'}-input`}
            {...props}
            {...register(inputKey)}
            type={showPassword ? 'text' : 'password'}
            data-testid={getInputTestId(inputKey)}
          />
          <button
            type='button'
            className='custom-input__button'
            aria-label={showPassword ? t('hidePassword') : t('showPassword')}
            onClick={() => setShowPassword((prevState) => !prevState)}
          >
            {showPassword ? <EyeSlashSvg /> : <EyeSvg />}
          </button>
        </div>
      </CustomInputLabel>
    </FormItemContainer>
  );
};

export default CustomPasswordInput;
