import { ABSmartlyContextValue } from '@vroom-web/analytics-integration/dist/absmartly/types';

jest.mock('src/networking/request');

import { NextRouter } from 'next/router';

import { DirectDepositStore } from '../../directdeposit/store';
import { OptionsStore } from '../../options/store';
import ViewModel from '../ViewModel';

import AnalyticsHandler from 'src/integrations/AnalyticsHandler';
import store from 'src/store';

describe('Options Test', () => {
  const analyticsHandler = new AnalyticsHandler();
  const oStore = new OptionsStore();
  const ddStore = new DirectDepositStore();
  const appStore = new store();
  const paymentOptionsViewedSpy = jest
    .spyOn(analyticsHandler, 'trackPaymentOptionsViewed')
    .mockReturnValue();
  const paymentOptionsSubmittedSpy = jest
    .spyOn(analyticsHandler, 'trackPaymentOptionsSubmitted')
    .mockReturnValue();
  let viewModel: ViewModel;

  beforeEach(async () => {
    await oStore.init('12345');
    await ddStore.initClientSide('12345');
    viewModel = new ViewModel(
      oStore,
      ddStore,
      analyticsHandler,
      appStore,
      {} as any as NextRouter,
      {
        isInExperiment: () => false,
        isLoading: false,
      } as any as ABSmartlyContextValue
    );
  });

  afterEach(() => {
    localStorage.removeItem('priceId');
  });

  it('test readonly initial values', () => {
    expect(viewModel.hero).toBe(`let's set up your payment method`);
    expect(viewModel.desktopTitle).toBe('how would you like to get paid?');
    expect(viewModel.optionTitle).toBe('Payment Method');
    expect(viewModel.optionQuestion).toBe('How would you like to get paid?');
    expect(viewModel.submit).toBe('submit');
    expect(viewModel.submitting).toBe('submitting');
  });

  it('tracks a page view on load', () => {
    viewModel.onPageLoad();
    expect(paymentOptionsViewedSpy).toHaveBeenCalled();
  });

  it('onPlaidSubmitting should set the Plaid submitting value in the store', () => {
    viewModel.onPlaidSubmitting(true);
    expect(oStore.plaidSubmitting).toBe(true);
    viewModel.onPlaidSubmitting(false);
    expect(oStore.plaidSubmitting).toBe(false);
  });

  it('getPlaidSubmitting', () => {
    expect(viewModel.getPlaidSubmitting()).toBe(false);
    viewModel.onPlaidSubmitting(true);
    expect(viewModel.getPlaidSubmitting()).toBe(true);
  });

  it('getMailiingAddress', () => {
    expect(viewModel.getMailiingAddress()).toEqual({
      address_1: '123 Melrose Street',
      address_2: '',
      city: 'Brooklyn',
      state: 'NY',
      zipcode: '11206',
    });
  });

  it('getEmail', () => {
    expect(viewModel.getEmail()).toBe('doyouliketesting@testvroom.com');
  });

  it('showDirectDeposit', () => {
    expect(viewModel.showDirectDeposit()).toBe(true);
    oStore.showDD = 'not direct deposit';
    expect(viewModel.showDirectDeposit()).toBe(false);
  });

  it('getShowSubmitButton', () => {
    expect(viewModel.getShowSubmitButton()).toBe(false);
    ddStore.showPlaidLink = false;
    expect(viewModel.getShowSubmitButton()).toBe(true);
  });

  it('isValidRouting checks if users routing number is valid', () => {
    expect(viewModel.isValidRouting('1111111')).toBe(false);
    expect(viewModel.isValidRouting('021000021')).toBe(true);
  });

  it('isValidStreetAddress checks if users street address is valid', () => {
    expect(viewModel.isValidStreetAddress('1111111')).toBe(false);
    expect(viewModel.isValidStreetAddress('123 main st')).toBe(true);
  });

  it('isValidZipCode checks if users zip code is valid', () => {
    expect(viewModel.isValidZipCode('12345')).toBe(true);
    expect(viewModel.isValidZipCode('abcdef')).toBe(false);
  });

  it('isValidName checks if users name is valid', () => {
    expect(viewModel.isValidName('12345')).toBe(false);
    expect(viewModel.isValidName('John')).toBe(true);
  });

  it('paymentOptionsSubmit submits the users form when manual or check', () => {
    const submitValues = {
      paymentOption: 'string',
      routingNumber: 'string',
      bankAccountNumber: 'string',
      isPrimaryAddress: 'string',
      address: 'string',
      apartment: 'string',
      city: 'string',
      state: 'string',
      zipcode: 'string',
    };
    oStore.showDD = 'Manual Input';

    viewModel.paymentOptionsSubmit(submitValues);
    expect(paymentOptionsSubmittedSpy).toHaveBeenCalledWith('Manual ACH');

    oStore.showDD = 'Check';

    viewModel.paymentOptionsSubmit(submitValues);
    expect(paymentOptionsSubmittedSpy).toHaveBeenCalledWith('Check');
  });

  it('getInstitutionNotFound', () => {
    expect(viewModel.getInstitutionNotFound()).toBe(false);
  });

  it('inFaceliftTest', () => {
    expect(viewModel.inFaceliftTest()).toBe(false);
  });

  it('setPaymentOption', () => {
    viewModel.setPaymentOption('Check');
    expect(viewModel.showDirectDeposit()).toBe(false);
    viewModel.setPaymentOption('Direct Deposit');
    expect(viewModel.showDirectDeposit()).toBe(true);
  });
});
