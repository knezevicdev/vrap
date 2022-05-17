import React from 'react';
import styled from 'styled-components';

import { FormField } from '../../../../interfaces.d';
import SelectBoxes from '../SelectBoxes';
import { FormFields } from './Inputs.language';

interface Props {
  field: FormField;
  className?: string;
}

const ScratchesPanelsInput: React.FC<Props> = ({ field }) => {
  const { onChange, value } = field;

  const handleOnChange = (value: string) => {
    onChange({ ...field, value });
  };

  return (
    <ScratchesInputPanelsContainer>
      <SelectBoxes
        field={{
          ...field,
          options: ['1', '2', '3', '4', '5'],
          label: FormFields.scratchesPanels.label,
          onClick: handleOnChange,
          value,
          panelsTooltip: 'scratches',
        }}
      />
    </ScratchesInputPanelsContainer>
  );
};

const ScratchesInputPanelsContainer = styled.div`
  width: 100%;
  margin: 16px 0;
`;

export default ScratchesPanelsInput;
