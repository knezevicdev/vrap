import ViewModel from '../ViewModel';

import AnalyticsHandler from 'src/integrations/AnalyticsHandler';

describe('Congratulations Test', () => {
  const analyticsHandler = new AnalyticsHandler();
  const viewModel = new ViewModel(analyticsHandler);
  const congratsViewedSpy = jest
    .spyOn(analyticsHandler, 'trackCongratsViewed')
    .mockReturnValue();

  afterEach(() => {
    localStorage.removeItem('priceId');
  });

  it('should execute analytics tracking on page load', () => {
    viewModel.onPageLoad();
    expect(congratsViewedSpy).toHaveBeenCalled();
  });
});
