import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

const paymentAddressSchema = yup.object().shape({
  sameAsPrimaryOwner: yup.string().required(),
  address: yup.string().when('sameAsPrimaryOwner', {
    is: 'No',
    then: (schema) => schema.required('Address is required'),
  }),
  state: yup.string().when('sameAsPrimaryOwner', {
    is: 'No',
    then: (schema) => schema.required('Address is required'),
  }),
  zip: yup.string().when('sameAsPrimaryOwner', {
    is: 'No',
    then: (schema) => schema.required('Address is required'),
  }),
  city: yup.string().when('sameAsPrimaryOwner', {
    is: 'No',
    then: (schema) => schema.required('Address is required'),
  }),
});

const usePaymentAddressForm = () => {
  return useForm({
    defaultValues: {
      sameAsPrimaryOwner: 'Yes',
      address: '',
      state: '',
      zip: '',
      city: '',
      apt: '',
    },
    resolver: yupResolver(paymentAddressSchema),
    mode: 'onChange',
  });
};

export default usePaymentAddressForm;
