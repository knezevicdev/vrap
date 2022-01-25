import React from 'react';

import { FormField } from '../../../../interfaces.d';
import RadioInput from '../RadioInput';
import { FormFields } from './Inputs.language';

interface Props {
  field: FormField;
  className: string;
}

const LookingToAccomplishInput: React.FC<Props> = ({ field, className }) => {
  const { onChange } = field;

  const handleOnChange = (value: string) => {
    onChange({ ...field, value });
  };

  return (
    <RadioInput
      className={className}
      field={{
        ...field,
        name: FormFields.lookingToAccomplish.name,
        label: FormFields.lookingToAccomplish.label,
        onClick: handleOnChange,
        checked: field.value,
        options: [
          {
            label: FormFields.lookingToAccomplish.sellMyVehicle.label,
          },
          {
            label: FormFields.lookingToAccomplish.tradeIn.label,
          },
          {
            label: FormFields.lookingToAccomplish.notSure.label,
          },
        ],
      }}
    />
  );
};

export default LookingToAccomplishInput;
