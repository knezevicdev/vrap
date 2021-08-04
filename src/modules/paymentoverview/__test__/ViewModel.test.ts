import { useOptionsStore } from '../../options/store';
import { usePaymentOverviewStore } from '../store';
import ViewModel from '../ViewModel';

jest.mock('next/config', () => (): unknown => ({
  publicRuntimeConfig: {},
  serverRuntimeConfig: {},
}));

describe('Direct Deposit Test', () => {
  const oStore = useOptionsStore();
  const poStore = usePaymentOverviewStore();

  const viewModel = new ViewModel(poStore, oStore);
  it('test contents', () => {
    expect(viewModel.hero).toEqual('payment overview');
    expect(viewModel.carWorth).toEqual('Your car is worth');
    expect(viewModel.remainingLoan).toEqual('Remaining Loan');
    expect(viewModel.total).toEqual('Total');
    expect(viewModel.tbd).toEqual('To be determined');
    expect(viewModel.pricePlaceholder).toEqual('--');
  });
});
