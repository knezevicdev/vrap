import React from 'react';
import styled from 'styled-components';

import { FormField } from '../../../../interfaces.d';
import SelectBoxes from '../SelectBoxes';
import { FormFields } from './Inputs.language';
interface Props {
  field: FormField;
  className?: string;
}

const HasAccidentInput: React.FC<Props> = ({ field }) => {
  const { onChange, value } = field;

  const handleOnChange = (value: string) => {
    onChange({ ...field, value });
  };

  return (
    <HasAccidentInputConteiner>
      <SelectBoxes
        field={{
          ...field,
          options: [FormFields.hasAccident.yes, FormFields.hasAccident.no],
          label: FormFields.hasAccident.label,
          onClick: handleOnChange,
          value,
        }}
      />
    </HasAccidentInputConteiner>
  );
};

const HasAccidentInputConteiner = styled.div`
  width: 50%;
  margin: 20px 0;

  @media (max-width: 767px) {
    width: 100%;
  }
`;

export default HasAccidentInput;
