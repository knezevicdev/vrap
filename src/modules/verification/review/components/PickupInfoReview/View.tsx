import { observer } from 'mobx-react';
import React from 'react';
import styled from 'styled-components';

import ViewModel from './ViewModel';

import { Title } from 'src/core/Typography';
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
        <Edit onClick={(): void => viewModel.handleEditClick()}>Edit</Edit>
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

export default observer(PickupInfoReviewView);
