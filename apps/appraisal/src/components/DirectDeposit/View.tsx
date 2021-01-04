import React from 'react';
import { PlaidLink } from 'react-plaid-link';
import styled from 'styled-components';

import DirectDepositViewModel from './ViewModel';

import FormikInput from 'src/core/FormikInput';
import { Body } from 'src/core/Typography';

const DirectDepositContainer = styled('div')(() => ({
  width: '100%',
}));

const DirectDepositCopy = styled(Body.Regular)(() => ({
  display: 'flex',
  padding: '20px 0 15px',
}));

export interface Props {
  viewModel: DirectDepositViewModel;
}

const DirectDepositView: React.FC<Props> = ({ viewModel }) => {
  return (
    <DirectDepositContainer>
      <DirectDepositCopy>{viewModel.bankInfo}</DirectDepositCopy>
      <InputContainer>
        <FormikInput
          id="routingNumber"
          name={'routingNumber'}
          label={viewModel.routingLabel}
          placeholder={viewModel.routingLabel}
          fluid={true}
          maxLength={9}
        />
      </InputContainer>
      <InputContainer>
        <FormikInput
          id="bankAccountNumber"
          name={'bankAccountNumber'}
          label={viewModel.bankAccountLabel}
          placeholder={viewModel.bankAccountLabel}
          fluid={true}
          maxLength={17}
        />
      </InputContainer>
      <PlaidLink
        token="link-sandbox-98fbb9ab-6c40-4344-a0f4-0a17f1e4918a"
        onSuccess={onSuccess}
      >
        Connect a bank account
      </PlaidLink>
    </DirectDepositContainer>
  );
};

const InputContainer = styled.div`
  width: 50%;
`;

export default DirectDepositView;
