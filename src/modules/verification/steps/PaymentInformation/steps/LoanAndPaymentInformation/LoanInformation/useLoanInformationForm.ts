import { yupResolver } from '@hookform/resolvers/yup';
import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { shallow } from 'zustand/shallow';

import useVerificationStore from '../../../../../store/store';

const loanInformationSchema = yup.object().shape({
  loanStepCompleted: yup.boolean().required(),
  bankName: yup.string().required('Address is required'),
  manualBankName: yup.string().when('bankName', {
    is: 'Other',
    then: (schema) => schema.required('Bank name is required'),
  }),
  accountNumber: yup.string().required('Account number is required'),
  state: yup.string().required('State is required'),
  acknowledgment: yup
    .boolean()
    .required('You must agree to the terms')
    .oneOf([true], 'You must agree to the terms'),
  lienId: yup.string(),
  lastFourDigits: yup
    .string()
    .matches(/^$|^\d{4}$/, 'Invalid value')
    .nullable()
    .optional(),
  accFields: yup.boolean(),
  phoneNumber: yup.string().when('accFields', {
    is: true,
    then: (schema) => schema.required('Phone number is required'),
  }),
});

const useLoanInformationForm = () => {
  const initialized = useRef(false);

  const {
    bankName,
    manualBankName,
    phoneNumber,
    accountNumber,
    lastFourDigits,
    state,
    isAcknowledged,
    lienId,
    hasCccFields,
  } = useVerificationStore(
    (state) => ({
      bankName: state.loanInstitution,
      manualBankName: state.loanName,
      phoneNumber: state.loanPhoneNumber,
      accountNumber: state.loanAccountNumber,
      lastFourDigits: state.loanLastFourDigits,
      state: state.loanState,
      isAcknowledged: state.loanAcknowledgement,
      lienId: state.loanInstitutionId,
      hasCccFields: !!state.loanPhoneNumber,
    }),
    shallow
  );

  const form = useForm({
    defaultValues: {
      loanStepCompleted: false,
      bankName,
      manualBankName,
      phoneNumber,
      accountNumber,
      lastFourDigits,
      state,
      acknowledgment: isAcknowledged,
      lienId,
      accFields: hasCccFields,
    },
    resolver: yupResolver(loanInformationSchema),
    mode: 'onChange',
  });

  if (isAcknowledged && !initialized.current) {
    initialized.current = true;
    if (!form.formState.isValid) form.trigger();
  }

  return form;
};

export default useLoanInformationForm;
