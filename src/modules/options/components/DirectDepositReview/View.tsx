import { Button, Typography } from '@vroom-web/ui-lib';
import { observer } from 'mobx-react';
import { useRouter } from 'next/router';
import React from 'react';
import styled from 'styled-components';

import ViewModel from './ViewModel';

import { useAppStore } from 'src/context';
import Icon, { Icons } from 'src/core/Icon';
import { displayFirstTextUpper, displayPaymentAccount } from 'src/utils';

export interface Props {
  viewModel: ViewModel;
}

const DirectDepositReviewView: React.FC<Props> = ({ viewModel }) => {
  const { store } = useAppStore();
  const { mutationInput } = store.deposit;
  const router = useRouter();

  const handleReview = () => {
    const priceId = store.deposit.priceId || localStorage.getItem('priceId');
    router.push(`/verification/review?priceId=${priceId}`);
  };

  const handleOpenLink = () => {
    viewModel.handleOpenLink();
  };

  return (
    <Container>
      <AccountContainer>
        <div>image</div>
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
      <Link onClick={handleOpenLink}>{viewModel.linkADifferentAccount}</Link>
      <SubmitButton onClick={handleReview}>{viewModel.review}</SubmitButton>
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

const Link = styled(Typography.Body.Regular)`
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

export default observer(DirectDepositReviewView);
