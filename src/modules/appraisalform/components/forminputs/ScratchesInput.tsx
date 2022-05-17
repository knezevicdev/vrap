import React from 'react';
import styled from 'styled-components';

import { FormField } from '../../../../interfaces.d';
import SelectBoxes from '../SelectBoxes';
import { FormFields } from './Inputs.language';

interface Props {
  field: FormField;
  className?: string;
}

const ScratchesInput: React.FC<Props> = ({ field }) => {
  const { onChange, value } = field;

  const handleOnChange = (value: string) => {
    onChange({ ...field, value });
  };

  return (
    <ScratchesInputContainer>
      <SelectBoxes
        field={{
          ...field,
          options: [FormFields.scratches.yes, FormFields.scratches.no],
          label: FormFields.scratches.label,
          onClick: handleOnChange,
          value,
        }}
      />
    </ScratchesInputContainer>
  );
};

const ScratchesInputContainer = styled.div`
  width: 100%;
  margin: 16px 0;
`;

export default ScratchesInput;
