import { useRef } from 'react';
import { useForm } from 'react-hook-form';

import useVerificationStore from '../../../../store/store';

const usePickupAddressConfirmationForm = () => {
  const initialized = useRef(false);

  const pickupAddressConfirmation = useVerificationStore(
    (state) => state.pickupAddressConfirmation
  );

  const form = useForm({
    defaultValues: {
      pickupAddressConfirmation,
    },
  });

  if (pickupAddressConfirmation && !initialized.current) {
    initialized.current = true;
    if (!form.formState.isValid) form.trigger();
  }

  return form;
};

export default usePickupAddressConfirmationForm;
