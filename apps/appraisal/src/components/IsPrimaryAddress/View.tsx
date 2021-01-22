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

const OptionContainer = styled.div<{ selected?: boolean; yesNoBox?: boolean }>`
  width: 25%;
  padding: ${({ yesNoBox }): string => (yesNoBox ? '0' : '20px')};
  height: ${({ yesNoBox }): string => (yesNoBox ? '40px' : '0')};
  border-left: none;
  border: 2px solid
    ${({ selected }): string => (selected ? '#E7131A' : '#d6d7da')};
  color: ${({ selected }): string => (selected ? 'blue' : 'red')};
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
          <OptionContainer selected={checked} key={option} yesNoBox={true}>
            <RadioButton
              checked={checked}
              disabled={false}
              name={'isPrimaryAddress'}
              value={option}
              yesNoBox={true}
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
