import { buildPrice } from './buildPrice';

describe('Build Price Test', () => {
  describe('Format number to US currency format', () => {
    it('should return the formatted currency - Not rounded', () => {
      const number = 10002423423.234234;
      const actual = buildPrice(number);
      const expected = `$10,002,423,423.23`;
      expect(actual).toEqual(expected);
    });

    it('should return the formatted currency - Rounded', () => {
      const number = 10002423423.239234;
      const actual = buildPrice(number);
      const expected = `$10,002,423,423.24`;
      expect(actual).toEqual(expected);
    });
  });

  describe('Format when there is no number', () => {
    const number = undefined;
    it('should return the formatted currency', () => {
      const actual = buildPrice(number);
      const expected = `-`;
      expect(actual).toEqual(expected);
    });
  });
});
