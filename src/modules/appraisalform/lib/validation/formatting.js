const dot = '\u2022';

// take string from input box -> number in Redux store
// TODO: don't return ''
export function numbersOnly(string, oldValue, maxLength) {
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
  let adjustedNewStr = newStr.replace(/-/g, '');

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
  let adjustedLicensePlate = lpStr.replace(/\s/g, '');

  return adjustedLicensePlate.toUpperCase();
}
