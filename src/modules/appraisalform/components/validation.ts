import { validate } from 'vin-validator';

export const VROOM_VIN_SUBSTRING = '1VR00M004L';

function isNumberOfLength(string: string, length: number) {
  if (typeof string !== 'string') {
    return false;
  }

  if (string.replace(/\D/g, '').length !== length) {
    return false;
  }

  return true;
}

export function getVinErrors(vin: string): string | null {
  if (!isValidVin(vin)) {
    return 'Please enter a valid vin';
  }
  return null;
}

export function isValidVin(vin: string): RegExpMatchArray | null {
  const northAmericanVin = /^[1-5]/;
  const vinPattern = /^(([a-hj-mp-z0-9]{9}[a-hj-mp-rtv-z0-9][a-hj-mp-z0-9]\d{6}|[a-hj-z0-9]{5,11}\d{5})|([A-HJ-NPR-Z\d]{8}[\dX][A-HJ-NPR-Z\d]{8}))$/gi;

  if (vin.match(northAmericanVin)) {
    return vin.length === 17 && validate(vin);
  } else {
    return vin.match(vinPattern);
  }
}

export function isValidCSLicense(license: string) {
  return /^[A-Z]{2}-.{1,9}$/.test(license);
}

export function isValidPhoneNumber(phoneNumber: string): boolean {
  const zerosReg = /[1-9]/g;
  return isNumberOfLength(phoneNumber, 10) && zerosReg.test(phoneNumber);
}

export function isValidEmail(email: string): boolean {
  const re = /^[a-zA-Z0-9._+-]+@[a-zA-Z0-9]+([.-]?[a-zA-Z0-9]+)?([.]{1}[a-zA-Z]{2,4}){1,4}$/;
  return re.test(email);
}

export function isValidName(str = ''): boolean {
  const re = /^[a-zA-ZàâäôéèëêïîçùûüÿæœÀÂÄÔÉÈËÊÏÎŸÇÙÛÜÆŒäöüßÄÖÜẞąćęłńóśźżĄĆĘŁŃÓŚŹŻàèéìíîòóùúÀÈÉÌÍÎÒÓÙÚáéíñóúüÁÉÍÑÓÚÜ \-']+$/;
  if (!str || !re.test(str)) {
    return false;
  } else {
    return true;
  }
}

export function isValidLicense(license: string): boolean {
  return license.length <= 8 && /^[0-9a-zA-Z-]+$/.test(license);
}

export function getLicenseErrors(license: string): string | null {
  if (!isValidLicense(license)) {
    return 'Please enter a valid license plate number';
  }
  return null;
}

export function isValidZipCode(zipCode: number): boolean {
  if (zipCode == null) {
    return false;
  }

  const length = zipCode.toString().length;
  if (length !== 5) {
    return false;
  }
  return true;
}

export function getStateFromZip(zipCode: string): string {
  const zipcode = parseInt(zipCode, 10);

  if (zipcode >= 83200 && zipcode <= 83999) {
    return 'Idaho';
  } else if (zipcode >= 59000 && zipcode <= 59999) {
    return 'Montana';
  } else if (zipcode >= 58000 && zipcode <= 58999) {
    return 'North Dakota';
  } else if (zipcode >= 57000 && zipcode <= 57999) {
    return 'South Dakota';
  } else if (zipcode >= 82000 && zipcode <= 83199) {
    return 'Wyoming';
  }

  return '';
}
