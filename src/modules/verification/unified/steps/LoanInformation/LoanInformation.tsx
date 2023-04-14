import React, { useEffect } from 'react';

import { FormStepProps } from '../../components/MultiStepForm';
import WizardForm, {
  createSteps,
  WizardFormInstance,
} from '../../components/WizardForm';
import useVerificationStore from '../../store/store';
import calculateDocumentsValid from '../../utils/calculateDocumentsValid';
import LoanConfirmation from './steps/LoanConfirmation/LoanConfirmation';
import useLoanConfirmationForm from './steps/LoanConfirmation/useLoanConfirmationForm';
import LoanInformation from './steps/LoanInformation/LoanInformation';
import useLoanInformationForm from './steps/LoanInformation/useLoanInformationForm';

const LoanInformationStep = ({
  nextStep,
  goToStep,
  editRef,
}: FormStepProps) => {
  const wizardFormInstance = React.useRef<WizardFormInstance>();

  useEffect(() => {
    if (editRef && wizardFormInstance.current) {
      wizardFormInstance.current.goToStep(1);
    }
  }, [editRef]);

  const loadStateFromForms = useVerificationStore(
    (state) => state.loadLoanStateFromForms
  );

  const loanConfirmationForm = useLoanConfirmationForm();
  const loanInformationForm = useLoanInformationForm();

  const isLoanConfirmed =
    loanConfirmationForm.watch('loanConfirmation') === 'Yes';

  const onDone = () => {
    loadStateFromForms(loanConfirmationForm, loanInformationForm);

    if (editRef && !calculateDocumentsValid()) {
      goToStep(3);
      return;
    }

    nextStep?.();
  };

  const steps = createSteps(
    {
      component: LoanConfirmation,
      form: loanConfirmationForm,
      onNext: () => {
        if (!isLoanConfirmed) {
          onDone();
          return 0;
        }

        return 2;
      },
      nextText: isLoanConfirmed ? 'Next' : 'Continue',
    },
    {
      component: LoanInformation,
      form: loanInformationForm,
      nextText: 'Continue',
    }
  );

  return (
    <div>
      <WizardForm
        instance={(instance) => (wizardFormInstance.current = instance)}
        steps={steps}
        onDone={onDone}
      />
    </div>
  );
};

export default LoanInformationStep;
