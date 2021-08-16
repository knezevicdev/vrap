import { observer } from 'mobx-react';
import React from 'react';
import styled from 'styled-components';

import DirectDepositViewModel from './ViewModel';

import DirectDeposit from 'src/components/DirectDepositAB';
import PlaidButton from 'src/components/PlaidButtonAB';
import { Body } from 'src/core/Typography';

export interface Props {
  viewModel: DirectDepositViewModel;
}

const DirectDepositView: React.FC<Props> = ({ viewModel }) => {
  const token = viewModel.getPlaidLinkToken();
  const tokenIsLocal = viewModel.getTokenIsLocal();

  const DirectDepositLink = ({ lang }: { lang: string }): JSX.Element => {
    return (
      <DirectDepositCopy>
        {viewModel.ddToggleOrCopy}&nbsp;
        <DDToggleLink onClick={(): void => viewModel.togglePlaidLink()}>
          {lang}
        </DDToggleLink>
      </DirectDepositCopy>
    );
  };

  return (
    <DirectDepositContainer>
      {viewModel.getShowPlaidLink() ? (
        <>
          <PlaidButton
            token={token}
            tokenIsLocal={tokenIsLocal}
            plaidSuccess={viewModel.onPlaidSuccess}
            plaidExit={viewModel.onPlaidExit}
            priceId={viewModel.getPriceId()}
          />
        </>
      ) : (
        <>
          <DirectDeposit />
          <DirectDepositLink lang={viewModel.ddTogglePlaidCopy} />
        </>
      )}
    </DirectDepositContainer>
  );
};

const DirectDepositContainer = styled('div')`
  width: 100%;
`;

const DirectDepositCopy = styled(Body.Regular)`
  display: flex;
  padding: 20px 0 15px;
`;

const DDToggleLink = styled.span`
  font-family: Calibre;
  font-weight: normal;
  letter-spacing: 0.25px;
  color: #e7131a;
  font-size: 18px;
  line-height: 24px;
  text-decoration: underline;
  cursor: pointer;
`;

export default observer(DirectDepositView);
