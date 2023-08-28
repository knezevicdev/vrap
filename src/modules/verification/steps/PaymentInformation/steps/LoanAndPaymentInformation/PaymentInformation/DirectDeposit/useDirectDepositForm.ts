import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

const directDepositSchema = yup.object().shape({
  routingNumber: yup.string().label('Routing Number').length(9).required(),
  bankAccountNumber: yup
    .string()
    .label('Bank Account Number')
    .max(17)
    .required(),
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
