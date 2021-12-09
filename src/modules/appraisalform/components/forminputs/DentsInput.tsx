import React from 'react';
import SelectBoxes from '@app/components/SelectBoxes';
import PropTypes from 'prop-types';
import { FormFields } from '../Inputs.language';

const DentsInput = ({ field, className }) => {
  const { onChange, value } = field;

  const handleOnChange = value => {
    onChange({ ...field, value });
  };

  return (
    <SelectBoxes
      className={className}
      field={{
        ...field,
        options: [FormFields.dents.yes, FormFields.dents.no],
        label: FormFields.dents.label,
        onClick: handleOnChange,
        value
      }}
    />
  );
};

DentsInput.propTypes = {
  field: PropTypes.object,
  className: PropTypes.string
};

export default DentsInput;
