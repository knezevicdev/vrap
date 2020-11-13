import React from 'react';
import styled from 'styled-components';

import RadioButton from 'src/core/Radio';

export interface Props {
  optionMeta: Array<string>;
  selected: string;
  handleClick: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const PayOptionsContainer = styled.div`
  display: flex;

  @media (max-width: 420px) {
    flex-direction: column;
  }
`;

const OptionContainer = styled.div<{ selected?: boolean }>`
  width: 50%;
  padding: 20px;
  outline: ${({ selected }) => (selected ? '2px solid red' : 'none')};

  @media (max-width: 420px) {
    width: 100%;
  }
`;

const PayOptionsView: React.FC<Props> = ({
  optionMeta,
  selected,
  handleClick,
}) => {
  return (
    <PayOptionsContainer>
      {optionMeta.map((option) => {
        const checked = selected === option;
        return (
          <OptionContainer selected={checked} key={option}>
            <RadioButton
              checked={checked}
              disabled={false}
              name={option}
              onChange={handleClick}
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
