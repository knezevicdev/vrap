import { Typography } from '@vroom-web/ui-lib';
import { Link } from '@vroom-web/ui-lib';
import { observer } from 'mobx-react';
import React from 'react';
import styled from 'styled-components';

import ViewModel from './ViewModel';

import Store from 'src/store';
import { displayPhoneNumber } from 'src/utils';
interface Props {
  viewModel: ViewModel;
  store: Store;
}

const OwnerInfoReviewView: React.FC<Props> = ({ viewModel, store }) => {
  const { verificationDetail } = store.verification;
  return (
    <Container>
      <SubTitleContainer>
        <Subtitle>{viewModel.title}</Subtitle>
        <LinkWrap>
          <Link.Text
            href={`/sell/verification/owner/${store.verification.offerId}`}
            onClick={(e): void => {
              e.preventDefault();
              viewModel.handleEditClick();
            }}
          >
            {viewModel.edit}
          </Link.Text>
        </LinkWrap>
      </SubTitleContainer>

      <SectionTitle>{viewModel.primarySectionTitle}</SectionTitle>
      <Row>
        <Info>
          <Label>{viewModel.name}</Label>
          <Field>
            {verificationDetail?.owner_first_name}{' '}
            {verificationDetail?.owner_last_name}
          </Field>
        </Info>
        <Info>
          <Label>{viewModel.email}</Label>
          <Field>{verificationDetail?.owner_email_address}</Field>
        </Info>
        <Info>
          <Label>{viewModel.phone}</Label>
          <Field>
            {displayPhoneNumber(verificationDetail?.owner_phone_number)}
          </Field>
        </Info>
      </Row>
      <Row>
        <FullInfo>
          <Label>{viewModel.address}</Label>
          <Field>
            {verificationDetail?.owner_mailing_address.address_1}{' '}
            {verificationDetail?.owner_mailing_address.address_2}{' '}
            {verificationDetail?.owner_mailing_address.city},{' '}
            {verificationDetail?.owner_mailing_address.state}{' '}
            {verificationDetail?.owner_mailing_address.zipcode}
          </Field>
        </FullInfo>
      </Row>

      {verificationDetail?.second_owner_first_name && (
        <>
          <SectionTitle>{viewModel.secondarySectionTitle}</SectionTitle>
          <Row>
            <Info>
              <Label>{viewModel.name}</Label>
              <Field>
                {verificationDetail?.second_owner_first_name}{' '}
                {verificationDetail.second_owner_last_name}
              </Field>
            </Info>
            <Info>
              <Label>{viewModel.email}</Label>
              <Field>{verificationDetail.second_owner_email_address}</Field>
            </Info>
            <Info>
              <Label>{viewModel.phone}</Label>
              <Field>
                {displayPhoneNumber(
                  verificationDetail.second_owner_phone_number
                )}
              </Field>
            </Info>
          </Row>
          <Row>
            <FullInfo>
              <Label>{viewModel.address}</Label>
              <Field>
                {verificationDetail.second_owner_mailing_address.address_1}{' '}
                {verificationDetail.second_owner_mailing_address.address_2}{' '}
                {verificationDetail.second_owner_mailing_address.city},{' '}
                {verificationDetail.second_owner_mailing_address.state}{' '}
                {verificationDetail.second_owner_mailing_address.zipcode}
              </Field>
            </FullInfo>
          </Row>
        </>
      )}
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
  width: 33%;
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

export default observer(OwnerInfoReviewView);
