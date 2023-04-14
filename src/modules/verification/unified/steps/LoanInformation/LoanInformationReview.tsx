import React from 'react';
import { shallow } from 'zustand/shallow';

import useVerificationStore from '../../store/store';
import { Field, Info, Label, Row } from '../../Styled.css';

const LoanInformationReview = () => {
  const { loanConfirmation, loanAccountNumber, loanLastFourDigits, loanName } =
    useVerificationStore(
      (state) => ({
        loanConfirmation: state.loanConfirmation,
        loanAccountNumber: state.loanAccountNumber,
        loanLastFourDigits: state.loanLastFourDigits,
        loanName: state.loanName,
      }),
      shallow
    );

  return (
    <>
      <Row>
        <Info>
          <Label>Are you making car payments?</Label>
          <Field>{loanConfirmation}</Field>
        </Info>
      </Row>
      {loanConfirmation === 'Yes' && (
        <Row>
          <Info>
            <Label>Where do you make your car payments?</Label>
            <Field>{loanName}</Field>
          </Info>
          <Info>
            <Label>Loan Account Number</Label>
            <Field>{loanAccountNumber}</Field>
          </Info>
          {loanLastFourDigits && (
            <Info>
              <Label>Last Four Digits of Social Security Number</Label>
              <Field>{loanLastFourDigits}</Field>
            </Info>
          )}
        </Row>
      )}
    </>
  );
};

export default LoanInformationReview;
