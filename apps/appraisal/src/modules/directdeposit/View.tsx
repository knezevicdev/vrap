import React from 'react';
import styled from 'styled-components';

import DirectDepositViewModel from './ViewModel';

import { Body } from 'src/core/Typography';

import DirectDeposit from 'src/components/DirectDeposit';
import PlaidButton from 'src/components/PlaidButton';

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
  let token = viewModel.getPlaidLinkToken();
  console.log('dd module', token);

  return (
    <DirectDepositContainer>
      <DirectDepositCopy>{viewModel.bankInfo}</DirectDepositCopy>
      {viewModel.getShowPlaidLink() ? (
        <PlaidButton token={token} />
      ) : (
        <DirectDeposit />
      )}
    </DirectDepositContainer>
  );
};

export default DirectDepositView;
