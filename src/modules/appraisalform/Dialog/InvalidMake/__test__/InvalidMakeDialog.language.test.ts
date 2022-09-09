import { lang } from '../InvalidMakeDialog.language';

describe('exact milage dialog language test', () => {
  test('test const', () => {
    expect(lang.title).toEqual('Make not supported');
    expect(lang.desc).toEqual(
      'Sorry, we are not purchasing Maserati vehicles at this time, and are unable to provide a price for you.'
    );
    expect(lang.browseInventory).toEqual('Browse Inventory');
  });
});
