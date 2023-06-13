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

export function isValidVin(vin: string): boolean {
  return /^[A-HJ-NPR-Z\d]{8}[\dXZ][A-HJ-NPR-Z\d]{3}\d{5}$/g.test(vin);
}

export function isValidCSLicense(license: string) {
  return /^[A-Z]{2}-.{1,9}$/.test(license);
}

export function isValidPhoneNumber(phoneNumber: string): boolean {
  const zerosReg = /[1-9]/g;
  return isNumberOfLength(phoneNumber, 10) && zerosReg.test(phoneNumber);
}

export function isValidEmail(email: string): boolean {
  const re =
    /^[a-zA-Z0-9._+-]+@[a-zA-Z0-9]+([.-]?[a-zA-Z0-9]+)?([.]{1}[a-zA-Z]{2,4}){1,4}$/;
  return re.test(email);
}

export function isValidName(str = ''): boolean {
  const re =
    /^[a-zA-ZàâäôéèëêïîçùûüÿæœÀÂÄÔÉÈËÊÏÎŸÇÙÛÜÆŒäöüßÄÖÜẞąćęłńóśźżĄĆĘŁŃÓŚŹŻàèéìíîòóùúÀÈÉÌÍÎÒÓÙÚáéíñóúüÁÉÍÑÓÚÜ \-']+$/;
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
  return !!zipCode && /^\d{5}$/.test(zipCode.toString());
}

export function validateZipCode(
  isTradeIn: boolean,
  zipCode: string,
  restrictedZipCodes: { zipCode: string }[],
  restrictedStates: {
    state: string;
    zipCodeMin: number;
    zipCodeMax: number;
  }[]
): boolean {
  const zipcode = parseInt(zipCode, 10);

  if (isTradeIn)
    return !restrictedZipCodes.find(
      (restrictedZipCode) => restrictedZipCode.zipCode === zipCode
    );

  return !(
    Boolean(
      restrictedStates.find(
        (restrictedState) =>
          restrictedState.zipCodeMin <= zipcode &&
          restrictedState.zipCodeMax >= zipcode
      )
    ) ||
    Boolean(
      restrictedZipCodes.find(
        (restrictedZipCode) => restrictedZipCode.zipCode === zipCode
      )
    )
  );
}
