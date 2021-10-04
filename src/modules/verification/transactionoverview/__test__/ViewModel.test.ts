import ViewModel from '../ViewModel';

import { getOfferDetails } from 'src/networking/__mocks__/request';
import * as Request from 'src/networking/request';
import store from 'src/store';

jest.mock('src/networking/request');

jest.mock('next/config', () => (): unknown => ({
  publicRuntimeConfig: {},
  serverRuntimeConfig: {},
}));

describe('Review component test', () => {
  const stores = new store();
  let viewModel: ViewModel;
  const spyRequest = jest.spyOn(Request, 'getOfferDetails');
  spyRequest.mockResolvedValue(getOfferDetails());

  beforeEach(() => {
    viewModel = new ViewModel(stores);
  });

  it('test readonly initial values', () => {
    expect(viewModel.title).toEqual('transaction summary');
  });

  it('test api call getOfferDetail', async () => {
    await viewModel.getOfferDetail('26300');
    const response = {
      make: 'NISSAN',
      model: 'Murano',
      price: 10854,
      trim: 'Utility 4D SV 2WD V6',
      year: 2016,
      miles: 999999,
    };

    expect(JSON.stringify(stores.offer.offerDetail)).toEqual(
      JSON.stringify(response)
    );
  });
});
