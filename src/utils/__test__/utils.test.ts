import * as Utils from '../index';

describe('test utils index ', () => {
  it('test numbers only string', () => {
    const resultWOString = Utils.numbersOnlyString(123, 1);
    const resultWString = Utils.numbersOnlyString('a1b2c', 2);
    const resultMaxNull = Utils.numbersOnlyString('a1b2c3', null);
    expect(resultWOString).toEqual('');
    expect(resultWString).toEqual('12');
    expect(resultMaxNull).toEqual('123');
  });

  it('test displayCurrency ', () => {
    expect(Utils.displayCurrency(undefined)).toEqual('$');
    expect(Utils.displayCurrency(123)).toEqual('$123');
  });

  it('test displayPhoneNumber ', () => {
    const resultWOString = Utils.displayPhoneNumber(5555555555);
    const resultWString = Utils.displayPhoneNumber('a1b2c');
    const result = Utils.displayPhoneNumber('a1b2c345678901');
    expect(resultWOString).toEqual('');
    expect(resultWString).toEqual('12');
    expect(result).toEqual('1 (234) 567-8901');
  });

  it('test hiddenString ', () => {
    const stringHidden = Utils.hiddenString(3);
    expect(stringHidden).toEqual('\u2022\u2022\u2022');
  });

  it('test displaySecureSSN', () => {
    expect(Utils.displaySecureSSN(undefined)).toEqual('');
    expect(Utils.displaySecureSSN('123')).toEqual('\u2022\u2022\u2022');
    expect(Utils.displaySecureSSN('1234')).toEqual('\u2022\u2022\u2022\u2022');
    expect(Utils.displaySecureSSN('12345')).toEqual(
      '\u2022\u2022\u2022-\u2022\u2022'
    );
    expect(Utils.displaySecureSSN('123456789')).toEqual(
      '\u2022\u2022\u2022-\u2022\u2022-6789'
    );
  });
  it('test displayNumber ', () => {
    const resultWString = Utils.displayNumber('123');
    const result = Utils.displayNumber(123);
    expect(resultWString).toEqual('');
    expect(result).toEqual('123');
  });

  it('test displayFirstTextUpper', () => {
    expect(Utils.displayFirstTextUpper(null)).toEqual('');
    expect(Utils.displayFirstTextUpper('hello')).toEqual('Hello');
  });

  it('test displayPaymentAccount ', () => {
    expect(Utils.displayPaymentAccount(3)).toEqual('XXX');
  });

  it('test displayAccountNumber ', () => {
    expect(Utils.displayAccountNumber(null)).toEqual('');
    expect(Utils.displayAccountNumber('123')).toEqual('123');
    expect(Utils.displayAccountNumber('123456789')).toEqual('XXXXX6789');
  });
});