import { NextRouter } from 'next/router';

import ViewModel from '../ViewModel';

import store from 'src/store';

const formData = {
  vehicleInfoForm: {
    vin: '',
    exteriorColor: '',
    keysAmount: '',
    make: '',
    mileage: 0,
    model: '',
    trim: '',
    vehicleOptions: [],
    year: 0,
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
    warningLightsValues: ['engine'],
  },
  intConditionForm: {
    interiorCondition: '',
    seats: '',
    smokedIn: '',
  },
  extConditionForm: {
    afterMarket: [],
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

  it('test handleEditClick, should router called ', () => {
    viewModel.handleEditClick();
    expect(router.push).toHaveBeenCalled();
  });

  it('test get warning light values ', () => {
    expect(viewModel.warningLightsValues).toEqual(['engine']);
  });
});
