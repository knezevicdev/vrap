import ViewModel from '../ViewModel';

describe('PayOptions Test', () => {
  const viewModel = new ViewModel();
  const analyticsHandler = viewModel.getAnalyticsHandler;

  const trackNoPriceSpy = jest
    .spyOn(analyticsHandler, 'trackNoPrice')
    .mockReturnValue();

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
