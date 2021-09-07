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
  // return number.length > 3 ? new AsYouType('US').input(number) : number;
  return number;
};
