import React from 'react';
import styled from 'styled-components';

import { FormField } from '../../../../interfaces.d';
import SelectBoxes from '../SelectBoxes';
import { FormFields } from './Inputs.language';

interface Props {
  field: FormField;
  className?: string;
}

const RunnableInput: React.FC<Props> = ({ field }) => {
  const { onChange } = field;

  const handleOnChange = (value: string) => {
    onChange({ ...field, value });
  };

  return (
    <RunnableContainer>
      <SelectBoxes
        field={{
          ...field,
          options: [FormFields.runnable.yes, FormFields.runnable.no],
          label: FormFields.runnable.label,
          onClick: handleOnChange,
          value: field.value,
        }}
      />
    </RunnableContainer>
  );
};

const RunnableContainer = styled.div`
  width: 50%;
  margin: 20px 10px 20px 0;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

export default RunnableInput;
