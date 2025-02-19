import { FieldValues } from 'react-hook-form';

import { TCustomCheckbox } from '@/shared/components/custom-checkbox';
import { TCustomInput } from '@/shared/components/custom-input';
import { TCustomSelect } from '@/shared/components/custom-select';

import { EFieldType } from '@/shared/enums/field-type';

export type TFieldTypeMap<FormType extends FieldValues> = {
  [EFieldType.TEXT]: TCustomInput<FormType>;
  [EFieldType.SELECT]: TCustomSelect<FormType>;
  [EFieldType.CHECKBOX]: TCustomCheckbox<FormType>;
};

export type TCustomFormField<FormType extends FieldValues> = {
  type: EFieldType;
  fieldProps: TFieldTypeMap<FormType>[EFieldType];
};
