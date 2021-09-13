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
    <>
      <Subtitle>
        {viewModel.pickUpInfotitle}{' '}
        <Edit onClick={() => console.log(2)}>Edit</Edit>
      </Subtitle>
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
    </>
  );
};

const Subtitle = styled.h2`
  /* ${(props) => props.theme.typography.sectionTitleSemi3} */
  text-align: left;
`;

const SectionTitle = styled.h3`
  /* ${(props) => props.theme.typography.supportTextBold} */
  text-align: left;
  margin: 20px 0;
`;

const Row = styled.div`
  display: flex;
  margin-bottom: 10px;
  /* ${(props) => props.theme.media.lte('mobile')} {
    flex-direction: column;
    margin-bottom: 0;
  } */
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  width: 33%;
  /* ${(props) => props.theme.media.lte('mobile')} {
    width: 100%;
    padding-bottom: 10px;
  } */
`;

const FullInfo = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Label = styled.span`
  /* ${(props) => props.theme.typography.h14()}
  color: ${(props) => props.theme.colors.dark}; */
`;

const Field = styled.span`
  font-size: 18px;
  line-height: 1.39;
  letter-spacing: 0.25px;
`;

const Edit = styled.span`
  /* ${(props) => props.theme.typography.h10()}
  color: ${(props) => props.theme.colors.vroomRed}; */
  cursor: pointer;
`;

export default observer(PickupInfoReviewView);
