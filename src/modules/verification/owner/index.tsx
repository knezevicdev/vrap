import { isErrorResponse } from '@vroom-web/networking';
import { observer } from 'mobx-react';
import React, { useCallback, useEffect, useRef, useState } from 'react';

import { Container } from '../shared/Style.css';
import { CalculateRequiredDocuments } from '../shared/utils/calculateRequiredDocuments';
import ContactInformation from './components/ContactInformation';
import LoanInformation from './components/LoanInformation';
import NearSuycLocation from './components/NearSuycLocation';
import PickUpInformation from './components/PickUpInformation';
import useOwnerReviewForms from './hooks/useOwnerReviewForms';
import { ownerVerificationFormToPayload } from './utils';
import { doesRequireNewDocuments } from './utils/doesRequireNewDocuments';
import fetchSuycLocation, { SuycLocation } from './utils/fetchSuycLocation';
import fetchVerificationDetails from './utils/fetchVerificationDetails';
import { ownerFormsToRequiredDocuments } from './utils/ownerFormsToRequiredDocuments';

import { useAppStore } from 'src/context';
import AnalyticsHandler from 'src/integrations/AnalyticsHandler';
import MultiStepForm from 'src/modules/appraisalform/components/MultiStepForm';
import { acceptPriceOffer, updateVerification } from 'src/networking/request';

interface Props {
  priceId: string;
  ajsUserId: string;
}

const VerificationOwnerViewDetail: React.FC<Props> = ({
  priceId,
  ajsUserId,
}) => {
  const editForm = useRef(false);
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState(0);
  const lastPriceId = useRef<string>();
  const lastPriceIdForEdit = useRef<string>();
  const forms = useOwnerReviewForms();
  const { store } = useAppStore();
  const analyticsHandler = useRef(new AnalyticsHandler());
  const initialRequiredDocuments = useRef<CalculateRequiredDocuments>();
  const [suycLocation, setSuycLocation] = useState<SuycLocation>();

  const acceptPrice = useCallback(async () => {
    await acceptPriceOffer(priceId, ajsUserId);
  }, [priceId, ajsUserId]);

  useEffect(() => {
    acceptPrice();
  }, [acceptPrice]);

  useEffect(() => {
    analyticsHandler.current.trackVerificationOwnerViewed();
  }, []);

  useEffect(() => {
    if (lastPriceId.current !== priceId) {
      lastPriceId.current = priceId;
      store.verification.setLoading(true);
      setIsLoading(true);
      fetchVerificationDetails(priceId, forms).then((activeSection) => {
        const editSection =
          localStorage.getItem('review_edit_section') || false;
        let newActiveSection = activeSection > 2 ? 2 : activeSection;
        if (editSection) {
          newActiveSection = Number(editSection);
          editForm.current = true;
        }

        setActiveSection(newActiveSection);
        store.verification.setLoading(false);
        setIsLoading(false);
      });
    }
  }, [forms, priceId, store]);

  useEffect(() => {
    if (
      lastPriceIdForEdit.current !== priceId &&
      editForm.current &&
      !isLoading
    ) {
      lastPriceIdForEdit.current = priceId;
      initialRequiredDocuments.current = ownerFormsToRequiredDocuments(
        forms,
        activeSection
      );
    }
  }, [isLoading, forms, priceId, activeSection]);

  const sections = [
    {
      component: ContactInformation,
      form: forms.contactInfoForm,
      title: 'Contact information',
    },
    {
      component: PickUpInformation,
      form: forms.pickupInfoForm,
      title: 'Pick Up Information',
      contactFields: forms.contactInfoForm.fields,
    },
    {
      component: LoanInformation,
      form: forms.loanInfoForm,
      title: 'Auto Loan Information',
    },
  ];

  if (isLoading) return null;

  const onEditFinish = (priceId: string) => {
    localStorage.removeItem('review_edit_section');

    if (
      initialRequiredDocuments.current &&
      doesRequireNewDocuments(
        initialRequiredDocuments.current,
        ownerFormsToRequiredDocuments(forms, activeSection)
      )
    ) {
      window.location.href = `/sell/verification/documents/${priceId}`;
      return;
    }

    window.location.href = `/appraisal/verification/review?priceId=${priceId}`;
  };

  const onNext = async (activeSection: number) => {
    store.verification.setLoading(true);

    const payload = ownerVerificationFormToPayload(forms, activeSection + 1);
    await updateVerification(payload, priceId);

    switch (activeSection) {
      case 0:
        analyticsHandler.current.trackContactInfoComplete();
        break;
      case 1:
        analyticsHandler.current.trackPickupInfoComplete();
        break;
      default:
        break;
    }

    if (activeSection === 1 && payload.pickup_address) {
      const { city, state, zipcode, address_1, address_2 } =
        payload.pickup_address;

      const addressLines = [address_1];

      if (address_2) {
        addressLines.push(address_2);
      }

      const fullAddress = `${addressLines.join(
        ', '
      )} ${city}, ${state} ${zipcode}`;

      try {
        const suycLocation = await fetchSuycLocation(fullAddress);
        if (suycLocation) setSuycLocation(suycLocation);
      } catch (e) {
        console.warn('Failed to fetch SUYC location', e);
      } finally {
        store.verification.setLoading(false);
      }
    } else {
      store.verification.setLoading(false);
    }

    if (editForm.current) {
      onEditFinish(priceId);
    }
  };

  const onDone = async () => {
    store.verification.setLoading(true);

    const payload = ownerVerificationFormToPayload(forms, 3);
    const updateResponse = await updateVerification(payload, priceId);
    if (isErrorResponse(updateResponse)) {
      store.verification.setLoading(false);
      return;
    }
    const updateOfferId = updateResponse.data.data.offer_id;
    analyticsHandler.current.trackPayoffInfoComplete();
    localStorage.setItem('lastFour', payload.last_four_ssn || '');

    const whereIsVehicleRegistered = payload.current_payments
      ? forms.loanInfoForm.fields.state.value
      : '';
    localStorage.setItem('whereIsVehicleRegistered', whereIsVehicleRegistered);

    if (editForm.current) {
      onEditFinish(updateOfferId);
      return;
    }

    window.location.href = `/sell/verification/documents/${updateOfferId}`;
  };

  return (
    <Container>
      <MultiStepForm
        formTitle="Let's verify your information"
        sections={sections}
        onDone={onDone}
        onNext={onNext}
        active={activeSection}
        nextText={'Save and Continue'}
        submitText={'Save and Continue'}
        disableExperiments={false}
      />
      {suycLocation && (
        <NearSuycLocation
          location={suycLocation}
          onContinue={() => setSuycLocation(undefined)}
        />
      )}
    </Container>
  );
};

export default observer(VerificationOwnerViewDetail);
