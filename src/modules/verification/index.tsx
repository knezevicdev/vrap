import { Button, VroomSpinner } from '@vroom-web/ui-lib';
import { useRouter } from 'next/router';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { shallow } from 'zustand/shallow';

import useIsInExperiment from '../../hooks/useIsInExperiment';
import AnalyticsHandler from '../../integrations/AnalyticsHandler';
import { acceptPriceOffer } from '../../networking/request';
import Dialog from './components/Dialog';
import MultiStepForm, { FormSection } from './components/MultiStepForm';
import OfferExpiredDialog from './components/OfferExpiredDialog';
import VerificationSidebar from './components/Sidebar';
import VerificationStepper from './components/Stepper';
import DocumentsVerificationStep from './steps/DocumentsVerification/DocumentsVerification';
import OwnerVerificationStep from './steps/OwnerVerification/OwnerVerification';
import OwnerVerificationReview from './steps/OwnerVerification/OwnerVerificationReview';
import PaymentInformationStep from './steps/PaymentInformation/PaymentInformation';
import PaymentInformationReview from './steps/PaymentInformation/PaymentInformationReview';
import PickupInformationStep from './steps/PickupInformation/PickupInformation';
import PickupInformationReview from './steps/PickupInformation/PickupInformationReview';
import Review from './steps/Review/Review';
import ReviewReview from './steps/Review/ReviewReview';
import PhotosVerificationStep from './steps/VehiclePhotos/VehiclePhotos';
import VehiclePhotosReview from './steps/VehiclePhotos/VehiclePhotosReview';
import useVerificationStore from './store/store';
import {
  ButtonWrapper,
  Container,
  DialogText,
  DialogTitle,
  LoadingOverlay,
  MainContent,
  ModuleWrapper,
  SidebarWrapper,
  SpinnerContainer,
  StepperContainer,
  StepperWrapper,
} from './Styled.css';
import calculateInitialSection from './utils/calculateInitialSection';
import updateVerification from './utils/updateVerification';
import usePhotosValid from './utils/usePhotosValid';

const UnifiedVerification = () => {
  const analyticsHandler = useRef(new AnalyticsHandler());
  const trackedEvents = useRef<string[]>([]);
  const priceAccepted = useRef(false);
  const router = useRouter();
  const sidebarProps = useVerificationStore((state) => ({
    offer: state.offer,
    offerZip: state.offerZip,
  }));
  const loadState = useVerificationStore((state) => state.loadState);
  const vin = useVerificationStore((state) => state.vin);
  const completedInfo = useVerificationStore(
    (state) => ({
      completed: state.completed,
      finalPayment: state.finalPayment,
      offerPrice: state.offerPrice,
    }),
    shallow
  );
  const [state, setState] = useState('loading');
  const sectionChanged = useRef(false);
  const getPlaidToken = useVerificationStore((state) => state.getPlaidToken);
  const isLoading = useVerificationStore((state) => state.isLoading);
  const setLoading = useVerificationStore((state) => state.setLoading);
  const fetchedInitialPaymentData = useRef(false);

  const {
    isLoading: isAbsmartlyLoading,
    isInExperiment: isInPhotosUploadExperiment,
  } = useIsInExperiment('verification-form-vehicle-photo-upload');

  const initialSection = useMemo(() => {
    if (state === 'loading' || isAbsmartlyLoading) return -1;
    if (state === 'error') return 0;

    return calculateInitialSection(isInPhotosUploadExperiment);
  }, [isAbsmartlyLoading, isInPhotosUploadExperiment, state]);
  const [activeSection, setActiveSection] = useState(initialSection);

  useEffect(() => {
    if (fetchedInitialPaymentData.current) return;
    if (state === 'success' && initialSection > -1)
      fetchedInitialPaymentData.current = true;

    if (initialSection === 2) {
      setLoading(true);
      getPlaidToken().finally(() => setLoading(false));
    }
  }, [getPlaidToken, initialSection, setLoading, state]);

  const photosValid = usePhotosValid();

  const priceId = router.query.priceId as string;

  const initialize = useCallback(async () => {
    const hasNoErrors = await loadState(priceId);
    setState(hasNoErrors ? 'success' : 'error');
  }, [loadState, priceId]);

  useEffect(() => {
    initialize();
  }, [initialize]);

  useEffect(() => {
    analyticsHandler.current.trackVerificationOwnerViewed();
  }, []);

  const acceptPrice = useCallback(async () => {
    priceAccepted.current = true;
    await acceptPriceOffer(priceId);
  }, [priceId]);

  useEffect(() => {
    if (!priceAccepted.current) acceptPrice();
  }, [acceptPrice]);

  if (state === 'loading' || initialSection === -1) {
    return (
      <LoadingOverlay>
        <SpinnerContainer>
          <VroomSpinner />
        </SpinnerContainer>
      </LoadingOverlay>
    );
  }

  if (state === 'error') {
    return <OfferExpiredDialog vin={vin} />;
  }

  if (completedInfo.completed) {
    return (
      <Dialog>
        <DialogTitle>Congratulations!</DialogTitle>
        <DialogText>
          Your verification has been completed successfully.
        </DialogText>
        <ButtonWrapper>
          <Button.Primary
            onClick={() => {
              window.location.href = `/myaccount/hub/documents/sb`;
            }}
          >
            Continue
          </Button.Primary>
        </ButtonWrapper>
      </Dialog>
    );
  }

  const sections: FormSection[] = [
    {
      component: OwnerVerificationStep,
      title: 'Ownership Information',
      isValid: true,
      disableNext: true,
      completedAfterComponent: OwnerVerificationReview,
    },
    {
      component: PickupInformationStep,
      title: 'Pick Up Information',
      isValid: true,
      disableNext: true,
      completedAfterComponent: PickupInformationReview,
    },
    {
      component: PaymentInformationStep,
      title: 'Payment',
      isValid: true,
      disableNext: true,
      disableEditButton: true,
      completedAfterComponent: PaymentInformationReview,
    },
  ];

  if (isInPhotosUploadExperiment) {
    sections.push({
      component: PhotosVerificationStep,
      title: 'Vehicle Photos',
      isValid: photosValid,
      completedAfterComponent: VehiclePhotosReview,
    });
  }

  sections.push(
    {
      component: Review,
      title: 'Review',
      isValid: true,
      disableNext: true,
      completedAfterComponent: ReviewReview,
    },
    {
      component: DocumentsVerificationStep,
      title: 'Upload Documents',
      isValid: true,
      disableNext: true,
    }
  );

  return (
    <>
      {isLoading && (
        <LoadingOverlay>
          <SpinnerContainer>
            <VroomSpinner />
          </SpinnerContainer>
        </LoadingOverlay>
      )}
      <ModuleWrapper>
        <MainContent>
          <StepperWrapper>
            <StepperContainer>
              <VerificationStepper
                activeStep={
                  sectionChanged.current ? activeSection : initialSection
                }
              />
            </StepperContainer>
          </StepperWrapper>
          <Container>
            <MultiStepForm
              title="Let's verify your information"
              subtitle="We need a few details to make a quick and easy transaction"
              sections={sections}
              onDone={async () => {
                const response = await updateVerification(4);
                if (!response) return;

                const { owner_email_address, owner_first_name } =
                  response.data.data;

                analyticsHandler.current.trackProvideDocumentsClicked(
                  owner_email_address,
                  owner_first_name,
                  () => {
                    window.location.href = `/myaccount/hub/documents/sb`;
                  }
                );
              }}
              onNext={(currentSection, nextSection) => {
                if (currentSection < 3) {
                  updateVerification(currentSection + 1);
                }

                if (
                  nextSection === sections.length - 1 &&
                  !trackedEvents.current.includes('reviewViewed')
                ) {
                  trackedEvents.current.push('reviewViewed');
                  analyticsHandler.current.trackVerificationReviewViewed();
                }

                if (
                  currentSection === 0 &&
                  !trackedEvents.current.includes('contactCompleted')
                ) {
                  trackedEvents.current.push('contactCompleted');
                  analyticsHandler.current.trackContactInfoComplete();
                }

                if (
                  currentSection === 1 &&
                  !trackedEvents.current.includes('pickupCompleted')
                ) {
                  trackedEvents.current.push('pickupCompleted');
                  analyticsHandler.current.trackPickupInfoComplete();
                }

                if (
                  currentSection === 1 &&
                  !useVerificationStore.getState().plaidToken
                ) {
                  setLoading(true);
                  getPlaidToken().finally(() => setLoading(false));
                }

                if (
                  currentSection === 2 &&
                  !trackedEvents.current.includes('payoffCompleted')
                ) {
                  trackedEvents.current.push('payoffCompleted');
                  analyticsHandler.current.trackPayoffInfoComplete();
                }
              }}
              active={initialSection}
              onSectionChange={(section) => {
                if (!sectionChanged.current) sectionChanged.current = true;
                setActiveSection(section);
              }}
              nextText={'Save and Continue'}
              submitText={'Save and Continue'}
              extraOffset={88} // stepper height
            />
          </Container>
        </MainContent>
        <SidebarWrapper>
          <VerificationSidebar {...sidebarProps} />
        </SidebarWrapper>
      </ModuleWrapper>
    </>
  );
};

export default UnifiedVerification;
