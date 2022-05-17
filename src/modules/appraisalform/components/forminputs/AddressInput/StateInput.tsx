import { SelectChanges, SelectItem } from '@vroom-web/ui-lib';
import React from 'react';

import { STATES } from '../../../constants/misc';
import Select from '../../Select';
import { FormFields } from '../Inputs.language';

export interface Props {
  field: any;
  className: string;
  onKeyPressEnter: (e: any) => void;
}

const StateInput: React.FC<Props> = ({ field, className, onKeyPressEnter }) => {
  const { onChange } = field;
  const handleOnChange = (changes: SelectChanges<SelectItem>) => {
    const value = changes.selectedItem?.value;
    onChange({ ...field, value });
  };

  return (
    <Select
      className={className}
      field={{
        ...field,
        placeholder: FormFields.state.placeholder,
        label: FormFields.state.label,
        type: FormFields.state.type,
        options: STATES,
        onChange: handleOnChange,
        onKeyPress: onKeyPressEnter,
      }}
    />
  );
};

export default StateInput;
