import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup
  .object()
  .shape({
    email: yup
      .string()
      .required('Please enter a valid email address')
      .email('Please enter a valid email address'),
    password: yup.string().required('Please enter a valid password'),
  })
  .required();

export default yupResolver(schema);
