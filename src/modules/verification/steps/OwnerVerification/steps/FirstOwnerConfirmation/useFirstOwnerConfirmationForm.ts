import { yupResolver } from '@hookform/resolvers/yup';
import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { shallow } from 'zustand/shallow';

import useVerificationStore from '../../../../store/store';

const firstOwnerConfirmationSchema = yup.object().shape({
  firstOwnerConfirmation: yup.string().required(),
  documentMileageValue: yup
    .number()
    .typeError('Mileage must be a number')
    .integer('Mileage must be an integer')
    .positive('Mileage must be positive')
    .required(),
});

const useFirstOwnerConfirmationForm = () => {
  const initialized = useRef(false);

  const { firstOwnerConfirmation, documentMileageValue } = useVerificationStore(
    ({ firstOwnerConfirmation, documentMileageValue }) => ({
      firstOwnerConfirmation,
      documentMileageValue,
    }),
    shallow
  );

  const form = useForm({
    defaultValues: {
      firstOwnerConfirmation,
      documentMileageValue,
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
