import React from 'react';
import Input from '@app/components/Input';
import PropTypes from 'prop-types';
import { isValidName } from '@app/lib/validation/validation';
import { FormFields } from './Inputs.language';

const LastNameInput = ({ field, className, isLegal }) => {
  const { onChange } = field;

  const handleOnChange = event => {
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
        dataQa: 'Last Name'
      }}
    />
  );
};

LastNameInput.propTypes = {
  field: PropTypes.object,
  className: PropTypes.string,
  isLegal: PropTypes.bool
};

export default LastNameInput;
