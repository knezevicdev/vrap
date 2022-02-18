import ViewModel from '../ViewModel';

describe('test email input component viewModel ', () => {
  const viewModel: ViewModel = new ViewModel();
  it('test email valid func ', () => {
    const validEmail = 'email@email.com';
    const inValidEmail = 'email';
    expect(viewModel.isValidEmail(validEmail)).toEqual(true);
    expect(viewModel.isValidEmail(inValidEmail)).toEqual(false);
  });
});
