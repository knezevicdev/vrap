import React from 'react';
import styled from 'styled-components';

import { FormField } from '../../../../interfaces.d';
import SelectBoxes from '../SelectBoxes';

interface Props {
  field: FormField;
  className?: string;
}

const DentsPanelsInput: React.FC<Props> = ({ field }) => {
  const { onChange, value } = field;

  const handleOnChange = (value: string) => {
    onChange({ ...field, value });
  };

  return (
    <DentsInputContainer>
      <SelectBoxes
        field={{
          ...field,
          options: ['1', '2', '3', '4', '5'],
          label: 'How many panels have dents?',
          onClick: handleOnChange,
          value,
          panelsTooltip: 'dents',
        }}
      />
    </DentsInputContainer>
  );
};

const DentsInputContainer = styled.div`
  width: 100%;
  margin: 16px 0;
`;

export default DentsPanelsInput;
