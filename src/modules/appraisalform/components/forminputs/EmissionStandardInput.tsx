import React from 'react';
import styled from 'styled-components';

import { FormField } from '../../../../interfaces.d';
import SelectBoxes from '../SelectBoxes';

interface Props {
  field: FormField;
  className?: string;
}

const EmissionStandardInput: React.FC<Props> = ({ field }) => {
  const { onChange, value } = field;

  const handleOnChange = (value: string) => {
    onChange({ ...field, value });
  };

  return (
    <InputContainer>
      <SelectBoxes
        field={{
          ...field,
          options: ['Yes', 'No'],
          label: 'Does your vehicle meet State emission standards?',
          onClick: handleOnChange,
          value,
        }}
      />
    </InputContainer>
  );
};

const InputContainer = styled.div`
  [role='radiogroup'] {
    width: 50%;
  }
  margin: 20px 0;

  @media (max-width: 767px) {
    [role='radiogroup'] {
      width: 100%;
    }
  }
`;

export default EmissionStandardInput;
