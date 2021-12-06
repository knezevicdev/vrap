import React from 'react';
import SelectBoxes from '@app/components/SelectBoxes';
import PropTypes from 'prop-types';
import { FormFields } from '../Inputs.language';
import { trackNumberOfKeysChange } from '@app/lib/analytics/analytics/appraisal';

const NumberOfKeysInput = ({ field, className }) => {
  const { onChange, value } = field;

  const handleOnChange = value => {
    trackNumberOfKeysChange();
    onChange({ ...field, value });
  };

  return (
    <SelectBoxes
      className={className}
      field={{
        ...field,
        options: ['1', '2+'],
        label: FormFields.howManyKeys.label,
        onClick: handleOnChange,
        value
      }}
    />
  );
};

NumberOfKeysInput.propTypes = {
  field: PropTypes.object,
  className: PropTypes.string
};

export default NumberOfKeysInput;
