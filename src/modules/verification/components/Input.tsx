import { Input as UIInput, InputProps, TooltipConfig } from '@vroom-web/ui-lib';
import React from 'react';
import { FieldValues, Path, useController } from 'react-hook-form';
import { Control } from 'react-hook-form/dist/types';

interface Props<T extends FieldValues> extends InputProps {
  placeholder: string;
  label: string;
  id: string;
  name: Path<T>;
  control: Control<T>;
  type?: string;
  valueFormatter?: (value: string) => string;
  tooltip?: TooltipConfig;
}

const Input = <T extends FieldValues>({
  placeholder,
  label,
  id,
  name,
  control,
  type = 'text',
  valueFormatter,
  ...props
}: Props<T>) => {
  const {
    field: { onChange, onBlur, value },
    fieldState: { error },
    formState: { isSubmitting },
  } = useController({
    name,
    control,
  });

  return (
    <UIInput
      placeholder={placeholder}
      label={label}
      id={id}
      name={name}
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
      disabled={isSubmitting}
      {...props}
    />
  );
};

export default Input;
