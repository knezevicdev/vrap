import React from 'react';
import styled from 'styled-components';

import DirectDepositViewModel from './ViewModel';

import DirectDeposit from 'src/components/DirectDeposit';
import PlaidButton from 'src/components/PlaidButton';
import Icon, { Icons } from 'src/core/Icon';
import { Body } from 'src/core/Typography';
import { observer } from 'mobx-react';

export interface Props {
  viewModel: DirectDepositViewModel;
}

const DirectDepositView: React.FC<Props> = ({ viewModel }) => {
  const token = viewModel.getPlaidLinkToken();
  const showPlaidVariant = viewModel.getPlaidExperimentAssignedExperiment();
  const showNotFound = viewModel.getInstitutionNotFound();

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
      { !viewModel.getPlaidExperimentAssignedExperiment() && (<DirectDepositCopy>{viewModel.bankInfo}</DirectDepositCopy> )}
      {viewModel.getShowPlaidLink() ? (
        <>
          <PlaidButton
            token={token}
            plaidSuccess={viewModel.onPlaidSuccess}
            priceId={viewModel.getPriceId()}
          />
          { showPlaidVariant ? (
            <>
              { showNotFound ? ( 
                <>
                  <DirectDepositCopy>
                    {viewModel.cantFind}
                  </DirectDepositCopy>
                  <DirectDeposit />
                </>
              ) : (
                <LockText><StyledIcon icon={Icons.LOCK} /> Your information will be secure and encrypted</LockText>
              )}
            </>
          ) : (
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

const DirectDepositContainer = styled('div')`
  width: 100%;
`;

const DirectDepositCopy = styled(Body.Regular)`
  display: flex;
  padding: 20px 0 15px;
`;

const LockText = styled(Body.Small)`
  align-items: center;
  display: flex;
  justify-content: center;
  width: 50%;
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

const StyledIcon = styled(Icon)`
  margin: 0 5px;
`;

export default observer(DirectDepositView);
