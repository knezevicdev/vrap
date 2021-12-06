import React from 'react';
import SelectBoxes from '@app/components/SelectBoxes';
import PropTypes from 'prop-types';
import { FormFields } from '../Inputs.language';

const FloodFireDamageInput = ({ field, className }) => {
  const { onChange } = field;

  const handleOnChange = value => {
    onChange({ ...field, value });
  };

  return (
    <SelectBoxes
      className={className}
      field={{
        ...field,
        options: [
          FormFields.floodFireDamage.yes,
          FormFields.floodFireDamage.no
        ],
        label: FormFields.floodFireDamage.label,
        onClick: handleOnChange,
        value: field.value
      }}
    />
  );
};

FloodFireDamageInput.propTypes = {
  field: PropTypes.object,
  className: PropTypes.string
};

export default FloodFireDamageInput;
