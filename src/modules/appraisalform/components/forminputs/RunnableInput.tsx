import React from 'react';

import { FormField } from '../../../../interfaces.d';
import SelectBoxes from '../SelectBoxes';
import { FormFields } from './Inputs.language';

interface Props {
  field: FormField;
  className?: string;
}

const RunnableInput: React.FC<Props> = ({ field, className }) => {
  const { onChange } = field;

  const handleOnChange = (value: string) => {
    onChange({ ...field, value });
  };

  return (
    <SelectBoxes
      className={className}
      field={{
        ...field,
        options: [FormFields.runnable.yes, FormFields.runnable.no],
        label: FormFields.runnable.label,
        onClick: handleOnChange,
        value: field.value,
      }}
    />
  );
};

export default RunnableInput;
