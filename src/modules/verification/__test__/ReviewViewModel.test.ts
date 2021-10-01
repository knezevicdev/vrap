import AnalyticsHandler from '../../../integrations/AnalyticsHandler';
import store from '../../../store';
import ViewModel from '../review/ViewModel';

jest.mock('src/networking/request');

describe('Review component test', () => {
  const stores = new store();
  let viewModel: ViewModel;
  const analyticHandler = new AnalyticsHandler();
  const pageViewd = jest.spyOn(
    analyticHandler,
    'trackVerificationReviewViewed'
  );

  const verificationSubmitted = jest.spyOn(
    analyticHandler,
    'trackVerificationSubmitted'
  );
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
    viewModel.onPageLoad();
    expect(pageViewd).toHaveBeenCalled();
  });

  it('test when get verification data ', () => {
    viewModel.getVerificationDetails('cb5b06d43cb95286ceeb50efc7a82e08');
    console.log('owners info <<<<>>>>>>> ', stores.verification.ownerInfo);
  });

  it('test when verification submitted ', () => {
    viewModel.verificationSubmit();
    expect(verificationSubmitted).toHaveBeenCalled();
  });
});
