import React from 'react';
import styled from 'styled-components';

import { FormField } from '../../../../interfaces.d';
import SelectBoxes from '../SelectBoxes';
interface Props {
  field: FormField;
  className?: string;
}

const RepairedDamageInput: React.FC<Props> = ({ field }) => {
  const { onChange, value } = field;

  const handleOnChange = (value: string) => {
    onChange({ ...field, value });
  };

  return (
    <InputConteiner>
      <SelectBoxes
        field={{
          ...field,
          options: ['Yes', 'No'],
          label: 'Has the vehicle been repaired?',
          onClick: handleOnChange,
          value,
        }}
      />
    </InputConteiner>
  );
};

const InputConteiner = styled.div`
  width: 50%;
  margin: 20px 0;

  @media (max-width: 767px) {
    width: 100%;
  }
`;

export default RepairedDamageInput;
