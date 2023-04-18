import { useRef } from 'react';
import { useForm } from 'react-hook-form';

import useVerificationStore from '../../../../store/store';

const useContactInfoConfirmationForm = () => {
  const initialized = useRef(false);

  const contactInfoConfirmation = useVerificationStore(
    (state) => state.pickupContactConfirmation
  );

  const form = useForm({
    defaultValues: {
      contactInfoConfirmation,
    },
  });

  if (contactInfoConfirmation && !initialized.current) {
    initialized.current = true;
    if (!form.formState.isValid) form.trigger();
  }

  return form;
};

export default useContactInfoConfirmationForm;
