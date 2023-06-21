import { yupResolver } from '@hookform/resolvers/yup';
import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import useVerificationStore from '../../../../store/store';

const contactInfoConfirmationSchema = yup.object().shape({
  contactInfoConfirmation: yup.string().required(),
});

const useContactInfoConfirmationForm = () => {
  const initialized = useRef(false);

  const contactInfoConfirmation = useVerificationStore(
    (state) => state.pickupContactConfirmation
  );

  const form = useForm({
    defaultValues: {
      contactInfoConfirmation,
    },
    resolver: yupResolver(contactInfoConfirmationSchema),
    mode: 'onChange',
  });

  if (contactInfoConfirmation && !initialized.current) {
    initialized.current = true;
    if (!form.formState.isValid) form.trigger();
  }

  return form;
};

export default useContactInfoConfirmationForm;
