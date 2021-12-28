import { validate } from 'vin-validator';

import { getDecryptedValue } from '../credit/creditLib.js';
import { getVehicleAttribute } from '../vehicle/vehicleModel';
import { numbersOnlyString } from './formatting';
import { coApplicantPrefix } from './validationReactMixins';
const SSN_FIELD = 'ssn';

const daysInMonth = {
  1: 31,
  2: 28,
  3: 31,
  4: 30,
  5: 31,
  6: 30,
  7: 31,
  8: 31,
  9: 30,
  10: 31,
  11: 30,
  12: 31,
};

// returns true if string is a number of length <length>
function isNumberOfLength(/* String */ string, length) {
  if (typeof string !== 'string') {
    return false;
  }

  if (string.replace(/\D/g, '').length !== length) {
    return false;
  }

  return true;
}

export function isValidName(str = '') {
  const re = /^[a-zA-ZàâäôéèëêïîçùûüÿæœÀÂÄÔÉÈËÊÏÎŸÇÙÛÜÆŒäöüßÄÖÜẞąćęłńóśźżĄĆĘŁŃÓŚŹŻàèéìíîòóùúÀÈÉÌÍÎÒÓÙÚáéíñóúüÁÉÍÑÓÚÜ \-']+$/;
  if (!str || !re.test(str)) {
    return false;
  } else {
    return true;
  }
}

export function isValidBank(str = '') {
  const re = /^[a-zA-ZàâäôéèëêïîçùûüÿæœÀÂÄÔÉÈËÊÏÎŸÇÙÛÜÆŒäöüßÄÖÜẞąćęłńóśźżĄĆĘŁŃÓŚŹŻàèéìíîòóùúÀÈÉÌÍÎÒÓÙÚáéíñóúüÁÉÍÑÓÚÜ \-'&()]+$/;
  if (!str || !re.test(str)) {
    return false;
  } else {
    return true;
  }
}

export function isValidStreetAddress(str = '') {
  const re = /\S+(?:\s+[0-9]*[A-z]+)/g;
  return re.test(str);
}

/** **** Validation (returns true/false) ******/

/**
 * validationFn should return true if valid
 */
export function getErrors(value, validationFn, msg) {
  if (!validationFn(value)) {
    return msg || 'Invalid value';
  }
  return null;
}

export function isValidEmail(email) {
  const re = /^[a-zA-Z0-9._+-]+@[a-zA-Z0-9]+([.-]?[a-zA-Z0-9]+)?([.]{1}[a-zA-Z]{2,4}){1,4}$/;
  return re.test(email);
}

const MIN_PASSWORD_LENGTH = 8;

export function securePasswordValidation(pwVal) {
  const lowercase = /^(?=.*[a-z]).+$/;
  const uppercase = /^(?=.*[A-Z]).+$/;
  const numbers = /^(?=.*[0-9]).+$/;
  return {
    isAtLength: pwVal.length >= MIN_PASSWORD_LENGTH,
    hasLowercase: lowercase.test(pwVal),
    hasUppercase: uppercase.test(pwVal),
    hasNumbers: numbers.test(pwVal),
  };
}

export function isValidPassword(password) {
  return password.length >= MIN_PASSWORD_LENGTH;
}

export function isValidPhoneNumber(/* String */ phoneNumber) {
  const zerosReg = /[1-9]/g;
  return isNumberOfLength(phoneNumber, 10) && zerosReg.test(phoneNumber);
}

export function isValidZipCode(/* Number */ zipCode) {
  if (zipCode == null) {
    return false;
  }

  const length = zipCode.toString().length;
  if (length !== 5) {
    return false;
  }
  return true;
}

export function isValidDate(month, day, year) {
  return (
    isValidYear(year) && isValidMonth(month) && isValidDay(year, month, day)
  );
}

export function isFutureDate(month, year) {
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth();
  return year > currentYear || (year === currentYear && month >= currentMonth);
}

export function isValidSSN(/* String */ ssn) {
  // Cannot start with 9, 000 or 666. Middle cannot be 00.  End cannot be 0000
  const regex = /^(?!(9))(?!(000))(?!(666))\d{3}-?(?!(00))\d{2}-?(?!(0000))\d{4}$/g;
  return regex.test(ssn);
  //  return true;
}

// ssn should be decrypted
export function getSSNErrors(/* String */ ssn, propsOrState = {}, field) {
  if (!isValidSSN(ssn)) {
    return 'Please enter a valid social security number';
  }

  // if applicant's SSN, then otherSSNField refers to co-applicants SSN (and vice versa)
  const otherSSNField =
    field === SSN_FIELD ? coApplicantPrefix + SSN_FIELD : SSN_FIELD;
  const otherSSNValue = getDecryptedValue(otherSSNField, propsOrState);

  if (
    otherSSNValue != null &&
    isValidSSN(otherSSNValue) &&
    ssn === otherSSNValue
  ) {
    return 'Applicant and Co-Applicant social security numbers cannot be the same';
  }
}

function isValidYear(year) {
  return year >= 1900 && year <= new Date().getFullYear();
}

function isValidMonth(month) {
  return month >= 1 && month <= 12;
}

function isValidDay(year, month, day) {
  const maxDays = daysInMonth[month];
  // leap year condition
  if (
    month === 2 &&
    day === 29 &&
    year % 4 === 0 &&
    (year % 100 !== 0 || year % 400 === 0)
  ) {
    return true;
  }
  return day >= 1 && day <= maxDays;
}

export function isOverEighteen(month, day, year) {
  const today = new Date();
  const eighteenthBirthday = new Date(year + 18, month - 1, day);
  return eighteenthBirthday <= today;
}

export function isValidReferenceNumber(referenceNumber) {
  return (
    referenceNumber &&
    referenceNumber.length >= 15 &&
    referenceNumber.length <= 20
  );
}

export function isValidLicense(license) {
  return license.length <= 8 && /^[0-9a-zA-Z-]+$/.test(license);
}

export function isValidVin(vin) {
  const northAmericanVin = /^[1-5]/;
  const vinPattern = /^(([a-hj-mp-z0-9]{9}[a-hj-mp-rtv-z0-9][a-hj-mp-z0-9]\d{6}|[a-hj-z0-9]{5,11}\d{5})|([A-HJ-NPR-Z\d]{8}[\dX][A-HJ-NPR-Z\d]{8}))$/gi;

  if (vin.match(northAmericanVin)) {
    return vin.length === 17 && validate(vin);
  } else {
    return vin.match(vinPattern);
  }
}

// Error Messages

export function getOptionalInputErrors(value, validationFn) {
  if (!validationFn || value == null || value === '') {
    return null;
    //return 'Please do something';
  }
  return validationFn(value);
}

export function getEmailErrors(email) {
  if (!isValidEmail(email)) {
    return 'Please enter a valid email address';
  }
  return null;
}

export function getPhoneNumberErrors(phoneNumber) {
  if (!isValidPhoneNumber(phoneNumber)) {
    return 'Please enter a valid phone number';
  }
  return null;
}

export function getCountryCodeError(countrycode) {
  if (countrycode === undefined) {
    return null;
  }
  if (countrycode.length === 0) {
    return 'Required';
  }
  return null;
}
export function getZipCodeErrors(zipCode) {
  if (!isValidZipCode(zipCode)) {
    return 'Please enter a valid zipCode';
  }
  return null;
}

export function getFourDigitSSNErrors(ssn) {
  const digitsOnly = /^\d+$/;

  if (ssn && (ssn.length !== 4 || !ssn.match(digitsOnly))) {
    return 'Please enter the last four digits of your SSN';
  }

  return null;
}

export function getOptionalPhoneNumberErrors(phoneNumber) {
  return getOptionalInputErrors(phoneNumber, getPhoneNumberErrors);
}

export function getNonEmptyErrors(value, msg) {
  if (value == null || value === '' || value === false) {
    return msg || 'Field cannot be empty';
  }
  return null;
}

// TODO: The logic below can be deprecated once the business is allowed to operate in MA
export function getStateError(value = '') {
  if (value === '') {
    return 'Please select a state';
  }

  if (value === 'MA') {
    return 'Please select a valid state';
  }

  return null;
}

export function getDownPaymentErrors(value, props = {}) {
  if (value == null || value === '' || value === false) {
    return 'Field cannot be empty';
  }

  const listingPrice = getVehicleAttribute(props.vehicle || {}, 'listingPrice');
  if (typeof listingPrice === 'number' && value > listingPrice) {
    return 'Down payment cannot be larger than the price';
  }

  return null;
}

export function getNumberErrors(
  value,
  msg,
  minValue = 0,
  maxValue = Number.MAX_VALUE
) {
  if (!isValidNumber(value, minValue, maxValue)) {
    return msg;
  }

  return null;
}

function isValidNumber(value, minValue, maxValue) {
  if (
    typeof value === 'number' &&
    value >= minValue &&
    value <= maxValue &&
    value !== Infinity
  ) {
    return true;
  }

  return false;
}

export function getOptionalNumberErrors(
  value,
  msg,
  minValue = 0,
  maxValue = Number.MAX_VALUE
) {
  if (value == null || value === '') {
    return null;
  } else if (isValidNumber(value, minValue, maxValue)) {
    return null;
  }

  return msg || 'Please enter valid number';
}

export function getBirthdayErrors(birthday) {
  if (birthday == null) {
    return 'Please enter a valid date';
  }

  const [month, day, year] = [
    parseInt(birthday.slice(0, 2)),
    parseInt(birthday.slice(2, 4)),
    parseInt(birthday.slice(4)),
  ];
  if (!isValidDate(month, day, year)) {
    return 'Please enter a valid date';
  } else if (!isOverEighteen(month, day, year)) {
    return 'You must be eighteen years or older';
  }
  return null;
}

export function getDepositAmountErrors(depositAmount) {
  if (parseInt(depositAmount) < 500) {
    return 'Minimum is $500';
  }
  return null;
}

export function getOtherAfterMarketErrors(value, props = {}) {
  const options = props.afterMarket;
  const optionsOther = options && options.includes('Other');

  if (
    optionsOther === true &&
    (value == null || value === '' || value === false)
  ) {
    return 'Field cannot be empty';
  }

  return null;
}

export function getLicenseErrors(license) {
  if (!isValidLicense(license)) {
    return 'Please enter a valid license plate number';
  }
  return null;
}

export function getVinErrors(vin) {
  if (!isValidVin(vin)) {
    return 'Please enter a valid vin';
  }
  return null;
}

export function isChecked(inputValue) {
  if (!inputValue) {
    return 'Must agree to terms';
  }
  return null;
}

export const isPhoneEmptyOrValid = (phone) => {
  const isEmpty = !phone || phone.length === 0;
  const isValid = isValidPhoneNumber(numbersOnlyString(phone));
  return isEmpty || isValid;
};

export const isCountryCodeEmpty = (countryCode) => {
  return countryCode.length === 0;
};
