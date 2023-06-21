import { yupResolver } from '@hookform/resolvers/yup';
import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { shallow } from 'zustand/shallow';

import useVerificationStore from '../../../../store/store';

import { getZipCodeValidation } from 'src/networking/request';

const pickupAddressSchema = yup.object().shape({
  address: yup.string().required('Address is required'),
  state: yup.string().required('State is required'),
  zip: yup
    .string()
    .required('Zip is required')
    .matches(/^[0-9]{5}$/, 'Zip is invalid')
    .test('async-validate-zip-code', 'Zip is invalid', async (val) => {
      const { data } = await getZipCodeValidation(val);

      return data.isZipValid;
    }),
  city: yup.string().required('City is required'),
  apt: yup.string(),
});

const usePickupAddressInfoForm = () => {
  const initialized = useRef(false);

  const { address, state, zip, city, apt } = useVerificationStore(
    (state) => ({
      address: state.pickupAddress,
      state: state.pickupState,
      zip: state.pickupZip,
      city: state.pickupCity,
      apt: state.pickupApt,
    }),
    shallow
  );

  const form = useForm({
    defaultValues: {
      address,
      state,
      zip,
      city,
      apt,
    },
    resolver: yupResolver(pickupAddressSchema),
    mode: 'onChange',
  });

  if (zip && !initialized.current) {
    initialized.current = true;
    if (!form.formState.isValid) form.trigger();
  }

  return form;
};

export default usePickupAddressInfoForm;
