jest.mock('src/networking/request');

import { GQLTypes } from '@vroom-web/networking';
import { Response } from '@vroom-web/networking/dist/types';

import { MileageCheckResp } from '../../../interfaces.d';
import ViewModel from '../ViewModel';

import * as Request from 'src/networking/request';
import { getMilageCheck } from 'src/networking/request/__mocks__';
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
    state: '',
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
    warningLightsValues: ['engine'],
  },
  intConditionForm: {
    interiorCondition: '',
    seats: '',
    smokedIn: 'Yes',
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
    tiresAndWheels: 'Under 5K',
  },
};

describe('test appraisalForm viewModel ', () => {
  const stores = new store();
  let viewModel: ViewModel;

  beforeEach(() => {
    viewModel = new ViewModel(stores);
  });

  it('test carfaxOdoLast', () => {
    stores.appraisal.setCarfaxOdoLast(10000);
    expect(viewModel.carfaxOdoLast).toEqual(10000);
  });

  it('test showExactMileageDialog ', () => {
    stores.appraisal.dismissExactMileageDialog();
    expect(viewModel.showExactMileageDialog).toEqual(false);
  });

  it('test update appraisal ', () => {
    viewModel.updateAppraisal(formData);
    expect(stores.appraisal.isEmpty).toEqual(false);
    expect(stores.appraisal.vehicleInfoForm).toEqual({
      vin: 'abc123',
      exteriorColor: 'silver',
      keysAmount: '1',
      make: 'NISSAN',
      mileage: 999999,
      model: 'Murano',
      sellOrTradeIn: '',
      trim: 'Utility 4D SV 2WD V6',
      vehicleOptions: ['manual', 'window'],
      year: 2016,
      zipCode: '99999',
    });
  });

  it('test titleText when on Trade in form', () => {
    stores.appraisal.setIsTradeIn(true);
    expect(viewModel.titleText).toEqual('');
  });

  it('test titleText when on Sell form', () => {
    stores.appraisal.setIsTradeIn(false);
    expect(viewModel.titleText).toEqual('My Appraisal');
  });

  it('test isTradeIn', () => {
    stores.appraisal.setIsTradeIn(true);
    expect(viewModel.isTradeIn).toEqual(true);
  });

  it('test clear appraisal ', () => {
    viewModel.updateAppraisal(formData);
    viewModel.clearAppraisal();
    expect(stores.appraisal.isEmpty).toEqual(true);
    expect(stores.appraisal.vehicleInfoForm).toEqual({
      vin: '',
      exteriorColor: '',
      keysAmount: '1',
      make: '',
      mileage: null,
      model: '',
      sellOrTradeIn: '',
      trim: '',
      vehicleOptions: [],
      year: null,
      zipCode: '',
    });
  });

  it('test update general field ', () => {
    const field = {
      brand: 'Vroom company',
      dealership: 'Vroom company',
      type: 'mobile',
    };
    viewModel.updateGeneralFields(field);
    expect(stores.appraisal.brand).toEqual('Vroom company');
    expect(stores.appraisal.dealership).toEqual('Vroom company');
    expect(stores.appraisal.type).toEqual('mobile');
  });

  it('analytics should called when called trackProgressStart ', () => {
    const analyticHandler = viewModel.getAnalyticHandler;
    const trackSpy = jest.spyOn(analyticHandler, 'trackProcessStart');
    viewModel.trackProcessStart();
    expect(trackSpy).toHaveBeenCalled();
  });

  it('analytics should called when called trackStepComplete ', () => {
    const analyticHandler = viewModel.getAnalyticHandler;
    const trackSpy = jest.spyOn(analyticHandler, 'trackStepComplete');
    viewModel.trackStepComplete(1, formData.vehicleInfoForm);
    expect(trackSpy).toHaveBeenCalledWith(
      1,
      formData.vehicleInfoForm,
      stores.appraisal.eventCategory
    );
  });

  it('analytics should called when called trackNextStepViewed ', () => {
    const analyticHandler = viewModel.getAnalyticHandler;
    const trackSpy = jest.spyOn(analyticHandler, 'trackNextStepViewed');
    viewModel.trackNextStepViewed(2);
    expect(trackSpy).toHaveBeenCalledWith(2);
  });

  it('showExactMileageDialog value should changed ', () => {
    viewModel.setMileageDialogDismiss();
    expect(stores.appraisal.showExactMileageDialog).toEqual(false);
  });

  it('test getMilageCheck api ', async () => {
    const spyRequest = jest.spyOn(Request, 'getMilageCheck');
    const storeSpy = jest.spyOn(stores.appraisal, 'setCarfaxOdoLast');
    spyRequest.mockResolvedValueOnce(
      getMilageCheck() as any as Response<MileageCheckResp>
    );
    await viewModel.handleCarfaxCall('123');
    expect(spyRequest).toHaveBeenCalled();
    expect(storeSpy).toHaveBeenCalledWith(99999);
  });

  it('test getMilageCheck api return value', async () => {
    const spyRequest = jest.spyOn(Request, 'getMilageCheck');
    spyRequest.mockResolvedValueOnce(
      getMilageCheck() as any as Response<MileageCheckResp>
    );
    const resp = await viewModel.handleCarfaxCall('123');
    expect(resp).toEqual({ mileage: 99999, errorMessage: null });
  });

  it('test getUserSignIn ', () => {
    stores.appraisal.setIsLoggedIn(true);
    expect(stores.appraisal.isUserLoggedIn).toEqual(true);
  });

  it('test userLogin api ', async () => {
    const spyRequest = jest.spyOn(Request, 'isUserSignedIn');
    const spyStore = jest.spyOn(stores.appraisal, 'setIsLoggedIn');
    spyRequest.mockResolvedValue(true);
    await viewModel.isSignIn();
    expect(spyRequest).toHaveBeenCalled();
    expect(spyStore).toHaveBeenCalledWith(true);
  });

  it('analytics should called when called emailAnalytics ', () => {
    const analyticHandler = viewModel.getAnalyticHandler;
    const trackSpy = jest.spyOn(analyticHandler, 'tracksEmailCapture');
    viewModel.emailAnalytics('Remind Me Viewed', true, 1, 1, false);
    expect(trackSpy).toHaveBeenCalledWith(
      'Remind Me Viewed',
      true,
      1,
      1,
      false
    );
  });

  it('test getUser api ', async () => {
    const spyRequest = jest.spyOn(Request, 'getUser');
    const spyStore = jest.spyOn(stores.appraisal, 'setUser');
    spyRequest.mockResolvedValueOnce({
      username: 'username',
      firstName: 'fname',
      lastName: 'lname',
      consents: {
        emailMarketing: '',
        smsMarketing: '',
      },
    } as any as GQLTypes.User);
    await viewModel.getUser();
    expect(spyRequest).toHaveBeenCalled();
    expect(spyStore).toHaveBeenCalledWith({
      username: 'username',
      firstName: 'fname',
      lastName: 'lname',
      consents: {
        emailMarketing: '',
        smsMarketing: '',
      },
    });
  });
});
