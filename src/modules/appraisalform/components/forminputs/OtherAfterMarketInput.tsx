import React from 'react';

import { FormField, GenericObject } from '../../../../interfaces.d';
import Textarea from '../Textarea';

interface Props {
  field: FormField;
  className?: string;
}

const OtherAfterMarketInput: React.FC<Props> = ({ field, className }) => {
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
        placeholder: 'Please Explain',
        label: '',
        onChange: handleOnChange,
        maxlength: '255',
      }}
    />
  );
};

export default OtherAfterMarketInput;
