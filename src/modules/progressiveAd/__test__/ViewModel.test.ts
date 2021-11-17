import { PriceStore } from '../../price/store';
import ViewModel from '../ViewModel';

import AppStoreNetwork from 'src/context';
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
  const appStore = {
    store: {
      absmart: {
        loading: false,
        inPriceProgressiveTest: false,
      },
    },
  } as AppStoreNetwork;
  store.storeStatus = StoreStatus.Success;

  describe('Show Ad test', () => {
    it('should show the Ad if manual appraisal', () => {
      store.price.automatedAppraisal = false;
      const viewModel = new ViewModel(store, appStore);
      expect(viewModel.showProgressiveAd).toEqual(true);
    });

    it('should not show the Ad if absmartly is loading', () => {
      store.price.automatedAppraisal = false;
      appStore.store.absmart.loading = true;
      const viewModel = new ViewModel(store, appStore);
      expect(viewModel.showProgressiveAd).toEqual(false);
    });

    it('should not show the Ad if automated appraisal', () => {
      store.price.automatedAppraisal = true;
      appStore.store.absmart.loading = false;
      const viewModel = new ViewModel(store, appStore);
      expect(viewModel.showProgressiveAd).toEqual(false);
    });
  });

  describe('Is In Experiment Test', () => {
    const viewModel = new ViewModel(store, appStore);
    it('should return false if not in experiment', () => {
      expect(viewModel.isInProgressiveExperiment).toBe(false);
    });

    it('should return true if in experiment', () => {
      appStore.store.absmart.inPriceProgressiveTest = true;
      expect(viewModel.isInProgressiveExperiment).toBe(true);
    });
  });
});
