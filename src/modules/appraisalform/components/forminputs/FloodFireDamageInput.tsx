import React from 'react';
import styled from 'styled-components';

import { FormField } from '../../../../interfaces.d';
import SelectBoxes from '../SelectBoxes';
import { FormFields } from './Inputs.language';

interface Props {
  field: FormField;
  className?: string;
}

const FloodFireDamageInput: React.FC<Props> = ({ field }) => {
  const { onChange } = field;

  const handleOnChange = (value: string) => {
    onChange({ ...field, value });
  };

  return (
    <FloodFireDamageInputContainer>
      <SelectBoxes
        field={{
          ...field,
          options: [
            FormFields.floodFireDamage.yes,
            FormFields.floodFireDamage.no,
          ],
          label: FormFields.floodFireDamage.label,
          onClick: handleOnChange,
          value: field.value,
        }}
      />
    </FloodFireDamageInputContainer>
  );
};

const FloodFireDamageInputContainer = styled.div`
  width: 50%;
  @media (max-width: 767px) {
    width: 100%;
    margin-left: 0px;
    margin-bottom: 16px;
  }
`;

export default FloodFireDamageInput;
