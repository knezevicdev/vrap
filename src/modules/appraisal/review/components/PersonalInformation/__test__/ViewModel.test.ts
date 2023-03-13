import { NextRouter } from 'next/router';

import ViewModel from '../ViewModel';

import store from 'src/store';

jest.mock('next/config', () => (): unknown => ({
  publicRuntimeConfig: {},
  serverRuntimeConfig: {},
}));

describe('Owner Infomation Review component test', () => {
  const stores = new store();
  let viewModel: ViewModel;

  const router = {
    push: jest.fn().mockImplementation(async () => true),
  } as unknown as NextRouter;

  beforeEach(() => {
    viewModel = new ViewModel(stores, router);
  });

  it('test readonly initial values', () => {
    expect(viewModel.personalInformationInfotitle).toEqual('Your Information');
    expect(viewModel.name).toEqual('Name');
    expect(viewModel.email).toEqual('Email Address');
    expect(viewModel.phoneNumber).toEqual('Phone Number');
    expect(viewModel.edit).toEqual('Edit');
  });

  it('test handleEditClick, should router called ', () => {
    viewModel.handleEditClick();
    expect(router.push).toHaveBeenCalled();
  });
});
