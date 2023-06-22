import React from 'react';
import { shallow } from 'zustand/shallow';

import useVerificationStore from '../../store/store';
import { Field, Info, Label, Row, SectionTitle } from '../../Styled.css';
import { RedText } from './Style.css';

const PaymentInformationReview = () => {
  const { loanConfirmation, paymentSubmittedType } = useVerificationStore(
    (state) => ({
      loanConfirmation: state.loanConfirmation,
      paymentSubmittedType: state.paymentSubmittedType,
    }),
    shallow
  );

  return (
    <>
      <SectionTitle>Payments on Vehicle</SectionTitle>
      <Row>
        <Info>
          <Label>Are you making car payments?</Label>
          <Field>{loanConfirmation}</Field>
        </Info>
      </Row>
      {loanConfirmation === 'Yes' && (
        <p>
          We may contact you to confirm your loan information.{' '}
          <RedText>Look out for a phone call from +1 (214)-817-2271.</RedText>
        </p>
      )}
      <SectionTitle>Payment Method</SectionTitle>
      <Row>
        <Info>
          <Label>How would you like to get paid?</Label>
          <Field>{paymentSubmittedType}</Field>
        </Info>
      </Row>
      <p>
        Do not hesitate to contact us if you have questions.{' '}
        <RedText>paperwork@vroom.com or (855) 534-3755.</RedText>
      </p>
    </>
  );
};

export default PaymentInformationReview;
