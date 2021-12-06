import React from 'react';
import Input from '@app/components/Input';
import PropTypes from 'prop-types';
import { isValidEmail } from '@app/lib/validation/validation';
import { FormFields } from './Inputs.language';

const EmailInput = ({ field, className }) => {
  const { onChange } = field;

  const handleOnChange = event => {
    const value = event.target.value;
    const error = !isValidEmail(value);
    onChange({ ...field, value, error });
  };

  return (
    <Input
      className={className}
      field={{
        ...field,
        placeholder: FormFields.email.placeholder,
        label: FormFields.email.label,
        onChange: handleOnChange,
        maxlength: '100'
      }}
    />
  );
};

EmailInput.propTypes = {
  field: PropTypes.object,
  className: PropTypes.string
};

export default EmailInput;
