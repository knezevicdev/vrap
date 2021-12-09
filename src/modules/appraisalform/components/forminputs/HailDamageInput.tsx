import React from 'react';
import SelectBoxes from '@app/components/SelectBoxes';
import PropTypes from 'prop-types';
import { FormFields } from '../Inputs.language';

const HailDamageInput = ({ field, className }) => {
  const { onChange } = field;

  const handleOnChange = value => {
    onChange({ ...field, value });
  };

  return (
    <SelectBoxes
      className={className}
      field={{
        ...field,
        options: [FormFields.hailDamage.yes, FormFields.hailDamage.no],
        label: FormFields.hailDamage.label,
        onClick: handleOnChange,
        value: field.value
      }}
    />
  );
};

HailDamageInput.propTypes = {
  field: PropTypes.object,
  className: PropTypes.string
};

export default HailDamageInput;
