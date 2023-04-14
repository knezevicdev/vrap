import { yupResolver } from '@hookform/resolvers/yup';
import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { shallow } from 'zustand/shallow';

import useVerificationStore from '../../../../store/store';
import ownerInfoVerificationSchema from '../../utils/ownerInfoVerificationSchema';

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
    },
    resolver: yupResolver(ownerInfoVerificationSchema),
    mode: 'onChange',
  });

  if (zip && !initialized.current) {
    initialized.current = true;
    if (!form.formState.isValid) form.trigger();
  }

  return form;
};

export default useSecondOwnerInfoForm;
