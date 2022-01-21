import React from 'react';

import { FormField, GenericObject } from '../../../../interfaces.d';
import { displayZipCode, numbersOnlyString } from '../formatting';
import Input from '../Input';
import { isValidZipCode } from '../validation';
import { FormFields } from './Inputs.language';

interface Props {
  field: FormField;
  className?: string;
}

const ZipCodeInput: React.FC<Props> = ({ field, className }) => {
  const { value, onChange } = field;
  const number = numbersOnlyString(value);
  const zip = displayZipCode(number);

  const handleOnChange = (event: GenericObject) => {
    const value = event.target.value;
    const error = !isValidZipCode(value);
    onChange({ ...field, value, error });
  };

  return (
    <Input
      className={className}
      field={{
        ...field,
        placeholder: FormFields.zip.placeholder,
        label: FormFields.zip.label,
        value: zip,
        onChange: handleOnChange,
        maxlength: '5',
      }}
    />
  );
};

export default ZipCodeInput;
