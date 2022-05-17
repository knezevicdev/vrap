import React from 'react';
import styled from 'styled-components';

import { FormField } from '../../../../interfaces.d';
import SelectBoxes from '../SelectBoxes';
import { FormFields } from './Inputs.language';

interface Props {
  field: FormField;
  className?: string;
}

const HailDamageInput: React.FC<Props> = ({ field }) => {
  const { onChange } = field;

  const handleOnChange = (value: string) => {
    onChange({ ...field, value });
  };

  return (
    <HailDamageInputContainer>
      <SelectBoxes
        field={{
          ...field,
          options: [FormFields.hailDamage.yes, FormFields.hailDamage.no],
          label: FormFields.hailDamage.label,
          onClick: handleOnChange,
          value: field.value,
        }}
      />
    </HailDamageInputContainer>
  );
};

const HailDamageInputContainer = styled.div`
  width: 100%;
  margin: 16px 0;
`;

export default HailDamageInput;
