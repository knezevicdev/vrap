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
    <>
      <Subtitle>
        {viewModel.title} <Edit onClick={() => console.log('click')}>Edit</Edit>
      </Subtitle>

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
  /* ${(props) => props.theme.typography.body} */
  word-wrap: break-word;
`;

const Edit = styled.span`
  /* ${(props) => props.theme.typography.h10()}
  color: ${(props) => props.theme.colors.vroomRed}; */
  cursor: pointer;
`;

export default observer(OwnerInfoReviewView);
