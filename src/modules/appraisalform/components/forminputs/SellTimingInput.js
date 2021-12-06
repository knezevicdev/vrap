import React from 'react';
import Dropdown from '@app/components/Dropdown';
import PropTypes from 'prop-types';
import { FormFields } from '../Inputs.language';

const SellTimingInput = ({ field, className, type = 'sellTiming' }) => {
  const { onChange } = field;
  const handleOnChange = event => {
    let value = event.target.value;
    value = value === 'Sell timing' ? '' : value;

    onChange({ ...field, value });
  };

  return (
    <Dropdown
      className={className}
      field={{
        ...field,
        placeholder: FormFields.sellTiming.placeholder,
        label: FormFields.sellTiming.label,
        type,
        onChange: handleOnChange
      }}
    />
  );
};

SellTimingInput.propTypes = {
  field: PropTypes.object,
  className: PropTypes.string,
  type: PropTypes.string
};

export default SellTimingInput;
