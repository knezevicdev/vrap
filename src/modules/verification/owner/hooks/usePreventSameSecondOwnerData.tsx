import { useCallback, useEffect, useRef } from 'react';

import { FormField } from '../../../appraisalform/components/componentInterfaces.d';
import {
  isValidEmail,
  isValidPhoneNumber,
} from '../../../appraisalform/components/validation';

export const usePreventSameSecondOwnerData = (
  fields: Record<string, FormField>
): void => {
  const { secondEmail, email, secondPhone, phone } = fields;
  const previousEmail = useRef<string>();
  const previousPhone = useRef<string>();
  const previousSecondEmail = useRef<string>();
  const previousSecondPhone = useRef<string>();

  const sameFieldError = (type: string) =>
    `Please provide a unique ${type} for 2nd owner`;

  const setFieldError = useCallback((field: FormField, type: string) => {
    field.onChange({
      ...field,
      error: true,
      errorMessage: sameFieldError(type),
    });
  }, []);

  const clearFieldError = (field: FormField, type: string) => {
    field.onChange({
      ...field,
      error:
        type === 'email'
          ? !isValidEmail(field.value)
          : !isValidPhoneNumber(field.value),
      errorMessage: undefined,
    });
  };

  const toggleFieldError = useCallback(
    (field: FormField, secondField: FormField, type: string) => {
      if (
        field.value &&
        secondField.value &&
        secondField.value.toLowerCase() === field.value.toLowerCase()
      ) {
        setFieldError(secondField, type);
      } else if (
        secondField.error &&
        secondField.errorMessage === sameFieldError(type)
      ) {
        clearFieldError(secondField, type);
      }
    },
    [setFieldError]
  );

  useEffect(() => {
    if (previousSecondEmail.current !== secondEmail.value) {
      previousSecondEmail.current = secondEmail.value;
      toggleFieldError(email, secondEmail, 'email');
    }
  }, [email, secondEmail, secondEmail.value, toggleFieldError]);

  useEffect(() => {
    if (previousSecondPhone.current !== secondPhone.value) {
      previousSecondPhone.current = secondPhone.value;
      toggleFieldError(phone, secondPhone, 'phone');
    }
  }, [phone, secondPhone, secondPhone.value, toggleFieldError]);

  useEffect(() => {
    if (previousEmail.current !== email.value) {
      previousEmail.current = email.value;
      toggleFieldError(email, secondEmail, 'email');
    }
  }, [email, email.value, secondEmail, toggleFieldError]);

  useEffect(() => {
    if (previousPhone.current !== phone.value) {
      previousPhone.current = phone.value;
      toggleFieldError(phone, secondPhone, 'phone');
    }
  }, [phone, phone.value, secondPhone, toggleFieldError]);
};
