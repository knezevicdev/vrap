import Input from '@app/components/Input';
import { displayNumber } from '@app/lib/validation/displayFormatting';
import { numbersOnly } from '@app/lib/validation/formatting';
import PropTypes from 'prop-types';
import React from 'react';

import { FormFields } from '../Inputs.language';

const ExactMileageInput = ({
  field,
  showToolTip = true,
  className,
  handleOnBlur,
}) => {
  const { onChange, value } = field;
  const mileage = displayNumber(value);
  const toolTipText = showToolTip ? FormFields.exactMileage.toolTip : null;

  const handleOnChange = (event) => {
    const value = numbersOnly(event.target.value);
    onChange({ ...field, value, element: event.target });
  };

  return (
    <Input
      className={className}
      field={{
        ...field,
        placeholder: FormFields.exactMileage.placeholder,
        label: FormFields.exactMileage.label,
        onChange: handleOnChange,
        onBlur: handleOnBlur,
        value: mileage,
        toolTipText,
        maxlength: '7',
      }}
    />
  );
};

ExactMileageInput.propTypes = {
  field: PropTypes.object,
  className: PropTypes.string,
  isLegal: PropTypes.bool,
  showToolTip: PropTypes.bool,
  trackOnBlur: PropTypes.func,
};

export default ExactMileageInput;
