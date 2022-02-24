import { lang } from '../ExactMilageDialog.language';

describe('exact milage dialog language test', () => {
  test('test const', () => {
    expect(lang.titleAreYouSure).toEqual(
      'are you sure your mileage is correct?'
    );
    expect(lang.descBeforeMiles).toEqual('The mileage of');
    expect(lang.descAfterMiles).toEqual(
      'you entered is lower than our partner’s records indicate. Please check to see if the mileage you entered is correct.'
    );
    expect(lang.strictDescAfterMiles).toEqual(
      "you entered is lower than our partner’s records indicate. If you're sure your mileage is correct, please get in touch with Carfax to correct this discrepancy."
    );
    expect(lang.mileageIsCorrect).toEqual('My mileage is correct');
    expect(lang.updateMileage).toEqual('Update Mileage');
  });
});
