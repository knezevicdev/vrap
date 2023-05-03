import React from 'react';

import { FormField, GenericObject } from '../../../../interfaces.d';
import Textarea from '../Textarea';

interface Props {
  field: FormField;
  className?: string;
  label?: string;
}

const AdditionalDetailsInput: React.FC<Props> = ({
  field,
  className,
  label,
}) => {
  const { onChange } = field;

  const handleOnChange = (event: GenericObject) => {
    const value = event.target.value;
    onChange({ ...field, value });
  };

  return (
    <Textarea
      className={className}
      field={{
        ...field,
        placeholder: '',
        label:
          label ||
          'Is there anything else we should know about this vehicle that might affect its value?',
        onChange: handleOnChange,
        maxlength: '255',
        dataQa: 'AdditionalDetails',
      }}
    />
  );
};

export default AdditionalDetailsInput;
