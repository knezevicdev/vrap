import { observer } from 'mobx-react';
import React from 'react';
import styled from 'styled-components';

import ViewModel from './ViewModel';

import Icon, { Icons } from 'src/core/Icon';
import RadioButton from 'src/core/Radio';

export interface Props {
  selected: string;
  viewModel: ViewModel;
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
  height: fit-content;

  @media (max-width: 420px) {
    width: 100%;
  }
`;

const PayOptionsView: React.FC<Props> = ({ selected, viewModel }) => {
  const radioOptions = viewModel.optionMeta.map((option) => {
    const checked = selected === option;
    let child = <div>{option}</div>;
    if (option === 'Direct Deposit') {
      child = (
        <>
          <Label>
            Direct Deposit with <Icon icon={Icons.PLAID_LOGO} />
          </Label>
          <CheckItem>
            <Icon icon={Icons.CHECK_MARK_GREEN} /> Faster than check by mail
          </CheckItem>
          <CheckItem>
            <Icon icon={Icons.CHECK_MARK_GREEN} /> Most secure way to transfer
            funds
          </CheckItem>
        </>
      );
    }

    return (
      <OptionContainer selected={checked} key={option}>
        <RadioButton
          checked={checked}
          disabled={false}
          name={'paymentOption'}
          value={option}
          onClick={viewModel.onPayOptionClick}
          type={''}
        >
          {child}
        </RadioButton>
      </OptionContainer>
    );
  });

  return <PayOptionsContainer>{radioOptions}</PayOptionsContainer>;
};

const CheckItem = styled.div`
  font-weight: 300;
  padding: 5px 0;
`;

const Label = styled.div`
  display: flex;
`;

export default observer(PayOptionsView);
