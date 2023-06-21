import * as yup from 'yup';

import { getZipCodeValidation } from 'src/networking/request';

const ownerInfoVerificationSchema = yup.object().shape({
  firstName: yup.string().required('First name is required'),
  middleName: yup.string().optional(),
  lastName: yup.string().required('Last name is required'),
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

export default ownerInfoVerificationSchema;
