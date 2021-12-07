import React from 'react';
import Input from '@app/components/Input';
import PropTypes from 'prop-types';
import { displayZipCode } from '@app/lib/validation/displayFormatting';
import { isValidZipCode } from '@app/lib/validation/validation';
import { numbersOnlyString } from '@app/lib/validation/formatting';
import { FormFields } from '../Inputs.language';

const ZipCodeInput = ({ field, className }) => {
  const { value, onChange } = field;
  const number = numbersOnlyString(value);
  const zip = displayZipCode(number);

  const handleOnChange = event => {
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
        maxlength: '5'
      }}
    />
  );
};

ZipCodeInput.propTypes = {
  field: PropTypes.object,
  className: PropTypes.string
};

export default ZipCodeInput;
