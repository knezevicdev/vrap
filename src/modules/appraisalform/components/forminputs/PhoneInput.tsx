import { isEmpty } from 'lodash';
import React from 'react';

import { displayPhoneNumber, numbersOnlyString } from '../formatting';
import Input from '../Input';
import { isValidPhoneNumber } from '../validation';

interface Props {
  field: any;
  className?: string;
  optional?: boolean;
}

const PhoneInput: React.FC<Props> = ({
  field,
  className,
  optional = false,
}) => {
  const { value, error, onChange } = field;
  const val = value || '';
  const number = numbersOnlyString(val);
  const phone = displayPhoneNumber(number);

  const handleOnChange = (event: any) => {
    const value = event.target.value;
    // If the field is optional and empty, it's still considered valid
    const validationError =
      isEmpty(value) && optional ? false : !isValidPhoneNumber(value);
    const maxPhoneLength = 15;
    if (value.length < maxPhoneLength) {
      onChange({ ...field, value, validationError });
    }
  };

  const label = optional
    ? 'Phone number (optional)'
    : field.label || 'Phone number';

  return (
    <Input
      className={className}
      field={{
        ...field,
        placeholder: '(  ) ___-____',
        label: label,
        error: error,
        value: phone,
        onChange: handleOnChange,
        dataQa: 'Phone Number',
      }}
    />
  );
};

export default PhoneInput;
