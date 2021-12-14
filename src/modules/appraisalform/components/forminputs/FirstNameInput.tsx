import React from 'react';

import { FormField, GenericObject } from '../../../../interfaces.d';
import Input from '../Input';
import { isValidName } from '../validation';
import { FormFields } from './Inputs.language';

interface Props {
  field: FormField;
  className: string;
  isLegal: boolean;
}

const FirstNameInput: React.FC<Props> = ({ field, className, isLegal }) => {
  const { onChange } = field;

  const handleOnChange = (event: GenericObject) => {
    const value = event.target.value;
    const error = !isValidName(value);
    onChange({ ...field, value, error });
  };

  const label = isLegal ? FormFields.first.legalLabel : FormFields.first.label;

  return (
    <Input
      className={className}
      field={{
        ...field,
        placeholder: FormFields.first.placeholder,
        label: label,
        onChange: handleOnChange,
        dataQa: 'First Name',
      }}
    />
  );
};

export default FirstNameInput;
