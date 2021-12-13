import React from 'react';

import { FormField } from '../../../../interfaces.d';
import RadioInput from '../RadioInput';
import { FormFields } from './Inputs.language';

interface Props {
  field: FormField;
  className: string;
}

const InteriorConditionInput: React.FC<Props> = ({ field, className }) => {
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
            label: FormFields.interiorCondition.aboveAverage.label,
            description: FormFields.interiorCondition.aboveAverage.description,
          },
          {
            label: FormFields.interiorCondition.average.label,
            description: FormFields.interiorCondition.average.description,
          },
          {
            label: FormFields.interiorCondition.belowAverage.label,
            description: FormFields.interiorCondition.belowAverage.description,
          },
        ],
        name: FormFields.interiorCondition.name,
        label: FormFields.interiorCondition.label,
        onClick: handleOnChange,
        selected: field.value,
      }}
    />
  );
};

export default InteriorConditionInput;
