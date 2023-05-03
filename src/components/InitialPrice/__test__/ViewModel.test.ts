import { ABSmartlyContextValue } from '@vroom-web/analytics-integration/dist/absmartly/types';

import ViewModel from '../ViewModel';

import AnalyticsHandler from 'src/integrations/AnalyticsHandler';
import { PriceStore } from 'src/modules/price/store';

describe('InitialPrice Test', () => {
  const analyticsHandler = new AnalyticsHandler();
  const priceId = '12345';
  const store = new PriceStore(priceId);
  const absmartly = {
    isInExperiment: () => false,
    isLoading: false,
  } as any as ABSmartlyContextValue;
  let viewModel: ViewModel;

  const trackPriceAutomatedSpy = jest
    .spyOn(analyticsHandler, 'trackPriceAutomated')
    .mockReturnValue();

  beforeEach(() => {
    viewModel = new ViewModel(store, analyticsHandler, absmartly);
  });

  it('should track onPageLoad', () => {
    viewModel.onPageLoad();
    expect(trackPriceAutomatedSpy).toHaveBeenCalled();
  });
});
