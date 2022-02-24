import * as Formattings from '../formatting';

describe('testing formatting in appraisalForm ', () => {
  it('test numbersOnlyString ', () => {
    const resultWOString = Formattings.numbersOnlyString(123, 1);
    const resultWString = Formattings.numbersOnlyString('a1b2c', 2);
    const resultMaxNull = Formattings.numbersOnlyString('a1b2c3', null);
    expect(resultWOString).toEqual('');
    expect(resultWString).toEqual('12');
    expect(resultMaxNull).toEqual('123');
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
    const resultWOString = Formattings.numbersOnly(5555555555);
    const resultMaxnumString = Formattings.numbersOnly(
      'a1b2c',
      '123456789',
      '9'
    );
    const result = Formattings.numbersOnly('a1b2c34567890', '123', 9);
    expect(resultWOString).toEqual('');
    expect(resultMaxnumString).toEqual(12);
    expect(result).toEqual('123');
  });

  it('test displayNumber ', () => {
    const resultWString = Formattings.displayNumber('123');
    const result = Formattings.displayNumber(123);
    expect(resultWString).toEqual('');
    expect(result).toEqual('123');
  });

  it('test formatLicensePlate ', () => {
    const result = Formattings.formatLicensePlate('abc123');
    expect(result).toEqual('ABC123');
  });

  it('test displayZipCode ', () => {
    const result = Formattings.displayZipCode(11111);
    const withDash = Formattings.displayZipCode('111111234');
    const zipcode = Formattings.displayZipCode('10021');
    expect(result).toEqual(null);
    expect(zipcode).toEqual('10021');
    expect(withDash).toEqual('11111-1234');
  });

  it('test lettersAndNumbersOnly ', () => {
    const result = Formattings.lettersAndNumbersOnly('abc12345', 7);
    const numberResult = Formattings.lettersAndNumbersOnly(111);
    const resultWOmax = Formattings.lettersAndNumbersOnly('abc12345');
    expect(result).toEqual('abc1234');
    expect(numberResult).toEqual('');
    expect(resultWOmax).toEqual('abc12345');
  });
});
