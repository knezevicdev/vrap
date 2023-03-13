import ViewModel from '../ViewModel';

jest.mock('next/config', () => (): unknown => ({
  publicRuntimeConfig: {},
  serverRuntimeConfig: {},
}));

describe('Payment Info Review component test', () => {
  let viewModel: ViewModel;

  beforeEach(() => {
    viewModel = new ViewModel();
  });

  it('test readonly initial values', () => {
    expect(viewModel.title).toEqual('Payment Method');
    expect(viewModel.address).toEqual('Address');
    expect(viewModel.edit).toEqual('Edit');
    expect(viewModel.methodOfPayment).toEqual('Method of Payment');
    expect(viewModel.selectedBank).toEqual('Selected Bank');
    expect(viewModel.accountForDeposit).toEqual('Account for Deposit');
    expect(viewModel.bankRoutingNumber).toEqual('Bank Routing Number');
    expect(viewModel.directDeposit).toEqual('Direct Deposit');
  });
});
