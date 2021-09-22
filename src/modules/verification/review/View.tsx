import React, { useEffect } from 'react';
import styled from 'styled-components';

import OwnerInfoReview from './components/OwnerInfoReview';
import PayOffInfoReview from './components/PayOffInfoReview';
import PickupInfoReview from './components/PickupInfoReview';
import SellDocumentReview from './components/SellDocumentReview';
import ViewModel from './ViewModel';

import { Button } from 'src/core/Button';
import { Hero } from 'src/core/Typography';

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
      <Title>{viewModel.title}</Title>
      <Line />
      <OwnerInfoReview />
      <Line />
      <PickupInfoReview />
      <Line />
      <PayOffInfoReview />
      <Line />
      <SellDocumentReview />
      <Line />
      <SubmitButton>{viewModel.submitBtn}</SubmitButton>
      <WarningText>{viewModel.verificationWarning}</WarningText>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  width: 100%;
  max-width: 780px;
  padding: 0 100px 30px 100px;
  border: solid 1px #d6d7da;
  @media (max-width: 1020px) {
    max-width: 100%;
    padding: 30px 24px;
    margin: 0 10px;
  }

  @media (max-width: 720px) {
    margin: 0;
  }
`;

const Title = styled(Hero.Three)`
  font-style: 'italic';
  font-weight: 800;
  font-size: 36px;
  letter-spacing: 1px;
  color: #041022;
  padding: 30px 0;
`;

const Line = styled.div`
  width: 100%;
  height: 1px;
  background-color: #d6d7da;
`;

const WarningText = styled.div`
  margin-top: 16px;
  font-family: 'Calibre';
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0.25px;
  color: #041022;
`;

const SubmitButton = styled(Button.Primary)`
  margin-top: 32px;
  @media (max-width: 1020px) {
    margin-top: 20px;
    width: 100%;
  }
`;

export default VerificationReviewViewDetail;
