import ViewModel from '../ViewModel';

describe('IsPrimaryAddress Test', () => {
  const viewModel = new ViewModel();

  it('readonly values', () => {
    expect(viewModel.optionMeta).toEqual(['Yes', 'No']);
  });
});
