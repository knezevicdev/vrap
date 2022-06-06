import { NextRouter } from 'next/router';

import ViewModel from '../ViewModel';

import store from 'src/store';

const formData = {
  vehicleInfoForm: {
    vin: 'abc123',
    exteriorColor: 'silver',
    keysAmount: '1',
    make: 'NISSAN',
    mileage: 999999,
    model: 'Murano',
    trim: 'Utility 4D SV 2WD V6',
    vehicleOptions: ['manual', 'window'],
    year: 2016,
  },
  vehicleHistoryForm: {
    hasAccident: '',
    titleStatus: '',
    whichStatePurchase: '',
  },
  personalInfoForm: {
    email: '',
    firstName: '',
    lastName: '',
    phoneNumber: '',
    zipCode: '',
  },
  mechConditionForm: {
    additionalDetails: '',
    floodFireDamage: '',
    mechanicalCondition: '',
    otherWarning: '',
    runnable: '',
    warningLights: '',
    warningLightsValues: [],
  },
  intConditionForm: {
    interiorCondition: '',
    seats: '',
    smokedIn: '',
  },
  extConditionForm: {
    afterMarket: ['Stereo System', 'Performance'],
    dents: '',
    exteriorCondition: '',
    hailDamage: '',
    otherAfterMarket: '',
    paintChipping: '',
    rust: '',
    scratches: '',
    scratchesPanels: null,
    tiresAndWheels: '',
  },
};

jest.mock('next/config', () => (): unknown => ({
  publicRuntimeConfig: {},
  serverRuntimeConfig: {},
}));

describe('Owner Infomation Review component test', () => {
  const stores = new store();
  let viewModel: ViewModel;

  const router = ({
    push: jest.fn(),
  } as unknown) as NextRouter;

  beforeEach(() => {
    viewModel = new ViewModel(stores, router);
    stores.appraisal.updateAppraisal(formData);
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

  it('test handleEditClick, should router called ', () => {
    viewModel.handleEditClick();
    expect(router.push).toHaveBeenCalled();
  });

  it('test after market value', () => {
    expect(viewModel.afterMarketOptions).toEqual([
      'Stereo System',
      'Performance',
    ]);
  });

  it('should call isInExperiment when called isDetailedConditionsExperiment', () => {
    const spyIsInExperiment = jest.spyOn(stores.absmart, 'isInExperiment');
    viewModel.isDetailedConditionsExperiment;
    expect(spyIsInExperiment).toHaveBeenCalled();
  });
});
