import { Checkbox as UICheckbox, CheckboxProps } from '@vroom-web/ui-lib';
import React from 'react';
import { FieldValues, Path, useController } from 'react-hook-form';
import { Control } from 'react-hook-form/dist/types';

interface Props<T extends FieldValues>
  extends Omit<CheckboxProps, 'checked' | 'dataQa'> {
  label: string;
  id: string;
  name: Path<T>;
  control: Control<T>;
}

const Checkbox = <T extends FieldValues>({
  label,
  id,
  name,
  control,
  ...props
}: Props<T>) => {
  const {
    field: { onChange, value },
    formState: { isSubmitting },
  } = useController({
    name,
    control,
  });

  return (
    <UICheckbox
      label={label}
      id={id}
      name={name}
      onChange={onChange}
      disabled={isSubmitting}
      checked={value}
      dataQa={`checkbox-${name}`}
      {...props}
    />
  );
};

export default Checkbox;
