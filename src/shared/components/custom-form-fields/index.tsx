import type { FieldValues } from 'react-hook-form';

import CustomCheckbox from '@/shared/components/custom-checkbox';
import CustomInput from '@/shared/components/custom-input';
import CustomSelect from '@/shared/components/custom-select';

import { EFieldType } from '@/shared/enums/field-type';

import { TCustomFormField, TFieldTypeMap } from '@/shared/types/custom-form-field';

import CustomPasswordInput from '../custom-password-input';

type TCustomFormFields<FormType extends FieldValues> = {
  formFields: TCustomFormField<FormType>[];
};

const CustomFormFields = <FormType extends FieldValues>({
  formFields,
}: TCustomFormFields<FormType>) => {
  const getFormField = ({ type, fieldProps }: TCustomFormField<FormType>) => {
    const { inputKey } = fieldProps;

    switch (type) {
      case EFieldType.TEXT:
        return (
          <CustomInput
            key={inputKey}
            {...(fieldProps as TFieldTypeMap<FormType>[EFieldType.TEXT])}
          />
        );
      case EFieldType.SELECT:
        return (
          <CustomSelect
            key={inputKey}
            {...(fieldProps as TFieldTypeMap<FormType>[EFieldType.SELECT])}
          />
        );
      case EFieldType.CHECKBOX:
        return (
          <CustomCheckbox
            key={inputKey}
            {...(fieldProps as TFieldTypeMap<FormType>[EFieldType.CHECKBOX])}
          />
        );
      case EFieldType.PASSWORD:
        return (
          <CustomPasswordInput
            key={inputKey}
            {...(fieldProps as TFieldTypeMap<FormType>[EFieldType.PASSWORD])}
          />
        );
      default:
        throw new Error(`Unknown field type: ${type}`);
    }
  };

  return <>{formFields.map(getFormField)}</>;
};

export default CustomFormFields;
