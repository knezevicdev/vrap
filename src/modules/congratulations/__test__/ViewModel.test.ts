import { mocked } from 'ts-jest/utils';

import ViewModel from '../ViewModel';

import AppStoreNetwork from 'src/context';
import AnalyticsHandler from 'src/integrations/AnalyticsHandler';

jest.mock('next/config', () => (): unknown => ({
  publicRuntimeConfig: {},
  serverRuntimeConfig: {},
}));

describe('Congratulations Test', () => {
  const analyticsHandler = mocked(({
    trackCongratsViewed: jest.fn(),
  } as unknown) as AnalyticsHandler);

  const appStore = mocked({
    store: {
      absmart: {
        isABSmartlyLoading: false,
        isInExperiment: jest.fn(),
      },
    },
  } as unknown) as AppStoreNetwork;
  const viewModel = new ViewModel(analyticsHandler, appStore);

  describe('Page View Test', () => {
    it('should execute analytics tracking on page load', () => {
      viewModel.onPageLoad();
      expect(analyticsHandler.trackCongratsViewed).toHaveBeenCalled();
    });
  });

  describe('Is In Experiment Test', () => {
    it('should return false if not in experiment', () => {
      appStore.store.absmart.isInExperiment.mockReturnValueOnce(false);
      expect(viewModel.isInExperiment).toBe(false);
    });

    it('should return true if in experiment', () => {
      appStore.store.absmart.isInExperiment.mockReturnValueOnce(true);
      expect(viewModel.isInExperiment).toBe(true);
    });

    it('should return undefined if loading', () => {
      appStore.store.absmart.isABSmartlyLoading = true;
      expect(viewModel.isInExperiment).toBe(undefined);
    });
  });
});
