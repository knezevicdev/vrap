import { isEqual } from 'lodash';
import { useEffect, useRef, useState } from 'react';

import { UseForm } from 'src/modules/appraisalform/components/componentInterfaces.d';
import { Caf } from 'src/networking/models/Price';

export enum LoanField {
  LIEN_NAME,
  PHONE_NUMBER,
  ACCOUNT_NUMBER,
  SSN_LAST_DIGITS,
}

const useAvailableFields = (caf: Caf[], form: UseForm): LoanField[] => {
  const lastCheckValue = useRef<{
    activeLoan: boolean;
    bank: string;
    caf: Caf[];
  }>();
  const [availableFields, setAvailableFields] = useState<LoanField[]>([
    LoanField.PHONE_NUMBER,
    LoanField.ACCOUNT_NUMBER,
    LoanField.SSN_LAST_DIGITS,
  ]);

  const fields = form.fields;
  const shouldEnableFields = fields.activeLoan.value === 'Yes';

  useEffect(() => {
    const currentCheckValue = {
      activeLoan: shouldEnableFields,
      bank: fields.bank.value,
      caf,
    };

    if (!isEqual(lastCheckValue.current, currentCheckValue)) {
      lastCheckValue.current = currentCheckValue;

      const apiFields =
        caf.find((caf) => caf.lienholder_name === fields.bank.value)
          ?.route_one_fields || [];

      const availableFields = [];

      if (shouldEnableFields) {
        if (apiFields.includes('ACC')) {
          availableFields.push(LoanField.ACCOUNT_NUMBER);
        } else {
          availableFields.push(
            LoanField.PHONE_NUMBER,
            LoanField.ACCOUNT_NUMBER,
            LoanField.SSN_LAST_DIGITS
          );
        }
        if (fields.bank.value === 'Other')
          availableFields.push(LoanField.LIEN_NAME);
      }

      setAvailableFields(availableFields);
      form.updateMultipleFields({
        bank: {
          ...fields.bank,
          isRequired: shouldEnableFields,
          value: shouldEnableFields ? fields.bank.value : '',
        },
        agreement: {
          ...fields.agreement,
          isRequired: shouldEnableFields,
          value: shouldEnableFields ? fields.agreement.value : '',
        },
        state: {
          ...fields.state,
          isRequired: shouldEnableFields,
          value: shouldEnableFields ? fields.state.value : '',
        },
        name: {
          ...fields.name,
          isRequired: availableFields.includes(LoanField.LIEN_NAME),
          value: availableFields.includes(LoanField.LIEN_NAME)
            ? fields.name.value
            : '',
        },
        accountNumber: {
          ...fields.accountNumber,
          isRequired: availableFields.includes(LoanField.ACCOUNT_NUMBER),
          value: availableFields.includes(LoanField.ACCOUNT_NUMBER)
            ? fields.accountNumber.value
            : '',
        },
      });
    }
  }, [
    caf,
    form,
    fields.name,
    fields.accountNumber,
    shouldEnableFields,
    fields.bank,
    fields.agreement,
    fields.state,
  ]);

  return availableFields;
};

export default useAvailableFields;
