import { observer } from 'mobx-react';
import { NextPage, NextPageContext } from 'next';
import React, { useEffect } from 'react';
import styled from 'styled-components';

import { Header } from 'src/components/Header';
import VerificationStepper from 'src/components/Stepper';
import { useAppStore } from 'src/context';
import Footer from 'src/core/Footer';
import VerificationReviewViewDetail from 'src/modules/verification/review';
import TransactionOverview from 'src/modules/verification/transactionoverview';
import Page from 'src/Page';

interface Prop {
  priceId: string;
}

const VerificationReview: NextPage<Prop> = ({ priceId }) => {
  const { store } = useAppStore();
  useEffect(() => {
    store.stepper.setStep(2);
  }, []);

  return (
    <Page name={'Sell Verification'} data-qa="SellVerificationContainer">
      <Header />
      {!store.absmart.loading && store.absmart.stepperAbTest && (
        <VerificationStepper activeStep={store.stepper.currentStep} />
      )}
      <Contents>
        <VerificationContainer>
          <ReviewContainer>
            <VerificationReviewViewDetail priceId={priceId} />
          </ReviewContainer>
          <OverviewContainer>
            <TransactionOverview priceId={priceId} />
          </OverviewContainer>
        </VerificationContainer>
      </Contents>
      <Footer />
    </Page>
  );
};

const Contents = styled.div`
  display: flex;
  background-color: #f5f5f5;
  padding-top: 20px;
  min-height: calc(100vh - 130px);
  justify-content: center;
  @media (max-width: 420px) {
    margin: 0;
    width: 100%;
  }
  @media (max-width: 1020px) {
    padding-top: 0;
    width: 100%;
  }
`;

const VerificationContainer = styled.div`
  display: flex;
  width: 100%;
  max-width: 1280px;
  justify-content: center;
  @media (max-width: 1020px) {
    flex-direction: column-reverse;
    justify-content: center;
  }
`;

const ReviewContainer = styled.div`
  width: 70%;
  display: flex;
  justify-content: flex-end;
  margin: 0 10px;
  @media (max-width: 1020px) {
    width: 100%;
    margin: 0;
  }
`;

const OverviewContainer = styled.div`
  width: 30%;
  margin: 0 10px;
  @media (max-width: 1020px) {
    width: 100%;
    margin: 0;
  }
`;

VerificationReview.getInitialProps = async (
  context: NextPageContext
): Promise<Prop> => {
  const { query } = context;
  const priceId = query.priceId as string;
  return { priceId };
};

export default observer(VerificationReview);
