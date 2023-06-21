import React, { useEffect, useState } from 'react';

import { FormStepProps } from '../../components/MultiStepForm';
import WizardForm, {
  createSteps,
  WizardFormInstance,
} from '../../components/WizardForm';
import useVerificationStore from '../../store/store';
import ContactInfo from './steps/ContactInfo/ContactInfo';
import useContactInfoForm from './steps/ContactInfo/useContactInfoForm';
import ContactInfoConfirmation from './steps/ContactInfoConfirmation/ContactInfoConfirmation';
import useContactInfoConfirmationForm from './steps/ContactInfoConfirmation/useContactInfoConfirmationForm';
import PickupAddressConfirmation from './steps/PickupAddressConfirmation/PickupAddressConfirmation';
import usePickupAddressConfirmationForm from './steps/PickupAddressConfirmation/usePickupAddressConfirmationForm';
import NearSuycLocation from './steps/PickupAddressInfo/NearSuycLocation';
import fetchSuycLocation, {
  SuycLocation,
} from './steps/PickupAddressInfo/NearSuycLocation/fetchSuycLocation';
import PickupAddressInfo from './steps/PickupAddressInfo/PickupAddressInfo';
import usePickupAddressInfoForm from './steps/PickupAddressInfo/usePickupAddressInfoForm';

const PickupVerificationStep = ({ nextStep, editRef }: FormStepProps) => {
  const [suycLocation, setSuycLocation] = useState<SuycLocation>();
  const wizardFormInstance = React.useRef<WizardFormInstance>();

  useEffect(() => {
    if (editRef && wizardFormInstance.current) {
      wizardFormInstance.current.goToStep(1);
    }
  }, [editRef]);

  const loadStateFromForms = useVerificationStore(
    (state) => state.loadPickupStateFromForms
  );

  const contactInfoConfirmationForm = useContactInfoConfirmationForm();
  const contactInfoForm = useContactInfoForm();
  const pickupAddressConfirmationForm = usePickupAddressConfirmationForm();
  const pickupAddressInfoForm = usePickupAddressInfoForm();

  const isPickupAddressConfirmed =
    pickupAddressConfirmationForm.watch('pickupAddressConfirmation') === 'Yes';
  const isContactInfoConfirmed =
    contactInfoConfirmationForm.watch('contactInfoConfirmation') === 'Yes';

  const onDone = async () => {
    loadStateFromForms(
      contactInfoConfirmationForm,
      contactInfoForm,
      pickupAddressConfirmationForm,
      pickupAddressInfoForm
    );

    const { pickupAddress, pickupCity, pickupZip, pickupState, pickupApt } =
      useVerificationStore.getState();

    const addressLines = [pickupAddress];

    if (pickupApt) {
      addressLines.push(pickupApt);
    }

    const fullAddress = `${addressLines.join(
      ', '
    )} ${pickupCity}, ${pickupState} ${pickupZip}`;

    let shouldContinue = true;
    try {
      const suycLocation = await fetchSuycLocation(fullAddress);
      if (suycLocation) {
        setSuycLocation(suycLocation);
        shouldContinue = false;
      }
    } catch (e) {
      console.warn('Failed to fetch SUYC location', e);
    }

    if (shouldContinue) nextStep();
  };

  const steps = createSteps(
    {
      component: PickupAddressConfirmation,
      form: pickupAddressConfirmationForm,
      onNext: () => {
        if (!isPickupAddressConfirmed) {
          return 2;
        }

        return 3;
      },
    },
    {
      component: PickupAddressInfo,
      form: pickupAddressInfoForm,
    },
    {
      component: ContactInfoConfirmation,
      form: contactInfoConfirmationForm,
      nextText: isContactInfoConfirmed ? 'Continue' : 'Next',
      onNext: () => {
        if (isContactInfoConfirmed) {
          onDone();
          return 0;
        }

        return 4;
      },
      onPrev: () => {
        if (isPickupAddressConfirmed) {
          return 1;
        }

        return 2;
      },
    },
    {
      component: ContactInfo,
      form: contactInfoForm,
    }
  );

  return (
    <div>
      <WizardForm
        instance={(instance) => (wizardFormInstance.current = instance)}
        steps={steps}
        onDone={onDone}
        extraOffset={160} // stepper height + question title
      />
      {suycLocation && (
        <NearSuycLocation
          location={suycLocation}
          onContinue={() => {
            setSuycLocation(undefined);
            nextStep();
          }}
        />
      )}
    </div>
  );
};

export default PickupVerificationStep;
