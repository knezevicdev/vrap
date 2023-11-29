import { useEffect, useState } from 'react';

import useLoanInformationForm from './useLoanInformationForm';

import { Caf } from 'src/networking/models/Price';

export enum LoanField {
  LIEN_NAME,
  PHONE_NUMBER,
  SSN_LAST_DIGITS,
}

const useAvailableFields = (
  caf: Caf[],
  form: ReturnType<typeof useLoanInformationForm>
): LoanField[] => {
  const [availableFields, setAvailableFields] = useState<LoanField[]>([
    LoanField.PHONE_NUMBER,
    LoanField.SSN_LAST_DIGITS,
  ]);
  const bankName = form.watch('bankName');

  useEffect(() => {
    const apiFields =
      caf.find((caf) => caf.lienholder_name === bankName)?.route_one_fields ||
      [];

    const localAvailableFields = [];

    const shouldIncludePhoneAndSsn = !apiFields.includes('ACC');
    if (shouldIncludePhoneAndSsn) {
      localAvailableFields.push(
        LoanField.PHONE_NUMBER,
        LoanField.SSN_LAST_DIGITS
      );
    }

    const formValues = form.getValues();

    if (bankName === 'Other') {
      localAvailableFields.push(LoanField.LIEN_NAME);
    } else if (formValues.manualBankName !== '') {
      form.setValue('manualBankName', '');
    }
    form.setValue('accFields', shouldIncludePhoneAndSsn);
    if (
      !shouldIncludePhoneAndSsn &&
      (formValues.phoneNumber !== '' || formValues.lastFourDigits !== '')
    ) {
      form.setValue('phoneNumber', '');
      form.setValue('lastFourDigits', '');
    }

    if (
      JSON.stringify(localAvailableFields) !== JSON.stringify(availableFields)
    ) {
      setAvailableFields(localAvailableFields);
    }
  }, [availableFields, bankName, caf, form]);

  return availableFields;
};

export default useAvailableFields;
