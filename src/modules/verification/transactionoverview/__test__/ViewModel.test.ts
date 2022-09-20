import ViewModel from '../ViewModel';

import * as Request from 'src/networking/request';
import { getOfferDetails } from 'src/networking/request/__mocks__';
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

  beforeEach(() => {
    viewModel = new ViewModel(stores);
  });

  it('test readonly initial values', () => {
    expect(viewModel.title).toEqual('transaction summary');
  });

  it('test api call getOfferDetail', async () => {
    spyRequest.mockResolvedValue(getOfferDetails());
    await viewModel.getOfferDetail('26300');
    const response = {
      make: 'NISSAN',
      model: 'Murano',
      price: 10854,
      trim: 'Utility 4D SV 2WD V6',
      year: 2016,
      miles: 999999,
      offerExpiration: '2021-09-03T00:00:00Z',
      vin: '5N1AZ2MG9GN133457',
      id: 'cb5b06d43cb95286ceeb50efc7a82e08',
      offerId: 26300,
      offerStatus: 'Pending',
      email: 'doyouliketesting@testvroom.com',
    };

    expect(JSON.stringify(stores.offer.offerDetail)).toEqual(
      JSON.stringify(response)
    );
  });

  it('test api call failed ', async () => {
    spyRequest.mockRejectedValue(getOfferDetails());
    await viewModel.getOfferDetail('26400');
    const response = {
      make: '',
      model: '',
      price: 0,
      trim: '',
      year: 0,
      miles: 0,
      offerExpiration: '',
      vin: '',
      id: '',
      offerId: 0,
      offerStatus: '',
      email: '',
    };

    expect(JSON.stringify(stores.offer.offerDetail)).toEqual(
      JSON.stringify(response)
    );
  });
});
