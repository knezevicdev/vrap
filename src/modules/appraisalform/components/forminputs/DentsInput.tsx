import React from 'react';

import { FormField } from '../../../../interfaces.d';
import SelectBoxes from '../SelectBoxes';
import { FormFields } from './Inputs.language';

interface Props {
  field: FormField;
  className?: string;
}

const DentsInput: React.FC<Props> = ({ field, className }) => {
  const { onChange, value } = field;

  const handleOnChange = (value: string) => {
    onChange({ ...field, value });
  };

  return (
    <SelectBoxes
      className={className}
      field={{
        ...field,
        options: [FormFields.dents.yes, FormFields.dents.no],
        label: FormFields.dents.label,
        onClick: handleOnChange,
        value,
      }}
    />
  );
};

export default DentsInput;
