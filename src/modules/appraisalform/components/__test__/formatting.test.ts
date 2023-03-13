import * as Formattings from '../formatting';

describe('testing formatting in appraisalForm ', () => {
  it('test numbersOnlyString ', () => {
    const resultWString = Formattings.numbersOnlyString('a1b2c', 2);
    expect(resultWString).toEqual('12');
  });

  it('test displayPhoneNumber ', () => {
    const resultWOString = Formattings.displayPhoneNumber(5555555555);
    const resultWString = Formattings.displayPhoneNumber('a1b2c');
    const result = Formattings.displayPhoneNumber('a1b2c345678901');
    expect(resultWOString).toEqual('');
    expect(resultWString).toEqual('12');
    expect(result).toEqual('1 (234) 567-8901');
  });

  it('test numbersOnly ', () => {
    const result = Formattings.numbersOnly('a1b2c34567890', '123', 9);
    expect(result).toEqual('123');
  });

  it('test displayNumber ', () => {
    const result = Formattings.displayNumber(123);
    expect(result).toEqual('123');
  });

  it('test formatLicensePlate ', () => {
    const result = Formattings.formatLicensePlate('abc123');
    expect(result).toEqual('ABC123');
  });

  it('test displayZipCode ', () => {
    const withDash = Formattings.displayZipCode('111111234');
    const zipcode = Formattings.displayZipCode('10021');
    expect(zipcode).toEqual('10021');
    expect(withDash).toEqual('11111-1234');
  });

  it('test lettersAndNumbersOnly ', () => {
    const result = Formattings.lettersAndNumbersOnly('abc12345', 7);
    const resultWOmax = Formattings.lettersAndNumbersOnly('abc12345');
    expect(result).toEqual('abc1234');
    expect(resultWOmax).toEqual('abc12345');
  });
});
