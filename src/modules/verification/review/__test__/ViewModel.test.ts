import ViewModel from '../ViewModel';

import {
  getVerificationDetails,
  verificationResp,
} from 'src/networking/__mocks__/request';
import * as Request from 'src/networking/request';
import store from 'src/store';

jest.mock('src/networking/request');

jest.mock('next/config', () => (): unknown => ({
  publicRuntimeConfig: {},
  serverRuntimeConfig: {},
}));

describe('Review component test', () => {
  const stores = new store();
  let viewModel: ViewModel;
  const spyRequest = jest.spyOn(Request, 'getVerificationDetails');
  global.window = Object.create(window);
  beforeEach(() => {
    viewModel = new ViewModel(stores);
  });

  it('test readonly initial values', () => {
    expect(viewModel.title).toEqual('review your information');
    expect(viewModel.submitBtn).toEqual('SUBMIT MY INFORMATION');
    expect(viewModel.reviewVerification).toEqual(
      'I acknowledge that all information provided is accurate. Vroom reserves the right to modify or revoke your price if any information provided is inaccurate.'
    );
    expect(viewModel.verificationWarning).toEqual(
      'By clicking "Submit My Information," you acknowledge that all the information you provided is accurate. Vroom reserves the right to modify or revoke your price if any information provided is inaccurate.'
    );
  });

  it('tracker should called when pageLoad called', () => {
    const pageViewd = jest.spyOn(
      viewModel.getAnalyticHandler(),
      'trackVerificationReviewViewed'
    );
    viewModel.onPageLoad();
    expect(pageViewd).toHaveBeenCalled();
  });

  it('test when get verification data ', async () => {
    spyRequest.mockResolvedValue(getVerificationDetails());
    await viewModel.getVerificationDetails(
      'cb5b06d43cb95286ceeb50efc7a82e08',
      '1234'
    );
    const response = {
      ...verificationResp.data,
      last_four_ssn: '1234',
    };
    expect(JSON.stringify(stores.verification.verificationDetail)).toEqual(
      JSON.stringify(response)
    );
  });

  it('test setWhereIsVehicleRegistered function called ', () => {
    viewModel.setWhereIsVehicleRegistered('NY');
    expect(stores.verification.whereIsVehicleRegistered).toEqual('NY');
  });

  it('test when verification submitted ', async () => {
    const verificationSubmitted = jest.spyOn(
      viewModel.getAnalyticHandler(),
      'trackVerificationSubmitted'
    );
    const createVerificationPayload = jest.spyOn(
      viewModel,
      'createVerificationPayload'
    );

    await viewModel.verificationSubmit();
    const url = '/appraisal/paymentmethod?priceId=undefined';
    Object.defineProperty(window, 'location', {
      value: {
        href: url,
      },
    });
    expect(createVerificationPayload).toHaveBeenCalled();
    expect(verificationSubmitted).toHaveBeenCalled();
    expect(window.location.href).toEqual(url);
  });
});
