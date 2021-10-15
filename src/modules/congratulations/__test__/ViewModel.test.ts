import { ParsedUrlQuery } from 'querystring';

import ViewModel from '../ViewModel';

import AnalyticsHandler from 'src/integrations/AnalyticsHandler';
import Store from 'src/store';

jest.mock('next/config', () => (): unknown => ({
  publicRuntimeConfig: {},
  serverRuntimeConfig: {},
}));

describe('Congratulations Test', () => {
  const analyticsHandler = new AnalyticsHandler();
  const query = {} as ParsedUrlQuery;
  const appStore = new Store();
  const viewModel = new ViewModel(analyticsHandler, query, appStore);

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

  describe('Show Progressive Ad Test', () => {
    it('should show ad if not in a mobile web view and in experiment', () => {
      appStore.absmart.inProgressiveTest = true;
      expect(viewModel.showProgressiveAd).toEqual(true);
    });
    it('should not show ad if in android web view and in experiment', () => {
      query['utm_source'] = 'vroom_app_android';
      appStore.absmart.inProgressiveTest = true;
      expect(viewModel.showProgressiveAd).toEqual(false);
    });
    it('should not show ad if in ios web view and in experiment', () => {
      query['utm_source'] = 'vroom_app_ios';
      appStore.absmart.inProgressiveTest = true;
      expect(viewModel.showProgressiveAd).toEqual(false);
    });
    it('should not show ad if not in experiment', () => {
      query['utm_source'] = '';
      appStore.absmart.inProgressiveTest = false;
      expect(viewModel.showProgressiveAd).toEqual(false);
    });
  });
});
