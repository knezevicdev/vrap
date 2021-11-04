import ViewModel from '../ViewModel';

describe('Default Stepper Test', () => {
  const viewModel = new ViewModel();

  it('readonly values', () => {
    expect(viewModel.nextTitle).toEqual('Next: ');
  });
});
