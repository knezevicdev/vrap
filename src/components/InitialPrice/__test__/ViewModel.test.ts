jest.mock('src/networking/request');
import ViewModel from '../ViewModel';

import AnalyticsHandler from 'src/integrations/AnalyticsHandler';
import { PriceStore } from 'src/modules/price/store';

describe('InitialPrice Test', () => {
  const analyticsHandler = new AnalyticsHandler();
  const priceId = '12345';
  const store = new PriceStore(priceId);
  const viewModel = new ViewModel(store, analyticsHandler);
  const ContinueClickSpy = jest
    .spyOn(analyticsHandler, 'trackContinueClick')
    .mockReturnValue();
  const trackPriceAutomatedSpy = jest
    .spyOn(analyticsHandler, 'trackPriceAutomated')
    .mockReturnValue();

  it('readonly values', () => {
    expect(viewModel.yourPrice).toBe(`your price`);
    expect(viewModel.yourPriceCamel).toBe(`Your Price:`);
    expect(viewModel.continuePrice).toBe(`continue`);
    expect(viewModel.offerExpPreDate).toBe(`This price expires on `);
    expect(viewModel.offerExpPostDate).toBe(` or upon driving an additional `);
    expect(viewModel.miles).toBe(`250 miles.`);
    expect(viewModel.price).toBe('$0');
    expect(viewModel.priceId).toBe(``);
    expect(viewModel.goodUntil).toBe('January 1, 2020');
    expect(viewModel.legalDocumentation).toBe(
      `This price is based on data from thousands of similar market transactions, as well as the information you provided. Vroom may modify or revoke this price if the information you provided is inaccurate or if there is a significant present or prospective change in the used vehicle market beyond Vroom's control. Other terms and restrictions apply.`
    );
  });

  it('when called onContinueClick ', async () => {
    await viewModel.onContinueClick();
    const url = `/sell/verification/owner/${priceId}`;
    Object.defineProperty(window, 'location', {
      value: {
        href: url,
      },
    });
    expect(ContinueClickSpy).toHaveBeenCalled();
    expect(window.location.href).toEqual(url);
  });

  it('should track onPageLoad', () => {
    viewModel.onPageLoad();
    expect(trackPriceAutomatedSpy).toHaveBeenCalled();
  });
});
