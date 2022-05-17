import React from 'react';
import styled from 'styled-components';

import { FormField } from '../../../../interfaces.d';
import SelectBoxes from '../SelectBoxes';
import { FormFields } from './Inputs.language';

interface Props {
  field: FormField;
  className?: string;
}

const PaintChippingInput: React.FC<Props> = ({ field }) => {
  const { onChange, value } = field;

  const handleOnChange = (value: string) => {
    onChange({ ...field, value });
  };

  return (
    <PaintChippingInputContainer>
      <SelectBoxes
        field={{
          ...field,
          options: [FormFields.paintChipping.yes, FormFields.paintChipping.no],
          label: FormFields.paintChipping.label,
          onClick: handleOnChange,
          value,
        }}
      />
    </PaintChippingInputContainer>
  );
};

const PaintChippingInputContainer = styled.div`
  width: 100%;
  margin: 16px 0;
`;

export default PaintChippingInput;
