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

const PickupInfoReview = () => {
  const { store } = useAppStore();

  const { verificationDetail } = store.verification;
  return (
    <Container>
      <SubTitleContainer>
        <Subtitle>Pick Up Information</Subtitle>
        <LinkWrap>
          <Link.Text
            href={`/sell/verification/owner/${store.verification.offerId}`}
            onClick={(e): void => {
              e.preventDefault();
              localStorage.setItem('review_edit_section', '1');
              window.location.href = `/sell/verification/owner/${store.verification.offerId}`;
            }}
          >
            Edit
          </Link.Text>
        </LinkWrap>
      </SubTitleContainer>
      <Row>
        <FullInfo>
          <Label>Pick up address</Label>
          <Field>
            {verificationDetail?.pickup_address.address_1}{' '}
            {verificationDetail?.pickup_address.address_2}{' '}
            {verificationDetail?.pickup_address.city},{' '}
            {verificationDetail?.pickup_address.city}{' '}
            {verificationDetail?.pickup_address.zipcode}
          </Field>
        </FullInfo>
      </Row>

      <SectionTitle>Contact Information</SectionTitle>
      <Row>
        <Info>
          <Label>Name</Label>
          <Field>
            {verificationDetail?.pickup_contact_first_name}{' '}
            {verificationDetail?.pickup_contact_last_name}
          </Field>
        </Info>
      </Row>
      <Row>
        <Info>
          <Label>Phone Number</Label>
          <Field>{verificationDetail?.pickup_contact_phone_number}</Field>
        </Info>
        <Info>
          <Label>Email</Label>
          <Field>{verificationDetail?.pickup_contact_email}</Field>
        </Info>
      </Row>
    </Container>
  );
};

export default observer(PickupInfoReview);
