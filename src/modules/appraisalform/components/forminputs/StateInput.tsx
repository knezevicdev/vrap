import React from 'react';

import { GenericObject } from '../../../../interfaces.d';
import { FormField } from '../componentInterfaces.d';
import Dropdown from '../Dropdown';
import { FormFields } from './Inputs.language';

interface Props {
  field: FormField;
  className?: string;
  maSelectable?: boolean;
  paSelectable?: boolean;
  onKeyPressEnter: (event: GenericObject) => void;
}

const StateInput: React.FC<Props> = ({ field, className, onKeyPressEnter }) => {
  const { onChange } = field;
  const handleOnChange = (event: GenericObject) => {
    const value = event.target.value;
    const error = value === 'state';
    onChange({ ...field, value, error });
  };

  return (
    <Dropdown
      className={className}
      field={{
        ...field,
        label: FormFields.state.label,
        type: FormFields.state.type,
        onChange: handleOnChange,
        onKeyPress: onKeyPressEnter,
      }}
    />
  );
};

export default StateInput;
