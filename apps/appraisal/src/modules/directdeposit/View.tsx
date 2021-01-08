import React from 'react';
import styled from 'styled-components';
import { observer } from 'mobx-react';

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

const DDToggleLink = styled.span`
  font-family: Calibre;
  font-weight: normal;
  letter-spacing: 0.25px;
  color: #E7131A;
  font-size: 18px;
  line-height: 24px;
  text-decoration: underline;
`;

export interface Props {
  viewModel: DirectDepositViewModel;
  email: string;
}

const DirectDepositView: React.FC<Props> = ({ viewModel, email }) => {
  let token = viewModel.getPlaidLinkToken();

  return (
    <DirectDepositContainer>
      <DirectDepositCopy>{viewModel.bankInfo}</DirectDepositCopy>
      {viewModel.getShowPlaidLink() ? (
        <>
          <PlaidButton token={token} plaidSuccess={viewModel.onPlaidSuccess} priceId={viewModel.getPriceId()} email={email} />
          {viewModel.ddToggleOrCopy}
          <DDToggleLink onClick={() => viewModel.togglePlaidLink()}>{viewModel.ddToggleManualCopy}</DDToggleLink>
        </>
      ) : (
        <>
          <DirectDeposit />
          {viewModel.ddToggleOrCopy}
          <DDToggleLink onClick={() => viewModel.togglePlaidLink()}>{viewModel.ddTogglePlaidCopy}</DDToggleLink>
        </>
      )}
    </DirectDepositContainer>
  );
};

export default observer(DirectDepositView);
