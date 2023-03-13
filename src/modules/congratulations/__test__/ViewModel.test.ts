import { mocked } from 'ts-jest/utils';

import ViewModel from '../ViewModel';

import AnalyticsHandler from 'src/integrations/AnalyticsHandler';

jest.mock('next/config', () => (): unknown => ({
  publicRuntimeConfig: {},
  serverRuntimeConfig: {},
}));

describe('Congratulations Test', () => {
  const analyticsHandler = mocked({
    trackCongratsViewed: jest.fn(),
  } as unknown as AnalyticsHandler);

  const viewModel = new ViewModel(analyticsHandler);

  describe('Page View Test', () => {
    it('should execute analytics tracking on page load', () => {
      viewModel.onPageLoad();
      expect(analyticsHandler.trackCongratsViewed).toHaveBeenCalled();
    });
  });
});
