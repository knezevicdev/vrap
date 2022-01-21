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
    expect(viewModel.interiorConditionInfotitle).toEqual('Interior Condition');
    expect(viewModel.interiorMaterial).toEqual('Interior Material');
    expect(viewModel.interiorCondition).toEqual('Interior Condition');
    expect(viewModel.odor).toEqual('Odor');
    expect(viewModel.edit).toEqual('Edit');
  });
});
