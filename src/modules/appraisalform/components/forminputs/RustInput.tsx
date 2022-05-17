import React from 'react';
import styled from 'styled-components';

import { FormField } from '../../../../interfaces.d';
import SelectBoxes from '../SelectBoxes';
import { FormFields } from './Inputs.language';

interface Props {
  field: FormField;
  className?: string;
}

const RustInput: React.FC<Props> = ({ field }) => {
  const { onChange, value } = field;

  const handleOnChange = (value: string) => {
    onChange({ ...field, value });
  };

  return (
    <RustInputContainer>
      <SelectBoxes
        field={{
          ...field,
          options: [FormFields.rust.yes, FormFields.rust.no],
          label: FormFields.rust.label,
          onClick: handleOnChange,
          value,
        }}
      />
    </RustInputContainer>
  );
};

const RustInputContainer = styled.div`
  width: 100%;
  margin: 16px 0;
`;

export default RustInput;
