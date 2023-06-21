import { yupResolver } from '@hookform/resolvers/yup';
import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import useVerificationStore from '../../../../store/store';

const pickupAddressConfirmationSchema = yup.object().shape({
  pickupAddressConfirmation: yup.string().required(),
});

const usePickupAddressConfirmationForm = () => {
  const initialized = useRef(false);

  const pickupAddressConfirmation = useVerificationStore(
    (state) => state.pickupAddressConfirmation
  );

  const form = useForm({
    defaultValues: {
      pickupAddressConfirmation,
    },
    resolver: yupResolver(pickupAddressConfirmationSchema),
    mode: 'onChange',
  });

  if (pickupAddressConfirmation && !initialized.current) {
    initialized.current = true;
    if (!form.formState.isValid) form.trigger();
  }

  return form;
};

export default usePickupAddressConfirmationForm;
