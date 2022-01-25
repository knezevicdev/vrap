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
    expect(viewModel.exteriorConditionInfotitle).toEqual('Exterior Condition');
    expect(viewModel.exteriorCondition).toEqual('Exterior Condition');
    expect(viewModel.hailDamage).toEqual('Hail Damage');
    expect(viewModel.tiresAndWheels).toEqual('Tires and Wheels');
    expect(viewModel.afterMarket).toEqual('Aftermarket Modifications');
    expect(viewModel.rust).toEqual('Rust');
    expect(viewModel.dents).toEqual('Dents');
    expect(viewModel.paintChipping).toEqual('Paint Chipping');
    expect(viewModel.scratches).toEqual('Scratches');
    expect(viewModel.edit).toEqual('Edit');
  });
});