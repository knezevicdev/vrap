import React, { useEffect } from 'react';

import { displayPhoneNumber } from '../../../../utils';
import { FormStepProps } from '../../components/MultiStepForm';
import WizardForm, {
  createSteps,
  WizardFormInstance,
} from '../../components/WizardForm';
import useVerificationStore from '../../store/store';
import FirstOwnerConfirmation from './steps/FirstOwnerConfirmation/FirstOwnerConfirmation';
import useFirstOwnerConfirmationForm from './steps/FirstOwnerConfirmation/useFirstOwnerConfirmationForm';
import FirstOwnerInfo from './steps/FirstOwnerInfo/FirstOwnerInfo';
import useFirstOwnerInfoForm from './steps/FirstOwnerInfo/useFirstOwnerInfoForm';
import SecondOwnerConfirmation from './steps/SecondOwnerConfirmation/SecondOwnerConfirmation';
import useSecondOwnerConfirmationForm from './steps/SecondOwnerConfirmation/useSecondOwnerConfirmationForm';
import SecondOwnerInfo from './steps/SecondOwnerInfo/SecondOwnerInfo';
import useSecondOwnerInfoForm from './steps/SecondOwnerInfo/useSecondOwnerInfoForm';

const OwnerVerificationStep = ({ nextStep, editRef }: FormStepProps) => {
  const wizardFormInstance = React.useRef<WizardFormInstance>();

  useEffect(() => {
    if (editRef && wizardFormInstance.current) {
      wizardFormInstance.current.goToStep(1);
    }
  }, [editRef]);

  const offerDetails = useVerificationStore((state) => ({
    offerFirstName: state.offerFirstName,
    offerLastName: state.offerLastName,
    offerPhone: state.offerPhone,
    offerEmail: state.offerEmail,
  }));

  const loadStateFromForms = useVerificationStore(
    (state) => state.loadOwnerStateFromForms
  );

  const firstOwnerConfirmationForm = useFirstOwnerConfirmationForm();
  const firstOwnerInfoForm = useFirstOwnerInfoForm();
  const secondOwnerConfirmationForm = useSecondOwnerConfirmationForm();
  const secondOwnerInfoForm = useSecondOwnerInfoForm();

  const isSecondOwnerConfirmed =
    secondOwnerConfirmationForm.watch('secondOwnerConfirmation') === 'Yes';

  const onDone = () => {
    loadStateFromForms(
      firstOwnerConfirmationForm,
      firstOwnerInfoForm,
      secondOwnerConfirmationForm,
      secondOwnerInfoForm
    );

    nextStep();
  };

  const steps = createSteps(
    {
      component: FirstOwnerConfirmation,
      form: firstOwnerConfirmationForm,
    },
    {
      component: FirstOwnerInfo,
      form: firstOwnerInfoForm,
      onActive: () => {
        if (
          firstOwnerConfirmationForm.getValues().firstOwnerConfirmation ===
            'Yes' &&
          !firstOwnerInfoForm.getValues().firstName
        ) {
          firstOwnerInfoForm.setValue('firstName', offerDetails.offerFirstName);
          firstOwnerInfoForm.setValue('lastName', offerDetails.offerLastName);
          firstOwnerInfoForm.setValue(
            'phoneNumber',
            displayPhoneNumber(offerDetails.offerPhone)
          );
          firstOwnerInfoForm.setValue('email', offerDetails.offerEmail);

          firstOwnerInfoForm.trigger('firstName');
          firstOwnerInfoForm.trigger('lastName');
          firstOwnerInfoForm.trigger('phoneNumber');
          firstOwnerInfoForm.trigger('email');
        }
      },
      onNext: () => {
        const firstOwnerInfoFormValues = firstOwnerInfoForm.getValues();
        const secondOwnerInfoFormValues = secondOwnerInfoForm.getValues();

        secondOwnerInfoForm.setValue(
          'firstOwnerEmail',
          firstOwnerInfoFormValues.email
        );
        secondOwnerInfoForm.setValue(
          'firstOwnerPhoneNumber',
          firstOwnerInfoFormValues.phoneNumber
        );

        if (secondOwnerInfoFormValues.email)
          secondOwnerInfoForm.trigger('email');
        if (secondOwnerInfoFormValues.phoneNumber)
          secondOwnerInfoForm.trigger('phoneNumber');

        return 3;
      },
    },
    {
      component: SecondOwnerConfirmation,
      form: secondOwnerConfirmationForm,
      onNext: () => {
        if (!isSecondOwnerConfirmed) {
          onDone();
          return 0;
        }

        return 4;
      },
      nextText: isSecondOwnerConfirmed ? 'Next' : 'Continue',
    },
    {
      component: SecondOwnerInfo,
      form: secondOwnerInfoForm,
      nextText: 'Continue',
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
    </div>
  );
};

export default OwnerVerificationStep;
