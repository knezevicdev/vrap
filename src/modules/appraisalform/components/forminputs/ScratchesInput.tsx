import React from 'react';
import SelectBoxes from '@app/components/SelectBoxes';
import PropTypes from 'prop-types';
import { FormFields } from '../Inputs.language';

const ScratchesInput = ({ field, className }) => {
  const { onChange, value } = field;

  const handleOnChange = value => {
    onChange({ ...field, value });
  };

  return (
    <SelectBoxes
      className={className}
      field={{
        ...field,
        options: [FormFields.scratches.yes, FormFields.scratches.no],
        label: FormFields.scratches.label,
        onClick: handleOnChange,
        value
      }}
    />
  );
};

ScratchesInput.propTypes = {
  field: PropTypes.object,
  className: PropTypes.string
};

export default ScratchesInput;
