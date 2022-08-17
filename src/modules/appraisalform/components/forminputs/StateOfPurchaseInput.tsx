import { SelectChanges, SelectItem } from '@vroom-web/ui-lib';
import React from 'react';
import styled from 'styled-components';

import { GenericObject } from '../../../../interfaces.d';
import { STATES } from '../../constants/misc';
import { FormField } from '../componentInterfaces.d';
import BaseSelect from '../Select';
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
    <>
      <Label>{FormFields.stateOfPurchase.label}</Label>
      <Select
        className={className}
        field={{
          ...field,
          defaultLabel: FormFields.stateOfPurchase.placeholder,
          type: FormFields.stateOfPurchase.type,
          options: STATES,
          onChange: handleOnChange,
          onKeyPress: onKeyPressEnter,
        }}
      />
    </>
  );
};

const Select = styled(BaseSelect)`
  width: 50%;
  @media (max-width: 767px) {
    width: 100%;
  }
`;

const Label = styled.label`
  font-family: Calibre-Regular;
  font-size: 18px;
  line-height: 18px;
  margin-bottom: 10px;
  display: inline-block;
  letter-spacing: 0.3px;
`;

export default StateInput;
