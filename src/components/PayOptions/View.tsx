import { Icon, Radio, RadioGroup } from '@vroom-web/ui-lib';
import { observer } from 'mobx-react';
import React from 'react';
import styled from 'styled-components';

import ViewModel from './ViewModel';

import { Icons } from 'src/core/Icon';

export interface Props {
  selected: string;
  viewModel: ViewModel;
  handleAddressChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const PayOptionsContainer = styled.div`
  display: flex;

  @media (max-width: 420px) {
    flex-direction: column;
  }
`;

// const OptionContainer = styled.div<{ selected?: boolean }>`
//   width: 50%;
//   padding: 20px;
//   outline: ${({ selected }): string =>
//     selected ? '2px solid #E7131A' : 'none'};
//   box-sizing: border-box;
//   box-shadow: ${({ selected }): string =>
//     selected ? '0px 0px 3px rgba(0, 0, 0, 0.2)' : ''};
//   height: fit-content;

//   @media (max-width: 420px) {
//     width: 100%;
//   }
// `;

const PayOptionsView: React.FC<Props> = ({
  selected,
  viewModel,
  handleAddressChange,
}) => {
  const radioOptions = viewModel.optionMeta.map((option) => {
    let child = <div>{option}</div>;
    if (option === 'Direct Deposit') {
      child = (
        <div>
          <Label>
            Direct Deposit with{' '}
            <PlaidIconWrapper>
              <Icon icon={Icons.PLAID_LOGO} />
            </PlaidIconWrapper>
          </Label>
          <CheckItem>
            <Icon icon={Icons.CHECK_MARK_GREEN} /> Faster than check by mail
          </CheckItem>
          <CheckItem>
            <Icon icon={Icons.CHECK_MARK_GREEN} /> Most secure way to transfer
            funds
          </CheckItem>
        </div>
      );
    }

    return (
      <Radio
        checked={selected === option}
        disabled={false}
        name={'paymentOption'}
        value={option}
        onChange={handleAddressChange}
        dataQa={'paymentOption-' + option.replaceAll(' ', '')}
        id={option.replaceAll(' ', '')}
        key={option.replaceAll(' ', '')}
      >
        {child}
      </Radio>
    );
  });

  return (
    <PayOptionsContainer>
      <RadioGroup>{radioOptions}</RadioGroup>
    </PayOptionsContainer>
  );
};

const CheckItem = styled.div`
  font-weight: 300;
  padding: 5px 0;
`;

const Label = styled.div`
  display: flex;
`;

const PlaidIconWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
  margin-left: 5px;
`;

export default observer(PayOptionsView);
