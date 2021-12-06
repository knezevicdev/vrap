import React from 'react';
import RadioInput from '@app/components/RadioInput';
import PropTypes from 'prop-types';
import { FormFields } from '../Inputs.language';

const ExteriorConditionInput = ({ field, className }) => {
  const { onChange } = field;

  const handleOnChange = value => {
    onChange({ ...field, value });
  };

  return (
    <RadioInput
      className={className}
      field={{
        ...field,
        options: [
          {
            label: FormFields.extCondition.aboveAverage.label,
            description: FormFields.extCondition.aboveAverage.description
          },
          {
            label: FormFields.extCondition.average.label,
            description: FormFields.extCondition.average.description
          },
          {
            label: FormFields.extCondition.belowAverage.label,
            description: FormFields.extCondition.belowAverage.description
          }
        ],
        name: FormFields.extCondition.name,
        label: FormFields.extCondition.label,
        onClick: handleOnChange,
        selected: field.value
      }}
    />
  );
};

ExteriorConditionInput.propTypes = {
  field: PropTypes.object,
  className: PropTypes.string
};

export default ExteriorConditionInput;
