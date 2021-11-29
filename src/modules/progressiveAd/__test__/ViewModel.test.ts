import { PriceStore } from '../../price/store';
import ViewModel from '../ViewModel';

import { StoreStatus } from 'src/interfaces.d';

jest.mock('next/config', () => (): unknown => ({
  publicRuntimeConfig: {},
  serverRuntimeConfig: {},
}));

describe('Progressive Ad Test', () => {
  const store = {
    storeStatus: StoreStatus.Success,
    price: {},
  } as PriceStore;
  store.storeStatus = StoreStatus.Success;

  describe('Show Ad test', () => {
    it('should show the Ad if manual appraisal', () => {
      store.price.automatedAppraisal = false;
      const viewModel = new ViewModel(store);
      expect(viewModel.showProgressiveAd).toEqual(true);
    });

    it('should not show the Ad if automated appraisal', () => {
      store.price.automatedAppraisal = true;
      const viewModel = new ViewModel(store);
      expect(viewModel.showProgressiveAd).toEqual(false);
    });
  });
});
