import store from '../../../store';
import ViewModel from '../transactionoverview/ViewModel';

jest.mock('src/networking/request');

describe('Review component test', () => {
  const stores = new store();
  let viewModel: ViewModel;

  beforeEach(() => {
    viewModel = new ViewModel(stores);
  });

  it('test readonly initial values', () => {
    expect(viewModel.title).toEqual('transaction summary');
  });

  it('test api call getOfferDetail', () => {
    viewModel.getOfferDetail('26300');
    const response = {
      make: 'NISSAN',
      model: 'Murano',
      price: 10854,
      trim: 'Utility 4D SV 2WD V6',
      year: 2016,
      miles: 99999,
    };
    expect(JSON.stringify(stores.offer.getOfferDetail)).toEqual(
      JSON.stringify(response)
    );
  });
});
