import React from 'react';
import SelectBoxes from '@app/components/SelectBoxes';
import PropTypes from 'prop-types';
import { FormFields } from '../Inputs.language';

const PaintChippingInput = ({ field, className }) => {
  const { onChange, value } = field;

  const handleOnChange = value => {
    onChange({ ...field, value });
  };

  return (
    <SelectBoxes
      className={className}
      field={{
        ...field,
        options: [FormFields.paintChipping.yes, FormFields.paintChipping.no],
        label: FormFields.paintChipping.label,
        onClick: handleOnChange,
        value
      }}
    />
  );
};

PaintChippingInput.propTypes = {
  field: PropTypes.object,
  className: PropTypes.string
};

export default PaintChippingInput;
