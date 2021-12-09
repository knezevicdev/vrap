import React from 'react';
import RadioInput from '@app/components/RadioInput';
import PropTypes from 'prop-types';
import { FormFields } from '../Inputs.language';

const MechanicalConditionInput = ({ field, className }) => {
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
            label: FormFields.mechanicalCondition.aboveAverage.label,
            description: FormFields.mechanicalCondition.aboveAverage.description
          },
          {
            label: FormFields.mechanicalCondition.average.label,
            description: FormFields.mechanicalCondition.average.description
          },
          {
            label: FormFields.mechanicalCondition.belowAverage.label,
            description: FormFields.mechanicalCondition.belowAverage.description
          }
        ],
        name: FormFields.mechanicalCondition.name,
        label: FormFields.mechanicalCondition.label,
        onClick: handleOnChange,
        selected: field.value
      }}
    />
  );
};

MechanicalConditionInput.propTypes = {
  field: PropTypes.object,
  className: PropTypes.string
};

export default MechanicalConditionInput;
