import React from 'react';
import Dropdown from '@app/components/Dropdown';
import PropTypes from 'prop-types';
import { FormFields } from '../Inputs.language';
import { trackColorChange } from '@app/lib/analytics/analytics/appraisal';

const ExtColorInput = ({ field, className, customOptions }) => {
  const { onChange } = field;

  const handleOnChange = event => {
    trackColorChange();
    const value = event.target.value;
    const error = value === 'Exterior Color';
    onChange({ ...field, value, error });
  };

  return (
    <Dropdown
      className={className}
      field={{
        ...field,
        defaultLabel: FormFields.extColor.placeholder,
        label: FormFields.extColor.label,
        customOptions,
        onChange: handleOnChange
      }}
    />
  );
};

ExtColorInput.propTypes = {
  field: PropTypes.object,
  className: PropTypes.string,
  customOptions: PropTypes.array
};

export default ExtColorInput;
