import React from 'react';

import { FormField } from '../../../../interfaces.d';
import SelectBoxes from '../SelectBoxes';
import { FormFields } from './Inputs.language';

interface Props {
  field: FormField;
  className?: string;
}

const SmokedInInput: React.FC<Props> = ({ field }) => {
  const { onChange, value } = field;

  const handleOnChange = (value: string) => {
    onChange({ ...field, value });
  };

  return (
    <SelectBoxes
      field={{
        ...field,
        options: [FormFields.smokedIn.yes, FormFields.smokedIn.no],
        label: FormFields.smokedIn.label,
        onClick: handleOnChange,
        value,
      }}
    />
  );
};

export default SmokedInInput;
