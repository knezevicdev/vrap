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
    expect(viewModel.edit).toEqual('Edit');
  });

  it('test call getCurrentPayment should return No', () => {
    const fn = jest.fn(() => viewModel.getCurrentPayment());
    fn();
    expect(fn).toHaveReturnedWith('No');
  });

  it('when click handleEdit should call window location href', () => {
    stores.verification.setOfferId('123');
    viewModel.handleEditClick();
    Object.defineProperty(window, 'location', {
      value: {
        href: `/sell/verification/documents/123`,
      },
    });
  });
});
