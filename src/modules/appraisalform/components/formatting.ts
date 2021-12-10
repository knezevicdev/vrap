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
