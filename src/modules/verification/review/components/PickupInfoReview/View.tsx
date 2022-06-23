import { Typography } from '@vroom-web/ui-lib';
import { Link } from '@vroom-web/ui-lib';
import { observer } from 'mobx-react';
import React from 'react';
import styled from 'styled-components';

import ViewModel from './ViewModel';

import Store from 'src/store';

interface Props {
  viewModel: ViewModel;
  store: Store;
}

const PickupInfoReviewView: React.FC<Props> = ({ viewModel, store }) => {
  const { verificationDetail } = store.verification;
  return (
    <Container>
      <SubTitleContainer>
        <Subtitle>{viewModel.pickUpInfotitle}</Subtitle>
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
        <FullInfo>
          <Label>{viewModel.pickUpAddress}</Label>
          <Field>
            {verificationDetail?.pickup_address.address_1}{' '}
            {verificationDetail?.pickup_address.address_2}{' '}
            {verificationDetail?.pickup_address.city},{' '}
            {verificationDetail?.pickup_address.city}{' '}
            {verificationDetail?.pickup_address.zipcode}
          </Field>
        </FullInfo>
      </Row>

      <SectionTitle>{viewModel.contactInformation}</SectionTitle>
      <Row>
        <Info>
          <Label>{viewModel.name}</Label>
          <Field>
            {verificationDetail?.pickup_contact_first_name}{' '}
            {verificationDetail?.pickup_contact_last_name}
          </Field>
        </Info>
      </Row>
      <Row>
        <Info>
          <Label>{viewModel.phoneNumber}</Label>
          <Field>{verificationDetail?.pickup_contact_phone_number}</Field>
        </Info>
        <Info>
          <Label>{viewModel.email}</Label>
          <Field>{verificationDetail?.pickup_contact_email}</Field>
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

const SectionTitle = styled(Typography.Title.Three)`
  text-align: left;
  margin: 20px 0;
  font-size: 16px;
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
  width: 50%;
  @media (max-width: 767px) {
    width: 100%;
    margin-bottom: 10px;
  }
`;

const FullInfo = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
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

export default observer(PickupInfoReviewView);
