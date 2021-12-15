import React from 'react';

import { FormField } from '../../../../interfaces.d';
import RadioInput from '../RadioInput';
import { FormFields } from './Inputs.language';

interface Props {
  field: FormField;
  className?: string;
}

const TireMilesInput: React.FC<Props> = ({ field, className }) => {
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
            label: FormFields.tireMiles.underFive.label,
            description: '',
          },
          {
            label: FormFields.tireMiles.fiveToTen.label,
            description: '',
          },
          {
            label: FormFields.tireMiles.tenToTwenty.label,
            description: '',
          },
          {
            label: FormFields.tireMiles.twentyToThirty.label,
            description: '',
          },
          {
            label: FormFields.tireMiles.overThirty.label,
            description: '',
          },
        ],
        name: FormFields.tireMiles.name,
        label: FormFields.tireMiles.label,
        onClick: handleOnChange,
        tooltipText: FormFields.tireMiles.toolTip,
        selected: field.value,
      }}
    />
  );
};

export default TireMilesInput;
