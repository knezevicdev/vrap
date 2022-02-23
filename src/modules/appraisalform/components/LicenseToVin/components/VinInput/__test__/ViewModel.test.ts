import ViewModel from '../ViewModel';

describe('AppraisalForm Exterior condition component test', () => {
  let viewModel: ViewModel;

  beforeEach(() => {
    viewModel = new ViewModel();
  });

  it('should trackLicenseToVin called', () => {
    const trackLicenseToVinSpy = jest.spyOn(
      viewModel.analyticsHandler,
      'trackLicenseToVin'
    );
    viewModel.trackVinClicked();
    expect(trackLicenseToVinSpy).toHaveBeenCalled();
    expect(trackLicenseToVinSpy).toHaveBeenCalledWith('Vin', 'Sell');
  });
});
