import React from 'react';

import { FormField, GenericObject } from '../../../../interfaces.d';
import Input from '../Input';
import { isValidName } from '../validation';

interface Props {
  field: FormField;
  className?: string;
}

const FirstNameInput: React.FC<Props> = ({ field, className }) => {
  const { onChange } = field;

  const handleOnChange = (event: GenericObject) => {
    const value = event.target.value;
    const error = !isValidName(value);
    onChange({ ...field, value, error });
  };

  return (
    <Input
      className={className}
      field={{
        ...field,
        placeholder: 'First name',
        label: 'First name',
        onChange: handleOnChange,
        dataQa: 'First Name',
      }}
    />
  );
};

export default FirstNameInput;
