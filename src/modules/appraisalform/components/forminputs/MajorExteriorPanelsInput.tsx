import React from 'react';
import styled from 'styled-components';

import { FormField } from '../../../../interfaces.d';
import SelectBoxes from '../SelectBoxes';

interface Props {
  field: FormField;
  className?: string;
}

const MajorExteriorPanelsInput: React.FC<Props> = ({ field }) => {
  const { onChange, value } = field;

  const handleOnChange = (value: string) => {
    onChange({ ...field, value });
  };

  return (
    <InputContainer>
      <SelectBoxes
        field={{
          ...field,
          options: ['1', '2', '3', '4', '5'],
          label:
            'Panels requiring replacement, missing parts/panels, misaligned panels',
          onClick: handleOnChange,
          value,
          panelsTooltip: 'majorExterior',
        }}
      />
    </InputContainer>
  );
};

const InputContainer = styled.div`
  width: 100%;
  margin: 16px 0;
`;

export default MajorExteriorPanelsInput;
