import { Button, Checkbox } from '@vroom-web/ui-lib';
import { observer } from 'mobx-react';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { Container, Line, Title } from '../shared/Style.css';
import OwnerInfoReview from './components/OwnerInfoReview';
import PayOffInfoReview from './components/PayOffInfoReview';
import PickupInfoReview from './components/PickupInfoReview';
import SellDocumentReview from './components/SellDocumentReview';
import VehiclePhotosReview from './components/VehiclePhotosReview';
import ViewModel from './ViewModel';

import { useAppStore } from 'src/context';
interface Props {
  viewModel: ViewModel;
  priceId: string;
}

const VerificationReviewViewDetail: React.FC<Props> = ({
  viewModel,
  priceId,
}) => {
  const [, setLastUpdatedVerificationTime] = useState<number>();
  const [checked, setChecked] = useState(false);
  const { store } = useAppStore();

  useEffect(() => {
    store.verification.setOnVerificationUpdated(() => {
      setLastUpdatedVerificationTime(new Date().getTime());
    });
  }, [store.verification]);

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
  }, [store.deposit, store.payment, viewModel]);

  useEffect(() => {
    const whereIsVehicleRegistered =
      localStorage.getItem('whereIsVehicleRegistered') || '';
    const lastFourSSN =
      localStorage.getItem('lastFour') || store.verification.lastFourSSN;
    viewModel.setWhereIsVehicleRegistered(whereIsVehicleRegistered);
    viewModel.getVerificationDetails(priceId, lastFourSSN);
  }, [priceId, store.verification.lastFourSSN, viewModel]);

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
      {viewModel.isVehiclePhotosExp() && (
        <>
          <Line />
          <VehiclePhotosReview
            priceId={priceId}
            vin={store.verification.verificationDetail?.vin || ''}
          />
        </>
      )}
      <Line />
      <CheckboxContainer>
        <Checkbox
          checked={checked}
          id={'verification-agreement-checkbox'}
          onChange={(): void => setChecked(!checked)}
          dataQa={'verification-agreement-checkbox'}
          label={viewModel.reviewVerification}
        />
      </CheckboxContainer>
      <SubmitButton disabled={!checked} onClick={handleSubmit}>
        {viewModel.submitBtn}
      </SubmitButton>
    </Container>
  );
};

const SubmitButton = styled(Button.Primary)`
  margin-top: 32px;
  :disabled {
    color: #ffffff;
  }
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

export default observer(VerificationReviewViewDetail);
