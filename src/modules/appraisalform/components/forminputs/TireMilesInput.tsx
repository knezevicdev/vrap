import React from 'react';
import RadioInput from '@app/components/RadioInput';
import PropTypes from 'prop-types';
import { FormFields } from '../Inputs.language';

const TireMilesInput = ({ field, className }) => {
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
            label: FormFields.tireMiles.underFive.label,
            description: ''
          },
          {
            label: FormFields.tireMiles.fiveToTen.label,
            description: ''
          },
          {
            label: FormFields.tireMiles.tenToTwenty.label,
            description: ''
          },
          {
            label: FormFields.tireMiles.twentyToThirty.label,
            description: ''
          },
          {
            label: FormFields.tireMiles.overThirty.label,
            description: ''
          }
        ],
        name: FormFields.tireMiles.name,
        label: FormFields.tireMiles.label,
        onClick: handleOnChange,
        tooltipText: FormFields.tireMiles.toolTip,
        selected: field.value
      }}
    />
  );
};

TireMilesInput.propTypes = {
  field: PropTypes.object,
  className: PropTypes.string
};

export default TireMilesInput;
