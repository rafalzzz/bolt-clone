import { useTranslations } from 'next-intl';
import { InputHTMLAttributes, useState } from 'react';
import { Path, UseFormRegister } from 'react-hook-form';

import CustomInputLabel from '@/shared/components/custom-input-label';
import FormItemContainer from '@/shared/components/form-item-container';

import EyeSlashSvg from '@/shared/svg/closed-slash-svg';
import EyeSvg from '@/shared/svg/eye-svg';

import { TBasicFormType } from '@/shared/types/basic-form-type';

import './password-input.scss';

type TPasswordInput<FormType extends TBasicFormType> = {
  label: string;
  props: InputHTMLAttributes<HTMLInputElement>;
  inputKey: Path<FormType>;
  register: UseFormRegister<FormType>;
  error?: string;
};

const PasswordInput = <FormType extends TBasicFormType>({
  label,
  props,
  inputKey,
  error,
  register,
}: TPasswordInput<FormType>) => {
  const [showPassword, setShowPassword] = useState(false);

  const t = useTranslations('PasswordInput');

  return (
    <FormItemContainer error={error}>
      <CustomInputLabel label={label}>
        <div className='password-input'>
          <input
            className={`password-input__input password-input__${error ? 'invalid' : 'correct'}-input`}
            {...props}
            {...register(inputKey)}
            type={showPassword ? 'text' : 'password'}
          />
          <button
            type='button'
            className='password-input__button'
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

export default PasswordInput;
