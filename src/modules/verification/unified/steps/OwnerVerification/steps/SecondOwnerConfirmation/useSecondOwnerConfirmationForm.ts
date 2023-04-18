import { useRef } from 'react';
import { useForm } from 'react-hook-form';

import useVerificationStore from '../../../../store/store';

const useSecondOwnerConfirmationForm = () => {
  const initialized = useRef(false);

  const secondOwnerConfirmation = useVerificationStore(
    (state) => state.secondOwnerConfirmation
  );

  const form = useForm({
    defaultValues: {
      secondOwnerConfirmation,
    },
  });

  if (secondOwnerConfirmation && !initialized.current) {
    initialized.current = true;
    if (!form.formState.isValid) form.trigger();
  }

  return form;
};

export default useSecondOwnerConfirmationForm;
