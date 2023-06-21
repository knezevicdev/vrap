import { yupResolver } from '@hookform/resolvers/yup';
import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import useVerificationStore from '../../../../store/store';

const firstOwnerConfirmationSchema = yup.object().shape({
  firstOwnerConfirmation: yup.string().required(),
});

const useFirstOwnerConfirmationForm = () => {
  const initialized = useRef(false);

  const firstOwnerConfirmation = useVerificationStore(
    (state) => state.firstOwnerConfirmation
  );

  const form = useForm({
    defaultValues: {
      firstOwnerConfirmation,
    },
    resolver: yupResolver(firstOwnerConfirmationSchema),
    mode: 'onChange',
  });

  if (firstOwnerConfirmation && !initialized.current) {
    initialized.current = true;
    if (!form.formState.isValid) form.trigger();
  }

  return form;
};

export default useFirstOwnerConfirmationForm;
