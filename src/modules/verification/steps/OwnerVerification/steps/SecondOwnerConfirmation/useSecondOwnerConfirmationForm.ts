import { yupResolver } from '@hookform/resolvers/yup';
import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import useVerificationStore from '../../../../store/store';

const secondOwnerConfirmationSchema = yup.object().shape({
  secondOwnerConfirmation: yup.string().required(),
});
const useSecondOwnerConfirmationForm = () => {
  const initialized = useRef(false);

  const secondOwnerConfirmation = useVerificationStore(
    (state) => state.secondOwnerConfirmation
  );

  const form = useForm({
    defaultValues: {
      secondOwnerConfirmation,
    },
    resolver: yupResolver(secondOwnerConfirmationSchema),
    mode: 'onChange',
  });

  if (secondOwnerConfirmation && !initialized.current) {
    initialized.current = true;
    if (!form.formState.isValid) form.trigger();
  }

  return form;
};

export default useSecondOwnerConfirmationForm;
