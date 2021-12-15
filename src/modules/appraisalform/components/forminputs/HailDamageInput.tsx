import React from 'react';

import { FormField } from '../../../../interfaces.d';
import SelectBoxes from '../SelectBoxes';
import { FormFields } from './Inputs.language';

interface Props {
  field: FormField;
  className?: string;
}

const HailDamageInput: React.FC<Props> = ({ field, className }) => {
  const { onChange } = field;

  const handleOnChange = (value: string) => {
    onChange({ ...field, value });
  };

  return (
    <SelectBoxes
      className={className}
      field={{
        ...field,
        options: [FormFields.hailDamage.yes, FormFields.hailDamage.no],
        label: FormFields.hailDamage.label,
        onClick: handleOnChange,
        value: field.value,
      }}
    />
  );
};

export default HailDamageInput;
