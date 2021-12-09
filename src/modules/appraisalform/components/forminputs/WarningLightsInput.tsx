import React from 'react';
import SelectBoxes from '@app/components/SelectBoxes';
import PropTypes from 'prop-types';
import { FormFields } from '../Inputs.language';

const WarningLightsInput = ({ field, className }) => {
  const { onChange } = field;

  const handleOnChange = value => {
    onChange({ ...field, value });
  };

  return (
    <SelectBoxes
      className={className}
      field={{
        ...field,
        options: [FormFields.warningLights.yes, FormFields.warningLights.no],
        label: FormFields.warningLights.label,
        onClick: handleOnChange,
        value: field.value
      }}
    />
  );
};

WarningLightsInput.propTypes = {
  field: PropTypes.object,
  className: PropTypes.string
};

export default WarningLightsInput;
