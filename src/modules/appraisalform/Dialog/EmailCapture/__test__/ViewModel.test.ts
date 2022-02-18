import ViewModel from '../ViewModel';

import AnalyticsHandler from 'src/integrations/AnalyticsHandler';

describe('test email capture viewModel', () => {
  let viewModel: ViewModel;
  const analyticsHandler = new AnalyticsHandler();
  beforeEach(() => {
    viewModel = new ViewModel(analyticsHandler);
  });
  it('test readonly ', () => {
    expect(viewModel.title).toEqual('busy watching the big game?');
    expect(viewModel.description).toEqual(
      `Give us your email for a reminder to see how much you can score
  after it's over.`
    );
    expect(viewModel.allSet).toEqual('All set!');
  });
  it('test tracksEmailCapture ', () => {
    const spyAnalytics = jest.spyOn(analyticsHandler, 'tracksEmailCapture');
    viewModel.tracksEmailCapture(
      'Remind Me Result Viewed',
      true,
      1,
      1,
      'success'
    );
    expect(spyAnalytics).toHaveBeenCalledWith(
      'Remind Me Result Viewed',
      true,
      1,
      1,
      'success'
    );
  });
});
