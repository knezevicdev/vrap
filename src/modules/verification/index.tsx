import { Button, VroomSpinner } from '@vroom-web/ui-lib';
import { observer } from 'mobx-react';
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
import DocumentsVerificationReview from './steps/DocumentsVerification/DocumentsVerificationReview';
import LoanInformationStep from './steps/LoanInformation/LoanInformation';
import LoanInformationReview from './steps/LoanInformation/LoanInformationReview';
import OwnerVerificationStep from './steps/OwnerVerification/OwnerVerification';
import OwnerVerificationReview from './steps/OwnerVerification/OwnerVerificationReview';
import PickupInformationStep from './steps/PickupInformation/PickupInformation';
import PickupInformationReview from './steps/PickupInformation/PickupInformationReview';
import Review from './steps/Review/Review';
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
import handleVerificationCompleted from './utils/handleVerificationCompleted';
import updateVerification from './utils/updateVerification';
import useDocumentsValid from './utils/useDocumentsValid';
import usePhotosValid from './utils/usePhotosValid';

interface Props {
  ajsUserId: string;
}

const UnifiedVerification = ({ ajsUserId }: Props) => {
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

  const documentsValid = useDocumentsValid();
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
    await acceptPriceOffer(priceId, ajsUserId);
  }, [priceId, ajsUserId]);

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
              handleVerificationCompleted(
                completedInfo.finalPayment,
                completedInfo.offerPrice,
                priceId
              );
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
      title: 'Owner Information',
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
      component: LoanInformationStep,
      title: 'Payment Details',
      isValid: true,
      disableNext: true,
      completedAfterComponent: LoanInformationReview,
    },
    {
      component: DocumentsVerificationStep,
      title: 'Document Upload',
      isValid: documentsValid,
      completedAfterComponent: DocumentsVerificationReview,
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

  sections.push({
    component: Review,
    title: 'Review',
    isValid: true,
    disableNext: true,
  });

  return (
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
              const response = await updateVerification(5);
              if (!response) return;

              const {
                owner_email_address,
                owner_first_name,
                offer_price,
                poq,
              } = response.data.data;

              analyticsHandler.current.trackVerificationSubmitted(
                owner_email_address,
                owner_first_name
              );

              handleVerificationCompleted(
                poq?.final_payment || null,
                offer_price,
                priceId
              );
            }}
            onNext={(currentSection, nextSection) => {
              if (currentSection < 4) {
                updateVerification(currentSection + 1);
              }

              if (
                nextSection === 3 &&
                !trackedEvents.current.includes('documentsViewed')
              ) {
                trackedEvents.current.push('documentsViewed');
                analyticsHandler.current.trackVerificationDocumentsViewed();
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
  );
};

export default observer(UnifiedVerification);
