import { FieldValues } from 'react-hook-form';

import type { TCustomCheckbox } from '@/shared/components/custom-checkbox';
import type { TCustomInput } from '@/shared/components/custom-input';
import type { TCustomPasswordInput } from '@/shared/components/custom-password-input';
import type { TCustomSelect } from '@/shared/components/custom-select';

import { EFieldType } from '@/shared/enums/field-type';

export type TFieldTypeMap<FormType extends FieldValues> = {
  [EFieldType.TEXT]: TCustomInput<FormType>;
  [EFieldType.SELECT]: TCustomSelect<FormType>;
  [EFieldType.CHECKBOX]: TCustomCheckbox<FormType>;
  [EFieldType.PASSWORD]: TCustomPasswordInput<FormType>;
};

export type TCustomFormField<FormType extends FieldValues> = {
  type: EFieldType;
  fieldProps: TFieldTypeMap<FormType>[EFieldType];
};
