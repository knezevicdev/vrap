import React from 'react';

import { FormField, GenericObject } from '../../../../interfaces.d';
import Input from '../Input';
import { isValidEmail } from '../validation';
import { FormFields } from './Inputs.language';

interface Props {
  field: FormField;
  className?: string;
  disabled?: boolean;
}

const EmailInput: React.FC<Props> = ({
  field,
  className,
  disabled = false,
}) => {
  const { onChange } = field;

  const handleOnChange = (event: GenericObject) => {
    const value = event.target.value;
    const error = !isValidEmail(value);
    onChange({ ...field, value, error });
  };

  return (
    <Input
      className={className}
      field={{
        ...field,
        placeholder: FormFields.email.placeholder,
        label: FormFields.email.label,
        disabled: disabled,
        onChange: handleOnChange,
        maxlength: '100',
      }}
    />
  );
};

export default EmailInput;
