import React from 'react';
import SelectBoxes from '@app/components/SelectBoxes';
import PropTypes from 'prop-types';
import { FormFields } from '../Inputs.language';

const SmokedInInput = ({ field, className }) => {
  const { onChange, value } = field;

  const handleOnChange = value => {
    onChange({ ...field, value });
  };

  return (
    <SelectBoxes
      className={className}
      field={{
        ...field,
        options: [FormFields.smokedIn.yes, FormFields.smokedIn.no],
        label: FormFields.smokedIn.label,
        onClick: handleOnChange,
        value
      }}
    />
  );
};

SmokedInInput.propTypes = {
  field: PropTypes.object,
  className: PropTypes.string
};

export default SmokedInInput;
