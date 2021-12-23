import {
  getFourDigitSSNErrors,
  isValidPassword,
  securePasswordValidation,
  isValidStreetAddress,
  isValidPhoneNumber,
  getCountryCodeError,
  isValidSSN
} from '@app/lib/validation/validation';

describe('validation', () => {
  test("should validate the last four digits of a user's SSN", () => {
    expect(getFourDigitSSNErrors('')).toBeNull();
    expect(getFourDigitSSNErrors('1234')).toBeNull();

    const ERROR_MESSAGE = 'Please enter the last four digits of your SSN';

    expect(getFourDigitSSNErrors('12')).toBe(ERROR_MESSAGE);
    expect(getFourDigitSSNErrors('12456')).toBe(ERROR_MESSAGE);
    expect(getFourDigitSSNErrors('fff')).toBe(ERROR_MESSAGE);
  });
});

describe('securePasswordValidation', () => {
  it('should set isAtLength to true when string is a min of 8 char', () => {
    let validity = securePasswordValidation('12345678');
    expect(validity.isAtLength).toBe(true);

    validity = securePasswordValidation('1234567');
    expect(validity.isAtLength).toBe(false);
  });

  it('should set hasLowercase to true when string has at least 1 lowercase char', () => {
    let validity = securePasswordValidation('asdf');
    expect(validity.hasLowercase).toBe(true);

    validity = securePasswordValidation('GHTY');
    expect(validity.hasLowercase).toBe(false);
  });

  it('should set hasUppercase to true when string has at least 1 uppercase char', () => {
    let validity = securePasswordValidation('GHTY');
    expect(validity.hasUppercase).toBe(true);

    validity = securePasswordValidation('asdf');
    expect(validity.hasUppercase).toBe(false);
  });

  it('should set hasNumbers to true when string has at least 1 number or symbol char', () => {
    let validity = securePasswordValidation('as1');
    expect(validity.hasNumbers).toBe(true);

    validity = securePasswordValidation('as@');
    expect(validity.hasNumbers).toBe(false);

    validity = securePasswordValidation('asdf');
    expect(validity.hasNumbers).toBe(false);
  });
});

describe('isValidPassword', () => {
  it('should set isAtLength to true when string is a min of 8 char', () => {
    let result = isValidPassword('12345678');
    expect(result).toBe(true);

    result = isValidPassword('1234567');
    expect(result).toBe(false);
  });
});

describe('isValidPhoneNumber', () => {
  it('should return true if phone number lenght is 10 orr 11', () => {
    let result = isValidPhoneNumber('1234567890');
    expect(result).toBe(true);

    result = isValidPhoneNumber('12345678901');
    expect(result).toBe(true);

    result = isValidPhoneNumber('123456');
    expect(result).toBe(false);
  });
});

describe('getCountryCodeError', () => {
  it('should return error if country code length is 0', () => {
    let result = getCountryCodeError('+1');
    expect(result).toBe(null);

    result = getCountryCodeError('+44');
    expect(result).toBe(null);

    result = getCountryCodeError('');
    expect(result).toBe('Required');
  });
});

describe('isValidStreetAddress', () => {
  it('should return true when two word street address', () => {
    let result = isValidStreetAddress('123 street st');
    expect(result).toBe(true);
  });

  it('should return true when one word street address', () => {
    let result = isValidStreetAddress('123 street');
    expect(result).toBe(true);
  });

  it('should return false when street address is invalid', () => {
    let result = isValidStreetAddress('1234');
    expect(result).toBe(false);
  });

  it('should return false when street address is only numbers', () => {
    let result = isValidStreetAddress('1234 1234');
    expect(result).toBe(false);
  });
});

describe('isValidSsn', () => {
  it('should return true when ssn is valid', () => {
    let result = isValidSSN('123-12-1234');
    expect(result).toBe(true);
  });

  it('should return false when ssn is invalid', () => {
    let result = isValidSSN('123-12-123');
    expect(result).toBe(false);
  });

  it('should return false when ssn is empty', () => {
    let result = isValidSSN('');
    expect(result).toBe(false);
  });
});
