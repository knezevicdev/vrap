import { OptionsStore, submitPaymentOption } from '../store';

import {
  MailingAddress,
  PaymentOverviewFormValues,
  StoreStatus,
} from 'src/interfaces.d';
import { getinitialOptionDetails } from 'src/networking/__mocks__/request';
import { submitPaymentOptionSelected } from 'src/networking/request';
import * as Request from 'src/networking/request';

jest.mock('next/config', () => {
  return (): unknown => {
    return {
      publicRuntimeConfig: {},
      serverRuntimeConfig: {},
    };
  };
});

describe('Options Store Tests', () => {
  let store: OptionsStore;

  beforeEach(() => {
    store = new OptionsStore();
  });

  it('should call submitPaymentOptionSelected', async () => {
    const values = {} as PaymentOverviewFormValues;
    const priceId = '';
    const address = {} as MailingAddress;
    const submitPaymentSpy = jest.spyOn(Request, 'submitPaymentOptionSelected');
    await submitPaymentOption(values, priceId, address);
    expect(submitPaymentSpy).toHaveBeenCalledWith(values, priceId, address);
    expect(submitPaymentOptionSelected).not.toThrow();
  });

  it('test init function ', async () => {
    const priceId = '123';
    const spyGetInitialOption = jest.spyOn(Request, 'getVerificationDetails');
    spyGetInitialOption.mockResolvedValueOnce(getinitialOptionDetails());
    await store.init(priceId);
    expect(store.priceId).toEqual(priceId);
    expect(store.storeStatus).toEqual(StoreStatus.Success);
    expect(store.email).toEqual('doyouliketesting@testvroom.com');
    expect(store.poq).toEqual({
      account_number: '123456',
      final_payment: 0,
      final_payoff: 0,
    });
    expect(store.currentPayments).toEqual(false);
    expect(store.mailingAddress).toEqual({
      address_1: '123 Melrose Street',
      address_2: '',
      city: 'Brooklyn',
      state: 'NY',
      zipcode: '11206',
    });
  });

  it('test init function with error', async () => {
    const priceId = '123';
    const spyGetInitialOption = jest.spyOn(Request, 'getVerificationDetails');
    spyGetInitialOption.mockRejectedValue({});
    await store.init(priceId);
    expect(store.email).toEqual('');
    expect(store.poq).toEqual({
      account_number: '',
      final_payment: 0,
      final_payoff: 0,
    });
    expect(store.currentPayments).toEqual(false);
    expect(store.mailingAddress).toEqual({
      address_1: '',
      address_2: '',
      city: '',
      state: '',
      zipcode: '',
    });
  });

  it('test setPayOptionSelected ', () => {
    store.setPayOptionSelected('Check by Mail');
    expect(store.showDD).toEqual('Check by Mail');
  });

  it('test setPlaidSubmitting ', () => {
    store.setPlaidSubmitting(false);
    expect(store.plaidSubmitting).toEqual(false);
  });

  it('test setInstitutionFound ', () => {
    store.setInstitutionFound(true);
    expect(store.institutionFound).toEqual(true);
  });

  it('test setInstitutionSearched ', () => {
    store.setInstitutionSearched(true);
    expect(store.institutionSearched).toEqual(true);
  });

  it('test setABSmartTest ', () => {
    store.setABSmartTest(true);
    expect(store.abSmartlyTest).toEqual(true);
  });
});
