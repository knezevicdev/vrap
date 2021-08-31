jest.mock('src/networking/request');

import { OptionsStore } from '../../options/store';
import { PaymentOverviewStore } from '../store';
import ViewModel from '../ViewModel';

describe('Direct Deposit Test', () => {
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
});
