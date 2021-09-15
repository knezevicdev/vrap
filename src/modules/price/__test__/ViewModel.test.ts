jest.mock('src/networking/request');
import ViewModel from '../ViewModel';

import { PriceStore } from 'src/modules/price/store';

describe('test price ViewModel', () => {
  const priceId = '12345';
  const store = new PriceStore(priceId);
  const viewModel = new ViewModel(store);
  const analyticsHandler = viewModel.getAnalyticHandler;

  it('tracking should be called', () => {
    const trackPriceViewedSpy = jest.spyOn(
      analyticsHandler,
      'trackPriceViewed'
    );

    viewModel.onPageLoad();
    expect(trackPriceViewedSpy).toHaveBeenCalled();
  });
});
