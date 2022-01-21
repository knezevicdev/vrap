import React from 'react';

import { FormField } from '../../../../interfaces.d';
import RadioInput from '../RadioInput';
import { FormFields } from './Inputs.language';

interface Props {
  field: FormField;
  className?: string;
}

const TitleStatusInput: React.FC<Props> = ({ field, className }) => {
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
            label: FormFields.titleStatus.clean.label,
            description: FormFields.titleStatus.clean.description,
          },
          {
            label: FormFields.titleStatus.lemon.label,
            description: FormFields.titleStatus.lemon.description,
          },
          {
            label: FormFields.titleStatus.salvage.label,
            description: FormFields.titleStatus.salvage.description,
          },
          {
            label: FormFields.titleStatus.unknown.label,
            description: FormFields.titleStatus.unknown.description,
          },
        ],
        name: FormFields.titleStatus.name,
        label: FormFields.titleStatus.label,
        onClick: handleOnChange,
        selected: field.value,
        tooltipText: FormFields.titleStatus.toolTip,
      }}
    />
  );
};

export default TitleStatusInput;
