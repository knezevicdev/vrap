import React from 'react';
import SelectBoxes from '@app/components/SelectBoxes';
import PropTypes from 'prop-types';
import { FormFields } from '../Inputs.language';

const SeatsInput = ({ field, className }) => {
  const { onChange, value } = field;

  const handleOnChange = value => {
    onChange({ ...field, value });
  };

  return (
    <SelectBoxes
      className={className}
      field={{
        ...field,
        options: [FormFields.seats.leather, FormFields.seats.cloth],
        label: FormFields.seats.label,
        onClick: handleOnChange,
        value
      }}
    />
  );
};

SeatsInput.propTypes = {
  field: PropTypes.object,
  className: PropTypes.string
};

export default SeatsInput;
