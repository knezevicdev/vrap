import * as selectors from './selectors';

describe('selectPhoneNumber', () => {
  it('should return an empty string when there is no common state', () => {
    const state = {
      /* common key is not in the state */
    };
    expect(selectors.selectPhoneNumber(state)).toEqual('');
  });
  it('should return an empty string when there is no phone number', () => {
    const state = {
      common: {
        /* phone number is not in the state */
      }
    };
    expect(selectors.selectPhoneNumber(state)).toEqual('');
  });
  it('should return a stored phone number', () => {
    const phoneNumber = 'anything';
    const state = {
      common: { phoneNumber }
    };
    expect(selectors.selectPhoneNumber(state)).toEqual(phoneNumber);
  });
});
