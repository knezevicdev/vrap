import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

const directDepositSchema = yup.object().shape({
  routingNumber: yup.string().required(),
  bankAccountNumber: yup.string().required(),
});

const useDirectDepositForm = () => {
  return useForm({
    defaultValues: {
      routingNumber: '',
      bankAccountNumber: '',
    },
    resolver: yupResolver(directDepositSchema),
    mode: 'onChange',
  });
};

export default useDirectDepositForm;
