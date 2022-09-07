import ViewModel from '../ViewModel';

import Store from 'src/store';

describe('AppraisalForm Exterior condition component test', () => {
  let viewModel: ViewModel;

  beforeEach(() => {
    const store = new Store();
    viewModel = new ViewModel(store);
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
