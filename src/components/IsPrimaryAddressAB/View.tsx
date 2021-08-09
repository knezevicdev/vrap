import React from 'react';
import styled from 'styled-components';

import YesNoBox from 'src/core/YesNoBoxAB';

export interface Props {
  optionMeta: Array<string>;
  selected: string;
}

const PayOptionsContainer = styled.div`
  display: flex;
  margin-bottom: 20px;

  @media (max-width: 420px) {
    flex-direction: row;
  }
`;

const OptionContainer = styled.div<{ selected?: boolean }>`
  width: 40%;
  padding: 0;
  height: 48px;
  border-left: none;
  border: 2px solid
    ${({ selected }): string => (selected ? '#041022' : '#d6d7da')};
  box-sizing: border-box;
  box-shadow: ${({ selected }): string =>
    selected ? '0px 0px 3px rgba(0, 0, 0, 0.2)' : ''};

  @media (max-width: 420px) {
    width: 50%;
  }
`;

const IsPrimaryAddressView: React.FC<Props> = ({ optionMeta, selected }) => {
  return (
    <PayOptionsContainer>
      {optionMeta.map((option) => {
        const checked = selected === option;
        return (
          <OptionContainer selected={checked} key={option}>
            <YesNoBox
              checked={checked}
              disabled={false}
              name={'isPrimaryAddress'}
              value={option}
              styleType={'checkMail'}
            >
              {option}
            </YesNoBox>
          </OptionContainer>
        );
      })}
    </PayOptionsContainer>
  );
};

export default IsPrimaryAddressView;
