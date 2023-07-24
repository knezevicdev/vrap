import React, { useCallback, useEffect } from 'react';

import { FormStepProps } from '../../components/MultiStepForm';
import WizardForm, {
  createSteps,
  WizardFormInstance,
} from '../../components/WizardForm';
import useVerificationStore from '../../store/store';
import PaymentInfoContext from './PaymentInfoContext';
import LoanAndPaymentInformation from './steps/LoanAndPaymentInformation/LoanAndPaymentInformation';
import useLoanInformationForm from './steps/LoanAndPaymentInformation/LoanInformation/useLoanInformationForm';
import LoanConfirmation from './steps/LoanConfirmation/LoanConfirmation';
import useLoanConfirmationForm from './steps/LoanConfirmation/useLoanConfirmationForm';

const LoanInformationStep = ({ nextStep, editRef }: FormStepProps) => {
  const wizardFormInstance = React.useRef<WizardFormInstance>();
  const paymentSubmittedType = useVerificationStore(
    (state) => state.paymentSubmittedType
  );

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

  const onDone = useCallback(() => {
    loadStateFromForms(loanConfirmationForm, loanInformationForm);

    nextStep?.();
  }, [loadStateFromForms, loanConfirmationForm, loanInformationForm, nextStep]);

  const steps = createSteps(
    {
      component: LoanConfirmation,
      form: loanConfirmationForm,
      onNext: () => {
        const loanNotConfirmed =
          loanConfirmationForm.getValues('loanConfirmation') === 'No';

        loanInformationForm.setValue('loanStepCompleted', loanNotConfirmed);

        if (loanNotConfirmed && paymentSubmittedType) {
          onDone();
          return 0;
        }

        return 2;
      },
    },
    {
      component: LoanAndPaymentInformation,
      form: loanInformationForm,
      disableStepButtons: true,
    }
  );

  return (
    <PaymentInfoContext.Provider value={{ onDone }}>
      <div>
        <WizardForm
          instance={(instance) => (wizardFormInstance.current = instance)}
          steps={steps}
          onDone={onDone}
          extraOffset={160} // stepper height + question title
        />
      </div>
    </PaymentInfoContext.Provider>
  );
};

export default LoanInformationStep;
