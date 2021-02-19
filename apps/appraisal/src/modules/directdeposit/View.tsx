import { observer } from 'mobx-react';
import React from 'react';
import styled from 'styled-components';

import DirectDepositViewModel from './ViewModel';

import DirectDeposit from 'src/components/DirectDeposit';
import PlaidButton from 'src/components/PlaidButton';
import { Body } from 'src/core/Typography';

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
  color: #e7131a;
  font-size: 18px;
  line-height: 24px;
  text-decoration: underline;
  cursor: pointer;
`;

export interface Props {
  viewModel: DirectDepositViewModel;
}

const DirectDepositView: React.FC<Props> = ({ viewModel }) => {
  const token = viewModel.getPlaidLinkToken();
  const showManualCopy = (viewModel.getPlaidExperimentAssignedExperiment() && viewModel.getInstitutionNotFound()) || !viewModel.getPlaidExperimentAssignedExperiment();

  const DirectDepositLink = ({ lang }: {lang: string}) => {
    return (
      <DirectDepositCopy>
        {viewModel.ddToggleOrCopy}&nbsp;
        <DDToggleLink onClick={(): void => viewModel.togglePlaidLink()}>
          {lang}
        </DDToggleLink>
      </DirectDepositCopy>
    )
  }

  return (
    <DirectDepositContainer>
      <DirectDepositCopy>{viewModel.bankInfo}</DirectDepositCopy>
      {viewModel.getShowPlaidLink() ? (
        <>
          <PlaidButton
            token={token}
            plaidSuccess={viewModel.onPlaidSuccess}
            priceId={viewModel.getPriceId()}
          />
          { showManualCopy && (
            <DirectDepositLink lang={viewModel.ddToggleManualCopy} />
          )}
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

export default observer(DirectDepositView);
