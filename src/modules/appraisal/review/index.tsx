import { VroomSpinner } from '@vroom-web/ui-lib';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useState } from 'react';

import { useRecaptcha } from '../../../context/Recaptcha';
import useIsTradeIn from '../../../hooks/useIsTradeIn';
import AnalyticsHandler from '../../../integrations/AnalyticsHandler';
import { AppraisalPayload } from '../../../interfaces.d';
import useAppraisalStore from '../../../store/appraisalStore';
import useDealStore from '../../../store/dealStore';
import useOfferStore from '../../../store/offerStore';
import useSubmitAppraisal from '../hooks/useSubmitAppraisal';
import { makeRequestBody } from '../utils';
import NewVehicleHistory from './components/NewVehicleHistory';
import OfferDialog from './components/OfferDialog';
import PersonalInformation from './components/PersonalInformation';
import VehicleInformation from './components/VehicleInformation';
import {
  Container,
  Line,
  SpinnerContainer,
  SubmitButton,
  SubmitContainer,
  TextContainer,
  Title,
  WhiteBox,
} from './Style.css';

interface Props {
  token: string;
}

const AppraisalReview: React.FC<Props> = ({ token }) => {
  const router = useRouter();
  const isTradeIn = useIsTradeIn();
  const recaptcha = useRecaptcha();
  const [isLoading, setIsLoading] = useState(false);
  const submitButtonClasses = ['btn', 'btn-primary', 'finish-section-btn'];
  const showOfferDialog = useOfferStore((state) => state.showOfferDialog);

  const setForm = useAppraisalStore((state) => state.setForm);
  const isFormEmpty = useAppraisalStore((state) => state.isFormEmpty);
  const eventCategory = useAppraisalStore((state) => state.eventCategory());
  const setReviewError = useAppraisalStore((state) => state.setReviewError);

  const submitAppraisal = useSubmitAppraisal(router, token, isTradeIn);

  useEffect(() => {
    setForm(isTradeIn ? 'trade' : 'sell');
  }, [setForm, isTradeIn]);

  useEffect(() => {
    if (isFormEmpty()) {
      if (isTradeIn) {
        router.push('/sell/tradeIn-selfService').catch((e) => {
          console.error(e);
        });
      } else {
        router
          .push({
            pathname: '/sell/vehicleInformation',
            query: { ...router.query },
          })
          .catch((e) => {
            console.error(e);
          });
      }
    } else {
      const analyticsHandler = new AnalyticsHandler();

      const requestPayload: AppraisalPayload = makeRequestBody();

      const identifyData = {
        ...requestPayload,
        phone: requestPayload.phoneNumber,
      };

      analyticsHandler.trackAppraisalIdentify(
        useAppraisalStore.getState().user?.externalUserID,
        identifyData
      );
      analyticsHandler.trackAppraisalReviewViewed(eventCategory);
    }
  }, [eventCategory, isFormEmpty, isTradeIn, router]);

  useEffect(() => {
    return () => {
      useAppraisalStore.getState().clearReviewError();
    };
  }, []);

  if (isLoading) {
    submitButtonClasses.push('submitting');
  }

  const handleSubmit = useCallback(async (): Promise<void> => {
    const token = await recaptcha.getToken();
    if (token) {
      setIsLoading(true);
      submitAppraisal(token).finally(() => {
        setIsLoading(false);
      });
    } else {
      setReviewError();
    }
  }, [recaptcha, setReviewError, submitAppraisal]);

  const isDealLoading = useDealStore((state) => state.loading);

  const isAnyLoading = isLoading || isDealLoading;

  return (
    <Container>
      {isAnyLoading && (
        <WhiteBox>
          <SpinnerContainer>
            <VroomSpinner />
          </SpinnerContainer>
        </WhiteBox>
      )}
      <Title>my appraisal review</Title>
      <Line />
      <VehicleInformation />
      <Line />
      <NewVehicleHistory />
      <Line />
      <PersonalInformation />
      <SubmitContainer>
        <SubmitButton
          className={submitButtonClasses.join(' ')}
          disabled={isLoading}
          onClick={handleSubmit}
        >
          {isLoading ? 'Submitting' : 'Get My Price'}
        </SubmitButton>
        <TextContainer>
          By clicking Get My Price, you consent to receive autodialed calls and
          text messages from or on behalf of Vroom at the telephone numbers(s)
          provided above, including your wireless number, if applicable,
          regarding your interest in buying or selling a car and for other
          marketing purposes. Calls may be pre-recorded. You understand that
          consent is not a condition of purchase. Read our
          <a
            href="/legal/terms-of-use"
            target="_blank"
            rel="noopener noreferrer"
          >
            Terms
          </a>
          and
          <a
            href="/legal/privacy-policy"
            target="_blank"
            rel="noopener noreferrer"
          >
            Privacy Policy.
          </a>
        </TextContainer>
      </SubmitContainer>
      {showOfferDialog && <OfferDialog />}
    </Container>
  );
};

export default AppraisalReview;
