import { Icon, Typography } from '@vroom-web/ui-lib';
import { observer } from 'mobx-react';
import React from 'react';
import styled from 'styled-components';

import DirectDepositViewModel from './ViewModel';

import DirectDeposit from 'src/components/DirectDeposit';
import PlaidButton from 'src/components/PlaidButton';
import { Icons } from 'src/core/Icon';

export interface Props {
  viewModel: DirectDepositViewModel;
}

const DirectDepositView: React.FC<Props> = ({ viewModel }) => {
  const token = viewModel.getPlaidLinkToken();
  const tokenIsLocal = viewModel.getTokenIsLocal();
  const showNotFound = viewModel.getInstitutionNotFound();
  const DirectDepositLink = ({ lang }: { lang: string }): JSX.Element => {
    return (
      <DirectDepositCopy>
        Or,&nbsp;
        <DDToggleLink
          role="button"
          tabIndex={0}
          onClick={(): void => viewModel.togglePlaidLink()}
          onKeyDown={viewModel.togglePlaidLinkKeyDown}
        >
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
          <LockText>
            <StyledIcon icon={Icons.LOCK} /> Your information will be secure and
            encrypted
          </LockText>

          {showNotFound && viewModel.getPrice() <= 10000 && (
            <>
              <DirectDepositCopy>
                Can&apos;t find your bank? Enter bank information manually
              </DirectDepositCopy>
              <DirectDeposit />
            </>
          )}
        </>
      ) : (
        <>
          <DirectDeposit />
          <DirectDepositLink lang="link bank account" />
        </>
      )}
    </DirectDepositContainer>
  );
};

const DirectDepositContainer = styled('div')`
  width: 100%;
`;

const DirectDepositCopy = styled(Typography.Body.Regular)`
  display: flex;
  padding: 20px 0 15px;
`;

const LockText = styled(Typography.Body.Small)`
  align-items: center;
  display: flex;
  justify-content: center;
  width: 50%;

  @media (max-width: 420px) {
    width: 100%;
  }
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
