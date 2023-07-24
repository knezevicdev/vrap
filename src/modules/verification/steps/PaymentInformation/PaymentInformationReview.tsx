import React from 'react';
import { shallow } from 'zustand/shallow';

import { EditStep } from '../../components/MultiStepForm/Style.css';
import useVerificationStore from '../../store/store';
import { Field, Info, Label, Row, SectionTitle } from '../../Styled.css';
import { PreviewLine } from './steps/LoanAndPaymentInformation/LoanInformation/Style.css';
import { Paragraph, RedText } from './Style.css';

export interface Props {
  onEdit?: () => void;
}

const PaymentInformationReview = ({ onEdit }: Props) => {
  const { loanConfirmation, paymentSubmittedType } = useVerificationStore(
    (state) => ({
      loanConfirmation: state.loanConfirmation,
      paymentSubmittedType: state.paymentSubmittedType,
    }),
    shallow
  );

  return (
    <>
      <PreviewLine>
        <SectionTitle>Payments on Vehicle</SectionTitle>
        <EditStep role="button" tabIndex={0} onClick={onEdit}>
          Edit
        </EditStep>
      </PreviewLine>
      <Row>
        <Info>
          <Label>Are you making car payments?</Label>
          <Field>{loanConfirmation}</Field>
        </Info>
      </Row>
      {loanConfirmation === 'Yes' && (
        <Paragraph>
          We may contact you to confirm your loan information.{' '}
          <RedText>Look out for a phone call from +1 (214)-817-2271.</RedText>
        </Paragraph>
      )}
      <SectionTitle topSpacing>Payment Method</SectionTitle>
      <Row>
        <Info>
          <Label>How would you like to get paid?</Label>
          <Field>{paymentSubmittedType}</Field>
        </Info>
      </Row>
      <Paragraph>
        Do not hesitate to contact us if you have questions.{' '}
        <RedText>paperwork@vroom.com or (855) 534-3755.</RedText>
      </Paragraph>
    </>
  );
};

export default PaymentInformationReview;
