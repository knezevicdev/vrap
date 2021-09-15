import ViewModel from '../ViewModel';

describe('LoadingPrice Test', () => {
  const viewModel = new ViewModel();

  it('readonly values', () => {
    expect(viewModel.loading).toBe('Loading');
    expect(viewModel.pleaseWait).toBe(
      `We're grabbing your data fresh out the oven. Thanks for your patience.`
    );
  });
});
