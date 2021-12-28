import { getOptions } from '@app/lib/utils/selectUtils';

describe('getOptions()', () => {
  it('should return 50 states when getting states', () => {
    const stateOptions = getOptions('state');
    expect(stateOptions.length).toBe(52);
  });
  it('should return 11 employment options and default placeholder', () => {
    const employmentOptions = getOptions('employmentStatus');
    expect(employmentOptions.length).toBe(12);
  });
  it('should return 8 previous employment options and default placeholder', () => {
    const employmentOptions = getOptions('prevEmploymentStatus');
    expect(employmentOptions.length).toBe(9);
  });
  it('should return 7 retired previous employment options and default placeholder', () => {
    const employmentOptions = getOptions('retiredEmploymentStatus');
    expect(employmentOptions.length).toBe(8);
  });
  it('should return 16 secondary income options and default placeholder', () => {
    const employmentOptions = getOptions('secondaryIncome');
    expect(employmentOptions.length).toBe(17);
  });
});
