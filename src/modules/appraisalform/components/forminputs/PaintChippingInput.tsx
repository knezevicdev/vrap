import React from 'react';

import { FormField } from '../../../../interfaces.d';
import SelectBoxes from '../SelectBoxes';
import { FormFields } from './Inputs.language';

interface Props {
  field: FormField;
  className: string;
}

const PaintChippingInput: React.FC<Props> = ({ field, className }) => {
  const { onChange, value } = field;

  const handleOnChange = (value: string) => {
    onChange({ ...field, value });
  };

  return (
    <SelectBoxes
      className={className}
      field={{
        ...field,
        options: [FormFields.paintChipping.yes, FormFields.paintChipping.no],
        label: FormFields.paintChipping.label,
        onClick: handleOnChange,
        value,
      }}
    />
  );
};

export default PaintChippingInput;
