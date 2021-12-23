import { hiddenString } from 'src/modules/appraisalform/components/Input/inputUtils';
import { AsYouType } from 'libphonenumber-js';
import { numbersOnlyString } from '@app/lib/validation/formatting';
import moment from 'moment';

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

  const numbersOnly = zipCode
    .toString()
    .replace(/\D+/gi, '')
    .substring(0, 9);
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
