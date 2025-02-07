import React from 'react';

import { WizardStepProps } from '../../../../components/WizardForm';
import useVerificationStore from '../../../../store/store';
import { usePaymentInfoContext } from '../../PaymentInfoContext';
import LoanInformation, {
  LoanInformationForm,
} from './LoanInformation/LoanInformation';
import PaymentInformation from './PaymentInformation/PaymentInformation';

const LoanAndPaymentInformation = ({
  form,
  previousStep,
}: WizardStepProps<LoanInformationForm>) => {
  const hasCompletedLoanInfo = form.watch('loanStepCompleted');
  const paymentSubmittedType = useVerificationStore(
    (state) => state.paymentSubmittedType
  );
  const { onDone } = usePaymentInfoContext();

  return (
    <div>
      <LoanInformation
        form={form}
        onPrev={() => previousStep?.()}
        onNext={() =>
          paymentSubmittedType
            ? onDone()
            : form.setValue('loanStepCompleted', true)
        }
        onEdit={() => previousStep?.()}
        preview={hasCompletedLoanInfo}
      />
      <PaymentInformation
        preview={!hasCompletedLoanInfo}
        onComplete={() => onDone()}
      />
    </div>
  );
};

export default LoanAndPaymentInformation;
