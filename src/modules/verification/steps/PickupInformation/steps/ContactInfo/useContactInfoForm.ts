import { yupResolver } from '@hookform/resolvers/yup';
import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { shallow } from 'zustand/shallow';

import useVerificationStore from '../../../../store/store';

const contactInfoSchema = yup.object().shape({
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  email: yup
    .string()
    .required('Email is required')
    .email('Please enter a valid email address'),
  phoneNumber: yup
    .string()
    .required('Phone number is required')
    .matches(
      /^[2-9]?[ ]?\((\d{3})\)[- ]?(\d{3})[- ]?(\d{4})$/,
      'Please enter a valid phone number'
    )
    .min(14, 'Please enter a valid phone number')
    .max(16, 'Please enter a valid phone number'),
});

const useContactInfoForm = () => {
  const initialized = useRef(false);

  const { firstName, lastName, email, phoneNumber } = useVerificationStore(
    (state) => ({
      firstName: state.pickupContactFirstName,
      lastName: state.pickupContactLastName,
      email: state.pickupContactEmail,
      phoneNumber: state.pickupContactPhoneNumber,
    }),
    shallow
  );

  const form = useForm({
    defaultValues: {
      firstName,
      lastName,
      email,
      phoneNumber,
    },
    resolver: yupResolver(contactInfoSchema),
    mode: 'onChange',
  });

  if (firstName && !initialized.current) {
    initialized.current = true;
    if (!form.formState.isValid) form.trigger();
  }

  return form;
};

export default useContactInfoForm;
