import { AsYouType } from 'libphonenumber-js';

export const numbersOnlyString = (
  string: string,
  maxLength?: number
): string => {
  if (typeof string !== 'string') {
    return '';
  }

  const numbersOnly = string.replace(/\D/g, '');

  if (maxLength != null) {
    return numbersOnly.substring(0, maxLength);
  }

  return numbersOnly;
};

export const displayCurrency = (num: number | undefined): string => {
  if (!num) {
    return '$';
  }
  return '$' + Math.round(num).toLocaleString();
};

export const displayPhoneNumber = (phoneNumber: string | undefined): string => {
  if (typeof phoneNumber !== 'string') {
    return '';
  }
  const number = numbersOnlyString(phoneNumber);
  return number.length > 3 ? new AsYouType('US').input(number) : number;
};

export const hiddenString = (length: number): string => {
  const dot = '\u2022';
  return new Array(length + 1).join(dot);
};

export const displaySecureSSN = (ssn: string | null | undefined): string => {
  if (typeof ssn !== 'string') {
    return '';
  }

  const ssnLength = ssn.length;
  if (ssnLength <= 3) {
    return hiddenString(ssn.length);
  } else if (ssnLength === 4) {
    return hiddenString(ssn.length);
  } else if (ssnLength <= 5) {
    return `${hiddenString(3)}-${hiddenString(ssn.slice(3).length)}`;
  } else {
    return `${hiddenString(3)}-${hiddenString(2)}-${ssn.slice(5, 9)}`;
  }
};
