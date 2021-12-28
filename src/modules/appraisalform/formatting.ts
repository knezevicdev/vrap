/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
const dot = '\u2022';

// take string from input box -> number in Redux store
// TODO: don't return ''
export function numbersOnly(string: any, oldValue: any, maxLength: any) {
  if (typeof string !== 'string') {
    return '';
  }

  const numbers = parseInt(string.replace(/\D/g, ''));

  if (!isNaN(numbers)) {
    if (typeof maxLength !== 'number' || numbers <= maxLength) {
      return numbers;
    }

    return oldValue;
  }

  return '';
}

export function decimalNumbersOnly(string, returnNumber) {
  if (typeof string !== 'string' || string === '') {
    return '';
  }
  const numbers = string.replace(/(?!-)[^0-9.]/g, '');

  if (returnNumber) {
    return parseFloat(numbers);
  }
  return numbers;
}
// only numbers, but returns string
export function numbersOnlyString(string, maxLength) {
  if (typeof string !== 'string') {
    return '';
  }

  const numbersOnly = string.replace(/\D/g, '');

  if (maxLength != null) {
    return numbersOnly.substring(0, maxLength);
  }

  return numbersOnly;
}

function acceptOnly(string, maxLength, validExp) {
  if (typeof string !== 'string') {
    return '';
  }

  const validOnly = string.replace(validExp, '');

  if (maxLength != null) {
    return validOnly.substring(0, maxLength);
  }

  return validOnly;
}

export function lettersOnly(string, maxLength) {
  return acceptOnly(string, maxLength, /[^a-zA-Z]/g);
}

export function lettersAndNumbersOnly(string, maxLength) {
  return acceptOnly(string, maxLength, /[^a-zA-Z0-9]/g);
}

export function lettersNumbersHyphensOnly(string, maxLength) {
  return acceptOnly(string, maxLength, /[^0-9A-Za-z-]/g);
}

export function formatZipCode(zipCode) {
  return numbersOnlyString(zipCode).slice(0, 9);
}

/**
 * newStr = what's now in the input box (will have dashes and bullets)
 * oldSSN = previous prop value (number, no dashes or bullets)
 */
export function formatSSN(newStr, oldSSN = '') {
  const adjustedNewStr = newStr.replace(/-/g, '');

  if (
    adjustedNewStr.replace(/\u2022/g, '0').replace(/\D/g, '').length !==
    adjustedNewStr.length
  ) {
    return typeof oldSSN === 'string' ? numbersOnly(oldSSN).toString() : null;
  }

  let ssn = '';

  for (let i = 0; i < adjustedNewStr.length; i++) {
    if (adjustedNewStr[i] === dot) {
      ssn += oldSSN[i];
    } else {
      ssn += adjustedNewStr[i];
    }
  }
  return ssn.slice(0, 9);
}

export function formatLicensePlate(lpStr) {
  const adjustedLicensePlate = lpStr.replace(/\s/g, '');

  return adjustedLicensePlate.toUpperCase();
}

import { AsYouType } from 'libphonenumber-js';
import moment from 'moment';

import { hiddenString } from './components/Input/inputUtils';
import { numbersOnlyString } from './lib/validation/formatting';

// Formatting input boxes onChange. Returns string

export function displayCurrency(/* Number */ num) {
  if (typeof num !== 'number') {
    return '';
  }

  return '$' + Math.round(num).toLocaleString();
}

export function displayDecimalCurrency(string) {
  if (string === '') {
    return '';
  }

  return '$' + string;
}

export function displayPhoneNumber(phoneNumber) {
  if (typeof phoneNumber !== 'string') {
    return '';
  }
  const number = numbersOnlyString(phoneNumber);
  return number.length > 3 ? new AsYouType('US').input(number) : number;
}

export function displayBirthday(birthday) {
  if (typeof birthday !== 'string') {
    return null;
  }

  const numbersOnly = birthday.replace(/\D+/gi, '').substring(0, 8);
  let formattedNumber = numbersOnly;

  if (numbersOnly.length > 4) {
    formattedNumber =
      numbersOnly.slice(0, 2) +
      '/' +
      numbersOnly.slice(2, 4) +
      '/' +
      numbersOnly.slice(4);
  } else if (numbersOnly.length > 2) {
    formattedNumber = numbersOnly.slice(0, 2) + '/' + numbersOnly.slice(2, 4);
  }

  return formattedNumber;
}

export function displayZipCode(zipCode) {
  if (typeof zipCode !== 'string') {
    return null;
  }

  const numbersOnly = zipCode.toString().replace(/\D+/gi, '').substring(0, 9);
  let formattedNumber = numbersOnly;

  if (numbersOnly.length > 5) {
    formattedNumber = numbersOnly.slice(0, 5) + '-' + numbersOnly.slice(5);
  }

  return formattedNumber;
}

export function displaySSN(/* String */ ssn) {
  if (typeof ssn !== 'string') {
    return '';
  }
  ssn = ssn.replace(/\D+/gi, '');
  const ssnLength = ssn.length;
  if (ssnLength <= 3) {
    return ssn;
  } else if (ssnLength <= 5) {
    return `${ssn.slice(0, 3)}-${ssn.slice(3)}`;
  } else {
    return `${ssn.slice(0, 3)}-${ssn.slice(3, 5)}-${ssn.slice(5, 9)}`;
  }
}

export function displaySecureSSN(/* String */ ssn) {
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
}

export function displayNumber(/* Number */ num) {
  if (typeof num !== 'number') {
    return '';
  }

  return Math.round(num).toLocaleString();
}

// Input:
// 2020-04-27 23:14:24.814702 +0000 +0000

// Output:
// June 6th, 1992
export function displayDate(/* String */ date) {
  const momentDate = moment(date);
  return momentDate.format('MMMM Do YYYY');
}
