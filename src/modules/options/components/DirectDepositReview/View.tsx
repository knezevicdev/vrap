import { Button, Typography } from '@vroom-web/ui-lib';
import { observer } from 'mobx-react';
import getConfig from 'next/config';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import styled from 'styled-components';

import ViewModel from './ViewModel';

import { useAppStore } from 'src/context';
import Icon, { Icons } from 'src/core/Icon';
import { displayFirstTextUpper, displayPaymentAccount } from 'src/utils';
const { publicRuntimeConfig } = getConfig();

const VROOM_URL = publicRuntimeConfig.NEXT_PUBLIC_VROOM_URL;

export interface Props {
  viewModel: ViewModel;
}

const DirectDepositReviewView: React.FC<Props> = ({ viewModel }) => {
  const { store } = useAppStore();
  const { mutationInput } = store.deposit;
  const router = useRouter();

  useEffect(() => {
    if (store.deposit.institutionId) {
      viewModel.getLogo(store.deposit.institutionId);
    }
  }, [store.deposit.institutionId]);

  const handleReview = () => {
    const priceId = store.deposit.priceId || localStorage.getItem('priceId');
    router.push(`/verification/review?priceId=${priceId}`);
  };

  const handleReviewKeyDown = (event: any) => {
    if (event.key === 'Enter') {
      const priceId = store.deposit.priceId || localStorage.getItem('priceId');
      router.push(`/verification/review?priceId=${priceId}`);
    }
  };

  const handleOpenLink = () => {
    viewModel.handleOpenLink();
  };

  const handleOpenLinkKeyDown = (event: any) => {
    if (event.key === 'Enter') {
      viewModel.handleOpenLink();
    }
  };

  return (
    <Container>
      <AccountContainer>
        {store.deposit.institutionLogo && (
          <LogoContainer>
            <LogoImg
              alt=""
              src={`${VROOM_URL}/mypayments/logo/${store.deposit.institutionId}`}
            />
          </LogoContainer>
        )}
        <Account>
          <AcctTitle>
            {viewModel.depositToLink} {mutationInput?.Institution?.Name}{' '}
            {viewModel.account}
          </AcctTitle>
          <AcctDetail>
            {displayFirstTextUpper(viewModel.account)}
            {viewModel.colon} {displayPaymentAccount(7)}
            {mutationInput?.Account?.Mask}
          </AcctDetail>
        </Account>
      </AccountContainer>
      <LinkDiffAcct
        tabIndex={0}
        onClick={handleOpenLink}
        onKeyDown={handleOpenLinkKeyDown}
      >
        {viewModel.linkADifferentAccount}
      </LinkDiffAcct>
      <SubmitButton
        tabIndex={0}
        onClick={handleReview}
        onKeyDown={handleReviewKeyDown}
      >
        {viewModel.review}
      </SubmitButton>
      <EncryptContainer>
        <StyledIcon icon={Icons.LOCK} />
        <EncryptText>{viewModel.infoEncrypted}</EncryptText>
      </EncryptContainer>
    </Container>
  );
};

const Row = styled.div`
  display: flex;
  flex-direction: row;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
`;

const Container = styled(Column)`
  align-items: flex-start;
`;

const AccountContainer = styled(Row)`
  margin-bottom: 8px;
`;

const Account = styled(Column)`
  margin-left: 8px;
`;

const AcctTitle = styled(Typography.Title.Three)`
  line-height: 24px;
`;

const AcctDetail = styled(Typography.Body.Regular)``;

const LinkDiffAcct = styled(Typography.Body.Regular)`
  color: #e7131a;
  text-decoration: underline #e7131a;
  cursor: pointer;
`;
const EncryptContainer = styled(Row)`
  justify-content: center;
`;

const StyledIcon = styled(Icon)`
  margin: 0 5px;
`;

const EncryptText = styled(Typography.Body.Small)``;

const SubmitButton = styled(Button.Primary)`
  margin: 40px 0 15px 0;
  max-width: 270px;
  white-space: normal;
  width: 100%;

  @media (max-width: 420px) {
    max-width: 100%;
  }
`;

const LogoContainer = styled.div`
  width: 48px;
  height: 48px;
  margin-right: 8px;
`;

const LogoImg = styled.img`
  width: 48px;
  height: 48px;
`;

export default observer(DirectDepositReviewView);
