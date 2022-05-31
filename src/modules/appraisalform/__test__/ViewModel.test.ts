import ViewModel from '../ViewModel';

import { getMilageCheck } from 'src/networking/__mocks__/request';
import * as Request from 'src/networking/request';
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
    tiresAndWheels: '',
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

  it('should call isInExperiment when called isDetailedConditionsExperiment', () => {
    const spyIsInExperiment = jest.spyOn(stores.absmart, 'isInExperiment');
    viewModel.isDetailedConditionsExperiment;
    expect(spyIsInExperiment).toHaveBeenCalled();
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
      trim: 'Utility 4D SV 2WD V6',
      vehicleOptions: ['manual', 'window'],
      year: 2016,
    });
  });

  it('test clear appraisal ', () => {
    viewModel.updateAppraisal(formData);
    viewModel.clearAppraisal();
    expect(stores.appraisal.isEmpty).toEqual(true);
    expect(stores.appraisal.vehicleInfoForm).toEqual({
      vin: '',
      exteriorColor: '',
      keysAmount: '',
      make: '',
      mileage: null,
      model: '',
      trim: '',
      vehicleOptions: [],
      year: null,
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
    expect(trackSpy).toHaveBeenCalledWith(1, formData.vehicleInfoForm);
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
    spyRequest.mockResolvedValueOnce(getMilageCheck());
    await viewModel.handleCarfaxCall('123');
    expect(spyRequest).toHaveBeenCalled();
    expect(storeSpy).toHaveBeenCalledWith(99999);
  });

  it('test getMilageCheck api return value', async () => {
    const spyRequest = jest.spyOn(Request, 'getMilageCheck');
    spyRequest.mockResolvedValueOnce(getMilageCheck());
    const resp = await viewModel.handleCarfaxCall('123');
    expect(resp).toEqual({ mileage: 99999, errorMessage: null });
  });

  it('should call isInExperiment when called isEmailCaptureExperiment', () => {
    const spyIsInExperiment = jest.spyOn(stores.absmart, 'isInExperiment');
    viewModel.isEmailCaptureExperiment();
    expect(spyIsInExperiment).toHaveBeenCalled();
  });

  it('test getUserSignIn ', () => {
    stores.appraisal.setIsLoggedIn(true);
    expect(stores.appraisal.isUserLoggedIn).toEqual(true);
  });

  it('test userLogin api ', async () => {
    const spyRequest = jest.spyOn(Request, 'IsUserSignIn');
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
    });
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
