import { yupResolver } from '@hookform/resolvers/yup';
import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { shallow } from 'zustand/shallow';

import useVerificationStore from '../../../../store/store';
import ownerInfoVerificationSchema from '../../utils/ownerInfoVerificationSchema';

const secondOwnerInfoVerificationSchema = ownerInfoVerificationSchema.shape({
  email: yup
    .string()
    .required('Email is required')
    .email('Please enter a valid email address')
    .test(
      'different-from-first-owner',
      'Please provide a unique email for 2nd owner',
      function (value) {
        const { firstOwnerEmail } = this.parent;

        return value !== firstOwnerEmail;
      }
    ),
  phoneNumber: yup
    .string()
    .required('Phone number is required')
    .matches(
      /^[2-9]?[ ]?\((\d{3})\)[- ]?(\d{3})[- ]?(\d{4})$/,
      'Please enter a valid phone number'
    )
    .min(14, 'Please enter a valid phone number')
    .max(16, 'Please enter a valid phone number')
    .test(
      'different-from-first-owner-phone-number',
      'Please provide a unique phone for 2nd owner',
      function (value) {
        const { firstOwnerPhoneNumber } = this.parent;

        return value !== firstOwnerPhoneNumber;
      }
    ),
});

const useSecondOwnerInfoForm = () => {
  const initialized = useRef(false);

  const {
    firstName,
    lastName,
    address,
    state,
    zip,
    city,
    apt,
    email,
    phoneNumber,
    firstOwnerEmail,
    firstOwnerPhoneNumber,
  } = useVerificationStore(
    (state) => ({
      firstName: state.secondOwnerFirstName,
      lastName: state.secondOwnerLastName,
      address: state.secondOwnerAddress,
      state: state.secondOwnerState,
      zip: state.secondOwnerZip,
      city: state.secondOwnerCity,
      apt: state.secondOwnerApt,
      email: state.secondOwnerEmail,
      phoneNumber: state.secondOwnerPhoneNumber,
      firstOwnerEmail: state.firstOwnerEmail,
      firstOwnerPhoneNumber: state.firstOwnerPhoneNumber,
    }),
    shallow
  );

  const form = useForm({
    defaultValues: {
      firstName,
      lastName,
      address,
      state,
      zip,
      city,
      apt,
      email,
      phoneNumber,
      firstOwnerEmail,
      firstOwnerPhoneNumber,
    },
    resolver: yupResolver(secondOwnerInfoVerificationSchema),
    mode: 'onChange',
  });

  if (zip && !initialized.current) {
    initialized.current = true;
    if (!form.formState.isValid) form.trigger();
  }

  return form;
};

export default useSecondOwnerInfoForm;
