import { observer } from 'mobx-react';
import React from 'react';
import styled from 'styled-components';

import ViewModel from './ViewModel';

import { Title } from 'src/core/Typography';
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
        <Edit onClick={() => console.log('click')}>Edit</Edit>
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

const Subtitle = styled.div`
  font-family: 'Calibre';
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 26px;
  letter-spacing: 0.25px;
  color: #041022;
`;

const SectionTitle = styled(Title.Four)`
  font-style: normal;
  font-weight: 600;
  text-align: left;
  margin: 20px 0;
  letter-spacing: 0.25px;
  color: #041022;
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

const Label = styled.span`
  font-family: 'Calibre';
  font-style: normal;
  font-weight: normal;
  font-size: 13px;
  line-height: 16px;
  letter-spacing: 0.35px;
  color: #041022;
`;

const Field = styled.span`
  font-family: 'Calibre';
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 25px;
  letter-spacing: 0.25px;
  color: #041022;
  word-wrap: break-word;
`;

const Edit = styled(Title.Four)`
  margin-left: 5px;
  cursor: pointer;
  font-style: normal;
  font-weight: normal;
  line-height: 22px;
  letter-spacing: 0.25px;
  color: #e7131a;
  padding-top: 4px;
`;

export default observer(OwnerInfoReviewView);
