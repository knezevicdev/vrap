import { lang } from '../OfferExpiredDialog.language';

describe('exact milage dialog language test', () => {
  test('test const', () => {
    expect(lang.yourPriceHasExpired).toEqual('your price has expired');
    expect(lang.noNeedToWorry).toEqual(
      'No need to worry! You can always get an updated price by clicking the link below.'
    );
    expect(lang.getUpdatedPrice).toEqual('get updated price');
  });
});
