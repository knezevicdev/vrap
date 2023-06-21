import { yupResolver } from '@hookform/resolvers/yup';
import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import useVerificationStore from '../../../../store/store';

const loanConfirmationSchema = yup.object().shape({
  loanConfirmation: yup.string().required(),
});

const useLoanConfirmationForm = () => {
  const initialized = useRef(false);

  const loanConfirmation = useVerificationStore(
    (state) => state.loanConfirmation
  );

  const form = useForm({
    defaultValues: {
      loanConfirmation,
    },
    resolver: yupResolver(loanConfirmationSchema),
    mode: 'onChange',
  });

  if (loanConfirmation && !initialized.current) {
    initialized.current = true;
    if (!form.formState.isValid) form.trigger();
  }

  return form;
};

export default useLoanConfirmationForm;
