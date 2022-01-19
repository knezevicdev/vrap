import React from 'react';

import { FormField, GenericObject } from '../../../../interfaces.d';
import { displayNumber, numbersOnly } from '../formatting';
import Input from '../Input';
import { FormFields } from './Inputs.language';

interface Props {
  field: FormField;
  showToolTip?: boolean;
  className?: string;
  handleOnBlur: () => void;
}

const ExactMileageInput: React.FC<Props> = ({
  field,
  showToolTip = true,
  className,
  handleOnBlur,
}) => {
  const { onChange, value } = field;
  const mileage = displayNumber(value);
  const toolTipText = showToolTip ? FormFields.exactMileage.toolTip : null;

  const handleOnChange = (event: GenericObject) => {
    const value = numbersOnly(event.target.value);
    onChange({ ...field, value, element: event.target });
  };

  return (
    <Input
      className={className}
      field={{
        ...field,
        placeholder: FormFields.exactMileage.placeholder,
        label: FormFields.exactMileage.label,
        onChange: handleOnChange,
        onBlur: handleOnBlur,
        value: mileage,
        toolTipText,
        maxlength: '7',
      }}
    />
  );
};

export default ExactMileageInput;
