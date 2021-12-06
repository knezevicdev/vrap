import React from 'react';
import SelectBoxes from '@app/components/SelectBoxes';
import PropTypes from 'prop-types';
import { FormFields } from '../Inputs.language';

const RustInput = ({ field, className }) => {
  const { onChange, value } = field;

  const handleOnChange = value => {
    onChange({ ...field, value });
  };

  return (
    <SelectBoxes
      className={className}
      field={{
        ...field,
        options: [FormFields.rust.yes, FormFields.rust.no],
        label: FormFields.rust.label,
        onClick: handleOnChange,
        value
      }}
    />
  );
};

RustInput.propTypes = {
  field: PropTypes.object,
  className: PropTypes.string
};

export default RustInput;
