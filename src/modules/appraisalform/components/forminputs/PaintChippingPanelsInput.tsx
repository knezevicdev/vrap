import React from 'react';
import styled from 'styled-components';

import { FormField } from '../../../../interfaces.d';
import SelectBoxes from '../SelectBoxes';

interface Props {
  field: FormField;
  className?: string;
}

const PaintChippingPanelsInput: React.FC<Props> = ({ field }) => {
  const { onChange, value } = field;

  const handleOnChange = (value: string) => {
    onChange({ ...field, value });
  };

  return (
    <PaintChippingPanelsInputContainer>
      <SelectBoxes
        field={{
          ...field,
          options: ['1', '2', '3', '4', '5'],
          label: 'How many panels have paint chipping?',
          onClick: handleOnChange,
          value,
          panelsTooltip: 'paintChipping',
        }}
      />
    </PaintChippingPanelsInputContainer>
  );
};

const PaintChippingPanelsInputContainer = styled.div`
  width: 100%;
  margin: 16px 0;
`;

export default PaintChippingPanelsInput;
