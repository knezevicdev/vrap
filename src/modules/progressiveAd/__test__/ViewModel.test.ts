import { mocked } from 'ts-jest/utils';

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
  const appStore = mocked({
    store: {
      absmart: {
        isABSmartlyLoading: false,
        isInExperiment: jest.fn(),
      },
    },
  } as unknown) as AppStoreNetwork;
  store.storeStatus = StoreStatus.Success;

  describe('Show Ad test', () => {
    it('should show the Ad if manual appraisal', () => {
      store.price.automatedAppraisal = false;
      const viewModel = new ViewModel(store, appStore);
      expect(viewModel.showProgressiveAd).toEqual(true);
    });

    it('should not show the Ad if absmartly is loading', () => {
      store.price.automatedAppraisal = false;
      const viewModel = new ViewModel(store, appStore);
      appStore.store.absmart.isABSmartlyLoading = true;
      expect(viewModel.showProgressiveAd).toEqual(false);
    });

    it('should not show the Ad if automated appraisal', () => {
      store.price.automatedAppraisal = true;
      const viewModel = new ViewModel(store, appStore);
      expect(viewModel.showProgressiveAd).toEqual(false);
    });
  });

  describe('Is In Experiment Test', () => {
    const viewModel = new ViewModel(store, appStore);
    it('should return false if not in experiment', () => {
      appStore.store.absmart.isInExperiment.mockReturnValueOnce(false);
      expect(viewModel.isInProgressiveExperiment).toBe(false);
    });

    it('should return true if in experiment', () => {
      appStore.store.absmart.isInExperiment.mockReturnValueOnce(true);
      expect(viewModel.isInProgressiveExperiment).toBe(true);
    });
  });
});
