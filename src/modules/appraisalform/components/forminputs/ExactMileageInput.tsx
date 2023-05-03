import React from 'react';

import { FormField, GenericObject } from '../../../../interfaces.d';
import { displayNumber, numbersOnly } from '../formatting';
import Input from '../Input';

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
  const toolTipText = showToolTip
    ? 'Enter the exact mileage (as displayed on your odometer) to get a guaranteed price on your vehicle. Without the exact mileage, we may rescind or change the price.'
    : null;

  const handleOnChange = (event: GenericObject) => {
    const value = numbersOnly(event.target.value);
    onChange({ ...field, value, element: event.target });
  };

  return (
    <Input
      className={className}
      field={{
        ...field,
        placeholder: 'Exact Mileage',
        label: 'Exact Mileage',
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
