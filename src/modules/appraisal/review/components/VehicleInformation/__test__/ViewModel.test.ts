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
    expect(viewModel.vehicleInformationInfotitle).toEqual(
      'Vehicle Information'
    );
    expect(viewModel.vin).toEqual('VIN');
    expect(viewModel.trim).toEqual('Trim');
    expect(viewModel.mileage).toEqual('Mileage');
    expect(viewModel.exteriorColor).toEqual('Exterior Color');
    expect(viewModel.keysAmount).toEqual('Number of Keys');
    expect(viewModel.vehicleOptions).toEqual('Options');
    expect(viewModel.edit).toEqual('Edit');
  });
});
