import { useRef } from 'react';
import { useForm } from 'react-hook-form';

import useVerificationStore from '../../../../store/store';

const useFirstOwnerConfirmationForm = () => {
  const initialized = useRef(false);

  const firstOwnerConfirmation = useVerificationStore(
    (state) => state.firstOwnerConfirmation
  );

  const form = useForm({
    defaultValues: {
      firstOwnerConfirmation,
    },
  });

  if (firstOwnerConfirmation && !initialized.current) {
    initialized.current = true;
    if (!form.formState.isValid) form.trigger();
  }

  return form;
};

export default useFirstOwnerConfirmationForm;
