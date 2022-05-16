import React from 'react';
import styled from 'styled-components';

import { FormField } from '../../../../interfaces.d';
import SelectBoxes from '../SelectBoxes';
import { FormFields } from './Inputs.language';

interface Props {
  field: FormField;
  className?: string;
}

const DentsInput: React.FC<Props> = ({ field }) => {
  const { onChange, value } = field;

  const handleOnChange = (value: string) => {
    onChange({ ...field, value });
  };

  return (
    <DentsInputContainer>
      <SelectBoxes
        field={{
          ...field,
          options: [FormFields.dents.yes, FormFields.dents.no],
          label: FormFields.dents.label,
          onClick: handleOnChange,
          value,
        }}
      />
    </DentsInputContainer>
  );
};

const DentsInputContainer = styled.div`
  width: 100%;
  margin: 16px 0;
`;

export default DentsInput;
