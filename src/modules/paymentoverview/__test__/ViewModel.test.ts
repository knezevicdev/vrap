/* eslint-disable @typescript-eslint/camelcase */
jest.mock('src/networking/request');

import { OptionsStore } from '../../options/store';
import { PaymentOverviewStore } from '../store';
import ViewModel from '../ViewModel';

import { StoreStatus } from 'src/interfaces.d';

describe('Payment Overview Test', () => {
  const oStore = new OptionsStore();
  const poStore = new PaymentOverviewStore();
  let viewModel: ViewModel;

  beforeEach(async () => {
    await oStore.init('12345');
    await poStore.init('12345');
    viewModel = new ViewModel(poStore, oStore);
  });

  afterEach(() => {
    localStorage.removeItem('priceId');
  });

  it('test readonly initial values', () => {
    viewModel = new ViewModel(poStore, oStore);
    expect(viewModel.hero).toEqual('payment overview');
    expect(viewModel.carWorth).toEqual('Your car is worth');
    expect(viewModel.remainingLoan).toEqual('Remaining Loan');
    expect(viewModel.total).toEqual('Total');
    expect(viewModel.tbd).toEqual('To be determined');
    expect(viewModel.pricePlaceholder).toEqual('--');
  });

  it('carWorthPrice', () => {
    oStore.storeStatus = StoreStatus.Initial;
    expect(viewModel.carWorthPrice).toBe('--');
    oStore.storeStatus = StoreStatus.Success;
    expect(viewModel.carWorthPrice).toBe('$10,854');
  });

  it('hasPoq', () => {
    oStore.poq.account_number = '';
    expect(viewModel.hasPoq).toBe(false);
    oStore.poq.account_number = '123456';
    expect(viewModel.hasPoq).toBe(true);
  });

  it('hasFinalPayment', () => {
    oStore.poq.final_payment = 0;
    expect(viewModel.hasFinalPayment).toBe(false);
    oStore.poq.final_payment = 123456;
    expect(viewModel.hasFinalPayment).toBe(true);
  });

  it('remainingLoanBalance', () => {
    oStore.storeStatus = StoreStatus.Initial;
    expect(viewModel.remainingLoanBalance).toBe('--');
    oStore.storeStatus = StoreStatus.Success;
    expect(viewModel.remainingLoanBalance).toBe('$0');
    oStore.currentPayments = true;
    oStore.poq.account_number = '123456';
    oStore.poq.final_payment = 123456;
    oStore.poq.final_payoff = 654321;
    expect(viewModel.remainingLoanBalance).toBe('$654,321');
    oStore.poq.final_payment = 0;
    expect(viewModel.totalPrice).toBe('To be determined');
  });

  it('totalPrice', () => {
    oStore.storeStatus = StoreStatus.Initial;
    expect(viewModel.totalPrice).toBe('--');
    oStore.storeStatus = StoreStatus.Success;
    expect(viewModel.totalPrice).toBe('$10,854');
    oStore.currentPayments = true;
    oStore.poq.account_number = '123456';
    oStore.poq.final_payment = 123456;
    expect(viewModel.totalPrice).toBe('$123,456');
    oStore.poq.final_payment = 0;
    expect(viewModel.totalPrice).toBe('To be determined');
  });

  it('isInitialized', () => {
    oStore.storeStatus = StoreStatus.Initial;
    expect(viewModel.isInitialized).toBe(false);
    oStore.storeStatus = StoreStatus.Success;
    expect(viewModel.isInitialized).toBe(true);
  });
});
