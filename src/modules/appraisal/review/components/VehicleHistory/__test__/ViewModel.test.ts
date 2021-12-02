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
    expect(viewModel.vehicleHistoryInfotitle).toEqual('Vehicle History');
    expect(viewModel.accident).toEqual('Accident');
    expect(viewModel.title).toEqual('Title');
    expect(viewModel.edit).toEqual('Edit');
  });
});
