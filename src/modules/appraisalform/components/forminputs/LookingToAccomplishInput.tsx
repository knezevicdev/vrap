import React from 'react';
import RadioInput from '@app/components/RadioInput';
import PropTypes from 'prop-types';
import { FormFields } from '../Inputs.language';

const LookingToAccomplishInput = ({ field, className }) => {
  const { onChange } = field;

  const handleOnChange = value => {
    onChange({ ...field, value });
  };

  return (
    <RadioInput
      field={{
        ...field,
        className,
        name: FormFields.lookingToAccomplish.name,
        label: FormFields.lookingToAccomplish.label,
        onClick: handleOnChange,
        selected: field.value,
        options: [
          {
            label: FormFields.lookingToAccomplish.sellMyVehicle.label
          },
          {
            label: FormFields.lookingToAccomplish.tradeIn.label
          },
          {
            label: FormFields.lookingToAccomplish.notSure.label
          }
        ]
      }}
    />
  );
};

LookingToAccomplishInput.propTypes = {
  field: PropTypes.object,
  className: PropTypes.string
};

export default LookingToAccomplishInput;
