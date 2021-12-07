import { validate } from 'vin-validator';

export const VROOM_VIN_SUBSTRING = '1VR00M004L';

export function getVinErrors(vin: string): string | null {
  if (!isValidVin(vin)) {
    return 'Please enter a valid vin';
  }
  return null;
}

export function isValidVin(vin: string): RegExpMatchArray | null {
  const northAmericanVin = /^[1-5]/;
  const vinPattern =
    /^(([a-hj-mp-z0-9]{9}[a-hj-mp-rtv-z0-9][a-hj-mp-z0-9]\d{6}|[a-hj-z0-9]{5,11}\d{5})|([A-HJ-NPR-Z\d]{8}[\dX][A-HJ-NPR-Z\d]{8}))$/gi;

  if (vin.match(northAmericanVin)) {
    return vin.length === 17 && validate(vin);
  } else {
    return vin.match(vinPattern);
  }
}
