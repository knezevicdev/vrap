import React from 'react';

import { FormField, GenericObject } from '../../../../interfaces.d';
import Input from '../Input';
import { isValidEmail } from '../validation';

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
    const validationError = !isValidEmail(value);
    onChange({ ...field, value, validationError });
  };

  return (
    <Input
      className={className}
      field={{
        ...field,
        placeholder: 'example@example.com',
        label: 'Email address',
        disabled: disabled,
        onChange: handleOnChange,
        maxlength: '100',
        toolTipText:
          'Valid email required. If you decide to accept your Vroom offer, you will have to create an account (or login) using this email address.',
      }}
    />
  );
};

export default EmailInput;
