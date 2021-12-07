import { VroomSpinner } from '@vroom-web/ui-lib';
import { observer } from 'mobx-react';
import { NextPage, NextPageContext } from 'next';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import DefaultStepper from 'src/components/DefaultStepper';
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
  const router = useRouter();

  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    store.stepper.setStep(2);
    store.verification.setPriceId(priceId);
  }, []);

  const isStepperExp = store.absmart.isInExperiment(
    'ac-appraisal-stepper-verification'
  );

  const isPaymentRequireExp = store.absmart.isInExperiment(
    'ac-payment-required'
  );

  useEffect(() => {
    if (store.verification.formState && store.verification.formState === 5) {
      router.push('/congratulations');
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [store.verification.formState]);

  return (
    <Page name={'Sell Verification'} data-qa="SellVerificationContainer">
      <Header />
      <StepperWrapper>
        <StepperContainer>
          {!store.absmart.isABSmartlyLoading && !isStepperExp && (
            <DefaultStepper activeStep={store.stepper.currentStep} />
          )}
          {!store.absmart.isABSmartlyLoading && isStepperExp && (
            <VerificationStepper activeStep={isPaymentRequireExp ? '4' : '3'} />
          )}
        </StepperContainer>
      </StepperWrapper>
      <>
        <Contents>
          {isLoading ||
          store.verification.formState === 5 ||
          store.verification.loading ? (
            <VroomSpinner />
          ) : (
            <>
              <VerificationContainer>
                <ReviewContainer>
                  <VerificationReviewViewDetail priceId={priceId} />
                </ReviewContainer>
                <OverviewContainer>
                  <TransactionOverview priceId={priceId} />
                </OverviewContainer>
              </VerificationContainer>
            </>
          )}
        </Contents>
      </>
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

const StepperWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin: 20px 0 0 10px;
  @media (max-width: 1020px) {
    margin-bottom: 20px;
  }
`;

const StepperContainer = styled.div`
  width: 100%;
  max-width: 1080px;
`;

VerificationReview.getInitialProps = async (
  context: NextPageContext
): Promise<Prop> => {
  const { query } = context;
  const priceId = query.priceId as string;
  return { priceId };
};

export default observer(VerificationReview);
