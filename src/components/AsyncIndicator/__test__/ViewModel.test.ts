jest.mock('src/networking/request');
import ViewModel from '../ViewModel';

import { AsyncStatus } from 'src/interfaces.d';
import { PriceStore } from 'src/modules/price/store';

describe('AsyncIndicator Test', () => {
  const priceId = '12345';
  const store = new PriceStore(priceId);
  const viewModel = new ViewModel(store);

  afterEach(() => {
    localStorage.removeItem('priceId');
  });

  it('get isFetching', () => {
    store.asyncStatus = AsyncStatus.Idle;
    expect(viewModel.isFetching).toBe(false);
    store.asyncStatus = AsyncStatus.Fetching;
    expect(viewModel.isFetching).toBe(true);
  });
});
