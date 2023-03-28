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

  it('readonly values', () => {
    expect(viewModel.yourPrice).toBe(`your price`);
    expect(viewModel.yourPriceAB).toBe(`Your price`);
    expect(viewModel.yourPriceCamel).toBe(`Your Price:`);
    expect(viewModel.continuePrice).toBe(`continue`);
    expect(viewModel.offerExpPreDate).toBe(`This price expires on `);
    expect(viewModel.offerExpPostDate).toBe(` or upon driving an additional `);
    expect(viewModel.miles).toBe(`250 miles, `);
    expect(viewModel.the).toBe('The ');
    expect(viewModel.titleName).toBe('vehicle title ');
    expect(viewModel.yourName).toBe('must be in your name.');
    expect(viewModel.legalDocumentation).toBe(
      `This price is based on data from thousands of similar market transactions, as well as the information you provided. Vroom may modify or revoke this price if the information you provided is inaccurate or if there is a significant present or prospective change in the used vehicle market beyond Vroom's control. Other terms and restrictions apply.`
    );
    expect(viewModel.wicheverOccerFirst).toBe('whichever occurs first. ');
  });

  it('should track onPageLoad', () => {
    viewModel.onPageLoad();
    expect(trackPriceAutomatedSpy).toHaveBeenCalled();
  });
});
