import { useRef } from 'react';
import { useForm } from 'react-hook-form';

import useVerificationStore from '../../../../store/store';

const useLoanConfirmationForm = () => {
  const initialized = useRef(false);

  const loanConfirmation = useVerificationStore(
    (state) => state.loanConfirmation
  );

  const form = useForm({
    defaultValues: {
      loanConfirmation,
    },
  });

  if (loanConfirmation && !initialized.current) {
    initialized.current = true;
    if (!form.formState.isValid) form.trigger();
  }

  return form;
};

export default useLoanConfirmationForm;
