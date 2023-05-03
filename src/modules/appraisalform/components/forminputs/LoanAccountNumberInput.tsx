import React, { ChangeEvent } from 'react';

import { FormField } from '../componentInterfaces.d';
import { lettersNumbersHyphensOnly } from '../formatting';
import Input from '../Input';

interface Props {
  field: FormField;
  className?: string;
}

const LoanAccountNumberInput: React.FC<Props> = ({ field, className }) => {
  const { value, error, onChange } = field;

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = lettersNumbersHyphensOnly(event.target.value, 25);
    onChange({ ...field, value });
  };

  const label = field.label || 'Lien Account Number';

  return (
    <Input
      className={className}
      field={{
        ...field,
        placeholder: 'xxxxxxxxxxxx',
        label: label,
        error: error,
        value,
        onChange: handleOnChange,
        dataQa: 'Lien Account Number',
      }}
    />
  );
};

export default LoanAccountNumberInput;
