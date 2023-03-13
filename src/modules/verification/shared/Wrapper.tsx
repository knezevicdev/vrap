import { useABSmartly } from '@vroom-web/analytics-integration';
import { SkipNavigationLink, VroomSpinner } from '@vroom-web/ui-lib';
import { IncomingMessage } from 'http';
import { observer } from 'mobx-react';
import { NextPageContext } from 'next';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import OfferExpiredDialog from '../Dialog/OfferExpiredDialog';
import {
  Contents,
  HeaderContainer,
  LoadingOverlay,
  OverviewContainer,
  ReviewContainer,
  SpinnerContainer,
  StepperContainer,
  StepperWrapper,
  VerificationContainer,
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
  const absmartly = useABSmartly();
  const router = useRouter();

  const [isLoading, setLoading] = useState(true);
  const [isOfferExpired, setIsOfferExpired] = useState(false);
  const vin = store.offer?.offerDetail?.vin || '';

  useEffect(() => {
    store.stepper.setStep(step);
    store.verification.setPriceId(priceId);
  }, []);

  useEffect(() => {
    showOfferExpiredModal();
  }, [store.offer.offerDetail]);

  useEffect(
    () => () => {
      document.body.style.overflow = '';
    },
    []
  );

  const showOfferExpiredModal = () => {
    const offerExpiration = store.offer?.offerDetail?.offerExpiration;
    const offerExpirationTime =
      offerExpiration && new Date(offerExpiration).getTime();

    if (offerExpirationTime && offerExpirationTime < new Date().getTime()) {
      setIsOfferExpired(true);
      document.body.style.overflow = 'hidden';
    }
  };

  const isStepperExp = absmartly.isInExperiment(
    'ac-appraisal-stepper-verification'
  );

  useEffect(() => {
    if (store.verification.formState && store.verification.formState === 5) {
      router.push('/appraisal/congratulations').catch((e) => {
        console.error(e);
      });
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
          {!absmartly.isLoading && !isStepperExp && (
            <DefaultStepper activeStep={store.stepper.currentStep} />
          )}
          {!absmartly.isLoading && isStepperExp && (
            <VerificationStepper activeStep={String(step + 1)} />
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
          {(isOfferExpired || store.verification.isExpiredOrErrored) && (
            <OfferExpiredDialog vin={vin} />
          )}
        </Contents>
      </>
      <Footer />
    </Page>
  );
};

export interface VerificationPageProps {
  priceId: string;
  ajsUserId: string;
}

interface Cookie {
  ajs_user_id: string;
}
const parseCookies = (req?: IncomingMessage): Cookie => {
  if (req && req.headers && req.headers.cookie) {
    return Object.fromEntries(
      req.headers.cookie.split('; ').map((v) => v.split(/=(.+)/))
    );
  } else {
    return { ajs_user_id: '' };
  }
};

export const getInitialProps = async (
  context: NextPageContext
): Promise<VerificationPageProps> => {
  const { query, req } = context;
  const priceId = query.priceId as string;
  const cookies = parseCookies(req);

  return {
    priceId,
    ajsUserId: cookies.ajs_user_id || '',
  };
};

export default observer(VerificationWrapper);
