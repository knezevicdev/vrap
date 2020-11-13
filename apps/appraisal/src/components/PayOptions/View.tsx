import React from 'react';
import styled from 'styled-components';

import RadioButton from 'src/core/Radio';

export interface Props {
  optionMeta: Array<string>;
  selected: string;
}

const PayOptionsContainer = styled.div`
  display: flex;
`;

const OptionContainer = styled.div<{ selected?: boolean }>`
  width: 50%;
  padding: 20px;
  outline: ${({ selected }) => (selected ? '2px solid red' : 'none')};
`;

const PayOptionsView: React.FC<Props> = ({ optionMeta, selected }) => {
  console.log(optionMeta);
  return (
    <PayOptionsContainer>
      {optionMeta.map((option) => {
        const checked = selected === option;
        return (
          <OptionContainer selected={checked} key={option}>
            <RadioButton
              checked={checked}
              disabled={false}
              name={'paymentOption'}
              value={option}
            >
              {option}
            </RadioButton>
          </OptionContainer>
        );
      })}
    </PayOptionsContainer>
  );
};

export default PayOptionsView;
