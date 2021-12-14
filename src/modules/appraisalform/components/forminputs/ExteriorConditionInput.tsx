import React from 'react';

import { FormField } from '../../../../interfaces.d';
import RadioInput from '../RadioInput';
import { FormFields } from './Inputs.language';

interface Props {
  field: FormField;
  className: string;
}

const ExteriorConditionInput: React.FC<Props> = ({ field, className }) => {
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
            label: FormFields.extCondition.aboveAverage.label,
            description: FormFields.extCondition.aboveAverage.description,
          },
          {
            label: FormFields.extCondition.average.label,
            description: FormFields.extCondition.average.description,
          },
          {
            label: FormFields.extCondition.belowAverage.label,
            description: FormFields.extCondition.belowAverage.description,
          },
        ],
        name: FormFields.extCondition.name,
        label: FormFields.extCondition.label,
        onClick: handleOnChange,
        selected: field.value,
      }}
    />
  );
};

export default ExteriorConditionInput;
