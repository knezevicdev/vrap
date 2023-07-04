import { VroomSpinner } from '@vroom-web/ui-lib';
import { observer } from 'mobx-react';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import { useAppStore } from '../../../context';
import { useRecaptcha } from '../../../context/Recaptcha';
import useIsTradeIn from '../../../hooks/useIsTradeIn';
import AnalyticsHandler from '../../../integrations/AnalyticsHandler';
import { AppraisalPayload } from '../../../interfaces.d';
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
  const { store } = useAppStore();
  const isTradeIn = useIsTradeIn();
  const recaptcha = useRecaptcha();
  const [isLoading, setIsLoading] = useState(false);
  const submitButtonClasses = ['btn', 'btn-primary', 'finish-section-btn'];

  const appraisalStore = store.appraisal;

  const submitAppraisal = useSubmitAppraisal(
    store,
    appraisalStore,
    router,
    token,
    isTradeIn
  );

  const canSubmit = !(isLoading || appraisalStore ? true : false);

  useEffect(() => {
    if (isTradeIn) {
      appraisalStore.setForm('trade');
    }
  }, [appraisalStore, isTradeIn]);

  useEffect(() => {
    if (appraisalStore.isFormEmpty()) {
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

      const data = appraisalStore;
      const requestPayload: AppraisalPayload = makeRequestBody(data);

      const identifyData = {
        ...requestPayload,
        phone: requestPayload.phoneNumber,
      };

      analyticsHandler.trackAppraisalIdentify(
        data.user?.externalUserID,
        identifyData
      );
      analyticsHandler.trackAppraisalReviewViewed(appraisalStore.eventCategory);
    }
  }, [appraisalStore, isTradeIn, router]);

  useEffect(() => {
    return () => {
      appraisalStore.clearReviewError();
    };
  }, []);

  if (isLoading) {
    submitButtonClasses.push('submitting');
  }

  const handleSubmit = async (): Promise<void> => {
    const token = await recaptcha.getToken();
    if (token) {
      setIsLoading(true);
      submitAppraisal(token).finally(() => {
        setIsLoading(false);
      });
    } else {
      appraisalStore.setReviewError();
    }
  };

  const isAnyLoading = isLoading || store.deal.loading;

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
          disabled={canSubmit}
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
      {store.offer.showOfferDialog && <OfferDialog />}
    </Container>
  );
};

export default observer(AppraisalReview);
