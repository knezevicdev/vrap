import React from 'react';

import { FormField, GenericObject } from '../../../../interfaces.d';
import Input from '../Input';
import { isValidName } from '../validation';
import { FormFields } from './Inputs.language';

interface Props {
  field: FormField;
  className?: string;
  isLegal?: boolean;
}

const LastNameInput: React.FC<Props> = ({ field, className, isLegal }) => {
  const { onChange } = field;

  const handleOnChange = (event: GenericObject) => {
    const value = event.target.value;
    const error = !isValidName(value);
    onChange({ ...field, value, error });
  };

  const label = isLegal ? FormFields.last.legalLabel : FormFields.last.label;

  return (
    <Input
      className={className}
      field={{
        ...field,
        placeholder: FormFields.last.placeholder,
        label: label,
        onChange: handleOnChange,
        dataQa: 'Last Name',
      }}
    />
  );
};

export default LastNameInput;
