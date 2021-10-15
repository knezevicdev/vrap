import { ParsedUrlQuery } from 'querystring';

import { PriceStore } from '../../price/store';
import ViewModel from '../ViewModel';

import { StoreStatus } from 'src/interfaces.d';
import Store from 'src/store';

jest.mock('next/config', () => (): unknown => ({
  publicRuntimeConfig: {},
  serverRuntimeConfig: {},
}));

describe('Progressive Ad Test', () => {
  describe('Show Ad test', () => {
    const store = {
      storeStatus: StoreStatus.Success,
      price: {},
    } as PriceStore;
    const query = {} as ParsedUrlQuery;
    const appStore = new Store();

    store.storeStatus = StoreStatus.Success;
    it('should show the Ad if manual appraisal & in Experiment & when not in a mobile web view', () => {
      store.price.automatedAppraisal = false;
      appStore.absmart.inProgressiveTest = true;
      const viewModel = new ViewModel(store, query, appStore);
      expect(viewModel.showProgressiveAd).toEqual(true);
    });

    it('should not show the Ad if automated appraisal & in Experiment & when not in a mobile web view', () => {
      store.price.automatedAppraisal = true;
      appStore.absmart.inProgressiveTest = true;
      const viewModel = new ViewModel(store, query, appStore);
      expect(viewModel.showProgressiveAd).toEqual(false);
    });

    it('should not show the Ad if manual appraisal & in Experiment & in android web view', () => {
      store.price.automatedAppraisal = false;
      appStore.absmart.inProgressiveTest = true;
      query['utm_source'] = 'vroom_app_android';
      const viewModel = new ViewModel(store, query, appStore);
      expect(viewModel.showProgressiveAd).toEqual(false);
    });

    it('should not show the Ad if manual appraisal & in Experiment & in ios web view', () => {
      store.price.automatedAppraisal = false;
      appStore.absmart.inProgressiveTest = true;
      query['utm_source'] = 'vroom_app_ios';
      const viewModel = new ViewModel(store, query, appStore);
      expect(viewModel.showProgressiveAd).toEqual(false);
    });

    it('should not show the Ad if not in Experiment', () => {
      store.price.automatedAppraisal = false;
      appStore.absmart.inProgressiveTest = false;
      query['utm_source'] = '';
      const viewModel = new ViewModel(store, query, appStore);
      expect(viewModel.showProgressiveAd).toEqual(false);
    });
  });
});
