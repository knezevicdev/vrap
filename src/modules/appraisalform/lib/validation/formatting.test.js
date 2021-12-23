import {
  numbersOnly,
  numbersOnlyString,
  lettersOnly,
  lettersAndNumbersOnly,
  lettersNumbersHyphensOnly,
  formatZipCode,
  formatSSN,
  formatLicensePlate
} from '@app/lib/validation/formatting';

describe('formatting', () => {
  it('should format numbers only', () => {
    expect(numbersOnly('123')).toBe(123);
    expect(numbersOnly(123)).toBe('');
    expect(numbersOnly('123', '456')).toBe(123);
    expect(numbersOnly('123', 456, 789)).toBe(123);
    expect(numbersOnly('123', 456, 122)).toBe(456);
  });
  it('should format numbers only from a string', () => {
    expect(numbersOnlyString('123')).toBe('123');
    expect(numbersOnlyString(123)).toBe('');
    expect(numbersOnlyString('123', '456')).toBe('123');
    expect(numbersOnlyString('123', 4)).toBe('123');
    expect(numbersOnlyString('123', 2)).toBe('12');
  });
  it('should format letters only', () => {
    expect(lettersOnly('123!@#')).toBe('');
    expect(lettersOnly(123)).toBe('');
    expect(lettersOnly('abc', '2')).toBe('ab');
    expect(lettersOnly('abc', '4')).toBe('abc');
    expect(lettersOnly('abc123!@#')).toBe('abc');
  });
  it('should format letters and numbers only', () => {
    expect(lettersAndNumbersOnly('123')).toBe('123');
    expect(lettersAndNumbersOnly(123)).toBe('');
    expect(lettersAndNumbersOnly('a123', '2')).toBe('a1');
    expect(lettersAndNumbersOnly('abc123', '4')).toBe('abc1');
    expect(lettersAndNumbersOnly('abc123!@#')).toBe('abc123');
  });
  it('should format letters, numbers, and hyphens only', () => {
    expect(lettersNumbersHyphensOnly('12-')).toBe('12-');
    expect(lettersNumbersHyphensOnly(123)).toBe('');
    expect(lettersNumbersHyphensOnly('a123', '2')).toBe('a1');
    expect(lettersNumbersHyphensOnly('abc123', '4')).toBe('abc1');
    expect(lettersNumbersHyphensOnly('abc123!-#')).toBe('abc123-');
  });
  it('should format zip code', () => {
    expect(formatZipCode('12345abc')).toBe('12345');
  });
  it('should format SSN', () => {
    expect(formatSSN('123-45-6789')).toBe('123456789');
  });
  it('should format License Plate', () => {
    expect(formatLicensePlate('fdas 123')).toBe('FDAS123');
  });
});
