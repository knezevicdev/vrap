import ViewModel from '../ViewModel';

import AnalyticsHandler from 'src/integrations/AnalyticsHandler';

jest.mock('next/config', () => (): unknown => ({
  publicRuntimeConfig: {},
  serverRuntimeConfig: {},
}));

describe('Congratulations Test', () => {
  const analyticsHandler = new AnalyticsHandler();
  const viewModel = new ViewModel(analyticsHandler);

  const congratsViewedSpy = jest
    .spyOn(analyticsHandler, 'trackCongratsViewed')
    .mockReturnValue();

  afterEach(() => {
    localStorage.removeItem('priceId');
  });

  describe('Page View Test', () => {
    it('should execute analytics tracking on page load', () => {
      viewModel.onPageLoad();
      expect(congratsViewedSpy).toHaveBeenCalled();
    });
  });
});
