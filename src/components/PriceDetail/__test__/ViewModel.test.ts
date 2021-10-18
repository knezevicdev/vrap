import ViewModel from '../ViewModel';

import { StoreStatus } from 'src/interfaces.d';
import { PriceStore } from 'src/modules/price/store';

jest.mock('next/config', () => (): unknown => ({
  publicRuntimeConfig: {},
  serverRuntimeConfig: {},
}));
describe('PayOptions Test', () => {
  const priceId = '123';
  const pStore = new PriceStore(priceId);
  const viewModel = new ViewModel(pStore);

  it('get status', () => {
    expect(viewModel.status).toEqual(StoreStatus.Initial);
  });

  it('get automated', () => {
    expect(viewModel.automated).toEqual(false);
  });
});
