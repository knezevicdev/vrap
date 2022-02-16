import { OfferStore } from '../offerStore';

describe('test offer store', () => {
  let store: OfferStore;
  beforeEach(() => {
    store = new OfferStore();
  });

  test('change store loading value ', () => {
    store.setLoading(false);
    expect(store.loading).toEqual(false);
  });

  test('test change getOfferDetail', () => {
    const mockOfferModel = {
      make: 'NISSAN',
      miles: 999999,
      model: 'Murano',
      trim: 'Utility 4D SV 2WD V6',
      year: 2016,
      price: 7000,
    };
    store.getOfferDetail(mockOfferModel);
    expect(store.offerDetail).toEqual(mockOfferModel);
  });
});
