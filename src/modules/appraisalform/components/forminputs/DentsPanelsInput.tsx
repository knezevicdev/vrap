import React from 'react';

import { FormField } from '../../../../interfaces.d';
import SelectBoxes from '../SelectBoxes';
import { FormFields } from './Inputs.language';

interface Props {
  field: FormField;
  className?: string;
}

const DentsPanelsInput: React.FC<Props> = ({ field, className }) => {
  const { onChange, value } = field;

  const handleOnChange = (value: number) => {
    onChange({ ...field, value });
  };

  return (
    <SelectBoxes
      className={className}
      field={{
        ...field,
        options: [1, 2, 3, 4, 5],
        label: FormFields.dentsPanels.label,
        onClick: handleOnChange,
        value,
        panelsTooltip: 'dents',
      }}
    />
  );
};

export default DentsPanelsInput;
