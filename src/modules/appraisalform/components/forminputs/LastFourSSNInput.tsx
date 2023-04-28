import React, { ChangeEvent, useState } from 'react';

import { FormField } from '../componentInterfaces.d';
import Input from '../Input';

import { displaySecureSSN } from 'src/utils';

interface InputProps {
  field: FormField;
  className?: string;
  required?: boolean;
}

const LastFourSSNInput: React.FC<InputProps> = ({
  field,
  className,
  required = true,
}) => {
  const { value, onChange } = field;
  const [ssn, setSsn] = useState({ display: value, formVal: value });

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const maxSsnLength = 5;
    const error = required && value.length < 4;

    if (value.length < maxSsnLength) {
      onChange({ ...field, value, error });
      setSsn({ display: value, formVal: value });
    }
  };

  const handleOnBlur = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    setSsn({ display: displaySecureSSN(value), formVal: value });
  };

  const handleOnFocus = () => {
    const { formVal } = ssn;
    setSsn({ display: formVal, formVal });
  };

  return (
    <Input
      className={className}
      field={{
        ...field,
        placeholder: '____',
        label: 'Last Four Digits of Social Security Number (optional)',
        value: ssn.display,
        onChange: handleOnChange,
        onBlur: handleOnBlur,
        onFocus: handleOnFocus,
      }}
    />
  );
};

export default LastFourSSNInput;
