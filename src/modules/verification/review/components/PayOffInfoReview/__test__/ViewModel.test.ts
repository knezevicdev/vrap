import ViewModel from '../ViewModel';

import store from 'src/store';

jest.mock('next/config', () => (): unknown => ({
  publicRuntimeConfig: {},
  serverRuntimeConfig: {},
}));

describe('Pay Off Review component test', () => {
  const stores = new store();
  let viewModel: ViewModel;

  beforeEach(() => {
    viewModel = new ViewModel(stores);
  });

  it('test readonly initial values', () => {
    expect(viewModel.payOfftitle).toEqual('Auto Loan Information');
    expect(viewModel.carPayment).toEqual('Are you making car payments?');
    expect(viewModel.whereCarPayment).toEqual(
      'Where do you make your car payments?'
    );
    expect(viewModel.loanAccountNumber).toEqual('Loan Account Number');
    expect(viewModel.ssnLastFour).toEqual(
      'Last Four Digits of Social Security Number'
    );
  });
});
