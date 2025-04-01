import type { Path, PathValue, UseFormSetValue } from 'react-hook-form';
import Select, {
  type ControlProps,
  type GroupHeadingProps,
  type OptionProps,
  type SingleValue,
  type SingleValueProps,
} from 'react-select';

import CustomInputLabel from '@/shared/components/custom-input-label';
import FormItemContainer from '@/shared/components/form-item-container';

import { TBasicFormType } from '@/shared/types/basic-form-type';
import { TGroupedOption, TOption } from '@/shared/types/react-select';

import './react-select.scss';

export type TReactSelectProps<FormType extends TBasicFormType> = {
  label: string;
  options: TGroupedOption[] | TOption[];
  inputKey: Path<FormType>;
  setValue: UseFormSetValue<FormType>;
  placeholder?: string;
  name?: string;
  error?: string;
  formatControl?: (props: ControlProps<TOption, false>) => JSX.Element;
  formatSingleValue?: (props: SingleValueProps<TOption, false>) => JSX.Element;
  formatGroupLabel?: (props: GroupHeadingProps<TOption, false>) => JSX.Element;
  formatOption?: (props: OptionProps<TOption, false>) => JSX.Element;
};

const ReactSelect = <FormType extends TBasicFormType>({
  label,
  options,
  inputKey,
  setValue,
  placeholder,
  name,
  error,
  formatControl,
  formatSingleValue,
  formatGroupLabel,
  formatOption,
}: TReactSelectProps<FormType>) => (
  <FormItemContainer inputKey={inputKey} error={error}>
    <CustomInputLabel label={label}>
      <div data-testid={`react-select-${inputKey}`}>
        <Select
          defaultInputValue=''
          className='react-select'
          classNamePrefix={`${error ? 'invalid' : 'correct'}-react-select`}
          isSearchable={false}
          options={options}
          name={name}
          onChange={(selected: SingleValue<TOption>) => {
            if (selected) {
              setValue(inputKey, selected.value as PathValue<FormType, Path<FormType>>, {
                shouldValidate: true,
              });
            }
          }}
          components={{
            Control: formatControl,
            SingleValue: formatSingleValue,
            GroupHeading: formatGroupLabel,
            Option: formatOption,
          }}
          placeholder={placeholder}
        />
      </div>
    </CustomInputLabel>
  </FormItemContainer>
);

export default ReactSelect;
