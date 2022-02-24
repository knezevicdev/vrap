import * as Validation from '../validation';

describe('testing validation ', () => {
  it('test const ', () => {
    expect(Validation.VROOM_VIN_SUBSTRING).toEqual('1VR00M004L');
  });

  it('test getVinErrors', () => {
    const inValidVin = Validation.getVinErrors('12');
    expect(inValidVin).toEqual('Please enter a valid vin');
    const validVin = Validation.getVinErrors('5N1AZ2MG9GN133457');
    expect(validVin).toEqual(null);
  });

  it('test isValidCSLicense', () => {
    const inValidLicense = Validation.isValidCSLicense('123AABBCCDD');
    expect(inValidLicense).toEqual(false);
    const validLicense = Validation.isValidCSLicense('AC-1234');
    expect(validLicense).toEqual(true);
  });

  it('test isValidPhoneNumber ', () => {
    const numberPhone = Validation.isValidPhoneNumber(12345);
    expect(numberPhone).toEqual(false);
    const longPhoneNum = Validation.isValidPhoneNumber('1234598766521');
    expect(longPhoneNum).toEqual(false);
    const shartPhoneNum = Validation.isValidPhoneNumber('121');
    expect(shartPhoneNum).toEqual(false);
    const result = Validation.isValidPhoneNumber('2125557777');
    expect(result).toEqual(true);
  });

  it('test valid email', () => {
    const inValidEmail = Validation.isValidEmail('email@');
    expect(inValidEmail).toEqual(false);

    const validEmail = Validation.isValidEmail('test@test.com');
    expect(validEmail).toEqual(true);
  });

  it('test isValiidName ', () => {
    const inValiName = Validation.isValidName('');
    expect(inValiName).toEqual(false);

    const validName = Validation.isValidName('fname lname');
    expect(validName).toEqual(true);
  });

  it('test isValidLicense ', () => {
    const inValidLicnese = Validation.isValidLicense('1223456789');
    expect(inValidLicnese).toEqual(false);

    const validLicense = Validation.isValidLicense('VALID777');
    expect(validLicense).toEqual(true);
  });

  it('test getLicenseErrors ', () => {
    const inValidLicnese = Validation.getLicenseErrors('1223456789');
    expect(inValidLicnese).toEqual('Please enter a valid license plate number');

    const validLicense = Validation.getLicenseErrors('VALID777');
    expect(validLicense).toEqual(null);
  });

  it('test isValidZipCode ', () => {
    const inValidZip = Validation.isValidZipCode(123);
    expect(inValidZip).toEqual(false);

    const inValidZipWithNull = Validation.isValidZipCode(null);
    expect(inValidZip).toEqual(false);

    const validZip = Validation.isValidZipCode(11101);
    expect(validZip).toEqual(true);
  });
});
