import { yupResolver } from '@hookform/resolvers/yup';
import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { shallow } from 'zustand/shallow';

import useVerificationStore from '../../../../store/store';
import ownerInfoVerificationSchema from '../../utils/ownerInfoVerificationSchema';

const useFirstOwnerInfoForm = () => {
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
      firstName: state.firstOwnerFirstName,
      lastName: state.firstOwnerLastName,
      address: state.firstOwnerAddress,
      state: state.firstOwnerState,
      zip: state.firstOwnerZip,
      city: state.firstOwnerCity,
      apt: state.firstOwnerApt,
      email: state.firstOwnerEmail,
      phoneNumber: state.firstOwnerPhoneNumber,
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

export default useFirstOwnerInfoForm;
