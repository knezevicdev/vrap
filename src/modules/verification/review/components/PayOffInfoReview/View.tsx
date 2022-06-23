import { Typography } from '@vroom-web/ui-lib';
import { Link } from '@vroom-web/ui-lib';
import { observer } from 'mobx-react';
import React from 'react';
import styled from 'styled-components';

import ViewModel from './ViewModel';

import Store from 'src/store';
import { displaySecureSSN } from 'src/utils';

interface Props {
  viewModel: ViewModel;
  store: Store;
}

const PayoffInfoReview: React.FC<Props> = ({ viewModel, store }) => {
  const { verificationDetail } = store.verification;
  return (
    <Container>
      <SubTitleContainer>
        <Subtitle>{viewModel.payOfftitle}</Subtitle>
        <LinkWrap>
          <Link.Text
            href={`/sell/verification/owner?priceId=${store.verification.offerId}`}
            onClick={(e): void => {
              e.preventDefault();
              viewModel.handleEditClick();
            }}
          >
            {viewModel.edit}
          </Link.Text>
        </LinkWrap>
      </SubTitleContainer>

      <Row>
        <Info>
          <Label>{viewModel.carPayment}</Label>
          <Field>{viewModel.getCurrentPayment()}</Field>
        </Info>
        <Info>
          <Label>{viewModel.whereCarPayment}</Label>
          <Field>{verificationDetail?.lien_financial_institution_name}</Field>
        </Info>
      </Row>
      <Row>
        <Info>
          <Label>{viewModel.loanAccountNumber}</Label>
          <Field>{verificationDetail?.lien_account_number}</Field>
        </Info>
        <Info>
          <Label>{viewModel.ssnLastFour}</Label>
          <Field>{displaySecureSSN(verificationDetail?.last_four_ssn)}</Field>
        </Info>
      </Row>
    </Container>
  );
};

const Container = styled.div`
  padding: 20px 0 30px 0;
`;

const SubTitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 26px;
`;

const Subtitle = styled(Typography.Title.Three)`
  line-height: 26px;
`;

const Row = styled.div`
  display: flex;
  margin-top: 15px;
  @media (max-width: 767px) {
    flex-direction: column;
    margin-top: 0;
  }
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  width: 35%;
  @media (max-width: 767px) {
    width: 100%;
    margin-bottom: 10px;
  }
`;

const Label = styled(Typography.Fine)`
  font-size: 13px;
  letter-spacing: 0.35px;
`;

const Field = styled(Typography.Body.Regular)`
  word-wrap: break-word;
`;

const LinkWrap = styled.span`
  margin-left: 5px;
`;

export default observer(PayoffInfoReview);
