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
    zipCode: '99999',
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
    expect(viewModel.vehicleInformationInfotitle).toEqual(
      'Vehicle Information'
    );
    expect(viewModel.vin).toEqual('VIN');
    expect(viewModel.trim).toEqual('Trim');
    expect(viewModel.mileage).toEqual('Mileage');
    expect(viewModel.zipCode).toEqual('Zip Code');
    expect(viewModel.exteriorColor).toEqual('Exterior Color');
    expect(viewModel.keysAmount).toEqual('Number of Keys');
    expect(viewModel.vehicleOptions).toEqual('Options');
    expect(viewModel.edit).toEqual('Edit');
  });

  it('test handleEditClick, should router called ', () => {
    viewModel.handleEditClick();
    expect(router.push).toHaveBeenCalled();
  });

  it('test get vin ', () => {
    expect(viewModel.vehicleFormInfoVin).toEqual('abc123');
  });

  it('test get vehicleFormInfoTrim ', () => {
    expect(viewModel.vehicleFormInfoTrim).toEqual('Utility 4D SV 2WD V6');
  });

  it('test get vehicle milage ', () => {
    expect(viewModel.vehicleFormInfoMileage).toEqual(999999);
  });

  it('test get vehicle Zip Code ', () => {
    expect(viewModel.vehicleFormInfoZipCode).toEqual('99999');
  });

  it('test get vehicle year ', () => {
    expect(viewModel.vehicleFormInfoYear).toEqual(2016);
  });

  it('test get vehicle make ', () => {
    expect(viewModel.vehicleFormInfoMake).toEqual('NISSAN');
  });

  it('test get vehicle model ', () => {
    expect(viewModel.vehicleFormInfoModel).toEqual('Murano');
  });

  it('test get vehicle color ', () => {
    expect(viewModel.vehicleFormInfoColor).toEqual('silver');
  });

  it('test get vehicle keysAmount ', () => {
    expect(viewModel.vehicleFormInfoKeys).toEqual('1');
  });

  it('test get vehicle options ', () => {
    expect(viewModel.vehicleFormInfoOptions).toEqual(['manual', 'window']);
  });
});
