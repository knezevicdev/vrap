import React from 'react';
import Textarea from '@app/components/Textarea';
import PropTypes from 'prop-types';
import { FormFields } from '../Inputs.language';

const AdditionalDetailsInput = ({ field, className, label }) => {
  const { onChange } = field;

  const handleOnChange = event => {
    let value = event.target.value;
    onChange({ ...field, value });
  };

  return (
    <Textarea
      className={className}
      field={{
        ...field,
        placeholder: FormFields.additionalDetails.placeholder,
        label: label || FormFields.additionalDetails.label,
        onChange: handleOnChange,
        maxlength: '255',
        dataQa: 'AdditionalDetails'
      }}
    />
  );
};

AdditionalDetailsInput.propTypes = {
  field: PropTypes.object,
  className: PropTypes.string,
  label: PropTypes.string
};

export default AdditionalDetailsInput;
