jest.mock('src/networking/request');

import { NextRouter } from 'next/router';

import * as Utils from '../../utils';
import ViewModel from '../ViewModel';

import AnalyticsHandler from 'src/integrations/AnalyticsHandler';
import * as Request from 'src/networking/request';
import {
  getPostAppraisalReview,
  getSubmitWeblead,
} from 'src/networking/request/__mocks__';
import Store from 'src/store';

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
    state: '',
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
    smokedIn: 'Yes',
  },
  extConditionForm: {
    afterMarket: ['others'],
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

describe('Appraisal review index page test', () => {
  let viewModel: ViewModel;
  const stores = new Store();
  const router = ({
    push: jest.fn(),
    asPath: '',
  } as unknown) as NextRouter;
  let analyticsHandler: AnalyticsHandler;

  beforeEach(() => {
    viewModel = new ViewModel(stores, router, {
      requestId: 'unknown',
      visitorId: 'unknown',
    });
    router.asPath = '';
    analyticsHandler = viewModel.getAnalyticsHandler();
  });

  it('check title', () => {
    expect(viewModel.title).toEqual('my appraisal review');
  });

  it('should isFormEmpty in store called ', () => {
    const isFormEmpty = jest.spyOn(stores.appraisal, 'isFormEmpty');
    viewModel.isAppraisalEmpty();
    expect(isFormEmpty).toHaveBeenCalled();
  });

  it('should redirect to /sell/vehicleInformation if Appraisal is empty', () => {
    viewModel.redirectToAppraisalForm();
    expect(router.push).toHaveBeenCalledWith({
      pathname: '/sell/vehicleInformation',
      query: {},
    });
  });

  it('should preserve form=trade query parameter while redirecting to /sell/vehicleInformation', () => {
    router.query = { form: 'trade' };
    viewModel.redirectToAppraisalForm();
    expect(router.push).toHaveBeenCalledWith({
      pathname: '/sell/vehicleInformation',
      query: { form: 'trade' },
    });
  });

  it('should redirect to /sell/tradeIn-selfService if Appraisal is empty and user is on /sell/tradeIn-selfService-Review', () => {
    router.asPath = '/sell/tradeIn-selfService-Review';
    viewModel.redirectToAppraisalForm();
    expect(router.push).toBeCalledWith('/sell/tradeIn-selfService');
  });

  it('should set form in appraisal store if form exists in query string', () => {
    router.query = { form: 'trade' };
    viewModel.setTradeFormType();
    expect(stores.appraisal.form).toEqual('trade');
  });

  it('analyticHandler trackAppraisalIdentify should called', () => {
    const trackAppraisalIdentify = jest.spyOn(
      analyticsHandler,
      'trackAppraisalIdentify'
    );

    viewModel.trackIdentify();
    expect(trackAppraisalIdentify).toHaveBeenCalled();
  });

  it('analyticHandler trackAppraisalReviewViewed should called', () => {
    const trackAppraisalReviewViewed = jest.spyOn(
      analyticsHandler,
      'trackAppraisalReviewViewed'
    );

    viewModel.trackAppraisalReviewViewed();
    expect(trackAppraisalReviewViewed).toHaveBeenCalled();
  });

  it('should call analytric and router when success api call ', async () => {
    stores.appraisal.updateAppraisal(formData);
    const makeRequestBody = jest.spyOn(Utils, 'makeRequestBody');
    makeRequestBody.mockReturnValue({
      email: 'test@test.com',
      phoneNumber: '555-555-5555',
      lead_id: '12345',
      DateSubmitted: Date.now().toString(),
      additionalDetails: '',
      afterMarket: [],
      brand: 'Vroom',
      dealership: 'Vroom',
      exteriorColor: 'silver',
      exteriorCondition: 'Good',
      firstName: 'fname',
      floodFireDamage: '',
      hailDamage: '',
      hasAccident: 'No',
      interiorCondition: 'Good',
      keysAmount: '1',
      lastName: 'lname',
      anonymous_id: '123456',
      make: 'NISSAN',
      mechanicalCondition: 'Good',
      mileage: 999999,
      model: 'Rogue',
      options: [],
      otherAfterMarket: '',
      otherWarning: '',
      runnable: '',
      seats: '',
      smokedIn: '',
      tiresAndWheels: '',
      titleStatus: '',
      trim: 'Utility 4D SV 2WD V6',
      csTrimId: 12345,
      type: '',
      vin: 'abc123',
      warningLights: '',
      warningLightsValues: [],
      year: 2016,
      zipCode: '12345',
      utm_campaign: '',
      utm_content: '',
      utm_medium: '',
      utm_source: '',
      utm_term: '',
      utm_keyword: '',
      utm_subsource: '',
    });
    const trackAnalytics = jest.spyOn(analyticsHandler, 'trackLeadSubmitted');
    const submitWebleadSpy = jest.spyOn(Request, 'submitWeblead');
    const postAppraisalReview = jest.spyOn(Request, 'postAppraisalReview');
    const clearAppraisal = jest.spyOn(stores.appraisal, 'clearAppraisal');
    trackAnalytics.mockReturnValue({} as any);
    submitWebleadSpy.mockResolvedValue(getSubmitWeblead());
    postAppraisalReview.mockResolvedValue(getPostAppraisalReview());
    await viewModel.submitAppraisal('fake_captcha_token');
    expect(makeRequestBody).toHaveBeenCalled();
    expect(makeRequestBody).toHaveBeenCalledWith(stores.appraisal);
    expect(trackAnalytics).toHaveBeenCalled();
    expect(trackAnalytics).toHaveBeenCalledWith('Appraisal', {
      email: 'test@test.com',
      phone: '555-555-5555',
      lead_id: '12345',
    });

    expect(submitWebleadSpy).toHaveBeenCalledWith({
      firstName: 'fname',
      lastName: 'lname',
      email: 'test@test.com',
      phone: '555-555-5555',
      correlationId: '12345',
    });
    expect(postAppraisalReview).toHaveBeenCalled();
    expect(clearAppraisal).toHaveBeenCalled();
    expect(router.push).toHaveBeenCalled();
  });
});
