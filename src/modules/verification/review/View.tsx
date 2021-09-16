import React, { useEffect } from 'react';
import styled from 'styled-components';

import OwnerInfoReview from './components/OwnerInfoReview';
import PayOffInfoReview from './components/PayOffInfoReview';
import PickupInfoReview from './components/PickupInfoReview';
import SellDocumentReview from './components/SellDocumentReview';
import ViewModel from './ViewModel';

import { Button } from 'src/core/Button';

interface Props {
  viewModel: ViewModel;
  priceId: string;
}

const VerificationReviewViewDetail: React.FC<Props> = ({
  viewModel,
  priceId,
}) => {
  useEffect(() => {
    viewModel.getVerificationDetail(priceId);
  }, [priceId]);

  return (
    <Container>
      <OwnerInfoReview />
      <PickupInfoReview />
      <PayOffInfoReview />
      <SellDocumentReview />
      <SubmitButton>{viewModel.submitBtn}</SubmitButton>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  width: 100%;
  padding: 0 10px;
  margin: 0 10px;
`;

const SubmitButton = styled(Button.Primary)``;

export default VerificationReviewViewDetail;
