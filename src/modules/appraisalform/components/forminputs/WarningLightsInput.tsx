import React from 'react';
import styled from 'styled-components';

import { FormField } from '../../../../interfaces.d';
import SelectBoxes from '../SelectBoxes';
import { FormFields } from './Inputs.language';
interface Props {
  field: FormField;
  className?: string;
}

const WarningLightsInput: React.FC<Props> = ({ field }) => {
  const { onChange } = field;

  const handleOnChange = (value: string) => {
    onChange({ ...field, value });
  };

  return (
    <WarningLightsContainer>
      <SelectBoxes
        field={{
          ...field,
          options: [FormFields.warningLights.yes, FormFields.warningLights.no],
          label: FormFields.warningLights.label,
          onClick: handleOnChange,
          value: field.value,
        }}
      />
    </WarningLightsContainer>
  );
};

const WarningLightsContainer = styled.div`
  margin-right: 10px;
  @media (max-width: 768px) {
    margin: 0 0 16px 0;
  }
`;

export default WarningLightsInput;
