import ViewModel from '../ViewModel';

describe('PayOptions Test', () => {
  const viewModel = new ViewModel();
  const analyticsHandler = viewModel.getAnalyticsHandler;

  const trackNoPriceSpy = jest
    .spyOn(analyticsHandler, 'trackNoPrice')
    .mockReturnValue();
  it('readonly values', () => {
    expect(viewModel.sitTight).toEqual('sit tight');
    expect(viewModel.findCar).toEqual('find your next car');
    expect(viewModel.takingALook).toEqual(
      'Our buying specialists are taking a closer look and will send your price by email in one business day.'
    );
    expect(viewModel.spamFolder).toEqual(
      'Please be sure to check your spam folder.'
    );
  });

  it('analytics trackNoPrice should called when pageload', () => {
    viewModel.onPageLoad();
    expect(trackNoPriceSpy).toHaveBeenCalled();
  });

  it('should change window.location.href, when call handleFindCar ', () => {
    const url = '/cars';
    Object.defineProperty(window, 'location', {
      value: {
        href: url,
      },
    });
    viewModel.handleFindCar();
    expect(window.location.href).toEqual(url);
  });
});
