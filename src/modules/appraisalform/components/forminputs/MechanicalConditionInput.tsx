import React from 'react';

import { FormField } from '../../../../interfaces.d';
import RadioInput from '../RadioInput';
import { FormFields } from './Inputs.language';

interface Props {
  field: FormField;
  className?: string;
}

const MechanicalConditionInput: React.FC<Props> = ({ field, className }) => {
  const { onChange } = field;

  const handleOnChange = (value: string) => {
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
            description:
              FormFields.mechanicalCondition.aboveAverage.description,
          },
          {
            label: FormFields.mechanicalCondition.average.label,
            description: FormFields.mechanicalCondition.average.description,
          },
          {
            label: FormFields.mechanicalCondition.belowAverage.label,
            description:
              FormFields.mechanicalCondition.belowAverage.description,
          },
        ],
        name: FormFields.mechanicalCondition.name,
        label: FormFields.mechanicalCondition.label,
        onClick: handleOnChange,
        checked: field.value,
      }}
    />
  );
};

export default MechanicalConditionInput;
