import { lang } from '../InvalidStateDialog.language';

describe('exact milage dialog language test', () => {
  test('test const', () => {
    expect(lang.title).toEqual('We apologize');
    expect(lang.desc).toEqual(
      'Sorry, we are not pricing or purchasing vehicles from your area at this time. We apologize for the inconvenience. Thanks for your interest.'
    );
    expect(lang.browseInventory).toEqual('Browse Inventory');
  });
});
