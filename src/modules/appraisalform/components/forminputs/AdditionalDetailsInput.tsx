import React from 'react';

import { FormField, GenericObject } from '../../../../interfaces.d';
import Textarea from '../Textarea';
import { FormFields } from './Inputs.language';

interface Props {
  field: FormField;
  className: string;
  label: string;
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
        placeholder: FormFields.additionalDetails.placeholder,
        label: label || FormFields.additionalDetails.label,
        onChange: handleOnChange,
        maxlength: '255',
        dataQa: 'AdditionalDetails',
      }}
    />
  );
};

export default AdditionalDetailsInput;
