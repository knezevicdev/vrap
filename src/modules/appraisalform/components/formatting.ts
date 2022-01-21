import { AsYouType } from 'libphonenumber-js';

export function numbersOnlyString(string: string, maxLength?: number): string {
  if (typeof string !== 'string') {
    return '';
  }

  const numbersOnly = string.replace(/\D/g, '');

  if (maxLength != null) {
    return numbersOnly.substring(0, maxLength);
  }

  return numbersOnly;
}

export function displayPhoneNumber(phoneNumber: string | number): string {
  if (typeof phoneNumber !== 'string') {
    return '';
  }
  const number = numbersOnlyString(phoneNumber);
  return number.length > 3 ? new AsYouType('US').input(number) : number;
}

export function numbersOnly(
  string: string,
  oldValue?: string,
  maxLength?: number
): string | number {
  if (typeof string !== 'string') {
    return '';
  }

  const numbers = parseInt(string.replace(/\D/g, ''));

  if (!isNaN(numbers)) {
    if (typeof maxLength !== 'number' || numbers <= maxLength) {
      return numbers;
    }

    return oldValue || '';
  }

  return '';
}

export function displayNumber(num: number): string {
  if (typeof num !== 'number') {
    return '';
  }

  return Math.round(num).toLocaleString();
}

export function formatLicensePlate(lpStr: string): string {
  const adjustedLicensePlate = lpStr.replace(/\s/g, '');

  return adjustedLicensePlate.toUpperCase();
}

export function displayZipCode(zipCode: string): string | null {
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

export function lettersAndNumbersOnly(
  string: string,
  maxLength: number | null = null
) {
  return acceptOnly(string, maxLength, /[^a-zA-Z0-9]/g);
}

function acceptOnly(string: string, maxLength: number | null, validExp: any) {
  if (typeof string !== 'string') {
    return '';
  }

  const validOnly = string.replace(validExp, '');

  if (maxLength != null) {
    return validOnly.substring(0, maxLength);
  }

  return validOnly;
}
