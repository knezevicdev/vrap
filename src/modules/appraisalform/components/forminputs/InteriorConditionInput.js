import React from 'react';
import RadioInput from '@app/components/RadioInput';
import PropTypes from 'prop-types';
import { FormFields } from '../Inputs.language';

const InteriorConditionInput = ({ field, className }) => {
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
            label: FormFields.interiorCondition.aboveAverage.label,
            description: FormFields.interiorCondition.aboveAverage.description
          },
          {
            label: FormFields.interiorCondition.average.label,
            description: FormFields.interiorCondition.average.description
          },
          {
            label: FormFields.interiorCondition.belowAverage.label,
            description: FormFields.interiorCondition.belowAverage.description
          }
        ],
        name: FormFields.interiorCondition.name,
        label: FormFields.interiorCondition.label,
        onClick: handleOnChange,
        selected: field.value
      }}
    />
  );
};

InteriorConditionInput.propTypes = {
  field: PropTypes.object,
  className: PropTypes.string
};

export default InteriorConditionInput;
