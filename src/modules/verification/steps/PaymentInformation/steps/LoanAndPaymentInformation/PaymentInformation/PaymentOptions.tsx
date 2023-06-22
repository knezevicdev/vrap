import { Icon, Radio, RadioGroup } from '@vroom-web/ui-lib';
import React from 'react';

import {
  CheckItem,
  Label,
  OptionContainer,
  PayOptionsContainer,
  PlaidIconWrapper,
} from './Style.css';

import { Icons } from 'src/core/Icon';

interface Props {
  selectedPayment: string;
  setSelectedPayment: (value: string) => void;
}

const PaymentOptions = ({ selectedPayment, setSelectedPayment }: Props) => {
  return (
    <PayOptionsContainer>
      <RadioGroup>
        <Radio
          dataQa="paymentOption-DirectDeposit"
          checked={selectedPayment === 'DirectDeposit'}
          id="DirectDeposit"
          name="paymentOption"
          value="DirectDeposit"
          onChange={() => setSelectedPayment('DirectDeposit')}
        >
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
        </Radio>
        <Radio
          dataQa="paymentOption-CheckbyMail"
          checked={selectedPayment === 'CheckbyMail'}
          id="CheckbyMail"
          name="paymentOption"
          value="CheckbyMail"
          onChange={() => setSelectedPayment('CheckbyMail')}
        >
          <OptionContainer>
            <Label>Check by Mail</Label>
            <CheckItem>
              <Icon icon={Icons.ERROR_ICON} /> Check by mail may take up to 14
              days
            </CheckItem>
          </OptionContainer>
        </Radio>
      </RadioGroup>
    </PayOptionsContainer>
  );
};

export default PaymentOptions;
