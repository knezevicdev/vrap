import { displayCurrency, parsedDateTime } from '../Utils';

describe('InitialPrice Utils Tests', () => {
  describe('displayCurrency', () => {
    it('should return a formatted currency value', () => {
      expect(displayCurrency(500)).toBe('$500');
    });
  });
  describe('parsedDateTime', () => {
    it('should return a formatted easy to read date', () => {
      expect(parsedDateTime('2021-08-03T15:59:21.552Z')).toBe('August 3, 2021');
    });
  });
});
