import React from 'react';
import SelectBoxes from '@app/components/SelectBoxes';
import PropTypes from 'prop-types';
import { FormFields } from '../Inputs.language';

const ScratchesPanelsInput = ({ field, className }) => {
  const { onChange, value } = field;

  const handleOnChange = value => {
    onChange({ ...field, value });
  };

  return (
    <SelectBoxes
      className={className}
      field={{
        ...field,
        options: [1, 2, 3, 4, 5],
        label: FormFields.scratchesPanels.label,
        onClick: handleOnChange,
        value,
        panelsTooltip: 'scratches'
      }}
    />
  );
};

ScratchesPanelsInput.propTypes = {
  field: PropTypes.object,
  className: PropTypes.string
};

export default ScratchesPanelsInput;
