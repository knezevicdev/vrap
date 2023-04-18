import { Select as VroomSelect } from '@vroom-web/ui-lib';
import { SelectItem } from '@vroom-web/ui-lib';
import { isEmpty } from 'lodash';
import React from 'react';
import { FieldValues, Path, useController } from 'react-hook-form';
import { Control } from 'react-hook-form/dist/types';
import styled from 'styled-components';

interface Props<T extends FieldValues> {
  placeholder: string;
  label: string;
  id: Path<T>;
  control: Control<T>;
  type?: string;
  valueFormatter?: (value: string) => string;
  options: SelectItem[];
  className?: string;
}

const Select = <T extends FieldValues>({
  placeholder,
  label,
  id,
  control,
  options,
  className,
}: Props<T>) => {
  const {
    field: { onChange, value },
    fieldState: { error },
    formState: { isSubmitting },
  } = useController({
    name: id,
    control,
  });

  return (
    <BaseSelect
      id={id || ''}
      className={className}
      label={label}
      placeholder={placeholder}
      success={!error && !isEmpty(value)}
      error={error?.message}
      selectedItem={selectedOption(value, options)}
      items={options}
      disabled={isSubmitting}
      onSelectedItemChange={(change) => {
        onChange(change.selectedItem?.value);
      }}
    />
  );
};

const selectedOption = (
  value: string,
  options: SelectItem[]
): SelectItem | null => {
  return options.find((t: SelectItem) => t.value === value) || null;
};

export default Select;

const BaseSelect = styled(VroomSelect)`
  margin-bottom: 10px;
  button span {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    ${({ success, error }) => (success || error) && `padding-right: 20px`};
  }

  svg {
    right: 32px;
  }
`;
