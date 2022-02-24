import * as lang from '../language';

describe('license state input language test', () => {
  test('test const', () => {
    expect(lang.buttonText).toEqual("WHAT'S MY CAR WORTH?");
    expect(lang.licenseToVinErrorText).toEqual(
      'We could not identify the vehicle associated with this license plate. Please try again.'
    );
    expect(lang.dataQa).toEqual('Submit');
    expect(lang.genericLPError).toEqual(
      'Oops! Something went wrong. Please try to submit again.'
    );
  });
});
