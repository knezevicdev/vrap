import React from 'react';
import styled from 'styled-components';

import { FormField } from '../../../../interfaces.d';
import SelectBoxes from '../SelectBoxes';
import { FormFields } from './Inputs.language';

interface Props {
  field: FormField;
  className?: string;
}

const LienholderInput: React.FC<Props> = ({ field, className }) => {
  const { onChange, value } = field;

  const handleOnChange = (value: string) => {
    onChange({ ...field, value });
  };

  return (
    <StyledSelectBoxes
      className={className}
      field={{
        ...field,
        options: [
          FormFields.lienholder.loan,
          FormFields.lienholder.lease,
          FormFields.lienholder.neither,
        ],
        label: FormFields.lienholder.label,
        onClick: handleOnChange,
        value,
      }}
    />
  );
};

const StyledSelectBoxes = styled(SelectBoxes)`
  margin: 20px 0;
`;

export default LienholderInput;
