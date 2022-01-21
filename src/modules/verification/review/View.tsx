import { Checkbox, Typography } from '@vroom-web/ui-lib';
import { observer } from 'mobx-react';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import OwnerInfoReview from './components/OwnerInfoReview';
import PaymentInfoReview from './components/PaymentInfoReview';
import PayOffInfoReview from './components/PayOffInfoReview';
import PickupInfoReview from './components/PickupInfoReview';
import SellDocumentReview from './components/SellDocumentReview';
import ViewModel from './ViewModel';

import { useAppStore } from 'src/context';
import { Button } from 'src/core/Button';
interface Props {
  viewModel: ViewModel;
  priceId: string;
}

const VerificationReviewViewDetail: React.FC<Props> = ({
  viewModel,
  priceId,
}) => {
  const [checked, setChecked] = useState(false);
  const { store } = useAppStore();

  useEffect(() => {
    viewModel.onPageLoad();
    const paymentValues = localStorage.getItem('review_payment_values');
    const paymentType = localStorage.getItem('review_payment_type') === 'ach';
    if (paymentValues) {
      const parseValue = JSON.parse(paymentValues);
      if (paymentType) {
        store.deposit.setMutationInput(parseValue);
      } else {
        const { values, priceId, address, submittedType } = parseValue;
        store.payment.setValues(values, priceId, address);
        store.payment.setSubmitType(submittedType);
      }
    }
  }, []);

  useEffect(() => {
    const whereIsVehicleRegistered =
      localStorage.getItem('whereIsVehicleRegistered') || '';
    const lastFourSSN =
      localStorage.getItem('lastFour') || store.verification.lastFourSSN;
    viewModel.setWhereIsVehicleRegistered(whereIsVehicleRegistered);
    viewModel.getVerificationDetails(priceId, lastFourSSN);
  }, [priceId]);

  const handleSubmit = (): void => {
    localStorage.removeItem('lastFour');
    store.verification.setLoading(true);
    viewModel.verificationSubmit();
  };

  return (
    <Container>
      <Title>{viewModel.title}</Title>
      <Line />
      <OwnerInfoReview />
      <Line />
      <PickupInfoReview />
      <Line />
      <PayOffInfoReview />
      <Line />
      <SellDocumentReview />
      {(viewModel.isPaymentRequireExp() ||
        localStorage.getItem('review_payment_values')) && (
        <>
          <Line />
          <PaymentInfoReview />
        </>
      )}
      <Line />
      <CheckboxContainer>
        <Checkbox
          checked={checked}
          id={'verification-agreement-checkbox'}
          onChange={(): void => setChecked(!checked)}
          dataQa={'verification-agreement-checkbox'}
        />
        <ReviewText>{viewModel.reviewVerification}</ReviewText>
      </CheckboxContainer>
      <SubmitButton disabled={!checked} onClick={handleSubmit}>
        {viewModel.submitBtn}
      </SubmitButton>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  width: 100%;
  max-width: 780px;
  padding: 0 24px 30px 24px;
  border: solid 1px #d6d7da;
  margin-bottom: 20px;
  @media (max-width: 1020px) {
    max-width: 100%;
    padding: 30px 24px;
    margin: 0 10px;
  }

  @media (max-width: 720px) {
    margin: 0;
  }
`;

const Title = styled(Typography.Heading.Three)`
  font-style: 'italic';
  font-family: Vroom-Sans;
  font-weight: 800;
  padding: 30px 0;
`;

const Line = styled.div`
  width: 100%;
  height: 1px;
  background-color: #d6d7da;
`;

const SubmitButton = styled(Button.Primary)`
  margin-top: 32px;
  @media (max-width: 1020px) {
    margin-top: 20px;
    width: 100%;
  }
`;

const CheckboxContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  margin-top: 32px;
  > :first-child {
    margin-top: 5px;
  }
`;

const ReviewText = styled(Typography.Body.Regular)`
  margin-left: 8px;
`;

export default observer(VerificationReviewViewDetail);
