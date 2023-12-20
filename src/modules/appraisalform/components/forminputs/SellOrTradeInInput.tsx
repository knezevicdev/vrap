import React from 'react';
import styled from 'styled-components';

import { FormField } from '../../../../interfaces.d';
import SelectBoxes from '../SelectBoxes';

interface Props {
  field: FormField;
  className?: string;
}

const SellOrTradeInInput: React.FC<Props> = ({ field, className }) => {
  const { onChange, value } = field;

  const handleOnChange = (value: string) => {
    onChange({ ...field, value });
  };

  return (
    <StyledSelectBoxes
      className={className}
      field={{
        ...field,
        options: ['Sell', 'Trade'],
        label: 'Sell or Trade-in?',
        onClick: handleOnChange,
        value,
      }}
    />
  );
};

const StyledSelectBoxes = styled(SelectBoxes)`
  margin: 20px 0;
`;

export default SellOrTradeInInput;
