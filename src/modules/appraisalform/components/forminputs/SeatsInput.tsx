import React from 'react';

import { FormField } from '../../../../interfaces.d';
import SelectBoxes from '../SelectBoxes';
import { FormFields } from './Inputs.language';

interface Props {
  field: FormField;
  className?: string;
}

const SeatsInput: React.FC<Props> = ({ field }) => {
  const { onChange, value } = field;

  const handleOnChange = (value: string) => {
    onChange({ ...field, value });
  };

  return (
    <SelectBoxes
      field={{
        ...field,
        options: [FormFields.seats.leather, FormFields.seats.cloth],
        label: FormFields.seats.label,
        onClick: handleOnChange,
        value,
      }}
    />
  );
};

export default SeatsInput;
