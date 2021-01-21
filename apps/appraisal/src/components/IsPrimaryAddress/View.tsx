import React from 'react';
import styled from 'styled-components';

import RadioButton from 'src/core/Radio';

export interface Props {
  optionMeta: Array<string>;
  selected: string;
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
  outline: ${({ selected }): string =>
    selected ? '2px solid #E7131A' : 'none'};
  box-sizing: border-box;
  box-shadow: ${({ selected }): string =>
    selected ? '0px 0px 3px rgba(0, 0, 0, 0.2)' : ''};

  @media (max-width: 420px) {
    width: 100%;
  }
`;

const IsPrimaryAddressView: React.FC<Props> = ({ optionMeta, selected }) => {
  return (
    <PayOptionsContainer>
      {optionMeta.map((option) => {
        const checked = selected === option;
        return (
          <OptionContainer selected={checked} key={option}>
            <RadioButton
              checked={checked}
              disabled={false}
              name={'isPrimaryAddress'}
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

export default IsPrimaryAddressView;
