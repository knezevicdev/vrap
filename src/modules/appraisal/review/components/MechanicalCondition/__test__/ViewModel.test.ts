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
    expect(viewModel.mechanicalConditionInfotitle).toEqual(
      'Mechanical Condition'
    );
    expect(viewModel.runnable).toEqual('Vehicle Runs');
    expect(viewModel.mechanicalCondition).toEqual('Mechanical Condition');
    expect(viewModel.warningLights).toEqual('Active Warning Lights');
    expect(viewModel.floodFireDamage).toEqual('Water or Fire Damage');
    expect(viewModel.additionalDetails).toEqual('Additional Information');
    expect(viewModel.edit).toEqual('Edit');
  });
});
