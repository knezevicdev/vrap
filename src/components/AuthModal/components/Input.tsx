import { Input as UIInput } from '@vroom-web/ui-lib';
import React from 'react';
import { FieldValues, Path, useController } from 'react-hook-form';
import { Control } from 'react-hook-form/dist/types';

interface Props<T extends FieldValues> {
  placeholder: string;
  label: string;
  id: Path<T>;
  control: Control<T>;
  type?: string;
  valueFormatter?: (value: string) => string;
  disabled?: boolean;
}

const Input = <T extends FieldValues>({
  placeholder,
  label,
  id,
  control,
  type = 'text',
  valueFormatter,
  disabled,
}: Props<T>) => {
  const {
    field: { onChange, onBlur, value },
    fieldState: { error },
    formState: { isSubmitting },
  } = useController({
    name: id,
    control,
  });

  return (
    <UIInput
      placeholder={placeholder}
      label={label}
      id={id}
      type={type}
      error={error?.message}
      onChange={(event) => {
        event.target.value = valueFormatter
          ? valueFormatter(event.target.value)
          : event.target.value;
        onChange(event);
      }}
      onBlur={onBlur}
      value={value}
      disabled={isSubmitting || disabled}
    />
  );
};

export default Input;
