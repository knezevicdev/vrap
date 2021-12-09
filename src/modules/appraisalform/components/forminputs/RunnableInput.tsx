import React from 'react';
import SelectBoxes from '@app/components/SelectBoxes';
import PropTypes from 'prop-types';
import { FormFields } from '../Inputs.language';

const RunnableInput = ({ field, className }) => {
  const { onChange } = field;

  const handleOnChange = value => {
    onChange({ ...field, value });
  };

  return (
    <SelectBoxes
      className={className}
      field={{
        ...field,
        options: [FormFields.runnable.yes, FormFields.runnable.no],
        label: FormFields.runnable.label,
        onClick: handleOnChange,
        value: field.value
      }}
    />
  );
};

RunnableInput.propTypes = {
  field: PropTypes.object,
  className: PropTypes.string
};

export default RunnableInput;
