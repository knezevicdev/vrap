import ViewModel from '../ViewModel';

import store from 'src/store';

jest.mock('next/config', () => (): unknown => ({
  publicRuntimeConfig: {},
  serverRuntimeConfig: {},
}));

describe('Owner Infomation Review component test', () => {
  const stores = new store();
  let viewModel: ViewModel;

  beforeEach(() => {
    viewModel = new ViewModel(stores);
  });

  it('test readonly initial values', () => {
    expect(viewModel.personalInformationInfotitle).toEqual('Your Information');
    expect(viewModel.name).toEqual('Name');
    expect(viewModel.email).toEqual('Email Address');
    expect(viewModel.phoneNumber).toEqual('Phone Number');
    expect(viewModel.zipCode).toEqual('Zip Code');
    expect(viewModel.edit).toEqual('Edit');
  });
});
