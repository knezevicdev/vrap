import React, { useEffect } from 'react';

import { FormStepProps } from '../../components/MultiStepForm';
import WizardForm, {
  createSteps,
  WizardFormInstance,
} from '../../components/WizardForm';
import useVerificationStore from '../../store/store';
import calculateDocumentsValid from '../../utils/calculateDocumentsValid';
import FirstOwnerConfirmation from './steps/FirstOwnerConfirmation/FirstOwnerConfirmation';
import useFirstOwnerConfirmationForm from './steps/FirstOwnerConfirmation/useFirstOwnerConfirmationForm';
import FirstOwnerInfo from './steps/FirstOwnerInfo/FirstOwnerInfo';
import useFirstOwnerInfoForm from './steps/FirstOwnerInfo/useFirstOwnerInfoForm';
import SecondOwnerConfirmation from './steps/SecondOwnerConfirmation/SecondOwnerConfirmation';
import useSecondOwnerConfirmationForm from './steps/SecondOwnerConfirmation/useSecondOwnerConfirmationForm';
import SecondOwnerInfo from './steps/SecondOwnerInfo/SecondOwnerInfo';
import useSecondOwnerInfoForm from './steps/SecondOwnerInfo/useSecondOwnerInfoForm';

const OwnerVerificationStep = ({
  nextStep,
  goToStep,
  editRef,
  returnStep,
}: FormStepProps) => {
  const wizardFormInstance = React.useRef<WizardFormInstance>();

  useEffect(() => {
    if (editRef && wizardFormInstance.current) {
      wizardFormInstance.current.goToStep(1);
    }
  }, [editRef]);

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

    if (editRef && returnStep > 3 && !calculateDocumentsValid()) {
      goToStep(3);
      return;
    }

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
