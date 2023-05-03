import { Link } from '@vroom-web/ui-lib';
import { observer } from 'mobx-react';
import React from 'react';

import {
  Container,
  Field,
  FullInfo,
  Info,
  Label,
  LinkWrap,
  Row,
  SectionTitle,
  Subtitle,
  SubTitleContainer,
} from './Style.css';

import { useAppStore } from 'src/context';
import { displayPhoneNumber } from 'src/utils';

const OwnerInfoReview = () => {
  const { store } = useAppStore();

  const { verificationDetail } = store.verification;
  return (
    <Container>
      <SubTitleContainer>
        <Subtitle>Contact Information</Subtitle>
        <LinkWrap>
          <Link.Text
            href={`/sell/verification/owner/${store.verification.offerId}`}
            onClick={(e): void => {
              e.preventDefault();
              localStorage.setItem('review_edit_section', '0');
              window.location.href = `/sell/verification/owner/${store.verification.offerId}`;
            }}
          >
            Edit
          </Link.Text>
        </LinkWrap>
      </SubTitleContainer>

      <SectionTitle>Primary Owner&apos;s Information</SectionTitle>
      <Row>
        <Info>
          <Label>Name</Label>
          <Field>
            {verificationDetail?.owner_first_name}{' '}
            {verificationDetail?.owner_last_name}
          </Field>
        </Info>
        <Info>
          <Label>Email</Label>
          <Field>{verificationDetail?.owner_email_address}</Field>
        </Info>
        <Info>
          <Label>Phone</Label>
          <Field>
            {displayPhoneNumber(verificationDetail?.owner_phone_number)}
          </Field>
        </Info>
      </Row>
      <Row>
        <FullInfo>
          <Label>Address</Label>
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
          <SectionTitle>Secondary Owner&apos;s Information</SectionTitle>
          <Row>
            <Info>
              <Label>Name</Label>
              <Field>
                {verificationDetail?.second_owner_first_name}{' '}
                {verificationDetail.second_owner_last_name}
              </Field>
            </Info>
            <Info>
              <Label>Email</Label>
              <Field>{verificationDetail.second_owner_email_address}</Field>
            </Info>
            <Info>
              <Label>Phone</Label>
              <Field>
                {displayPhoneNumber(
                  verificationDetail.second_owner_phone_number
                )}
              </Field>
            </Info>
          </Row>
          <Row>
            <FullInfo>
              <Label>Address</Label>
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

export default observer(OwnerInfoReview);
