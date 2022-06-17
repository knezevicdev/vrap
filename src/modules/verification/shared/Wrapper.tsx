import { SkipNavigationLink, VroomSpinner } from '@vroom-web/ui-lib';
import { observer } from 'mobx-react';
import { NextPageContext } from 'next';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import {
  Contents,
  LoadingOverlay,
  OverviewContainer,
  ReviewContainer,
  StepperContainer,
  StepperWrapper,
  VerificationContainer,
  HeaderContainer,
  SpinnerContainer,
} from './Style.css';

import DefaultStepper from 'src/components/DefaultStepper';
import { Header } from 'src/components/Header';
import VerificationStepper from 'src/components/Stepper';
import { useAppStore } from 'src/context';
import Footer from 'src/core/Footer';
import TransactionOverview from 'src/modules/verification/transactionoverview';
import Page from 'src/Page';

interface Props {
  priceId: string;
  step: number;
}

const VerificationWrapper: React.FC<Props> = ({ priceId, step, children }) => {
  const { store } = useAppStore();
  const router = useRouter();

  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    store.stepper.setStep(step);
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
      router.push('/appraisal/congratulations');
    }
    setLoading(false);
  }, [store.verification.formState]);

  const isAnyloading =
    isLoading ||
    store.verification.formState === 5 ||
    store.verification.loading;

  return (
    <Page name={'Sell Verification'} data-qa="SellVerificationContainer">
      <SkipNavigationLink mainContentId={'main-content'} />
      <HeaderContainer>
        <Header />
      </HeaderContainer>
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
        <Contents id="main-content">
          {isAnyloading && (
            <LoadingOverlay>
              <SpinnerContainer>
                <VroomSpinner />
              </SpinnerContainer>
            </LoadingOverlay>
          )}

          <VerificationContainer>
            <ReviewContainer>{children}</ReviewContainer>
            <OverviewContainer>
              <TransactionOverview priceId={priceId} />
            </OverviewContainer>
          </VerificationContainer>
        </Contents>
      </>
      <Footer />
    </Page>
  );
};

export interface VerificationPageProps {
  priceId: string;
}

export const getInitialProps = async (
  context: NextPageContext
): Promise<VerificationPageProps> => {
  const { query } = context;
  const priceId = query.priceId as string;
  return { priceId };
};

export default observer(VerificationWrapper);
