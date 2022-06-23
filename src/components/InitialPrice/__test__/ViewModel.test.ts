jest.mock('src/networking/request');
import { mocked } from 'ts-jest/utils';

import ViewModel from '../ViewModel';

import AnalyticsHandler from 'src/integrations/AnalyticsHandler';
import { PriceStore } from 'src/modules/price/store';
import {
  getIsSignIn,
  getIsSignInInValid,
} from 'src/networking/__mocks__/request';
import client from 'src/networking/client';
import Store from 'src/store';

describe('InitialPrice Test', () => {
  const analyticsHandler = new AnalyticsHandler();
  const priceId = '12345';
  const store = new PriceStore(priceId);
  const stores = new Store();
  const appStore = mocked({
    ...stores,
    absmart: {
      ...stores.absmart,
      isInExperiment: jest.fn(),
      setABSmartlyModel: jest.fn(),
      isABSmartlyLoading: false,
      abTestFacelift: false,
      inProgressiveTest: false,
      inPriceProgressiveTest: false,
      inCongratsProgressiveTest: false,
    },
  });
  let viewModel: ViewModel;

  const ContinueClickSpy = jest
    .spyOn(analyticsHandler, 'trackContinueClick')
    .mockReturnValue();
  const trackPriceAutomatedSpy = jest
    .spyOn(analyticsHandler, 'trackPriceAutomated')
    .mockReturnValue();
  const clientRequest = jest.spyOn(client, 'signInStatus');

  beforeEach(() => {
    viewModel = new ViewModel(store, analyticsHandler, appStore);
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

  it('when called onContinueClick and abTest is true ', async () => {
    await viewModel.onContinueClick();
    appStore.absmart.isInExperiment.mockImplementation(() => true);
    await clientRequest.mockResolvedValue(getIsSignIn());
    const url = `/myaccount/create/suyc?redirect=/sell/verification/owner?priceId=${priceId}&action=suyc`;
    Object.defineProperty(window, 'location', {
      value: {
        href: url,
      },
    });
    expect(window.location.href).toEqual(url);
  });

  it('when called onContinueClick ', async () => {
    appStore.absmart.isInExperiment.mockImplementation(() => false);
    await viewModel.onContinueClick();
    await clientRequest.mockResolvedValue(getIsSignInInValid());
    const url = `/sell/verification/owner?priceId=cb5b06d43cb95286ceeb50efc7a82e08`;
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

  it('call checkSignInStatus', async () => {
    const isSignInStatus = await viewModel.checkSignInStatus();
    await clientRequest.mockResolvedValue(getIsSignIn());
    expect(isSignInStatus).toEqual(true);
  });
});
