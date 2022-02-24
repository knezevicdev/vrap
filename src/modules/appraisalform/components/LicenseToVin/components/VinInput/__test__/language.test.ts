import * as lang from '../language';

describe('vin input language test', () => {
  test('test const', () => {
    expect(lang.buttonText).toEqual("WHAT'S MY CAR WORTH?");
    expect(lang.dataQa).toEqual('Submit');
  });
});
