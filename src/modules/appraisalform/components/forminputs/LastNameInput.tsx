import React from 'react';

import { FormField, GenericObject } from '../../../../interfaces.d';
import Input from '../Input';
import { isValidName } from '../validation';

interface Props {
  field: FormField;
  className?: string;
}

const LastNameInput: React.FC<Props> = ({ field, className }) => {
  const { onChange } = field;

  const handleOnChange = (event: GenericObject) => {
    const value = event.target.value;
    const validationError = !isValidName(value);
    onChange({ ...field, value, validationError });
  };

  return (
    <Input
      className={className}
      field={{
        ...field,
        placeholder: 'Last name',
        label: 'Last name',
        onChange: handleOnChange,
        dataQa: 'Last Name',
      }}
    />
  );
};

export default LastNameInput;
