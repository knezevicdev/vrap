import React from 'react';

import Dropdown from '../../Dropdown';
import { FormFields } from '../Inputs.language';

export interface Props {
  field: any;
  className: string;
  onKeyPressEnter: (e: any) => void;
}

const StateInput: React.FC<Props> = ({ field, className, onKeyPressEnter }) => {
  const { onChange } = field;
  const handleOnChange = (event: any) => {
    const value = event.target.value;
    const error = value === 'state';
    onChange({ ...field, value, error });
  };

  return (
    <Dropdown
      className={className}
      field={{
        ...field,
        placeholder: FormFields.state.placeholder,
        label: FormFields.state.label,
        type: FormFields.state.type,
        onChange: handleOnChange,
        onKeyPress: onKeyPressEnter,
      }}
    />
  );
};

export default StateInput;
