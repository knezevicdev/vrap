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
  setFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean | undefined
  ) => void;
}

const PayOptionsContainer = styled.div`
  display: flex;

  @media (max-width: 420px) {
    flex-direction: column;
  }
`;

const OptionContainer = styled.div`
  padding: 20px;
  height: fit-content;

  @media (max-width: 420px) {
    width: 100%;
  }
`;

const options = ['Direct Deposit', 'Check by Mail'];

const PayOptionsView: React.FC<Props> = ({
  selected,
  viewModel,
  handleAddressChange,
  setFieldValue,
}) => {
  if (viewModel.isAbsmartlyLoading) {
    return <Spinner src="assets/gifs/vroom-spinner.gif" alt="Loading..." />;
  }

  const radioOptions = options.map((option) => {
    let child = <OptionContainer>{option}</OptionContainer>;
    if (option === 'Direct Deposit') {
      child = (
        <OptionContainer>
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
        </OptionContainer>
      );
    }
    if (viewModel.isSuycPaymentCheckFeeTest && option === 'Check by Mail') {
      child = (
        <OptionContainer>
          <Label>Check by Mail</Label>
          <CheckItem>
            <Icon icon={Icons.ERROR_ICON} /> Check by mail may take up to 14
            days
          </CheckItem>
        </OptionContainer>
      );
    }

    return (
      <Radio
        checked={selected === option}
        disabled={false}
        name={'paymentOption'}
        value={option}
        onChange={(event) => {
          handleAddressChange(event);
          setFieldValue('paymentOption', option);
        }}
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

const Spinner = styled.img`
  min-width: 80px;
  max-width: 80px;
`;

export default observer(PayOptionsView);
