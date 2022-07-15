import { lang } from '../InvalidStateDialog.language';

describe('exact milage dialog language test', () => {
  test('test const', () => {
    expect(lang.title).toEqual('Location not supported');
    expect(lang.desc('Arizona')).toEqual(
      'We are not purchasing vehicles from Arizona at this time, and are unable to provide a price for you.'
    );
    expect(lang.updateState).toEqual('Update Zip Code');
  });
});
