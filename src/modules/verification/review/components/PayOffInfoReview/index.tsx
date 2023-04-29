import { Link } from '@vroom-web/ui-lib';
import { observer } from 'mobx-react';
import React from 'react';

import {
  Container,
  Field,
  Info,
  Label,
  LinkWrap,
  Row,
  Subtitle,
  SubTitleContainer,
} from './Style.css';

import { useAppStore } from 'src/context';
import { displaySecureSSN } from 'src/utils';

const PayoffInfoReview = () => {
  const { store } = useAppStore();

  const { verificationDetail } = store.verification;
  return (
    <Container>
      <SubTitleContainer>
        <Subtitle>Auto Loan Information</Subtitle>
        <LinkWrap>
          <Link.Text
            href={`/sell/verification/owner/${store.verification.offerId}`}
            onClick={(e): void => {
              e.preventDefault();
              localStorage.setItem('review_edit_section', '2');
              window.location.href = `/sell/verification/owner/${store.verification.offerId}`;
            }}
          >
            Edit
          </Link.Text>
        </LinkWrap>
      </SubTitleContainer>

      <Row>
        <Info>
          <Label>Are you making car payments?</Label>
          <Field>
            {store.verification.verificationDetail?.current_payments
              ? 'Yes'
              : 'No'}
          </Field>
        </Info>
        <Info>
          <Label>Where do you make your car payments?</Label>
          <Field>{verificationDetail?.lien_financial_institution_name}</Field>
        </Info>
      </Row>
      <Row>
        <Info>
          <Label>Loan Account Number</Label>
          <Field>{verificationDetail?.lien_account_number}</Field>
        </Info>
        <Info>
          <Label>Last Four Digits of Social Security Number</Label>
          <Field>{displaySecureSSN(verificationDetail?.last_four_ssn)}</Field>
        </Info>
      </Row>
    </Container>
  );
};

export default observer(PayoffInfoReview);
