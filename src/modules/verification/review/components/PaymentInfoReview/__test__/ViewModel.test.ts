import ViewModel from '../ViewModel';

import store from 'src/store';

jest.mock('next/config', () => (): unknown => ({
  publicRuntimeConfig: {},
  serverRuntimeConfig: {},
}));

describe('Payment Info Review component test', () => {
  const stores = new store();
  let viewModel: ViewModel;

  beforeEach(() => {
    viewModel = new ViewModel(stores);
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

  it('when call handleEditClick, should change url ', () => {
    viewModel.handleEditClick();
    const url = '/appraisal/paymentmethod?priceId=undefined';
    Object.defineProperty(window, 'location', {
      value: {
        href: url,
      },
    });

    expect(window.location.href).toEqual(url);
  });
});
