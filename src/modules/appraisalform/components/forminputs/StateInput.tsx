import { SelectChanges, SelectItem } from '@vroom-web/ui-lib';
import React from 'react';

import { GenericObject } from '../../../../interfaces.d';
import { STATES } from '../../constants/misc';
import { FormField } from '../componentInterfaces.d';
import Select from '../Select';
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
  const handleOnChange = (changes: SelectChanges<SelectItem>) => {
    const value = changes.selectedItem?.value;
    onChange({ ...field, value });
  };

  return (
    <Select
      className={className}
      field={{
        ...field,
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
